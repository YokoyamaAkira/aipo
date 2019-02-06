if(!dojo._hasResource["dojox.grid._grid.scroller"]){dojo._hasResource["dojox.grid._grid.scroller"]=true;
dojo.provide("dojox.grid._grid.scroller");
dojo.declare("dojox.grid.scroller.base",null,{constructor:function(){this.pageHeights=[];
this.stack=[]
},rowCount:0,defaultRowHeight:10,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,page:0,pageTop:0,init:function(A,C,B){switch(arguments.length){case 3:this.rowsPerPage=B;
case 2:this.keepRows=C;
case 1:this.rowCount=A
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
},updateRowCount:function(A){this.invalidateNodes();
this.rowCount=A;
oldPageCount=this.pageCount;
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
if(this.pageCount<oldPageCount){for(var B=oldPageCount-1;
B>=this.pageCount;
B--){this.height-=this.getPageHeight(B);
delete this.pageHeights[B]
}}else{if(this.pageCount>oldPageCount){this.height+=this.defaultPageHeight*(this.pageCount-oldPageCount-1)+this.calcLastPageHeight()
}}this.resize()
},pageExists:function(A){},measurePage:function(A){},positionPage:function(B,A){},repositionPages:function(A){},installPage:function(A){},preparePage:function(C,B,A){},renderPage:function(A){},removePage:function(A){},pacify:function(A){},pacifying:false,pacifyTicks:200,setPacifying:function(A){if(this.pacifying!=A){this.pacifying=A;
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
}var B=this.pageCount-1;
var A=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[B]=A;
return A
},updateContentHeight:function(A){this.height+=A;
this.resize()
},updatePageHeight:function(C){if(this.pageExists(C)){var B=this.getPageHeight(C);
var A=(this.measurePage(C))||(B);
this.pageHeights[C]=A;
if((A)&&(B!=A)){this.updateContentHeight(A-B);
this.repositionPages(C)
}}},rowHeightChanged:function(A){this.updatePageHeight(Math.floor(A/this.rowsPerPage))
},invalidateNodes:function(){while(this.stack.length){this.destroyPage(this.popPage())
}},createPageNode:function(){var A=document.createElement("div");
A.style.position="absolute";
A.style.left="0";
return A
},getPageHeight:function(B){var A=this.pageHeights[B];
return(A!==undefined?A:this.defaultPageHeight)
},pushPage:function(A){return this.stack.push(A)
},popPage:function(){return this.stack.shift()
},findPage:function(C){var A=0,B=0;
for(var D=0;
A<this.pageCount;
A++,B+=D){D=this.getPageHeight(A);
if(B+D>=C){break
}}this.page=A;
this.pageTop=B
},buildPage:function(C,A,B){this.preparePage(C,A);
this.positionPage(C,B);
this.installPage(C);
this.renderPage(C);
this.pushPage(C)
},needPage:function(D,C){var A=this.getPageHeight(D),B=A;
if(!this.pageExists(D)){this.buildPage(D,(this.keepPages)&&(this.stack.length>=this.keepPages),C);
A=this.measurePage(D)||A;
this.pageHeights[D]=A;
if(A&&(B!=A)){this.updateContentHeight(A-B)
}}else{this.positionPage(D,C)
}return A
},onscroll:function(){this.scroll(this.scrollboxNode.scrollTop)
},scroll:function(C){this.startPacify();
this.findPage(C);
var B=this.height;
var A=this.getScrollBottom(C);
for(var D=this.page,E=this.pageTop;
(D<this.pageCount)&&((A<0)||(E<A));
D++){E+=this.needPage(D,E)
}this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,C);
this.lastVisibleRow=this.getLastVisibleRow(D-1,E,A);
if(B!=this.height){this.repositionPages(D-1)
}this.endPacify()
},getScrollBottom:function(A){return(this.windowHeight>=0?A+this.windowHeight:-1)
},processNodeEvent:function(C,D){var A=C.target;
while(A&&(A!=D)&&A.parentNode&&(A.parentNode.parentNode!=D)){A=A.parentNode
}if(!A||!A.parentNode||(A.parentNode.parentNode!=D)){return false
}var B=A.parentNode;
C.topRowIndex=B.pageIndex*this.rowsPerPage;
C.rowIndex=C.topRowIndex+dojox.grid.indexInParent(A);
C.rowTarget=A;
return true
},processEvent:function(A){return this.processNodeEvent(A,this.contentNode)
},dummy:0});
dojo.declare("dojox.grid.scroller",dojox.grid.scroller.base,{constructor:function(){this.pageNodes=[]
},renderRow:function(B,A){},removeRow:function(A){},getDefaultNodes:function(){return this.pageNodes
},getDefaultPageNode:function(A){return this.getDefaultNodes()[A]
},positionPageNode:function(B,A){B.style.top=A+"px"
},getPageNodePosition:function(A){return A.offsetTop
},repositionPageNodes:function(G,D){var B=0;
for(var A=0;
A<this.stack.length;
A++){B=Math.max(this.stack[A],B)
}var F=D[G];
var E=(F?this.getPageNodePosition(F)+this.getPageHeight(G):0);
for(var C=G+1;
C<=B;
C++){F=D[C];
if(F){if(this.getPageNodePosition(F)==E){return 
}this.positionPage(C,E)
}E+=this.getPageHeight(C)
}},invalidatePageNode:function(C,B){var A=B[C];
if(A){delete B[C];
this.removePage(C,A);
dojox.grid.cleanNode(A);
A.innerHTML=""
}return A
},preparePageNode:function(D,A,C){var B=(A===null?this.createPageNode():this.invalidatePageNode(A,C));
B.pageIndex=D;
B.id="page-"+D;
C[D]=B
},pageExists:function(A){return Boolean(this.getDefaultPageNode(A))
},measurePage:function(A){return this.getDefaultPageNode(A).offsetHeight
},positionPage:function(B,A){this.positionPageNode(this.getDefaultPageNode(B),A)
},repositionPages:function(A){this.repositionPageNodes(A,this.getDefaultNodes())
},preparePage:function(B,A){this.preparePageNode(B,(A?this.popPage():null),this.getDefaultNodes())
},installPage:function(A){this.contentNode.appendChild(this.getDefaultPageNode(A))
},destroyPage:function(B){var A=this.invalidatePageNode(B,this.getDefaultNodes());
dojox.grid.removeNode(A)
},renderPage:function(D){var C=this.pageNodes[D];
for(var B=0,A=D*this.rowsPerPage;
(B<this.rowsPerPage)&&(A<this.rowCount);
B++,A++){this.renderRow(A,C)
}},removePage:function(C){for(var B=0,A=C*this.rowsPerPage;
B<this.rowsPerPage;
B++,A++){this.removeRow(A)
}},getPageRow:function(A){return A*this.rowsPerPage
},getLastPageRow:function(A){return Math.min(this.rowCount,this.getPageRow(A+1))-1
},getFirstVisibleRowNodes:function(A,F,E,H){var G=this.getPageRow(A);
var D=dojox.grid.divkids(H[A]);
for(var C=0,B=D.length;
C<B&&F<E;
C++,G++){F+=D[C].offsetHeight
}return(G?G-1:G)
},getFirstVisibleRow:function(A,C,B){if(!this.pageExists(A)){return 0
}return this.getFirstVisibleRowNodes(A,C,B,this.getDefaultNodes())
},getLastVisibleRowNodes:function(A,E,C,G){var F=this.getLastPageRow(A);
var D=dojox.grid.divkids(G[A]);
for(var B=D.length-1;
B>=0&&E>C;
B--,F--){E-=D[B].offsetHeight
}return F+1
},getLastVisibleRow:function(A,C,B){if(!this.pageExists(A)){return 0
}return this.getLastVisibleRowNodes(A,C,B,this.getDefaultNodes())
},findTopRowForNodes:function(F,G){var E=dojox.grid.divkids(G[this.page]);
for(var C=0,A=E.length,B=this.pageTop,D;
C<A;
C++){D=E[C].offsetHeight;
B+=D;
if(B>=F){this.offset=D-(B-F);
return C+this.page*this.rowsPerPage
}}return -1
},findScrollTopForNodes:function(G,H){var F=Math.floor(G/this.rowsPerPage);
var C=0;
for(var B=0;
B<F;
B++){C+=this.getPageHeight(B)
}this.pageTop=C;
this.needPage(F,this.pageTop);
var E=dojox.grid.divkids(H[F]);
var D=G-this.rowsPerPage*F;
for(var B=0,A=E.length;
B<A&&B<D;
B++){C+=E[B].offsetHeight
}return C
},findTopRow:function(A){return this.findTopRowForNodes(A,this.getDefaultNodes())
},findScrollTop:function(A){return this.findScrollTopForNodes(A,this.getDefaultNodes())
},dummy:0});
dojo.declare("dojox.grid.scroller.columns",dojox.grid.scroller,{constructor:function(A){this.setContentNodes(A)
},setContentNodes:function(B){this.contentNodes=B;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var A=0;
A<this.colCount;
A++){this.pageNodes[A]=[]
}},getDefaultNodes:function(){return this.pageNodes[0]||[]
},scroll:function(A){if(this.colCount){dojox.grid.scroller.prototype.scroll.call(this,A)
}},resize:function(){if(this.scrollboxNode){this.windowHeight=this.scrollboxNode.clientHeight
}for(var A=0;
A<this.colCount;
A++){dojox.grid.setStyleHeightPx(this.contentNodes[A],this.height)
}},positionPage:function(C,B){for(var A=0;
A<this.colCount;
A++){this.positionPageNode(this.pageNodes[A][C],B)
}},preparePage:function(D,B){var C=(B?this.popPage():null);
for(var A=0;
A<this.colCount;
A++){this.preparePageNode(D,C,this.pageNodes[A])
}},installPage:function(B){for(var A=0;
A<this.colCount;
A++){this.contentNodes[A].appendChild(this.pageNodes[A][B])
}},destroyPage:function(B){for(var A=0;
A<this.colCount;
A++){dojox.grid.removeNode(this.invalidatePageNode(B,this.pageNodes[A]))
}},renderPage:function(D){var A=[];
for(var C=0;
C<this.colCount;
C++){A[C]=this.pageNodes[C][D]
}for(var C=0,B=D*this.rowsPerPage;
(C<this.rowsPerPage)&&(B<this.rowCount);
C++,B++){this.renderRow(B,A)
}}})
};