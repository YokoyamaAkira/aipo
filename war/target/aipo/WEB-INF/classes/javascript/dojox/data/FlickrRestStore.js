if(!dojo._hasResource["dojox.data.FlickrRestStore"]){dojo._hasResource["dojox.data.FlickrRestStore"]=true;
dojo.provide("dojox.data.FlickrRestStore");
dojo.require("dojox.data.FlickrStore");
dojo.declare("dojox.data.FlickrRestStore",dojox.data.FlickrStore,{constructor:function(A){if(A&&A.label){if(A.label){this.label=A.label
}if(A.apikey){this._apikey=A.apikey
}}this._cache=[];
this._prevRequests={};
this._handlers={};
this._prevRequestRanges=[];
this._maxPhotosPerUser={};
this._id=dojox.data.FlickrRestStore.prototype._id++
},_id:0,_requestCount:0,_flickrRestUrl:"http://www.flickr.com/services/rest/",_apikey:null,_storeRef:"_S",_cache:null,_prevRequests:null,_handlers:null,_sortAttributes:{"date-posted":true,"date-taken":true,interestingness:true},_fetchItems:function(D,C,J){var G={};
if(!D.query){D.query=G={}
}else{dojo.mixin(G,D.query)
}var A=[];
var P=[];
var L="FlickrRestStoreCallback_"+this._id+"_"+(++this._requestCount);
var U={format:"json",method:"flickr.photos.search",api_key:this._apikey,extras:"owner_name,date_upload,date_taken",jsoncallback:L};
var R=false;
if(G.userid){R=true;
U.user_id=D.query.userid;
A.push("userid"+D.query.userid)
}if(G.apikey){R=true;
U.api_key=D.query.apikey;
P.push("api"+D.query.apikey)
}else{throw Error("dojox.data.FlickrRestStore: An API key must be specified.")
}D._curCount=D.count;
if(G.page){U.page=D.query.page;
P.push("page"+U.page)
}else{if(typeof (D.start)!="undefined"&&D.start!=null){if(!D.count){D.count=20
}var O=D.start%D.count;
var E=D.start,I=D.count;
if(O!=0){if(E<I/2){I=E+I;
E=0
}else{var H=20,Q=2;
for(var V=H;
V>0;
V--){if(E%V==0&&(E/V)>=I){Q=V;
break
}}I=E/Q
}D._realStart=D.start;
D._realCount=D.count;
D._curStart=E;
D._curCount=I
}else{D._realStart=D._realCount=null;
D._curStart=D.start;
D._curCount=D.count
}U.page=(E/I)+1;
P.push("page"+U.page)
}}if(D._curCount){U.per_page=D._curCount;
P.push("count"+D._curCount)
}if(G.lang){U.lang=D.query.lang;
A.push("lang"+D.lang)
}var F=this._flickrRestUrl;
if(G.setid){U.method="flickr.photosets.getPhotos";
U.photoset_id=D.query.set;
A.push("set"+D.query.set)
}if(G.tags){if(G.tags instanceof Array){U.tags=G.tags.join(",")
}else{U.tags=G.tags
}A.push("tags"+U.tags);
if(G.tag_mode&&(G.tag_mode.toLowerCase()=="any"||G.tag_mode.toLowerCase()=="all")){U.tag_mode=G.tag_mode
}}if(G.text){U.text=G.text;
A.push("text:"+G.text)
}if(G.sort&&G.sort.length>0){if(!G.sort[0].attribute){G.sort[0].attribute="date-posted"
}if(this._sortAttributes[G.sort[0].attribute]){if(G.sort[0].descending){U.sort=G.sort[0].attribute+"-desc"
}else{U.sort=G.sort[0].attribute+"-asc"
}}}else{U.sort="date-posted-asc"
}A.push("sort:"+U.sort);
A=A.join(".");
P=P.length>0?"."+P.join("."):"";
var M=A+P;
D={query:G,count:D._curCount,start:D._curStart,_realCount:D._realCount,_realStart:D._realStart,onBegin:D.onBegin,onComplete:D.onComplete,onItem:D.onItem};
var K={request:D,fetchHandler:C,errorHandler:J};
if(this._handlers[M]){this._handlers[M].push(K);
return 
}this._handlers[M]=[K];
var S=this;
var W=null;
var T={url:this._flickrRestUrl,preventCache:true,content:U};
var B=function(Z,d,b){var e=b.request.onBegin;
b.request.onBegin=null;
var a;
var c=b.request;
if(typeof (c._realStart)!=undefined&&c._realStart!=null){c.start=c._realStart;
c.count=c._realCount;
c._realStart=c._realCount=null
}if(e){if(d&&typeof (d.photos.perpage)!="undefined"&&typeof (d.photos.pages)!="undefined"){if(d.photos.perpage*d.photos.pages<=b.request.start+b.request.count){a=b.request.start+d.photos.photo.length
}else{a=d.photos.perpage*d.photos.pages
}S._maxPhotosPerUser[A]=a;
e(a,b.request)
}else{if(S._maxPhotosPerUser[A]){e(S._maxPhotosPerUser[A],b.request)
}}}b.fetchHandler(Z,b.request);
if(e){b.request.onBegin=e
}};
var N=function(c){if(c.stat!="ok"){J(null,D)
}else{var Z=S._handlers[M];
if(!Z){console.log("FlickrRestStore: no handlers for data",c);
return 
}S._handlers[M]=null;
S._prevRequests[M]=c;
var a=S._processFlickrData(c,D,A);
if(!S._prevRequestRanges[A]){S._prevRequestRanges[A]=[]
}S._prevRequestRanges[A].push({start:D.start,end:D.start+c.photos.photo.length});
for(var b=0;
b<Z.length;
b++){B(a,c,Z[b])
}}};
var X=this._prevRequests[M];
if(X){this._handlers[M]=null;
B(this._cache[A],X,K);
return 
}else{if(this._checkPrevRanges(A,D.start,D.count)){this._handlers[M]=null;
B(this._cache[A],null,K);
return 
}}dojo.global[L]=function(Z){N(Z);
dojo.global[L]=null
};
var Y=dojo.io.script.get(T);
Y.addErrback(function(Z){dojo.disconnect(W);
J(Z,D)
})
},getAttributes:function(A){return["title","author","imageUrl","imageUrlSmall","imageUrlMedium","imageUrlThumb","link","dateTaken","datePublished"]
},getValues:function(B,A){this._assertIsItem(B);
this._assertIsAttribute(A);
if(A==="title"){return[this._unescapeHtml(B.title)]
}else{if(A==="author"){return[B.ownername]
}else{if(A==="imageUrlSmall"){return[B.media.s]
}else{if(A==="imageUrl"){return[B.media.l]
}else{if(A==="imageUrlMedium"){return[B.media.m]
}else{if(A==="imageUrlThumb"){return[B.media.t]
}else{if(A==="link"){return["http://www.flickr.com/photos/"+B.owner+"/"+B.id]
}else{if(A==="dateTaken"){return B.datetaken
}else{if(A==="datePublished"){return B.datepublished
}}}}}}}}}return undefined
},_processFlickrData:function(D,C,H){if(D.items){return dojox.data.FlickrStore.prototype._processFlickrData.apply(this,arguments)
}var J=["http://farm",null,".static.flickr.com/",null,"/",null,"_",null];
var I=[];
if(D.stat=="ok"&&D.photos&&D.photos.photo){I=D.photos.photo;
for(var E=0;
E<I.length;
E++){var K=I[E];
K[this._storeRef]=this;
J[1]=K.farm;
J[3]=K.server;
J[5]=K.id;
J[7]=K.secret;
var B=J.join("");
K.media={s:B+"_s.jpg",m:B+"_m.jpg",l:B+".jpg",t:B+"_t.jpg"}
}}var A=C.start?C.start:0;
var F=this._cache[H];
if(!F){this._cache[H]=F=[]
}for(var G=0;
G<I.length;
G++){F[G+A]=I[G]
}return F
},_checkPrevRanges:function(C,F,E){var B=F+E;
var A=this._prevRequestRanges[C];
if(!A){return false
}for(var D=0;
D<A.length;
D++){if(F>=A[D].start&&B<=A[D].end){return true
}}return false
}})
};