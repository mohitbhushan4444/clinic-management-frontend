import { Button } from "@/components/ui/button";
import { LogOut, Hospital } from "lucide-react";

interface HeaderProps {
  onLogout?: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  return (
    <header className="bg-primary shadow-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hospital className="h-8 w-8 text-primary-foreground" />
          <h1 className="text-xl font-bold text-primary-foreground">
            Devbhoomi Clinic
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-primary-foreground hover:text-primary-light transition-colors">
            Home
          </a>
          <a href="#" className="text-primary-foreground hover:text-primary-light transition-colors">
            About
          </a>
          <a href="#" className="text-primary-foreground hover:text-primary-light transition-colors">
            Contact
          </a>
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;