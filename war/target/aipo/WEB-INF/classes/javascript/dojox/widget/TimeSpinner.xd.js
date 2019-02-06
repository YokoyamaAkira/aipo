dojo._xdResourceLoaded({depends:[["provide","dojox.widget.TimeSpinner"],["require","dijit.form._Spinner"],["require","dijit.form.NumberTextBox"],["require","dojo.date"],["require","dojo.date.locale"],["require","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojox.widget.TimeSpinner"]){A._hasResource["dojox.widget.TimeSpinner"]=true;
A.provide("dojox.widget.TimeSpinner");
A.require("dijit.form._Spinner");
A.require("dijit.form.NumberTextBox");
A.require("dojo.date");
A.require("dojo.date.locale");
A.require("dojo.date.stamp");
A.declare("dojox.widget.TimeSpinner",[dijit.form._Spinner],{required:false,adjust:function(C,B){return A.date.add(C,"minute",B)
},isValid:function(){return true
},smallDelta:5,largeDelta:30,timeoutChangeRate:0.5,parse:function(B,C){return A.date.locale.parse(B,{selector:"time",formatLength:"short"})
},format:function(B,C){if(A.isString(B)){return B
}return A.date.locale.format(B,{selector:"time",formatLength:"short"})
},serialize:A.date.stamp.toISOString,value:"12:00 AM"})
}}});