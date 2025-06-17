// 调整分屏位置的脚本
// 请求必要的权限
// if (!requestScreenCapture()) {
//     toast("请求截图权限失败");
//     exit();
// }

// 等待界面稳定
sleep(400);

// 获取屏幕尺寸
let screenWidth = device.width;
let screenHeight = device.height;


toast("开始点击");
// live_room
function liveRoom() {
    // 在屏幕中间点击10次，每次间隔随机100ms-500ms
    for(let i = 0; i < 10; i++) {
        let randomDelay = random(100, 200);
        click(screenWidth/2, screenHeight/2);
        sleep(randomDelay);
    }
    // 评论输入
    let handle = id("com.kuaishou.nebula.live_audience_plugin:id/live_comment_item_space").findOne(500);
    
    if (!handle) {
        toast("评论输入未找到");
        exit();
    }else{
        // 点击输入
        handle.click();
        let comment_text = id("com.kuaishou.nebula:id/editor").findOne(500);
        comment_text.setText("测试一下");
    }
    // 查找关注按钮
    // let follow_buttone = id("com.kuaishou.nebula.live_audience_plugin:id/live_audience_bottom_bar_follow_avatar").findOne(500);
    // if (!follow_buttone) {
    //     toast("关注按钮未找到");
    //     exit();
    // }else{
    //      // 点击关注按钮
    //      follow_buttone.click();
    // }
    // 关注
    // let follow_buttone = id("com.kuaishou.nebula.live_audience_plugin:id/live_audience_bottom_bar_follow_button").findOne(500);
    // if (!follow_buttone) { 
    //     toast("关注按钮未找到");
    //     exit();
    // }else{
    //      // 点击关注
    //      let bounds = follow_buttone.bounds();
    //      click(bounds.centerX(), bounds.centerY());  
    // }

    // 购物车
    // let shape_button = id("com.kuaishou.nebula.live_audience_plugin:id/live_shop_icon_shape_view").findOne(500);
    // if (!shape_button) { 
    //     toast("购物车按钮未找到");
    //     exit();
    // }else{
    //      // 点击购物车按钮
    //      let bounds = shape_button.bounds();
    //      click(bounds.centerX(), bounds.centerY());  
    // }
    
    
}



// 直播间
liveRoom();
sleep(1000); // 等待2秒
