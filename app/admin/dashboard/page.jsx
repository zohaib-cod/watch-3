"use client";

import Link from "next/link";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "248",
    change: "+12%",
    positive: true,
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+18%",
    positive: true,
    icon: ShoppingCart,
  },
  {
    title: "Total Sales",
    value: "Rs 845,200",
    change: "+24%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Customers",
    value: "3,842",
    change: "-3%",
    positive: false,
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "Ali Raza",
    amount: "Rs 12,500",
    status: "Delivered",
  },
  {
    id: "#ORD-1002",
    customer: "Ahmed Khan",
    amount: "Rs 8,750",
    status: "Processing",
  },
  {
    id: "#ORD-1003",
    customer: "Usman Ali",
    amount: "Rs 18,200",
    status: "Shipped",
  },
  {
    id: "#ORD-1004",
    customer: "Hamza Malik",
    amount: "Rs 6,400",
    status: "Pending",
  },
  {
    id: "#ORD-1005",
    customer: "Bilal Ahmed",
    amount: "Rs 9,900",
    status: "Delivered",
  },
];

const topProducts = [
  {
    name: "Premium Watch",
    category: "Watches",
    sales: 124,
    revenue: "Rs 124,000",
  },
  {
    name: "Classic Shirt",
    category: "Clothing",
    sales: 98,
    revenue: "Rs 98,000",
  },
  {
    name: "Leather Wallet",
    category: "Accessories",
    sales: 76,
    revenue: "Rs 76,000",
  },
  {
    name: "Running Shoes",
    category: "Shoes",
    sales: 64,
    revenue: "Rs 64,000",
  },
];

function statusStyle(status) {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    case "Shipped":
      return "bg-purple-100 text-purple-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back. Here's what's happening with your store.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Product
        </Link>

      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {stat.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-gray-100 p-3">
                  <Icon size={22} />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-1 text-sm">

                {stat.positive ? (
                  <ArrowUpRight
                    size={16}
                    className="text-green-600"
                  />
                ) : (
                  <ArrowDownRight
                    size={16}
                    className="text-red-600"
                  />
                )}

                <span
                  className={
                    stat.positive
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>

                <span className="text-gray-400">
                  vs last month
                </span>

              </div>

            </div>
          );
        })}

      </div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">

        {/* Sales Overview */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-bold">
                Sales Overview
              </h2>

              <p className="text-sm text-gray-500">
                Monthly sales performance
              </p>
            </div>

            <select className="rounded-lg border px-3 py-2 text-sm outline-none">
              <option>Last 7 Months</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>

          </div>

          {/* Chart */}
          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">

            {[45, 65, 52, 78, 62, 88, 72].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >

                  <div className="flex h-full w-full items-end">

                    <div
                      className="w-full rounded-t-lg bg-black transition hover:bg-gray-700"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                  </div>

                  <span className="text-xs text-gray-400">
                    {
                      [
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                      ][index]
                    }
                  </span>

                </div>
              )
            )}

          </div>

        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="font-bold">
            Quick Actions
          </h2>

          <div className="mt-5 space-y-3">

            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-xl border p-4 hover:bg-gray-50"
            >
              <div className="rounded-lg bg-gray-100 p-2">
                <Package size={20} />
              </div>

              <div>
                <p className="font-medium">
                  Manage Products
                </p>

                <p className="text-xs text-gray-500">
                  Add or edit products
                </p>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 rounded-xl border p-4 hover:bg-gray-50"
            >
              <div className="rounded-lg bg-gray-100 p-2">
                <ShoppingCart size={20} />
              </div>

              <div>
                <p className="font-medium">
                  View Orders
                </p>

                <p className="text-xs text-gray-500">
                  Manage customer orders
                </p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-xl border p-4 hover:bg-gray-50"
            >
              <div className="rounded-lg bg-gray-100 p-2">
                <Users size={20} />
              </div>

              <div>
                <p className="font-medium">
                  Store Settings
                </p>

                <p className="text-xs text-gray-500">
                  Update store settings
                </p>
              </div>
            </Link>

          </div>

        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="font-bold">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-500">
              Latest customer orders
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View All
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px]">

            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-4">Order</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-0"
                >

                  <td className="py-4 font-medium">
                    {order.id}
                  </td>

                  <td className="py-4">
                    {order.customer}
                  </td>

                  <td className="py-4 font-medium">
                    {order.amount}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <Link
                      href="/admin/orders"
                      className="inline-flex rounded-lg p-2 hover:bg-gray-100"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Top Products */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5">
          <h2 className="font-bold">
            Top Products
          </h2>

          <p className="text-sm text-gray-500">
            Best performing products
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {topProducts.map((product) => (
            <div
              key={product.name}
              className="rounded-xl border p-4"
            >

              <div className="flex h-24 items-center justify-center rounded-lg bg-gray-100">
                <Package size={32} className="text-gray-400" />
              </div>

              <h3 className="mt-4 font-semibold">
                {product.name}
              </h3>

              <p className="text-xs text-gray-500">
                {product.category}
              </p>

              <div className="mt-3 flex justify-between text-sm">
                <span>
                  {product.sales} sold
                </span>

                <span className="font-semibold">
                  {product.revenue}
                </span>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}