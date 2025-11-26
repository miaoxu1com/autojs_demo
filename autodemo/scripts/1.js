// auto.waitFor(); // 等待无障碍服务
// 启动无障碍服务
//auto();
device.wakeUp(); // 唤醒屏幕
// let centerX = 540;
// let centerY = 1057;
// let dragDistance = 300;

// // 向上拖动
// toast("向上拖动");
// gesture(1000, [centerX, centerY], [centerX, centerY - dragDistance]);
// sleep(1000);

// centerY = centerY - dragDistance+20;
// // 向下拖动
// toast("向下拖动");
// gesture(1000, [centerX, centerY], [centerX, centerY + dragDistance]);


var divider = desc("分屏分隔线").className("android.view.View").packageName("com.android.systemui").findOne(5000);

if (divider) {
    var bounds = divider.bounds();
    log("✅ 成功找到分屏分割线");
    log("位置：left=" + bounds.left + ", top=" + bounds.top + ", right=" + bounds.right + ", bottom=" + bounds.bottom);

    // 示例操作：滑动分隔线（向下移动 200 像素）
    gesture(1000, [bounds.centerX(), bounds.centerY()], [bounds.centerX(), bounds.centerY() + 200]);
} else {
    log("❌ 未找到分屏分割线，请确认是否已进入分屏模式");
}