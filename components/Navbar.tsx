import React from 'react'
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

const Navbar = () => {
    // @ts-ignore
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image src="/images/logo.svg" alt="logo" width={46} height={44}/>
                </div>
            </Link>
            <div className="flex items-center gap-8">
               <NavItems />
                <SignedOut>
                    <div className="flex items-center gap-2">
                       <SignInButton>
                            <button className="btn-signin">Sign In</button>
                       </SignInButton>


                    </div>
                </SignedOut>
                <SignedIn>
                        <UserButton />
                </SignedIn>

            </div>
        </nav>
    )
}
export default Navbar
