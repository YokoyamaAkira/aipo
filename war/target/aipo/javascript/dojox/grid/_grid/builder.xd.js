dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.builder"],["require","dojox.grid._grid.drag"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.grid._grid.builder"]){dojo._hasResource["dojox.grid._grid.builder"]=true;
dojo.provide("dojox.grid._grid.builder");
dojo.require("dojox.grid._grid.drag");
dojo.declare("dojox.grid.Builder",null,{constructor:function(inView){this.view=inView;
this.grid=inView.grid
},view:null,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation">',generateCellMarkup:function(inCell,inMoreStyles,inMoreClasses,isHeader){var result=[],html;
if(isHeader){html=['<th tabIndex="-1" role="wairole:columnheader"']
}else{html=['<td tabIndex="-1" role="wairole:gridcell"']
}inCell.colSpan&&html.push(' colspan="',inCell.colSpan,'"');
inCell.rowSpan&&html.push(' rowspan="',inCell.rowSpan,'"');
html.push(' class="dojoxGrid-cell ');
inCell.classes&&html.push(inCell.classes," ");
inMoreClasses&&html.push(inMoreClasses," ");
result.push(html.join(""));
result.push("");
html=['" idx="',inCell.index,'" style="'];
html.push(inCell.styles,inMoreStyles||"");
inCell.unitWidth&&html.push("width:",inCell.unitWidth,";");
result.push(html.join(""));
result.push("");
html=['"'];
inCell.attrs&&html.push(" ",inCell.attrs);
html.push(">");
result.push(html.join(""));
result.push("");
result.push("</td>");
return result
},isCellNode:function(inNode){return Boolean(inNode&&inNode.getAttribute&&inNode.getAttribute("idx"))
},getCellNodeIndex:function(inCellNode){return inCellNode?Number(inCellNode.getAttribute("idx")):-1
},getCellNode:function(inRowNode,inCellIndex){for(var i=0,row;
row=dojox.grid.getTr(inRowNode.firstChild,i);
i++){for(var j=0,cell;
cell=row.cells[j];
j++){if(this.getCellNodeIndex(cell)==inCellIndex){return cell
}}}},findCellTarget:function(inSourceNode,inTopNode){var n=inSourceNode;
while(n&&!this.isCellNode(n)&&(n!=inTopNode)){n=n.parentNode
}return n!=inTopNode?n:null
},baseDecorateEvent:function(e){e.dispatch="do"+e.type;
e.grid=this.grid;
e.sourceView=this.view;
e.cellNode=this.findCellTarget(e.target,e.rowNode);
e.cellIndex=this.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null)
},findTarget:function(inSource,inTag){var n=inSource;
while(n&&!(inTag in n)&&(n!=this.domNode)){n=n.parentNode
}return(n!=this.domNode)?n:null
},findRowTarget:function(inSource){return this.findTarget(inSource,dojox.grid.rowIndexTag)
},isIntraNodeEvent:function(e){try{return(e.cellNode&&e.relatedTarget&&dojo.isDescendant(e.relatedTarget,e.cellNode))
}catch(x){return false
}},isIntraRowEvent:function(e){try{var row=e.relatedTarget&&this.findRowTarget(e.relatedTarget);
return !row&&(e.rowIndex==-1)||row&&(e.rowIndex==row.gridRowIndex)
}catch(x){return false
}},dispatchEvent:function(e){if(e.dispatch in this){return this[e.dispatch](e)
}},domouseover:function(e){if(e.cellNode&&(e.cellNode!=this.lastOverCellNode)){this.lastOverCellNode=e.cellNode;
this.grid.onMouseOver(e)
}this.grid.onMouseOverRow(e)
},domouseout:function(e){if(e.cellNode&&(e.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(e,this.lastOverCellNode)){this.lastOverCellNode=null;
this.grid.onMouseOut(e);
if(!this.isIntraRowEvent(e)){this.grid.onMouseOutRow(e)
}}}});
dojo.declare("dojox.grid.contentBuilder",dojox.grid.Builder,{update:function(){this.prepareHtml()
},prepareHtml:function(){var defaultGet=this.grid.get,rows=this.view.structure.rows;
for(var j=0,row;
(row=rows[j]);
j++){for(var i=0,cell;
(cell=row[i]);
i++){cell.get=cell.get||(cell.value==undefined)&&defaultGet;
cell.markup=this.generateCellMarkup(cell,cell.cellStyles,cell.cellClasses,false)
}}},generateHtml:function(inDataIndex,inRowIndex){var html=[this._table],v=this.view,obr=v.onBeforeRow,rows=v.structure.rows;
obr&&obr(inRowIndex,rows);
for(var j=0,row;
(row=rows[j]);
j++){if(row.hidden||row.header){continue
}html.push(!row.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var i=0,cell,m,cc,cs;
(cell=row[i]);
i++){m=cell.markup,cc=cell.customClasses=[],cs=cell.customStyles=[];
m[5]=cell.format(inDataIndex);
m[1]=cc.join(" ");
m[3]=cs.join(";");
html.push.apply(html,m)
}html.push("</tr>")
}html.push("</table>");
return html.join("")
},decorateEvent:function(e){e.rowNode=this.findRowTarget(e.target);
if(!e.rowNode){return false
}e.rowIndex=e.rowNode[dojox.grid.rowIndexTag];
this.baseDecorateEvent(e);
e.cell=this.grid.getCell(e.cellIndex);
return true
}});
dojo.declare("dojox.grid.headerBuilder",dojox.grid.Builder,{bogusClickTime:0,overResizeWidth:4,minColWidth:1,_table:'<table class="dojoxGrid-row-table" border="0" cellspacing="0" cellpadding="0" role="wairole:presentation"',update:function(){this.tableMap=new dojox.grid.tableMap(this.view.structure.rows)
},generateHtml:function(inGetValue,inValue){var html=[this._table],rows=this.view.structure.rows;
if(this.view.viewWidth){html.push([' style="width:',this.view.viewWidth,';"'].join(""))
}html.push(">");
dojox.grid.fire(this.view,"onBeforeRow",[-1,rows]);
for(var j=0,row;
(row=rows[j]);
j++){if(row.hidden){continue
}html.push(!row.invisible?"<tr>":'<tr class="dojoxGrid-invisible">');
for(var i=0,cell,markup;
(cell=row[i]);
i++){cell.customClasses=[];
cell.customStyles=[];
markup=this.generateCellMarkup(cell,cell.headerStyles,cell.headerClasses,true);
markup[5]=(inValue!=undefined?inValue:inGetValue(cell));
markup[3]=cell.customStyles.join(";");
markup[1]=cell.customClasses.join(" ");
html.push(markup.join(""))
}html.push("</tr>")
}html.push("</table>");
return html.join("")
},getCellX:function(e){var x=e.layerX;
if(dojo.isMoz){var n=dojox.grid.ascendDom(e.target,dojox.grid.makeNotTagName("th"));
x-=(n&&n.offsetLeft)||0
}var n=dojox.grid.ascendDom(e.target,function(){if(!n||n==e.cellNode){return false
}x+=(n.offsetLeft<0?0:n.offsetLeft);
return true
});
return x
},decorateEvent:function(e){this.baseDecorateEvent(e);
e.rowIndex=-1;
e.cellX=this.getCellX(e);
return true
},prepareLeftResize:function(e){var i=dojox.grid.getTdIndex(e.cellNode);
e.cellNode=(i?e.cellNode.parentNode.cells[i-1]:null);
e.cellIndex=(e.cellNode?this.getCellNodeIndex(e.cellNode):-1);
return Boolean(e.cellNode)
},canResize:function(e){if(!e.cellNode||e.cellNode.colSpan>1){return false
}var cell=this.grid.getCell(e.cellIndex);
return !cell.noresize&&!cell.isFlex()
},overLeftResizeArea:function(e){return(e.cellIndex>0)&&(e.cellX<this.overResizeWidth)&&this.prepareLeftResize(e)
},overRightResizeArea:function(e){return e.cellNode&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth)
},domousemove:function(e){var c=(this.overRightResizeArea(e)?"e-resize":(this.overLeftResizeArea(e)?"w-resize":""));
if(c&&!this.canResize(e)){c="not-allowed"
}e.sourceView.headerNode.style.cursor=c||""
},domousedown:function(e){if(!dojox.grid.drag.dragging){if((this.overRightResizeArea(e)||this.overLeftResizeArea(e))&&this.canResize(e)){this.beginColumnResize(e)
}}},doclick:function(e){if(new Date().getTime()<this.bogusClickTime){dojo.stopEvent(e);
return true
}},beginColumnResize:function(e){dojo.stopEvent(e);
var spanners=[],nodes=this.tableMap.findOverlappingNodes(e.cellNode);
for(var i=0,cell;
(cell=nodes[i]);
i++){spanners.push({node:cell,index:this.getCellNodeIndex(cell),width:cell.offsetWidth})
}var drag={view:e.sourceView,node:e.cellNode,index:e.cellIndex,w:e.cellNode.clientWidth,spanners:spanners};
dojox.grid.drag.start(e.cellNode,dojo.hitch(this,"doResizeColumn",drag),dojo.hitch(this,"endResizeColumn",drag),e)
},doResizeColumn:function(inDrag,inEvent){var w=inDrag.w+inEvent.deltaX;
if(w>=this.minColWidth){for(var i=0,s,sw;
(s=inDrag.spanners[i]);
i++){sw=s.width+inEvent.deltaX;
s.node.style.width=sw+"px";
inDrag.view.setColWidth(s.index,sw)
}inDrag.node.style.width=w+"px";
inDrag.view.setColWidth(inDrag.index,w)
}if(inDrag.view.flexCells&&!inDrag.view.testFlexCells()){var t=dojox.grid.findTable(inDrag.node);
t&&(t.style.width="")
}},endResizeColumn:function(inDrag){this.bogusClickTime=new Date().getTime()+30;
setTimeout(dojo.hitch(inDrag.view,"update"),50)
}});
dojo.declare("dojox.grid.tableMap",null,{constructor:function(inRows){this.mapRows(inRows)
},map:null,mapRows:function(inRows){var rowCount=inRows.length;
if(!rowCount){return 
}this.map=[];
for(var j=0,row;
(row=inRows[j]);
j++){this.map[j]=[]
}for(var j=0,row;
(row=inRows[j]);
j++){for(var i=0,x=0,cell,colSpan,rowSpan;
(cell=row[i]);
i++){while(this.map[j][x]){x++
}this.map[j][x]={c:i,r:j};
rowSpan=cell.rowSpan||1;
colSpan=cell.colSpan||1;
for(var y=0;
y<rowSpan;
y++){for(var s=0;
s<colSpan;
s++){this.map[j+y][x+s]=this.map[j][x]
}}x+=colSpan
}}},dumpMap:function(){for(var j=0,row,h="";
(row=this.map[j]);
j++,h=""){for(var i=0,cell;
(cell=row[i]);
i++){h+=cell.r+","+cell.c+"   "
}console.log(h)
}},getMapCoords:function(inRow,inCol){for(var j=0,row;
(row=this.map[j]);
j++){for(var i=0,cell;
(cell=row[i]);
i++){if(cell.c==inCol&&cell.r==inRow){return{j:j,i:i}
}}}return{j:-1,i:-1}
},getNode:function(inTable,inRow,inCol){var row=inTable&&inTable.rows[inRow];
return row&&row.cells[inCol]
},_findOverlappingNodes:function(inTable,inRow,inCol){var nodes=[];
var m=this.getMapCoords(inRow,inCol);
var row=this.map[m.j];
for(var j=0,row;
(row=this.map[j]);
j++){if(j==m.j){continue
}with(row[m.i]){var n=this.getNode(inTable,r,c);
if(n){nodes.push(n)
}}}return nodes
},findOverlappingNodes:function(inNode){return this._findOverlappingNodes(dojox.grid.findTable(inNode),dojox.grid.getTrIndex(inNode.parentNode),dojox.grid.getTdIndex(inNode))
}});
dojox.grid.rowIndexTag="gridRowIndex"
}}});