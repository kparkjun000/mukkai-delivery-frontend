import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Store, ArrowLeft } from "lucide-react";
import { useStoreUserStore } from "@/store/storeUserStore";

const ownerLoginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type OwnerLoginForm = z.infer<typeof ownerLoginSchema>;

export default function OwnerLoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useStoreUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OwnerLoginForm>({
    resolver: zodResolver(ownerLoginSchema),
  });

  const onSubmit = async (data: OwnerLoginForm) => {
    try {
      await login(data.email, data.password);
      navigate("/owner/dashboard");
    } catch (error) {
      // 에러는 스토어에서 처리됨
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Store className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              가게 사장 로그인
            </CardTitle>
            <CardDescription>가게 관리 대시보드에 접속하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="owner@store.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                아직 가게를 등록하지 않으셨나요?
              </p>
              <Link
                to="/owner/register"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                가게 등록하기 →
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/auth/login"
                className="text-sm text-muted-foreground hover:text-gray-900"
              >
                일반 사용자 로그인
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 테스트 계정 안내 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="text-center">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  🧪 테스트 계정
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>이메일: owner@test.com</p>
                  <p>비밀번호: 1234</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
