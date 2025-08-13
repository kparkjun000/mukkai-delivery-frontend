import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
import { useUIStore } from '@/store';
import { cn } from '@/lib/utils';

export function Toast() {
  const { toast, hideToast } = useUIStore();

  useEffect(() => {
    if (toast?.isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast?.isVisible) {
    return null;
  }

  const variants = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div
        className={cn(
          "flex items-center justify-between p-4 rounded-lg shadow-lg min-w-[300px] max-w-md",
          variants[toast.type]
        )}
      >
        <span className="text-sm font-medium">{toast.message}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 ml-2 text-current hover:bg-white/20"
          onClick={hideToast}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
