import { PrismaClient } from "@prisma/client";
import { Promotion } from "../controllers/promotion.controller";

export default class PromotionRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async insertPromotion(params: Promotion) : Promise<number>{
        const result = await this.prisma.promotion.create({data: params})
        return result.id;
    }

    async getAllPromotions(): Promise<Promotion[]> {
        const promotions = await this.prisma.promotion.findMany() as Promotion[];
        return promotions;
    }

    async getPromotionById(id: number): Promise<Promotion> {
        const promotion = await this.prisma.promotion.findUnique({
            where: {
                id: id
            }
        })
        return promotion as Promotion;
    }

    async updatePromotionById(id: number, params: Promotion): Promise<void> {
        await this.prisma.promotion.update({
            where: {
                id: id
            },
            data: params
        });
    }

    async deletePromotionById(id: number): Promise<void> {
        await this.prisma.promotion.delete({
            where: {
                id: id
            }
        });
    }

    async deleteAllPromotions(): Promise<void> {
        await this.prisma.promotion.deleteMany();
    }
}