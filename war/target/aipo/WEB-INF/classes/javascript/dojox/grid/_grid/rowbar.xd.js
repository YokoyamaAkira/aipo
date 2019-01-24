dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.rowbar"],["require","dojox.grid._grid.view"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.rowbar"]){A._hasResource["dojox.grid._grid.rowbar"]=true;
A.provide("dojox.grid._grid.rowbar");
A.require("dojox.grid._grid.view");
A.declare("dojox.GridRowView",dojox.GridView,{defaultWidth:"3em",noscroll:true,padBorderWidth:2,buildRendering:function(){this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden"
},getWidth:function(){return this.viewWidth||this.defaultWidth
},buildRowContent:function(D,C){var B=this.contentNode.offsetWidth-this.padBorderWidth;
C.innerHTML='<table style="width:'+B+'px;" role="wairole:presentation"><tr><td class="dojoxGrid-rowbar-inner"></td></tr></table>'
},renderHeader:function(){},resize:function(){this.resizeHeight()
},doStyleRowNode:function(C,B){var D=["dojoxGrid-rowbar"];
if(this.grid.rows.isOver(C)){D.push("dojoxGrid-rowbar-over")
}if(this.grid.selection.isSelected(C)){D.push("dojoxGrid-rowbar-selected")
}B.className=D.join(" ")
},domouseover:function(B){this.grid.onMouseOverRow(B)
},domouseout:function(B){if(!this.isIntraRowEvent(B)){this.grid.onMouseOutRow(B)
}}})
}}});