#import "../Griffins-Main/Griffins.js";

var Chats = {


	search: function(username, parent) {

	    if (!parent) {
	        parent = UIATarget.localTarget().frontMostApp();
	    }

	    var searchBar = Finder.findElementByValue("Search");

		if (!Finder.isNil(searchBar)) {

			// 打开搜索页面
			searchBar.tap();

			// 输入搜索内容
			searchBar.setValue(username);

			// 点击搜索
			parent.keyboard().typeString("\n");
		}
	},

	searchCancle: function(parent) {

	    if (!parent) {
	        parent = UIATarget.localTarget().frontMostApp();
	    }

	    tapIfElementValid("Cancle", "Button");
	}

	
}
