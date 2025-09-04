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
        data-ad-client="ca-pub-8265488633224466"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseAd;
