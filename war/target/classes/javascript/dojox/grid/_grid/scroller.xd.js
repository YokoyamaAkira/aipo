dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.scroller"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.scroller"]){A._hasResource["dojox.grid._grid.scroller"]=true;
A.provide("dojox.grid._grid.scroller");
A.declare("dojox.grid.scroller.base",null,{constructor:function(){this.pageHeights=[];
this.stack=[]
},rowCount:0,defaultRowHeight:10,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,page:0,pageTop:0,init:function(B,D,C){switch(arguments.length){case 3:this.rowsPerPage=C;
case 2:this.keepRows=D;
case 1:this.rowCount=B
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
},updateRowCount:function(B){this.invalidateNodes();
this.rowCount=B;
oldPageCount=this.pageCount;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
if(this.pageCount<oldPageCount){for(var C=oldPageCount-1;
C>=this.pageCount;
C--){this.height-=this.getPageHeight(C);
delete this.pageHeights[C]
}}else{if(this.pageCount>oldPageCount){this.height+=this.defaultPageHeight*(this.pageCount-oldPageCount-1)+this.calcLastPageHeight()
}}this.resize()
},pageExists:function(B){},measurePage:function(B){},positionPage:function(C,B){},repositionPages:function(B){},installPage:function(B){},preparePage:function(D,C,B){},renderPage:function(B){},removePage:function(B){},pacify:function(B){},pacifying:false,pacifyTicks:200,setPacifying:function(B){if(this.pacifying!=B){this.pacifying=B;
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
}var C=this.pageCount-1;
var B=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[C]=B;
return B
},updateContentHeight:function(B){this.height+=B;
this.resize()
},updatePageHeight:function(D){if(this.pageExists(D)){var C=this.getPageHeight(D);
var B=(this.measurePage(D))||(C);
this.pageHeights[D]=B;
if((B)&&(C!=B)){this.updateContentHeight(B-C);
this.repositionPages(D)
}}},rowHeightChanged:function(B){this.updatePageHeight(Math.floor(B/this.rowsPerPage))
},invalidateNodes:function(){while(this.stack.length){this.destroyPage(this.popPage())
}},createPageNode:function(){var B=document.createElement("div");
B.style.position="absolute";
B.style.left="0";
return B
},getPageHeight:function(C){var B=this.pageHeights[C];
return(B!==undefined?B:this.defaultPageHeight)
},pushPage:function(B){return this.stack.push(B)
},popPage:function(){return this.stack.shift()
},findPage:function(D){var B=0,C=0;
for(var E=0;
B<this.pageCount;
B++,C+=E){E=this.getPageHeight(B);
if(C+E>=D){break
}}this.page=B;
this.pageTop=C
},buildPage:function(D,B,C){this.preparePage(D,B);
this.positionPage(D,C);
this.installPage(D);
this.renderPage(D);
this.pushPage(D)
},needPage:function(E,D){var B=this.getPageHeight(E),C=B;
if(!this.pageExists(E)){this.buildPage(E,(this.keepPages)&&(this.stack.length>=this.keepPages),D);
B=this.measurePage(E)||B;
this.pageHeights[E]=B;
if(B&&(C!=B)){this.updateContentHeight(B-C)
}}else{this.positionPage(E,D)
}return B
},onscroll:function(){this.scroll(this.scrollboxNode.scrollTop)
},scroll:function(D){this.startPacify();
this.findPage(D);
var C=this.height;
var B=this.getScrollBottom(D);
for(var E=this.page,F=this.pageTop;
(E<this.pageCount)&&((B<0)||(F<B));
E++){F+=this.needPage(E,F)
}this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,D);
this.lastVisibleRow=this.getLastVisibleRow(E-1,F,B);
if(C!=this.height){this.repositionPages(E-1)
}this.endPacify()
},getScrollBottom:function(B){return(this.windowHeight>=0?B+this.windowHeight:-1)
},processNodeEvent:function(D,E){var B=D.target;
while(B&&(B!=E)&&B.parentNode&&(B.parentNode.parentNode!=E)){B=B.parentNode
}if(!B||!B.parentNode||(B.parentNode.parentNode!=E)){return false
}var C=B.parentNode;
D.topRowIndex=C.pageIndex*this.rowsPerPage;
D.rowIndex=D.topRowIndex+dojox.grid.indexInParent(B);
D.rowTarget=B;
return true
},processEvent:function(B){return this.processNodeEvent(B,this.contentNode)
},dummy:0});
A.declare("dojox.grid.scroller",dojox.grid.scroller.base,{constructor:function(){this.pageNodes=[]
},renderRow:function(C,B){},removeRow:function(B){},getDefaultNodes:function(){return this.pageNodes
},getDefaultPageNode:function(B){return this.getDefaultNodes()[B]
},positionPageNode:function(C,B){C.style.top=B+"px"
},getPageNodePosition:function(B){return B.offsetTop
},repositionPageNodes:function(H,E){var C=0;
for(var B=0;
B<this.stack.length;
B++){C=Math.max(this.stack[B],C)
}var G=E[H];
var F=(G?this.getPageNodePosition(G)+this.getPageHeight(H):0);
for(var D=H+1;
D<=C;
D++){G=E[D];
if(G){if(this.getPageNodePosition(G)==F){return 
}this.positionPage(D,F)
}F+=this.getPageHeight(D)
}},invalidatePageNode:function(D,C){var B=C[D];
if(B){delete C[D];
this.removePage(D,B);
dojox.grid.cleanNode(B);
B.innerHTML=""
}return B
},preparePageNode:function(E,B,D){var C=(B===null?this.createPageNode():this.invalidatePageNode(B,D));
C.pageIndex=E;
C.id="page-"+E;
D[E]=C
},pageExists:function(B){return Boolean(this.getDefaultPageNode(B))
},measurePage:function(B){return this.getDefaultPageNode(B).offsetHeight
},positionPage:function(C,B){this.positionPageNode(this.getDefaultPageNode(C),B)
},repositionPages:function(B){this.repositionPageNodes(B,this.getDefaultNodes())
},preparePage:function(C,B){this.preparePageNode(C,(B?this.popPage():null),this.getDefaultNodes())
},installPage:function(B){this.contentNode.appendChild(this.getDefaultPageNode(B))
},destroyPage:function(C){var B=this.invalidatePageNode(C,this.getDefaultNodes());
dojox.grid.removeNode(B)
},renderPage:function(E){var D=this.pageNodes[E];
for(var C=0,B=E*this.rowsPerPage;
(C<this.rowsPerPage)&&(B<this.rowCount);
C++,B++){this.renderRow(B,D)
}},removePage:function(D){for(var C=0,B=D*this.rowsPerPage;
C<this.rowsPerPage;
C++,B++){this.removeRow(B)
}},getPageRow:function(B){return B*this.rowsPerPage
},getLastPageRow:function(B){return Math.min(this.rowCount,this.getPageRow(B+1))-1
},getFirstVisibleRowNodes:function(B,G,F,I){var H=this.getPageRow(B);
var E=dojox.grid.divkids(I[B]);
for(var D=0,C=E.length;
D<C&&G<F;
D++,H++){G+=E[D].offsetHeight
}return(H?H-1:H)
},getFirstVisibleRow:function(B,D,C){if(!this.pageExists(B)){return 0
}return this.getFirstVisibleRowNodes(B,D,C,this.getDefaultNodes())
},getLastVisibleRowNodes:function(B,F,D,H){var G=this.getLastPageRow(B);
var E=dojox.grid.divkids(H[B]);
for(var C=E.length-1;
C>=0&&F>D;
C--,G--){F-=E[C].offsetHeight
}return G+1
},getLastVisibleRow:function(B,D,C){if(!this.pageExists(B)){return 0
}return this.getLastVisibleRowNodes(B,D,C,this.getDefaultNodes())
},findTopRowForNodes:function(G,H){var F=dojox.grid.divkids(H[this.page]);
for(var D=0,B=F.length,C=this.pageTop,E;
D<B;
D++){E=F[D].offsetHeight;
C+=E;
if(C>=G){this.offset=E-(C-G);
return D+this.page*this.rowsPerPage
}}return -1
},findScrollTopForNodes:function(H,I){var G=Math.floor(H/this.rowsPerPage);
var D=0;
for(var C=0;
C<G;
C++){D+=this.getPageHeight(C)
}this.pageTop=D;
this.needPage(G,this.pageTop);
var F=dojox.grid.divkids(I[G]);
var E=H-this.rowsPerPage*G;
for(var C=0,B=F.length;
C<B&&C<E;
C++){D+=F[C].offsetHeight
}return D
},findTopRow:function(B){return this.findTopRowForNodes(B,this.getDefaultNodes())
},findScrollTop:function(B){return this.findScrollTopForNodes(B,this.getDefaultNodes())
},dummy:0});
A.declare("dojox.grid.scroller.columns",dojox.grid.scroller,{constructor:function(B){this.setContentNodes(B)
},setContentNodes:function(C){this.contentNodes=C;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var B=0;
B<this.colCount;
B++){this.pageNodes[B]=[]
}},getDefaultNodes:function(){return this.pageNodes[0]||[]
},scroll:function(B){if(this.colCount){dojox.grid.scroller.prototype.scroll.call(this,B)
}},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}for(var B=0;
B<this.colCount;
B++){dojox.grid.setStyleHeightPx(this.contentNodes[B],this.height)
}},positionPage:function(D,C){for(var B=0;
B<this.colCount;
B++){this.positionPageNode(this.pageNodes[B][D],C)
}},preparePage:function(E,C){var D=(C?this.popPage():null);
for(var B=0;
B<this.colCount;
B++){this.preparePageNode(E,D,this.pageNodes[B])
}},installPage:function(C){for(var B=0;
B<this.colCount;
B++){this.contentNodes[B].appendChild(this.pageNodes[B][C])
}},destroyPage:function(C){for(var B=0;
B<this.colCount;
B++){dojox.grid.removeNode(this.invalidatePageNode(C,this.pageNodes[B]))
}},renderPage:function(E){var B=[];
for(var D=0;
D<this.colCount;
D++){B[D]=this.pageNodes[D][E]
}for(var D=0,C=E*this.rowsPerPage;
(D<this.rowsPerPage)&&(C<this.rowCount);
D++,C++){this.renderRow(C,B)
}}})
}}});