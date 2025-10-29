import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Bell,
  Settings,
  Mail,
  Phone,
  Lock,
  Shield,
  Globe,
  Smartphone,
  Save,
  Plus,
  Trash2,
  Edit,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store";
import { authApi } from "@/services/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDeleteAccount = async () => {
    if (!confirm("정말로 계정을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없으며, 모든 데이터가 삭제됩니다.")) {
      return;
    }

    // 한 번 더 확인
    if (!confirm("정말로 계정 삭제를 진행하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await authApi.deleteAccount();
      alert("계정이 성공적으로 삭제되었습니다.");
      logout();
      navigate("/");
    } catch (error: any) {
      console.error("계정 삭제 실패:", error);
      alert(error.message || "계정 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
        <p className="text-muted-foreground mb-6">
          프로필을 보려면 로그인해주세요.
        </p>
        <Button onClick={() => navigate("/auth/login")}>로그인하기</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-gray-900">프로필 및 설정</h1>
          <p className="text-muted-foreground">
            개인정보를 관리하고 계정 설정을 조정하세요.
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              개인정보
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              주소 관리
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              알림 설정
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              계정 설정
            </TabsTrigger>
          </TabsList>

          {/* 개인정보 탭 */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  개인정보 편집
                </CardTitle>
                <CardDescription>프로필 정보를 업데이트하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 프로필 정보 요약 */}
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                {/* 프로필 정보 */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" value={user.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input id="phone" placeholder="010-1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">주소</Label>
                    <Input id="address" defaultValue={user.address} />
                  </div>
                </div>

                <Button className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  변경사항 저장
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 주소 관리 탭 */}
          <TabsContent value="addresses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  주소 관리
                </CardTitle>
                <CardDescription>배송 주소를 관리하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">집</Badge>
                        <Badge variant="outline">기본 주소</Badge>
                      </div>
                      <p className="font-medium">{user.address}</p>
                      <p className="text-sm text-muted-foreground">서울시</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />새 주소 추가
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 알림 설정 탭 */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  알림 설정
                </CardTitle>
                <CardDescription>받고 싶은 알림을 선택하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Label>주문 업데이트</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        주문 상태 변경 시 알림을 받습니다.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Label>푸시 알림</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        모바일 기기로 푸시 알림을 받습니다.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <Label>SMS 알림</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        문자 메시지로 알림을 받습니다.
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <Label>보안 알림</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        계정 보안 관련 알림을 받습니다.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  알림 설정 저장
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 계정 설정 탭 */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  계정 설정
                </CardTitle>
                <CardDescription>
                  계정 보안 및 개인정보 설정을 관리하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <Label>2단계 인증</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        계정 보안을 강화하기 위해 2단계 인증을 사용합니다.
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>로그인 알림</Label>
                      <p className="text-sm text-muted-foreground">
                        새로운 기기에서 로그인할 때 알림을 받습니다.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <Label>공개 프로필</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        다른 사용자가 내 프로필을 볼 수 있도록 합니다.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-destructive">계정 관리</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      비밀번호 변경
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        if (confirm("정말 로그아웃하시겠습니까?")) {
                          logout();
                          navigate("/");
                        }
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      로그아웃
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting ? "삭제 중..." : "계정 삭제"}
                    </Button>
                  </div>
                </div>

                <Button className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  계정 설정 저장
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
