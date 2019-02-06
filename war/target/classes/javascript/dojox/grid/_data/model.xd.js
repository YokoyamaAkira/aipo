dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.model"],["require","dojox.grid._data.fields"]],defineResource:function(A){if(!A._hasResource["dojox.grid._data.model"]){A._hasResource["dojox.grid._data.model"]=true;
A.provide("dojox.grid._data.model");
A.require("dojox.grid._data.fields");
A.declare("dojox.grid.data.Model",null,{constructor:function(B,C){this.observers=[];
this.fields=new dojox.grid.data.Fields();
if(B){this.fields.set(B)
}this.setData(C)
},count:0,updating:0,observer:function(B,C){this.observers.push({o:B,p:C||"model"})
},notObserver:function(D){for(var E=0,C,B;
(B=this.observers[E]);
E++){if(B.o==D){this.observers.splice(E,1);
return 
}}},notify:function(G,F){if(!this.isUpdating()){var D=F||[];
for(var E=0,C,B;
(B=this.observers[E]);
E++){C=B.p+G,B=B.o;
(C in B)&&(B[C].apply(B,D))
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
},makeComparator:function(G){var D,E,C,B=null;
for(var F=G.length-1;
F>=0;
F--){D=G[F];
E=Math.abs(D)-1;
if(E>=0){C=this.fields.get(E);
B=this.generateComparator(C.compare,C.key,D>0,B)
}}return B
},sort:null,dummy:0});
A.declare("dojox.grid.data.Rows",dojox.grid.data.Model,{allChange:function(){this.notify("AllChange",arguments);
this.notify("Change",arguments)
},rowChange:function(){this.notify("RowChange",arguments)
},datumChange:function(){this.notify("DatumChange",arguments)
},beginModifyRow:function(B){if(!this.cache[B]){this.cache[B]=this.copyRow(B)
}},endModifyRow:function(B){var C=this.cache[B];
if(C){var D=this.getRow(B);
if(!dojox.grid.arrayCompare(C,D)){this.update(C,D,B)
}delete this.cache[B]
}},cancelModifyRow:function(B){var C=this.cache[B];
if(C){this.setRow(C,B);
delete this.cache[B]
}},generateComparator:function(D,E,C,B){return function(G,F){var H=D(G[E],F[E]);
return H?(C?H:-H):B&&B(G,F)
}
}});
A.declare("dojox.grid.data.Table",dojox.grid.data.Rows,{constructor:function(){this.cache=[]
},colCount:0,data:null,cache:null,measure:function(){this.count=this.getRowCount();
this.colCount=this.getColCount();
this.allChange()
},getRowCount:function(){return(this.data?this.data.length:0)
},getColCount:function(){return(this.data&&this.data.length?this.data[0].length:this.fields.count())
},badIndex:function(C,B){console.debug("dojox.grid.data.Table: badIndex")
},isGoodIndex:function(B,C){return(B>=0&&B<this.count&&(arguments.length<2||(C>=0&&C<this.colCount)))
},getRow:function(B){return this.data[B]
},copyRow:function(B){return this.getRow(B).slice(0)
},getDatum:function(B,C){return this.data[B][C]
},get:function(){throw ('Plain "get" no longer supported. Use "getRow" or "getDatum".')
},setData:function(B){this.data=(B||[]);
this.allChange()
},setRow:function(C,B){this.data[B]=C;
this.rowChange(C,B);
this.change()
},setDatum:function(B,D,C){this.data[D][C]=B;
this.datumChange(B,D,C)
},set:function(){throw ('Plain "set" no longer supported. Use "setData", "setRow", or "setDatum".')
},setRows:function(C,B){for(var E=0,D=C.length,F=B;
E<D;
E++,F++){this.setRow(C[E],F)
}},update:function(D,C,B){return true
},_insert:function(C,B){dojox.grid.arrayInsert(this.data,B,C);
this.count++;
return true
},_remove:function(B){for(var C=B.length-1;
C>=0;
C--){dojox.grid.arrayRemove(this.data,B[C])
}this.count-=B.length;
return true
},sort:function(){this.data.sort(this.makeComparator(arguments))
},swap:function(B,C){dojox.grid.arraySwap(this.data,B,C);
this.rowChange(this.getRow(B),B);
this.rowChange(this.getRow(C),C);
this.change()
},dummy:0});
A.declare("dojox.grid.data.Objects",dojox.grid.data.Table,{constructor:function(B,C,D){if(!B){this.autoAssignFields()
}},autoAssignFields:function(){var B=this.data[0],C=0;
for(var D in B){this.fields.get(C++).key=D
}},getDatum:function(B,C){return this.data[B][this.fields.get(C).key]
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
},requestRows:function(B,C){},rowsProvided:function(B,C){this.requests--;
if(this.requests==0){this.requestsPending(false)
}},requestPage:function(B){var D=this.pageToRow(B);
var C=Math.min(this.rowsPerPage,this.count-D);
if(C>0){this.requests++;
this.requestsPending(true);
setTimeout(A.hitch(this,"requestRows",D,C),1)
}},needPage:function(B){if(!this.pages[B]){this.pages[B]=true;
this.requestPage(B)
}},preparePage:function(B,D){if(B<this.bop||B>=this.eop){var C=this.rowToPage(B);
this.needPage(C);
this.bop=C*this.rowsPerPage;
this.eop=this.bop+(this.rowsPerPage||this.count)
}},isRowLoaded:function(B){return Boolean(this.data[B])
},removePages:function(B){for(var C=0,D;
((D=B[C])!=undefined);
C++){this.pages[this.rowToPage(D)]=false
}this.bop=this.eop=-1
},remove:function(B){this.removePages(B);
dojox.grid.data.Table.prototype.remove.apply(this,arguments)
},getRow:function(B){var C=this.data[B];
if(!C){this.preparePage(B)
}return C
},getDatum:function(B,C){var D=this.getRow(B);
return(D?D[C]:this.fields.get(C).na)
},setDatum:function(B,E,C){var D=this.getRow(E);
if(D){D[C]=B;
this.datumChange(B,E,C)
}else{console.debug("["+this.declaredClass+"] dojox.grid.data.dynamic.set: cannot set data on an non-loaded row")
}},canSort:function(){return false
}});
dojox.grid.data.table=dojox.grid.data.Table;
dojox.grid.data.dynamic=dojox.grid.data.Dyanamic;
A.declare("dojox.grid.data.DojoData",dojox.grid.data.Dynamic,{constructor:function(E,C,D){this.count=1;
this._rowIdentities={};
if(D){A.mixin(this,D)
}if(this.store){var B=this.store.getFeatures();
this._canNotify=B["dojo.data.api.Notification"];
this._canWrite=B["dojo.data.api.Write"];
if(this._canNotify){A.connect(this.store,"onSet",this,"_storeDatumChange")
}}},markupFactory:function(C,B){return new dojox.grid.data.DojoData(null,null,C)
},query:{name:"*"},store:null,_canNotify:false,_canWrite:false,_rowIdentities:{},clientSort:false,setData:function(B){this.store=B;
this.data=[];
this.allChange()
},setRowCount:function(B){this.count=B;
this.allChange()
},beginReturn:function(B){if(this.count!=B){this.setRowCount(B)
}},_setupFields:function(B){if(this.fields._nameMaps){return 
}var D={};
var C=A.map(this.store.getAttributes(B),function(F,E){D[F]=E;
D[E+".idx"]=F;
return{name:F,key:F}
},this);
this.fields._nameMaps=D;
this.fields.set(C);
this.notify("FieldsChange")
},_getRowFromItem:function(B){},processRows:function(B,C){if(!B){return 
}this._setupFields(B[0]);
A.forEach(B,function(E,D){var F={};
F.__dojo_data_item=E;
A.forEach(this.fields.values,function(G){F[G.name]=this.store.getValue(E,G.name)||""
},this);
this._rowIdentities[this.store.getIdentity(E)]=C.start+D;
this.setRow(F,C.start+D)
},this)
},requestRows:function(B,C){var E=B||0;
var D={start:E,count:this.rowsPerPage,query:this.query,onBegin:A.hitch(this,"beginReturn"),onComplete:A.hitch(this,"processRows")};
this.store.fetch(D)
},getDatum:function(B,C){var E=this.getRow(B);
var D=this.fields.values[C];
return E&&D?E[D.name]:D?D.na:"?"
},setDatum:function(E,D,C){var B=this.fields._nameMaps[C+".idx"];
if(B){this.data[D][B]=E;
this.datumChange(E,D,C)
}},copyRow:function(B){var F={};
var D={};
var E=this.getRow(B);
for(var C in E){if(E[C]!=D[C]){F[C]=E[C]
}}return F
},_attrCompare:function(C,B){A.forEach(this.fields.values,function(D){if(C[D.name]!=B[D.name]){return false
}},this);
return true
},endModifyRow:function(B){var C=this.cache[B];
if(C){var D=this.getRow(B);
if(!this._attrCompare(C,D)){this.update(C,D,B)
}delete this.cache[B]
}},cancelModifyRow:function(B){var C=this.cache[B];
if(C){this.setRow(C,B);
delete this.cache[B]
}},_storeDatumChange:function(E,G,H,C){var F=this._rowIdentities[this.store.getIdentity(E)];
var B=this.getRow(F);
B[G]=C;
var D=this.fields._nameMaps[G];
this.notify("DatumChange",[C,F,D])
},datumChange:function(D,C,B){if(this._canWrite){var F=this.getRow(C);
var E=this.fields._nameMaps[B+".idx"];
this.store.setValue(F.__dojo_data_item,E,D)
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