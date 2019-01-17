if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(A){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(A){dojo.stopEvent(A);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(E){var D={};
dojo.forEach(this.getDescendants(),function(G){if(!G.name){return 
}var F=D[G.name]||(D[G.name]=[]);
F.push(G)
});
for(var B in D){var C=D[B],A=dojo.getObject(B,false,E);
if(!dojo.isArray(A)){A=[A]
}if(C[0].setChecked){dojo.forEach(C,function(F,G){F.setChecked(dojo.indexOf(A,F.value)!=-1)
})
}else{dojo.forEach(C,function(F,G){F.setValue(A[G])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(E){var D=E.getValue?E.getValue():E.value;
var B=E.name;
if(!B){return 
}if(E.setChecked){if(/Radio/.test(E.declaredClass)){if(E.checked){dojo.setObject(B,D,A)
}}else{var C=dojo.getObject(B,false,A);
if(!C){C=[];
dojo.setObject(B,C,A)
}if(E.checked){C.push(D)
}}}else{dojo.setObject(B,D,A)
}});
return A
},isValid:function(){return dojo.every(this.getDescendants(),function(A){return !A.isValid||A.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
};