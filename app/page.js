"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import {
  Star,
  Heart,
  Check,
  ShoppingBag,
  ArrowUpRight,
  ArrowRight,
  Truck,
  BadgePercent,
  ShieldCheck,
  Gift,
  Sparkles,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

/*  ----------------------------------------------------------------- */

const BADGE_STYLES = {
  NEW: "bg-blue-600 text-white",
  SALE: "bg-red-600 text-white",
  BESTSELLER: "bg-purple-600 text-white",
  LIMITED: "bg-amber-500 text-white",
};

const BESTSELLERS = [
  { id: 201, name: "Aristos", category: "Men's Stainless Steel", image: "/image 3.jpg", badge: "BESTSELLER", rating: 4.8, originalPrice: 21999, price: 10999, swatches: ["#C0C0C0", "#D4AF37"] },
  { id: 202, name: "Onyx", category: "Men's Stainless Steel", image: "/image 8.jpg", badge: "BESTSELLER", rating: 4.8, originalPrice: 22999, price: 11999, swatches: ["#D4AF37", "#C0C0C0"] },
  { id: 203, name: "Leo", category: "Women's Stainless Steel", image: "/image 24.jpg", badge: "NEW", rating: 4.9, originalPrice: 21999, price: 10999, swatches: ["#1A1A1A", "#C0C0C0", "#8B5E3C"] },
  { id: 204, name: "Delex", category: "Women's Bracelet", image: "/image 16.jpg", badge: "BESTSELLER", rating: 4.7, originalPrice: 19999, price: 9999, swatches: ["#C0C0C0", "#1A1A1A"] },
  { id: 205, name: "Drift", category: "Men's Stainless Steel", image: "/image 22.jpg", badge: "BESTSELLER", rating: 4.7, originalPrice: 23999, price: 11999, swatches: ["#C0C0C0"] },
  { id: 206, name: "Devotion", category: "Couple's Stainless Steel", image: "/image 29.jpg", badge: "BESTSELLER", rating: 4.8, originalPrice: 21999, price: 10999, swatches: ["#C0C0C0", "#D4AF37"] },
  { id: 207, name: "Elite", category: "Men's Leather", image: "/image 11.jpg", badge: "BESTSELLER", rating: 4.7, originalPrice: 27999, price: 13999, swatches: ["#1A1A1A", "#C0C0C0"] },
  { id: 208, name: "Horizonx Smartwatch", category: "1.38\" IPS Display", image: "/image 25.jpg", badge: "NEW", rating: 4.9, originalPrice: 8000, price: 4999, swatches: ["#D4AF37", "#1A1A1A", "#C0C0C0"] },
];

function formatPrice(value) {
  return `Rs ${value.toLocaleString("en-PK")}`;
}

/* ------------------------------------------------------------------ */
/*  Cart / Quick Buy helpers — identical contract to the rest of the   */
/*  site so items added here behave the same on every other page.      */
/* ------------------------------------------------------------------ */

