"use client";

import { useState } from "react";
import {
  Settings,
  Store,
  User,
  Bell,
  Shield,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "My Store",
    email: "admin@example.com",
    phone: "03001234567",
    address: "Lahore, Punjab, Pakistan",

    currency: "PKR",
    tax: "5",

    emailNotifications: true,
    orderNotifications: true,
    stockNotifications: true,

    maintenanceMode: false,
    allowGuestCheckout: true,
  });

  const [saved, setSaved] = useState(false);

  function updateSetting(name, value) {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-2xl font-bold sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your admin panel and store settings.
        </p>

      </div>

      <form
        onSubmit={handleSave}
        className="space-y-6"
      >

        {/* Store Settings */}
        <section className="rounded-2xl bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b p-6">

            <div className="rounded-xl bg-gray-100 p-3">
              <Store size={22} />
            </div>

            <div>
              <h2 className="font-bold">
                Store Information
              </h2>

              <p className="text-sm text-gray-500">
                Basic information about your store.
              </p>
            </div>

          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Store Name
              </label>

              <input
                value={settings.storeName}
                onChange={(e) =>
                  updateSetting(
                    "storeName",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Store Email
              </label>

              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  updateSetting(
                    "email",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                value={settings.phone}
                onChange={(e) =>
                  updateSetting(
                    "phone",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Currency
              </label>

              <select
                value={settings.currency}
                onChange={(e) =>
                  updateSetting(
                    "currency",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              >
                <option value="PKR">
                  PKR - Pakistani Rupee
                </option>

                <option value="USD">
                  USD - US Dollar
                </option>

                <option value="EUR">
                  EUR - Euro
                </option>

                <option value="GBP">
                  GBP - British Pound
                </option>
              </select>
            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium">
                Store Address
              </label>

              <textarea
                rows={3}
                value={settings.address}
                onChange={(e) =>
                  updateSetting(
                    "address",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />

            </div>

          </div>

        </section>

        {/* Admin Settings */}
        <section className="rounded-2xl bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b p-6">

            <div className="rounded-xl bg-gray-100 p-3">
              <User size={22} />
            </div>

            <div>
              <h2 className="font-bold">
                Admin Account
              </h2>

              <p className="text-sm text-gray-500">
                Manage administrator information.
              </p>
            </div>

          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Admin Email
              </label>

              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  updateSetting(
                    "email",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                value={settings.phone}
                onChange={(e) =>
                  updateSetting(
                    "phone",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

          </div>

        </section>

        {/* Notifications */}
        <section className="rounded-2xl bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b p-6">

            <div className="rounded-xl bg-gray-100 p-3">
              <Bell size={22} />
            </div>

            <div>
              <h2 className="font-bold">
                Notifications
              </h2>

              <p className="text-sm text-gray-500">
                Configure admin notifications.
              </p>
            </div>

          </div>

          <div className="divide-y p-6">

            <ToggleSetting
              title="Email Notifications"
              description="Receive general store notifications by email."
              enabled={settings.emailNotifications}
              onChange={(value) =>
                updateSetting(
                  "emailNotifications",
                  value
                )
              }
            />

            <ToggleSetting
              title="New Order Notifications"
              description="Receive a notification whenever a new order is placed."
              enabled={settings.orderNotifications}
              onChange={(value) =>
                updateSetting(
                  "orderNotifications",
                  value
                )
              }
            />

            <ToggleSetting
              title="Low Stock Notifications"
              description="Receive notifications when products are running low."
              enabled={settings.stockNotifications}
              onChange={(value) =>
                updateSetting(
                  "stockNotifications",
                  value
                )
              }
            />

          </div>

        </section>

        {/* Security / Store */}
        <section className="rounded-2xl bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b p-6">

            <div className="rounded-xl bg-gray-100 p-3">
              <Shield size={22} />
            </div>

            <div>
              <h2 className="font-bold">
                Store & Security
              </h2>

              <p className="text-sm text-gray-500">
                Configure store access and maintenance.
              </p>
            </div>

          </div>

          <div className="divide-y p-6">

            <ToggleSetting
              title="Allow Guest Checkout"
              description="Allow customers to place orders without creating an account."
              enabled={settings.allowGuestCheckout}
              onChange={(value) =>
                updateSetting(
                  "allowGuestCheckout",
                  value
                )
              }
            />

            <ToggleSetting
              title="Maintenance Mode"
              description="Temporarily disable the storefront while you perform maintenance."
              enabled={settings.maintenanceMode}
              onChange={(value) =>
                updateSetting(
                  "maintenanceMode",
                  value
                )
              }
            />

          </div>

        </section>

        {/* Save */}
        <div className="flex flex-col items-stretch justify-end gap-4 sm:flex-row sm:items-center">

          {saved && (
            <p className="text-sm font-medium text-green-600">
              Settings saved successfully.
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            <Save size={18} />
            Save Settings
          </button>

        </div>

      </form>

    </div>
  );
}

function ToggleSetting({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">

      <div>
        <h3 className="font-medium">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`
          relative h-7 w-12 shrink-0 rounded-full transition
          ${enabled ? "bg-black" : "bg-gray-300"}
        `}
      >

        <span
          className={`
            absolute top-1 h-5 w-5 rounded-full bg-white transition
            ${enabled ? "left-6" : "left-1"}
          `}
        />

      </button>

    </div>
  );
}