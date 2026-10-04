import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { count } = useCart();

  const links = [
    { href: "/products", label: "Shop" },
    { href: "/products", label: "Categories" },
    { href: "/book-catering", label: "Catering" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0e0e0c] border-b-2 border-primary">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-center justify-between h-[68px]">
          <Link href="/" className="font-display font-black text-[1.6rem] uppercase tracking-tight text-primary leading-none">
            Roshdah<span className="text-foreground">.</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-semibold text-[0.95rem] uppercase tracking-wide transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            <button
              className="street-btn street-btn-lime street-btn-sm !border-black"
              aria-label="Cart"
              onClick={() =>
                alert(
                  count === 0
                    ? "Your cart is empty — go grab some heat! 🌶️"
                    : `You have ${count} item${count === 1 ? "" : "s"} in your cart. Checkout coming right up!`
                )
              }
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              <span className="bg-secondary text-white border-2 border-black rounded-full w-[26px] h-[26px] inline-flex items-center justify-center text-[0.8rem] font-black">
                {count}
              </span>
            </button>
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden border-t-2 border-primary bg-[#0e0e0c] px-5 py-5 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-display font-extrabold uppercase text-lg ${
                isActive(link.href) ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
