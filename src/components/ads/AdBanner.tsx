import React from "react";
import AdSenseAd from "./AdSenseAd";

interface AdBannerProps {
  position: "header" | "sidebar" | "footer" | "content" | "mobile";
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = "" }) => {
  const getAdConfig = () => {
    switch (position) {
      case "header":
        return {
          adSlot: "2973799567", // 헤더 배너 광고용
          adFormat: "auto" as const,
          adStyle: {
            display: "block",
            width: "100%",
            height: "90px",
            minHeight: "90px",
          },
        };
      case "sidebar":
        return {
          adSlot: "2973799568", // 사이드바 광고용
          adFormat: "auto" as const,
          adStyle: {
            display: "block",
            width: "300px",
            height: "250px",
            minHeight: "250px",
          },
        };
      case "footer":
        return {
          adSlot: "2973799569", // 푸터 광고용
          adFormat: "auto" as const,
          adStyle: {
            display: "block",
            width: "100%",
            height: "90px",
            minHeight: "90px",
          },
        };
      case "content":
        return {
          adSlot: "2973799571", // 콘텐츠 광고용
          adFormat: "auto" as const,
          adStyle: {
            display: "block",
            width: "100%",
            height: "auto",
            minHeight: "100px",
          },
        };
      case "mobile":
        return {
          adSlot: "2973799570", // 모바일 광고용
          adFormat: "auto" as const,
          adStyle: {
            display: "block",
            width: "320px",
            height: "50px",
            minHeight: "50px",
          },
        };
      default:
        return {
          adSlot: "2973799571", // 기본 광고용
          adFormat: "auto" as const,
          adStyle: { display: "block", minHeight: "100px" },
        };
    }
  };

  const adConfig = getAdConfig();

  return (
    <div
      className={`ad-banner ad-banner--${position} ${className}`}
      style={{
        minWidth: position === "mobile" ? "320px" : "300px",
        width: "100%",
        display: "block",
      }}
    >
      <AdSenseAd
        adSlot={adConfig.adSlot}
        adFormat={adConfig.adFormat}
        adStyle={adConfig.adStyle}
        className="w-full block"
      />
    </div>
  );
};

export default AdBanner;
