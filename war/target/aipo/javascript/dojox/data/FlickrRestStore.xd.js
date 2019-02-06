dojo._xdResourceLoaded({depends:[["provide","dojox.data.FlickrRestStore"],["require","dojox.data.FlickrStore"]],defineResource:function(A){if(!A._hasResource["dojox.data.FlickrRestStore"]){A._hasResource["dojox.data.FlickrRestStore"]=true;
A.provide("dojox.data.FlickrRestStore");
A.require("dojox.data.FlickrStore");
A.declare("dojox.data.FlickrRestStore",dojox.data.FlickrStore,{constructor:function(B){if(B&&B.label){if(B.label){this.label=B.label
}if(B.apikey){this._apikey=B.apikey
}}this._cache=[];
this._prevRequests={};
this._handlers={};
this._prevRequestRanges=[];
this._maxPhotosPerUser={};
this._id=dojox.data.FlickrRestStore.prototype._id++
},_id:0,_requestCount:0,_flickrRestUrl:"http://www.flickr.com/services/rest/",_apikey:null,_storeRef:"_S",_cache:null,_prevRequests:null,_handlers:null,_sortAttributes:{"date-posted":true,"date-taken":true,interestingness:true},_fetchItems:function(E,D,K){var H={};
if(!E.query){E.query=H={}
}else{A.mixin(H,E.query)
}var B=[];
var Q=[];
var M="FlickrRestStoreCallback_"+this._id+"_"+(++this._requestCount);
var V={format:"json",method:"flickr.photos.search",api_key:this._apikey,extras:"owner_name,date_upload,date_taken",jsoncallback:M};
var S=false;
if(H.userid){S=true;
V.user_id=E.query.userid;
B.push("userid"+E.query.userid)
}if(H.apikey){S=true;
V.api_key=E.query.apikey;
Q.push("api"+E.query.apikey)
}else{throw Error("dojox.data.FlickrRestStore: An API key must be specified.")
}E._curCount=E.count;
if(H.page){V.page=E.query.page;
Q.push("page"+V.page)
}else{if(typeof (E.start)!="undefined"&&E.start!=null){if(!E.count){E.count=20
}var P=E.start%E.count;
var F=E.start,J=E.count;
if(P!=0){if(F<J/2){J=F+J;
F=0
}else{var I=20,R=2;
for(var W=I;
W>0;
W--){if(F%W==0&&(F/W)>=J){R=W;
break
}}J=F/R
}E._realStart=E.start;
E._realCount=E.count;
E._curStart=F;
E._curCount=J
}else{E._realStart=E._realCount=null;
E._curStart=E.start;
E._curCount=E.count
}V.page=(F/J)+1;
Q.push("page"+V.page)
}}if(E._curCount){V.per_page=E._curCount;
Q.push("count"+E._curCount)
}if(H.lang){V.lang=E.query.lang;
B.push("lang"+E.lang)
}var G=this._flickrRestUrl;
if(H.setid){V.method="flickr.photosets.getPhotos";
V.photoset_id=E.query.set;
B.push("set"+E.query.set)
}if(H.tags){if(H.tags instanceof Array){V.tags=H.tags.join(",")
}else{V.tags=H.tags
}B.push("tags"+V.tags);
if(H.tag_mode&&(H.tag_mode.toLowerCase()=="any"||H.tag_mode.toLowerCase()=="all")){V.tag_mode=H.tag_mode
}}if(H.text){V.text=H.text;
B.push("text:"+H.text)
}if(H.sort&&H.sort.length>0){if(!H.sort[0].attribute){H.sort[0].attribute="date-posted"
}if(this._sortAttributes[H.sort[0].attribute]){if(H.sort[0].descending){V.sort=H.sort[0].attribute+"-desc"
}else{V.sort=H.sort[0].attribute+"-asc"
}}}else{V.sort="date-posted-asc"
}B.push("sort:"+V.sort);
B=B.join(".");
Q=Q.length>0?"."+Q.join("."):"";
var N=B+Q;
E={query:H,count:E._curCount,start:E._curStart,_realCount:E._realCount,_realStart:E._realStart,onBegin:E.onBegin,onComplete:E.onComplete,onItem:E.onItem};
var L={request:E,fetchHandler:D,errorHandler:K};
if(this._handlers[N]){this._handlers[N].push(L);
return 
}this._handlers[N]=[L];
var T=this;
var X=null;
var U={url:this._flickrRestUrl,preventCache:true,content:V};
var C=function(a,e,c){var f=c.request.onBegin;
c.request.onBegin=null;
var b;
var d=c.request;
if(typeof (d._realStart)!=undefined&&d._realStart!=null){d.start=d._realStart;
d.count=d._realCount;
d._realStart=d._realCount=null
}if(f){if(e&&typeof (e.photos.perpage)!="undefined"&&typeof (e.photos.pages)!="undefined"){if(e.photos.perpage*e.photos.pages<=c.request.start+c.request.count){b=c.request.start+e.photos.photo.length
}else{b=e.photos.perpage*e.photos.pages
}T._maxPhotosPerUser[B]=b;
f(b,c.request)
}else{if(T._maxPhotosPerUser[B]){f(T._maxPhotosPerUser[B],c.request)
}}}c.fetchHandler(a,c.request);
if(f){c.request.onBegin=f
}};
var O=function(d){if(d.stat!="ok"){K(null,E)
}else{var a=T._handlers[N];
if(!a){console.log("FlickrRestStore: no handlers for data",d);
return 
}T._handlers[N]=null;
T._prevRequests[N]=d;
var b=T._processFlickrData(d,E,B);
if(!T._prevRequestRanges[B]){T._prevRequestRanges[B]=[]
}T._prevRequestRanges[B].push({start:E.start,end:E.start+d.photos.photo.length});
for(var c=0;
c<a.length;
c++){C(b,d,a[c])
}}};
var Y=this._prevRequests[N];
if(Y){this._handlers[N]=null;
C(this._cache[B],Y,L);
return 
}else{if(this._checkPrevRanges(B,E.start,E.count)){this._handlers[N]=null;
C(this._cache[B],null,L);
return 
}}A.global[M]=function(a){O(a);
A.global[M]=null
};
var Z=A.io.script.get(U);
Z.addErrback(function(a){A.disconnect(X);
K(a,E)
})
},getAttributes:function(B){return["title","author","imageUrl","imageUrlSmall","imageUrlMedium","imageUrlThumb","link","dateTaken","datePublished"]
},getValues:function(C,B){this._assertIsItem(C);
this._assertIsAttribute(B);
if(B==="title"){return[this._unescapeHtml(C.title)]
}else{if(B==="author"){return[C.ownername]
}else{if(B==="imageUrlSmall"){return[C.media.s]
}else{if(B==="imageUrl"){return[C.media.l]
}else{if(B==="imageUrlMedium"){return[C.media.m]
}else{if(B==="imageUrlThumb"){return[C.media.t]
}else{if(B==="link"){return["http://www.flickr.com/photos/"+C.owner+"/"+C.id]
}else{if(B==="dateTaken"){return C.datetaken
}else{if(B==="datePublished"){return C.datepublished
}}}}}}}}}return undefined
},_processFlickrData:function(E,D,I){if(E.items){return dojox.data.FlickrStore.prototype._processFlickrData.apply(this,arguments)
}var K=["http://farm",null,".static.flickr.com/",null,"/",null,"_",null];
var J=[];
if(E.stat=="ok"&&E.photos&&E.photos.photo){J=E.photos.photo;
for(var F=0;
F<J.length;
F++){var L=J[F];
L[this._storeRef]=this;
K[1]=L.farm;
K[3]=L.server;
K[5]=L.id;
K[7]=L.secret;
var C=K.join("");
L.media={s:C+"_s.jpg",m:C+"_m.jpg",l:C+".jpg",t:C+"_t.jpg"}
}}var B=D.start?D.start:0;
var G=this._cache[I];
if(!G){this._cache[I]=G=[]
}for(var H=0;
H<J.length;
H++){G[H+B]=J[H]
}return G
},_checkPrevRanges:function(D,G,F){var C=G+F;
var B=this._prevRequestRanges[D];
if(!B){return false
}for(var E=0;
E<B.length;
E++){if(G>=B[E].start&&C<=B[E].end){return true
}}return false
}})
}}});