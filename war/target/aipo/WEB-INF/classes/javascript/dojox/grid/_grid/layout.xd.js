dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.layout"],["require","dojox.grid._grid.cell"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.layout"]){A._hasResource["dojox.grid._grid.layout"]=true;
A.provide("dojox.grid._grid.layout");
A.require("dojox.grid._grid.cell");
A.declare("dojox.grid.layout",null,{constructor:function(B){this.grid=B
},cells:null,structure:null,defaultWidth:"6em",setStructure:function(C){this.fieldIndex=0;
this.cells=[];
var E=this.structure=[];
for(var D=0,B,F;
(B=C[D]);
D++){E.push(this.addViewDef(B))
}this.cellCount=this.cells.length
},addViewDef:function(B){this._defaultCellProps=B.defaultCell||{};
return A.mixin({},B,{rows:this.addRowsDef(B.rows||B.cells)})
},addRowsDef:function(E){var C=[];
for(var D=0,B;
E&&(B=E[D]);
D++){C.push(this.addRowDef(D,B))
}return C
},addRowDef:function(C,F){var D=[];
for(var E=0,G,B;
(G=F[E]);
E++){B=this.addCellDef(C,E,G);
D.push(B);
this.cells.push(B)
}return D
},addCellDef:function(B,D,F){var C=0;
if(F.colSpan>1){C=0
}else{if(!isNaN(F.width)){C=F.width+"em"
}else{C=F.width||this.defaultWidth
}}var E=F.field!=undefined?F.field:(F.get?-1:this.fieldIndex);
if((F.field!=undefined)||!F.get){this.fieldIndex=(F.field>-1?F.field:this.fieldIndex)+1
}return new dojox.grid.cell(A.mixin({},this._defaultCellProps,F,{grid:this.grid,subrow:B,layoutIndex:D,index:this.cells.length,fieldIndex:E,unitWidth:C}))
}})
}}});