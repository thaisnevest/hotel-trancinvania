import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import SaveService from '../services/save.services';

export interface Save {
    id: number;
}

const saveReservationDto = z.object({
    savedlistId: z.number(),
    reservationId: z.number(),
});

export default class SaveController {
    private prefix = '/saved-reservations';
    private saveService: SaveService;

    constructor() {
        this.saveService = new SaveService();
    }

    public setupRoutes(router: Router) {
        router.post(this.prefix, validateData(saveReservationDto), (req, res) => this.saveReservation(req, res));
        router.get(this.prefix + 'reservation/:id', (req, res) => this.getSavedReservationByUserId(req, res));
        router.get(this.prefix + 'user/:id', (req, res) => this.getUsersbyReservationId(req, res));
        router.delete(this.prefix + '/:userid/:reservationid', (req, res) => this.deleteSavedReservationById(req, res));
    }

    private async saveReservation(req: Request, res: Response) {
        const { userId, reservationId } = req.body;
        const result = await this.saveService.saveReservation(userId, reservationId);
        res.status(201).json(result);
    }


    private async getSavedReservationByUserId(req: Request, res: Response) {
        const { id } = req.params;
        const savedList = await this.saveService.getSavedReservationByUserId(Number(id));
        res.status(200).json(savedList);
    }

    private async getUsersbyReservationId(req: Request, res: Response) {
        const { id } = req.params;
        const savedList = await this.saveService.getUsersbyReservationId(Number(id));
        res.status(200).json(savedList);
    }

    private async deleteSavedReservationById(req: Request, res: Response) {
        const { userid, reservationid} = req.params;
        await this.saveService.deleteSavedReservationById(Number(userid), Number(reservationid));
        res.status(204).send();
    }
  }


