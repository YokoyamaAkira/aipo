if(!dojo._hasResource["dojox.grid._grid.builder"]){dojo._hasResource["dojox.grid._grid.builder"]=true;
dojo.provide("dojox.grid._grid.builder");
dojo.require("dojox.grid._grid.drag");
dojo.declare("dojox.grid.Builder",null,{constructor:function(A){this.view=A;
this.grid=A.grid
},view:null,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation">',generateCellMarkup:function(B,E,C,D){var F=[],A;
if(D){A=['<th tabIndex="-1" role="wairole:columnheader"']
}else{A=['<td tabIndex="-1" role="wairole:gridcell"']
}B.colSpan&&A.push(' colspan="',B.colSpan,'"');
B.rowSpan&&A.push(' rowspan="',B.rowSpan,'"');
A.push(' class="dojoxGrid-cell ');
B.classes&&A.push(B.classes," ");
C&&A.push(C," ");
F.push(A.join(""));
F.push("");
A=['" idx="',B.index,'" style="'];
A.push(B.styles,E||"");
B.unitWidth&&A.push("width:",B.unitWidth,";");
F.push(A.join(""));
F.push("");
A=['"'];
B.attrs&&A.push(" ",B.attrs);
A.push(">");
F.push(A.join(""));
F.push("");
F.push("</td>");
return F
},isCellNode:function(A){return Boolean(A&&A.getAttribute&&A.getAttribute("idx"))
},getCellNodeIndex:function(A){return A?Number(A.getAttribute("idx")):-1
},getCellNode:function(A,B){for(var D=0,E;
E=dojox.grid.getTr(A.firstChild,D);
D++){for(var C=0,F;
F=E.cells[C];
C++){if(this.getCellNodeIndex(F)==B){return F
}}}},findCellTarget:function(C,A){var B=C;
while(B&&!this.isCellNode(B)&&(B!=A)){B=B.parentNode
}return B!=A?B:null
},baseDecorateEvent:function(A){A.dispatch="do"+A.type;
A.grid=this.grid;
A.sourceView=this.view;
A.cellNode=this.findCellTarget(A.target,A.rowNode);
A.cellIndex=this.getCellNodeIndex(A.cellNode);
A.cell=(A.cellIndex>=0?this.grid.getCell(A.cellIndex):null)
},findTarget:function(C,B){var A=C;
while(A&&!(B in A)&&(A!=this.domNode)){A=A.parentNode
}return(A!=this.domNode)?A:null
},findRowTarget:function(A){return this.findTarget(A,dojox.grid.rowIndexTag)
},isIntraNodeEvent:function(A){try{return(A.cellNode&&A.relatedTarget&&dojo.isDescendant(A.relatedTarget,A.cellNode))
}catch(B){return false
}},isIntraRowEvent:function(A){try{var B=A.relatedTarget&&this.findRowTarget(A.relatedTarget);
return !B&&(A.rowIndex==-1)||B&&(A.rowIndex==B.gridRowIndex)
}catch(C){return false
}},dispatchEvent:function(A){if(A.dispatch in this){return this[A.dispatch](A)
}},domouseover:function(A){if(A.cellNode&&(A.cellNode!=this.lastOverCellNode)){this.lastOverCellNode=A.cellNode;
this.grid.onMouseOver(A)
}this.grid.onMouseOverRow(A)
},domouseout:function(A){if(A.cellNode&&(A.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(A,this.lastOverCellNode)){this.lastOverCellNode=null;
this.grid.onMouseOut(A);
if(!this.isIntraRowEvent(A)){this.grid.onMouseOutRow(A)
}}}});
dojo.declare("dojox.grid.contentBuilder",dojox.grid.Builder,{update:function(){this.prepareHtml()
},prepareHtml:function(){var C=this.grid.get,D=this.view.structure.rows;
for(var A=0,E;
(E=D[A]);
A++){for(var B=0,F;
(F=E[B]);
B++){F.get=F.get||(F.value==undefined)&&C;
F.markup=this.generateCellMarkup(F,F.cellStyles,F.cellClasses,false)
}}},generateHtml:function(D,G){var B=[this._table],F=this.view,J=F.onBeforeRow,I=F.structure.rows;
J&&J(G,I);
for(var M=0,H;
(H=I[M]);
M++){if(H.hidden||H.header){continue
}B.push(!H.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var A=0,E,L,K,C;
(E=H[A]);
A++){L=E.markup,K=E.customClasses=[],C=E.customStyles=[];
L[5]=E.format(D);
L[1]=K.join(" ");
L[3]=C.join(";");
B.push.apply(B,L)
}B.push("</tr>")
}B.push("</table>");
return B.join("")
},decorateEvent:function(A){A.rowNode=this.findRowTarget(A.target);
if(!A.rowNode){return false
}A.rowIndex=A.rowNode[dojox.grid.rowIndexTag];
this.baseDecorateEvent(A);
A.cell=this.grid.getCell(A.cellIndex);
return true
}});
dojo.declare("dojox.grid.headerBuilder",dojox.grid.Builder,{bogusClickTime:0,overResizeWidth:4,minColWidth:1,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation"',update:function(){this.tableMap=new dojox.grid.tableMap(this.view.structure.rows)
},generateHtml:function(B,F){var I=[this._table],E=this.view.structure.rows;
if(this.view.viewWidth){I.push([' style="width:',this.view.viewWidth,';"'].join(""))
}I.push(">");
dojox.grid.fire(this.view,"onBeforeRow",[-1,E]);
for(var G=0,D;
(D=E[G]);
G++){if(D.hidden){continue
}I.push(!D.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var H=0,A,C;
(A=D[H]);
H++){A.customClasses=[];
A.customStyles=[];
C=this.generateCellMarkup(A,A.headerStyles,A.headerClasses,true);
C[5]=(F!=undefined?F:B(A));
C[3]=A.customStyles.join(";");
C[1]=A.customClasses.join(" ");
I.push(C.join(""))
}I.push("</tr>")
}I.push("</table>");
return I.join("")
},getCellX:function(A){var C=A.layerX;
if(dojo.isMoz){var B=dojox.grid.ascendDom(A.target,dojox.grid.makeNotTagName("th"));
C-=(B&&B.offsetLeft)||0
}var B=dojox.grid.ascendDom(A.target,function(){if(!B||B==A.cellNode){return false
}C+=(B.offsetLeft<0?0:B.offsetLeft);
return true
});
return C
},decorateEvent:function(A){this.baseDecorateEvent(A);
A.rowIndex=-1;
A.cellX=this.getCellX(A);
return true
},prepareLeftResize:function(A){var B=dojox.grid.getTdIndex(A.cellNode);
A.cellNode=(B?A.cellNode.parentNode.cells[B-1]:null);
A.cellIndex=(A.cellNode?this.getCellNodeIndex(A.cellNode):-1);
return Boolean(A.cellNode)
},canResize:function(A){if(!A.cellNode||A.cellNode.colSpan>1){return false
}var B=this.grid.getCell(A.cellIndex);
return !B.noresize&&!B.isFlex()
},overLeftResizeArea:function(A){return(A.cellIndex>0)&&(A.cellX<this.overResizeWidth)&&this.prepareLeftResize(A)
},overRightResizeArea:function(A){return A.cellNode&&(A.cellX>=A.cellNode.offsetWidth-this.overResizeWidth)
},domousemove:function(B){var A=(this.overRightResizeArea(B)?"e-resize":(this.overLeftResizeArea(B)?"w-resize":""));
if(A&&!this.canResize(B)){A="not-allowed"
}B.sourceView.headerNode.style.cursor=A||""
},domousedown:function(A){if(!dojox.grid.drag.dragging){if((this.overRightResizeArea(A)||this.overLeftResizeArea(A))&&this.canResize(A)){this.beginColumnResize(A)
}}},doclick:function(A){if(new Date().getTime()<this.bogusClickTime){dojo.stopEvent(A);
return true
}},beginColumnResize:function(E){dojo.stopEvent(E);
var D=[],A=this.tableMap.findOverlappingNodes(E.cellNode);
for(var B=0,F;
(F=A[B]);
B++){D.push({node:F,index:this.getCellNodeIndex(F),width:F.offsetWidth})
}var C={view:E.sourceView,node:E.cellNode,index:E.cellIndex,w:E.cellNode.clientWidth,spanners:D};
dojox.grid.drag.start(E.cellNode,dojo.hitch(this,"doResizeColumn",C),dojo.hitch(this,"endResizeColumn",C),E)
},doResizeColumn:function(D,G){var F=D.w+G.deltaX;
if(F>=this.minColWidth){for(var B=0,C,E;
(C=D.spanners[B]);
B++){E=C.width+G.deltaX;
C.node.style.width=E+"px";
D.view.setColWidth(C.index,E)
}D.node.style.width=F+"px";
D.view.setColWidth(D.index,F)
}if(D.view.flexCells&&!D.view.testFlexCells()){var A=dojox.grid.findTable(D.node);
A&&(A.style.width="")
}},endResizeColumn:function(A){this.bogusClickTime=new Date().getTime()+30;
setTimeout(dojo.hitch(A.view,"update"),50)
}});
dojo.declare("dojox.grid.tableMap",null,{constructor:function(A){this.mapRows(A)
},map:null,mapRows:function(G){var B=G.length;
if(!B){return 
}this.map=[];
for(var H=0,F;
(F=G[H]);
H++){this.map[H]=[]
}for(var H=0,F;
(F=G[H]);
H++){for(var I=0,C=0,D,J,K;
(D=F[I]);
I++){while(this.map[H][C]){C++
}this.map[H][C]={c:I,r:H};
K=D.rowSpan||1;
J=D.colSpan||1;
for(var A=0;
A<K;
A++){for(var E=0;
E<J;
E++){this.map[H+A][C+E]=this.map[H][C]
}}C+=J
}}},dumpMap:function(){for(var A=0,D,C="";
(D=this.map[A]);
A++,C=""){for(var B=0,E;
(E=D[B]);
B++){C+=E.r+","+E.c+"   "
}console.log(C)
}},getMapCoords:function(D,A){for(var B=0,E;
(E=this.map[B]);
B++){for(var C=0,F;
(F=E[C]);
C++){if(F.c==A&&F.r==D){return{j:B,i:C}
}}}return{j:-1,i:-1}
},getNode:function(A,B,D){var C=A&&A.rows[B];
return C&&C.cells[D]
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