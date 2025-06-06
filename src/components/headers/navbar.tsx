import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { posts } from "@/lib/slug-data"
import { lusitana } from "@/accets/fonts/fonts"
import HeaderMobile from "./mobile.header"

const NavBar = () => {
    const get3Post = posts.slice(0, 3);
    return (
        <div className="grid grid-cols-3 justify-between items-center py-2 w-full max-w-screen-xl shadow-sm mx-auto">
            <div className="hidden md:flex">
                <NavigationMenu>
                    <NavigationMenuList>
                        {/* Item home */}
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        {/* Item Blog */}
                        <NavigationMenuItem >
                            <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid z-50 gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                href="/blog/category"
                                            >
                                                <div className="mt-4 mb-2 text-lg font-medium">
                                                    Category
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-tight">
                                                    Category of posts
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    {get3Post.map((p) => (

                                        <ListItem
                                            key={p.title}
                                            href={`/blog/${p.slug}`}
                                            title={p.title}>
                                            {p.content}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/about-us">About Us</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu >
            </div>
            <HeaderMobile />
            <div className={`${lusitana.className} left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 md:translate-y-0 md:text-center text-4xl font-bold`} >Blog</div>
            <div className="flex justify-end col-3 space-x-2">
                <Link href='/login'>
                    <Button>Sign in</Button></Link>
                <Link href='/register'>
                    <Button className="bg-secondary text-black md:ml-5 hover:text-white">Sign up</Button></Link>
            </div>
        </div>
    )
}
function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

export default NavBar