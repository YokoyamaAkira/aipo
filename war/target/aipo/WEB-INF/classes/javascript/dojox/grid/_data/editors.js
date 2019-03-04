if(!dojo._hasResource["dojox.grid._data.editors"]){dojo._hasResource["dojox.grid._data.editors"]=true;
dojo.provide("dojox.grid._data.editors");
dojo.provide("dojox.grid.editors");
dojo.declare("dojox.grid.editors.Base",null,{constructor:function(A){this.cell=A
},_valueProp:"value",_formatPending:false,format:function(B,A){},needFormatNode:function(B,A){this._formatPending=true;
dojox.grid.whenIdle(this,"_formatNode",B,A)
},cancelFormatNode:function(){this._formatPending=false
},_formatNode:function(B,A){if(this._formatPending){this._formatPending=false;
dojo.setSelectable(this.cell.grid.domNode,true);
this.formatNode(this.getNode(A),B,A)
}},getNode:function(A){return(this.cell.getNode(A)||0).firstChild||0
},formatNode:function(C,B,A){if(dojo.isIE){dojox.grid.whenIdle(this,"focus",A,C)
}else{this.focus(A,C)
}},dispatchEvent:function(A,B){if(A in this){return this[A](B)
}},getValue:function(A){return this.getNode(A)[this._valueProp]
},setValue:function(B,A){var C=this.getNode(B);
if(C){C[this._valueProp]=A
}},focus:function(A,B){dojox.grid.focusSelectNode(B||this.getNode(A))
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
},keyFilter:null,format:function(B,A){this.needFormatNode(B,A);
return'<input class="dojoxGrid-input" type="text" value="'+B+'">'
},formatNode:function(C,B,A){this.inherited(arguments);
this.cell.registerOnBlur(C,A)
},doKey:function(B){if(this.keyFilter){var A=String.fromCharCode(B.charCode);
if(A.search(this.keyFilter)==-1){dojo.stopEvent(B)
}}},_finish:function(B){this.inherited(arguments);
var C=this.getNode(B);
try{dojox.grid.fire(C,"blur")
}catch(A){}}});
dojox.grid.editors.input=dojox.grid.editors.Input;
dojo.declare("dojox.grid.editors.Select",dojox.grid.editors.Input,{constructor:function(A){this.options=this.options||this.cell.options;
this.values=this.values||this.cell.values||this.options
},format:function(F,E){this.needFormatNode(F,E);
var C=['<select class="dojoxGrid-select">'];
for(var B=0,D,A;
(D=this.options[B])&&(A=this.values[B]);
B++){C.push("<option",(F==D?" selected":""),">",D,"</option>")
}C.push("</select>");
return C.join("")
},getValue:function(C){var D=this.getNode(C);
if(D){var A=D.selectedIndex,B=D.options[A];
return this.cell.returnIndex?A:B.value||B.innerHTML
}}});
dojox.grid.editors.select=dojox.grid.editors.Select;
dojo.declare("dojox.grid.editors.AlwaysOn",dojox.grid.editors.Input,{alwaysOn:true,_formatNode:function(B,A){this.formatNode(this.getNode(A),B,A)
},applyStaticValue:function(B){var A=this.cell.grid.edit;
A.applyCellEdit(this.getValue(B),this.cell,B);
A.start(this.cell,B,true)
}});
dojox.grid.editors.alwaysOn=dojox.grid.editors.AlwaysOn;
dojo.declare("dojox.grid.editors.Bool",dojox.grid.editors.AlwaysOn,{_valueProp:"checked",format:function(B,A){return'<input class="dojoxGrid-input" type="checkbox"'+(B?' checked="checked"':"")+' style="width: auto" />'
},doclick:function(A){if(A.target.tagName=="INPUT"){this.applyStaticValue(A.rowIndex)
}}});
dojox.grid.editors.bool=dojox.grid.editors.Bool
};