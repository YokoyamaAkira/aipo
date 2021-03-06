if(!dojo._hasResource["dojox.grid._grid.focus"]){dojo._hasResource["dojox.grid._grid.focus"]=true;
dojo.provide("dojox.grid._grid.focus");
dojo.declare("dojox.grid.focus",null,{constructor:function(A){this.grid=A;
this.cell=null;
this.rowIndex=-1;
dojo.connect(this.grid.domNode,"onfocus",this,"doFocus")
},tabbingOut:false,focusClass:"dojoxGrid-cell-focus",focusView:null,initFocusView:function(){this.focusView=this.grid.views.getFirstScrollingView()
},isFocusCell:function(B,A){return(this.cell==B)&&(this.rowIndex==A)
},isLastFocusCell:function(){return(this.rowIndex==this.grid.rowCount-1)&&(this.cell.index==this.grid.layout.cellCount-1)
},isFirstFocusCell:function(){return(this.rowIndex==0)&&(this.cell.index==0)
},isNoFocusCell:function(){return(this.rowIndex<0)||!this.cell
},_focusifyCellNode:function(C){var B=this.cell&&this.cell.getNode(this.rowIndex);
if(B){dojo.toggleClass(B,this.focusClass,C);
this.scrollIntoView();
try{if(!this.grid.edit.isEditing()){dojox.grid.fire(B,"focus")
}}catch(A){}}},scrollIntoView:function(){if(!this.cell){return 
}var E=this.cell,B=E.view.scrollboxNode,A={w:B.clientWidth,l:B.scrollLeft,t:B.scrollTop,h:B.clientHeight},D=E.getNode(this.rowIndex),C=E.view.getRowNode(this.rowIndex),F=this.grid.scroller.findScrollTop(this.rowIndex);
if(D.offsetLeft+D.offsetWidth>A.l+A.w){B.scrollLeft=D.offsetLeft+D.offsetWidth-A.w
}else{if(D.offsetLeft<A.l){B.scrollLeft=D.offsetLeft
}}if(F+C.offsetHeight>A.t+A.h){this.grid.setScrollTop(F+C.offsetHeight-A.h)
}else{if(F<A.t){this.grid.setScrollTop(F)
}}},styleRow:function(A){if(A.index==this.rowIndex){this._focusifyCellNode(true)
}},setFocusIndex:function(A,B){this.setFocusCell(this.grid.getCell(B),A)
},setFocusCell:function(B,A){if(B&&!this.isFocusCell(B,A)){this.tabbingOut=false;
this.focusGrid();
this._focusifyCellNode(false);
this.cell=B;
this.rowIndex=A;
this._focusifyCellNode(true)
}if(dojo.isOpera){setTimeout(dojo.hitch(this.grid,"onCellFocus",this.cell,this.rowIndex),1)
}else{this.grid.onCellFocus(this.cell,this.rowIndex)
}},next:function(){var B=this.rowIndex,D=this.cell.index+1,C=this.grid.layout.cellCount-1,A=this.grid.rowCount-1;
if(D>C){D=0;
B++
}if(B>A){D=C;
B=A
}this.setFocusIndex(B,D)
},previous:function(){var A=(this.rowIndex||0),B=(this.cell.index||0)-1;
if(B<0){B=this.grid.layout.cellCount-1;
A--
}if(A<0){A=0;
B=0
}this.setFocusIndex(A,B)
},move:function(G,D){var A=this.grid.rowCount-1,C=this.grid.layout.cellCount-1,H=this.rowIndex,F=this.cell.index,B=Math.min(A,Math.max(0,H+G)),E=Math.min(C,Math.max(0,F+D));
this.setFocusIndex(B,E);
if(G){this.grid.updateRow(H)
}},previousKey:function(A){if(this.isFirstFocusCell()){this.tabOut(this.grid.domNode)
}else{dojo.stopEvent(A);
this.previous()
}},nextKey:function(A){if(this.isLastFocusCell()){this.tabOut(this.grid.lastFocusNode)
}else{dojo.stopEvent(A);
this.next()
}},tabOut:function(A){this.tabbingOut=true;
A.focus()
},focusGrid:function(){dojox.grid.fire(this.focusView,"focus");
this._focusifyCellNode(true)
},doFocus:function(A){if(A&&A.target!=A.currentTarget){return 
}if(!this.tabbingOut&&this.isNoFocusCell()){this.setFocusIndex(0,0)
}this.tabbingOut=false
}})
};