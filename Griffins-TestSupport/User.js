#import "../Griffins-Main/Griffins.js";

var User = {


	login: function(username, password, parent) {

	    if (!parent) {
	        parent = UIATarget.localTarget().frontMostApp();
	    }

	    var window = parent.mainWindow();

	    var login_button = Finder.findElementByName("Login");

		if (!Finder.isNil(login_button)) {

			// 输入账号
			window.textFields()[0].textFields()[0].setValue(username);

			// 输入密码
			window.secureTextFields()[0].secureTextFields()[0].setValue(password);

			// 点击登录
			login_button.tap();
		}
	},

	logout: function(parent) {
	
	    if (!parent) {
	        parent = UIATarget.localTarget().frontMostApp();
	    }

	    var window = parent.mainWindow();

		// 点击底部我的 按钮
		Finder.findElementByNameAndClassType("Me", "Button").tap();
		Waiter.wait(1);

		// 点击设置
		Finder.findElementByNameAndClassType("Settings", "TableCell").tap();
		Waiter.wait(1);

		// 点击退出
		Finder.findElementByName("Logout").tap();
	},
}
