id("tv_tab_title").className("android.widget.TextView").text("首页").findOne().parent().parent().click();

功能：找到 id="tv_tab_title"、class="TextView" 且 text="首页" 的控件，然后向上找两层父控件，并点击它。

逻辑：

id("tv_tab_title")：查找 id 为 tv_tab_title 的控件。

className("android.widget.TextView")：限定控件类型是 TextView。

text("首页")：限定文字内容是 "首页"。

findOne()：找到第一个匹配的控件。

parent().parent()：向上找两层父布局（可能是一个可点击的容器）。

click()：执行点击操作。

