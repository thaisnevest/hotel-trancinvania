import { Reservation, User,UserReservation } from '@prisma/client';
import SaveRepository from "../repositories/save.repository";

export default class SaveService {
    private saveRepository: SaveRepository;

    constructor() {
        this.saveRepository = new SaveRepository();
    }

    async saveReservation(user_id: number, reservationId: number): Promise<{id: number}> {
        return await this.saveRepository.saveReservation(user_id, reservationId);
    }
    async getSavedReservationByUserId(id: number): Promise<Reservation[]> {
        return await this.saveRepository.getSavedReservationByUserId(id);
    }
    async  getUsersbyReservationId(id: number): Promise<User[]>{
        return await this.saveRepository.getUsersbyReservationId(id);
    }
    async deleteSavedReservationById(user_id: number,reservation_id: number): Promise<void> {
        await this.saveRepository.deleteSavedReservationById(user_id,reservation_id);
    }   
}