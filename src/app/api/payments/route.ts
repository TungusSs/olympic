import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const payments = await prisma.payment.findMany({
            include: { category: true },
            orderBy: { date: 'desc' },
        });
        console.log('Payments data:', payments);
        return NextResponse.json(payments);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const token = await getToken({ req: request as any });

    try {
        const { category, name, quantity, price } = await request.json();
        const payment = await prisma.payment.create({
            data: {
                categoryId: parseInt(category),
                name,
                quantity: parseInt(quantity), // Parse quantity to integer
                price: parseFloat(price), // Consider parsing price to float as well
                date: new Date(),
                userId: 3,
            },
            include: { category: true },
        });
        return NextResponse.json(payment, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}

