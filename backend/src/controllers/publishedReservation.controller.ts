import { Request, Response, Router } from "express";
import { Promotion } from "./promotion.controller";
import { Hotelier } from "./reservation.controller";
import PublishedReservationService from "../services/publishedReservation.service";
import ReservationService from "../services/reservation.service";
import { z } from "zod";
import { validateData } from "../middleware/validation-middleware";


export interface PublishedReservation{
    id: number;
    name: string;
    rooms: number; 
    people: number; 
    wifi: Boolean;
    breakfast: Boolean;  
    airConditioner: Boolean; 
    parking: Boolean;
    room_service: Boolean;
    price: number;
    new_price: number;
    promotion?: Promotion;
    promotionId?: number;
    hotelier?: Hotelier;
    hotelier_id: number; 
}

export interface IGetReservationsByFilters{
    num_rooms: number;
    checkin: string;
    checkout: string;
    num_adults: number;
    num_children: number;
}

const publishedReservationGetDto = z.object({
    num_rooms: z.number().min(1),
    checkin: z.string(),
    checkout: z.string(),
    num_adults: z.number().min(1),
    num_children: z.number(),
})

export default class PublishedReservationController{
    private prefix = '/reservations';
    private publishedReservationService: PublishedReservationService;
    private reservationService: ReservationService;

    constructor(){
        this.publishedReservationService = new PublishedReservationService();
        this.reservationService = new ReservationService();
    }

    public setupRoutes(router: Router){
        // pega todas as reservas
        router.get(this.prefix, (req, res) => this.getAllPublishedReservations(req, res));
        // pega todas as reservas com filtros especificos (busca de reservas)
        router.post(this.prefix, validateData(publishedReservationGetDto), (req, res) => this.getPublishedReservationsByFilters(req, res)); 
    }

    private async getAllPublishedReservations(req: Request, res: Response){
        const reservations = await this.publishedReservationService.getAllPublishedReservations();
        res.status(200).json(reservations);
    }
    
    private async getPublishedReservationsByFilters(req: Request, res: Response) {
        const {num_rooms, num_adults, num_children, checkin, checkout} = req.body;
        const reservations = await this.publishedReservationService.getAllPublishedReservations();

        let availableReservations = [] as PublishedReservation[];

        for(let i = 0; i < reservations.length; i++){
            let available = await this.reservationService.checkRoomAvailability(reservations[i].rooms, checkin, checkout, num_adults, num_children, reservations[i].id);
            if(available){
                availableReservations.push(reservations[i]);
            }
        }

        res.status(200).json(availableReservations);
    }
}