"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  CircleDollarSign,
  Settings,
} from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "#", label: "Customers", icon: Users },
  { href: "#", label: "Orders", icon: ShoppingBag },
  { href: "#", "label": "Products", icon: Package },
  { href: "#", label: "Analytics", icon: CircleDollarSign },
  { href: "#", label: "Settings", icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.label}>
          <Link href={link.href}>
            <SidebarMenuButton
              isActive={pathname === link.href}
              tooltip={link.label}
            >
              <link.icon />
              <span>{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
