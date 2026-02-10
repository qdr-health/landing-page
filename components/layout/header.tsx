import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header>
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={240}
            height={64}
            priority
            className="h-14 w-auto animate-spin-slow sm:h-16"
          />
        </Link>

        {/* CTA */}
        <Button asChild variant="default" className=" text-white rounded-full">
          <Link href="/contact">Book a Call</Link>
        </Button>
      </nav>
    </header>
  );
}
