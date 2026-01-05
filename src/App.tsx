import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { Toast } from "@/components/ui/toast";
import { useEffect } from "react";

// QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5분
    },
  },
});

// localStorage에서 잘못된 Mock User 데이터 정리
function cleanupMockUserData() {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const authData = JSON.parse(authStorage);
      if (authData?.state?.user?.name) {
        // name이 "Mock", "mock", "Mock User" 등을 포함하거나
        // 이메일과 다른 경우 이메일 @ 앞부분으로 교체
        const user = authData.state.user;
        if (user.email) {
          const emailPrefix = user.email.split("@")[0];
          if (
            user.name.toLowerCase().includes("mock") ||
            user.name === "사용자" ||
            user.name !== emailPrefix
          ) {
            user.name = emailPrefix;
            localStorage.setItem("auth-storage", JSON.stringify(authData));
            console.log("Cleaned up mock user name to:", emailPrefix);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error cleaning up mock user data:", error);
  }
}

function App() {
  useEffect(() => {
    // 앱 시작 시 Mock User 데이터 정리
    cleanupMockUserData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
