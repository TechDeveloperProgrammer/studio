import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  SlidersHorizontal,
  Target,
  AudioWaveform,
  Brain,
  Settings,
  User,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nexus Vocality",
  description: "Advanced vocal modulation and training application",
};

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vocal-engine", label: "Vocal Engine", icon: SlidersHorizontal },
  { href: "/training-system", label: "Training System", icon: Target },
  { href: "/vocal-studio", label: "Vocal Studio", icon: AudioWaveform },
  { href: "/predictive-ai", label: "Predictive AI", icon: Brain },
];

const secondaryNavItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/profile", label: "Profile", icon: User },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <SidebarProvider defaultOpen>
            <Sidebar collapsible="icon" variant="sidebar">
              <SidebarHeader className="p-4">
                <Link href="/" className="flex items-center gap-2">
                  <Logo className="w-8 h-8 text-primary" />
                  <h1 className="text-xl font-bold font-headline text-primary group-data-[collapsible=icon]:hidden">
                    Nexus Vocality
                  </h1>
                </Link>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton
                          tooltip={{ children: item.label, side: "right", align: "center" }}
                          asChild
                        >
                          <a>
                            <item.icon />
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                <SidebarSeparator className="my-4" />
                 <SidebarMenu>
                  {secondaryNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton
                          tooltip={{ children: item.label, side: "right", align: "center" }}
                          asChild
                        >
                          <a>
                            <item.icon />
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
                 <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center" asChild>
                   <Link href="https://github.com" target="_blank">
                    <Github className="group-data-[collapsible=icon]:mx-auto"/>
                    <span className="group-data-[collapsible=icon]:hidden ml-2">Source Code</span>
                   </Link>
                 </Button>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
                <div className="flex-1 text-right">
                  {/* Placeholder for User Profile button or other header actions */}
                  <Button variant="ghost" size="icon">
                    <User />
                  </Button>
                </div>
              </header>
              <main className="flex-1">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
