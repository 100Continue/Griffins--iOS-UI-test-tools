var Griffins = Griffins || {};

(function() {
    Griffins.namespace = function() {
        var a = arguments, o = null, i, j, d;
        for (i = 0; i < a.length; i = i + 1) {
            d = ("" + a[i]).split(".");
            o = Griffins;
    
            for (j = (d[0] == "Griffins") ? 1 : 0; j < d.length; j = j + 1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
        return o;
    };
    
    Griffins.namespace('consts');

    Griffins.consts.OP = Object.prototype;
    Griffins.consts.FUNCTION_TOSTRING = '[object Function]';
    Griffins.consts.ARRAY_TOSTRING = '[object Array]';
    
    Griffins.namespace('util');
    
    Griffins.util = {
        isFunction: function(o) {
            return (typeof o === 'function') || Griffins.consts.OP.toString.apply(o) === Griffins.consts.FUNCTION_TOSTRING;
        },
        
        isObject: function(o) {
            return (o && (typeof o === 'object' || Griffins.util.isFunction(o))) || false;
        },
        
        isString: function(o) {
            return typeof o === 'string';
        },
        
        isArray: function(o) {
            return Griffins.consts.OP.toString.apply(o) === Griffins.consts.ARRAY_TOSTRING;
        },
        
        isDict: function(o) {
            return Griffins.contes.OP.toString.applay(o) === Griffins.contes.DICT_TOSTRING;
        },
        
        /**
         * (intentionally not documented)
         * Simple escape function for XML attribute values.
         * @param {String} text The text to escape.
         * @return {String} The escaped text.
         */
        xmlEscape: function(text){
            var text1 = text+"";
            return text1.replace(/["'<>&]/g, function(c){
                switch(c){
                    case "<":   return "&lt;";
                    case ">":   return "&gt;";
                    case "\"":  return "&quot;";
                    case "'":   return "&apos;";
                    case "&":   return "&amp;";
                }
            });
        },
        
        /**
         * Utility to set up the prototype, constructor and superclass properties to
         * support an inheritance strategy that can chain constructors and methods.
         * Static members will not be inherited.
         *
         * @method extend
         * @static
         * @param {Function} subc   the object to modify
         * @param {Function} superc the object to inherit
         * @param {Object} overrides  additional properties/methods to add to the
         *                              subclass prototype.  These will override the
         *                              matching items obtained from the superclass
         *                              if present.
         */
        extend: function(subc, superc, overrides) {
            if (!superc||!subc) {
                throw new Error("extend failed, please check that " +
                                "all dependencies are included.");
            }
            var F = function() {}, i;
            F.prototype=superc.prototype;
            subc.prototype=new F();
            subc.prototype.constructor=subc;
            subc.superclass=superc.prototype;
            if (superc.prototype.constructor == Griffins.consts.OP.constructor) {
                superc.prototype.constructor = superc;
            }

            if (overrides) {
                for (i in overrides) {
                    subc.prototype[i]=overrides[i];
                }
            }
        },
    };
})();


Griffins.namespace('event');

Griffins.event.Event = function(name) {

    this.name = name;

    return this;
};

Griffins.event.Event.prototype = {
    
};

Griffins.event.EventProvider = function() {
    
};


Griffins.event.EventProvider.prototype = {
    __nd_events : null,
    
    __nd_subscribers : null,
    
    /**
     * Subscribe the event with the given callback.
     * @param event
     * @param callback
     */
    subscribe : function(event, callback) {
        this.__nd_events = this.__nd_events || {};
        var theEvent = this.__nd_events[event];
        if (theEvent) {
            this.__nd_subscribers = this.__nd_subscribers || {};
            this.__nd_subscribers[event] = this.__nd_subscribers[event] || [];
            this.__nd_subscribers[event].push(callback);
        }
    },
    
    /**
     * Create a event into the list.
     * When an event is fired, only the event in this list would be notified.
     * @param event
     */
    createEvent : function(event) {
        this.__nd_events = this.__nd_events || {};
        this.__nd_events[event] = new Griffins.event.Event(event);
    },
    
    /**
     * Fire 
     * @param event
     * @param type
     * @param data
     */
    fireEvent : function(event, data) {
        this.__nd_subscribers = this.__nd_subscribers || {};
        var subscribers = this.__nd_subscribers[event] || [], i;
        for (i = 0; i < subscribers.length; i++) {
            subscribers[i].call(this, data);
        }
    }
};
