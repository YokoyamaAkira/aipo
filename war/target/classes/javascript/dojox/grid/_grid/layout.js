if(!dojo._hasResource["dojox.grid._grid.layout"]){dojo._hasResource["dojox.grid._grid.layout"]=true;
dojo.provide("dojox.grid._grid.layout");
dojo.require("dojox.grid._grid.cell");
dojo.declare("dojox.grid.layout",null,{constructor:function(A){this.grid=A
},cells:null,structure:null,defaultWidth:"6em",setStructure:function(A){this.fieldIndex=0;
this.cells=[];
var C=this.structure=[];
for(var B=0,E,D;
(E=A[B]);
B++){C.push(this.addViewDef(E))
}this.cellCount=this.cells.length
},addViewDef:function(A){this._defaultCellProps=A.defaultCell||{};
return dojo.mixin({},A,{rows:this.addRowsDef(A.rows||A.cells)})
},addRowsDef:function(C){var A=[];
for(var B=0,D;
C&&(D=C[B]);
B++){A.push(this.addRowDef(B,D))
}return A
},addRowDef:function(F,D){var B=[];
for(var C=0,E,A;
(E=D[C]);
C++){A=this.addCellDef(F,C,E);
B.push(A);
this.cells.push(A)
}return B
},addCellDef:function(E,B,D){var A=0;
if(D.colSpan>1){A=0
}else{if(!isNaN(D.width)){A=D.width+"em"
}else{A=D.width||this.defaultWidth
}}var C=D.field!=undefined?D.field:(D.get?-1:this.fieldIndex);
if((D.field!=undefined)||!D.get){this.fieldIndex=(D.field>-1?D.field:this.fieldIndex)+1
}return new dojox.grid.cell(dojo.mixin({},this._defaultCellProps,D,{grid:this.grid,subrow:E,layoutIndex:B,index:this.cells.length,fieldIndex:C,unitWidth:A}))
}})
};