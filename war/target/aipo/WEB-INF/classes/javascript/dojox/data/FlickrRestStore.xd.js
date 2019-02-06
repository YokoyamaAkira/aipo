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
},_id:0,_requestCount:0,_flickrRestUrl:"http://www.flickr.com/services/rest/",_apikey:null,_storeRef:"_S",_cache:null,_prevRequests:null,_handlers:null,_sortAttributes:{"date-posted":true,"date-taken":true,interestingness:true},_fetchItems:function(E,D,L){var H={};
if(!E.query){E.query=H={}
}else{A.mixin(H,E.query)
}var B=[];
var R=[];
var N="FlickrRestStoreCallback_"+this._id+"_"+(++this._requestCount);
var W={format:"json",method:"flickr.photos.search",api_key:this._apikey,extras:"owner_name,date_upload,date_taken",jsoncallback:N};
var T=false;
if(H.userid){T=true;
W.user_id=E.query.userid;
B.push("userid"+E.query.userid)
}if(H.apikey){T=true;
W.api_key=E.query.apikey;
R.push("api"+E.query.apikey)
}else{throw Error("dojox.data.FlickrRestStore: An API key must be specified.")
}E._curCount=E.count;
if(H.page){W.page=E.query.page;
R.push("page"+W.page)
}else{if(typeof (E.start)!="undefined"&&E.start!=null){if(!E.count){E.count=20
}var Q=E.start%E.count;
var F=E.start,K=E.count;
if(Q!=0){if(F<K/2){K=F+K;
F=0
}else{var I=20,S=2;
for(var X=I;
X>0;
X--){if(F%X==0&&(F/X)>=K){S=X;
break
}}K=F/S
}E._realStart=E.start;
E._realCount=E.count;
E._curStart=F;
E._curCount=K
}else{E._realStart=E._realCount=null;
E._curStart=E.start;
E._curCount=E.count
}W.page=(F/K)+1;
R.push("page"+W.page)
}}if(E._curCount){W.per_page=E._curCount;
R.push("count"+E._curCount)
}if(H.lang){W.lang=E.query.lang;
B.push("lang"+E.lang)
}var G=this._flickrRestUrl;
if(H.setid){W.method="flickr.photosets.getPhotos";
W.photoset_id=E.query.set;
B.push("set"+E.query.set)
}if(H.tags){if(H.tags instanceof Array){W.tags=H.tags.join(",")
}else{W.tags=H.tags
}B.push("tags"+W.tags);
if(H.tag_mode&&(H.tag_mode.toLowerCase()=="any"||H.tag_mode.toLowerCase()=="all")){W.tag_mode=H.tag_mode
}}if(H.text){W.text=H.text;
B.push("text:"+H.text)
}if(H.sort&&H.sort.length>0){if(!H.sort[0].attribute){H.sort[0].attribute="date-posted"
}if(this._sortAttributes[H.sort[0].attribute]){if(H.sort[0].descending){W.sort=H.sort[0].attribute+"-desc"
}else{W.sort=H.sort[0].attribute+"-asc"
}}}else{W.sort="date-posted-asc"
}B.push("sort:"+W.sort);
B=B.join(".");
R=R.length>0?"."+R.join("."):"";
var O=B+R;
E={query:H,count:E._curCount,start:E._curStart,_realCount:E._realCount,_realStart:E._realStart,onBegin:E.onBegin,onComplete:E.onComplete,onItem:E.onItem};
var M={request:E,fetchHandler:D,errorHandler:L};
if(this._handlers[O]){this._handlers[O].push(M);
return 
}this._handlers[O]=[M];
var U=this;
var Y=null;
var V={url:this._flickrRestUrl,preventCache:true,content:W};
var C=function(e,c,a){var d=a.request.onBegin;
a.request.onBegin=null;
var f;
var b=a.request;
if(typeof (b._realStart)!=undefined&&b._realStart!=null){b.start=b._realStart;
b.count=b._realCount;
b._realStart=b._realCount=null
}if(d){if(c&&typeof (c.photos.perpage)!="undefined"&&typeof (c.photos.pages)!="undefined"){if(c.photos.perpage*c.photos.pages<=a.request.start+a.request.count){f=a.request.start+c.photos.photo.length
}else{f=c.photos.perpage*c.photos.pages
}U._maxPhotosPerUser[B]=f;
d(f,a.request)
}else{if(U._maxPhotosPerUser[B]){d(U._maxPhotosPerUser[B],a.request)
}}}a.fetchHandler(e,a.request);
if(d){a.request.onBegin=d
}};
var P=function(b){if(b.stat!="ok"){L(null,E)
}else{var c=U._handlers[O];
if(!c){console.log("FlickrRestStore: no handlers for data",b);
return 
}U._handlers[O]=null;
U._prevRequests[O]=b;
var d=U._processFlickrData(b,E,B);
if(!U._prevRequestRanges[B]){U._prevRequestRanges[B]=[]
}U._prevRequestRanges[B].push({start:E.start,end:E.start+b.photos.photo.length});
for(var a=0;
a<c.length;
a++){C(d,b,c[a])
}}};
var Z=this._prevRequests[O];
if(Z){this._handlers[O]=null;
C(this._cache[B],Z,M);
return 
}else{if(this._checkPrevRanges(B,E.start,E.count)){this._handlers[O]=null;
C(this._cache[B],null,M);
return 
}}A.global[N]=function(a){P(a);
A.global[N]=null
};
var J=A.io.script.get(V);
J.addErrback(function(a){A.disconnect(Y);
L(a,E)
})
},getAttributes:function(B){return["title","author","imageUrl","imageUrlSmall","imageUrlMedium","imageUrlThumb","link","dateTaken","datePublished"]
},getValues:function(B,C){this._assertIsItem(B);
this._assertIsAttribute(C);
if(C==="title"){return[this._unescapeHtml(B.title)]
}else{if(C==="author"){return[B.ownername]
}else{if(C==="imageUrlSmall"){return[B.media.s]
}else{if(C==="imageUrl"){return[B.media.l]
}else{if(C==="imageUrlMedium"){return[B.media.m]
}else{if(C==="imageUrlThumb"){return[B.media.t]
}else{if(C==="link"){return["http://www.flickr.com/photos/"+B.owner+"/"+B.id]
}else{if(C==="dateTaken"){return B.datetaken
}else{if(C==="datePublished"){return B.datepublished
}}}}}}}}}return undefined
},_processFlickrData:function(C,B,G){if(C.items){return dojox.data.FlickrStore.prototype._processFlickrData.apply(this,arguments)
}var I=["http://farm",null,".static.flickr.com/",null,"/",null,"_",null];
var H=[];
if(C.stat=="ok"&&C.photos&&C.photos.photo){H=C.photos.photo;
for(var D=0;
D<H.length;
D++){var J=H[D];
J[this._storeRef]=this;
I[1]=J.farm;
I[3]=J.server;
I[5]=J.id;
I[7]=J.secret;
var L=I.join("");
J.media={s:L+"_s.jpg",m:L+"_m.jpg",l:L+".jpg",t:L+"_t.jpg"}
}}var K=B.start?B.start:0;
var E=this._cache[G];
if(!E){this._cache[G]=E=[]
}for(var F=0;
F<H.length;
F++){E[F+K]=H[F]
}return E
},_checkPrevRanges:function(E,C,G){var D=C+G;
var B=this._prevRequestRanges[E];
if(!B){return false
}for(var F=0;
F<B.length;
F++){if(C>=B[F].start&&D<=B[F].end){return true
}}return false
}})
}}});