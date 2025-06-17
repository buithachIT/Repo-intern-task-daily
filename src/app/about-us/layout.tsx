import Footer from '@/components/footer';
import NavBar from '@/components/headers/navbar';
import { ReactNode } from 'react';

function AboutLayout({ children }: { children: ReactNode }) {
  return (<>
    <NavBar />
    {children}
    <Footer />
  </>);
}

export default AboutLayout;
