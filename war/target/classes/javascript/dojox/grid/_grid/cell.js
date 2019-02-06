if(!dojo._hasResource["dojox.grid._grid.cell"]){dojo._hasResource["dojox.grid._grid.cell"]=true;
dojo.provide("dojox.grid._grid.cell");
dojo.declare("dojox.grid.cell",null,{styles:"",constructor:function(A){dojo.mixin(this,A);
if(this.editor){this.editor=new this.editor(this)
}},format:function(C){var A,D=this.grid.edit.info,B=this.get?this.get(C):this.value;
if(this.editor&&(this.editor.alwaysOn||(D.rowIndex==C&&D.cell==this))){return this.editor.format(B,C)
}else{return(A=this.formatter)?A.call(this,B,C):B
}},getNode:function(A){return this.view.getCellNode(A,this.index)
},isFlex:function(){var A=this.unitWidth;
return A&&(A=="auto"||A.slice(-1)=="%")
},applyEdit:function(B,A){this.grid.edit.applyCellEdit(B,this,A)
},cancelEdit:function(A){this.grid.doCancelEdit(A)
},_onEditBlur:function(A){if(this.grid.edit.isEditCell(A,this.index)){this.grid.edit.apply()
}},registerOnBlur:function(A,B){if(this.commitOnBlur){dojo.connect(A,"onblur",function(C){setTimeout(dojo.hitch(this,"_onEditBlur",B),250)
})
}}})
};