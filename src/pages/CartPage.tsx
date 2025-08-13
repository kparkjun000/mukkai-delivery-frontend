import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/store';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, storeId } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              장바구니가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-6">
              맛있는 음식을 주문해보세요!
            </p>
            <Link to="/">
              <Button>음식점 둘러보기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">장바구니</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 장바구니 아이템 목록 */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>주문 내역</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 주문 요약 */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
