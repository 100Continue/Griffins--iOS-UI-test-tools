#import "../Griffins-Main/Griffins.js";

var Version = {

	versionUpdateCancle: function(parent) {

		if (!parent) {
	        parent = UIATarget.localTarget().frontMostApp();
	    }

		Waiter.wait(2);
		
		tapIfElementValid("Cancel","Button");
	},

	versionUpdateCancleQuick: function(parent) {

		if (!parent) {
	        parent = UIATarget.localTarget().frontMostApp();
	    }
	    
	    var window = parent.mainWindow();
		if (window.buttons()["Cancel"].checkIsValid()){
		window.buttons()["Cancel"].tap();
	}
	},

}