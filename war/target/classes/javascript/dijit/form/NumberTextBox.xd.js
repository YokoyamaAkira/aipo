dojo._xdResourceLoaded({depends:[["provide","dijit.form.NumberTextBox"],["require","dijit.form.ValidationTextBox"],["require","dojo.number"]],defineResource:function(A){if(!A._hasResource["dijit.form.NumberTextBox"]){A._hasResource["dijit.form.NumberTextBox"]=true;
A.provide("dijit.form.NumberTextBox");
A.require("dijit.form.ValidationTextBox");
A.require("dojo.number");
A.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:A.number.regexp,format:function(C,B){if(isNaN(C)){return""
}return A.number.format(C,B)
},parse:A.number.parse,filter:function(B){if(typeof B=="string"){return this.inherited("filter",arguments)
}return(isNaN(B)?"":B)
},value:NaN});
A.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{})
}}});