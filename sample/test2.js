#import "../Griffins-Main/Griffins.js";
#import "../Griffins-TestSupport/User.js"
#import "../Griffins-TestSupport/Version.js"
#import "../Griffins-TestSupport/Chats.js"


var test2 = new Griffins.Test.Case({
    
    name : 'test2',
    
    setUp : function(){
		UIALogger.logMessage("setUp");
        var target = UIATarget.localTarget();

        target.logElementTree();
        //Version.versionUpdateCancleQuick();
        //do some things before any test method in the TestCase
    },
        
    tearDown : function(){
		UIALogger.logMessage("tearDown");
        //do some things after any test method in zhe TestCase
    },

 
    // test_UserLogin : function(){
    //     User.login("10003939", "im123456");
    // },

    test_SearchUser: function(){
        Chats.search("陈震");
        Chats.searchCancle();
    }

    // test_UserLogOut: function(){
    //     User.logout();
    // },

}); 

