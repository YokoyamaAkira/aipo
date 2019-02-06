dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.rows"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.grid._grid.rows"]){dojo._hasResource["dojox.grid._grid.rows"]=true;
dojo.provide("dojox.grid._grid.rows");
dojo.declare("dojox.grid.rows",null,{constructor:function(inGrid){this.grid=inGrid
},linesToEms:2,defaultRowHeight:1,overRow:-2,getHeight:function(inRowIndex){return""
},getDefaultHeightPx:function(){return 32
},prepareStylingRow:function(inRowIndex,inRowNode){return{index:inRowIndex,node:inRowNode,odd:Boolean(inRowIndex&1),selected:this.grid.selection.isSelected(inRowIndex),over:this.isOver(inRowIndex),customStyles:"",customClasses:"dojoxGrid-row"}
},styleRowNode:function(inRowIndex,inRowNode){var row=this.prepareStylingRow(inRowIndex,inRowNode);
this.grid.onStyleRow(row);
this.applyStyles(row)
},applyStyles:function(inRow){with(inRow){node.className=customClasses;
var h=node.style.height;
dojox.grid.setStyleText(node,customStyles+";"+(node._style||""));
node.style.height=h
}},updateStyles:function(inRowIndex){this.grid.updateRowStyles(inRowIndex)
},setOverRow:function(inRowIndex){var last=this.overRow;
this.overRow=inRowIndex;
if((last!=this.overRow)&&(last>=0)){this.updateStyles(last)
}this.updateStyles(this.overRow)
},isOver:function(inRowIndex){return(this.overRow==inRowIndex)
}})
}}});