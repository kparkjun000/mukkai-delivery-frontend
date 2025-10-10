const fs = require('fs');
const { createCanvas } = require('canvas');

function drawIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // 배경 - 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#ff6b35');
    gradient.addColorStop(1, '#ff8c42');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // 둥근 모서리 효과를 위한 클리핑
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.15);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    
    // 중앙 원형 배경
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
    ctx.fill();
    
    // 포크 그리기 (왼쪽)
    const forkX = size * 0.35;
    const forkY = size * 0.5;
    const forkWidth = size * 0.05;
    const forkLength = size * 0.35;
    
    ctx.fillStyle = 'white';
    // 포크 손잡이
    ctx.fillRect(forkX - forkWidth / 2, forkY, forkWidth, forkLength);
    // 포크 갈래들
    for (let i = -1; i <= 1; i++) {
        ctx.fillRect(
            forkX + i * forkWidth * 1.2 - forkWidth / 2,
            forkY - forkLength * 0.4,
            forkWidth,
            forkLength * 0.5
        );
    }
    
    // 나이프 그리기 (오른쪽)
    const knifeX = size * 0.65;
    const knifeY = size * 0.5;
    const knifeWidth = size * 0.05;
    const knifeLength = size * 0.35;
    
    // 나이프 손잡이
    ctx.fillRect(knifeX - knifeWidth / 2, knifeY, knifeWidth, knifeLength);
    // 나이프 날
    ctx.beginPath();
    ctx.moveTo(knifeX - knifeWidth * 1.5, forkY - knifeLength * 0.4);
    ctx.lineTo(knifeX + knifeWidth * 1.5, forkY - knifeLength * 0.4);
    ctx.lineTo(knifeX, forkY);
    ctx.closePath();
    ctx.fill();
    
    // 중앙에 "F" 글자 (Foodie)
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.25}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('F', size / 2, size / 2);
    
    // 하단에 작은 텍스트
    ctx.font = `${size * 0.06}px Arial`;
    ctx.fillText('먹깨비', size / 2, size * 0.85);
    
    return canvas;
}

// 192x192 아이콘 생성
console.log('Generating 192x192 icon...');
const canvas192 = drawIcon(192);
const buffer192 = canvas192.toBuffer('image/png');
fs.writeFileSync('./public/icon-192.png', buffer192);
console.log('✓ icon-192.png created');

// 512x512 아이콘 생성
console.log('Generating 512x512 icon...');
const canvas512 = drawIcon(512);
const buffer512 = canvas512.toBuffer('image/png');
fs.writeFileSync('./public/icon-512.png', buffer512);
console.log('✓ icon-512.png created');

console.log('\n✨ Icons generated successfully!');
