if(!dojo._hasResource["dojox.grid._data.editors"]){dojo._hasResource["dojox.grid._data.editors"]=true;
dojo.provide("dojox.grid._data.editors");
dojo.provide("dojox.grid.editors");
dojo.declare("dojox.grid.editors.Base",null,{constructor:function(A){this.cell=A
},_valueProp:"value",_formatPending:false,format:function(A,B){},needFormatNode:function(A,B){this._formatPending=true;
dojox.grid.whenIdle(this,"_formatNode",A,B)
},cancelFormatNode:function(){this._formatPending=false
},_formatNode:function(A,B){if(this._formatPending){this._formatPending=false;
dojo.setSelectable(this.cell.grid.domNode,true);
this.formatNode(this.getNode(B),A,B)
}},getNode:function(A){return(this.cell.getNode(A)||0).firstChild||0
},formatNode:function(B,A,C){if(dojo.isIE){dojox.grid.whenIdle(this,"focus",C,B)
}else{this.focus(C,B)
}},dispatchEvent:function(B,A){if(B in this){return this[B](A)
}},getValue:function(A){return this.getNode(A)[this._valueProp]
},setValue:function(A,C){var B=this.getNode(A);
if(B){B[this._valueProp]=C
}},focus:function(B,A){dojox.grid.focusSelectNode(A||this.getNode(B))
},save:function(A){this.value=this.value||this.getValue(A)
},restore:function(A){this.setValue(A,this.value)
},_finish:function(A){dojo.setSelectable(this.cell.grid.domNode,false);
this.cancelFormatNode(this.cell)
},apply:function(A){this.cell.applyEdit(this.getValue(A),A);
this._finish(A)
},cancel:function(A){this.cell.cancelEdit(A);
this._finish(A)
}});
dojox.grid.editors.base=dojox.grid.editors.Base;
dojo.declare("dojox.grid.editors.Input",dojox.grid.editors.Base,{constructor:function(A){this.keyFilter=this.keyFilter||this.cell.keyFilter
},keyFilter:null,format:function(A,B){this.needFormatNode(A,B);
return'<input class="dojoxGrid-input" type="text" value="'+A+'">'
},formatNode:function(B,A,C){this.inherited(arguments);
this.cell.registerOnBlur(B,C)
},doKey:function(A){if(this.keyFilter){var B=String.fromCharCode(A.charCode);
if(B.search(this.keyFilter)==-1){dojo.stopEvent(A)
}}},_finish:function(A){this.inherited(arguments);
var B=this.getNode(A);
try{dojox.grid.fire(B,"blur")
}catch(C){}}});
dojox.grid.editors.input=dojox.grid.editors.Input;
dojo.declare("dojox.grid.editors.Select",dojox.grid.editors.Input,{constructor:function(A){this.options=this.options||this.cell.options;
this.values=this.values||this.cell.values||this.options
},format:function(E,D){this.needFormatNode(E,D);
var B=['<select class="dojoxGrid-select">'];
for(var A=0,C,F;
(C=this.options[A])&&(F=this.values[A]);
A++){B.push("<option",(E==C?" selected":""),">",C,"</option>")
}B.push("</select>");
return B.join("")
},getValue:function(B){var C=this.getNode(B);
if(C){var D=C.selectedIndex,A=C.options[D];
return this.cell.returnIndex?D:A.value||A.innerHTML
}}});
dojox.grid.editors.select=dojox.grid.editors.Select;
dojo.declare("dojox.grid.editors.AlwaysOn",dojox.grid.editors.Input,{alwaysOn:true,_formatNode:function(A,B){this.formatNode(this.getNode(B),A,B)
},applyStaticValue:function(A){var B=this.cell.grid.edit;
B.applyCellEdit(this.getValue(A),this.cell,A);
B.start(this.cell,A,true)
}});
dojox.grid.editors.alwaysOn=dojox.grid.editors.AlwaysOn;
dojo.declare("dojox.grid.editors.Bool",dojox.grid.editors.AlwaysOn,{_valueProp:"checked",format:function(A,B){return'<input class="dojoxGrid-input" type="checkbox"'+(A?' checked="checked"':"")+' style="width: auto" />'
},doclick:function(A){if(A.target.tagName=="INPUT"){this.applyStaticValue(A.rowIndex)
}}});
dojox.grid.editors.bool=dojox.grid.editors.Bool
};