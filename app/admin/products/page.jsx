"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  X,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Premium Watch",
    category: "Watches",
    price: 12500,
    stock: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "Classic Shirt",
    category: "Clothing",
    price: 4500,
    stock: 40,
    status: "Active",
  },
  {
    id: 3,
    name: "Leather Wallet",
    category: "Accessories",
    price: 3200,
    stock: 12,
    status: "Active",
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Shoes",
    price: 8500,
    stock: 0,
    status: "Out of Stock",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function openAddModal() {
    setEditingProduct(null);

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
    });

    setShowModal(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });

    setShowModal(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.category || !form.price) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: form.name,
                category: form.category,
                price: Number(form.price),
                stock: Number(form.stock),
                status: form.status,
              }
            : product
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        status: form.status,
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    setShowModal(false);
  }

  function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all products in your store.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-black"
          />

        </div>

      </div>

      {/* Product Table */}
      <div className="rounded-2xl bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="font-bold">
            All Products
          </h2>

          <p className="text-sm text-gray-500">
            {filteredProducts.length} products found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Stock
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

              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                        <Package
                          size={22}
                          className="text-gray-400"
                        />
                      </div>

                      <div>
                        <p className="font-semibold">
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          ID: {product.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-sm">
                    {product.category}
                  </td>

                  <td className="px-6 py-5 font-medium">
                    Rs {product.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    {product.stock}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          openEditModal(product)
                        }
                        className="rounded-lg p-2 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
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

          {filteredProducts.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No products found.
            </div>
          )}

        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-6">

              <div>
                <h2 className="text-xl font-bold">
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p className="text-sm text-gray-500">
                  Enter product information below.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Name
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter product name"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Watches">
                    Watches
                  </option>

                  <option value="Clothing">
                    Clothing
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                  <option value="Shoes">
                    Shoes
                  </option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Price
                  </label>

                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: e.target.value,
                      })
                    }
                    placeholder="12500"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Stock
                  </label>

                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stock: e.target.value,
                      })
                    }
                    placeholder="20"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Out of Stock">
                    Out of Stock
                  </option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border px-4 py-3 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-gray-800"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}