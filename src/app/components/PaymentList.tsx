import React from 'react';

interface Payment {
    id: number;
    date: string;
    category: { id: number; name: string };
    name: string;
    quantity: number;
    price: number;
}

interface PaymentListProps {
    payments: Payment[];
    onPaymentDeleted: () => void;
}

export default function PaymentList({ payments, onPaymentDeleted }: PaymentListProps) {
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/payments/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                onPaymentDeleted();
            } else {
                console.error('Failed to delete payment');
            }
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="px-4 py-2">Дата</th>
                    <th className="px-4 py-2">Категория</th>
                    <th className="px-4 py-2">Название</th>
                    <th className="px-4 py-2">Количество</th>
                    <th className="px-4 py-2">Цена</th>
                    <th className="px-4 py-2">Действия</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id}>
                        <td className="border px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">{payment.category.name}</td>
                        <td className="border px-4 py-2">{payment.name}</td>
                        <td className="border px-4 py-2">{payment.quantity}</td>
                        <td className="border px-4 py-2">{payment.price}</td>
                        <td className="border px-4 py-2">
                            <button onClick={() => handleDelete(payment.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
