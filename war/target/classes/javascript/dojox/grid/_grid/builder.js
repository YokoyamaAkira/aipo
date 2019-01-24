if(!dojo._hasResource["dojox.grid._grid.builder"]){dojo._hasResource["dojox.grid._grid.builder"]=true;
dojo.provide("dojox.grid._grid.builder");
dojo.require("dojox.grid._grid.drag");
dojo.declare("dojox.grid.Builder",null,{constructor:function(A){this.view=A;
this.grid=A.grid
},view:null,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation">',generateCellMarkup:function(C,F,D,E){var A=[],B;
if(E){B=['<th tabIndex="-1" role="wairole:columnheader"']
}else{B=['<td tabIndex="-1" role="wairole:gridcell"']
}C.colSpan&&B.push(' colspan="',C.colSpan,'"');
C.rowSpan&&B.push(' rowspan="',C.rowSpan,'"');
B.push(' class="dojoxGrid-cell ');
C.classes&&B.push(C.classes," ");
D&&B.push(D," ");
A.push(B.join(""));
A.push("");
B=['" idx="',C.index,'" style="'];
B.push(C.styles,F||"");
C.unitWidth&&B.push("width:",C.unitWidth,";");
A.push(B.join(""));
A.push("");
B=['"'];
C.attrs&&B.push(" ",C.attrs);
B.push(">");
A.push(B.join(""));
A.push("");
A.push("</td>");
return A
},isCellNode:function(A){return Boolean(A&&A.getAttribute&&A.getAttribute("idx"))
},getCellNodeIndex:function(A){return A?Number(A.getAttribute("idx")):-1
},getCellNode:function(B,C){for(var E=0,F;
F=dojox.grid.getTr(B.firstChild,E);
E++){for(var D=0,A;
A=F.cells[D];
D++){if(this.getCellNodeIndex(A)==C){return A
}}}},findCellTarget:function(A,B){var C=A;
while(C&&!this.isCellNode(C)&&(C!=B)){C=C.parentNode
}return C!=B?C:null
},baseDecorateEvent:function(A){A.dispatch="do"+A.type;
A.grid=this.grid;
A.sourceView=this.view;
A.cellNode=this.findCellTarget(A.target,A.rowNode);
A.cellIndex=this.getCellNodeIndex(A.cellNode);
A.cell=(A.cellIndex>=0?this.grid.getCell(A.cellIndex):null)
},findTarget:function(A,C){var B=A;
while(B&&!(C in B)&&(B!=this.domNode)){B=B.parentNode
}return(B!=this.domNode)?B:null
},findRowTarget:function(A){return this.findTarget(A,dojox.grid.rowIndexTag)
},isIntraNodeEvent:function(B){try{return(B.cellNode&&B.relatedTarget&&dojo.isDescendant(B.relatedTarget,B.cellNode))
}catch(A){return false
}},isIntraRowEvent:function(B){try{var C=B.relatedTarget&&this.findRowTarget(B.relatedTarget);
return !C&&(B.rowIndex==-1)||C&&(B.rowIndex==C.gridRowIndex)
}catch(A){return false
}},dispatchEvent:function(A){if(A.dispatch in this){return this[A.dispatch](A)
}},domouseover:function(A){if(A.cellNode&&(A.cellNode!=this.lastOverCellNode)){this.lastOverCellNode=A.cellNode;
this.grid.onMouseOver(A)
}this.grid.onMouseOverRow(A)
},domouseout:function(A){if(A.cellNode&&(A.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(A,this.lastOverCellNode)){this.lastOverCellNode=null;
this.grid.onMouseOut(A);
if(!this.isIntraRowEvent(A)){this.grid.onMouseOutRow(A)
}}}});
dojo.declare("dojox.grid.contentBuilder",dojox.grid.Builder,{update:function(){this.prepareHtml()
},prepareHtml:function(){var D=this.grid.get,E=this.view.structure.rows;
for(var B=0,F;
(F=E[B]);
B++){for(var C=0,A;
(A=F[C]);
C++){A.get=A.get||(A.value==undefined)&&D;
A.markup=this.generateCellMarkup(A,A.cellStyles,A.cellClasses,false)
}}},generateHtml:function(H,K){var F=[this._table],J=this.view,A=J.onBeforeRow,M=J.structure.rows;
A&&A(K,M);
for(var D=0,L;
(L=M[D]);
D++){if(L.hidden||L.header){continue
}F.push(!L.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var E=0,I,C,B,G;
(I=L[E]);
E++){C=I.markup,B=I.customClasses=[],G=I.customStyles=[];
C[5]=I.format(H);
C[1]=B.join(" ");
C[3]=G.join(";");
F.push.apply(F,C)
}F.push("</tr>")
}F.push("</table>");
return F.join("")
},decorateEvent:function(A){A.rowNode=this.findRowTarget(A.target);
if(!A.rowNode){return false
}A.rowIndex=A.rowNode[dojox.grid.rowIndexTag];
this.baseDecorateEvent(A);
A.cell=this.grid.getCell(A.cellIndex);
return true
}});
dojo.declare("dojox.grid.headerBuilder",dojox.grid.Builder,{bogusClickTime:0,overResizeWidth:4,minColWidth:1,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation"',update:function(){this.tableMap=new dojox.grid.tableMap(this.view.structure.rows)
},generateHtml:function(F,A){var D=[this._table],I=this.view.structure.rows;
if(this.view.viewWidth){D.push([' style="width:',this.view.viewWidth,';"'].join(""))
}D.push(">");
dojox.grid.fire(this.view,"onBeforeRow",[-1,I]);
for(var B=0,H;
(H=I[B]);
B++){if(H.hidden){continue
}D.push(!H.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var C=0,E,G;
(E=H[C]);
C++){E.customClasses=[];
E.customStyles=[];
G=this.generateCellMarkup(E,E.headerStyles,E.headerClasses,true);
G[5]=(A!=undefined?A:F(E));
G[3]=E.customStyles.join(";");
G[1]=E.customClasses.join(" ");
D.push(G.join(""))
}D.push("</tr>")
}D.push("</table>");
return D.join("")
},getCellX:function(B){var A=B.layerX;
if(dojo.isMoz){var C=dojox.grid.ascendDom(B.target,dojox.grid.makeNotTagName("th"));
A-=(C&&C.offsetLeft)||0
}var C=dojox.grid.ascendDom(B.target,function(){if(!C||C==B.cellNode){return false
}A+=(C.offsetLeft<0?0:C.offsetLeft);
return true
});
return A
},decorateEvent:function(A){this.baseDecorateEvent(A);
A.rowIndex=-1;
A.cellX=this.getCellX(A);
return true
},prepareLeftResize:function(B){var A=dojox.grid.getTdIndex(B.cellNode);
B.cellNode=(A?B.cellNode.parentNode.cells[A-1]:null);
B.cellIndex=(B.cellNode?this.getCellNodeIndex(B.cellNode):-1);
return Boolean(B.cellNode)
},canResize:function(B){if(!B.cellNode||B.cellNode.colSpan>1){return false
}var A=this.grid.getCell(B.cellIndex);
return !A.noresize&&!A.isFlex()
},overLeftResizeArea:function(A){return(A.cellIndex>0)&&(A.cellX<this.overResizeWidth)&&this.prepareLeftResize(A)
},overRightResizeArea:function(A){return A.cellNode&&(A.cellX>=A.cellNode.offsetWidth-this.overResizeWidth)
},domousemove:function(A){var B=(this.overRightResizeArea(A)?"e-resize":(this.overLeftResizeArea(A)?"w-resize":""));
if(B&&!this.canResize(A)){B="not-allowed"
}A.sourceView.headerNode.style.cursor=B||""
},domousedown:function(A){if(!dojox.grid.drag.dragging){if((this.overRightResizeArea(A)||this.overLeftResizeArea(A))&&this.canResize(A)){this.beginColumnResize(A)
}}},doclick:function(A){if(new Date().getTime()<this.bogusClickTime){dojo.stopEvent(A);
return true
}},beginColumnResize:function(F){dojo.stopEvent(F);
var E=[],B=this.tableMap.findOverlappingNodes(F.cellNode);
for(var C=0,A;
(A=B[C]);
C++){E.push({node:A,index:this.getCellNodeIndex(A),width:A.offsetWidth})
}var D={view:F.sourceView,node:F.cellNode,index:F.cellIndex,w:F.cellNode.clientWidth,spanners:E};
dojox.grid.drag.start(F.cellNode,dojo.hitch(this,"doResizeColumn",D),dojo.hitch(this,"endResizeColumn",D),F)
},doResizeColumn:function(G,C){var B=G.w+C.deltaX;
if(B>=this.minColWidth){for(var E=0,F,A;
(F=G.spanners[E]);
E++){A=F.width+C.deltaX;
F.node.style.width=A+"px";
G.view.setColWidth(F.index,A)
}G.node.style.width=B+"px";
G.view.setColWidth(G.index,B)
}if(G.view.flexCells&&!G.view.testFlexCells()){var D=dojox.grid.findTable(G.node);
D&&(D.style.width="")
}},endResizeColumn:function(A){this.bogusClickTime=new Date().getTime()+30;
setTimeout(dojo.hitch(A.view,"update"),50)
}});
dojo.declare("dojox.grid.tableMap",null,{constructor:function(A){this.mapRows(A)
},map:null,mapRows:function(K){var F=K.length;
if(!F){return 
}this.map=[];
for(var A=0,J;
(J=K[A]);
A++){this.map[A]=[]
}for(var A=0,J;
(J=K[A]);
A++){for(var B=0,G=0,H,C,D;
(H=J[B]);
B++){while(this.map[A][G]){G++
}this.map[A][G]={c:B,r:A};
D=H.rowSpan||1;
C=H.colSpan||1;
for(var E=0;
E<D;
E++){for(var I=0;
I<C;
I++){this.map[A+E][G+I]=this.map[A][G]
}}G+=C
}}},dumpMap:function(){for(var B=0,E,D="";
(E=this.map[B]);
B++,D=""){for(var C=0,A;
(A=E[C]);
C++){D+=A.r+","+A.c+"   "
}console.log(D)
}},getMapCoords:function(E,B){for(var C=0,F;
(F=this.map[C]);
C++){for(var D=0,A;
(A=F[D]);
D++){if(A.c==B&&A.r==E){return{j:C,i:D}
}}}return{j:-1,i:-1}
},getNode:function(B,C,A){var D=B&&B.rows[C];
return D&&D.cells[A]
},_findOverlappingNodes:function(inTable,inRow,inCol){var nodes=[];
var m=this.getMapCoords(inRow,inCol);
var row=this.map[m.j];
for(var j=0,row;
(row=this.map[j]);
j++){if(j==m.j){continue
}with(row[m.i]){var n=this.getNode(inTable,r,c);
if(n){nodes.push(n)
}}}return nodes
},findOverlappingNodes:function(A){return this._findOverlappingNodes(dojox.grid.findTable(A),dojox.grid.getTrIndex(A.parentNode),dojox.grid.getTdIndex(A))
}});
dojox.grid.rowIndexTag="gridRowIndex"
};