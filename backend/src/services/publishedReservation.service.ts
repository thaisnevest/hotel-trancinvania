import { IGetReservationsByFilters } from "../controllers/publishedReservation.controller";
import PublishedReservationRepository from "../repositories/publishedReservation.repository";


export default class PublishedReservationService {

    private publishedReservationRepository: PublishedReservationRepository;

    constructor() {
        this.publishedReservationRepository = new PublishedReservationRepository();
    }

    public async getAllPublishedReservations(){
        return await this.publishedReservationRepository.getAllPublishedReservations();
    }

    public async getReservationsByFilters(params : IGetReservationsByFilters){
        const matchReservations = await this.publishedReservationRepository.getPublishedReservationsByFilters(params);
        return matchReservations;
    }
}