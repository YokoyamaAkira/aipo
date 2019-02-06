if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(A){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(A){dojo.stopEvent(A);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(D){var C={};
dojo.forEach(this.getDescendants(),function(F){if(!F.name){return 
}var G=C[F.name]||(C[F.name]=[]);
G.push(F)
});
for(var A in C){var B=C[A],E=dojo.getObject(A,false,D);
if(!dojo.isArray(E)){E=[E]
}if(B[0].setChecked){dojo.forEach(B,function(G,F){G.setChecked(dojo.indexOf(E,G.value)!=-1)
})
}else{dojo.forEach(B,function(G,F){G.setValue(E[F])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(B){var E=B.getValue?B.getValue():B.value;
var C=B.name;
if(!C){return 
}if(B.setChecked){if(/Radio/.test(B.declaredClass)){if(B.checked){dojo.setObject(C,E,A)
}}else{var D=dojo.getObject(C,false,A);
if(!D){D=[];
dojo.setObject(C,D,A)
}if(B.checked){D.push(E)
}}}else{dojo.setObject(C,E,A)
}});
return A
},isValid:function(){return dojo.every(this.getDescendants(),function(A){return !A.isValid||A.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
};