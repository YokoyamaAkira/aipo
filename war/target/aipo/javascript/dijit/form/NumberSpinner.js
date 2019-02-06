if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.require("dijit.form._Spinner");
dojo.require("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(B,C){var A=B+C;
if(isNaN(B)||isNaN(A)){return B
}if((typeof this.constraints.max=="number")&&(A>this.constraints.max)){A=this.constraints.max
}if((typeof this.constraints.min=="number")&&(A<this.constraints.min)){A=this.constraints.min
}return A
}})
};