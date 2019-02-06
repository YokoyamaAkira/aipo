if(!dojo._hasResource["dojox.grid._grid.scroller"]){dojo._hasResource["dojox.grid._grid.scroller"]=true;
dojo.provide("dojox.grid._grid.scroller");
dojo.declare("dojox.grid.scroller.base",null,{constructor:function(){this.pageHeights=[];
this.stack=[]
},rowCount:0,defaultRowHeight:10,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,page:0,pageTop:0,init:function(C,B,A){switch(arguments.length){case 3:this.rowsPerPage=A;
case 2:this.keepRows=B;
case 1:this.rowCount=C
}this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
this.keepPages=Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
this.invalidate();
if(this.scrollboxNode){this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=dojo.hitch(this,"onscroll")
}},invalidate:function(){this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize()
},updateRowCount:function(B){this.invalidateNodes();
this.rowCount=B;
oldPageCount=this.pageCount;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
if(this.pageCount<oldPageCount){for(var A=oldPageCount-1;
A>=this.pageCount;
A--){this.height-=this.getPageHeight(A);
delete this.pageHeights[A]
}}else{if(this.pageCount>oldPageCount){this.height+=this.defaultPageHeight*(this.pageCount-oldPageCount-1)+this.calcLastPageHeight()
}}this.resize()
},pageExists:function(A){},measurePage:function(A){},positionPage:function(A,B){},repositionPages:function(A){},installPage:function(A){},preparePage:function(B,A,C){},renderPage:function(A){},removePage:function(A){},pacify:function(A){},pacifying:false,pacifyTicks:200,setPacifying:function(A){if(this.pacifying!=A){this.pacifying=A;
this.pacify(this.pacifying)
}},startPacify:function(){this.startPacifyTicks=new Date().getTime()
},doPacify:function(){var A=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return A
},endPacify:function(){this.setPacifying(false)
},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}dojox.grid.setStyleHeightPx(this.contentNode,this.height)
},calcLastPageHeight:function(){if(!this.pageCount){return 0
}var A=this.pageCount-1;
var B=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[A]=B;
return B
},updateContentHeight:function(A){this.height+=A;
this.resize()
},updatePageHeight:function(B){if(this.pageExists(B)){var A=this.getPageHeight(B);
var C=(this.measurePage(B))||(A);
this.pageHeights[B]=C;
if((C)&&(A!=C)){this.updateContentHeight(C-A);
this.repositionPages(B)
}}},rowHeightChanged:function(A){this.updatePageHeight(Math.floor(A/this.rowsPerPage))
},invalidateNodes:function(){while(this.stack.length){this.destroyPage(this.popPage())
}},createPageNode:function(){var A=document.createElement("div");
A.style.position="absolute";
A.style.left="0";
return A
},getPageHeight:function(A){var B=this.pageHeights[A];
return(B!==undefined?B:this.defaultPageHeight)
},pushPage:function(A){return this.stack.push(A)
},popPage:function(){return this.stack.shift()
},findPage:function(B){var D=0,A=0;
for(var C=0;
D<this.pageCount;
D++,A+=C){C=this.getPageHeight(D);
if(A+C>=B){break
}}this.page=D;
this.pageTop=A
},buildPage:function(B,C,A){this.preparePage(B,C);
this.positionPage(B,A);
this.installPage(B);
this.renderPage(B);
this.pushPage(B)
},needPage:function(C,B){var D=this.getPageHeight(C),A=D;
if(!this.pageExists(C)){this.buildPage(C,(this.keepPages)&&(this.stack.length>=this.keepPages),B);
D=this.measurePage(C)||D;
this.pageHeights[C]=D;
if(D&&(A!=D)){this.updateContentHeight(D-A)
}}else{this.positionPage(C,B)
}return D
},onscroll:function(){this.scroll(this.scrollboxNode.scrollTop)
},scroll:function(B){this.startPacify();
this.findPage(B);
var A=this.height;
var E=this.getScrollBottom(B);
for(var C=this.page,D=this.pageTop;
(C<this.pageCount)&&((E<0)||(D<E));
C++){D+=this.needPage(C,D)
}this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,B);
this.lastVisibleRow=this.getLastVisibleRow(C-1,D,E);
if(A!=this.height){this.repositionPages(C-1)
}this.endPacify()
},getScrollBottom:function(A){return(this.windowHeight>=0?A+this.windowHeight:-1)
},processNodeEvent:function(B,C){var D=B.target;
while(D&&(D!=C)&&D.parentNode&&(D.parentNode.parentNode!=C)){D=D.parentNode
}if(!D||!D.parentNode||(D.parentNode.parentNode!=C)){return false
}var A=D.parentNode;
B.topRowIndex=A.pageIndex*this.rowsPerPage;
B.rowIndex=B.topRowIndex+dojox.grid.indexInParent(D);
B.rowTarget=D;
return true
},processEvent:function(A){return this.processNodeEvent(A,this.contentNode)
},dummy:0});
dojo.declare("dojox.grid.scroller",dojox.grid.scroller.base,{constructor:function(){this.pageNodes=[]
},renderRow:function(A,B){},removeRow:function(A){},getDefaultNodes:function(){return this.pageNodes
},getDefaultPageNode:function(A){return this.getDefaultNodes()[A]
},positionPageNode:function(A,B){A.style.top=B+"px"
},getPageNodePosition:function(A){return A.offsetTop
},repositionPageNodes:function(D,A){var F=0;
for(var E=0;
E<this.stack.length;
E++){F=Math.max(this.stack[E],F)
}var C=A[D];
var B=(C?this.getPageNodePosition(C)+this.getPageHeight(D):0);
for(var G=D+1;
G<=F;
G++){C=A[G];
if(C){if(this.getPageNodePosition(C)==B){return 
}this.positionPage(G,B)
}B+=this.getPageHeight(G)
}},invalidatePageNode:function(B,A){var C=A[B];
if(C){delete A[B];
this.removePage(B,C);
dojox.grid.cleanNode(C);
C.innerHTML=""
}return C
},preparePageNode:function(C,D,B){var A=(D===null?this.createPageNode():this.invalidatePageNode(D,B));
A.pageIndex=C;
A.id="page-"+C;
B[C]=A
},pageExists:function(A){return Boolean(this.getDefaultPageNode(A))
},measurePage:function(A){return this.getDefaultPageNode(A).offsetHeight
},positionPage:function(A,B){this.positionPageNode(this.getDefaultPageNode(A),B)
},repositionPages:function(A){this.repositionPageNodes(A,this.getDefaultNodes())
},preparePage:function(A,B){this.preparePageNode(A,(B?this.popPage():null),this.getDefaultNodes())
},installPage:function(A){this.contentNode.appendChild(this.getDefaultPageNode(A))
},destroyPage:function(A){var B=this.invalidatePageNode(A,this.getDefaultNodes());
dojox.grid.removeNode(B)
},renderPage:function(C){var B=this.pageNodes[C];
for(var A=0,D=C*this.rowsPerPage;
(A<this.rowsPerPage)&&(D<this.rowCount);
A++,D++){this.renderRow(D,B)
}},removePage:function(B){for(var A=0,C=B*this.rowsPerPage;
A<this.rowsPerPage;
A++,C++){this.removeRow(C)
}},getPageRow:function(A){return A*this.rowsPerPage
},getLastPageRow:function(A){return Math.min(this.rowCount,this.getPageRow(A+1))-1
},getFirstVisibleRowNodes:function(D,A,H,C){var B=this.getPageRow(D);
var G=dojox.grid.divkids(C[D]);
for(var F=0,E=G.length;
F<E&&A<H;
F++,B++){A+=G[F].offsetHeight
}return(B?B-1:B)
},getFirstVisibleRow:function(C,B,A){if(!this.pageExists(C)){return 0
}return this.getFirstVisibleRowNodes(C,B,A,this.getDefaultNodes())
},getLastVisibleRowNodes:function(E,B,G,D){var C=this.getLastPageRow(E);
var A=dojox.grid.divkids(D[E]);
for(var F=A.length-1;
F>=0&&B>G;
F--,C--){B-=A[F].offsetHeight
}return C+1
},getLastVisibleRow:function(C,B,A){if(!this.pageExists(C)){return 0
}return this.getLastVisibleRowNodes(C,B,A,this.getDefaultNodes())
},findTopRowForNodes:function(C,D){var B=dojox.grid.divkids(D[this.page]);
for(var G=0,E=B.length,F=this.pageTop,A;
G<E;
G++){A=B[G].offsetHeight;
F+=A;
if(F>=C){this.offset=A-(F-C);
return G+this.page*this.rowsPerPage
}}return -1
},findScrollTopForNodes:function(B,C){var A=Math.floor(B/this.rowsPerPage);
var F=0;
for(var E=0;
E<A;
E++){F+=this.getPageHeight(E)
}this.pageTop=F;
this.needPage(A,this.pageTop);
var H=dojox.grid.divkids(C[A]);
var G=B-this.rowsPerPage*A;
for(var E=0,D=H.length;
E<D&&E<G;
E++){F+=H[E].offsetHeight
}return F
},findTopRow:function(A){return this.findTopRowForNodes(A,this.getDefaultNodes())
},findScrollTop:function(A){return this.findScrollTopForNodes(A,this.getDefaultNodes())
},dummy:0});
dojo.declare("dojox.grid.scroller.columns",dojox.grid.scroller,{constructor:function(A){this.setContentNodes(A)
},setContentNodes:function(A){this.contentNodes=A;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var B=0;
B<this.colCount;
B++){this.pageNodes[B]=[]
}},getDefaultNodes:function(){return this.pageNodes[0]||[]
},scroll:function(A){if(this.colCount){dojox.grid.scroller.prototype.scroll.call(this,A)
}},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}for(var A=0;
A<this.colCount;
A++){dojox.grid.setStyleHeightPx(this.contentNodes[A],this.height)
}},positionPage:function(B,A){for(var C=0;
C<this.colCount;
C++){this.positionPageNode(this.pageNodes[C][B],A)
}},preparePage:function(C,A){var B=(A?this.popPage():null);
for(var D=0;
D<this.colCount;
D++){this.preparePageNode(C,B,this.pageNodes[D])
}},installPage:function(A){for(var B=0;
B<this.colCount;
B++){this.contentNodes[B].appendChild(this.pageNodes[B][A])
}},destroyPage:function(A){for(var B=0;
B<this.colCount;
B++){dojox.grid.removeNode(this.invalidatePageNode(A,this.pageNodes[B]))
}},renderPage:function(C){var D=[];
for(var B=0;
B<this.colCount;
B++){D[B]=this.pageNodes[B][C]
}for(var B=0,A=C*this.rowsPerPage;
(B<this.rowsPerPage)&&(A<this.rowCount);
B++,A++){this.renderRow(A,D)
}}})
};