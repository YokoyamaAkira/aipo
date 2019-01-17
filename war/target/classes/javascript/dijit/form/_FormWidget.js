if(!dojo._hasResource["dijit.form._FormWidget"]){dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(A){this.domNode.disabled=this.disabled=A;
if(this.focusNode){this.focusNode.disabled=A
}if(A){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",A);
this._setStateClass()
},_onMouse:function(C){var D=C.target;
if(D&&D.getAttribute){this.stateModifier=D.getAttribute("stateModifier")||""
}if(!this.disabled){switch(C.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var A=this;
var B=this.connect(dojo.body(),"onmouseup",function(){A._active=false;
A._setStateClass();
A.disconnect(B)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(dojo.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var B=[this.baseClass];
function A(C){B=B.concat(dojo.map(B,function(D){return D+C
}))
}if(this.checked){A("Checked")
}if(this.state){A(this.state)
}if(this.selected){A("Selected")
}if(this.disabled){A("Disabled")
}else{if(this._active){A(this.stateModifier+"Active")
}else{if(this._focused){A("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){A(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+B.join(" ")
},onChange:function(A){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(B,A){this._lastValue=B;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(A===undefined){A=true
}if(this._lastValueReported==undefined&&A===null){this._lastValueReported=B
}if((this.intermediateChanges||A)&&((B&&B.toString)?B.toString():B)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=B;
this.onChange(B)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(B){if(B.keyCode==dojo.keys.ESCAPE&&!B.shiftKey&&!B.ctrlKey&&!B.altKey){var A=this.getValue();
var C=this._lastValueReported;
if((typeof C!="undefined")&&((A!==null&&A.toString)?A.toString():null)!==C.toString()){this.undo();
dojo.stopEvent(B);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
};