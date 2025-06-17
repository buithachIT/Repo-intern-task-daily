import Footer from '@/components/footer';
import NavBar from '@/components/headers/navbar';
import { ReactNode } from 'react';

function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />
            <div> {children}</div>
            <Footer />
        </>
    )
}

export default HomeLayout;
