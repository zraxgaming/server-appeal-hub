import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sword } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-lg font-semibold hover-lift"
          >
            <Sword className="h-5 w-5" />
            <span>Z-Craft</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
