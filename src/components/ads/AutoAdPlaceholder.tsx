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
    <div className={`auto-ad-placeholder ${className}`}>
      {/* 광고 대기 중 안내 메시지 */}
      <div 
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center text-yellow-700 text-sm"
        style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div>
          <div className="font-semibold mb-1">⚠️ {getPositionText()} 광고 대기 중</div>
          <div className="text-xs">
            AdSense 대시보드에서 자동 광고 설정을 확인하거나<br/>
            광고 단위를 생성해주세요
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoAdPlaceholder;
