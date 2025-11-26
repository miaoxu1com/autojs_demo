// 分屏把手自动调整脚本
function main() {

    // 设置执行前的准备
    // setScreenMetrics(1080, 2340); // 设置屏幕分辨率，根据实际情况调整
    toast("脚本开始执行");

    // 识别分屏把手并调整位置
    adjustSplitScreenHandle();

    toast("脚本执行完毕");
}

function adjustSplitScreenHandle() {
    // 尝试识别分屏把手元素
    // 这里使用颜色识别法，假设把手是灰色(#888888)且高度较窄
    let handle = findSplitHandleByColor();
    
    if (!handle) {
        toast("未找到分屏把手");
        return;
    }

    // 获取把手位置信息
    let handleBounds = handle.bounds();
    let startX = handleBounds.centerX();
    let startY = handleBounds.centerY();
    
    // 计算拖动距离（屏幕高度的20%）
    let screenHeight = device.height;
    let dragDistance = Math.floor(screenHeight * 0.2);
    
    // 向上拖动
    toast("向上拖动");
    gesture(1000, [startX, startY], [startX, startY - dragDistance]);
    sleep(100);
    
    // 向下拖动（回到原位）
    toast("向下拖动");
    gesture(1000, [startX, startY - dragDistance], [startX, startY + dragDistance]);
    sleep(100);
}

function findSplitHandleByColor() {
    // 截取屏幕
    let img = captureScreen();
    if (!img) {
        toast("截图失败");
        return null;
    }

    // 分析图像查找分屏把手
    // 这里使用简化的颜色匹配算法，实际应用中可能需要更复杂的识别逻辑
    let handleColor = "#888888"; // 假设把手是灰色
    let handle;
    
    // 尝试在屏幕中间区域查找把手（通常分屏把手在屏幕中部）
    let centerRegion = [0, device.height * 0.4, device.width, device.height * 0.2];
    let foundPixels = findColorInRegion(img, handleColor, centerRegion);
    
    if (foundPixels && foundPixels.length > 100) { // 如果找到足够多的匹配像素
        // 计算这些像素的中心位置
        let sumX = 0, sumY = 0;
        foundPixels.forEach(pixel => {
            sumX += pixel.x;
            sumY += pixel.y;
        });
        let centerX = Math.floor(sumX / foundPixels.length);
        let centerY = Math.floor(sumY / foundPixels.length);
        
        // 创建一个围绕中心点的矩形区域作为把手位置
        handle = {
            bounds: function() {
                return rect(centerX - 20, centerY - 5, centerX + 20, centerY + 5);
            }
        };
    }
    
    // 释放图像资源
    img.recycle();
    
    return handle;
}

function findColorInRegion(img, color, region) {
    // 在指定区域查找特定颜色的像素
    let pixels = [];
    let [x, y, width, height] = region;
    
    for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
            if (colors.toString(img.pixel(i, j)) === color) {
                pixels.push({x: i, y: j});
            }
        }
    }
    
    return pixels;
}

// 启动主函数
main();    