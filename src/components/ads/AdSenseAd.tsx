import React, { useEffect, useRef, useState } from "react";

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  adStyle?: React.CSSProperties;
  className?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = "auto",
  adStyle = { display: "block" },
  className = "",
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10; // 최대 10번 시도 (1초)

    const initializeAd = () => {
      try {
        attempts++;

        // DOM 요소가 렌더링되고 크기가 설정된 후에 광고 초기화
        if (adRef.current && adRef.current.offsetWidth > 0) {
          console.log(
            `AdSense 초기화 성공: 슬롯 ${adSlot}, 너비 ${adRef.current.offsetWidth}px`
          );
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({});
          setIsLoaded(true);
        } else if (attempts < maxAttempts) {
          // 컨테이너 크기가 0이면 잠시 후 다시 시도
          console.log(
            `AdSense 초기화 재시도 ${attempts}/${maxAttempts}: 슬롯 ${adSlot}`
          );
          setTimeout(initializeAd, 100);
        } else {
          console.warn(
            `AdSense 초기화 실패: 슬롯 ${adSlot} - 최대 시도 횟수 초과`
          );
        }
      } catch (err) {
        console.error(`AdSense error (슬롯 ${adSlot}):`, err);
      }
    };

    // 컴포넌트 마운트 후 약간의 지연을 두고 초기화
    const timer = setTimeout(initializeAd, 200);

    return () => {
      clearTimeout(timer);
      attempts = maxAttempts; // cleanup 시 시도 중단
    };
  }, [adSlot]);

  return (
    <div
      ref={adRef}
      className={`adsense-ad ${className} relative`}
      style={{
        minWidth: "300px", // 최소 너비 보장
        width: "100%",
        ...adStyle,
      }}
    >
      {/* 실제 AdSense 광고 단위 */}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          ...adStyle,
        }}
        data-ad-client="ca-pub-8265488633224466"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>

      {/* 개발 중 임시 플레이스홀더 (광고가 로드되지 않을 때 표시) */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          zIndex: isLoaded ? -1 : 1,
          minHeight: adStyle?.height || "90px",
        }}
      >
        <div className="text-center">
          <div className="font-medium mb-1">📢 광고 영역</div>
          <div className="text-xs opacity-75">
            AdSense 광고가 여기에 표시됩니다
          </div>
          <div className="text-xs opacity-50 mt-1">슬롯: {adSlot}</div>
          <div className="text-xs opacity-25 mt-1">
            {adRef.current
              ? `너비: ${adRef.current.offsetWidth}px`
              : "로딩 중..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSenseAd;
