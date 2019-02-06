if(!dojo._hasResource["dojox.grid._grid.selection"]){dojo._hasResource["dojox.grid._grid.selection"]=true;
dojo.provide("dojox.grid._grid.selection");
dojo.declare("dojox.grid.selection",null,{constructor:function(A){this.grid=A;
this.selected=[]
},multiSelect:true,selected:null,updating:0,selectedIndex:-1,onCanSelect:function(A){return this.grid.onCanSelect(A)
},onCanDeselect:function(A){return this.grid.onCanDeselect(A)
},onSelected:function(A){return this.grid.onSelected(A)
},onDeselected:function(A){return this.grid.onDeselected(A)
},onChanging:function(){},onChanged:function(){return this.grid.onSelectionChanged()
},isSelected:function(A){return this.selected[A]
},getFirstSelected:function(){for(var A=0,B=this.selected.length;
A<B;
A++){if(this.selected[A]){return A
}}return -1
},getNextSelected:function(B){for(var A=B+1,C=this.selected.length;
A<C;
A++){if(this.selected[A]){return A
}}return -1
},getSelected:function(){var C=[];
for(var B=0,A=this.selected.length;
B<A;
B++){if(this.selected[B]){C.push(B)
}}return C
},getSelectedCount:function(){var A=0;
for(var B=0;
B<this.selected.length;
B++){if(this.selected[B]){A++
}}return A
},beginUpdate:function(){if(this.updating==0){this.onChanging()
}this.updating++
},endUpdate:function(){this.updating--;
if(this.updating==0){this.onChanged()
}},select:function(A){this.unselectAll(A);
this.addToSelection(A)
},addToSelection:function(A){A=Number(A);
if(this.selected[A]){this.selectedIndex=A
}else{if(this.onCanSelect(A)!==false){this.selectedIndex=A;
this.beginUpdate();
this.selected[A]=true;
this.grid.onSelected(A);
this.endUpdate()
}}},deselect:function(A){A=Number(A);
if(this.selectedIndex==A){this.selectedIndex=-1
}if(this.selected[A]){if(this.onCanDeselect(A)===false){return 
}this.beginUpdate();
delete this.selected[A];
this.grid.onDeselected(A);
this.endUpdate()
}},setSelected:function(A,B){this[(B?"addToSelection":"deselect")](A)
},toggleSelect:function(A){this.setSelected(A,!this.selected[A])
},insert:function(A){this.selected.splice(A,0,false);
if(this.selectedIndex>=A){this.selectedIndex++
}},remove:function(A){this.selected.splice(A,1);
if(this.selectedIndex>=A){this.selectedIndex--
}},unselectAll:function(A){for(var B in this.selected){if((B!=A)&&(this.selected[B]===true)){this.deselect(B)
}}},shiftSelect:function(E,C){var B=(E>=0?E:C),D=C;
if(B>D){D=B;
B=C
}for(var A=B;
A<=D;
A++){this.addToSelection(A)
}},clickSelect:function(C,D,A){this.beginUpdate();
if(!this.multiSelect){this.select(C)
}else{var B=this.selectedIndex;
if(!D){this.unselectAll(C)
}if(A){this.shiftSelect(B,C)
}else{if(D){this.toggleSelect(C)
}else{this.addToSelection(C)
}}}this.endUpdate()
},clickSelectEvent:function(A){this.clickSelect(A.rowIndex,A.ctrlKey,A.shiftKey)
},clear:function(){this.beginUpdate();
this.unselectAll();
this.endUpdate()
}})
};