import { Globe, Mail } from "lucide-react";
import { IconLinkedIn } from "@/components/icons/social";
import { personal } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-foreground">{personal.name}</p>
          <p className="text-sm text-muted-foreground">
            Software Engineering Co-op · {personal.school}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden />
            Email
          </a>
          <a
            href={personal.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconLinkedIn className="size-4" />
            LinkedIn
          </a>
          <a
            href={personal.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Globe className="size-4" aria-hidden />
            Portfolio
          </a>
        </div>
        <p className="text-xs text-muted-foreground sm:text-right">
          © {year} {personal.name.split(" ")[0]} Al Haddad. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
