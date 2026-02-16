"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar, { NavItem } from "@/layout/MyAppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useReducer } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGaugeHigh, faUser } from "@fortawesome/free-solid-svg-icons";
import { UIProvider, useUI } from "./reducer/AdminProvider";
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
  return (
    <ThemeProvider>
      <UIProvider>
        <SidebarProvider>
          <AdminLayoutContentWrapper>{children}</AdminLayoutContentWrapper>
        </SidebarProvider>
      </UIProvider>
    </ThemeProvider>
  );
}

const AdminLayoutContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch } = useUI();

  useEffect(() => {
    if (state.showErrorAlert || state.showSuccessAlert) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_SUCCESS_ALERT" });
        dispatch({ type: "HIDE_ERROR_ALERT" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.showErrorAlert, state.showSuccessAlert, dispatch]);

  return (
    <AdminLayoutContent>
      {state.showErrorAlert && (
        <div className="fixed top-25 right-4 z-100 rounded bg-red-500 px-4 py-2 text-white shadow">
          {state.message ?? "An unexpected error occurred."}
        </div>
      )}
      {state.showSuccessAlert && (
        <div className="fixed top-25 right-4 z-100 rounded bg-green-500 px-4 py-2 text-white shadow">
          {state.message ?? "Success!"}
        </div>
      )}
      {children}
    </AdminLayoutContent>
  );
};
