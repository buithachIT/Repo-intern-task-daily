'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const UserHeader = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {!user?.id ? (
        <>
          <Link href="/login">
            <Button className="bg-secondary text-black md:ml-5 md:h-12 hover:bg-transparent hover:border-inherit">SIGN IN</Button>
          </Link>
          <Link href="/register">
            <Button className="text-white border-[#014973] md:ml-5 hover:text-white md:h-12 hover:bg-[#80c8f1] hover:border-inherit">SIGN UP</Button>
          </Link>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='h-12 hover:bg-[#5c98bb]'>Chào {user?.firstName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Bạn cần gì?</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Xem Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
export default UserHeader;
