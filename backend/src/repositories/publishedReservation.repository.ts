import { PrismaClient, PublishedReservation } from "@prisma/client";
import { HttpNotFoundError } from "../utils/errors/http.error";

export default class PublishedReservationRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllPublishedReservations() {
        return this.prisma.publishedReservation.findMany();
    }

    async updatePublishedReservation(id: number, updateData: Partial<PublishedReservation>) {
        const reservation = await this.prisma.publishedReservation.findUnique({ where: { id } });
        if (!reservation) {
            throw new HttpNotFoundError({ msg: 'Reservation not found' });
        }
        return this.prisma.publishedReservation.update({
            where: { id },
            data: updateData,
        });
    }

    async deletePublishedReservation(id: number) {
        const reservation = await this.prisma.publishedReservation.findUnique({ where: { id } });
        if (!reservation) {
            throw new HttpNotFoundError({ msg: 'Reservation not found' });
        }
        return this.prisma.publishedReservation.delete({ where: { id } });
    }

    async getPublishedReservationById(id: number) {
        const reservation = await this.prisma.publishedReservation.findUnique({ where: { id } });
        if (!reservation) {
            throw new HttpNotFoundError({ msg: 'Reservation not found' });
        }
        return reservation;
    }

    async cancelReservation(id: number) {
      const reservation = await this.prisma.publishedReservation.findUnique({
          where: { id },
          include: { hotelier: true }, 
      });
      if (!reservation) {
          throw new HttpNotFoundError({ msg: 'Reservation not found' });
      }
      return this.prisma.publishedReservation.update({
          where: { id },
          data: {
          },
      });
  }
}
