"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Star, ChevronDown, Search, ShoppingBag, Heart, Check } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

const BADGE_STYLES = {
  NEW: "bg-blue-600 text-white",
  SALE: "bg-red-600 text-white",
  BESTSELLER: "bg-purple-600 text-white",
  LIMITED: "bg-amber-500 text-white",
};

const CATEGORIES = [
  { name: "Home", href: "/" },
  { name: "Watches", href: "/watches" },
  { name: "Women", href: "/Woman" },
  // { name: "New Arrivals", href: "/new-arrivals" },
];

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Top Rated"];

// 👇 Hero background image — replace this path with your own image
const HERO_BACKGROUND_IMAGE = "/Man.jpg";

const products = [
  { id: 1, name: "Doroly 1.0", category: "Men's Stainless Steel", image: "/image 1.jpg", badge: "NEW", rating: 4.9, originalPrice: 14999, price: 7499, swatches: ["#D4AF37", "#1A1A1A", "#C0C0C0"] },
  { id: 2, name: "Lotus 3.0", category: "Men's Stainless Steel", image: "/image 2.jpg", badge: "SALE", rating: 4.7, originalPrice: 18999, price: 9499, swatches: ["#1A1A1A", "#8B5E3C"] },
  { id: 3, name: "Aristos", category: "Men's Stainless Steel", image: "/image 3.jpg", badge: "BESTSELLER", rating: 4.8, originalPrice: 21999, price: 10999, swatches: ["#C0C0C0", "#D4AF37"] },
  { id: 4, name: "Gemma ", category: " Men's Leather", image: "/image 4.jpg", badge: "NEW", rating: 4.6, originalPrice: 16999, price: 8499, swatches: ["#1A1A1A", "#C0C0C0", "#8B5E3C"] },
  { id: 5, name: "Lotus", category: "Men's Leather", image: "/image 5.jpg", badge: "SALE", rating: 4.5, originalPrice: 12999, price: 6499, swatches: ["#1A1A1A"] },
  { id: 6, name: "Pearl", category: "Women's Bracelet", image: "/image 6.jpg", badge: "NEW", rating: 4.9, originalPrice: 19999, price: 10999, swatches: ["#1A1A1A", "#C0C0C0"] },
  { id: 7, name: "Wyndow", category: "Men's Stainless Steel", image: "/image 7.jpg", badge: "LIMITED", rating: 5.0, originalPrice: 24999, price: 12999, swatches: ["#0B3D91", "#1A1A1A"] },
  { id: 8, name: "Onyx", category: "Men's Stainless Steel", image: "/image 8.jpg", badge: "BESTSELLER", rating: 4.8, originalPrice: 22999, price: 11999, swatches: ["#D4AF37", "#C0C0C0"] },
  { id: 9, name: "Tungsten", category: "Men's Stainless Steel", image: "/image 9.jpg", badge: "NEW", rating: 4.6, originalPrice: 15999, price: 7999, swatches: ["#1A1A1A", "#8B5E3C"] },
  { id: 10, name: "Devotion", category: "Men's Stainless Steel", image: "/image 10.jpg", badge: "SALE", rating: 4.9, originalPrice: 34999, price: 17499, swatches: ["#D4AF37", "#C0C0C0"] },
  { id: 11, name: "Elite ", category: "Men's Leather", image: "/image 11.jpg", badge: "BESTSELLER", rating: 4.7, originalPrice: 27999, price: 13999, swatches: ["#1A1A1A", "#C0C0C0"] },
  { id: 12, name: "Delex", category: "women's Bracelet", image: "/image 12.jpg", badge: "NEW", rating: 4.5, originalPrice: 20999, price: 10499, swatches: ["#C0C0C0"] },
  { id: 13, name: "Modicci", category: "Men's Stainless Steel", image: "/image 13.jpg", badge: "LIMITED", rating: 4.8, originalPrice: 17999, price: 8999, swatches: ["#1A1A1A", "#8B5E3C"] },
  { id: 14, name: "Elite", category: "Men's Leather", image: "/image 14.jpg", badge: "SALE", rating: 4.6, originalPrice: 13999, price: 6999, swatches: ["#1A1A1A", "#D4AF37"] },
  { id: 15, name: "Devotion", category: "Men's Stainless Steel", image: "/image 15.jpg", badge: "NEW", rating: 4.9, originalPrice: 25999, price: 12999, swatches: ["#D4AF37", "#1A1A1A"] },
  { id: 16, name: "Delex", category: "women's Bracelet", image: "/image 16.jpg", badge: "BESTSELLER", rating: 4.7, originalPrice: 19999, price: 9999, swatches: ["#C0C0C0", "#1A1A1A"] },
  { id: 17, name: "John Wick Chain", category: "Men's Stainless Steel", image: "/image 17.jpg", badge: "SALE", rating: 4.5, originalPrice: 16999, price: 8499, swatches: ["#1A1A1A"] },
  { id: 18, name: "Dragon", category: "Men's Stainless Steel", image: "/image 18.jpg", badge: "NEW", rating: 5.0, originalPrice: 28999, price: 14499, swatches: ["#0B3D91", "#C0C0C0"] },
  { id: 19, name: "Vogue", category: "Women's Mesh Band", image: "/image 19.jpg", badge: "LIMITED", rating: 4.8, originalPrice: 22999, price: 11499, swatches: ["#1A1A1A", "#D4AF37"] },
  { id: 20, name: "Rascaljack", category: "Men's Stainless Steel", image: "/image 20.jpg", badge: "SALE", rating: 4.9, originalPrice: 32999, price: 16499, swatches: ["#D4AF37", "#C0C0C0"] },
  { id: 21, name: "Modoro", category: "Men's Leather", image: "/image 21.jpg", badge: "NEW", rating: 4.6, originalPrice: 18999, price: 9499, swatches: ["#1A1A1A", "#8B5E3C"] },
  { id: 22, name: "Drift", category: "Men's Stainless Steel", image: "/image 22.jpg", badge: "BESTSELLER", rating: 4.7, originalPrice: 23999, price: 11999, swatches: ["#C0C0C0"] },
  { id: 23, name: "Samurai ", category: "Men's Leather", image: "/image 23.jpg", badge: "SALE", rating: 4.8, originalPrice: 26999, price: 13499, swatches: ["#1A1A1A", "#D4AF37"] },
  { id: 24, name: "Leo", category: "Women's Stainless Steel", image: "/image 24.jpg", badge: "NEW", rating: 4.9, originalPrice: 21999, price: 10999, swatches: ["#1A1A1A", "#C0C0C0", "#8B5E3C"] },
];

