'use client'
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Companions', href: '/companions'},
    {label: 'My Journey', href: '/my-journey'},
]

const NavItems = () => {
    const pathName = usePathname();
    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({label, href}) => (
                <a href={href} key={label} className={cn(pathName === href && 'text-primary font-semibold')}>{label}</a>
            ))}
        </nav>
    )
}
export default NavItems
