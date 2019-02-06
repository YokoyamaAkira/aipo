if(!dojo._hasResource["dojox.widget.TimeSpinner"]){dojo._hasResource["dojox.widget.TimeSpinner"]=true;
dojo.provide("dojox.widget.TimeSpinner");
dojo.require("dijit.form._Spinner");
dojo.require("dijit.form.NumberTextBox");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.widget.TimeSpinner",[dijit.form._Spinner],{required:false,adjust:function(B,A){return dojo.date.add(B,"minute",A)
},isValid:function(){return true
},smallDelta:5,largeDelta:30,timeoutChangeRate:0.5,parse:function(A,B){return dojo.date.locale.parse(A,{selector:"time",formatLength:"short"})
},format:function(A,B){if(dojo.isString(A)){return A
}return dojo.date.locale.format(A,{selector:"time",formatLength:"short"})
},serialize:dojo.date.stamp.toISOString,value:"12:00 AM"})
};