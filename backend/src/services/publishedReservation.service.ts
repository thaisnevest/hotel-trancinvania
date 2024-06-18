import { PublishedReservation } from "@prisma/client";
import PublishedReservationRepository from "../repositories/publishedReservation.repository";
import EmailService from "./email.service";

export default class PublishedReservationService {
    private publishedReservationRepository: PublishedReservationRepository;
    private emailService: EmailService;

    constructor() {
        this.publishedReservationRepository = new PublishedReservationRepository();
        this.emailService = new EmailService();
    }

    async getAllPublishedReservations() {
        return this.publishedReservationRepository.getAllPublishedReservations();
    }

    async updatePublishedReservation(id: number, updateData: Partial<PublishedReservation>) {
        return this.publishedReservationRepository.updatePublishedReservation(id, updateData);
    }

    async deletePublishedReservation(id: number) {
        return this.publishedReservationRepository.deletePublishedReservation(id);
    }

    async cancelReservation(id: number) {
      const canceledReservation = await this.publishedReservationRepository.cancelReservation(id);
  
      if (canceledReservation.hotelier) {
          await this.emailService.sendEmail(
              canceledReservation.hotelier.email,
              'Cancelamento de Reserva',
              `Olá, sua reserva no hotel ${canceledReservation.name} foi cancelada.`
          );
      } else {
          throw new Error('Hotelier não encontrado para enviar e-mail de cancelamento');
      }
  
      return canceledReservation;
  }
  
}
