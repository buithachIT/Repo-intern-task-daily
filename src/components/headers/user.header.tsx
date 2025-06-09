"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const UserHeader = () => {
    const { user, isAuthenticated, logout } = useAuth()

    return (
        <>
            {!isAuthenticated ? <><Link href='/login'>
                <Button>Sign in</Button></Link>
                <Link href='/register'>
                    <Button className="bg-secondary text-black md:ml-5 hover:text-white">Sign up</Button></Link>
            </> :
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Chào {user?.firstName}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Bạn cần gì?</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Xem Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>
                                Đăng xuất
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </>
    )
}
export default UserHeader;