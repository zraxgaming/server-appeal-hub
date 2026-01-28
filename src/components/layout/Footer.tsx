import { Link } from "react-router-dom";
import { Sword, Github, MessageCircle, Twitter } from "lucide-react";

const footerLinks = {
  server: [
    { name: "Home", href: "/" },
    { name: "Rules", href: "/rules" },
    { name: "Staff", href: "/staff" },
    { name: "Appeal", href: "/appeal" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  social: [
    { name: "Discord", href: "#", icon: MessageCircle },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "GitHub", href: "#", icon: Github },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Sword className="h-6 w-6 text-primary" />
              <span className="text-gradient">Z-Craft</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The ultimate Minecraft survival experience. Join our community and start your adventure today.
            </p>
          </div>

          {/* Server Links */}
          <div>
            <h4 className="font-semibold mb-4">Server</h4>
            <ul className="space-y-2">
              {footerLinks.server.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="flex gap-4">
              {footerLinks.social.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all hover-lift"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Z-Craft. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              play.zcraft.xyz
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
