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
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "#", label: "Customers", icon: Users },
  { href: "#", label: "Orders", icon: ShoppingBag },
  { href: "#", "label": "Products", icon: Package },
  { href: "#", label: "Analytics", icon: CircleDollarSign },
  { href: "#", label: "Settings", icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null on the server and initial client render
    return (
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.label}>
            <SidebarMenuButton tooltip={link.label} disabled>
              <link.icon />
              <span>{link.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

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
