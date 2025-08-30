import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";

export function FoodieMascot() {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  // 도깨비의 다양한 메시지들
  const messages = [
    "스카이콩콩 타고 배달가요! 🚀",
    "도깨비방망이로 맛있는 음식 찾아요! 🍕",
    "흉칙하지만 착한 도깨비예요! 😈",
    "스크롤할 때마다 따라갈게요! 📜",
    "Foodie 앱이 최고예요! 👑",
    "배고파요... 음식 주세요! 🍽️",
    "도깨비 마법으로 빠른 배달! ✨",
    "스카이콩콩이 제일 좋아요! 🦘",
    "화면 끝까지 안 짤려요! 🎯",
    "클릭할 때마다 다른 말을 해요! 💬",
  ];

  // 클릭 시 메시지 변경
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(randomIndex);
  };

  // 스크롤 방향 감지
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 1 : -1;
      setScrollDirection(direction);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 스크롤에 따른 도깨비 위치 변화
  const mascotY = useTransform(scrollY, [0, 1000], [0, -100]);
  const mascotX = useTransform(scrollY, [0, 1000], [0, 50]);
  const mascotRotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const mascotScale = useTransform(scrollY, [0, 500], [1, 1.2]);

  // 스크롤 방향에 따른 추가 애니메이션
  const bounceY = useTransform(scrollY, [0, 100], [0, -10]);
  const bounceX = useTransform(scrollY, [0, 100], [0, scrollDirection * 5]);

  return (
    <motion.div
      className="fixed bottom-8 right-16 w-20 h-24 z-50 cursor-pointer"
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        y: mascotY,
        x: mascotX,
        rotate: mascotRotate,
        scale: mascotScale,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* 스카이콩콩 */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-lg"
        style={{
          y: bounceY,
          x: bounceX,
        }}
        animate={{
          scaleY: [1, 1.2, 1],
          scaleX: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 스카이콩콩 바디 */}
        <div className="w-full h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full relative">
          {/* 스카이콩콩 하이라이트 */}
          <div className="absolute top-2 left-2 w-1 h-2 bg-yellow-200 rounded-full opacity-60"></div>
          {/* 스카이콩콩 패턴 */}
          <div className="absolute top-6 left-1 w-2 h-1 bg-yellow-300 rounded-full opacity-40"></div>
          <div className="absolute top-10 left-2 w-1 h-1 bg-yellow-300 rounded-full opacity-40"></div>
        </div>

        {/* 스카이콩콩 스파클 효과 */}
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full"
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 스카이콩콩 그림자 */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm"></div>

        {/* 스카이콩콩 입구 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-yellow-300 rounded-full"></div>
      </motion.div>

      {/* 도깨비 */}
      <motion.div
        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 z-10"
        style={{
          y: bounceY,
          x: bounceX,
        }}
        animate={{
          y: [0, -2, 0],
          rotate: [0, -1, 0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 도깨비 얼굴 */}
        <div className="w-12 h-12 bg-gradient-to-b from-green-700 via-green-800 to-green-900 rounded-full shadow-lg border-2 border-green-600 relative">
          {/* 도깨비 뿔 */}
          <div className="absolute -top-2 left-2 w-2 h-3 bg-gray-800 rounded-t-full transform -rotate-12"></div>
          <div className="absolute -top-2 right-2 w-2 h-3 bg-gray-800 rounded-t-full transform rotate-12"></div>

          {/* 도깨비 눈 */}
          <div className="absolute top-3 left-3 w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full"></div>

          {/* 도깨비 눈동자 */}
          <div className="absolute top-3.5 left-3.5 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute top-3.5 right-3.5 w-1 h-1 bg-black rounded-full"></div>

          {/* 도깨비 입 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-black rounded-full"></div>

          {/* 도깨비 치아 */}
          <div className="absolute bottom-3.5 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white rounded-full"></div>

          {/* 도깨비 상처 */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-red-600 rounded-full"></div>
        </div>

        {/* 도깨비 몸통 */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-gradient-to-b from-green-600 to-green-800 rounded-full">
          {/* 도깨비 팔 */}
          <div className="absolute top-2 -left-3 w-3 h-4 bg-green-700 rounded-full transform -rotate-45"></div>
          <div className="absolute top-2 -right-3 w-3 h-4 bg-green-700 rounded-full transform rotate-45"></div>

          {/* 도깨비 다리 */}
          <div className="absolute bottom-0 left-1 w-2 h-4 bg-green-700 rounded-full transform -rotate-12"></div>
          <div className="absolute bottom-0 right-1 w-2 h-4 bg-green-700 rounded-full transform rotate-12"></div>
        </div>

        {/* 도깨비 헬멧 */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-yellow-500 rounded-full border-2 border-yellow-400">
          <div className="absolute top-1 left-2 w-1 h-1 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-1 right-2 w-1 h-1 bg-yellow-300 rounded-full"></div>
        </div>

        {/* 도깨비 방망이 */}
        <motion.div
          className="absolute top-4 -right-6 w-8 h-2 bg-brown-800 rounded-full transform rotate-45"
          animate={{
            rotate: [45, 50, 45],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute -top-1 right-0 w-3 h-4 bg-brown-900 rounded-full"></div>
        </motion.div>

        {/* 도깨비 오라 */}
        <motion.div
          className="absolute inset-0 w-16 h-16 bg-green-500/20 rounded-full -m-2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 파티클 효과 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

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
              <div className="bg-white text-gray-800 px-4 py-2 rounded-2xl shadow-lg border border-gray-200 text-sm font-medium whitespace-nowrap max-w-xs">
                {messages[currentMessage]}
              </div>
              {/* 말풍선 꼬리 */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
