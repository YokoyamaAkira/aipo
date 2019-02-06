dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.view"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojox.grid._grid.builder"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.grid._grid.view"]){dojo._hasResource["dojox.grid._grid.view"]=true;
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
}},setStructure:function(inStructure){var vs=this.structure=inStructure;
if(vs.width&&dojo.isNumber(vs.width)){this.viewWidth=vs.width+"em"
}else{this.viewWidth=vs.width||this.viewWidth
}this.onBeforeRow=vs.onBeforeRow;
this.noscroll=vs.noscroll;
if(this.noscroll){this.scrollboxNode.style.overflow="hidden"
}this.testFlexCells();
this.updateStructure()
},testFlexCells:function(){this.flexCells=false;
for(var j=0,row;
(row=this.structure.rows[j]);
j++){for(var i=0,cell;
(cell=row[i]);
i++){cell.view=this;
this.flexCells=this.flexCells||cell.isFlex()
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
},_getHeaderContent:function(inCell){var n=inCell.name||inCell.grid.getCellName(inCell);
if(inCell.index!=inCell.grid.getSortIndex()){return n
}return['<div class="',inCell.grid.sortInfo>0?"dojoxGrid-sort-down":"dojoxGrid-sort-up",'">',n,"</div>"].join("")
},resize:function(){this.resizeHeight();
this.resizeWidth()
},hasScrollbar:function(){return(this.scrollboxNode.clientHeight!=this.scrollboxNode.offsetHeight)
},resizeHeight:function(){if(!this.grid.autoHeight){var h=this.domNode.clientHeight;
if(!this.hasScrollbar()){h-=dojox.grid.getScrollbarWidth()
}dojox.grid.setStyleHeightPx(this.scrollboxNode,h)
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
}}},renderRow:function(inRowIndex,inHeightPx){var rowNode=this.createRowNode(inRowIndex);
this.buildRow(inRowIndex,rowNode,inHeightPx);
this.grid.edit.restore(this,inRowIndex);
return rowNode
},createRowNode:function(inRowIndex){var node=document.createElement("div");
node.className=this.classTag+"-row";
node[dojox.grid.rowIndexTag]=inRowIndex;
this.rowNodes[inRowIndex]=node;
return node
},buildRow:function(inRowIndex,inRowNode){this.buildRowContent(inRowIndex,inRowNode);
this.styleRow(inRowIndex,inRowNode)
},buildRowContent:function(inRowIndex,inRowNode){inRowNode.innerHTML=this.content.generateHtml(inRowIndex,inRowIndex);
if(this.flexCells){inRowNode.firstChild.style.width=this.contentWidth
}},rowRemoved:function(inRowIndex){this.grid.edit.save(this,inRowIndex);
delete this.rowNodes[inRowIndex]
},getRowNode:function(inRowIndex){return this.rowNodes[inRowIndex]
},getCellNode:function(inRowIndex,inCellIndex){var row=this.getRowNode(inRowIndex);
if(row){return this.content.getCellNode(row,inCellIndex)
}},styleRow:function(inRowIndex,inRowNode){inRowNode._style=dojox.grid.getStyleText(inRowNode);
this.styleRowNode(inRowIndex,inRowNode)
},styleRowNode:function(inRowIndex,inRowNode){if(inRowNode){this.doStyleRowNode(inRowIndex,inRowNode)
}},doStyleRowNode:function(inRowIndex,inRowNode){this.grid.styleRowNode(inRowIndex,inRowNode)
},updateRow:function(inRowIndex,inHeightPx,inPageNode){var rowNode=this.getRowNode(inRowIndex);
if(rowNode){rowNode.style.height="";
this.buildRow(inRowIndex,rowNode)
}return rowNode
},updateRowStyles:function(inRowIndex){this.styleRowNode(inRowIndex,this.getRowNode(inRowIndex))
},lastTop:0,doscroll:function(inEvent){this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var top=this.scrollboxNode.scrollTop;
if(top!=this.lastTop){this.grid.scrollTo(top)
}},setScrollTop:function(inTop){this.lastTop=inTop;
this.scrollboxNode.scrollTop=inTop;
return this.scrollboxNode.scrollTop
},doContentEvent:function(e){if(this.content.decorateEvent(e)){this.grid.onContentEvent(e)
}},doHeaderEvent:function(e){if(this.header.decorateEvent(e)){this.grid.onHeaderEvent(e)
}},dispatchContentEvent:function(e){return this.content.dispatchEvent(e)
},dispatchHeaderEvent:function(e){return this.header.dispatchEvent(e)
},setColWidth:function(inIndex,inWidth){this.grid.setCellWidth(inIndex,inWidth+"px")
},update:function(){var left=this.scrollboxNode.scrollLeft;
this.content.update();
this.grid.update();
this.scrollboxNode.scrollLeft=left
}})
}}});