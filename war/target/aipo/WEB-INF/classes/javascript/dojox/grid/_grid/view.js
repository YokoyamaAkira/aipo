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
}},setStructure:function(B){var A=this.structure=B;
if(A.width&&dojo.isNumber(A.width)){this.viewWidth=A.width+"em"
}else{this.viewWidth=A.width||this.viewWidth
}this.onBeforeRow=A.onBeforeRow;
this.noscroll=A.noscroll;
if(this.noscroll){this.scrollboxNode.style.overflow="hidden"
}this.testFlexCells();
this.updateStructure()
},testFlexCells:function(){this.flexCells=false;
for(var A=0,C;
(C=this.structure.rows[A]);
A++){for(var B=0,D;
(D=C[B]);
B++){D.view=this;
this.flexCells=this.flexCells||D.isFlex()
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
},_getHeaderContent:function(B){var A=B.name||B.grid.getCellName(B);
if(B.index!=B.grid.getSortIndex()){return A
}return['<div class="',B.grid.sortInfo>0?"dojoxGrid-sort-down":"dojoxGrid-sort-up",'">',A,"</div>"].join("")
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
}}},renderRow:function(B,C){var A=this.createRowNode(B);
this.buildRow(B,A,C);
this.grid.edit.restore(this,B);
return A
},createRowNode:function(A){var B=document.createElement("div");
B.className=this.classTag+"-row";
B[dojox.grid.rowIndexTag]=A;
this.rowNodes[A]=B;
return B
},buildRow:function(A,B){this.buildRowContent(A,B);
this.styleRow(A,B)
},buildRowContent:function(A,B){B.innerHTML=this.content.generateHtml(A,A);
if(this.flexCells){B.firstChild.style.width=this.contentWidth
}},rowRemoved:function(A){this.grid.edit.save(this,A);
delete this.rowNodes[A]
},getRowNode:function(A){return this.rowNodes[A]
},getCellNode:function(B,C){var A=this.getRowNode(B);
if(A){return this.content.getCellNode(A,C)
}},styleRow:function(A,B){B._style=dojox.grid.getStyleText(B);
this.styleRowNode(A,B)
},styleRowNode:function(A,B){if(B){this.doStyleRowNode(A,B)
}},doStyleRowNode:function(A,B){this.grid.styleRowNode(A,B)
},updateRow:function(C,D,A){var B=this.getRowNode(C);
if(B){B.style.height="";
this.buildRow(C,B)
}return B
},updateRowStyles:function(A){this.styleRowNode(A,this.getRowNode(A))
},lastTop:0,doscroll:function(B){this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var A=this.scrollboxNode.scrollTop;
if(A!=this.lastTop){this.grid.scrollTo(A)
}},setScrollTop:function(A){this.lastTop=A;
this.scrollboxNode.scrollTop=A;
return this.scrollboxNode.scrollTop
},doContentEvent:function(A){if(this.content.decorateEvent(A)){this.grid.onContentEvent(A)
}},doHeaderEvent:function(A){if(this.header.decorateEvent(A)){this.grid.onHeaderEvent(A)
}},dispatchContentEvent:function(A){return this.content.dispatchEvent(A)
},dispatchHeaderEvent:function(A){return this.header.dispatchEvent(A)
},setColWidth:function(A,B){this.grid.setCellWidth(A,B+"px")
},update:function(){var A=this.scrollboxNode.scrollLeft;
this.content.update();
this.grid.update();
this.scrollboxNode.scrollLeft=A
}})
};