if(!dojo._hasResource["dojox.grid._data.model"]){dojo._hasResource["dojox.grid._data.model"]=true;
dojo.provide("dojox.grid._data.model");
dojo.require("dojox.grid._data.fields");
dojo.declare("dojox.grid.data.Model",null,{constructor:function(B,A){this.observers=[];
this.fields=new dojox.grid.data.Fields();
if(B){this.fields.set(B)
}this.setData(A)
},count:0,updating:0,observer:function(B,A){this.observers.push({o:B,p:A||"model"})
},notObserver:function(B){for(var C=0,A,D;
(D=this.observers[C]);
C++){if(D.o==B){this.observers.splice(C,1);
return 
}}},notify:function(E,D){if(!this.isUpdating()){var B=D||[];
for(var C=0,A,F;
(F=this.observers[C]);
C++){A=F.p+E,F=F.o;
(A in F)&&(F[A].apply(F,B))
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
},makeComparator:function(E){var B,C,F,A=null;
for(var D=E.length-1;
D>=0;
D--){B=E[D];
C=Math.abs(B)-1;
if(C>=0){F=this.fields.get(C);
A=this.generateComparator(F.compare,F.key,B>0,A)
}}return A
},sort:null,dummy:0});
dojo.declare("dojox.grid.data.Rows",dojox.grid.data.Model,{allChange:function(){this.notify("AllChange",arguments);
this.notify("Change",arguments)
},rowChange:function(){this.notify("RowChange",arguments)
},datumChange:function(){this.notify("DatumChange",arguments)
},beginModifyRow:function(A){if(!this.cache[A]){this.cache[A]=this.copyRow(A)
}},endModifyRow:function(C){var A=this.cache[C];
if(A){var B=this.getRow(C);
if(!dojox.grid.arrayCompare(A,B)){this.update(A,B,C)
}delete this.cache[C]
}},cancelModifyRow:function(B){var A=this.cache[B];
if(A){this.setRow(A,B);
delete this.cache[B]
}},generateComparator:function(B,C,A,D){return function(F,E){var G=B(F[C],E[C]);
return G?(A?G:-G):D&&D(F,E)
}
}});
dojo.declare("dojox.grid.data.Table",dojox.grid.data.Rows,{constructor:function(){this.cache=[]
},colCount:0,data:null,cache:null,measure:function(){this.count=this.getRowCount();
this.colCount=this.getColCount();
this.allChange()
},getRowCount:function(){return(this.data?this.data.length:0)
},getColCount:function(){return(this.data&&this.data.length?this.data[0].length:this.fields.count())
},badIndex:function(A,B){console.debug("dojox.grid.data.Table: badIndex")
},isGoodIndex:function(B,A){return(B>=0&&B<this.count&&(arguments.length<2||(A>=0&&A<this.colCount)))
},getRow:function(A){return this.data[A]
},copyRow:function(A){return this.getRow(A).slice(0)
},getDatum:function(B,A){return this.data[B][A]
},get:function(){throw ('Plain "get" no longer supported. Use "getRow" or "getDatum".')
},setData:function(A){this.data=(A||[]);
this.allChange()
},setRow:function(A,B){this.data[B]=A;
this.rowChange(A,B);
this.change()
},setDatum:function(C,B,A){this.data[B][A]=C;
this.datumChange(C,B,A)
},set:function(){throw ('Plain "set" no longer supported. Use "setData", "setRow", or "setDatum".')
},setRows:function(A,E){for(var C=0,B=A.length,D=E;
C<B;
C++,D++){this.setRow(A[C],D)
}},update:function(B,A,C){return true
},_insert:function(A,B){dojox.grid.arrayInsert(this.data,B,A);
this.count++;
return true
},_remove:function(B){for(var A=B.length-1;
A>=0;
A--){dojox.grid.arrayRemove(this.data,B[A])
}this.count-=B.length;
return true
},sort:function(){this.data.sort(this.makeComparator(arguments))
},swap:function(B,A){dojox.grid.arraySwap(this.data,B,A);
this.rowChange(this.getRow(B),B);
this.rowChange(this.getRow(A),A);
this.change()
},dummy:0});
dojo.declare("dojox.grid.data.Objects",dojox.grid.data.Table,{constructor:function(C,A,B){if(!C){this.autoAssignFields()
}},autoAssignFields:function(){var C=this.data[0],A=0;
for(var B in C){this.fields.get(A++).key=B
}},getDatum:function(B,A){return this.data[B][this.fields.get(A).key]
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
},requestRows:function(B,A){},rowsProvided:function(B,A){this.requests--;
if(this.requests==0){this.requestsPending(false)
}},requestPage:function(C){var B=this.pageToRow(C);
var A=Math.min(this.rowsPerPage,this.count-B);
if(A>0){this.requests++;
this.requestsPending(true);
setTimeout(dojo.hitch(this,"requestRows",B,A),1)
}},needPage:function(A){if(!this.pages[A]){this.pages[A]=true;
this.requestPage(A)
}},preparePage:function(C,B){if(C<this.bop||C>=this.eop){var A=this.rowToPage(C);
this.needPage(A);
this.bop=A*this.rowsPerPage;
this.eop=this.bop+(this.rowsPerPage||this.count)
}},isRowLoaded:function(A){return Boolean(this.data[A])
},removePages:function(C){for(var A=0,B;
((B=C[A])!=undefined);
A++){this.pages[this.rowToPage(B)]=false
}this.bop=this.eop=-1
},remove:function(A){this.removePages(A);
dojox.grid.data.Table.prototype.remove.apply(this,arguments)
},getRow:function(B){var A=this.data[B];
if(!A){this.preparePage(B)
}return A
},getDatum:function(C,A){var B=this.getRow(C);
return(B?B[A]:this.fields.get(A).na)
},setDatum:function(D,C,A){var B=this.getRow(C);
if(B){B[A]=D;
this.datumChange(D,C,A)
}else{console.debug("["+this.declaredClass+"] dojox.grid.data.dynamic.set: cannot set data on an non-loaded row")
}},canSort:function(){return false
}});
dojox.grid.data.table=dojox.grid.data.Table;
dojox.grid.data.dynamic=dojox.grid.data.Dyanamic;
dojo.declare("dojox.grid.data.DojoData",dojox.grid.data.Dynamic,{constructor:function(C,A,B){this.count=1;
this._rowIdentities={};
if(B){dojo.mixin(this,B)
}if(this.store){var D=this.store.getFeatures();
this._canNotify=D["dojo.data.api.Notification"];
this._canWrite=D["dojo.data.api.Write"];
if(this._canNotify){dojo.connect(this.store,"onSet",this,"_storeDatumChange")
}}},markupFactory:function(A,B){return new dojox.grid.data.DojoData(null,null,A)
},query:{name:"*"},store:null,_canNotify:false,_canWrite:false,_rowIdentities:{},clientSort:false,setData:function(A){this.store=A;
this.data=[];
this.allChange()
},setRowCount:function(A){this.count=A;
this.allChange()
},beginReturn:function(A){if(this.count!=A){this.setRowCount(A)
}},_setupFields:function(C){if(this.fields._nameMaps){return 
}var B={};
var A=dojo.map(this.store.getAttributes(C),function(E,D){B[E]=D;
B[D+".idx"]=E;
return{name:E,key:E}
},this);
this.fields._nameMaps=B;
this.fields.set(A);
this.notify("FieldsChange")
},_getRowFromItem:function(A){},processRows:function(B,A){if(!B){return 
}this._setupFields(B[0]);
dojo.forEach(B,function(D,C){var E={};
E.__dojo_data_item=D;
dojo.forEach(this.fields.values,function(F){E[F.name]=this.store.getValue(D,F.name)||""
},this);
this._rowIdentities[this.store.getIdentity(D)]=A.start+C;
this.setRow(E,A.start+C)
},this)
},requestRows:function(D,A){var C=D||0;
var B={start:C,count:this.rowsPerPage,query:this.query,onBegin:dojo.hitch(this,"beginReturn"),onComplete:dojo.hitch(this,"processRows")};
this.store.fetch(B)
},getDatum:function(D,A){var C=this.getRow(D);
var B=this.fields.values[A];
return C&&B?C[B.name]:B?B.na:"?"
},setDatum:function(C,B,A){var D=this.fields._nameMaps[A+".idx"];
if(D){this.data[B][D]=C;
this.datumChange(C,B,A)
}},copyRow:function(E){var D={};
var B={};
var C=this.getRow(E);
for(var A in C){if(C[A]!=B[A]){D[A]=C[A]
}}return D
},_attrCompare:function(A,B){dojo.forEach(this.fields.values,function(C){if(A[C.name]!=B[C.name]){return false
}},this);
return true
},endModifyRow:function(C){var A=this.cache[C];
if(A){var B=this.getRow(C);
if(!this._attrCompare(A,B)){this.update(A,B,C)
}delete this.cache[C]
}},cancelModifyRow:function(B){var A=this.cache[B];
if(A){this.setRow(A,B);
delete this.cache[B]
}},_storeDatumChange:function(E,A,B,C){var F=this._rowIdentities[this.store.getIdentity(E)];
var G=this.getRow(F);
G[A]=C;
var D=this.fields._nameMaps[A];
this.notify("DatumChange",[C,F,D])
},datumChange:function(B,A,E){if(this._canWrite){var D=this.getRow(A);
var C=this.fields._nameMaps[E+".idx"];
this.store.setValue(D.__dojo_data_item,C,B)
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