import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRightLeft,
    BookOpen,
    Boxes,
    ChartNoAxesCombined,
    ClipboardList,
    FolderGit2,
    LayoutDashboard,
    ShoppingCart,
    Users,
    Warehouse,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { NavItem } from '@/types';

type SidebarPageProps = {
    currentTeam?: {
        id: string;
        name: string;
        slug: string;
    } | null;

    [key: string]: unknown;
};

export const AppSidebar = () => {
    const { currentTeam } = usePage<SidebarPageProps>().props;

    /**
     * Generate a URL using the currently selected Team.
     *
     * Example:
     * /tisdalewinery/dashboard
     * /scl/products
     * /svl/inventory
     */
    const teamUrl = (path: string): string => {
        if (!currentTeam) {
            return '/';
        }

        return `/${currentTeam.slug}/${path}`;
    };

    const dashboardUrl = teamUrl('dashboard');

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutDashboard,
        },
        {
            title: 'Sales',
            href: teamUrl('sales'),
            icon: ShoppingCart,
        },
        {
            title: 'Orders',
            href: teamUrl('orders'),
            icon: ClipboardList,
        },
        {
            title: 'Products',
            href: teamUrl('products'),
            icon: Boxes,
        },
        {
            title: 'Inventory',
            href: teamUrl('inventory'),
            icon: Warehouse,
        },
        {
            title: 'Stock Transfer',
            href: teamUrl('stock-transfers'),
            icon: ArrowRightLeft,
        },
        {
            title: 'Customers',
            href: teamUrl('customers'),
            icon: Users,
        },
        {
            title: 'Reports',
            href: teamUrl('reports'),
            icon: ChartNoAxesCombined,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter
                    items={footerNavItems}
                    className="mt-auto"
                />

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};