dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.editors"],["provide","dojox.grid.editors"]],defineResource:function(A){if(!A._hasResource["dojox.grid._data.editors"]){A._hasResource["dojox.grid._data.editors"]=true;
A.provide("dojox.grid._data.editors");
A.provide("dojox.grid.editors");
A.declare("dojox.grid.editors.Base",null,{constructor:function(B){this.cell=B
},_valueProp:"value",_formatPending:false,format:function(C,B){},needFormatNode:function(C,B){this._formatPending=true;
dojox.grid.whenIdle(this,"_formatNode",C,B)
},cancelFormatNode:function(){this._formatPending=false
},_formatNode:function(C,B){if(this._formatPending){this._formatPending=false;
A.setSelectable(this.cell.grid.domNode,true);
this.formatNode(this.getNode(B),C,B)
}},getNode:function(B){return(this.cell.getNode(B)||0).firstChild||0
},formatNode:function(D,C,B){if(A.isIE){dojox.grid.whenIdle(this,"focus",B,D)
}else{this.focus(B,D)
}},dispatchEvent:function(B,C){if(B in this){return this[B](C)
}},getValue:function(B){return this.getNode(B)[this._valueProp]
},setValue:function(C,B){var D=this.getNode(C);
if(D){D[this._valueProp]=B
}},focus:function(B,C){dojox.grid.focusSelectNode(C||this.getNode(B))
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
},keyFilter:null,format:function(C,B){this.needFormatNode(C,B);
return'<input class="dojoxGrid-input" type="text" value="'+C+'">'
},formatNode:function(D,C,B){this.inherited(arguments);
this.cell.registerOnBlur(D,B)
},doKey:function(C){if(this.keyFilter){var B=String.fromCharCode(C.charCode);
if(B.search(this.keyFilter)==-1){A.stopEvent(C)
}}},_finish:function(C){this.inherited(arguments);
var D=this.getNode(C);
try{dojox.grid.fire(D,"blur")
}catch(B){}}});
dojox.grid.editors.input=dojox.grid.editors.Input;
A.declare("dojox.grid.editors.Select",dojox.grid.editors.Input,{constructor:function(B){this.options=this.options||this.cell.options;
this.values=this.values||this.cell.values||this.options
},format:function(G,F){this.needFormatNode(G,F);
var D=['<select class="dojoxGrid-select">'];
for(var C=0,E,B;
(E=this.options[C])&&(B=this.values[C]);
C++){D.push("<option",(G==E?" selected":""),">",E,"</option>")
}D.push("</select>");
return D.join("")
},getValue:function(D){var E=this.getNode(D);
if(E){var B=E.selectedIndex,C=E.options[B];
return this.cell.returnIndex?B:C.value||C.innerHTML
}}});
dojox.grid.editors.select=dojox.grid.editors.Select;
A.declare("dojox.grid.editors.AlwaysOn",dojox.grid.editors.Input,{alwaysOn:true,_formatNode:function(C,B){this.formatNode(this.getNode(B),C,B)
},applyStaticValue:function(C){var B=this.cell.grid.edit;
B.applyCellEdit(this.getValue(C),this.cell,C);
B.start(this.cell,C,true)
}});
dojox.grid.editors.alwaysOn=dojox.grid.editors.AlwaysOn;
A.declare("dojox.grid.editors.Bool",dojox.grid.editors.AlwaysOn,{_valueProp:"checked",format:function(C,B){return'<input class="dojoxGrid-input" type="checkbox"'+(C?' checked="checked"':"")+' style="width: auto" />'
},doclick:function(B){if(B.target.tagName=="INPUT"){this.applyStaticValue(B.rowIndex)
}}});
dojox.grid.editors.bool=dojox.grid.editors.Bool
}}});