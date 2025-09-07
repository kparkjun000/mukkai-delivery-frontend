import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Utensils, Clock, Star, MapPin, Truck } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Glow component implementation
const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glowVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.3)_10%,_transparent_60%)] sm:h-[512px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.2)_10%,_transparent_60%)] sm:h-[256px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
  </div>
));
Glow.displayName = "Glow";

// Mockup components implementation
const mockupVariants = cva(
  "flex relative z-10 overflow-hidden shadow-2xl border border-gray-200/5 border-t-border/15",
  {
    variants: {
      type: {
        mobile: "rounded-[48px] max-w-[350px]",
        responsive: "rounded-md",
      },
    },
    defaultVariants: {
      type: "responsive",
    },
  }
);

interface MockupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mockupVariants> {}

const Mockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ className, type, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(mockupVariants({ type, className }))}
      {...props}
    />
  )
);
Mockup.displayName = "Mockup";

const frameVariants = cva(
  "bg-accent/5 flex relative z-10 overflow-hidden rounded-2xl",
  {
    variants: {
      size: {
        small: "p-2",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

interface MockupFrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof frameVariants> {}

const MockupFrame = React.forwardRef<HTMLDivElement, MockupFrameProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(frameVariants({ size, className }))}
      {...props}
    />
  )
);
MockupFrame.displayName = "MockupFrame";

// Food delivery hero component
const COLORS = ["#00B8D4", "#0097A7", "#4DD0E1", "#FF6B6B"];

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const color = useMotionValue(COLORS[0]);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 무료 음악 URL 목록 - 실제 작동하는 음원들
  const musicTracks = [
    "https://www.soundjay.com/misc/sounds/magic-chime-02.mp3",
    "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", 
    "https://freesound.org/data/previews/316/316847_5123451-lq.mp3"
  ];

  useEffect(() => {
    setIsLoaded(true);
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
    });

    // 웹 오디오로 간단한 음악 생성 및 재생
    const playRandomMusic = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // 간단한 멜로디 생성
        const frequencies = [440, 523, 659, 784]; // A4, C5, E5, G5
        const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(randomFreq, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
        
        // 2초 후 다시 재생
        setTimeout(() => playRandomMusic(), 3000);
      } catch (error) {
        console.log('오디오 재생 실패:', error);
        // 사용자 상호작용 후 재생
        const handleFirstInteraction = () => {
          playRandomMusic();
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        };
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
      }
    };

    playRandomMusic();
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, hsl(var(--background)) 50%, ${color}15)`;
  const borderGlow = useMotionTemplate`0px 0px 20px ${color}40`;

  const features = [
    { icon: Clock, text: "30분 배달" },
    { icon: Star, text: "4.8★ 평점" },
    { icon: MapPin, text: "전국 배달" },
    { icon: Truck, text: "무료 배송" },
  ];

  return (
    <motion.section
      className={cn(
        "relative min-h-[80vh] text-gray-800",
        "mt-0 py-12 px-0 md:py-24 lg:py-32",
        "overflow-hidden rounded-3xl",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3)),
          url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1.2) contrast(0.8) saturate(1.3) hue-rotate(10deg)",
      }}
    >
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        {/* Badge - 왼쪽 상단으로 이동 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-2 left-8 z-20"
        >
          <motion.div
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Badge variant="outline" className="gap-2 px-4 py-2 text-sm bg-white/90 backdrop-blur-sm border-primary shadow-lg">
              <Utensils className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold">지금 주문 가능</span>
              <ArrowRight className="h-3 w-3 text-primary" />
            </Badge>
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">

          {/* Heading - 역동적으로 움직이는 광고카피 */}
          <motion.h1
            initial={{ opacity: 1, x: 0, rotate: 0 }}
            animate={isLoaded ? { 
              x: [0, 20, -10, 0], 
              y: [0, -15, 10, 0],
              rotate: [0, 2, -1, 0],
              scale: [1, 1.02, 0.98, 1]
            } : {}}
            transition={{ 
              duration: 1.5,
              delay: 0.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className={cn(
              "inline-block",
              "text-gray-900",
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
              "leading-[1.1] sm:leading-[1.1]",
              "drop-shadow-lg text-shadow-lg"
            )}
            style={{
              textShadow:
                "2px 2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(255,255,255,0.8)",
            }}
          >
            <motion.div
              animate={{
                x: [0, -30, 20, 0],
                y: [0, 10, -5, 0],
                rotate: [0, -1, 1, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              맛있는 음식을
            </motion.div>
            <br />
            <motion.span 
              className="text-primary drop-shadow-lg"
              animate={{
                x: [0, 25, -15, 0],
                y: [0, -8, 12, 0],
                rotate: [0, 1.5, -0.5, 0],
                scale: [1, 1.05, 0.95, 1]
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7
              }}
            >
              빠르게 배달
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className={cn(
              "max-w-[550px]",
              "text-base sm:text-lg md:text-xl",
              "text-gray-700",
              "font-medium"
            )}
            style={{
              textShadow:
                "1px 1px 2px rgba(0,0,0,0.2), 0 0 4px rgba(255,255,255,0.8)",
            }}
          >
            Foodie와 함께 최고의 맛집을 경험해보세요. 신선한 재료, 빠른 배달,
            그리고 잊을 수 없는 맛으로 특별한 식사를 선사합니다.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-wrap justify-center gap-4"
          >
            <motion.div
              style={{ boxShadow: borderGlow }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/stores">
                <Button
                  size="lg"
                  className={cn(
                    "bg-gradient-to-r from-primary to-primary/90",
                    "hover:from-primary/95 hover:to-primary/85",
                    "text-primary-foreground shadow-lg",
                    "transition-all duration-300",
                    "px-8 py-3 text-lg font-semibold"
                  )}
                >
                  지금 주문하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <Link to="/menu-explore">
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "text-gray-900/80",
                  "transition-all duration-300",
                  "px-8 py-3 text-lg font-semibold"
                )}
              >
                🍽️ 메뉴 둘러보기
              </Button>
            </Link>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="relative w-full pt-12 px-0"
          >
            <MockupFrame size="small">
              <Mockup type="responsive">
                <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Mock app interface */}
                  <div className="absolute inset-4 bg-white rounded-lg shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <Utensils className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Foodie</h3>
                          <p className="text-sm text-muted-foreground">
                            Food Delivery
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          배달 예상시간
                        </p>
                        <p className="font-bold text-primary">25분</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          name: "마르게리타 피자",
                          price: "18,000원",
                          rating: "4.8",
                        },
                        { name: "치킨 버거", price: "12,000원", rating: "4.7" },
                        {
                          name: "시저 샐러드",
                          price: "9,000원",
                          rating: "4.9",
                        },
                        {
                          name: "카르보나라",
                          price: "15,000원",
                          rating: "4.6",
                        },
                      ].map((item, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-3">
                          <div className="w-full h-20 bg-primary/20 rounded mb-2"></div>
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-primary font-bold">
                              {item.price}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ★ {item.rating}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Mockup>
            </MockupFrame>
          </motion.div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow variant="above" className="animate-pulse opacity-20" />
      </div>

      {/* Floating food emojis - 먹깨비들이 먹는 모습 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          "🍕",
          "🍔",
          "🍟",
          "🌭",
          "🍗",
          "🥪",
          "🌮",
          "🍝",
          "🍜",
          "🥗",
          "🍛",
          "🍱",
        ].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-60 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* 먹깨비 얼굴들 - 정신없이 먹는 모습 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["😋", "🤤", "😍", "🥰", "😊", "🍴"].map((face, i) => (
          <motion.div
            key={`face-${i}`}
            className="absolute text-3xl opacity-50 select-none"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            {face}
          </motion.div>
        ))}
      </div>

      {/* 눈이 내리는 효과 - 겨울 감성 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["❄️", "✨", "💫", "⭐", "🌟"].map((snow, i) => (
          <motion.div
            key={`snow-${i}`}
            className="absolute text-2xl opacity-40 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10%",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, Math.random() * 50 - 25],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15,
            }}
          >
            {snow}
          </motion.div>
        ))}
        {/* 추가 눈송이들 */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`extra-snow-${i}`}
            className="absolute text-lg opacity-30 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-5%",
            }}
            animate={{
              y: ["0vh", "105vh"],
              x: [0, Math.sin(i) * 30],
              rotate: [0, 180],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
          >
            ❄️
          </motion.div>
        ))}
      </div>

      {/* 배경 음악 - Web Audio API 사용으로 불필요 */}
    </motion.section>
  );
}
