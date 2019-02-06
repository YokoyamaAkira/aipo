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
},getFirstSelected:function(){for(var B=0,C=this.selected.length;
B<C;
B++){if(this.selected[B]){return B
}}return -1
},getNextSelected:function(B){for(var D=B+1,C=this.selected.length;
D<C;
D++){if(this.selected[D]){return D
}}return -1
},getSelected:function(){var C=[];
for(var B=0,D=this.selected.length;
B<D;
B++){if(this.selected[B]){C.push(B)
}}return C
},getSelectedCount:function(){var B=0;
for(var C=0;
C<this.selected.length;
C++){if(this.selected[C]){B++
}}return B
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
}},setSelected:function(B,C){this[(C?"addToSelection":"deselect")](B)
},toggleSelect:function(B){this.setSelected(B,!this.selected[B])
},insert:function(B){this.selected.splice(B,0,false);
if(this.selectedIndex>=B){this.selectedIndex++
}},remove:function(B){this.selected.splice(B,1);
if(this.selectedIndex>=B){this.selectedIndex--
}},unselectAll:function(B){for(var C in this.selected){if((C!=B)&&(this.selected[C]===true)){this.deselect(C)
}}},shiftSelect:function(C,F){var E=(C>=0?C:F),B=F;
if(E>B){B=E;
E=F
}for(var D=E;
D<=B;
D++){this.addToSelection(D)
}},clickSelect:function(B,C,D){this.beginUpdate();
if(!this.multiSelect){this.select(B)
}else{var E=this.selectedIndex;
if(!C){this.unselectAll(B)
}if(D){this.shiftSelect(E,B)
}else{if(C){this.toggleSelect(B)
}else{this.addToSelection(B)
}}}this.endUpdate()
},clickSelectEvent:function(B){this.clickSelect(B.rowIndex,B.ctrlKey,B.shiftKey)
},clear:function(){this.beginUpdate();
this.unselectAll();
this.endUpdate()
}})
}}});