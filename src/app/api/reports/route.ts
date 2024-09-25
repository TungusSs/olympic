import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    try {
        const { startDate, endDate, category } = await request.json();
        const userId = 3;

        const payments = await prisma.payment.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
                category: category ? { name: category } : undefined,
            },
            include: { category: true },
        });

        const totalAmount = payments.reduce((sum, payment) => {
            const price = typeof payment.price === 'number' ? payment.price : Number(payment.price) || 0;
            return sum + price * payment.quantity;
        }, 0);

        const categorySummary = payments.reduce((summary, payment) => {
            const categoryName = payment.category.name;
            const price = typeof payment.price === 'number' ? payment.price : Number(payment.price) || 0;
            summary[categoryName] = (summary[categoryName] || 0) + price * payment.quantity;
            return summary;
        }, {} as Record<string, number>);

        const report = {
            totalPayments: payments.length,
            totalAmount,
            categorySummary,
            payments,
        };

        return NextResponse.json(report);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
