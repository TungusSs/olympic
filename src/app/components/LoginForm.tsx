'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                identifier,
                password,
                redirect: false,
            });
            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/dashboard'); // Redirect to the appropriate page after successful login
            }
        } catch (err) {
            setError('Произошла ошибка при входе');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="identifier" className="block mb-1">Логин</label>
                <input
                    type="text"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-1">Пароль</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Войти
            </button>
        </form>
    );
}
