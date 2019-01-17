if(!dojo._hasResource["dojox.widget.TimeSpinner"]){dojo._hasResource["dojox.widget.TimeSpinner"]=true;
dojo.provide("dojox.widget.TimeSpinner");
dojo.require("dijit.form._Spinner");
dojo.require("dijit.form.NumberTextBox");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.widget.TimeSpinner",[dijit.form._Spinner],{required:false,adjust:function(A,B){return dojo.date.add(A,"minute",B)
},isValid:function(){return true
},smallDelta:5,largeDelta:30,timeoutChangeRate:0.5,parse:function(B,A){return dojo.date.locale.parse(B,{selector:"time",formatLength:"short"})
},format:function(B,A){if(dojo.isString(B)){return B
}return dojo.date.locale.format(B,{selector:"time",formatLength:"short"})
},serialize:dojo.date.stamp.toISOString,value:"12:00 AM"})
};