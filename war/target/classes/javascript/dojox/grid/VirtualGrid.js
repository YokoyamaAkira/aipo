if(!dojo._hasResource["dojox.grid.VirtualGrid"]){dojo._hasResource["dojox.grid.VirtualGrid"]=true;
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
dojo.declare("dojox.VirtualGrid",[dijit._Widget,dijit._Templated],{templateString:'<div class="dojoxGrid" hidefocus="hidefocus" role="wairole:grid"><div class="dojoxGrid-master-header" dojoAttachPoint="headerNode"></div><div class="dojoxGrid-master-view" dojoAttachPoint="viewsNode"></div><span dojoAttachPoint="lastFocusNode" tabindex="0"></span></div>',classTag:"dojoxGrid",get:function(A){},rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,autoHeight:false,autoRender:true,defaultHeight:"15em",structure:"",elasticView:-1,singleClickEdit:false,sortInfo:0,themeable:true,buildRendering:function(){this.inherited(arguments);
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
},_textSizeChanged:function(){if(this.domNode){this.views.forEach(function(A){A.content.update()
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
},buildViews:function(){for(var B=0,A;
(A=this.layout.structure[B]);
B++){this.createView(A.type||"dojox.GridView").setStructure(A)
}this.scroller.setContentNodes(this.views.getContentNodes())
},setStructure:function(A){this.views.destroyViews();
this.structure=A;
if((this.structure)&&(dojo.isString(this.structure))){this.structure=dojox.grid.getProp(this.structure)
}if(!this.structure){this.structure=window.layout
}if(!this.structure){return 
}this.layout.setStructure(this.structure);
this._structureChanged()
},_structureChanged:function(){this.buildViews();
if(this.autoRender){this.render()
}},resize:function(){if(!this.domNode.parentNode){return 
}var D=dojo._getPadBorderExtents(this.domNode);
if(this.autoHeight){this.domNode.style.height="auto";
this.viewsNode.style.height=""
}else{if(this.flex>0){}else{if(this.domNode.clientHeight<=D.h){if(this.domNode.parentNode==document.body){this.domNode.style.height=this.defaultHeight
}else{this.fitTo="parent"
}}}}if(this.fitTo=="parent"){var C=dojo._getContentBox(this.domNode.parentNode).h;
dojo.marginBox(this.domNode,{h:Math.max(0,C)})
}var B=this.views.measureHeader();
this.headerNode.style.height=B+"px";
var A=1,C=(this.autoHeight?-1:Math.max(this.domNode.clientHeight-B,0)||0);
if(this.autoWidth){this.domNode.style.width=this.views.arrange(A,0,0,C)+"px"
}else{var E=this.domNode.clientWidth||(this.domNode.offsetWidth-D.w);
this.views.arrange(A,0,E,C)
}this.scroller.windowHeight=C;
this.scroller.defaultRowHeight=this.rows.getDefaultHeightPx()+1;
this.postresize()
},resizeHeight:function(){var B=this.views.measureHeader();
this.headerNode.style.height=B+"px";
var A=(this.autoHeight?-1:Math.max(this.domNode.clientHeight-B,0)||0);
this.views.onEach("setSize",[0,A]);
this.views.onEach("resizeHeight");
this.scroller.windowHeight=A
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
}},renderRow:function(A,B){this.views.renderRow(A,B)
},rowRemoved:function(A){this.views.rowRemoved(A)
},invalidated:null,updating:false,beginUpdate:function(){this.invalidated=[];
this.updating=true
},endUpdate:function(){this.updating=false;
var A=this.invalidated;
if(A.all){this.update()
}else{if(A.rowCount!=undefined){this.updateRowCount(A.rowCount)
}else{for(r in A){this.updateRow(Number(r))
}}}this.invalidated=null
},defaultUpdate:function(){if(this.updating){this.invalidated.all=true;
return 
}this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.scrollTop);
this.postrender()
},update:function(){this.render()
},updateRow:function(A){A=Number(A);
if(this.updating){this.invalidated[A]=true;
return 
}this.views.updateRow(A,this.rows.getHeight(A));
this.scroller.rowHeightChanged(A)
},updateRowCount:function(A){if(this.updating){this.invalidated.rowCount=A;
return 
}this.rowCount=A;
this.scroller.updateRowCount(A);
this.setScrollTop(this.scrollTop);
this.resize()
},updateRowStyles:function(A){this.views.updateRowStyles(A)
},rowHeightChanged:function(A){this.views.renormalizeRow(A);
this.scroller.rowHeightChanged(A)
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(dojo.isIE?100:50),scrollTo:function(B){if(!this.fastScroll){this.setScrollTop(B);
return 
}var A=Math.abs(this.lastScrollTop-B);
this.lastScrollTop=B;
if(A>this.scrollRedrawThreshold||this.delayScroll){this.delayScroll=true;
this.scrollTop=B;
this.views.setScrollTop(B);
dojox.grid.jobs.job("dojoxGrid-scroll",200,dojo.hitch(this,"finishScrollJob"))
}else{this.setScrollTop(B)
}},finishScrollJob:function(){this.delayScroll=false;
this.setScrollTop(this.scrollTop)
},setScrollTop:function(A){this.scrollTop=this.views.setScrollTop(A);
this.scroller.scroll(this.scrollTop)
},scrollToRow:function(A){this.setScrollTop(this.scroller.findScrollTop(A)+1)
},styleRowNode:function(A,B){if(B){this.rows.styleRowNode(A,B)
}},getCell:function(A){return this.layout.cells[A]
},setCellWidth:function(A,B){this.getCell(A).unitWidth=B
},getCellName:function(A){return"Cell "+A.index
},canSort:function(A){},sort:function(){},getSortAsc:function(A){A=A==undefined?this.sortInfo:A;
return Boolean(A>0)
},getSortIndex:function(A){A=A==undefined?this.sortInfo:A;
return Math.abs(A)-1
},setSortIndex:function(B,A){var C=B+1;
if(A!=undefined){C*=(A?1:-1)
}else{if(this.getSortIndex()==B){C=-this.sortInfo
}}this.setSortInfo(C)
},setSortInfo:function(A){if(this.canSort(A)){this.sortInfo=A;
this.sort();
this.update()
}},doKeyEvent:function(A){A.dispatch="do"+A.type;
this.onKeyEvent(A)
},_dispatch:function(B,A){if(B in this){return this[B](A)
}},dispatchKeyEvent:function(A){this._dispatch(A.dispatch,A)
},dispatchContentEvent:function(A){this.edit.dispatchEvent(A)||A.sourceView.dispatchContentEvent(A)||this._dispatch(A.dispatch,A)
},dispatchHeaderEvent:function(A){A.sourceView.dispatchHeaderEvent(A)||this._dispatch("doheader"+A.type,A)
},dokeydown:function(A){this.onKeyDown(A)
},doclick:function(A){if(A.cellNode){this.onCellClick(A)
}else{this.onRowClick(A)
}},dodblclick:function(A){if(A.cellNode){this.onCellDblClick(A)
}else{this.onRowDblClick(A)
}},docontextmenu:function(A){if(A.cellNode){this.onCellContextMenu(A)
}else{this.onRowContextMenu(A)
}},doheaderclick:function(A){if(A.cellNode){this.onHeaderCellClick(A)
}else{this.onHeaderClick(A)
}},doheaderdblclick:function(A){if(A.cellNode){this.onHeaderCellDblClick(A)
}else{this.onHeaderDblClick(A)
}},doheadercontextmenu:function(A){if(A.cellNode){this.onHeaderCellContextMenu(A)
}else{this.onHeaderContextMenu(A)
}},doStartEdit:function(B,A){this.onStartEdit(B,A)
},doApplyCellEdit:function(C,B,A){this.onApplyCellEdit(C,B,A)
},doCancelEdit:function(A){this.onCancelEdit(A)
},doApplyEdit:function(A){this.onApplyEdit(A)
},addRow:function(){this.updateRowCount(this.rowCount+1)
},removeSelectedRows:function(){this.updateRowCount(Math.max(0,this.rowCount-this.selection.getSelected().length));
this.selection.clear()
}});
dojo.mixin(dojox.VirtualGrid.prototype,dojox.grid.publicEvents)
};