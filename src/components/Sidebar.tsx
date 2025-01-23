'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutGrid, FileText, Users2, Package, LogOut } from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Projects',
    icon: LayoutGrid,
    href: '/projects',
  },
  {
    title: 'Documents',
    icon: FileText,
    href: '/documents',
  },
  {
    title: 'Stakeholders',
    icon: Users2,
    href: '/stakeholders',
  },
  {
    title: 'Delivered Work',
    icon: Package,
    href: '/delivered-work',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <ShadcnSidebar collapsible='icon'>
        <SidebarContent className='mt-2'>
          {/* we need this sidebar group for auto centering the icon when sidebar is collapsed */}
          {/* very strangely, this is only needed under SidebarContent (not need for centralizing the icon in footer) */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className='mb-5'>
                  <SidebarTrigger />
                </SidebarMenuItem>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href} className='mb-2'>
                    {/* we need this tooltip for menu nam pop up hover on icon when collapsed */}
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon />
                        <span className='text-sm'>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={'Logout'}>
                <Link href={'/login'}>
                  <LogOut />
                  <span className='text-sm'>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </ShadcnSidebar>
    </>
  );
}
