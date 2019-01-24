if(!dojo._hasResource["dojox.data.FlickrStore"]){dojo._hasResource["dojox.data.FlickrStore"]=true;
dojo.provide("dojox.data.FlickrStore");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.io.script");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.data.FlickrStore",null,{constructor:function(A){if(A&&A.label){this.label=A.label
}},_flickrUrl:"http://api.flickr.com/services/feeds/photos_public.gne",_storeRef:"_S",label:"title",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.FlickrStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojox.data.FlickrStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(C,B){var A=this.getValues(C,B);
if(A){return A[0]
}return undefined
},getAttributes:function(A){return["title","description","author","datePublished","dateTaken","imageUrl","imageUrlSmall","imageUrlMedium","tags","link"]
},hasAttribute:function(B,A){if(this.getValue(B,A)){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getLabel:function(A){return this.getValue(A,this.label)
},getLabelAttributes:function(A){return[this.label]
},containsValue:function(D,C,E){var A=this.getValues(D,C);
for(var B=0;
B<A.length;
B++){if(A[B]===E){return true
}}return false
},getValues:function(B,A){this._assertIsItem(B);
this._assertIsAttribute(A);
if(A==="title"){return[this._unescapeHtml(B.title)]
}else{if(A==="author"){return[this._unescapeHtml(B.author)]
}else{if(A==="datePublished"){return[dojo.date.stamp.fromISOString(B.published)]
}else{if(A==="dateTaken"){return[dojo.date.stamp.fromISOString(B.date_taken)]
}else{if(A==="imageUrlSmall"){return[B.media.m.replace(/_m\./,"_s.")]
}else{if(A==="imageUrl"){return[B.media.m.replace(/_m\./,".")]
}else{if(A==="imageUrlMedium"){return[B.media.m]
}else{if(A==="link"){return[B.link]
}else{if(A==="tags"){return B.tags.split(" ")
}else{if(A==="description"){return[this._unescapeHtml(B.description)]
}}}}}}}}}}return undefined
},isItem:function(A){if(A&&A[this._storeRef]===this){return true
}return false
},close:function(A){},_fetchItems:function(B,A,C){if(!B.query){B.query={}
}var E={format:"json",tagmode:"any"};
if(B.query.tags){E.tags=B.query.tags
}if(B.query.tagmode){E.tagmode=B.query.tagmode
}if(B.query.userid){E.id=B.query.userid
}if(B.query.userids){E.ids=B.query.userids
}if(B.query.lang){E.lang=B.query.lang
}var I=this;
var D=null;
var F={url:this._flickrUrl,preventCache:true,content:E};
var H=function(J){if(D!==null){dojo.disconnect(D)
}A(I._processFlickrData(J),B)
};
D=dojo.connect("jsonFlickrFeed",H);
var G=dojo.io.script.get(F);
G.addErrback(function(J){dojo.disconnect(D);
C(J,B)
})
},_processFlickrData:function(D){var A=[];
if(D.items){A=D.items;
for(var B=0;
B<D.items.length;
B++){var C=D.items[B];
C[this._storeRef]=this
}}return A
},_unescapeHtml:function(A){A=A.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
A=A.replace(/&#39;/gm,"'");
return A
}});
dojo.extend(dojox.data.FlickrStore,dojo.data.util.simpleFetch);
if(!jsonFlickrFeed){var jsonFlickrFeed=function(A){}
}};