dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.scroller"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.scroller"]){A._hasResource["dojox.grid._grid.scroller"]=true;
A.provide("dojox.grid._grid.scroller");
A.declare("dojox.grid.scroller.base",null,{constructor:function(){this.pageHeights=[];
this.stack=[]
},rowCount:0,defaultRowHeight:10,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,page:0,pageTop:0,init:function(C,B,D){switch(arguments.length){case 3:this.rowsPerPage=D;
case 2:this.keepRows=B;
case 1:this.rowCount=C
}this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
this.keepPages=Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
this.invalidate();
if(this.scrollboxNode){this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=A.hitch(this,"onscroll")
}},invalidate:function(){this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize()
},updateRowCount:function(C){this.invalidateNodes();
this.rowCount=C;
oldPageCount=this.pageCount;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
if(this.pageCount<oldPageCount){for(var B=oldPageCount-1;
B>=this.pageCount;
B--){this.height-=this.getPageHeight(B);
delete this.pageHeights[B]
}}else{if(this.pageCount>oldPageCount){this.height+=this.defaultPageHeight*(this.pageCount-oldPageCount-1)+this.calcLastPageHeight()
}}this.resize()
},pageExists:function(B){},measurePage:function(B){},positionPage:function(B,C){},repositionPages:function(B){},installPage:function(B){},preparePage:function(B,D,C){},renderPage:function(B){},removePage:function(B){},pacify:function(B){},pacifying:false,pacifyTicks:200,setPacifying:function(B){if(this.pacifying!=B){this.pacifying=B;
this.pacify(this.pacifying)
}},startPacify:function(){this.startPacifyTicks=new Date().getTime()
},doPacify:function(){var B=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return B
},endPacify:function(){this.setPacifying(false)
},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}dojox.grid.setStyleHeightPx(this.contentNode,this.height)
},calcLastPageHeight:function(){if(!this.pageCount){return 0
}var B=this.pageCount-1;
var C=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[B]=C;
return C
},updateContentHeight:function(B){this.height+=B;
this.resize()
},updatePageHeight:function(B){if(this.pageExists(B)){var D=this.getPageHeight(B);
var C=(this.measurePage(B))||(D);
this.pageHeights[B]=C;
if((C)&&(D!=C)){this.updateContentHeight(C-D);
this.repositionPages(B)
}}},rowHeightChanged:function(B){this.updatePageHeight(Math.floor(B/this.rowsPerPage))
},invalidateNodes:function(){while(this.stack.length){this.destroyPage(this.popPage())
}},createPageNode:function(){var B=document.createElement("div");
B.style.position="absolute";
B.style.left="0";
return B
},getPageHeight:function(B){var C=this.pageHeights[B];
return(C!==undefined?C:this.defaultPageHeight)
},pushPage:function(B){return this.stack.push(B)
},popPage:function(){return this.stack.shift()
},findPage:function(E){var C=0,D=0;
for(var B=0;
C<this.pageCount;
C++,D+=B){B=this.getPageHeight(C);
if(D+B>=E){break
}}this.page=C;
this.pageTop=D
},buildPage:function(B,C,D){this.preparePage(B,C);
this.positionPage(B,D);
this.installPage(B);
this.renderPage(B);
this.pushPage(B)
},needPage:function(B,E){var C=this.getPageHeight(B),D=C;
if(!this.pageExists(B)){this.buildPage(B,(this.keepPages)&&(this.stack.length>=this.keepPages),E);
C=this.measurePage(B)||C;
this.pageHeights[B]=C;
if(C&&(D!=C)){this.updateContentHeight(C-D)
}}else{this.positionPage(B,E)
}return C
},onscroll:function(){this.scroll(this.scrollboxNode.scrollTop)
},scroll:function(E){this.startPacify();
this.findPage(E);
var D=this.height;
var C=this.getScrollBottom(E);
for(var F=this.page,B=this.pageTop;
(F<this.pageCount)&&((C<0)||(B<C));
F++){B+=this.needPage(F,B)
}this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,E);
this.lastVisibleRow=this.getLastVisibleRow(F-1,B,C);
if(D!=this.height){this.repositionPages(F-1)
}this.endPacify()
},getScrollBottom:function(B){return(this.windowHeight>=0?B+this.windowHeight:-1)
},processNodeEvent:function(E,B){var C=E.target;
while(C&&(C!=B)&&C.parentNode&&(C.parentNode.parentNode!=B)){C=C.parentNode
}if(!C||!C.parentNode||(C.parentNode.parentNode!=B)){return false
}var D=C.parentNode;
E.topRowIndex=D.pageIndex*this.rowsPerPage;
E.rowIndex=E.topRowIndex+dojox.grid.indexInParent(C);
E.rowTarget=C;
return true
},processEvent:function(B){return this.processNodeEvent(B,this.contentNode)
},dummy:0});
A.declare("dojox.grid.scroller",dojox.grid.scroller.base,{constructor:function(){this.pageNodes=[]
},renderRow:function(B,C){},removeRow:function(B){},getDefaultNodes:function(){return this.pageNodes
},getDefaultPageNode:function(B){return this.getDefaultNodes()[B]
},positionPageNode:function(B,C){B.style.top=C+"px"
},getPageNodePosition:function(B){return B.offsetTop
},repositionPageNodes:function(C,D){var H=0;
for(var G=0;
G<this.stack.length;
G++){H=Math.max(this.stack[G],H)
}var F=D[C];
var E=(F?this.getPageNodePosition(F)+this.getPageHeight(C):0);
for(var B=C+1;
B<=H;
B++){F=D[B];
if(F){if(this.getPageNodePosition(F)==E){return 
}this.positionPage(B,E)
}E+=this.getPageHeight(B)
}},invalidatePageNode:function(B,D){var C=D[B];
if(C){delete D[B];
this.removePage(B,C);
dojox.grid.cleanNode(C);
C.innerHTML=""
}return C
},preparePageNode:function(B,C,E){var D=(C===null?this.createPageNode():this.invalidatePageNode(C,E));
D.pageIndex=B;
D.id="page-"+B;
E[B]=D
},pageExists:function(B){return Boolean(this.getDefaultPageNode(B))
},measurePage:function(B){return this.getDefaultPageNode(B).offsetHeight
},positionPage:function(B,C){this.positionPageNode(this.getDefaultPageNode(B),C)
},repositionPages:function(B){this.repositionPageNodes(B,this.getDefaultNodes())
},preparePage:function(B,C){this.preparePageNode(B,(C?this.popPage():null),this.getDefaultNodes())
},installPage:function(B){this.contentNode.appendChild(this.getDefaultPageNode(B))
},destroyPage:function(B){var C=this.invalidatePageNode(B,this.getDefaultNodes());
dojox.grid.removeNode(C)
},renderPage:function(B){var E=this.pageNodes[B];
for(var D=0,C=B*this.rowsPerPage;
(D<this.rowsPerPage)&&(C<this.rowCount);
D++,C++){this.renderRow(C,E)
}},removePage:function(B){for(var D=0,C=B*this.rowsPerPage;
D<this.rowsPerPage;
D++,C++){this.removeRow(C)
}},getPageRow:function(B){return B*this.rowsPerPage
},getLastPageRow:function(B){return Math.min(this.rowCount,this.getPageRow(B+1))-1
},getFirstVisibleRowNodes:function(F,D,C,B){var E=this.getPageRow(F);
var I=dojox.grid.divkids(B[F]);
for(var H=0,G=I.length;
H<G&&D<C;
H++,E++){D+=I[H].offsetHeight
}return(E?E-1:E)
},getFirstVisibleRow:function(C,B,D){if(!this.pageExists(C)){return 0
}return this.getFirstVisibleRowNodes(C,B,D,this.getDefaultNodes())
},getLastVisibleRowNodes:function(G,E,C,B){var F=this.getLastPageRow(G);
var D=dojox.grid.divkids(B[G]);
for(var H=D.length-1;
H>=0&&E>C;
H--,F--){E-=D[H].offsetHeight
}return F+1
},getLastVisibleRow:function(C,B,D){if(!this.pageExists(C)){return 0
}return this.getLastVisibleRowNodes(C,B,D,this.getDefaultNodes())
},findTopRowForNodes:function(F,C){var E=dojox.grid.divkids(C[this.page]);
for(var B=0,G=E.length,H=this.pageTop,D;
B<G;
B++){D=E[B].offsetHeight;
H+=D;
if(H>=F){this.offset=D-(H-F);
return B+this.page*this.rowsPerPage
}}return -1
},findScrollTopForNodes:function(E,C){var D=Math.floor(E/this.rowsPerPage);
var H=0;
for(var G=0;
G<D;
G++){H+=this.getPageHeight(G)
}this.pageTop=H;
this.needPage(D,this.pageTop);
var B=dojox.grid.divkids(C[D]);
var I=E-this.rowsPerPage*D;
for(var G=0,F=B.length;
G<F&&G<I;
G++){H+=B[G].offsetHeight
}return H
},findTopRow:function(B){return this.findTopRowForNodes(B,this.getDefaultNodes())
},findScrollTop:function(B){return this.findScrollTopForNodes(B,this.getDefaultNodes())
},dummy:0});
A.declare("dojox.grid.scroller.columns",dojox.grid.scroller,{constructor:function(B){this.setContentNodes(B)
},setContentNodes:function(B){this.contentNodes=B;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var C=0;
C<this.colCount;
C++){this.pageNodes[C]=[]
}},getDefaultNodes:function(){return this.pageNodes[0]||[]
},scroll:function(B){if(this.colCount){dojox.grid.scroller.prototype.scroll.call(this,B)
}},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}for(var B=0;
B<this.colCount;
B++){dojox.grid.setStyleHeightPx(this.contentNodes[B],this.height)
}},positionPage:function(B,D){for(var C=0;
C<this.colCount;
C++){this.positionPageNode(this.pageNodes[C][B],D)
}},preparePage:function(B,D){var E=(D?this.popPage():null);
for(var C=0;
C<this.colCount;
C++){this.preparePageNode(B,E,this.pageNodes[C])
}},installPage:function(B){for(var C=0;
C<this.colCount;
C++){this.contentNodes[C].appendChild(this.pageNodes[C][B])
}},destroyPage:function(B){for(var C=0;
C<this.colCount;
C++){dojox.grid.removeNode(this.invalidatePageNode(B,this.pageNodes[C]))
}},renderPage:function(B){var C=[];
for(var E=0;
E<this.colCount;
E++){C[E]=this.pageNodes[E][B]
}for(var E=0,D=B*this.rowsPerPage;
(E<this.rowsPerPage)&&(D<this.rowCount);
E++,D++){this.renderRow(D,C)
}}})
}}});