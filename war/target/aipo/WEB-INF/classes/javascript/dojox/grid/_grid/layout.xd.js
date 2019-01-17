dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.layout"],["require","dojox.grid._grid.cell"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.layout"]){A._hasResource["dojox.grid._grid.layout"]=true;
A.provide("dojox.grid._grid.layout");
A.require("dojox.grid._grid.cell");
A.declare("dojox.grid.layout",null,{constructor:function(B){this.grid=B
},cells:null,structure:null,defaultWidth:"6em",setStructure:function(B){this.fieldIndex=0;
this.cells=[];
var D=this.structure=[];
for(var C=0,F,E;
(F=B[C]);
C++){D.push(this.addViewDef(F))
}this.cellCount=this.cells.length
},addViewDef:function(B){this._defaultCellProps=B.defaultCell||{};
return A.mixin({},B,{rows:this.addRowsDef(B.rows||B.cells)})
},addRowsDef:function(D){var B=[];
for(var C=0,E;
D&&(E=D[C]);
C++){B.push(this.addRowDef(C,E))
}return B
},addRowDef:function(G,E){var C=[];
for(var D=0,F,B;
(F=E[D]);
D++){B=this.addCellDef(G,D,F);
C.push(B);
this.cells.push(B)
}return C
},addCellDef:function(F,C,E){var B=0;
if(E.colSpan>1){B=0
}else{if(!isNaN(E.width)){B=E.width+"em"
}else{B=E.width||this.defaultWidth
}}var D=E.field!=undefined?E.field:(E.get?-1:this.fieldIndex);
if((E.field!=undefined)||!E.get){this.fieldIndex=(E.field>-1?E.field:this.fieldIndex)+1
}return new dojox.grid.cell(A.mixin({},this._defaultCellProps,E,{grid:this.grid,subrow:F,layoutIndex:C,index:this.cells.length,fieldIndex:D,unitWidth:B}))
}})
}}});