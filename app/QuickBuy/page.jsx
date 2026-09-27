"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, ChevronLeft, Minus, Plus } from "lucide-react";

const WHATSAPP_NUMBER = "923248571076";

function formatPrice(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-PK")}`;
}

function QuickBuyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const id = searchParams.get("id");

      const stored = JSON.parse(
        localStorage.getItem("quickBuyProduct") || "null"
      );

      if (stored && (!id || String(stored.id) === String(id))) {
        setProduct(stored);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading QuickBuy product:", error);
      setNotFound(true);
    }
  }, [searchParams]);

  const handleConfirm = () => {
    if (!product) return;

    const price = Number(product.price || 0);
    const total = price * quantity;

    const message =
      `Hi! I'd like to place an order:\n\n` +
      `Product: ${product.name || "N/A"}\n` +
      `Category: ${product.category || "N/A"}\n` +
      `Quantity: ${quantity}\n` +
      `Unit Price: ${formatPrice(price)}\n` +
      `Total: ${formatPrice(total)}\n\n` +
      `Please confirm availability and delivery details.`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (notFound) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-8 py-16 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          We couldn&apos;t find that product
        </h1>

        <p className="text-gray-500 mb-6">
          It may have been removed, or the link is out of date.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-900 bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-8 py-16 text-center text-gray-500">
        Loading...
      </main>
    );
  }

  const price = Number(product.price || 0);
  const originalPrice = Number(product.originalPrice || 0);
  const total = price * quantity;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Continue shopping
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
        {/* Product Image */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-gray-100 border border-gray-200/80">
          <Image
            src={product.image}
            alt={product.name || "Product"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {product.category || "Product"}
            </span>

            <span className="flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-800 border border-gray-200/80">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {Number(product.rating || 0).toFixed(1)}
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            {originalPrice > 0 && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}

            <span className="text-2xl font-bold text-red-600">
              {formatPrice(price)}
            </span>
          </div>

          {/* Color Swatches */}
          {product.swatches?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Colors:
              </span>

              {product.swatches.map((color, i) => (
                <span
                  key={`${color}-${i}`}
                  className="h-5 w-5 rounded-full border border-gray-300 ring-1 ring-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-500">
              Quantity
            </span>

            <div className="flex items-center rounded-xl border border-gray-300">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-xl transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-10 text-center text-sm font-medium text-gray-900">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-xl transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-baseline justify-between mt-2 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Total
            </span>

            <span className="text-xl font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleConfirm}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-green-600 bg-green-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600/20"
          >
            <ShoppingBag className="h-4 w-4" />
            Confirm Order via WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}

export default function QuickBuyPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-2xl mx-auto px-4 sm:px-8 py-16 text-center text-gray-500">
          Loading...
        </main>
      }
    >
      <QuickBuyContent />
    </Suspense>
  );
}