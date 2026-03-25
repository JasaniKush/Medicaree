"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { AlertTriangle, BookMarked } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/locker', label: 'Health Locker', icon: BookMarked },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button asChild variant="destructive" className="shadow-md shadow-destructive/30 hover:shadow-lg hover:shadow-destructive/40 transition-shadow">
              <Link href="/emergency">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Emergency Help
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
