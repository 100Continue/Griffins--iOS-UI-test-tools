#import "Tools.js"

var Finder = {
    
    elementsArray: null,

    findElementByName: function(name,parent){
        wait4IndicatorDis();
        return this.findElement_By_name(name,parent)
    },

    findElementByValue: function(name,parent){
        wait4IndicatorDis();
        return this.findElement_By_value(name,parent)
    },

    app: function(){
        return UIATarget.localTarget().frontMostApp()
    },

    navigationBarLeftButton: function(){
        wait4IndicatorDis();
        return UIATarget.localTarget().frontMostApp().mainWindow().navigationBar().leftButton()
    },

    navigationBarRightButton: function(){
        wait4IndicatorDis();
        return UIATarget.localTarget().frontMostApp().mainWindow().navigationBar().rightButton()
    },

    _findElementsByClassType: function(classType,parent){
        //UIALogger.logMessage("into _findElementsByClassType");
        if (!parent) {
            parent = UIATarget.localTarget().frontMostApp();
        }
        elementList = new Array();
        this.elementsArray = null;
        this.elementsArray = new Array();
        this._searchAllElements(parent);
        //UIALogger.logMessage("elementsArray length is: " + this.elementsArray.length);
        for(var i = 0;i < this.elementsArray.length;i++){
            //UIALogger.logMessage("elementsArray[" + i + "] is " + this.elementsArray[i].toString());
            if (this.elementsArray[i].toString() == "[object UIA"+classType+"]" ){
                //UIALogger.logMessage("add elementList " + this.elementsArray[i] + "classtype is " + classType);
                elementList.push(this.elementsArray[i]);
            }
        }
        //UIALogger.logMessage("elementList length is " + elementList.length);
        return elementList; 
    },

    findElementsByClassType: function(classType,parent){
        wait4IndicatorDis();
        return this._findElementsByClassType(classType,parent); 
    },

    findElementByNameAndClassType: function(name,classType,parent){
        wait4IndicatorDis();
        if (!parent) {
            parent = UIATarget.localTarget().frontMostApp();
        }
        var result
        try {
            UIATarget.localTarget().pushTimeout(0);
            result = parent.withName(name);
            UIALogger.logMessage("find " + name + " and classtype " + classType + " result: " + result);
        
            var elementList = this.findElementsByClassType(classType,parent);
            for(var i = 0;i < elementList.length;i++){
                if (!this.isNil(elementList[i].withName(name)) ){
                    result = elementList[i];
                    UIALogger.logMessage("find " + name + " and classtype " + classType + " result: " + result);
                    return result;
                }
        }
        UIALogger.logMessage("find " + name + " and classtype " + classType + " result: " + result);
        return result;
        }finally{
            UIATarget.localTarget().popTimeout();
        }
    },

    findElementsWithPredicate: function(PredicateString,parent){
        wait4IndicatorDis();
        if (!parent) {
            parent = UIATarget.localTarget().frontMostApp();
        }
        var elementList = new Array();
        this.elementsArray = null;
        this.elementsArray = new Array();
        this._searchAllElements(parent);
        try {
            UIATarget.localTarget().pushTimeout(0);
            for(var i = 0;i < this.elementsArray.length;i++){
                if (!this.isNil(this.elementsArray[i].withPredicate(PredicateString)) ){
                    elementList.push(this.elementsArray[i]);
                }
            }
            return elementList;
        } finally {
            UIATarget.localTarget().popTimeout();
        }
    },

    findFristElementWithPredicate:function(PredicateString,parent){
        wait4IndicatorDis();
        if (!parent) {
            parent = UIATarget.localTarget().frontMostApp();
        }
        this.elementsArray = null;
        this.elementsArray = new Array();
        this._searchAllElements(parent);
        try {
            UIATarget.localTarget().pushTimeout(0);
            for(var i = 0;i < this.elementsArray.length;i++){
                if (!this.isNil(this.elementsArray[i].withPredicate(PredicateString)) ){
                 return this.elementsArray[i];
                }
             }
        return this.elementsArray[0].withPredicate(PredicateString);
        } finally {
            UIATarget.localTarget().popTimeout();
        }
    },

    findListChild: function(tableName,item,group){
        wait4IndicatorDis();
        var table  = Finder.findElement_By_name(tableName);
        var grp;
        if( item<0 ){
            grp = table.groups()[group];
        }else if ( (group==null) && (item>=0)){
            grp = table.cells()[item];
        }else{
            var group = table.groups()[group];
            var tableElements = table.elements();
            var groupIndex = -1;
            for (var i = 0; i < tableElements.length; i++) {
                if (group.toString() == tableElements[i].toString()) {
                    log(group.name())
                    if (group.name()==tableElements[i].name()) {
                        groupIndex = i
                        log(i)
                    }
                }
            }
            if (groupIndex != -1) {
                grp = tableElements[groupIndex+item+1]
                log(grp);
            }
        }
        table.scrollToElementWithName(grp.name());
        return grp;
    },

    findElement_By_name: function(name, parent){
        var start = (new Date()).getTime();	
    	if (!parent) {
    		parent = UIATarget.localTarget().frontMostApp();
    	}
            var timeout = UIATarget.localTarget().timeout();
    	var result;
    	while (((new Date()).getTime() - start) < (timeout * 500) || timeout == 0) {
    		result = this._searchElements(parent, name, "name");
            UIALogger.logMessage("find " + name + " result: " + result);
    		if (!this.isNil(result)) {
               //  if(!inScreen(result)){
               //      result.scrollToVisible();
               // }
               UIALogger.logMessage("find " + name + " result: " + result);
                return result;
    		}
    	}
        UIALogger.logMessage("find " + name + " result: " + result);
        return result;
        },
      
    findElement_By_value: function(value, parent){
        var start = (new Date()).getTime();	
    	if (!parent) {
    		parent = UIATarget.localTarget().frontMostApp();
    	}
            var timeout = UIATarget.localTarget().timeout();
    	var result;
    	while (((new Date()).getTime() - start) < (timeout * 1000) || timeout == 0) {
    		result = this._searchElements(parent, value, "value");
    		if (result.isValid()) {
                        UIATarget.localTarget().delay(0.1); 
    		   return result;
    		}
    	}
            return result;
        },

    isNil: function(element) {
    	return (element.toString() == "[object UIAElementNil]");
        },
        
    scrollTo_And_Get: function(tableName,item,group){
        var table  = Finder.findElement_By_name(tableName);
        var grp;
        if( item<0 ){
            grp = table.groups()[group];
        }else if ( (group==null) && (item>=0)){
            grp = table.cells()[item];
        }else{
            grp = table.groups()[group].cells()[item];
        }
        table.scrollToElementWithName(grp.name());
        return grp;
    },

    _searchElements: function(elem, value, key) {
    	try {
    		UIATarget.localTarget().pushTimeout(0);
    		var result = elem.withValueForKey(value, key);
    		if (!this.isNil(result)) {
    			return result;
    		}		
    		var elems = elem.elements();
    		var i;
    		for (i = 0; i < elems.length; i++) {
    			var child = elems[i];
    			result = this._searchElements(child, value, key);
    			if (!this.isNil(result)) {
    				return result;
    			}
    		}
    		return result;
    	} finally {
    		UIATarget.localTarget().popTimeout();
    	}
        },

    _searchAllElements: function(root) {
        try {
            UIATarget.localTarget().pushTimeout(0);
            var elelist  = root.elements();
            //UIALogger.logMessage("elelist length is: " + elelist.length);
            for (var i =0; i<elelist.length; i++) {
                this.elementsArray.push(elelist[i])
                if (elelist[i].elements().length!=0 && elelist[i].elements()!=null) 
                {
                    this._searchAllElements(elelist[i])
                }
            }
        } finally {
            UIATarget.localTarget().popTimeout();
        }
    },

}