function addToCart(product) {
  if (typeof window === "undefined") return;
  const existing = JSON.parse(localStorage.getItem("cart") || "[]");
  const idx = existing.findIndex((item) => item.id === product.id);
  if (idx > -1) {
    existing[idx].quantity += 1;
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

/* ------------------------------------------------------------------ */
/*  Scroll-reveal — one small, restrained utility used once per        */
/*  section header, not on every card. Respects reduced motion.        */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — split "his & hers" panels, one orchestrated load sequence   */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      className={`${playfair.variable} relative w-full overflow-hidden rounded-3xl mb-16 sm:mb-20`}
    >
      <div className="relative flex min-h-[560px] w-full flex-col sm:min-h-[620px] sm:flex-row lg:min-h-[680px]">
        {/* Left panel — Men */}
        <div className="relative h-[280px] flex-1 sm:h-auto">
          <Image
            src="/Man.jpg"
            alt="Men's watch collection"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover hero-pan-left"
          />
          <div className="absolute inset-0 bg-[#0F0D0A]/55" />
        </div>

        {/* Right panel — Women */}
        <div className="relative h-[280px] flex-1 sm:h-auto">
          <Image
            src="/Woman.jpg"
            alt="Women's watch collection"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover hero-pan-right"
          />
          <div className="absolute inset-0 bg-[#0F0D0A]/55" />
        </div>

        {/* Center vignette so text stays legible over both panels */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F0D0A]/85 via-[#0F0D0A]/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0F0D0A]/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center sm:px-10">
          <span className="hero-in hero-in-1 mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A44C]/50 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#E8D9AE] backdrop-blur-sm">
            The Watch Store
            <span className="h-1 w-1 rounded-full bg-[#C9A44C]" />
            Fall Collection
          </span>

          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="hero-in hero-in-2 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Time, held to a
            <br />
            <span className="text-[#D9C384]">higher standard.</span>
          </h1>

          <p className="hero-in hero-in-3 mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
            Stainless steel, leather and bracelet watches for him, her, and
            every moment shared between two — plus smart watches built for
            everyday life.
          </p>

          <div className="hero-in hero-in-4 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/Men"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0F0D0A] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
            >
              Shop Men
            </Link>
            <Link
              href="/Women"
              className="rounded-xl border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#0F0D0A]"
            >
              Shop Women
            </Link>
          </div>

          <div className="hero-in hero-in-5 mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.14em] text-white/60">
            <Link href="/smartWatches" className="transition-colors hover:text-white">
              Smart Watches
            </Link>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <Link href="/forCouples" className="transition-colors hover:text-white">
              For Couples
            </Link>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <Link href="/newArrival" className="transition-colors hover:text-white">
              New Arrivals
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hero-rise {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes hero-pan {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }
        .hero-in {
          opacity: 0;
          animation: hero-rise 0.7s ease-out forwards;
        }
        .hero-in-1 { animation-delay: 0.05s; }
        .hero-in-2 { animation-delay: 0.16s; }
        .hero-in-3 { animation-delay: 0.28s; }
        .hero-in-4 { animation-delay: 0.4s; }
        .hero-in-5 { animation-delay: 0.5s; }
        .hero-pan-left, .hero-pan-right {
          animation: hero-pan 1.4s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-in {
            opacity: 1;
            animation: none;
            transform: none;
          }
          .hero-pan-left, .hero-pan-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Category bento — asymmetric, not four identical cards              */
/* ------------------------------------------------------------------ */

function CategoryTile({ href, image, label, tagline, className = "" }) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-2xl ${className}`}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A]/80 via-[#0F0D0A]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
        <div>
          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl font-semibold text-white sm:text-2xl"
          >
            {label}
          </h3>
          <p className="mt-1 text-xs text-white/70 sm:text-sm">{tagline}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-[#0F0D0A]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function CategoryBento() {
  return (
    <section className="mb-16 sm:mb-20">
      <Reveal className="mb-6 flex items-end justify-between sm:mb-8">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8B7B4A]">
            Shop by collection
          </span>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl"
          >
            Four collections, one standard.
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-5 lg:h-[560px]">
        <CategoryTile
          href="/Men"
          image="/Man.jpg"
          label="Men"
          tagline="Stainless steel &amp; leather"
          className="col-span-2 row-span-1 h-[240px] sm:col-span-1 sm:row-span-2 sm:h-full"
        />
        <CategoryTile
          href="/Women"
          image="/Woman.jpg"
          label="Women"
          tagline="Bracelet &amp; mesh band"
          className="h-[200px] sm:h-full"
        />
        <CategoryTile
          href="/smartWatches"
          image="/image 25.jpg"
          label="Smart Watches"
          tagline="Modern tech, classic face"
          className="h-[200px] sm:h-full"
        />
        <CategoryTile
          href="/forCouples"
          image="/image 27.jpg"
          label="For Couples"
          tagline="Matching pairs, made for two"
          className="col-span-2 h-[200px] sm:col-span-1 sm:h-full"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Product card — same visual language as the category pages          */
/* ------------------------------------------------------------------ */

function ProductCard({ product, onQuickBuy }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleQuickBuy = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onQuickBuy(product);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-300/80 hover:shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${
              BADGE_STYLES[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          aria-label="Like product"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
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

      <div className="flex flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.swatches.map((color, i) => (
              <span
                key={i}
                className="h-4 w-4 rounded-full border border-gray-300 shadow-sm ring-1 ring-white transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>

        <h3 className="text-base font-semibold leading-tight tracking-tight text-gray-900">
          {product.name}
        </h3>

        <div className="mt-0.5 flex items-baseline gap-2.5">
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
              : "border-gray-900 bg-gray-900 text-white hover:border-gray-800 hover:bg-gray-800"
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

/* ------------------------------------------------------------------ */
/*  Bestsellers                                                        */
/* ------------------------------------------------------------------ */

function BestSellers({ onQuickBuy }) {
  return (
    <section className="mb-16 sm:mb-20">
      <Reveal className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8B7B4A]">
            Most gifted
          </span>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl"
          >
            This season&apos;s bestsellers.
          </h2>
        </div>
        <Link
          href="/bextSellers"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
        >
          View all bestsellers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {BESTSELLERS.map((product) => (
          <ProductCard key={product.id} product={product} onQuickBuy={onQuickBuy} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Craft / trust band                                                  */
/* ------------------------------------------------------------------ */

function CraftBand() {
  return (
    <Reveal className="mb-16 sm:mb-20">
      <section className="grid grid-cols-1 items-stretch gap-8 overflow-hidden rounded-3xl bg-[#0F0D0A] lg:grid-cols-2 lg:gap-0">
        <div className="relative order-2 h-[320px] lg:order-1 lg:h-full">
          <Image
            src="/image 10.jpg"
            alt="Watch craftsmanship detail"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:order-2 lg:px-14">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#C9A44C]">
            Built to last
          </span>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 max-w-md text-2xl font-semibold leading-tight text-white sm:text-3xl"
          >
            Every case is finished, tested, and checked by hand before it
            leaves the workshop.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
            Stainless steel casings, sapphire-coated crystal and genuine
            leather straps — chosen so the watch on your wrist today still
            looks right in ten years.
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
            <Star className="h-4 w-4 fill-[#C9A44C] text-[#C9A44C]" />
            4.8 average rating across 2,400+ orders
          </p>
        </div>
      </section>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing CTA                                                         */
/* ------------------------------------------------------------------ */

function ClosingCTA() {
  return (
    <Reveal>
      <section className="mb-6 rounded-3xl border border-gray-200/80 px-6 py-12 text-center sm:px-10 sm:py-16">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-2xl font-semibold text-gray-900 sm:text-3xl"
        >
          Find the piece that finds you.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 sm:text-base">
          New styles land every month across men&apos;s, women&apos;s, and
          couples&apos; collections.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/newArrival"
            className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gray-800"
          >
            Explore New Arrivals
          </Link>
          <Link
            href="/bextSellers"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-900 hover:text-gray-900"
          >
            View Best Sellers
          </Link>
        </div>

        {/* Scrolling promo ticker */}
        <PromoTicker />
      </section>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Promo ticker — continuous scrolling strip of offers/badges         */
/* ------------------------------------------------------------------ */

const TICKER_ITEMS = [
  { icon: Truck, text: "shipping on all orders" },
  { icon: BadgePercent, text: "Up to 50% off select styles" },
  { icon: ShieldCheck, text: "2-year warranty included" },
  { icon: Gift, text: "Free gift wrapping" },
  { icon: Sparkles, text: "New arrivals every month" },
  { icon: Star, text: "4.8★ rated by 2,400+ customers" },
];

function PromoTicker() {
  const renderItems = (keyPrefix) =>
    TICKER_ITEMS.map((item, i) => (
      <span key={`${keyPrefix}-${i}`} className="ticker-item">
        <item.icon className="h-3.5 w-3.5 text-[#C9A44C]" />
        <span>{item.text}</span>
        <span className="ticker-dot" />
      </span>
    ));

  return (
    <div className="relative mt-9 overflow-hidden rounded-full border border-[#C9A44C]/25 bg-[#0F0D0A] py-3 text-left shadow-sm">
      <div className="ticker-track flex w-max items-center whitespace-nowrap px-8">
        {renderItems("a")}
        {renderItems("b")}
      </div>

      {/* Fade edges so the loop feels seamless */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0F0D0A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0F0D0A] to-transparent" />

      <style jsx global>{`
        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .ticker-track {
          animation: ticker-scroll 24s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-right: 1.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
        }
        .ticker-dot {
          margin-left: 1.5rem;
          height: 4px;
          width: 4px;
          border-radius: 9999px;
          background: rgba(201, 164, 76, 0.5);
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const router = useRouter();

  const handleQuickBuy = (product) => {
    addToCart(product);
    setQuickBuyProduct(product);
    router.push(`/QuickBuy?id=${product.id}`);
  };

  return (
    <main className="mx-auto max-w-[1800px] px-4 py-8 sm:px-8">
      <Hero />
      <CategoryBento />
      <BestSellers onQuickBuy={handleQuickBuy} />
      <CraftBand />
      <ClosingCTA />
    </main>
  );
}