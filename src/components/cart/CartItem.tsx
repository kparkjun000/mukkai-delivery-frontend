import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/order.types';
import { useCartStore } from '@/store';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b last:border-b-0">
      {/* 메뉴 이미지 */}
      <div className="flex-shrink-0">
        <img
          src={item.thumbnailUrl || '/placeholder-menu.jpg'}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-menu.jpg';
          }}
        />
      </div>

      {/* 메뉴 정보 */}
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-lg font-semibold text-primary">
          {item.amount.toLocaleString()}원
        </p>
      </div>

      {/* 수량 조절 */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-2 text-red-500 hover:text-red-700"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* 총 가격 */}
      <div className="text-right min-w-fit">
        <p className="font-semibold text-gray-900">
          {(item.amount * item.quantity).toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
