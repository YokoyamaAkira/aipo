if(!dojo._hasResource["dojox.grid._grid.view"]){dojo._hasResource["dojox.grid._grid.view"]=true;
dojo.provide("dojox.grid._grid.view");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojox.grid._grid.builder");
dojo.declare("dojox.GridView",[dijit._Widget,dijit._Templated],{defaultWidth:"18em",viewWidth:"",templateString:'<div class="dojoxGrid-view"><div class="dojoxGrid-header" dojoAttachPoint="headerNode"><div style="width: 9000em"><div dojoAttachPoint="headerContentNode"></div></div></div><input type="checkbox" class="dojoxGrid-hidden-focus" dojoAttachPoint="hiddenFocusNode" /><input type="checkbox" class="dojoxGrid-hidden-focus" /><div class="dojoxGrid-scrollbox" dojoAttachPoint="scrollboxNode"><div class="dojoxGrid-content" dojoAttachPoint="contentNode" hidefocus="hidefocus"></div></div></div>',themeable:false,classTag:"dojoxGrid",marginBottom:0,rowPad:2,postMixInProperties:function(){this.rowNodes=[]
},postCreate:function(){dojo.connect(this.scrollboxNode,"onscroll",dojo.hitch(this,"doscroll"));
dojox.grid.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu"]);
dojox.grid.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);
this.content=new dojox.grid.contentBuilder(this);
this.header=new dojox.grid.headerBuilder(this)
},destroy:function(){dojox.grid.removeNode(this.headerNode);
this.inherited("destroy",arguments)
},focus:function(){if(dojo.isSafari||dojo.isOpera){this.hiddenFocusNode.focus()
}else{this.scrollboxNode.focus()
}},setStructure:function(A){var B=this.structure=A;
if(B.width&&dojo.isNumber(B.width)){this.viewWidth=B.width+"em"
}else{this.viewWidth=B.width||this.viewWidth
}this.onBeforeRow=B.onBeforeRow;
this.noscroll=B.noscroll;
if(this.noscroll){this.scrollboxNode.style.overflow="hidden"
}this.testFlexCells();
this.updateStructure()
},testFlexCells:function(){this.flexCells=false;
for(var B=0,D;
(D=this.structure.rows[B]);
B++){for(var C=0,A;
(A=D[C]);
C++){A.view=this;
this.flexCells=this.flexCells||A.isFlex()
}}return this.flexCells
},updateStructure:function(){this.header.update();
this.content.update()
},getScrollbarWidth:function(){return(this.noscroll?0:dojox.grid.getScrollbarWidth())
},getColumnsWidth:function(){return this.headerContentNode.firstChild.offsetWidth
},getWidth:function(){return this.viewWidth||(this.getColumnsWidth()+this.getScrollbarWidth())+"px"
},getContentWidth:function(){return Math.max(0,dojo._getContentBox(this.domNode).w-this.getScrollbarWidth())+"px"
},render:function(){this.scrollboxNode.style.height="";
this.renderHeader()
},renderHeader:function(){this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent)
},_getHeaderContent:function(A){var B=A.name||A.grid.getCellName(A);
if(A.index!=A.grid.getSortIndex()){return B
}return['<div class="',A.grid.sortInfo>0?"dojoxGrid-sort-down":"dojoxGrid-sort-up",'">',B,"</div>"].join("")
},resize:function(){this.resizeHeight();
this.resizeWidth()
},hasScrollbar:function(){return(this.scrollboxNode.clientHeight!=this.scrollboxNode.offsetHeight)
},resizeHeight:function(){if(!this.grid.autoHeight){var A=this.domNode.clientHeight;
if(!this.hasScrollbar()){A-=dojox.grid.getScrollbarWidth()
}dojox.grid.setStyleHeightPx(this.scrollboxNode,A)
}},resizeWidth:function(){if(this.flexCells){this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth
}var w=this.scrollboxNode.offsetWidth-this.getScrollbarWidth();
w=Math.max(w,this.getColumnsWidth())+"px";
with(this.contentNode){style.width="";
offsetWidth;
style.width=w
}},setSize:function(w,h){with(this.domNode.style){if(w){width=w
}height=(h>=0?h+"px":"")
}with(this.headerNode.style){if(w){width=w
}}},renderRow:function(C,A){var B=this.createRowNode(C);
this.buildRow(C,B,A);
this.grid.edit.restore(this,C);
return B
},createRowNode:function(B){var A=document.createElement("div");
A.className=this.classTag+"-row";
A[dojox.grid.rowIndexTag]=B;
this.rowNodes[B]=A;
return A
},buildRow:function(B,A){this.buildRowContent(B,A);
this.styleRow(B,A)
},buildRowContent:function(B,A){A.innerHTML=this.content.generateHtml(B,B);
if(this.flexCells){A.firstChild.style.width=this.contentWidth
}},rowRemoved:function(A){this.grid.edit.save(this,A);
delete this.rowNodes[A]
},getRowNode:function(A){return this.rowNodes[A]
},getCellNode:function(C,A){var B=this.getRowNode(C);
if(B){return this.content.getCellNode(B,A)
}},styleRow:function(B,A){A._style=dojox.grid.getStyleText(A);
this.styleRowNode(B,A)
},styleRowNode:function(B,A){if(A){this.doStyleRowNode(B,A)
}},doStyleRowNode:function(B,A){this.grid.styleRowNode(B,A)
},updateRow:function(D,A,B){var C=this.getRowNode(D);
if(C){C.style.height="";
this.buildRow(D,C)
}return C
},updateRowStyles:function(A){this.styleRowNode(A,this.getRowNode(A))
},lastTop:0,doscroll:function(A){this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var B=this.scrollboxNode.scrollTop;
if(B!=this.lastTop){this.grid.scrollTo(B)
}},setScrollTop:function(A){this.lastTop=A;
this.scrollboxNode.scrollTop=A;
return this.scrollboxNode.scrollTop
},doContentEvent:function(A){if(this.content.decorateEvent(A)){this.grid.onContentEvent(A)
}},doHeaderEvent:function(A){if(this.header.decorateEvent(A)){this.grid.onHeaderEvent(A)
}},dispatchContentEvent:function(A){return this.content.dispatchEvent(A)
},dispatchHeaderEvent:function(A){return this.header.dispatchEvent(A)
},setColWidth:function(B,A){this.grid.setCellWidth(B,A+"px")
},update:function(){var A=this.scrollboxNode.scrollLeft;
this.content.update();
this.grid.update();
this.scrollboxNode.scrollLeft=A
}})
};