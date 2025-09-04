import React, { useEffect, useRef, useState } from "react";

interface AutoAdPlaceholderProps {
  position: "header" | "sidebar" | "footer" | "content" | "mobile";
  className?: string;
}

const AutoAdPlaceholder: React.FC<AutoAdPlaceholderProps> = ({
  position,
  className = "",
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeAd = () => {
      try {
        // DOM 요소가 렌더링되고 크기가 설정된 후에 광고 초기화
        if (adRef.current && adRef.current.offsetWidth > 0) {
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({});
          setIsLoaded(true);
        } else {
          // 컨테이너 크기가 0이면 잠시 후 다시 시도
          setTimeout(initializeAd, 100);
        }
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    // 컴포넌트 마운트 후 약간의 지연을 두고 초기화
    const timer = setTimeout(initializeAd, 200);

    return () => clearTimeout(timer);
  }, [position]);

  const getAdConfig = () => {
    switch (position) {
      case "header":
        return {
          style: {
            display: "block",
            width: "100%",
            height: "90px",
            minHeight: "90px",
          },
          slot: "2973799567", // 헤더 배너 광고용
          format: "auto",
        };
      case "sidebar":
        return {
          style: {
            display: "block",
            width: "300px",
            height: "250px",
            minHeight: "250px",
          },
          slot: "2973799568", // 사이드바 광고용
          format: "auto",
        };
      case "footer":
        return {
          style: {
            display: "block",
            width: "100%",
            height: "90px",
            minHeight: "90px",
          },
          slot: "2973799569", // 푸터 광고용
          format: "auto",
        };
      case "mobile":
        return {
          style: {
            display: "block",
            width: "320px",
            height: "50px",
            minHeight: "50px",
          },
          slot: "2973799570", // 모바일 광고용
          format: "auto",
        };
      default:
        return {
          style: { display: "block", minHeight: "100px" },
          slot: "2973799571", // 기본 콘텐츠 광고용
          format: "auto",
        };
    }
  };

  const adConfig = getAdConfig();

  return (
    <div
      ref={adRef}
      className={`auto-ad-placeholder ${className}`}
      style={{
        minWidth: position === "mobile" ? "320px" : "300px",
        width: "100%",
        ...adConfig.style,
      }}
    >
      {/* 실제 AdSense 광고 단위 */}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          ...adConfig.style,
        }}
        data-ad-client="ca-pub-8265488633224466"
        data-ad-slot={adConfig.slot}
        data-ad-format={adConfig.format}
        data-full-width-responsive="true"
      ></ins>

      {/* 디버깅용 플레이스홀더 */}
      {!isLoaded && (
        <div
          className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg flex items-center justify-center text-blue-600 text-sm"
          style={adConfig.style}
        >
          <div className="text-center">
            <div className="font-medium mb-1">
              🚀 {position.toUpperCase()} 광고
            </div>
            <div className="text-xs opacity-75">슬롯: {adConfig.slot}</div>
            <div className="text-xs opacity-50 mt-1">
              {adRef.current
                ? `너비: ${adRef.current.offsetWidth}px`
                : "로딩 중..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoAdPlaceholder;
