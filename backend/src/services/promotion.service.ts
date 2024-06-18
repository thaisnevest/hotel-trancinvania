import { Promotion } from "../controllers/promotion.controller";
import { PromotionType } from "../enums/promotion-type.enum";
import PromotionRepository from "../repositories/promotion.repository";
import PublishedReservationRepository from "../repositories/publishedReservation.repository";
import { HttpBadRequestError, HttpError, HttpInternalServerError, HttpNotFoundError } from "../utils/errors/http.error";

export default class PromotionService {

    private promotionRepository: PromotionRepository;
    private publishedReservationRepository: PublishedReservationRepository;

    constructor(){
        this.promotionRepository = new PromotionRepository();
        this.publishedReservationRepository = new PublishedReservationRepository();
    }

    private preparePromotionParams(discount: number, type: string, num_rooms?: number | null): Promotion {
        if (type === PromotionType.LIMITE_QUARTO && num_rooms === undefined) {
            throw new HttpBadRequestError({
                msg: 'num_rooms is required'
            });
        }
        let params = { discount, type, num_rooms } as Promotion;
    
        if (type === PromotionType.ILIMITADA) {
            params.num_rooms = null;
        }
        return params;
    }

    async insertPromotion( reservation_id: number, discount: number, type: string, num_rooms?: number | null): Promise<number> {
        let params = this.preparePromotionParams(discount, type, num_rooms);
        try{
            const promotion_id = await this.promotionRepository.insertPromotion(params);
            await this.publishedReservationRepository.updateReservationPromotion(reservation_id, +promotion_id);
            await this.publishedReservationRepository.updateAllreservations();
            return promotion_id;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error inserting promotion: ${error.message}`});
            }
        }
    }

    async insertPromotionAll( discount: number, type: string, num_rooms?: number | null): Promise<number> {
        let params = this.preparePromotionParams(discount, type, num_rooms);
        try{
            const promotion_id = await this.promotionRepository.insertPromotion(params);
            await this.publishedReservationRepository.updateAllReservationPromotion(+promotion_id);
            await this.publishedReservationRepository.updateAllreservations();
            return promotion_id;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error inserting promotion: ${error.message}`});
            }
        }
    }

    async getAllPromotions(): Promise<Promotion[]> {
        try{
            return await this.promotionRepository.getAllPromotions();
        }catch(error: any){
            throw new HttpInternalServerError({msg: `Error fetching all promotions: ${error.message}`});
        }
    }

    async getPromotionById(reservation_id: number): Promise<Promotion> {
        try{
            const promotion_id = await this.publishedReservationRepository.getReservationPromotionID(reservation_id)
            if (!promotion_id) {
                throw new HttpNotFoundError({
                    msg: 'Promotion not found'
                });
            }
            const promotion = await this.promotionRepository.getPromotionById(promotion_id);
            return promotion;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error fetching promotion: ${error.message}`});
            }
        }
    }

    async updatePromotionById(reservation_id: number, discount: number, type: string, num_rooms?: number): Promise<void> {
        const params = this.preparePromotionParams(discount, type, num_rooms) as Promotion;
        try{
            const promotion_id = await this.publishedReservationRepository.getReservationPromotionID(reservation_id)
            if (!promotion_id) {
                throw new HttpNotFoundError({
                    msg: 'Promotion not found'
                });
            }
            const rows = await this.publishedReservationRepository.getReservationPromotion(promotion_id);
            if(rows > 1){
                await this.insertPromotion(reservation_id, params.discount, params.type, params.num_rooms);
            }else{
                await this.promotionRepository.updatePromotionById(promotion_id, params);
            }
            await this.publishedReservationRepository.updateAllreservations(); //update price
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error updating promotion: ${error.message}`});
            }
        }
    }

    async deletePromotionById(reservation_id: number): Promise<void> {
        try{
            const promotion_id = await this.publishedReservationRepository.getReservationPromotionID(reservation_id);
            if (!promotion_id) {
                throw new HttpNotFoundError({
                    msg: 'Promotion not found'
                });
            }
            await this.publishedReservationRepository.updateReservationPromotion(reservation_id, null);
            if(await this.publishedReservationRepository.getReservationPromotion(promotion_id) === 0){
                await this.promotionRepository.deletePromotionById(promotion_id); 
            }
            await this.publishedReservationRepository.updateAllreservations();
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error deleting promotion: ${error.message}`});
            }
        }
    }

    async deleteAllPromotions(): Promise<void> {
        try{
            await this.promotionRepository.deleteAllPromotions();
            await this.publishedReservationRepository.updateAllreservations();
        }catch(error: any){
            throw new HttpInternalServerError({msg: `Error deleting all promotions: ${error.message}`});
        }
    }
}