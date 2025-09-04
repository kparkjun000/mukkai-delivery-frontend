import React from 'react';

interface AutoAdPlaceholderProps {
  position: "header" | "sidebar" | "footer" | "content" | "mobile";
  className?: string;
}

const AutoAdPlaceholder: React.FC<AutoAdPlaceholderProps> = ({ 
  position, 
  className = "" 
}) => {
  const getPositionText = () => {
    switch (position) {
      case 'header': return '헤더';
      case 'sidebar': return '사이드바';
      case 'footer': return '푸터';
      case 'content': return '콘텐츠';
      case 'mobile': return '모바일';
      default: return '광고';
    }
  };

  return (
    <div className={`auto-ad-placeholder ${className}`}>
      <div
        className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 text-center"
        style={{
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-green-600 text-sm">
          <div className="font-semibold mb-1">
            🎯 {getPositionText()} 자동 광고 영역
          </div>
          <div className="text-xs opacity-75">
            Google AdSense가 자동으로 광고를 배치합니다
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoAdPlaceholder;
