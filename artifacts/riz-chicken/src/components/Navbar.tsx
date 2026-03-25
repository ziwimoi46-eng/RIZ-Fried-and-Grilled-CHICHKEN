import { useState, useEffect } from "react";
import { Menu, X, Drumstick, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/30">
              <Drumstick className="w-6 h-6" />
            </div>
            <span className={`text-2xl font-display font-black tracking-tight ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              RIZ <span className="text-primary">CHICKEN</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold hover:text-primary transition-colors ${
                  isScrolled ? 'text-foreground/80' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <a href="#order">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Order Now
                {totalItems > 0 && (
                  <span className="ml-2 bg-white text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {totalItems > 0 && (
              <a href="#order" className={`relative p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              </a>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl transition-all duration-300 origin-top overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col py-4 px-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground font-medium py-2 px-4 hover:bg-muted rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <a href="#order" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full rounded-xl">Order Now</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
