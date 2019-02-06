if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.require("dijit.form._Spinner");
dojo.require("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(A,B){var C=A+B;
if(isNaN(A)||isNaN(C)){return A
}if((typeof this.constraints.max=="number")&&(C>this.constraints.max)){C=this.constraints.max
}if((typeof this.constraints.min=="number")&&(C<this.constraints.min)){C=this.constraints.min
}return C
}})
};