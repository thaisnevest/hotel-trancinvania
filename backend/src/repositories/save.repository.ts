import { PrismaClient, User, Reservation } from "@prisma/client";



export default class SaveRepository {

    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }
    // savedListId depepnde do cliente

    async saveReservation(userId: number, reservationId: number): Promise<{id: number}> {
        try {
            const reservation = await this.prisma.reservation.findUnique({
                where: {
                    id: reservationId
                }
            });

            if (!reservation) {
                throw new Error('Reserva não encontrada');
            }

            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            // Adiciona a reserva à lista de reservas salvas
            const result = await this.prisma.userReservation.create({
                data: {
                    user_id: userId,
                    reservation_id: reservationId
                }
            });

            return { id:result.user_id};
        } 
        catch (error) {
            throw error;
        }
    }


    async getSavedReservationByUserId(user_id: number): Promise<Reservation[]> {
        try {
            const userReservations = await this.prisma.userReservation.findMany({
                where: {
                   user_id: user_id
                },
                include: {
                    reservation: true
                }

            });

            if (!userReservations) {
                throw new Error('Nenhuma reserva salva');
            }
            let user_reservations: Reservation[] = [];
           
            for (let i = 0; i < userReservations.length; i++) {
                user_reservations.push(userReservations[i].reservation);
            }

            return user_reservations as Reservation[];
        } 
        catch (error) {
            throw error;
        }
    }

    async getUsersbyReservationId(reservation_id: number): Promise<User[]>{
        try{
            const user = await this.prisma.userReservation.findMany({
            where :{
                reservation_id :reservation_id
            },
            include:{
                user: true
            }

            });

            if (!user){
                throw new Error("Nenhum usuário salvou a reserva")
            }
            let usersbyreservation: User[]=[];
            for (let i = 0; i < user.length; i++) {
                usersbyreservation.push(user[i].user);
            }

            return usersbyreservation as User[];
        }

        catch (error) {
            throw error;
        }        
    }

    async deleteSavedReservationById(user_id: number, reservation_id: number): Promise<void> {
        try {
            await this.prisma.userReservation.deleteMany({
                where:{
                    user_id : user_id,
                    reservation_id : reservation_id
                }
            })
        } 
        catch (error) {
            throw error;
        }
    }
}
