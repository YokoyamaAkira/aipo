dojo._xdResourceLoaded({depends:[["provide","dijit.form.Form"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.form.Form"]){A._hasResource["dijit.form.Form"]=true;
A.provide("dijit.form.Form");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:A.mixin(A.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(B){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(B){A.stopEvent(B);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(F){var E={};
A.forEach(this.getDescendants(),function(H){if(!H.name){return 
}var G=E[H.name]||(E[H.name]=[]);
G.push(H)
});
for(var C in E){var D=E[C],B=A.getObject(C,false,F);
if(!A.isArray(B)){B=[B]
}if(D[0].setChecked){A.forEach(D,function(G,H){G.setChecked(A.indexOf(B,G.value)!=-1)
})
}else{A.forEach(D,function(G,H){G.setValue(B[H])
})
}}},getValues:function(){var B={};
A.forEach(this.getDescendants(),function(F){var E=F.getValue?F.getValue():F.value;
var C=F.name;
if(!C){return 
}if(F.setChecked){if(/Radio/.test(F.declaredClass)){if(F.checked){A.setObject(C,E,B)
}}else{var D=A.getObject(C,false,B);
if(!D){D=[];
A.setObject(C,D,B)
}if(F.checked){D.push(E)
}}}else{A.setObject(C,E,B)
}});
return B
},isValid:function(){return A.every(this.getDescendants(),function(B){return !B.isValid||B.isValid()
})
}});
A.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}}});