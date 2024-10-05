'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/Admin');
  }, [router]);

  return null;  // No need to render anything, just redirect
};

export default DashboardRedirect;

