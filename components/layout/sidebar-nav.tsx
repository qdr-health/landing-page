"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "product", label: "Product" },
  { id: "partners", label: "Partners" },
  { id: "team", label: "Team" },
  { id: "mission", label: "Mission" },
];

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="hidden lg:block fixed left-8 top-1/3 -translate-y-1/2 z-50">
      <ul className="space-y-3">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={cn(
                "text-sm transition-colors duration-200 text-left",
                activeSection === id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "inline-block w-0.5 h-4 mr-3 transition-colors duration-200 align-middle",
                  activeSection === id ? "bg-accent-teal" : "bg-transparent"
                )}
              />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
