'use client';

import { useState } from 'react';

export default function ReportGenerator() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    const [reportData, setReportData] = useState(null);

    const generateReport = async () => {
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate, endDate, category }),
        });
        const data = await response.json();
        setReportData(data);
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Генерация отчета</h2>
            <div className="flex space-x-4 mb-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Категория"
                    className="border p-2"
                />
                <button
                    onClick={generateReport}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Сгенерировать отчет
                </button>
            </div>
            {reportData && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Результаты отчета:</h3>
                    <pre>{JSON.stringify(reportData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
