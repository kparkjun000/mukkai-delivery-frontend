import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Heart, Utensils, Star } from "lucide-react";

interface FoodieMascotProps {
  className?: string;
}

export function FoodieMascot({ className }: FoodieMascotProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentExpression, setCurrentExpression] = useState(0);

  // 먹깨비의 다양한 표정들
  const expressions = [
    { emoji: "😋", message: "맛있겠다!" },
    { emoji: "🤤", message: "군침이 도네~" },
    { emoji: "😍", message: "완전 맛있어!" },
    { emoji: "🥰", message: "Foodie 최고!" },
    { emoji: "😁", message: "배고파요!" },
  ];

  // 5초마다 표정 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExpression((prev) => (prev + 1) % expressions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [expressions.length]);

  const handleClick = () => {
    // 클릭 시 랜덤 표정 변경
    const randomIndex = Math.floor(Math.random() * expressions.length);
    setCurrentExpression(randomIndex);
  };

  const currentEmoji = expressions[currentExpression];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.6,
          }}
          className={`fixed bottom-6 right-6 z-50 ${className}`}
        >
          {/* 말풍선 */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-3 mr-2"
              >
                <div className="relative">
                  <div className="bg-white text-gray-800 px-4 py-2 rounded-2xl shadow-lg border border-gray-200 text-sm font-medium whitespace-nowrap">
                    {currentEmoji.message}
                  </div>
                  {/* 말풍선 꼬리 */}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 먹깨비 캐릭터 */}
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative w-16 h-16 cursor-pointer"
          >
            {/* 그림자 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full blur-sm"></div>

            {/* 먹깨비 몸체 */}
            <div className="relative w-16 h-16 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-lg border-3 border-white">
              {/* 하이라이트 */}
              <div className="absolute top-1.5 left-2 w-3 h-3 bg-white/30 rounded-full blur-sm"></div>

              {/* 표정 */}
              <motion.div
                key={currentExpression}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute inset-0 flex items-center justify-center text-xl"
              >
                {currentEmoji.emoji}
              </motion.div>

              {/* 요리사 모자 */}
              <motion.div
                animate={isHovered ? { rotate: [-5, 5, -5] } : {}}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                className="absolute -top-5 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-10 h-6 bg-white rounded-t-xl border-2 border-gray-300 relative">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-gray-100 to-white rounded-t-lg border border-gray-200"></div>
                  {/* 모자 장식 */}
                  <ChefHat className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 text-orange-500" />
                </div>
              </motion.div>

              {/* 하트 효과 */}
              <AnimatePresence>
                {isHovered && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, (i - 1) * 20],
                          y: [0, -30 - i * 10],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2"
                      >
                        <Heart className="w-2 h-2 text-red-500 fill-current" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* 접촉 시 반짝임 효과 */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-400/30"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 30}%`,
                        left: `${
                          20 + Math.cos((i * 60 * Math.PI) / 180) * 30
                        }%`,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 닫기 버튼 */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
