import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Store, User, MapPin, Phone, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ActionButton } from "@/components/common";
import { useStoreUserStore } from "@/store/storeUserStore";

const storeRegisterSchema = z
  .object({
    email: z.string().email("올바른 이메일을 입력해주세요"),
    password: z.string().min(1, "비밀번호를 입력해주세요"),
    confirmPassword: z.string(),
    name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
    storeName: z.string().min(2, "가게명은 최소 2자 이상이어야 합니다"),
    category: z.string().min(1, "카테고리를 선택해주세요"),
    address: z.string().min(5, "주소는 최소 5자 이상이어야 합니다"),
    phone: z
      .string()
      .regex(/^[0-9-+().\s]+$/, "올바른 전화번호를 입력해주세요"),
    description: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

type StoreRegisterForm = z.infer<typeof storeRegisterSchema>;

const categories = [
  { value: "KOREAN", label: "한식" },
  { value: "CHINESE", label: "중식" },
  { value: "JAPANESE", label: "일식" },
  { value: "WESTERN", label: "양식" },
  { value: "CHICKEN", label: "치킨" },
  { value: "PIZZA", label: "피자" },
  { value: "HAMBURGER", label: "햄버거" },
  { value: "COFFEE", label: "카페" },
  { value: "DESSERT", label: "디저트" },
  { value: "ETC", label: "기타" },
];

export default function StoreRegisterPage() {
  const navigate = useNavigate();
  const { register: registerStore, isLoading, error } = useStoreUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<StoreRegisterForm>({
    resolver: zodResolver(storeRegisterSchema),
  });

  const onSubmit = async (data: StoreRegisterForm) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerStore(registerData);
      navigate("/owner/login");
    } catch (error) {
      // 에러는 스토어에서 처리됨
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4"
            >
              <Store className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">점주 회원가입</CardTitle>
            <p className="text-muted-foreground">
              가게를 등록하고 배달 서비스를 시작하세요
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* 개인 정보 섹션 */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <User className="w-4 h-4" />
                  개인 정보
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    error={errors.password?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                  />
                </div>
              </div>

              {/* 가게 정보 섹션 */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Store className="w-4 h-4" />
                  가게 정보
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="storeName">가게명</Label>
                  <Input
                    id="storeName"
                    placeholder="맛있는 한식당"
                    {...register("storeName")}
                    error={errors.storeName?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    {...register("category")}
                  >
                    <option value="">카테고리를 선택하세요</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    주소
                  </Label>
                  <Input
                    id="address"
                    placeholder="서울시 강남구 테헤란로 123"
                    {...register("address")}
                    error={errors.address?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    전화번호
                  </Label>
                  <Input
                    id="phone"
                    placeholder="02-1234-5678"
                    {...register("phone")}
                    error={errors.phone?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    가게 소개 (선택사항)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="가게를 소개해주세요..."
                    rows={3}
                    {...register("description")}
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              <ActionButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
                loadingText="회원가입 중..."
              >
                회원가입
              </ActionButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                이미 계정이 있으신가요?{" "}
                <Link
                  to="/owner/login"
                  className="text-primary hover:underline font-medium"
                >
                  로그인하기
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
