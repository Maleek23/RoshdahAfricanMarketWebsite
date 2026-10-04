import { useState } from "react";
import { Link } from "wouter";

export function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="bg-[#080806] border-t-2 border-primary pt-[60px] pb-7">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 mb-11">
          <div>
            <Link href="/" className="font-display font-black text-[1.9rem] uppercase text-primary inline-block mb-3">
              Roshdah<span className="text-foreground">.</span>
            </Link>
            <p className="text-[#a9a49a] text-[0.95rem] max-w-[20rem] mb-4">
              Real African food. No games. Groceries, spices, and catering that taste like home.
            </p>
            {joined ? (
              <p className="font-display font-extrabold uppercase text-primary">You're in! 🔥</p>
            ) : (
              <form
                className="flex mt-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setJoined(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for drops & deals"
                  aria-label="Email"
                  className="flex-1 min-w-0 bg-[#0e0e0c] border-2 border-primary text-foreground px-3.5 py-3 text-[0.95rem] outline-none placeholder:text-[#777]"
                />
                <button
                  type="submit"
                  className="bg-primary text-black border-2 border-primary font-display font-extrabold uppercase px-[18px] text-[0.85rem] hover:bg-secondary hover:border-secondary hover:text-white transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div>
            <h4 className="font-display font-extrabold uppercase text-[0.9rem] text-primary mb-4 tracking-widest">Shop</h4>
            {["Spices & Seasonings", "Grains & Flours", "Snacks & Drinks", "Fresh Produce", "Oils & Sauces"].map((c) => (
              <Link key={c} href="/products" className="block text-[#d8d4c9] mb-2.5 text-[0.95rem] hover:text-primary transition-colors">
                {c}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="font-display font-extrabold uppercase text-[0.9rem] text-primary mb-4 tracking-widest">Company</h4>
            <Link href="/about" className="block text-[#d8d4c9] mb-2.5 text-[0.95rem] hover:text-primary transition-colors">About Us</Link>
            <Link href="/book-catering" className="block text-[#d8d4c9] mb-2.5 text-[0.95rem] hover:text-primary transition-colors">Catering</Link>
            <Link href="/services" className="block text-[#d8d4c9] mb-2.5 text-[0.95rem] hover:text-primary transition-colors">Services</Link>
            <Link href="/contact" className="block text-[#d8d4c9] mb-2.5 text-[0.95rem] hover:text-primary transition-colors">Contact</Link>
          </div>

          <div>
            <h4 className="font-display font-extrabold uppercase text-[0.9rem] text-primary mb-4 tracking-widest">Help</h4>
            {["Shipping & Delivery", "Returns", "FAQ", "Privacy Policy"].map((c) => (
              <span key={c} className="block text-[#d8d4c9] mb-2.5 text-[0.95rem]">{c}</span>
            ))}
          </div>
        </div>

        <div className="border-t border-[#2a2a26] pt-6 flex justify-between flex-wrap gap-3 text-[#777] text-[0.85rem]">
          <span>© {new Date().getFullYear()} Roshdah African Market. All rights reserved.</span>
          <span>Made with 🔥 — no games.</span>
        </div>
      </div>
    </footer>
  );
}
