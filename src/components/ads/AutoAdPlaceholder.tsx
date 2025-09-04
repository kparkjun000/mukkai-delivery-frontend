import React, { useEffect } from "react";

interface AutoAdPlaceholderProps {
  position: "header" | "sidebar" | "footer" | "content" | "mobile";
  className?: string;
}

const AutoAdPlaceholder: React.FC<AutoAdPlaceholderProps> = ({
  position,
  className = "",
}) => {
  useEffect(() => {
    try {
      // AdSense 광고 초기화
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  const getAdStyle = () => {
    switch (position) {
      case "header":
        return { display: "block", width: "100%", height: "90px" };
      case "sidebar":
        return { display: "block", width: "300px", height: "250px" };
      case "footer":
        return { display: "block", width: "100%", height: "90px" };
      default:
        return { display: "block" };
    }
  };

  return (
    <div className={`auto-ad-placeholder ${className}`}>
      {/* 실제 AdSense 광고 */}
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-8265488633224466"
        data-ad-slot="8765432109"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AutoAdPlaceholder;
