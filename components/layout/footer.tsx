import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12">
      <div className="px-6 py-8">
        {/* Content row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-0">
          {/* Left column - Legal */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              ©2026 QDR Health
            </p>
            <nav className="flex flex-col space-y-1">
              <Link
                href="/legal"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                All Rights Reserved
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="https://cal.com/habeeb-kamal-3tea7c/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Right column - Social */}
          <div className="sm:text-right">
            <p className="text-sm font-medium text-foreground">Follow Us</p>
            <nav className="mt-2 flex flex-col space-y-1">
              <Link
                href="https://www.linkedin.com/company/54157024/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Large brand text */}
      <div className="relative overflow-hidden">
        <p className="select-none whitespace-nowrap text-[18vw] font-bold leading-[0.85] tracking-tighter text-foreground">
          QDR HEALTH
        </p>
      </div>
    </footer>
  );
}
