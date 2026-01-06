"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TabLayout() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex border-b border-gray-200 bg-gray-100">
        {[
          { id: "dashboard", link: "/", label: "Dashboard" },
          { id: "data-entry", link: "/data-entry", label: "Data Entry" },
          { id: "charts", link: "/charts", label: "Charts" },
          { id: "goals", link: "/goals", label: "Goals" },
          { id: "profile", link: "/profile", label: "Profile" },
        ].map((tab) => (
          <Link
            key={tab.id}
            href={tab.link}
            className={`flex-1 px-5 py-4 font-medium transition-all ${pathname === tab.link ? "border-b-4 border-blue-400 bg-white text-blue-400" : "bg-transparent text-gray-600 hover:bg-gray-200"}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </>
  );
}
