import { motion } from "framer-motion";
import { StoreCard } from "./StoreCard";
import { StoreResponse } from "@/types/store.types";
import { StoreCardSkeleton, ErrorMessage } from "@/components/common";

interface StoreListProps {
  stores: StoreResponse[];
  isLoading: boolean;
  error: any;
}

export function StoreList({ stores, isLoading, error }: StoreListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <StoreCardSkeleton />
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        type="server"
        title="가게 목록을 불러올 수 없습니다"
        message="잠시 후 다시 시도해주세요"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (stores.length === 0) {
    return (
      <ErrorMessage
        type="notFound"
        title="해당 카테고리의 가게가 없습니다"
        message="다른 카테고리를 선택해보세요"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store, index) => (
        <motion.div
          key={store.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <StoreCard store={store} />
        </motion.div>
      ))}
    </div>
  );
}
