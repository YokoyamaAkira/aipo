dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.cell"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.cell"]){A._hasResource["dojox.grid._grid.cell"]=true;
A.provide("dojox.grid._grid.cell");
A.declare("dojox.grid.cell",null,{styles:"",constructor:function(B){A.mixin(this,B);
if(this.editor){this.editor=new this.editor(this)
}},format:function(E){var C,B=this.grid.edit.info,D=this.get?this.get(E):this.value;
if(this.editor&&(this.editor.alwaysOn||(B.rowIndex==E&&B.cell==this))){return this.editor.format(D,E)
}else{return(C=this.formatter)?C.call(this,D,E):D
}},getNode:function(B){return this.view.getCellNode(B,this.index)
},isFlex:function(){var B=this.unitWidth;
return B&&(B=="auto"||B.slice(-1)=="%")
},applyEdit:function(B,C){this.grid.edit.applyCellEdit(B,this,C)
},cancelEdit:function(B){this.grid.doCancelEdit(B)
},_onEditBlur:function(B){if(this.grid.edit.isEditCell(B,this.index)){this.grid.edit.apply()
}},registerOnBlur:function(C,B){if(this.commitOnBlur){A.connect(C,"onblur",function(D){setTimeout(A.hitch(this,"_onEditBlur",B),250)
})
}}})
}}});