if(!dojo._hasResource["dojox.grid._data.model"]){dojo._hasResource["dojox.grid._data.model"]=true;
dojo.provide("dojox.grid._data.model");
dojo.require("dojox.grid._data.fields");
dojo.declare("dojox.grid.data.Model",null,{constructor:function(A,B){this.observers=[];
this.fields=new dojox.grid.data.Fields();
if(A){this.fields.set(A)
}this.setData(B)
},count:0,updating:0,observer:function(A,B){this.observers.push({o:A,p:B||"model"})
},notObserver:function(A){for(var B=0,D,C;
(C=this.observers[B]);
B++){if(C.o==A){this.observers.splice(B,1);
return 
}}},notify:function(D,C){if(!this.isUpdating()){var A=C||[];
for(var B=0,F,E;
(E=this.observers[B]);
B++){F=E.p+D,E=E.o;
(F in E)&&(E[F].apply(E,A))
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
},insert:function(A){if(!this._insert.apply(this,arguments)){return false
}this.insertion.apply(this,dojo._toArray(arguments,1));
return true
},remove:function(A){if(!this._remove.apply(this,arguments)){return false
}this.removal.apply(this,arguments);
return true
},canSort:function(){return this.sort!=null
},makeComparator:function(D){var A,B,E,F=null;
for(var C=D.length-1;
C>=0;
C--){A=D[C];
B=Math.abs(A)-1;
if(B>=0){E=this.fields.get(B);
F=this.generateComparator(E.compare,E.key,A>0,F)
}}return F
},sort:null,dummy:0});
dojo.declare("dojox.grid.data.Rows",dojox.grid.data.Model,{allChange:function(){this.notify("AllChange",arguments);
this.notify("Change",arguments)
},rowChange:function(){this.notify("RowChange",arguments)
},datumChange:function(){this.notify("DatumChange",arguments)
},beginModifyRow:function(A){if(!this.cache[A]){this.cache[A]=this.copyRow(A)
}},endModifyRow:function(B){var C=this.cache[B];
if(C){var A=this.getRow(B);
if(!dojox.grid.arrayCompare(C,A)){this.update(C,A,B)
}delete this.cache[B]
}},cancelModifyRow:function(A){var B=this.cache[A];
if(B){this.setRow(B,A);
delete this.cache[A]
}},generateComparator:function(A,B,D,C){return function(G,F){var E=A(G[B],F[B]);
return E?(D?E:-E):C&&C(G,F)
}
}});
dojo.declare("dojox.grid.data.Table",dojox.grid.data.Rows,{constructor:function(){this.cache=[]
},colCount:0,data:null,cache:null,measure:function(){this.count=this.getRowCount();
this.colCount=this.getColCount();
this.allChange()
},getRowCount:function(){return(this.data?this.data.length:0)
},getColCount:function(){return(this.data&&this.data.length?this.data[0].length:this.fields.count())
},badIndex:function(B,A){console.debug("dojox.grid.data.Table: badIndex")
},isGoodIndex:function(A,B){return(A>=0&&A<this.count&&(arguments.length<2||(B>=0&&B<this.colCount)))
},getRow:function(A){return this.data[A]
},copyRow:function(A){return this.getRow(A).slice(0)
},getDatum:function(A,B){return this.data[A][B]
},get:function(){throw ('Plain "get" no longer supported. Use "getRow" or "getDatum".')
},setData:function(A){this.data=(A||[]);
this.allChange()
},setRow:function(B,A){this.data[A]=B;
this.rowChange(B,A);
this.change()
},setDatum:function(B,A,C){this.data[A][C]=B;
this.datumChange(B,A,C)
},set:function(){throw ('Plain "set" no longer supported. Use "setData", "setRow", or "setDatum".')
},setRows:function(E,D){for(var B=0,A=E.length,C=D;
B<A;
B++,C++){this.setRow(E[B],C)
}},update:function(A,C,B){return true
},_insert:function(B,A){dojox.grid.arrayInsert(this.data,A,B);
this.count++;
return true
},_remove:function(A){for(var B=A.length-1;
B>=0;
B--){dojox.grid.arrayRemove(this.data,A[B])
}this.count-=A.length;
return true
},sort:function(){this.data.sort(this.makeComparator(arguments))
},swap:function(A,B){dojox.grid.arraySwap(this.data,A,B);
this.rowChange(this.getRow(A),A);
this.rowChange(this.getRow(B),B);
this.change()
},dummy:0});
dojo.declare("dojox.grid.data.Objects",dojox.grid.data.Table,{constructor:function(B,C,A){if(!B){this.autoAssignFields()
}},autoAssignFields:function(){var B=this.data[0],C=0;
for(var A in B){this.fields.get(C++).key=A
}},getDatum:function(A,B){return this.data[A][this.fields.get(B).key]
}});
dojo.declare("dojox.grid.data.Dynamic",dojox.grid.data.Table,{constructor:function(){this.page=[];
this.pages=[]
},page:null,pages:null,rowsPerPage:100,requests:0,bop:-1,eop:-1,clearData:function(){this.pages=[];
this.bop=this.eop=-1;
this.setData([])
},getRowCount:function(){return this.count
},getColCount:function(){return this.fields.count()
},setRowCount:function(A){this.count=A;
this.change()
},requestsPending:function(A){},rowToPage:function(A){return(this.rowsPerPage?Math.floor(A/this.rowsPerPage):A)
},pageToRow:function(A){return(this.rowsPerPage?this.rowsPerPage*A:A)
},requestRows:function(A,B){},rowsProvided:function(A,B){this.requests--;
if(this.requests==0){this.requestsPending(false)
}},requestPage:function(B){var A=this.pageToRow(B);
var C=Math.min(this.rowsPerPage,this.count-A);
if(C>0){this.requests++;
this.requestsPending(true);
setTimeout(dojo.hitch(this,"requestRows",A,C),1)
}},needPage:function(A){if(!this.pages[A]){this.pages[A]=true;
this.requestPage(A)
}},preparePage:function(B,A){if(B<this.bop||B>=this.eop){var C=this.rowToPage(B);
this.needPage(C);
this.bop=C*this.rowsPerPage;
this.eop=this.bop+(this.rowsPerPage||this.count)
}},isRowLoaded:function(A){return Boolean(this.data[A])
},removePages:function(B){for(var C=0,A;
((A=B[C])!=undefined);
C++){this.pages[this.rowToPage(A)]=false
}this.bop=this.eop=-1
},remove:function(A){this.removePages(A);
dojox.grid.data.Table.prototype.remove.apply(this,arguments)
},getRow:function(A){var B=this.data[A];
if(!B){this.preparePage(A)
}return B
},getDatum:function(B,C){var A=this.getRow(B);
return(A?A[C]:this.fields.get(C).na)
},setDatum:function(C,B,D){var A=this.getRow(B);
if(A){A[D]=C;
this.datumChange(C,B,D)
}else{console.debug("["+this.declaredClass+"] dojox.grid.data.dynamic.set: cannot set data on an non-loaded row")
}},canSort:function(){return false
}});
dojox.grid.data.table=dojox.grid.data.Table;
dojox.grid.data.dynamic=dojox.grid.data.Dyanamic;
dojo.declare("dojox.grid.data.DojoData",dojox.grid.data.Dynamic,{constructor:function(B,D,A){this.count=1;
this._rowIdentities={};
if(A){dojo.mixin(this,A)
}if(this.store){var C=this.store.getFeatures();
this._canNotify=C["dojo.data.api.Notification"];
this._canWrite=C["dojo.data.api.Write"];
if(this._canNotify){dojo.connect(this.store,"onSet",this,"_storeDatumChange")
}}},markupFactory:function(B,A){return new dojox.grid.data.DojoData(null,null,B)
},query:{name:"*"},store:null,_canNotify:false,_canWrite:false,_rowIdentities:{},clientSort:false,setData:function(A){this.store=A;
this.data=[];
this.allChange()
},setRowCount:function(A){this.count=A;
this.allChange()
},beginReturn:function(A){if(this.count!=A){this.setRowCount(A)
}},_setupFields:function(B){if(this.fields._nameMaps){return 
}var A={};
var C=dojo.map(this.store.getAttributes(B),function(D,E){A[D]=E;
A[E+".idx"]=D;
return{name:D,key:D}
},this);
this.fields._nameMaps=A;
this.fields.set(C);
this.notify("FieldsChange")
},_getRowFromItem:function(A){},processRows:function(A,B){if(!A){return 
}this._setupFields(A[0]);
dojo.forEach(A,function(E,D){var C={};
C.__dojo_data_item=E;
dojo.forEach(this.fields.values,function(F){C[F.name]=this.store.getValue(E,F.name)||""
},this);
this._rowIdentities[this.store.getIdentity(E)]=B.start+D;
this.setRow(C,B.start+D)
},this)
},requestRows:function(C,D){var B=C||0;
var A={start:B,count:this.rowsPerPage,query:this.query,onBegin:dojo.hitch(this,"beginReturn"),onComplete:dojo.hitch(this,"processRows")};
this.store.fetch(A)
},getDatum:function(C,D){var B=this.getRow(C);
var A=this.fields.values[D];
return B&&A?B[A.name]:A?A.na:"?"
},setDatum:function(B,A,D){var C=this.fields._nameMaps[D+".idx"];
if(C){this.data[A][C]=B;
this.datumChange(B,A,D)
}},copyRow:function(D){var C={};
var A={};
var B=this.getRow(D);
for(var E in B){if(B[E]!=A[E]){C[E]=B[E]
}}return C
},_attrCompare:function(B,A){dojo.forEach(this.fields.values,function(C){if(B[C.name]!=A[C.name]){return false
}},this);
return true
},endModifyRow:function(B){var C=this.cache[B];
if(C){var A=this.getRow(B);
if(!this._attrCompare(C,A)){this.update(C,A,B)
}delete this.cache[B]
}},cancelModifyRow:function(A){var B=this.cache[A];
if(B){this.setRow(B,A);
delete this.cache[A]
}},_storeDatumChange:function(B,E,F,G){var C=this._rowIdentities[this.store.getIdentity(B)];
var D=this.getRow(C);
D[E]=G;
var A=this.fields._nameMaps[E];
this.notify("DatumChange",[G,C,A])
},datumChange:function(A,E,D){if(this._canWrite){var C=this.getRow(E);
var B=this.fields._nameMaps[D+".idx"];
this.store.setValue(C.__dojo_data_item,B,A)
}else{this.notify("DatumChange",arguments)
}},insertion:function(){console.debug("Insertion",arguments);
this.notify("Insertion",arguments);
this.notify("Change",arguments)
},removal:function(){console.debug("Removal",arguments);
this.notify("Removal",arguments);
this.notify("Change",arguments)
},canSort:function(){return this.clientSort
}})
};