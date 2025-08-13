import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store';

export function CartSummary() {
  const { items, getTotalAmount } = useCartStore();
  
  const subtotal = getTotalAmount();
  const deliveryFee = subtotal >= 20000 ? 0 : 3000; // 2만원 이상 무료배송
  const total = subtotal + deliveryFee;
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">주문 요약</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 주문 정보 */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>상품 수량</span>
            <span>{itemCount}개</span>
          </div>
          <div className="flex justify-between">
            <span>상품 금액</span>
            <span>{subtotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>배달료</span>
            <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
              {deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}
            </span>
          </div>
          {deliveryFee > 0 && (
            <div className="text-xs text-gray-500">
              {(20000 - subtotal).toLocaleString()}원 더 주문하시면 배달료 무료!
            </div>
          )}
        </div>

        <hr />

        {/* 총 금액 */}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>총 결제금액</span>
          <span className="text-primary">{total.toLocaleString()}원</span>
        </div>

        {/* 주문 버튼 */}
        <Link to="/checkout" className="block">
          <Button className="w-full" size="lg">
            주문하기
          </Button>
        </Link>

        {/* 최소 주문 금액 안내 */}
        <div className="text-xs text-gray-500 text-center">
          * 최소 주문 금액을 확인해주세요
        </div>
      </CardContent>
    </Card>
  );
}
