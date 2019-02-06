dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.rowbar"],["require","dojox.grid._grid.view"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.rowbar"]){A._hasResource["dojox.grid._grid.rowbar"]=true;
A.provide("dojox.grid._grid.rowbar");
A.require("dojox.grid._grid.view");
A.declare("dojox.GridRowView",dojox.GridView,{defaultWidth:"3em",noscroll:true,padBorderWidth:2,buildRendering:function(){this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden"
},getWidth:function(){return this.viewWidth||this.defaultWidth
},buildRowContent:function(B,D){var C=this.contentNode.offsetWidth-this.padBorderWidth;
D.innerHTML='<table style="width:'+C+'px;" role="wairole:presentation"><tr><td class="dojoxGrid-rowbar-inner"></td></tr></table>'
},renderHeader:function(){},resize:function(){this.resizeHeight()
},doStyleRowNode:function(D,C){var B=["dojoxGrid-rowbar"];
if(this.grid.rows.isOver(D)){B.push("dojoxGrid-rowbar-over")
}if(this.grid.selection.isSelected(D)){B.push("dojoxGrid-rowbar-selected")
}C.className=B.join(" ")
},domouseover:function(B){this.grid.onMouseOverRow(B)
},domouseout:function(B){if(!this.isIntraRowEvent(B)){this.grid.onMouseOutRow(B)
}}})
}}});