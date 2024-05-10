"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Container from "../container";
import { Button } from "../ui/button";
import Image from "next/image";
import Searchinput from "../Searchinput";
import { ModeToggle } from "../theme-toggle";
import { NavMenu } from "./NavMenu";

const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 border border-b-primary/10 bg-secondary">
      <Container>
        <div className="flex justify-between">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/next.svg" alt="logo" width={30} height={30} />
          <div className="font-bold text-x1">
            Hotel Booking Management System
          </div>
        </div>
        <Searchinput/>
        <div className="flex gap-3 items-center items-center">
          <div>
            <ModeToggle/>
            <NavMenu/>
          </div>
          <UserButton afterSignOutUrl="/" />
          {!userId && 
            <>
              <Button onClick={() => router.push('/sign-in')} variant="outline" size="sm">Sign in</Button>
              <Button onClick={() => router.push('/sign-up')} variant="outline" size="sm">Sign up</Button>
            </>}
        </div>

        </div>
        
      </Container>
    </div>
  );
};

export default NavBar;
