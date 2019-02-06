dojo._xdResourceLoaded({depends:[["provide","dijit.form._FormWidget"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.form._FormWidget"]){A._hasResource["dijit.form._FormWidget"]=true;
A.provide("dijit.form._FormWidget");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:A.mixin(A.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(B){this.domNode.disabled=this.disabled=B;
if(this.focusNode){this.focusNode.disabled=B
}if(B){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",B);
this._setStateClass()
},_onMouse:function(E){var B=E.target;
if(B&&B.getAttribute){this.stateModifier=B.getAttribute("stateModifier")||""
}if(!this.disabled){switch(E.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var C=this;
var D=this.connect(A.body(),"onmouseup",function(){C._active=false;
C._setStateClass();
C.disconnect(D)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(A.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var B=[this.baseClass];
function C(D){B=B.concat(A.map(B,function(E){return E+D
}))
}if(this.checked){C("Checked")
}if(this.state){C(this.state)
}if(this.selected){C("Selected")
}if(this.disabled){C("Disabled")
}else{if(this._active){C(this.stateModifier+"Active")
}else{if(this._focused){C("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){C(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+B.join(" ")
},onChange:function(B){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(B,C){this._lastValue=B;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(C===undefined){C=true
}if(this._lastValueReported==undefined&&C===null){this._lastValueReported=B
}if((this.intermediateChanges||C)&&((B&&B.toString)?B.toString():B)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=B;
this.onChange(B)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(D){if(D.keyCode==A.keys.ESCAPE&&!D.shiftKey&&!D.ctrlKey&&!D.altKey){var C=this.getValue();
var B=this._lastValueReported;
if((typeof B!="undefined")&&((C!==null&&C.toString)?C.toString():null)!==B.toString()){this.undo();
A.stopEvent(D);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}}});