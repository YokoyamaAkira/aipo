if(!dojo._hasResource["dojox.data.FlickrStore"]){dojo._hasResource["dojox.data.FlickrStore"]=true;
dojo.provide("dojox.data.FlickrStore");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.io.script");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.data.FlickrStore",null,{constructor:function(A){if(A&&A.label){this.label=A.label
}},_flickrUrl:"http://api.flickr.com/services/feeds/photos_public.gne",_storeRef:"_S",label:"title",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.FlickrStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojox.data.FlickrStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(B,A){var C=this.getValues(B,A);
if(C){return C[0]
}return undefined
},getAttributes:function(A){return["title","description","author","datePublished","dateTaken","imageUrl","imageUrlSmall","imageUrlMedium","tags","link"]
},hasAttribute:function(A,B){if(this.getValue(A,B)){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getLabel:function(A){return this.getValue(A,this.label)
},getLabelAttributes:function(A){return[this.label]
},containsValue:function(C,B,D){var E=this.getValues(C,B);
for(var A=0;
A<E.length;
A++){if(E[A]===D){return true
}}return false
},getValues:function(A,B){this._assertIsItem(A);
this._assertIsAttribute(B);
if(B==="title"){return[this._unescapeHtml(A.title)]
}else{if(B==="author"){return[this._unescapeHtml(A.author)]
}else{if(B==="datePublished"){return[dojo.date.stamp.fromISOString(A.published)]
}else{if(B==="dateTaken"){return[dojo.date.stamp.fromISOString(A.date_taken)]
}else{if(B==="imageUrlSmall"){return[A.media.m.replace(/_m\./,"_s.")]
}else{if(B==="imageUrl"){return[A.media.m.replace(/_m\./,".")]
}else{if(B==="imageUrlMedium"){return[A.media.m]
}else{if(B==="link"){return[A.link]
}else{if(B==="tags"){return A.tags.split(" ")
}else{if(B==="description"){return[this._unescapeHtml(A.description)]
}}}}}}}}}}return undefined
},isItem:function(A){if(A&&A[this._storeRef]===this){return true
}return false
},close:function(A){},_fetchItems:function(G,F,H){if(!G.query){G.query={}
}var A={format:"json",tagmode:"any"};
if(G.query.tags){A.tags=G.query.tags
}if(G.query.tagmode){A.tagmode=G.query.tagmode
}if(G.query.userid){A.id=G.query.userid
}if(G.query.userids){A.ids=G.query.userids
}if(G.query.lang){A.lang=G.query.lang
}var E=this;
var I=null;
var B={url:this._flickrUrl,preventCache:true,content:A};
var D=function(J){if(I!==null){dojo.disconnect(I)
}F(E._processFlickrData(J),G)
};
I=dojo.connect("jsonFlickrFeed",D);
var C=dojo.io.script.get(B);
C.addErrback(function(J){dojo.disconnect(I);
H(J,G)
})
},_processFlickrData:function(C){var D=[];
if(C.items){D=C.items;
for(var A=0;
A<C.items.length;
A++){var B=C.items[A];
B[this._storeRef]=this
}}return D
},_unescapeHtml:function(A){A=A.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
A=A.replace(/&#39;/gm,"'");
return A
}});
dojo.extend(dojox.data.FlickrStore,dojo.data.util.simpleFetch);
if(!jsonFlickrFeed){var jsonFlickrFeed=function(A){}
}};