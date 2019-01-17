dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.model"],["require","dojox.grid._data.fields"]],defineResource:function(A){if(!A._hasResource["dojox.grid._data.model"]){A._hasResource["dojox.grid._data.model"]=true;
A.provide("dojox.grid._data.model");
A.require("dojox.grid._data.fields");
A.declare("dojox.grid.data.Model",null,{constructor:function(C,B){this.observers=[];
this.fields=new dojox.grid.data.Fields();
if(C){this.fields.set(C)
}this.setData(B)
},count:0,updating:0,observer:function(C,B){this.observers.push({o:C,p:B||"model"})
},notObserver:function(C){for(var D=0,B,E;
(E=this.observers[D]);
D++){if(E.o==C){this.observers.splice(D,1);
return 
}}},notify:function(F,E){if(!this.isUpdating()){var C=E||[];
for(var D=0,B,G;
(G=this.observers[D]);
D++){B=G.p+F,G=G.o;
(B in G)&&(G[B].apply(G,C))
}}},clear:function(){this.fields.clear();
this.clearData()
},beginUpdate:function(){this.updating++
},endUpdate:function(){if(this.updating){this.updating--
}},isUpdating:function(){return Boolean(this.updating)
},clearData:function(){this.setData(null)
},change:function(){this.notify("Change",arguments)
},insertion:function(){this.notify("Insertion",arguments);
this.notify("Change",arguments)
},removal:function(){this.notify("Removal",arguments);
this.notify("Change",arguments)
},insert:function(B){if(!this._insert.apply(this,arguments)){return false
}this.insertion.apply(this,A._toArray(arguments,1));
return true
},remove:function(B){if(!this._remove.apply(this,arguments)){return false
}this.removal.apply(this,arguments);
return true
},canSort:function(){return this.sort!=null
},makeComparator:function(F){var C,D,G,B=null;
for(var E=F.length-1;
E>=0;
E--){C=F[E];
D=Math.abs(C)-1;
if(D>=0){G=this.fields.get(D);
B=this.generateComparator(G.compare,G.key,C>0,B)
}}return B
},sort:null,dummy:0});
A.declare("dojox.grid.data.Rows",dojox.grid.data.Model,{allChange:function(){this.notify("AllChange",arguments);
this.notify("Change",arguments)
},rowChange:function(){this.notify("RowChange",arguments)
},datumChange:function(){this.notify("DatumChange",arguments)
},beginModifyRow:function(B){if(!this.cache[B]){this.cache[B]=this.copyRow(B)
}},endModifyRow:function(D){var B=this.cache[D];
if(B){var C=this.getRow(D);
if(!dojox.grid.arrayCompare(B,C)){this.update(B,C,D)
}delete this.cache[D]
}},cancelModifyRow:function(C){var B=this.cache[C];
if(B){this.setRow(B,C);
delete this.cache[C]
}},generateComparator:function(C,D,B,E){return function(G,F){var H=C(G[D],F[D]);
return H?(B?H:-H):E&&E(G,F)
}
}});
A.declare("dojox.grid.data.Table",dojox.grid.data.Rows,{constructor:function(){this.cache=[]
},colCount:0,data:null,cache:null,measure:function(){this.count=this.getRowCount();
this.colCount=this.getColCount();
this.allChange()
},getRowCount:function(){return(this.data?this.data.length:0)
},getColCount:function(){return(this.data&&this.data.length?this.data[0].length:this.fields.count())
},badIndex:function(B,C){console.debug("dojox.grid.data.Table: badIndex")
},isGoodIndex:function(C,B){return(C>=0&&C<this.count&&(arguments.length<2||(B>=0&&B<this.colCount)))
},getRow:function(B){return this.data[B]
},copyRow:function(B){return this.getRow(B).slice(0)
},getDatum:function(C,B){return this.data[C][B]
},get:function(){throw ('Plain "get" no longer supported. Use "getRow" or "getDatum".')
},setData:function(B){this.data=(B||[]);
this.allChange()
},setRow:function(B,C){this.data[C]=B;
this.rowChange(B,C);
this.change()
},setDatum:function(D,C,B){this.data[C][B]=D;
this.datumChange(D,C,B)
},set:function(){throw ('Plain "set" no longer supported. Use "setData", "setRow", or "setDatum".')
},setRows:function(B,F){for(var D=0,C=B.length,E=F;
D<C;
D++,E++){this.setRow(B[D],E)
}},update:function(C,B,D){return true
},_insert:function(B,C){dojox.grid.arrayInsert(this.data,C,B);
this.count++;
return true
},_remove:function(C){for(var B=C.length-1;
B>=0;
B--){dojox.grid.arrayRemove(this.data,C[B])
}this.count-=C.length;
return true
},sort:function(){this.data.sort(this.makeComparator(arguments))
},swap:function(C,B){dojox.grid.arraySwap(this.data,C,B);
this.rowChange(this.getRow(C),C);
this.rowChange(this.getRow(B),B);
this.change()
},dummy:0});
A.declare("dojox.grid.data.Objects",dojox.grid.data.Table,{constructor:function(D,B,C){if(!D){this.autoAssignFields()
}},autoAssignFields:function(){var D=this.data[0],B=0;
for(var C in D){this.fields.get(B++).key=C
}},getDatum:function(C,B){return this.data[C][this.fields.get(B).key]
}});
A.declare("dojox.grid.data.Dynamic",dojox.grid.data.Table,{constructor:function(){this.page=[];
this.pages=[]
},page:null,pages:null,rowsPerPage:100,requests:0,bop:-1,eop:-1,clearData:function(){this.pages=[];
this.bop=this.eop=-1;
this.setData([])
},getRowCount:function(){return this.count
},getColCount:function(){return this.fields.count()
},setRowCount:function(B){this.count=B;
this.change()
},requestsPending:function(B){},rowToPage:function(B){return(this.rowsPerPage?Math.floor(B/this.rowsPerPage):B)
},pageToRow:function(B){return(this.rowsPerPage?this.rowsPerPage*B:B)
},requestRows:function(C,B){},rowsProvided:function(C,B){this.requests--;
if(this.requests==0){this.requestsPending(false)
}},requestPage:function(D){var C=this.pageToRow(D);
var B=Math.min(this.rowsPerPage,this.count-C);
if(B>0){this.requests++;
this.requestsPending(true);
setTimeout(A.hitch(this,"requestRows",C,B),1)
}},needPage:function(B){if(!this.pages[B]){this.pages[B]=true;
this.requestPage(B)
}},preparePage:function(D,C){if(D<this.bop||D>=this.eop){var B=this.rowToPage(D);
this.needPage(B);
this.bop=B*this.rowsPerPage;
this.eop=this.bop+(this.rowsPerPage||this.count)
}},isRowLoaded:function(B){return Boolean(this.data[B])
},removePages:function(D){for(var B=0,C;
((C=D[B])!=undefined);
B++){this.pages[this.rowToPage(C)]=false
}this.bop=this.eop=-1
},remove:function(B){this.removePages(B);
dojox.grid.data.Table.prototype.remove.apply(this,arguments)
},getRow:function(C){var B=this.data[C];
if(!B){this.preparePage(C)
}return B
},getDatum:function(D,B){var C=this.getRow(D);
return(C?C[B]:this.fields.get(B).na)
},setDatum:function(E,D,B){var C=this.getRow(D);
if(C){C[B]=E;
this.datumChange(E,D,B)
}else{console.debug("["+this.declaredClass+"] dojox.grid.data.dynamic.set: cannot set data on an non-loaded row")
}},canSort:function(){return false
}});
dojox.grid.data.table=dojox.grid.data.Table;
dojox.grid.data.dynamic=dojox.grid.data.Dyanamic;
A.declare("dojox.grid.data.DojoData",dojox.grid.data.Dynamic,{constructor:function(D,B,C){this.count=1;
this._rowIdentities={};
if(C){A.mixin(this,C)
}if(this.store){var E=this.store.getFeatures();
this._canNotify=E["dojo.data.api.Notification"];
this._canWrite=E["dojo.data.api.Write"];
if(this._canNotify){A.connect(this.store,"onSet",this,"_storeDatumChange")
}}},markupFactory:function(B,C){return new dojox.grid.data.DojoData(null,null,B)
},query:{name:"*"},store:null,_canNotify:false,_canWrite:false,_rowIdentities:{},clientSort:false,setData:function(B){this.store=B;
this.data=[];
this.allChange()
},setRowCount:function(B){this.count=B;
this.allChange()
},beginReturn:function(B){if(this.count!=B){this.setRowCount(B)
}},_setupFields:function(D){if(this.fields._nameMaps){return 
}var C={};
var B=A.map(this.store.getAttributes(D),function(F,E){C[F]=E;
C[E+".idx"]=F;
return{name:F,key:F}
},this);
this.fields._nameMaps=C;
this.fields.set(B);
this.notify("FieldsChange")
},_getRowFromItem:function(B){},processRows:function(C,B){if(!C){return 
}this._setupFields(C[0]);
A.forEach(C,function(E,D){var F={};
F.__dojo_data_item=E;
A.forEach(this.fields.values,function(G){F[G.name]=this.store.getValue(E,G.name)||""
},this);
this._rowIdentities[this.store.getIdentity(E)]=B.start+D;
this.setRow(F,B.start+D)
},this)
},requestRows:function(E,B){var D=E||0;
var C={start:D,count:this.rowsPerPage,query:this.query,onBegin:A.hitch(this,"beginReturn"),onComplete:A.hitch(this,"processRows")};
this.store.fetch(C)
},getDatum:function(E,B){var D=this.getRow(E);
var C=this.fields.values[B];
return D&&C?D[C.name]:C?C.na:"?"
},setDatum:function(D,C,B){var E=this.fields._nameMaps[B+".idx"];
if(E){this.data[C][E]=D;
this.datumChange(D,C,B)
}},copyRow:function(F){var E={};
var C={};
var D=this.getRow(F);
for(var B in D){if(D[B]!=C[B]){E[B]=D[B]
}}return E
},_attrCompare:function(B,C){A.forEach(this.fields.values,function(D){if(B[D.name]!=C[D.name]){return false
}},this);
return true
},endModifyRow:function(D){var B=this.cache[D];
if(B){var C=this.getRow(D);
if(!this._attrCompare(B,C)){this.update(B,C,D)
}delete this.cache[D]
}},cancelModifyRow:function(C){var B=this.cache[C];
if(B){this.setRow(B,C);
delete this.cache[C]
}},_storeDatumChange:function(F,B,C,D){var G=this._rowIdentities[this.store.getIdentity(F)];
var H=this.getRow(G);
H[B]=D;
var E=this.fields._nameMaps[B];
this.notify("DatumChange",[D,G,E])
},datumChange:function(C,B,F){if(this._canWrite){var E=this.getRow(B);
var D=this.fields._nameMaps[F+".idx"];
this.store.setValue(E.__dojo_data_item,D,C)
}else{this.notify("DatumChange",arguments)
}},insertion:function(){console.debug("Insertion",arguments);
this.notify("Insertion",arguments);
this.notify("Change",arguments)
},removal:function(){console.debug("Removal",arguments);
this.notify("Removal",arguments);
this.notify("Change",arguments)
},canSort:function(){return this.clientSort
}})
}}});