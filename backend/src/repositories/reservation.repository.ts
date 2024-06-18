import { PrismaClient } from "@prisma/client";
import { Reserve, Client, PaymentMethod, PublishedReservation} from "../controllers/reservation.controller";

export default class ReservationRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async cancelReservation(id: number): Promise<void> {
        try {
            await this.prisma.reserve.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async cancelReservationByClient(clientId: number): Promise<void> {
        try {
            await this.prisma.reserve.deleteMany({
                where: {
                    clientId: clientId
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao tentar cancelar todas as reservas do cliente.');
        }
    }
    

    async getPublishedReservationById(publishedReservationId: number): Promise<PublishedReservation>{
        try {
            const publishedReservation = await this.prisma.publishedReservation.findUnique({
                where: {
                    id: publishedReservationId
                }
            })
            if (!publishedReservation) {
                throw new Error('Oferta de reserva não encontrada');
            }

            return publishedReservation as PublishedReservation;
        } catch (error) {
            throw error;
        }
    }
    async getClientById(clientId: number): Promise<Client>{
        try {
            const client = await this.prisma.client.findUnique({
                where: {
                    id: clientId
                }
            })
            if (!client) {
                throw new Error('Usuário não encontrado');
            }

            return client as Client;
        } catch (error) {
            throw error;
        }
    }
    async getPaymentMethod(clientId: number): Promise<PaymentMethod[]>{
        try {
            const paymentMethod = await this.prisma.paymentMethod.findMany({
                where: {
                    clientId: clientId,
                }
            })
            if (!paymentMethod) {
                throw new Error('Método de pagamento não encontrado');
            }

            return paymentMethod as PaymentMethod[];
        } catch (error) {
            throw error;
        }
    }
    async getReservationById(id: number): Promise<Reserve>{
        try {
            const reservation = await this.prisma.reserve.findUnique({
                where: {
                    id: id
                }
            })
            if (!reservation) {
                throw new Error('Reserva não encontrada');
            }

            return reservation as Reserve;
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByClient(clientId: number): Promise<Reserve[]> {
        try {
            const reservations = await this.prisma.reserve.findMany({
                where: {
                    clientId: clientId
                }
            });

            if (!reservations) {
                throw new Error('Nenhuma reserva encontrada para o cliente especificado');
            }

            return reservations as Reserve[];
        } catch (error) {
            throw error;
        }
    }
    async createReservation(params: Reserve) : Promise<{id: number}>{
        try {
            const result = await this.prisma.reserve.create({data: params})
            
            return { id: result.id };
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByPeriod(checkin: string, checkout: string, publishedReservationId: number): Promise<Reserve[]> {
        try {
            const reservations = await this.prisma.reserve.findMany({
                where: {
                    publishedReservationId: publishedReservationId,
                    checkin: {
                        lte: checkout // Check-in antes ou no dia do check-out desejado
                    },
                    checkout: {
                        gte: checkin // Check-out depois ou no dia do check-in desejado
                    }
                }
            });

            if (!reservations) {
                throw new Error('Nenhuma reserva encontrada para o período especificado');
            }

            return reservations as Reserve[];
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByPeriodAndId(id: number, checkin: string, checkout: string, publishedReservationId: number): Promise<Reserve[]> {
        try {
            const reservations = await this.prisma.reserve.findMany({
                where: {
                    publishedReservationId: publishedReservationId,
                    checkin: {
                        lte: checkout // Check-in antes ou no dia do check-out desejado
                    },
                    checkout: {
                        gte: checkin // Check-out depois ou no dia do check-in desejado
                    },
                    id: {
                        not: id
                    }
                }
            });

            if (!reservations) {
                throw new Error('Nenhuma reserva encontrada para o período especificado');
            }

            return reservations as Reserve[];
        } catch (error) {
            throw error;
        }
    }
    async updateReservation(id: number, params: Partial<Reserve>): Promise<void> {
        try {
            await this.prisma.reserve.update({
                where: {
                    id: id
                },
                data: params
            });
        } catch (error) {
            throw error;
        }
    }
}
