import React from "react";
import AutoAdPlaceholder from "./AutoAdPlaceholder";

interface AdBannerProps {
  position: "header" | "sidebar" | "footer" | "content" | "mobile";
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = "" }) => {
  const getAdConfig = () => {
    switch (position) {
      case "header":
        return {
          adSlot: "1234567890", // 실제 광고 단위 ID로 교체
          adFormat: "horizontal" as const,
          adStyle: { display: "block", width: "728px", height: "90px" },
        };
      case "sidebar":
        return {
          adSlot: "1234567891",
          adFormat: "rectangle" as const,
          adStyle: { display: "block", width: "300px", height: "250px" },
        };
      case "footer":
        return {
          adSlot: "1234567892",
          adFormat: "horizontal" as const,
          adStyle: { display: "block", width: "728px", height: "90px" },
        };
      case "content":
        return {
          adSlot: "1234567893",
          adFormat: "auto" as const,
          adStyle: { display: "block", width: "100%", height: "auto" },
        };
      case "mobile":
        return {
          adSlot: "1234567894",
          adFormat: "auto" as const,
          adStyle: { display: "block", width: "320px", height: "50px" },
        };
      default:
        return {
          adSlot: "1234567890",
          adFormat: "auto" as const,
          adStyle: { display: "block" },
        };
    }
  };

  const adConfig = getAdConfig();

  return (
    <div className={`ad-banner ad-banner--${position} ${className}`}>
      <AutoAdPlaceholder position={position} />
    </div>
  );
};

export default AdBanner;
