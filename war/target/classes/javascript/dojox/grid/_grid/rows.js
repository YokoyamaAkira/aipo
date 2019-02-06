if(!dojo._hasResource["dojox.grid._grid.rows"]){dojo._hasResource["dojox.grid._grid.rows"]=true;
dojo.provide("dojox.grid._grid.rows");
dojo.declare("dojox.grid.rows",null,{constructor:function(A){this.grid=A
},linesToEms:2,defaultRowHeight:1,overRow:-2,getHeight:function(A){return""
},getDefaultHeightPx:function(){return 32
},prepareStylingRow:function(A,B){return{index:A,node:B,odd:Boolean(A&1),selected:this.grid.selection.isSelected(A),over:this.isOver(A),customStyles:"",customClasses:"dojoxGrid-row"}
},styleRowNode:function(B,C){var A=this.prepareStylingRow(B,C);
this.grid.onStyleRow(A);
this.applyStyles(A)
},applyStyles:function(inRow){with(inRow){node.className=customClasses;
var h=node.style.height;
dojox.grid.setStyleText(node,customStyles+";"+(node._style||""));
node.style.height=h
}},updateStyles:function(A){this.grid.updateRowStyles(A)
},setOverRow:function(A){var B=this.overRow;
this.overRow=A;
if((B!=this.overRow)&&(B>=0)){this.updateStyles(B)
}this.updateStyles(this.overRow)
},isOver:function(A){return(this.overRow==A)
}})
};