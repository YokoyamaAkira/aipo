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
},_id:0,_requestCount:0,_flickrRestUrl:"http://www.flickr.com/services/rest/",_apikey:null,_storeRef:"_S",_cache:null,_prevRequests:null,_handlers:null,_sortAttributes:{"date-posted":true,"date-taken":true,interestingness:true},_fetchItems:function(E,D,K){var H={};
if(!E.query){E.query=H={}
}else{dojo.mixin(H,E.query)
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
var C=function(c,b,Z){var d=Z.request.onBegin;
Z.request.onBegin=null;
var e;
var a=Z.request;
if(typeof (a._realStart)!=undefined&&a._realStart!=null){a.start=a._realStart;
a.count=a._realCount;
a._realStart=a._realCount=null
}if(d){if(b&&typeof (b.photos.perpage)!="undefined"&&typeof (b.photos.pages)!="undefined"){if(b.photos.perpage*b.photos.pages<=Z.request.start+Z.request.count){e=Z.request.start+b.photos.photo.length
}else{e=b.photos.perpage*b.photos.pages
}T._maxPhotosPerUser[B]=e;
d(e,Z.request)
}else{if(T._maxPhotosPerUser[B]){d(T._maxPhotosPerUser[B],Z.request)
}}}Z.fetchHandler(c,Z.request);
if(d){Z.request.onBegin=d
}};
var O=function(a){if(a.stat!="ok"){K(null,E)
}else{var b=T._handlers[N];
if(!b){console.log("FlickrRestStore: no handlers for data",a);
return 
}T._handlers[N]=null;
T._prevRequests[N]=a;
var c=T._processFlickrData(a,E,B);
if(!T._prevRequestRanges[B]){T._prevRequestRanges[B]=[]
}T._prevRequestRanges[B].push({start:E.start,end:E.start+a.photos.photo.length});
for(var Z=0;
Z<b.length;
Z++){C(c,a,b[Z])
}}};
var Y=this._prevRequests[N];
if(Y){this._handlers[N]=null;
C(this._cache[B],Y,L);
return 
}else{if(this._checkPrevRanges(B,E.start,E.count)){this._handlers[N]=null;
C(this._cache[B],null,L);
return 
}}dojo.global[M]=function(Z){O(Z);
dojo.global[M]=null
};
var A=dojo.io.script.get(U);
A.addErrback(function(Z){dojo.disconnect(X);
K(Z,E)
})
},getAttributes:function(A){return["title","author","imageUrl","imageUrlSmall","imageUrlMedium","imageUrlThumb","link","dateTaken","datePublished"]
},getValues:function(A,B){this._assertIsItem(A);
this._assertIsAttribute(B);
if(B==="title"){return[this._unescapeHtml(A.title)]
}else{if(B==="author"){return[A.ownername]
}else{if(B==="imageUrlSmall"){return[A.media.s]
}else{if(B==="imageUrl"){return[A.media.l]
}else{if(B==="imageUrlMedium"){return[A.media.m]
}else{if(B==="imageUrlThumb"){return[A.media.t]
}else{if(B==="link"){return["http://www.flickr.com/photos/"+A.owner+"/"+A.id]
}else{if(B==="dateTaken"){return A.datetaken
}else{if(B==="datePublished"){return A.datepublished
}}}}}}}}}return undefined
},_processFlickrData:function(K,J,D){if(K.items){return dojox.data.FlickrStore.prototype._processFlickrData.apply(this,arguments)
}var F=["http://farm",null,".static.flickr.com/",null,"/",null,"_",null];
var E=[];
if(K.stat=="ok"&&K.photos&&K.photos.photo){E=K.photos.photo;
for(var A=0;
A<E.length;
A++){var G=E[A];
G[this._storeRef]=this;
F[1]=G.farm;
F[3]=G.server;
F[5]=G.id;
F[7]=G.secret;
var I=F.join("");
G.media={s:I+"_s.jpg",m:I+"_m.jpg",l:I+".jpg",t:I+"_t.jpg"}
}}var H=J.start?J.start:0;
var B=this._cache[D];
if(!B){this._cache[D]=B=[]
}for(var C=0;
C<E.length;
C++){B[C+H]=E[C]
}return B
},_checkPrevRanges:function(B,E,D){var A=E+D;
var F=this._prevRequestRanges[B];
if(!F){return false
}for(var C=0;
C<F.length;
C++){if(E>=F[C].start&&A<=F[C].end){return true
}}return false
}})
};