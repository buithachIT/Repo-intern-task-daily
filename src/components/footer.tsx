'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const navGroups = [
    {
        title: 'Keywa',
        links: [
            { href: '/about-us', label: 'About Us' },
            { href: '/services-pricing', label: 'Services & Pricing' },
            { href: '/newcomers-support', label: 'Newcomers Support' },
        ],
    },
    {
        title: 'Discover',
        links: [
            { href: '/how-keywa-work', label: 'How Keywa Works' },
            { href: '/help-center', label: 'Help Center' },
            { href: '/faqs', label: 'FAQs' },
        ],
    },
];

export default function DefaultFooter() {
    return (
        <footer className="flex flex-col gap-6 lg:gap-10 max-w-[1240px] mx-auto md:pt-10 pb-6">
            {/* Top section */}
            <div className="flex flex-col lg:flex-row justify-between gap-10">
                {/* Logo & Social */}
                <div className="flex flex-col gap-6 md:gap-8">
                    <Image src="/assets/images/logo.webp" alt="Logo" width={168} height={36} />
                    <p className="text-primary font-semibold text-sm md:text-base">
                        The trusted platform for shared-accommodation
                    </p>
                    <div className="flex gap-4 text-primary">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
                    </div>
                </div>

                {/* Nav + Contact */}
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-[206px_206px_1fr]">
                    {navGroups.map((group) => (
                        <div key={group.title} className="flex flex-col gap-3 md:gap-8">
                            <h4 className="text-primary uppercase font-semibold text-xl">{group.title}</h4>
                            <ul className="space-y-4 text-sm md:text-base [&>li>a]:text-neutral-600 [&>li>a:hover]:text-secondary">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div className="flex flex-col gap-3 md:gap-8">
                        <h4 className="text-primary uppercase font-semibold text-xl">Contact Us</h4>
                        <ul className="space-y-4 text-sm md:text-base text-neutral-600">
                            <li className="flex items-center gap-2">
                                <Mail size={18} />
                                <a href="mailto:support@keywacanada.com">support@keywacanada.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={18} />
                                <a href="tel:+16479932383">+1 647 993 2383</a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={18} />
                                <div>
                                    19 Thorne Street<br />
                                    Suite 110<br />
                                    Cambridge, ON, Canada, N1R 1S2
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col lg:flex-row justify-between border-t pt-4 text-sm text-neutral-600">
                <div className="flex flex-wrap gap-2">
                    <span>© 2025 KEYWA</span>
                    <span className="hidden lg:inline">|</span>
                    <span>All Rights Reserved</span>
                </div>
                <div className="flex gap-3 [&>a]:text-primary [&>a:hover]:underline">
                    <Link href="/termination-refund">Termination & Refund</Link>
                    <span>|</span>
                    <Link href="/terms">Terms & Conditions</Link>
                    <span>|</span>
                    <Link href="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
