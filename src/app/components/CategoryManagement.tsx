// /components/CategoryManagement.tsx
'use client';

import { useState, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
}

export default function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
    };

    const addCategory = async () => {
        const response = await fetch('/api/admin/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCategoryName }),
        });
        if (response.ok) {
            setNewCategoryName('');
            fetchCategories();
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Управление категориями</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="border p-2 mr-2"
                    placeholder="Новая категория"
                />
                <button onClick={addCategory} className="bg-green-500 text-white px-4 py-2 rounded">
                    Добавить категорию
                </button>
            </div>
            <ul>
                {categories.map(category => (
                    <li key={category.id} className="mb-2">{category.name}</li>
                ))}
            </ul>
        </div>
    );
}
