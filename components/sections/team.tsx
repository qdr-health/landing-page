import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

const founders: TeamMember[] = [
  {
    name: "Dr Habeeb M",
    role: "Co-Founder & CEO",
    image: "/founders/1701431008808.jpeg",
    linkedin: "https://www.linkedin.com/in/habeeb-kamal-b31716166/",
  },
  {
    name: "Abdullah M",
    role: "Co-Founder & CTO",
    image: "/founders/1769194285669.png",
    linkedin: "https://www.linkedin.com/in/abdullah-m-2a1677167/",
  },
];

const clinicalFounders: TeamMember[] = [
  {
    name: "Dr Ian Cummings",
    role: "Strategic Advisor",
    image: "/founders/1749933862349.jpeg",
    linkedin: "https://www.linkedin.com/in/ian-cummings-4017b236b/",
  },
  {
    name: "Dr Zarrin Shaikh",
    role: "Clinical Advisor",
    image: "/founders/1593597167788.jpeg",
    linkedin: "https://www.linkedin.com/in/zarrin-shaikh/",
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <Image
          src={member.image}
          alt={member.name}
          width={400}
          height={500}
          className="h-full w-full object-cover grayscale"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-foreground">
            {member.name}
          </h3>
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-accent-teal"
          >
            <LinkedInIcon size={16} />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="py-24">
      <div className="space-y-4">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-teal">
          The Team
        </span>
        <h2 className="max-w-lg text-xl font-normal leading-snug text-foreground sm:text-2xl">
          Built by clinicians and engineers
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
        {founders.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
        {clinicalFounders.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button variant="default" className="text-white dark:text-black rounded-full">
          <Link href="https://cal.com/habeeb-kamal-3tea7c/30min" target="_blank" rel="noopener noreferrer">Book a Call</Link>
        </Button>
      </div>
    </section>
  );
}
