"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
  ShoppingCart,
} from "lucide-react";

const initialOrders = [
  {
    id: "#ORD-1001",
    customer: "Ali Raza",
    email: "ali@example.com",
    phone: "03001234567",
    date: "03 Sep 2026",
    amount: 12500,
    status: "Delivered",
    address: "Lahore, Punjab, Pakistan",
    items: [
      {
        name: "Premium Watch",
        quantity: 1,
        price: 12500,
      },
    ],
  },
  {
    id: "#ORD-1002",
    customer: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "03111234567",
    date: "02 Sep 2026",
    amount: 8750,
    status: "Processing",
    address: "Kasur, Punjab, Pakistan",
    items: [
      {
        name: "Classic Shirt",
        quantity: 1,
        price: 4500,
      },
      {
        name: "Leather Wallet",
        quantity: 1,
        price: 4250,
      },
    ],
  },
  {
    id: "#ORD-1003",
    customer: "Usman Ali",
    email: "usman@example.com",
    phone: "03221234567",
    date: "01 Sep 2026",
    amount: 18200,
    status: "Shipped",
    address: "Islamabad, Pakistan",
    items: [
      {
        name: "Running Shoes",
        quantity: 2,
        price: 9100,
      },
    ],
  },
  {
    id: "#ORD-1004",
    customer: "Hamza Malik",
    email: "hamza@example.com",
    phone: "03331234567",
    date: "31 Aug 2026",
    amount: 6400,
    status: "Pending",
    address: "Faisalabad, Punjab, Pakistan",
    items: [
      {
        name: "Leather Wallet",
        quantity: 2,
        price: 3200,
      },
    ],
  },
];

function getStatusClass(status) {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    case "Shipped":
      return "bg-purple-100 text-purple-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const filteredOrders = orders.filter((order) => {

    const matchesSearch =
      order.id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.customer
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function updateStatus(id, status) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order
      )
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder({
        ...selectedOrder,
        status,
      });
    }
  }

  function deleteOrder(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    setOrders((prev) =>
      prev.filter((order) => order.id !== id)
    );

    setSelectedOrder(null);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-2xl font-bold sm:text-3xl">
          Orders
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage and track all customer orders.
        </p>

      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">

        <div className="grid gap-4 md:grid-cols-[1fr_220px]">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search order or customer..."
              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-black"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border px-4 py-3 outline-none focus:border-black"
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

        </div>

      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="font-bold">
            All Orders
          </h2>

          <p className="text-sm text-gray-500">
            {filteredOrders.length} orders found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">

                <th className="px-6 py-4">
                  Order
                </th>

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Amount
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >

                  <td className="px-6 py-5 font-semibold">
                    {order.id}
                  </td>

                  <td className="px-6 py-5">

                    <p className="font-medium">
                      {order.customer}
                    </p>

                    <p className="text-xs text-gray-400">
                      {order.email}
                    </p>

                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {order.date}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    Rs {order.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        className="rounded-lg p-2 hover:bg-blue-50 hover:text-blue-600"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          deleteOrder(order.id)
                        }
                        className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {filteredOrders.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No orders found.
            </div>
          )}

        </div>

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">

            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">

              <div>
                <h2 className="text-xl font-bold">
                  {selectedOrder.id}
                </h2>

                <p className="text-sm text-gray-500">
                  Order details
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-6 p-6">

              {/* Customer */}
              <div>

                <h3 className="mb-3 font-semibold">
                  Customer Information
                </h3>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="font-medium">
                    {selectedOrder.customer}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedOrder.email}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedOrder.phone}
                  </p>

                </div>

              </div>

              {/* Address */}
              <div>

                <h3 className="mb-3 font-semibold">
                  Shipping Address
                </h3>

                <div className="rounded-xl bg-gray-50 p-4 text-sm">
                  {selectedOrder.address}
                </div>

              </div>

              {/* Items */}
              <div>

                <h3 className="mb-3 font-semibold">
                  Order Items
                </h3>

                <div className="space-y-3">

                  {selectedOrder.items.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border p-4"
                      >

                        <div className="flex items-center gap-3">

                          <div className="rounded-lg bg-gray-100 p-3">
                            <ShoppingCart size={20} />
                          </div>

                          <div>
                            <p className="font-medium">
                              {item.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                        </div>

                        <p className="font-semibold">
                          Rs{" "}
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t pt-5">

                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  Rs{" "}
                  {selectedOrder.amount.toLocaleString()}
                </span>

              </div>

              {/* Status */}
              <div>

                <label className="mb-2 block font-semibold">
                  Update Order Status
                </label>

                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateStatus(
                      selectedOrder.id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}