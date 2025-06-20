import HomeBanner from '@/components/banner/homeBanner';
import CTAHome from '@/features/common/components/CTA/CTAHome';
import OurPartner from '@/features/common/components/ourPartner';
import FeatureRoomRental from '@/features/properties/components/featureRoomRental/featureRoomRental';

export default function Home() {

  return (
    <main className="min-h-screen">
      <HomeBanner />
      <FeatureRoomRental />
      <CTAHome />
      <OurPartner />
    </main>
  );
}
