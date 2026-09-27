"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Menu,
  X,
  Store,
  LogOut,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Plus,
} from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_logged_in");

    if (saved === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      sessionStorage.setItem("admin_logged_in", "true");
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Galat username ya password");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      sessionStorage.removeItem("admin_logged_in");
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
    }
  };

  /* ================= LOGIN ================= */

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-white">
              <Store size={28} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to manage your store
            </p>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Username
            </label>

            <input
              type="text"
              placeholder="Username enter karo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-900"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Password enter karo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-gray-900"
              required
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gray-950 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </button>

          <div className="mt-5 rounded-xl bg-gray-50 p-3 text-center text-xs text-gray-500">
            Default Login: admin / admin123
          </div>
        </form>
      </div>
    );
  }

  /* ================= ADMIN PANEL ================= */

  return (
    <div className="min-h-screen bg-gray-100">

      {/* MOBILE HEADER */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between bg-white px-4 shadow-md md:hidden">
        <Link
          href="/admin"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2 font-bold text-gray-900"
        >
          <Store size={24} />
          Admin Panel
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          {sidebarOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </header>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 transform bg-gray-950 text-white transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        md:translate-x-0`}
      >
        {/* LOGO */}
        <div className="flex h-20 items-center border-b border-gray-800 px-6">
          <Link
            href="/admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-950">
              <Store size={22} />
            </div>

            <div>
              <h1 className="font-bold">
                Admin Panel
              </h1>

              <p className="text-xs text-gray-400">
                Store Management
              </p>
            </div>
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="mt-6 px-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Main Menu
          </p>

          <div className="space-y-2">

            {/* Dashboard */}
            <Link
              href="/admin"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-950"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            {/* Products */}
            <Link
              href="/admin/products"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              <Package size={20} />
              Products
            </Link>

            {/* Orders */}
            <Link
              href="/admin/orders"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              <ShoppingCart size={20} />
              Orders
            </Link>

            {/* Settings */}
            <Link
              href="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              <Settings size={20} />
              Settings
            </Link>
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-h-screen md:ml-64">

        <div className="px-4 pb-10 pt-20 md:px-8 md:pt-8">

          {/* HEADER */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Welcome back, Admin.
              </p>
            </div>

            <Link
              href="/admin/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>

          {/* STATS */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Orders */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Total Orders
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    128
                  </h2>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <ShoppingCart size={24} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                +18% this month
              </div>
            </div>

            {/* Products */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Products
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    42
                  </h2>
                </div>

                <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                  <Package size={24} />
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                7 low stock products
              </div>
            </div>

            {/* Revenue */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Revenue
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Rs 845,200
                  </h2>
                </div>

                <div className="rounded-xl bg-green-50 p-3 text-green-600">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                +24% this month
              </div>
            </div>

            {/* Customers */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Customers
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    3,842
                  </h2>
                </div>

                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                  <Users size={24} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                +9% this month
              </div>
            </div>
          </div>

          {/* LOWER SECTION */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {/* RECENT ORDERS */}
            <div className="rounded-2xl bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Recent Orders
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest customer orders
                  </p>
                </div>

                <Link
                  href="/admin/orders"
                  className="text-sm font-semibold text-gray-900 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="divide-y divide-gray-100">

                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-semibold text-gray-900">
                      #ORD-1001
                    </p>

                    <p className="text-sm text-gray-500">
                      Ali Khan
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      Rs 12,500
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Delivered
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-semibold text-gray-900">
                      #ORD-1002
                    </p>

                    <p className="text-sm text-gray-500">
                      Ahmed Raza
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      Rs 8,900
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-semibold text-gray-900">
                      #ORD-1003
                    </p>

                    <p className="text-sm text-gray-500">
                      Usman Ali
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      Rs 15,200
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Processing
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* TOP PRODUCTS */}
            <div className="rounded-2xl bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Top Products
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Best selling products
                  </p>
                </div>

                <Link
                  href="/admin/products"
                  className="text-sm font-semibold text-gray-900 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="divide-y divide-gray-100">

                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                      <Package size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Premium Watch
                      </p>

                      <p className="text-sm text-gray-500">
                        48 sold
                      </p>
                    </div>
                  </div>

                  <p className="font-bold">
                    Rs 8,500
                  </p>
                </div>

                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                      <Package size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Classic Shirt
                      </p>

                      <p className="text-sm text-gray-500">
                        36 sold
                      </p>
                    </div>
                  </div>

                  <p className="font-bold">
                    Rs 3,200
                  </p>
                </div>

                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                      <Package size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Leather Wallet
                      </p>

                      <p className="text-sm text-gray-500">
                        29 sold
                      </p>
                    </div>
                  </div>

                  <p className="font-bold">
                    Rs 2,500
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-gray-900">
              Quick Actions
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-gray-900 hover:bg-gray-50"
              >
                <Package size={20} />
                <span className="font-semibold">
                  Manage Products
                </span>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-gray-900 hover:bg-gray-50"
              >
                <ShoppingCart size={20} />
                <span className="font-semibold">
                  Manage Orders
                </span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-gray-900 hover:bg-gray-50"
              >
                <Settings size={20} />
                <span className="font-semibold">
                  Store Settings
                </span>
              </Link>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}