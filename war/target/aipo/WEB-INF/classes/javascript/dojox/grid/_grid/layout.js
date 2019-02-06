if(!dojo._hasResource["dojox.grid._grid.layout"]){dojo._hasResource["dojox.grid._grid.layout"]=true;
dojo.provide("dojox.grid._grid.layout");
dojo.require("dojox.grid._grid.cell");
dojo.declare("dojox.grid.layout",null,{constructor:function(A){this.grid=A
},cells:null,structure:null,defaultWidth:"6em",setStructure:function(E){this.fieldIndex=0;
this.cells=[];
var B=this.structure=[];
for(var A=0,D,C;
(D=E[A]);
A++){B.push(this.addViewDef(D))
}this.cellCount=this.cells.length
},addViewDef:function(A){this._defaultCellProps=A.defaultCell||{};
return dojo.mixin({},A,{rows:this.addRowsDef(A.rows||A.cells)})
},addRowsDef:function(B){var D=[];
for(var A=0,C;
B&&(C=B[A]);
A++){D.push(this.addRowDef(A,C))
}return D
},addRowDef:function(E,C){var A=[];
for(var B=0,D,F;
(D=C[B]);
B++){F=this.addCellDef(E,B,D);
A.push(F);
this.cells.push(F)
}return A
},addCellDef:function(D,A,C){var E=0;
if(C.colSpan>1){E=0
}else{if(!isNaN(C.width)){E=C.width+"em"
}else{E=C.width||this.defaultWidth
}}var B=C.field!=undefined?C.field:(C.get?-1:this.fieldIndex);
if((C.field!=undefined)||!C.get){this.fieldIndex=(C.field>-1?C.field:this.fieldIndex)+1
}return new dojox.grid.cell(dojo.mixin({},this._defaultCellProps,C,{grid:this.grid,subrow:D,layoutIndex:A,index:this.cells.length,fieldIndex:B,unitWidth:E}))
}})
};