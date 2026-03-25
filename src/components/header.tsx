"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  BookMarked, 
  Home, 
  Users, 
  LineChart, 
  Stethoscope, 
  ClipboardCheck 
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/locker', label: 'Health Locker', icon: BookMarked },
  { href: '/family', label: 'Family', icon: Users },
  { href: '/insights', label: 'Insights', icon: LineChart },
  { href: '/doctors', label: 'Doctors', icon: Stethoscope },
  { href: '/med-tracker', label: 'Med Tracker', icon: ClipboardCheck },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-2 text-sm lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-2 transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'bg-muted font-semibold text-foreground' : 'text-foreground/60'
                )}
              >
                <link.icon className="h-4 w-4" />
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
