dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.editors"],["provide","dojox.grid.editors"]],defineResource:function(A){if(!A._hasResource["dojox.grid._data.editors"]){A._hasResource["dojox.grid._data.editors"]=true;
A.provide("dojox.grid._data.editors");
A.provide("dojox.grid.editors");
A.declare("dojox.grid.editors.Base",null,{constructor:function(B){this.cell=B
},_valueProp:"value",_formatPending:false,format:function(B,C){},needFormatNode:function(B,C){this._formatPending=true;
dojox.grid.whenIdle(this,"_formatNode",B,C)
},cancelFormatNode:function(){this._formatPending=false
},_formatNode:function(B,C){if(this._formatPending){this._formatPending=false;
A.setSelectable(this.cell.grid.domNode,true);
this.formatNode(this.getNode(C),B,C)
}},getNode:function(B){return(this.cell.getNode(B)||0).firstChild||0
},formatNode:function(B,D,C){if(A.isIE){dojox.grid.whenIdle(this,"focus",C,B)
}else{this.focus(C,B)
}},dispatchEvent:function(C,B){if(C in this){return this[C](B)
}},getValue:function(B){return this.getNode(B)[this._valueProp]
},setValue:function(D,C){var B=this.getNode(D);
if(B){B[this._valueProp]=C
}},focus:function(C,B){dojox.grid.focusSelectNode(B||this.getNode(C))
},save:function(B){this.value=this.value||this.getValue(B)
},restore:function(B){this.setValue(B,this.value)
},_finish:function(B){A.setSelectable(this.cell.grid.domNode,false);
this.cancelFormatNode(this.cell)
},apply:function(B){this.cell.applyEdit(this.getValue(B),B);
this._finish(B)
},cancel:function(B){this.cell.cancelEdit(B);
this._finish(B)
}});
dojox.grid.editors.base=dojox.grid.editors.Base;
A.declare("dojox.grid.editors.Input",dojox.grid.editors.Base,{constructor:function(B){this.keyFilter=this.keyFilter||this.cell.keyFilter
},keyFilter:null,format:function(B,C){this.needFormatNode(B,C);
return'<input class="dojoxGrid-input" type="text" value="'+B+'">'
},formatNode:function(B,D,C){this.inherited(arguments);
this.cell.registerOnBlur(B,C)
},doKey:function(B){if(this.keyFilter){var C=String.fromCharCode(B.charCode);
if(C.search(this.keyFilter)==-1){A.stopEvent(B)
}}},_finish:function(D){this.inherited(arguments);
var B=this.getNode(D);
try{dojox.grid.fire(B,"blur")
}catch(C){}}});
dojox.grid.editors.input=dojox.grid.editors.Input;
A.declare("dojox.grid.editors.Select",dojox.grid.editors.Input,{constructor:function(B){this.options=this.options||this.cell.options;
this.values=this.values||this.cell.values||this.options
},format:function(C,G){this.needFormatNode(C,G);
var E=['<select class="dojoxGrid-select">'];
for(var D=0,F,B;
(F=this.options[D])&&(B=this.values[D]);
D++){E.push("<option",(C==F?" selected":""),">",F,"</option>")
}E.push("</select>");
return E.join("")
},getValue:function(E){var B=this.getNode(E);
if(B){var C=B.selectedIndex,D=B.options[C];
return this.cell.returnIndex?C:D.value||D.innerHTML
}}});
dojox.grid.editors.select=dojox.grid.editors.Select;
A.declare("dojox.grid.editors.AlwaysOn",dojox.grid.editors.Input,{alwaysOn:true,_formatNode:function(B,C){this.formatNode(this.getNode(C),B,C)
},applyStaticValue:function(B){var C=this.cell.grid.edit;
C.applyCellEdit(this.getValue(B),this.cell,B);
C.start(this.cell,B,true)
}});
dojox.grid.editors.alwaysOn=dojox.grid.editors.AlwaysOn;
A.declare("dojox.grid.editors.Bool",dojox.grid.editors.AlwaysOn,{_valueProp:"checked",format:function(B,C){return'<input class="dojoxGrid-input" type="checkbox"'+(B?' checked="checked"':"")+' style="width: auto" />'
},doclick:function(B){if(B.target.tagName=="INPUT"){this.applyStaticValue(B.rowIndex)
}}});
dojox.grid.editors.bool=dojox.grid.editors.Bool
}}});