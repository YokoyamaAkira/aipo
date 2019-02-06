dojo._xdResourceLoaded({depends:[["provide","dijit.form.DateTextBox"],["require","dijit._Calendar"],["require","dijit.form.TimeTextBox"]],defineResource:function(A){if(!A._hasResource["dijit.form.DateTextBox"]){A._hasResource["dijit.form.DateTextBox"]=true;
A.provide("dijit.form.DateTextBox");
A.require("dijit._Calendar");
A.require("dijit.form.TimeTextBox");
A.declare("dijit.form.DateTextBox",dijit.form.TimeTextBox,{_popupClass:"dijit._Calendar",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.selector="date"
}})
}}});