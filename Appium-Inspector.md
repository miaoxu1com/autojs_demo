##### 环境配置

appium 只需要安装 platform-tools ，配置android_home即可正常链接手机，主要就是adb命令，链接手机，adb命令操作android

appium 好厉害，用过才知道，居然是nodejs开发的

appium-inspector 比autojs的布局分析厉害多了，可以可视化的分析手机界面的元素，进行可视化调试，提升代码调试开发速度

##### 必填参数

{
  "platformName": "Android",
  "appium:platformVersion": "14",
  "appium:deviceName": "AN2FUT1923003354",
  "appium:appPackage": "com.kuaishou.nebula",
  "appium:appActivity": "com.yxcorp.gifshow.HomeActivity",
  "appium:automationName": "UiAutomator2"
}



##### 快手主启动 Activity

adb shell dumpsys package com.kuaishou.nebula | grep -A 5 MAIN 

**`com.yxcorp.gifshow.HomeActivity`**

##### app自动化调试模拟器环境

模拟器环境比实机权限更高，更适合用来开发调试代码，是更好的开发调试环境，具有root权限，可以使用更底层的工具进行调试

Frida hook调试app   app渗透magisk+LSPosed + 算法助手环境
