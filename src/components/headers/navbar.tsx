import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { posts } from '@/lib/slug-data';
import HeaderMobile from './mobile.header';
import UserHeader from './user.header';
import Image from 'next/image';
const NavBar = () => {
    const get3Post = posts.slice(0, 3);
    return (
        <div className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="container w-full justify-between md:px-40 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-2 md:h-20">
                    <div className="flex items-center justify-center md:justify-start w-full md:w-auto mb-4 md:mb-0">
                        <Image
                            src={"/assets/images/logo.webp"}
                            width={168}
                            height={40}
                            alt="Logo"
                            className="inline-block"
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/">HOME</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>BLOG</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid z-50 gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                        href="/blog/category"
                                                    >
                                                        <div className="mt-4 mb-2 text-lg font-medium">Category</div>
                                                        <p className="text-muted-foreground text-sm leading-tight">
                                                            Category of posts
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                            {get3Post.map((p) => (
                                                <ListItem key={p.title} href={`/blog/${p.slug}`} title={p.title}>
                                                    {p.content}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/about-us">ABOUT-US</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <div className="flex justify-end items-center space-x-2">
                            <UserHeader />
                        </div>
                    </div>
                </div>
            </div>
            <HeaderMobile />
        </div>
    );
};
function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

export default NavBar;
