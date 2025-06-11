import { Inter, Lusitana } from 'next/font/google';
// REVIEW: Consider moving this font config to config folder, this is not a setup for asset file (font files)
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});