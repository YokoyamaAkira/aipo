if(!dojo._hasResource["dojox.grid._grid.publicEvents"]){dojo._hasResource["dojox.grid._grid.publicEvents"]=true;
dojo.provide("dojox.grid._grid.publicEvents");
dojox.grid.publicEvents={cellOverClass:"dojoxGrid-cell-over",onKeyEvent:function(A){this.dispatchKeyEvent(A)
},onContentEvent:function(A){this.dispatchContentEvent(A)
},onHeaderEvent:function(A){this.dispatchHeaderEvent(A)
},onStyleRow:function(inRow){with(inRow){customClasses+=(odd?" dojoxGrid-row-odd":"")+(selected?" dojoxGrid-row-selected":"")+(over?" dojoxGrid-row-over":"")
}this.focus.styleRow(inRow);
this.edit.styleRow(inRow)
},onKeyDown:function(B){if(B.altKey||B.ctrlKey||B.metaKey){return 
}switch(B.keyCode){case dojo.keys.ESCAPE:this.edit.cancel();
break;
case dojo.keys.ENTER:if(!B.shiftKey){var A=this.edit.isEditing();
this.edit.apply();
if(!A){this.edit.setEditCell(this.focus.cell,this.focus.rowIndex)
}}break;
case dojo.keys.TAB:this.focus[B.shiftKey?"previousKey":"nextKey"](B);
break;
case dojo.keys.LEFT_ARROW:if(!this.edit.isEditing()){this.focus.move(0,-1)
}break;
case dojo.keys.RIGHT_ARROW:if(!this.edit.isEditing()){this.focus.move(0,1)
}break;
case dojo.keys.UP_ARROW:if(!this.edit.isEditing()){this.focus.move(-1,0)
}break;
case dojo.keys.DOWN_ARROW:if(!this.edit.isEditing()){this.focus.move(1,0)
}break
}},onMouseOver:function(A){A.rowIndex==-1?this.onHeaderCellMouseOver(A):this.onCellMouseOver(A)
},onMouseOut:function(A){A.rowIndex==-1?this.onHeaderCellMouseOut(A):this.onCellMouseOut(A)
},onMouseOverRow:function(A){if(!this.rows.isOver(A.rowIndex)){this.rows.setOverRow(A.rowIndex);
A.rowIndex==-1?this.onHeaderMouseOver(A):this.onRowMouseOver(A)
}},onMouseOutRow:function(A){if(this.rows.isOver(-1)){this.onHeaderMouseOut(A)
}else{if(!this.rows.isOver(-2)){this.rows.setOverRow(-2);
this.onRowMouseOut(A)
}}},onCellMouseOver:function(A){dojo.addClass(A.cellNode,this.cellOverClass)
},onCellMouseOut:function(A){dojo.removeClass(A.cellNode,this.cellOverClass)
},onCellClick:function(A){this.focus.setFocusCell(A.cell,A.rowIndex);
this.onRowClick(A)
},onCellDblClick:function(A){this.edit.setEditCell(A.cell,A.rowIndex);
this.onRowDblClick(A)
},onCellContextMenu:function(A){this.onRowContextMenu(A)
},onCellFocus:function(A,B){this.edit.cellFocus(A,B)
},onRowClick:function(A){this.edit.rowClick(A);
this.selection.clickSelectEvent(A)
},onRowDblClick:function(A){},onRowMouseOver:function(A){},onRowMouseOut:function(A){},onRowContextMenu:function(A){dojo.stopEvent(A)
},onHeaderMouseOver:function(A){},onHeaderMouseOut:function(A){},onHeaderCellMouseOver:function(A){dojo.addClass(A.cellNode,this.cellOverClass)
},onHeaderCellMouseOut:function(A){dojo.removeClass(A.cellNode,this.cellOverClass)
},onHeaderClick:function(A){},onHeaderCellClick:function(A){this.setSortIndex(A.cell.index);
this.onHeaderClick(A)
},onHeaderDblClick:function(A){},onHeaderCellDblClick:function(A){this.onHeaderDblClick(A)
},onHeaderCellContextMenu:function(A){this.onHeaderContextMenu(A)
},onHeaderContextMenu:function(A){dojo.stopEvent(A)
},onStartEdit:function(A,B){},onApplyCellEdit:function(A,C,B){},onCancelEdit:function(A){},onApplyEdit:function(A){},onCanSelect:function(A){return true
},onCanDeselect:function(A){return true
},onSelected:function(A){this.updateRowStyles(A)
},onDeselected:function(A){this.updateRowStyles(A)
},onSelectionChanged:function(){}}
};