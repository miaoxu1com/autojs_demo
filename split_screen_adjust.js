// 调整分屏位置的脚本
"ui";

// 请求必要的权限
if (!requestScreenCapture()) {
    toast("请求截图权限失败");
    exit();
}

// 等待界面稳定
sleep(1000);

// 获取屏幕尺寸
let screenWidth = device.width;
let screenHeight = device.height;

// 查找分屏拖拽控件
function findSplitScreenHandle() {
    // 使用更精确的条件查找分屏分隔线
    let handle = className("android.view.View")
        .filter(function(w) {
            // 检查控件是否在屏幕中间位置
            let bounds = w.bounds();
            let centerX = bounds.centerX();
            let centerY = bounds.centerY();
            
            // 检查控件是否在屏幕中间区域
            let isInMiddleX = Math.abs(centerX - screenWidth/2) < 100;
            let isInMiddleY = centerY > screenHeight * 0.3 && centerY < screenHeight * 0.7;
            
            // 检查控件是否是一个细长的分隔线（宽度较小，高度适中）
            let isThinLine = bounds.width() < 20 && bounds.height() > 50;
            
            return isInMiddleX && isInMiddleY && isThinLine;
        })
        .findOne(1000);
        
    if (!handle) {
        toast("未找到分屏拖拽控件");
        exit();
    }
    
    // 输出找到的控件信息，方便调试
    console.log("找到分屏控件：", handle.bounds());
    return handle;
}

// 向上移动分屏500像素
function moveSplitScreenUp() {
    let handle = findSplitScreenHandle();
    if (!handle) return;
    
    // 获取控件位置
    let bounds = handle.bounds();
    let startX = bounds.centerX();
    let startY = bounds.centerY();
    
    // 模拟拖动操作
    gesture(500, [startX, startY], [startX, startY - 500]);
    toast("分屏已向上移动");
    sleep(1000);
}

// 恢复分屏到原位置
function restoreSplitScreen() {
    let handle = findSplitScreenHandle();
    if (!handle) return;
    
    // 获取控件当前位置
    let bounds = handle.bounds();
    let startX = bounds.centerX();
    let startY = bounds.centerY();
    
    // 模拟拖动操作
    gesture(500, [startX, startY], [startX, startY + 500]);
    toast("分屏已恢复原位");
}

// 执行分屏调整
moveSplitScreenUp();
sleep(2000); // 等待2秒
restoreSplitScreen(); 
