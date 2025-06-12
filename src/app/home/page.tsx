'use client';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <>

      < div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" >
        <p className="text-amber-600">Hi I&apos;m {user?.firstName || user?.email}</p>
        <p>Email của tôi là: {user?.email}</p>
      </div >

    </>
  );
}
