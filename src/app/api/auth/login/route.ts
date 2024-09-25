import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { login, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({ where: { login } });
        if (!user) {
            return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        const response = NextResponse.json({ message: 'Вход выполнен успешно' }, { status: 200 });
        response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
