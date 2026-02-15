"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar, { NavItem } from "@/layout/MyAppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useReducer } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGaugeHigh, faUser } from "@fortawesome/free-solid-svg-icons";
import { UIReducer } from "./reducer/AdminReducer";
// Initiate fontawesome
config.autoAddCss = false;

const Items: NavItem[] = [
  {
    icon: <FontAwesomeIcon icon={faGaugeHigh} />,
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    name: "User Management",
    path: "/admin/users",
    subItems: [
      {
        name: "All Users",
        path: "/admin/users/all",
      },
      {
        name: "Add New User",
        path: "/admin/users/new",
      },
    ],
  },
];

// Create a wrapper component that uses the sidebar context
const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
  // Use the hook inside a component that's wrapped by SidebarProvider
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar _items={Items} />
      <Backdrop />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
        <div className="mx-auto max-w-7xl p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [uiState] = useReducer(UIReducer, { showErrorAlert: false });

  console.log("UI LAYOUT STATE:", uiState);

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AdminLayoutContent>
          {uiState.showErrorAlert && (
            <div className="fixed top-4 right-4 z-50 rounded bg-red-500 px-4 py-2 text-white shadow">
              {uiState.message ?? "An unexpected error occurred."}
            </div>
          )}
          {children}
        </AdminLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
