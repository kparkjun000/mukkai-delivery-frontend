import React from "react";

interface AutoAdPlaceholderProps {
  position: "header" | "sidebar" | "footer" | "content" | "mobile";
  className?: string;
}

const AutoAdPlaceholder: React.FC<AutoAdPlaceholderProps> = ({
  position,
  className = "",
}) => {
  const getPositionText = () => {
    switch (position) {
      case "header":
        return "헤더";
      case "sidebar":
        return "사이드바";
      case "footer":
        return "푸터";
      case "content":
        return "콘텐츠";
      case "mobile":
        return "모바일";
      default:
        return "광고";
    }
  };

  return (
    <div
      className={`auto-ad-placeholder ${className}`}
      style={{ display: "none" }}
    >
      {/* 자동 광고가 활성화되어 있으므로 플레이스홀더 숨김 */}
    </div>
  );
};

export default AutoAdPlaceholder;
