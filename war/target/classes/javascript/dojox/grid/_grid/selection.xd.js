dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.selection"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.selection"]){A._hasResource["dojox.grid._grid.selection"]=true;
A.provide("dojox.grid._grid.selection");
A.declare("dojox.grid.selection",null,{constructor:function(B){this.grid=B;
this.selected=[]
},multiSelect:true,selected:null,updating:0,selectedIndex:-1,onCanSelect:function(B){return this.grid.onCanSelect(B)
},onCanDeselect:function(B){return this.grid.onCanDeselect(B)
},onSelected:function(B){return this.grid.onSelected(B)
},onDeselected:function(B){return this.grid.onDeselected(B)
},onChanging:function(){},onChanged:function(){return this.grid.onSelectionChanged()
},isSelected:function(B){return this.selected[B]
},getFirstSelected:function(){for(var C=0,B=this.selected.length;
C<B;
C++){if(this.selected[C]){return C
}}return -1
},getNextSelected:function(D){for(var C=D+1,B=this.selected.length;
C<B;
C++){if(this.selected[C]){return C
}}return -1
},getSelected:function(){var B=[];
for(var D=0,C=this.selected.length;
D<C;
D++){if(this.selected[D]){B.push(D)
}}return B
},getSelectedCount:function(){var C=0;
for(var B=0;
B<this.selected.length;
B++){if(this.selected[B]){C++
}}return C
},beginUpdate:function(){if(this.updating==0){this.onChanging()
}this.updating++
},endUpdate:function(){this.updating--;
if(this.updating==0){this.onChanged()
}},select:function(B){this.unselectAll(B);
this.addToSelection(B)
},addToSelection:function(B){B=Number(B);
if(this.selected[B]){this.selectedIndex=B
}else{if(this.onCanSelect(B)!==false){this.selectedIndex=B;
this.beginUpdate();
this.selected[B]=true;
this.grid.onSelected(B);
this.endUpdate()
}}},deselect:function(B){B=Number(B);
if(this.selectedIndex==B){this.selectedIndex=-1
}if(this.selected[B]){if(this.onCanDeselect(B)===false){return 
}this.beginUpdate();
delete this.selected[B];
this.grid.onDeselected(B);
this.endUpdate()
}},setSelected:function(C,B){this[(B?"addToSelection":"deselect")](C)
},toggleSelect:function(B){this.setSelected(B,!this.selected[B])
},insert:function(B){this.selected.splice(B,0,false);
if(this.selectedIndex>=B){this.selectedIndex++
}},remove:function(B){this.selected.splice(B,1);
if(this.selectedIndex>=B){this.selectedIndex--
}},unselectAll:function(C){for(var B in this.selected){if((B!=C)&&(this.selected[B]===true)){this.deselect(B)
}}},shiftSelect:function(B,E){var D=(B>=0?B:E),F=E;
if(D>F){F=D;
D=E
}for(var C=D;
C<=F;
C++){this.addToSelection(C)
}},clickSelect:function(E,B,C){this.beginUpdate();
if(!this.multiSelect){this.select(E)
}else{var D=this.selectedIndex;
if(!B){this.unselectAll(E)
}if(C){this.shiftSelect(D,E)
}else{if(B){this.toggleSelect(E)
}else{this.addToSelection(E)
}}}this.endUpdate()
},clickSelectEvent:function(B){this.clickSelect(B.rowIndex,B.ctrlKey,B.shiftKey)
},clear:function(){this.beginUpdate();
this.unselectAll();
this.endUpdate()
}})
}}});