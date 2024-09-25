'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/user');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-black">
      <div className="p-8 bg-gray-400 rounded shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Вход в систему</h1>
        <LoginForm />
      </div>
    </div>
  );
}
