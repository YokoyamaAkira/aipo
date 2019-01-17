dojo._xdResourceLoaded({depends:[["provide","dojox.grid.VirtualGrid"],["require","dojox.grid._grid.lib"],["require","dojox.grid._grid.scroller"],["require","dojox.grid._grid.view"],["require","dojox.grid._grid.views"],["require","dojox.grid._grid.layout"],["require","dojox.grid._grid.rows"],["require","dojox.grid._grid.focus"],["require","dojox.grid._grid.selection"],["require","dojox.grid._grid.edit"],["require","dojox.grid._grid.rowbar"],["require","dojox.grid._grid.publicEvents"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.grid.VirtualGrid"]){dojo._hasResource["dojox.grid.VirtualGrid"]=true;
dojo.provide("dojox.grid.VirtualGrid");
dojo.require("dojox.grid._grid.lib");
dojo.require("dojox.grid._grid.scroller");
dojo.require("dojox.grid._grid.view");
dojo.require("dojox.grid._grid.views");
dojo.require("dojox.grid._grid.layout");
dojo.require("dojox.grid._grid.rows");
dojo.require("dojox.grid._grid.focus");
dojo.require("dojox.grid._grid.selection");
dojo.require("dojox.grid._grid.edit");
dojo.require("dojox.grid._grid.rowbar");
dojo.require("dojox.grid._grid.publicEvents");
dojo.declare("dojox.VirtualGrid",[dijit._Widget,dijit._Templated],{templateString:'<div class="dojoxGrid" hidefocus="hidefocus" role="wairole:grid"><div class="dojoxGrid-master-header" dojoAttachPoint="headerNode"></div><div class="dojoxGrid-master-view" dojoAttachPoint="viewsNode"></div><span dojoAttachPoint="lastFocusNode" tabindex="0"></span></div>',classTag:"dojoxGrid",get:function(inRowIndex){},rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,autoHeight:false,autoRender:true,defaultHeight:"15em",structure:"",elasticView:-1,singleClickEdit:false,sortInfo:0,themeable:true,buildRendering:function(){this.inherited(arguments);
if(this.get==dojox.VirtualGrid.prototype.get){this.get=null
}if(!this.domNode.getAttribute("tabIndex")){this.domNode.tabIndex="0"
}this.createScroller();
this.createLayout();
this.createViews();
this.createManagers();
dojox.grid.initTextSizePoll();
this.connect(dojox.grid,"textSizeChanged","textSizeChanged");
dojox.grid.funnelEvents(this.domNode,this,"doKeyEvent",dojox.grid.keyEvents);
this.connect(this,"onShow","renderOnIdle")
},postCreate:function(){this.styleChanged=this._styleChanged;
this.setStructure(this.structure)
},destroy:function(){this.domNode.onReveal=null;
this.domNode.onSizeChange=null;
this.edit.destroy();
this.views.destroyViews();
this.inherited(arguments)
},styleChanged:function(){this.setStyledClass(this.domNode,"")
},_styleChanged:function(){this.styleChanged();
this.update()
},textSizeChanged:function(){setTimeout(dojo.hitch(this,"_textSizeChanged"),1)
},_textSizeChanged:function(){if(this.domNode){this.views.forEach(function(v){v.content.update()
});
this.render()
}},sizeChange:function(){dojox.grid.jobs.job(this.id+"SizeChange",50,dojo.hitch(this,"update"))
},renderOnIdle:function(){setTimeout(dojo.hitch(this,"render"),1)
},createManagers:function(){this.rows=new dojox.grid.rows(this);
this.focus=new dojox.grid.focus(this);
this.selection=new dojox.grid.selection(this);
this.edit=new dojox.grid.edit(this)
},createScroller:function(){this.scroller=new dojox.grid.scroller.columns();
this.scroller.renderRow=dojo.hitch(this,"renderRow");
this.scroller.removeRow=dojo.hitch(this,"rowRemoved")
},createLayout:function(){this.layout=new dojox.grid.layout(this)
},createViews:function(){this.views=new dojox.grid.views(this);
this.views.createView=dojo.hitch(this,"createView")
},createView:function(inClass){var c=eval(inClass);
var view=new c({grid:this});
this.viewsNode.appendChild(view.domNode);
this.headerNode.appendChild(view.headerNode);
this.views.addView(view);
return view
},buildViews:function(){for(var i=0,vs;
(vs=this.layout.structure[i]);
i++){this.createView(vs.type||"dojox.GridView").setStructure(vs)
}this.scroller.setContentNodes(this.views.getContentNodes())
},setStructure:function(inStructure){this.views.destroyViews();
this.structure=inStructure;
if((this.structure)&&(dojo.isString(this.structure))){this.structure=dojox.grid.getProp(this.structure)
}if(!this.structure){this.structure=window.layout
}if(!this.structure){return 
}this.layout.setStructure(this.structure);
this._structureChanged()
},_structureChanged:function(){this.buildViews();
if(this.autoRender){this.render()
}},resize:function(){if(!this.domNode.parentNode){return 
}var padBorder=dojo._getPadBorderExtents(this.domNode);
if(this.autoHeight){this.domNode.style.height="auto";
this.viewsNode.style.height=""
}else{if(this.flex>0){}else{if(this.domNode.clientHeight<=padBorder.h){if(this.domNode.parentNode==document.body){this.domNode.style.height=this.defaultHeight
}else{this.fitTo="parent"
}}}}if(this.fitTo=="parent"){var h=dojo._getContentBox(this.domNode.parentNode).h;
dojo.marginBox(this.domNode,{h:Math.max(0,h)})
}var t=this.views.measureHeader();
this.headerNode.style.height=t+"px";
var l=1,h=(this.autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
if(this.autoWidth){this.domNode.style.width=this.views.arrange(l,0,0,h)+"px"
}else{var w=this.domNode.clientWidth||(this.domNode.offsetWidth-padBorder.w);
this.views.arrange(l,0,w,h)
}this.scroller.windowHeight=h;
this.scroller.defaultRowHeight=this.rows.getDefaultHeightPx()+1;
this.postresize()
},resizeHeight:function(){var t=this.views.measureHeader();
this.headerNode.style.height=t+"px";
var h=(this.autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
this.views.onEach("setSize",[0,h]);
this.views.onEach("resizeHeight");
this.scroller.windowHeight=h
},render:function(){if(!this.domNode){return 
}this.update=this.defaultUpdate;
this.scroller.init(this.rowCount,this.keepRows,this.rowsPerPage);
this.prerender();
this.setScrollTop(0);
this.postrender()
},prerender:function(){this.views.render();
this.resize()
},postrender:function(){this.postresize();
this.focus.initFocusView();
dojo.setSelectable(this.domNode,false)
},postresize:function(){if(this.autoHeight){this.viewsNode.style.height=this.views.measureContent()+"px"
}},renderRow:function(inRowIndex,inNodes){this.views.renderRow(inRowIndex,inNodes)
},rowRemoved:function(inRowIndex){this.views.rowRemoved(inRowIndex)
},invalidated:null,updating:false,beginUpdate:function(){this.invalidated=[];
this.updating=true
},endUpdate:function(){this.updating=false;
var i=this.invalidated;
if(i.all){this.update()
}else{if(i.rowCount!=undefined){this.updateRowCount(i.rowCount)
}else{for(r in i){this.updateRow(Number(r))
}}}this.invalidated=null
},defaultUpdate:function(){if(this.updating){this.invalidated.all=true;
return 
}this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.scrollTop);
this.postrender()
},update:function(){this.render()
},updateRow:function(inRowIndex){inRowIndex=Number(inRowIndex);
if(this.updating){this.invalidated[inRowIndex]=true;
return 
}this.views.updateRow(inRowIndex,this.rows.getHeight(inRowIndex));
this.scroller.rowHeightChanged(inRowIndex)
},updateRowCount:function(inRowCount){if(this.updating){this.invalidated.rowCount=inRowCount;
return 
}this.rowCount=inRowCount;
this.scroller.updateRowCount(inRowCount);
this.setScrollTop(this.scrollTop);
this.resize()
},updateRowStyles:function(inRowIndex){this.views.updateRowStyles(inRowIndex)
},rowHeightChanged:function(inRowIndex){this.views.renormalizeRow(inRowIndex);
this.scroller.rowHeightChanged(inRowIndex)
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(dojo.isIE?100:50),scrollTo:function(inTop){if(!this.fastScroll){this.setScrollTop(inTop);
return 
}var delta=Math.abs(this.lastScrollTop-inTop);
this.lastScrollTop=inTop;
if(delta>this.scrollRedrawThreshold||this.delayScroll){this.delayScroll=true;
this.scrollTop=inTop;
this.views.setScrollTop(inTop);
dojox.grid.jobs.job("dojoxGrid-scroll",200,dojo.hitch(this,"finishScrollJob"))
}else{this.setScrollTop(inTop)
}},finishScrollJob:function(){this.delayScroll=false;
this.setScrollTop(this.scrollTop)
},setScrollTop:function(inTop){this.scrollTop=this.views.setScrollTop(inTop);
this.scroller.scroll(this.scrollTop)
},scrollToRow:function(inRowIndex){this.setScrollTop(this.scroller.findScrollTop(inRowIndex)+1)
},styleRowNode:function(inRowIndex,inRowNode){if(inRowNode){this.rows.styleRowNode(inRowIndex,inRowNode)
}},getCell:function(inIndex){return this.layout.cells[inIndex]
},setCellWidth:function(inIndex,inUnitWidth){this.getCell(inIndex).unitWidth=inUnitWidth
},getCellName:function(inCell){return"Cell "+inCell.index
},canSort:function(inSortInfo){},sort:function(){},getSortAsc:function(inSortInfo){inSortInfo=inSortInfo==undefined?this.sortInfo:inSortInfo;
return Boolean(inSortInfo>0)
},getSortIndex:function(inSortInfo){inSortInfo=inSortInfo==undefined?this.sortInfo:inSortInfo;
return Math.abs(inSortInfo)-1
},setSortIndex:function(inIndex,inAsc){var si=inIndex+1;
if(inAsc!=undefined){si*=(inAsc?1:-1)
}else{if(this.getSortIndex()==inIndex){si=-this.sortInfo
}}this.setSortInfo(si)
},setSortInfo:function(inSortInfo){if(this.canSort(inSortInfo)){this.sortInfo=inSortInfo;
this.sort();
this.update()
}},doKeyEvent:function(e){e.dispatch="do"+e.type;
this.onKeyEvent(e)
},_dispatch:function(m,e){if(m in this){return this[m](e)
}},dispatchKeyEvent:function(e){this._dispatch(e.dispatch,e)
},dispatchContentEvent:function(e){this.edit.dispatchEvent(e)||e.sourceView.dispatchContentEvent(e)||this._dispatch(e.dispatch,e)
},dispatchHeaderEvent:function(e){e.sourceView.dispatchHeaderEvent(e)||this._dispatch("doheader"+e.type,e)
},dokeydown:function(e){this.onKeyDown(e)
},doclick:function(e){if(e.cellNode){this.onCellClick(e)
}else{this.onRowClick(e)
}},dodblclick:function(e){if(e.cellNode){this.onCellDblClick(e)
}else{this.onRowDblClick(e)
}},docontextmenu:function(e){if(e.cellNode){this.onCellContextMenu(e)
}else{this.onRowContextMenu(e)
}},doheaderclick:function(e){if(e.cellNode){this.onHeaderCellClick(e)
}else{this.onHeaderClick(e)
}},doheaderdblclick:function(e){if(e.cellNode){this.onHeaderCellDblClick(e)
}else{this.onHeaderDblClick(e)
}},doheadercontextmenu:function(e){if(e.cellNode){this.onHeaderCellContextMenu(e)
}else{this.onHeaderContextMenu(e)
}},doStartEdit:function(inCell,inRowIndex){this.onStartEdit(inCell,inRowIndex)
},doApplyCellEdit:function(inValue,inRowIndex,inFieldIndex){this.onApplyCellEdit(inValue,inRowIndex,inFieldIndex)
},doCancelEdit:function(inRowIndex){this.onCancelEdit(inRowIndex)
},doApplyEdit:function(inRowIndex){this.onApplyEdit(inRowIndex)
},addRow:function(){this.updateRowCount(this.rowCount+1)
},removeSelectedRows:function(){this.updateRowCount(Math.max(0,this.rowCount-this.selection.getSelected().length));
this.selection.clear()
}});
dojo.mixin(dojox.VirtualGrid.prototype,dojox.grid.publicEvents)
}}});