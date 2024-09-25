'use client';

import { useSession } from 'next-auth/react';
import DashboardContent from '@/app/components/DashboardContent';
import ReportGenerator from '@/app/components/ReportGenerator';

export default function UserDashboard() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Access Denied</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-white text-black">
            <h1 className="text-2xl font-bold mb-4">Панель управления</h1>
            <DashboardContent />
            <ReportGenerator />
        </div>
    );
}