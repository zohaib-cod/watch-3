"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiSearch,
  FiShoppingBag,
  FiChevronDown,
  FiX,
  FiMenu,
} from "react-icons/fi";

const dropdowns = {
};

const navLinks = [
  { href: "#", label: "Own Your Time" },
  { href: "/bextSellers", label: "Best Sellers" },
  { href: "/newArrival", label: "New Arrival" },
  { href: "/Men", label: "MEN" },
  { href: "/Women", label: "Woman" },
  { href: "/smartWatches", label: "Smart Watches" },
  { href: "/forCouples", label: "For Couples" },
];

export default function Navbar() {
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Saare products ek dafa fetch kar lo (page load pe), phir client-side filter karo
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products"); // <-- apna real API route yahan daalein
        const data = await res.json();
        setAllProducts(data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    loadProducts();
  }, []);

  // Search input open hote hi focus
  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus();
  }, [isSearchOpen]);

  // Bahar click karne se search box band ho jaye
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Har keystroke pe (A-Z, koi bhi harf/lafz) dynamic filter — debounce ke saath
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const q = trimmed.toLowerCase();
      const filtered = allProducts.filter((p) => {
        const haystack = [p.name, p.category, p.brand, p.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
      setResults(filtered);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, allProducts]);

  // Jab mobile menu khula ho to background scroll lock kar do
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function closeSearch() {
    setIsSearchOpen(false);
    setQuery("");
    setResults([]);
  }

  function handleSelectProduct(product) {
    closeSearch();
    setIsMobileMenuOpen(false);
    router.push(`/products/${product.id}`); // apne route structure ke hisaab se adjust karein
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-black">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between h-20 lg:h-24 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={180}
            height={70}
            priority
            className="object-contain w-auto h-16 lg:h-22"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase">

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white hover:text-gray-300 transition duration-300 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}

          {Object.entries(dropdowns).map(([title, items]) => (
            <div key={title} className="relative group">

              <button className="flex items-center gap-1 text-white hover:text-gray-300 transition duration-300 whitespace-nowrap">
                {title}
                <FiChevronDown className="text-xs mt-[2px]" />
              </button>

              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-black border border-white text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50">

                {items.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block px-5 py-3 text-white hover:bg-white hover:text-black transition duration-300"
                  >
                    {item}
                  </Link>
                ))}

              </div>

            </div>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-6">

          {/* Search */}
          <div ref={searchContainerRef} className="relative flex items-center">
            {!isSearchOpen ? (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition"
                aria-label="Open search"
              >
                <FiSearch size={20} className="text-white" />
              </button>
            ) : (
              <div className="flex items-center bg-white/10 rounded-full px-3 h-10 w-44 sm:w-64 transition-all">
                <FiSearch size={18} className="text-white mr-2 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-white placeholder-white/50 w-full text-sm"
                />
                <button onClick={closeSearch} aria-label="Close search">
                  <FiX size={18} className="text-white/70 hover:text-white transition shrink-0" />
                </button>
              </div>
            )}

            {/* Dropdown results */}
            {isSearchOpen && query.trim() && (
              <div className="absolute top-12 right-0 w-72 sm:w-80 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
                {loading ? (
                  <div className="p-4 text-white/60 text-sm">Searching...</div>
                ) : results.length > 0 ? (
                  <ul>
                    {results.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleSelectProduct(product)}
                          className="w-full text-left px-4 py-3 hover:bg-white/5 transition flex justify-between items-center"
                        >
                          <span className="text-white text-sm">{product.name}</span>
                          {product.price != null && (
                            <span className="text-white/50 text-xs">${product.price}</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-white/60 text-sm">
                    No products found for "{query}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger button - mobile only */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FiX size={22} className="text-white" />
            ) : (
              <FiMenu size={22} className="text-white" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        onClick={closeMobileMenu}
        className={`lg:hidden fixed inset-0 top-20 bg-black/60 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      />

      {/* Mobile slide-out navigation */}
      <nav
        className={`lg:hidden fixed top-20 left-0 right-0 bg-black border-t border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col divide-y divide-white/10 text-sm font-medium uppercase overflow-y-auto max-h-[calc(100vh-5rem)]">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={closeMobileMenu}
                className="block px-6 py-4 text-white hover:bg-white/10 transition duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {Object.entries(dropdowns).map(([title, items]) => (
            <li key={title}>
              <MobileDropdownItem
                title={title}
                items={items}
                onSelect={closeMobileMenu}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// Collapsible group for dropdown items inside the mobile menu
function MobileDropdownItem({ title, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 text-white hover:bg-white/10 transition duration-300"
        aria-expanded={isOpen}
      >
        {title}
        <FiChevronDown
          className={`text-xs transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-neutral-900 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item}
            href="#"
            onClick={onSelect}
            className="block px-8 py-3 text-white/90 hover:bg-white/10 transition duration-300"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}