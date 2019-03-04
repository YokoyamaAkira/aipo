if(!dojo._hasResource["dojox.grid._grid.rows"]){dojo._hasResource["dojox.grid._grid.rows"]=true;
dojo.provide("dojox.grid._grid.rows");
dojo.declare("dojox.grid.rows",null,{constructor:function(A){this.grid=A
},linesToEms:2,defaultRowHeight:1,overRow:-2,getHeight:function(A){return""
},getDefaultHeightPx:function(){return 32
},prepareStylingRow:function(B,A){return{index:B,node:A,odd:Boolean(B&1),selected:this.grid.selection.isSelected(B),over:this.isOver(B),customStyles:"",customClasses:"dojoxGrid-row"}
},styleRowNode:function(C,A){var B=this.prepareStylingRow(C,A);
this.grid.onStyleRow(B);
this.applyStyles(B)
},applyStyles:function(inRow){with(inRow){node.className=customClasses;
var h=node.style.height;
dojox.grid.setStyleText(node,customStyles+";"+(node._style||""));
node.style.height=h
}},updateStyles:function(A){this.grid.updateRowStyles(A)
},setOverRow:function(B){var A=this.overRow;
this.overRow=B;
if((A!=this.overRow)&&(A>=0)){this.updateStyles(A)
}this.updateStyles(this.overRow)
},isOver:function(A){return(this.overRow==A)
}})
};