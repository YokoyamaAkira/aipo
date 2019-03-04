if(!dojo._hasResource["dojox.grid._grid.rowbar"]){dojo._hasResource["dojox.grid._grid.rowbar"]=true;
dojo.provide("dojox.grid._grid.rowbar");
dojo.require("dojox.grid._grid.view");
dojo.declare("dojox.GridRowView",dojox.GridView,{defaultWidth:"3em",noscroll:true,padBorderWidth:2,buildRendering:function(){this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden"
},getWidth:function(){return this.viewWidth||this.defaultWidth
},buildRowContent:function(C,B){var A=this.contentNode.offsetWidth-this.padBorderWidth;
B.innerHTML='<table style="width:'+A+'px;" role="wairole:presentation"><tr><td class="dojoxGrid-rowbar-inner"></td></tr></table>'
},renderHeader:function(){},resize:function(){this.resizeHeight()
},doStyleRowNode:function(B,A){var C=["dojoxGrid-rowbar"];
if(this.grid.rows.isOver(B)){C.push("dojoxGrid-rowbar-over")
}if(this.grid.selection.isSelected(B)){C.push("dojoxGrid-rowbar-selected")
}A.className=C.join(" ")
},domouseover:function(A){this.grid.onMouseOverRow(A)
},domouseout:function(A){if(!this.isIntraRowEvent(A)){this.grid.onMouseOutRow(A)
}}})
};