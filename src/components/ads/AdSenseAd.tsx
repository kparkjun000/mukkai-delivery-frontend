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
    // 자동 광고를 사용하므로 수동 초기화를 비활성화
    // AdSense 스크립트가 HTML에서 로드되어 자동으로 처리됨
    console.log("AdSense: 자동 광고 모드 - 수동 초기화 건너뜀");
  }, []);

  return (
    <div className={`adsense-ad ${className}`}>
      {/* 자동 광고가 활성화되어 있으므로 수동 광고 단위는 숨김 */}
      <div
        className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 text-center"
        style={{
          minHeight: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-green-600 text-sm">
          <div className="font-semibold mb-1">
            🎯 AdSense 자동 광고 활성화됨
          </div>
          <div className="text-xs">
            Google이 자동으로 최적의 광고를 배치합니다
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSenseAd;
