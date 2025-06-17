'use client';
import HomeBanner from '@/components/banner/homeBanner';
import { useAuth } from '@/context/AuthContext';
import CTAHome from '@/features/common/components/CTA/CTAHome';
import OurPartner from '@/features/common/components/ourPartner';
import FeatureRoomRental from '@/features/properties/components/featureRoomRental/featureRoomRental';

export default function Home() {
  const { user, isLoading } = useAuth();
  return (
    <main className="min-h-screen">
      <HomeBanner />
      <FeatureRoomRental />
      <CTAHome />
      <OurPartner />
    </main>
  );
}