function formatPrice(value) {
  return `Rs ${value.toLocaleString("en-PK")}`;
}

// Reads existing cart from localStorage, adds the product, and saves it back.
function addToCart(product) {
  if (typeof window === "undefined") return;

  const existing = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingIndex = existing.findIndex((item) => item.id === product.id);

  if (existingIndex > -1) {
    existing[existingIndex].quantity += 1;
  } else {
    existing.push({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(existing));
}

// Stores ONLY the specific product that was Quick-Bought, so the
// /QuickBuy page knows exactly which single product to display.
function setQuickBuyProduct(product) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    "quickBuyProduct",
    JSON.stringify({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      swatches: product.swatches,
      quantity: 1,
    })
  );
}

function Hero() {
  return (
    <section className={`${playfair.variable} relative w-full overflow-hidden rounded-3xl mb-12`}>
      <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] w-full">
        <Image
          src={HERO_BACKGROUND_IMAGE}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0A]/90 via-[#0F0D0A]/70 to-[#0F0D0A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A]/60 via-transparent to-transparent" />

        <svg
          className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.18] sm:block lg:right-[6%]"
          width="440"
          height="440"
          viewBox="0 0 440 440"
          fill="none"
        >
          <circle cx="220" cy="220" r="200" stroke="#C9A44C" strokeWidth="1.5" />
          <circle cx="220" cy="220" r="160" stroke="#C9A44C" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 220 + 190 * Math.sin(angle);
            const y1 = 220 - 190 * Math.cos(angle);
            const x2 = 220 + 200 * Math.sin(angle);
            const y2 = 220 - 200 * Math.cos(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A44C" strokeWidth="2" />
            );
          })}
        </svg>

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[420px] items-center px-6 sm:min-h-[500px] sm:px-12 lg:min-h-[560px] lg:px-16">
          <div className="max-w-2xl animate-[hero-rise_0.7s_ease-out]">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A44C]/50 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#E8D9AE] backdrop-blur-sm">
              Man's Collection
              <span className="h-1 w-1 rounded-full bg-[#C9A44C]" />
              Fall Collection
            </span>

            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Time, held to a
              <br />
              <span className="text-[#D9C384]">higher standard.</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Discover timeless styles designed for confidence, comfort, and everyday wear.
              Explore premium fashion pieces crafted to elevate your look for every occasion.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hero-rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[hero-rise_0\\.7s_ease-out\\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function ProductCard({ product, onQuickBuy }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleQuickBuy = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onQuickBuy(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-300/80">
      {/* Image + badges */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase shadow-sm ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-sm transition-colors hover:bg-white"
          aria-label="Like product"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>

        <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
        </span>

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.swatches.map((color, i) => (
              <span
                key={i}
                className="h-4 w-4 rounded-full border border-gray-300 ring-1 ring-white shadow-sm transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 leading-tight tracking-tight">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2.5 mt-0.5">
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={handleQuickBuy}
          disabled={isNavigating}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
            isNavigating
              ? "border-green-600 bg-green-600 text-white"
              : "border-gray-900 bg-gray-900 text-white hover:bg-gray-800 hover:border-gray-800"
          }`}
        >
          {isNavigating ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Quick Buy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProductListing() {
  const router = useRouter();
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleQuickBuy = (product) => {
    addToCart(product);
    setQuickBuyProduct(product);
    router.push(`/QuickBuy?id=${product.id}`);
  };

  return (
    <main className="max-w-[1800px] mx-auto px-4 sm:px-8 py-8">
      <Hero />

      {/* Filter/sort bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 mb-8 border-b border-gray-200">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            {CATEGORIES.map((crumb, i) => (
              <li key={crumb.name} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-300">/</span>}
                <Link
                  href={crumb.href}
                  className={`${
                    i === CATEGORIES.length - 1
                      ? "text-gray-900 font-medium"
                      : "hover:text-gray-900 transition-colors"
                  }`}
                >
                  {crumb.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-xl border border-gray-300 px-4 py-2.5 transition-all hover:border-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              Sort: {sort}
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg z-20 text-sm overflow-hidden animate-in fade-in slide-in-from-top-2">
                {SORT_OPTIONS.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setSort(opt);
                      setSortOpen(false);
                    }}
                    className={`px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors ${
                      opt === sort ? "bg-gray-50 font-medium text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 transition-all focus-within:border-gray-900 focus-within:shadow-sm">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm outline-none placeholder:text-gray-400 w-32 transition-all focus:w-44"
            />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onQuickBuy={handleQuickBuy} />
        ))}
      </div>

      {/* Load more / footer */}
      <div className="mt-12 text-center">
        <button className="rounded-xl border border-gray-300 px-8 py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-lg">
          Load More
        </button>
      </div>
    </main>
  );
}