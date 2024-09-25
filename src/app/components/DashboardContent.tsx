'use client';

import { useState, useEffect } from 'react';
import PaymentList from '@/app/components/PaymentList';
import PaymentForm from '@/app/components/PaymentForm';

interface Payment {
    id: number;
    date: string;
    category: { id: number; name: string };
    name: string;
    quantity: number;
    price: number;
}

interface Category {
    id: number;
    name: string;
}

export default function DashboardContent() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchPayments();
        fetchCategories();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await fetch('/api/payments');
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setPayments(data);
            } else {
                console.log('Received empty or invalid payments data:', data);
                setPayments([]);
            }
        } catch (error) {
            console.error('Error fetching payments:', error);
            setPayments([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setCategories(data);
            } else {
                console.log('Received empty or invalid categories data:', data);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    };


    return (
        <div>
            <PaymentForm categories={categories} onPaymentAdded={fetchPayments} />
            <PaymentList payments={payments} onPaymentDeleted={fetchPayments} />
        </div>
    );
}
