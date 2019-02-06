dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.publicEvents"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.grid._grid.publicEvents"]){dojo._hasResource["dojox.grid._grid.publicEvents"]=true;
dojo.provide("dojox.grid._grid.publicEvents");
dojox.grid.publicEvents={cellOverClass:"dojoxGrid-cell-over",onKeyEvent:function(e){this.dispatchKeyEvent(e)
},onContentEvent:function(e){this.dispatchContentEvent(e)
},onHeaderEvent:function(e){this.dispatchHeaderEvent(e)
},onStyleRow:function(inRow){with(inRow){customClasses+=(odd?" dojoxGrid-row-odd":"")+(selected?" dojoxGrid-row-selected":"")+(over?" dojoxGrid-row-over":"")
}this.focus.styleRow(inRow);
this.edit.styleRow(inRow)
},onKeyDown:function(e){if(e.altKey||e.ctrlKey||e.metaKey){return 
}switch(e.keyCode){case dojo.keys.ESCAPE:this.edit.cancel();
break;
case dojo.keys.ENTER:if(!e.shiftKey){var isEditing=this.edit.isEditing();
this.edit.apply();
if(!isEditing){this.edit.setEditCell(this.focus.cell,this.focus.rowIndex)
}}break;
case dojo.keys.TAB:this.focus[e.shiftKey?"previousKey":"nextKey"](e);
break;
case dojo.keys.LEFT_ARROW:if(!this.edit.isEditing()){this.focus.move(0,-1)
}break;
case dojo.keys.RIGHT_ARROW:if(!this.edit.isEditing()){this.focus.move(0,1)
}break;
case dojo.keys.UP_ARROW:if(!this.edit.isEditing()){this.focus.move(-1,0)
}break;
case dojo.keys.DOWN_ARROW:if(!this.edit.isEditing()){this.focus.move(1,0)
}break
}},onMouseOver:function(e){e.rowIndex==-1?this.onHeaderCellMouseOver(e):this.onCellMouseOver(e)
},onMouseOut:function(e){e.rowIndex==-1?this.onHeaderCellMouseOut(e):this.onCellMouseOut(e)
},onMouseOverRow:function(e){if(!this.rows.isOver(e.rowIndex)){this.rows.setOverRow(e.rowIndex);
e.rowIndex==-1?this.onHeaderMouseOver(e):this.onRowMouseOver(e)
}},onMouseOutRow:function(e){if(this.rows.isOver(-1)){this.onHeaderMouseOut(e)
}else{if(!this.rows.isOver(-2)){this.rows.setOverRow(-2);
this.onRowMouseOut(e)
}}},onCellMouseOver:function(e){dojo.addClass(e.cellNode,this.cellOverClass)
},onCellMouseOut:function(e){dojo.removeClass(e.cellNode,this.cellOverClass)
},onCellClick:function(e){this.focus.setFocusCell(e.cell,e.rowIndex);
this.onRowClick(e)
},onCellDblClick:function(e){this.edit.setEditCell(e.cell,e.rowIndex);
this.onRowDblClick(e)
},onCellContextMenu:function(e){this.onRowContextMenu(e)
},onCellFocus:function(inCell,inRowIndex){this.edit.cellFocus(inCell,inRowIndex)
},onRowClick:function(e){this.edit.rowClick(e);
this.selection.clickSelectEvent(e)
},onRowDblClick:function(e){},onRowMouseOver:function(e){},onRowMouseOut:function(e){},onRowContextMenu:function(e){dojo.stopEvent(e)
},onHeaderMouseOver:function(e){},onHeaderMouseOut:function(e){},onHeaderCellMouseOver:function(e){dojo.addClass(e.cellNode,this.cellOverClass)
},onHeaderCellMouseOut:function(e){dojo.removeClass(e.cellNode,this.cellOverClass)
},onHeaderClick:function(e){},onHeaderCellClick:function(e){this.setSortIndex(e.cell.index);
this.onHeaderClick(e)
},onHeaderDblClick:function(e){},onHeaderCellDblClick:function(e){this.onHeaderDblClick(e)
},onHeaderCellContextMenu:function(e){this.onHeaderContextMenu(e)
},onHeaderContextMenu:function(e){dojo.stopEvent(e)
},onStartEdit:function(inCell,inRowIndex){},onApplyCellEdit:function(inValue,inRowIndex,inFieldIndex){},onCancelEdit:function(inRowIndex){},onApplyEdit:function(inRowIndex){},onCanSelect:function(inRowIndex){return true
},onCanDeselect:function(inRowIndex){return true
},onSelected:function(inRowIndex){this.updateRowStyles(inRowIndex)
},onDeselected:function(inRowIndex){this.updateRowStyles(inRowIndex)
},onSelectionChanged:function(){}}
}}});