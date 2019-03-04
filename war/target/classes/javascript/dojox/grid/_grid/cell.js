if(!dojo._hasResource["dojox.grid._grid.cell"]){dojo._hasResource["dojox.grid._grid.cell"]=true;
dojo.provide("dojox.grid._grid.cell");
dojo.declare("dojox.grid.cell",null,{styles:"",constructor:function(A){dojo.mixin(this,A);
if(this.editor){this.editor=new this.editor(this)
}},format:function(D){var B,A=this.grid.edit.info,C=this.get?this.get(D):this.value;
if(this.editor&&(this.editor.alwaysOn||(A.rowIndex==D&&A.cell==this))){return this.editor.format(C,D)
}else{return(B=this.formatter)?B.call(this,C,D):C
}},getNode:function(A){return this.view.getCellNode(A,this.index)
},isFlex:function(){var A=this.unitWidth;
return A&&(A=="auto"||A.slice(-1)=="%")
},applyEdit:function(A,B){this.grid.edit.applyCellEdit(A,this,B)
},cancelEdit:function(A){this.grid.doCancelEdit(A)
},_onEditBlur:function(A){if(this.grid.edit.isEditCell(A,this.index)){this.grid.edit.apply()
}},registerOnBlur:function(B,A){if(this.commitOnBlur){dojo.connect(B,"onblur",function(C){setTimeout(dojo.hitch(this,"_onEditBlur",A),250)
})
}}})
};