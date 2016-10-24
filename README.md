
Griffins 简介
iOS UI 自动化测试框架，借鉴了 TuneUp JS 和 YNM3K 的一些思路，在原生 iOS UI Automation 的基础上 引入 YUItest 从而具备了 testcase，testsuit 的组织结构，模仿 selenium 的接口形式对 UI 识别的方法进 行了封装，使得 UI 元素定位代码更加简洁和友好。将测试结果进行结构化整理，输出 xml 格式测试 报告，从而能够通过 Jenkins 实现从检测开发代码变更，触发应用打包、安装和 UI 自动化测试执行到 最终测试报告生成的一整个完整的测试流程。

=======================================================
Griffins 使用说明

1  先下载源代码
2  运行setup.sh 脚本，脚本会自动设置相关的文件路径
3  直接开始你的ios自动化测试的旅程吧

相关脚本的写法，请参看 sample路径下的内容
如果有Griffins不能完成的功能，请99U联系 陈震 106001;或者email：son666666@163.com

CI 环境说明

1  setup脚本会自动建立 一个Griffins-Reports的目录
2  使用test_runner 目录的 run脚本运行测试. 
   USAGE: run-test-script <app bundle> <test script> <output directory> [optional args]
   有疑问可以 -h 获取帮助
   示例：
   ./run /Users/echo/Library/Developer/CoreSimulator/Devices/152ACB4A-877D-49AA-9209-3F35265A35E4/data/Containers/Bundle/Application/16B2CAFF-C697-4793-89CE-5A2A010042B9/new99u.app /Users/echo/Documents/Griffins/sample/alltests.js /Users/echo/Documents/Griffins/Griffins-Tmp/ -a 2 -w 152ACB4A-877D-49AA-9209-3F35265A35E4 -b -x 
   
3  当测试完成的时候，系统自动生成测试报告在/Griffins-Reports/test.xml,可以直接使用Junit-report插件解析(Jenkins持续集成平台可直接展示)


========================================================
考虑到测试工具的发展想增加一下功能：
1 可以通过控制被测试程序的启动和停止，来达到一些case的无状态性；
2 加入系统打包工具，使用rake工具可以使用简单的命令直接运行测试；
3 控制模拟器相关的sdklevel，可以让case在所有的模拟器上都运行一遍，并且生成最终的一份大的report。
4 格式化输入信息，让log在控制台上更好看一些。