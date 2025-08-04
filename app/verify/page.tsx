'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { redirect } from 'next/navigation';

export default function VerifyRedirect() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const locale = 'en';
    const redirectUrl = `/${locale}/verify${token ? `?token=${token}` : ''}`;
    redirect(redirectUrl);
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
    </div>
  );
}