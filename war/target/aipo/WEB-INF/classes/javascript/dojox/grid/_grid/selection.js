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
},getFirstSelected:function(){for(var B=0,A=this.selected.length;
B<A;
B++){if(this.selected[B]){return B
}}return -1
},getNextSelected:function(C){for(var B=C+1,A=this.selected.length;
B<A;
B++){if(this.selected[B]){return B
}}return -1
},getSelected:function(){var A=[];
for(var C=0,B=this.selected.length;
C<B;
C++){if(this.selected[C]){A.push(C)
}}return A
},getSelectedCount:function(){var B=0;
for(var A=0;
A<this.selected.length;
A++){if(this.selected[A]){B++
}}return B
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
}},setSelected:function(B,A){this[(A?"addToSelection":"deselect")](B)
},toggleSelect:function(A){this.setSelected(A,!this.selected[A])
},insert:function(A){this.selected.splice(A,0,false);
if(this.selectedIndex>=A){this.selectedIndex++
}},remove:function(A){this.selected.splice(A,1);
if(this.selectedIndex>=A){this.selectedIndex--
}},unselectAll:function(B){for(var A in this.selected){if((A!=B)&&(this.selected[A]===true)){this.deselect(A)
}}},shiftSelect:function(A,D){var C=(A>=0?A:D),E=D;
if(C>E){E=C;
C=D
}for(var B=C;
B<=E;
B++){this.addToSelection(B)
}},clickSelect:function(D,A,B){this.beginUpdate();
if(!this.multiSelect){this.select(D)
}else{var C=this.selectedIndex;
if(!A){this.unselectAll(D)
}if(B){this.shiftSelect(C,D)
}else{if(A){this.toggleSelect(D)
}else{this.addToSelection(D)
}}}this.endUpdate()
},clickSelectEvent:function(A){this.clickSelect(A.rowIndex,A.ctrlKey,A.shiftKey)
},clear:function(){this.beginUpdate();
this.unselectAll();
this.endUpdate()
}})
};