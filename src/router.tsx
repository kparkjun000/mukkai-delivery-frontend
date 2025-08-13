import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Pages - 직접 import (동적 로딩 문제 해결)
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import StoreDetailPage from "@/pages/StoreDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrdersPage from "@/pages/OrdersPage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import ProfilePage from "@/pages/ProfilePage";
import SearchPage from "@/pages/SearchPage";
import MenuExplorePage from "@/pages/MenuExplorePage";

// 점주용 페이지들 - 직접 import
import StoreRegisterPage from "@/pages/StoreRegisterPage";
import OwnerDashboardPage from "@/pages/OwnerDashboardPage";
import OwnerLoginPage from "@/pages/OwnerLoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
      {
        path: "stores/:storeId",
        element: <StoreDetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "menu-explore",
        element: <MenuExplorePage />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:orderId",
        element: (
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // 점주용 라우트
  {
    path: "/owner",
    children: [
      {
        path: "login",
        element: <OwnerLoginPage />,
      },
      {
        path: "register",
        element: <StoreRegisterPage />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <OwnerDashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
