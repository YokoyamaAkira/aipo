dojo._xdResourceLoaded({depends:[["provide","dijit.form.Form"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.form.Form"]){A._hasResource["dijit.form.Form"]=true;
A.provide("dijit.form.Form");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:A.mixin(A.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(B){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(B){A.stopEvent(B);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(B){var F={};
A.forEach(this.getDescendants(),function(H){if(!H.name){return 
}var G=F[H.name]||(F[H.name]=[]);
G.push(H)
});
for(var D in F){var E=F[D],C=A.getObject(D,false,B);
if(!A.isArray(C)){C=[C]
}if(E[0].setChecked){A.forEach(E,function(G,H){G.setChecked(A.indexOf(C,G.value)!=-1)
})
}else{A.forEach(E,function(G,H){G.setValue(C[H])
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