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
      {/* 자동 광고가 활성화되어 있으므로 수동 광고 단위는 숨김 */}
      <div 
        className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 text-center"
        style={{ minHeight: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="text-green-600 text-sm">
          <div className="font-semibold mb-1">🎯 AdSense 자동 광고 활성화됨</div>
          <div className="text-xs">Google이 자동으로 최적의 광고를 배치합니다</div>
        </div>
      </div>
    </div>
  );
};

export default AdSenseAd;
