import React, { useEffect } from "react";

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
  useEffect(() => {
    try {
      // AdSense 광고 초기화
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`adsense-ad ${className}`}>
      {/* 실제 AdSense 광고 */}
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 AdSense 클라이언트 ID로 교체
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />

      {/* 테스트용 플레이스홀더 (개발 중에만 표시) */}
      <div
        className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm"
        style={adStyle}
      >
        <div className="text-center">
          <div className="font-semibold">AdSense 광고 영역</div>
          <div className="text-xs mt-1">Client ID: ca-pub-XXXXXXXXXXXXXXXX</div>
          <div className="text-xs">Slot: {adSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default AdSenseAd;
