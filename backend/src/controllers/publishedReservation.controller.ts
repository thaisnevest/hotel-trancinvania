import { Request, Response, Router } from "express";
import PublishedReservationService from "../services/publishedReservation.service";
import ReservationService from "../services/reservation.service";
import EmailService from "../services/email.service";
import { z } from "zod";
import { validateData } from "../middleware/validation-middleware";
import { Hotelier, Promotion } from "@prisma/client";

export interface PublishedReservation {
    id: number;
    name: string;
    rooms: number;
    people: number;
    wifi: boolean;
    breakfast: boolean;
    airConditioner: boolean;
    parking: boolean;
    room_service: boolean;
    price: number;
    new_price: number;
    promotion?: Promotion;
    promotionId?: number;
    hotelier?: Hotelier;
    hotelier_id: number;
}

export interface IGetReservationsByFilters {
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
});

const updatePublishedReservationDto = z.object({
    name: z.string().optional(),
    rooms: z.number().optional(),
    people: z.number().optional(),
    wifi: z.boolean().optional(),
    breakfast: z.boolean().optional(),
    airConditioner: z.boolean().optional(),
    parking: z.boolean().optional(),
    room_service: z.boolean().optional(),
    price: z.number().optional(),
    new_price: z.number().optional(),
    promotionId: z.number().optional(),
});

export default class PublishedReservationController {
    private prefix = '/reservations';
    private publishedReservationService: PublishedReservationService;
    private reservationService: ReservationService;
    private emailService: EmailService;

    constructor() {
        this.publishedReservationService = new PublishedReservationService();
        this.reservationService = new ReservationService();
        this.emailService = new EmailService();
    }

    public setupRoutes(router: Router) {
        router.get(this.prefix, (req, res) => this.getAllPublishedReservations(req, res));
        router.post(this.prefix, validateData(publishedReservationGetDto), (req, res) => this.getPublishedReservationsByFilters(req, res));
        router.put(`${this.prefix}/:id`, validateData(updatePublishedReservationDto), (req, res) => this.updatePublishedReservation(req, res));
        router.delete(`${this.prefix}/:id`, (req, res) => this.deletePublishedReservation(req, res));
        router.post(`${this.prefix}/:id/cancel`, (req, res) => this.cancelReservation(req, res));
    }

    private async getAllPublishedReservations(req: Request, res: Response) {
        const reservations = await this.publishedReservationService.getAllPublishedReservations();
        res.status(200).json(reservations);
    }

    private async getPublishedReservationsByFilters(req: Request, res: Response) {
        const { num_rooms, num_adults, num_children, checkin, checkout } = req.body;
        const reservations = await this.publishedReservationService.getAllPublishedReservations();

        let availableReservations = [] as PublishedReservation[];

        for (let i = 0; i < reservations.length; i++) {
            let available = await this.reservationService.checkRoomAvailability(reservations[i].rooms, checkin, checkout, num_adults, num_children, reservations[i].id);
            if (available) {
                availableReservations.push(reservations[i]);
            }
        }

        res.status(200).json(availableReservations);
    }

    private async updatePublishedReservation(req: Request, res: Response) {
      const { id } = req.params;
      const updateData = req.body;
  
      try {
          const updatedReservation = await this.publishedReservationService.updatePublishedReservation(parseInt(id), updateData);
          res.status(200).json(updatedReservation);
      } catch (error) {
          if (error instanceof Error) {
              res.status(400).json({ error: error.message });
          } else {
              res.status(400).json({ error: 'An unknown error occurred' });
          }
      }
  }
  
    private async deletePublishedReservation(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await this.publishedReservationService.deletePublishedReservation(parseInt(id));
            res.status(204).send();
        } catch (error) {
          if (error instanceof Error) {
              res.status(400).json({ error: error.message });
          } else {
              res.status(400).json({ error: 'An unknown error occurred' });
          }
      }
    }

    private async cancelReservation(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const canceledReservation = await this.publishedReservationService.cancelReservation(parseInt(id));

            this.emailService.sendMail(
              canceledReservation.hotelier_id,
            'Cancelamento de Reserva',
            `Olá, sua reserva no hotel ${canceledReservation.name} foi cancelada.`
          );

            res.status(200).json(canceledReservation);
        } catch (error) {
          if (error instanceof Error) {
              res.status(400).json({ error: error.message });
          } else {
              res.status(400).json({ error: 'An unknown error occurred' });
          }
      }
    }
}
