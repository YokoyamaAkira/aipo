dojo._xdResourceLoaded({depends:[["provide","dijit.form.NumberSpinner"],["require","dijit.form._Spinner"],["require","dijit.form.NumberTextBox"]],defineResource:function(A){if(!A._hasResource["dijit.form.NumberSpinner"]){A._hasResource["dijit.form.NumberSpinner"]=true;
A.provide("dijit.form.NumberSpinner");
A.require("dijit.form._Spinner");
A.require("dijit.form.NumberTextBox");
A.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(C,D){var B=C+D;
if(isNaN(C)||isNaN(B)){return C
}if((typeof this.constraints.max=="number")&&(B>this.constraints.max)){B=this.constraints.max
}if((typeof this.constraints.min=="number")&&(B<this.constraints.min)){B=this.constraints.min
}return B
}})
}}});