dojo._xdResourceLoaded({depends:[["provide","dijit.form.NumberSpinner"],["require","dijit.form._Spinner"],["require","dijit.form.NumberTextBox"]],defineResource:function(A){if(!A._hasResource["dijit.form.NumberSpinner"]){A._hasResource["dijit.form.NumberSpinner"]=true;
A.provide("dijit.form.NumberSpinner");
A.require("dijit.form._Spinner");
A.require("dijit.form.NumberTextBox");
A.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(D,B){var C=D+B;
if(isNaN(D)||isNaN(C)){return D
}if((typeof this.constraints.max=="number")&&(C>this.constraints.max)){C=this.constraints.max
}if((typeof this.constraints.min=="number")&&(C<this.constraints.min)){C=this.constraints.min
}return C
}})
}}});