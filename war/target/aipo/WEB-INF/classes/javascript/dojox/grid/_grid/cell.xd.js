dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.cell"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.cell"]){A._hasResource["dojox.grid._grid.cell"]=true;
A.provide("dojox.grid._grid.cell");
A.declare("dojox.grid.cell",null,{styles:"",constructor:function(B){A.mixin(this,B);
if(this.editor){this.editor=new this.editor(this)
}},format:function(B){var D,C=this.grid.edit.info,E=this.get?this.get(B):this.value;
if(this.editor&&(this.editor.alwaysOn||(C.rowIndex==B&&C.cell==this))){return this.editor.format(E,B)
}else{return(D=this.formatter)?D.call(this,E,B):E
}},getNode:function(B){return this.view.getCellNode(B,this.index)
},isFlex:function(){var B=this.unitWidth;
return B&&(B=="auto"||B.slice(-1)=="%")
},applyEdit:function(C,B){this.grid.edit.applyCellEdit(C,this,B)
},cancelEdit:function(B){this.grid.doCancelEdit(B)
},_onEditBlur:function(B){if(this.grid.edit.isEditCell(B,this.index)){this.grid.edit.apply()
}},registerOnBlur:function(B,C){if(this.commitOnBlur){A.connect(B,"onblur",function(D){setTimeout(A.hitch(this,"_onEditBlur",C),250)
})
}}})
}}});