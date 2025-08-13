import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* 도시 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/30 to-black">
        {/* 도시 실루엣 */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          {/* 건물들 */}
          <div className="absolute bottom-0 left-0 w-16 h-24 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-20 w-20 h-32 bg-gray-700 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-44 w-12 h-20 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-60 w-16 h-28 bg-gray-600 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-80 w-14 h-22 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-96 w-18 h-30 bg-gray-700 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[28rem] w-16 h-26 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[32rem] w-20 h-34 bg-gray-600 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[36rem] w-12 h-18 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[40rem] w-16 h-24 bg-gray-700 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[44rem] w-14 h-20 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[48rem] w-18 h-28 bg-gray-600 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[52rem] w-16 h-22 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[56rem] w-20 h-30 bg-gray-700 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[60rem] w-14 h-26 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[64rem] w-16 h-24 bg-gray-600 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[68rem] w-18 h-32 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[72rem] w-12 h-20 bg-gray-700 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[76rem] w-20 h-28 bg-gray-800 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-[80rem] w-16 h-22 bg-gray-600 rounded-t-lg"></div>
          
          {/* 창문들 */}
          <div className="absolute bottom-8 left-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-22 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-22 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-22 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-46 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-46 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-62 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-62 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-62 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-82 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-82 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-98 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-98 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-98 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[28.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[28.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[32.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[32.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-[32.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[36.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[36.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[40.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[40.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-[40.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[44.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[44.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[48.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[48.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-[48.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[52.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[52.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[56.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[56.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-[56.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[60.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[60.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[64.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[64.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[68.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[68.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-[68.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[72.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[72.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[76.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[76.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-24 left-[76.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-8 left-[80.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-16 left-[80.5rem] w-2 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </div>

             {/* 도깨비 오토바이 배달 애니메이션 */}
       <motion.div
         animate={{
           x: [0, -1000, -1000, 0],
         }}
         transition={{
           duration: 30,
           repeat: Infinity,
           ease: "linear",
           times: [0, 0.5, 0.5, 1],
         }}
         className="absolute bottom-8 right-0 z-10"
       >
        {/* 오토바이 */}
        <div className="relative">
          {/* 오토바이 바디 */}
          <div className="w-16 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-full shadow-lg border-2 border-red-900">
            {/* 오토바이 시트 */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-red-700 rounded-t-full"></div>
            {/* 오토바이 핸들바 */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-800 rounded-full"></div>
            {/* 오토바이 바퀴 */}
            <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-700"></div>
            <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-700"></div>
            {/* 오토바이 배기관 */}
            <div className="absolute bottom-1 right-0 w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>

                     {/* 도깨비 라이더 */}
           <motion.div
             animate={{
               y: [0, -2, 0],
               rotate: [0, -1, 0, 1, 0],
               scaleX: [1, 1, 1, -1, -1, -1, 1, 1, 1],
             }}
             transition={{
               duration: 30,
               repeat: Infinity,
               ease: "linear",
               times: [0, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 1, 1],
             }}
             className="absolute -top-6 left-1/2 transform -translate-x-1/2"
           >
            {/* 도깨비 얼굴 */}
            <div className="w-6 h-6 bg-gradient-to-b from-red-700 via-red-800 to-red-900 rounded-full shadow-lg border border-red-600">
              {/* 도깨비 뿔 */}
              <div className="absolute -top-1 left-1 w-1 h-2 bg-gray-800 rounded-t-full transform -rotate-12"></div>
              <div className="absolute -top-1 right-1 w-1 h-2 bg-gray-800 rounded-t-full transform rotate-12"></div>
              
              {/* 도깨비 눈 */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-red-500 rounded-full"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-red-500 rounded-full"></div>
              
              {/* 도깨비 입 */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-black rounded-full"></div>
            </div>

            {/* 도깨비 몸통 */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-red-600 to-red-800 rounded-full">
              {/* 도깨비 팔 */}
              <div className="absolute top-1 -left-2 w-2 h-3 bg-red-700 rounded-full transform -rotate-45"></div>
              <div className="absolute top-1 -right-2 w-2 h-3 bg-red-700 rounded-full transform rotate-45"></div>
              
              {/* 도깨비 다리 */}
              <div className="absolute bottom-0 left-0 w-1.5 h-3 bg-red-700 rounded-full transform -rotate-12"></div>
              <div className="absolute bottom-0 right-0 w-1.5 h-3 bg-red-700 rounded-full transform rotate-12"></div>
            </div>

            {/* 도깨비 헬멧 */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-yellow-500 rounded-full border border-yellow-400">
              <div className="absolute top-0.5 left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
              <div className="absolute top-0.5 right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
            </div>
          </motion.div>

                     {/* 배달 상자 */}
           <motion.div
             animate={{
               y: [0, -1, 0],
               x: [0, 0, 0, -2, -2, -2, 0, 0, 0],
             }}
             transition={{
               duration: 30,
               repeat: Infinity,
               ease: "linear",
               times: [0, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 1, 1],
             }}
             className="absolute -top-4 -left-2 w-4 h-3 bg-orange-600 rounded-lg border border-orange-700 shadow-md"
           >
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-orange-400 rounded-full"></div>
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-orange-400 rounded-full"></div>
            <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-orange-800 rounded-full"></div>
          </motion.div>

                     {/* 배달 깃발 */}
           <motion.div
             animate={{
               rotate: [0, 5, 0, -5, 0],
               x: [0, 0, 0, -1, -1, -1, 0, 0, 0],
             }}
             transition={{
               duration: 30,
               repeat: Infinity,
               ease: "linear",
               times: [0, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 1, 1],
             }}
             className="absolute -top-8 -left-1"
           >
            <div className="w-0.5 h-4 bg-gray-800"></div>
            <div className="absolute top-0 -left-1 w-3 h-2 bg-red-500 rounded-r-full border border-red-600"></div>
          </motion.div>
        </div>

        {/* 배달 경로 (점선) */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-1 h-0.5 bg-yellow-400"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* 별들 (반짝임 효과) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            top: `${10 + Math.random() * 30}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Footer 내용 */}
      <div className="relative z-20 px-6 py-8">
        <div className="container mx-auto text-center">
          {/* 크레딧 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2">
              Designed by MUKKABI
            </h3>
            <p className="text-lg lg:text-xl text-gray-300 font-medium">
              박준호 25년 여름
            </p>
          </motion.div>

          {/* 추가 정보 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm text-gray-400 space-y-2"
          >
            <p>🍕 맛있는 배달을 위한 최고의 선택</p>
            <p>🚀 혁신적인 기술로 만든 사용자 경험</p>
            <p>💫 도깨비의 마법 같은 배달 서비스</p>
          </motion.div>

          {/* 저작권 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-700"
          >
            <p className="text-xs text-gray-500">
              © 2025 MUKKABI. All rights reserved. Made with ❤️ and 🍕
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
