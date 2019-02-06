dojo._xdResourceLoaded({depends:[["provide","dojox.data.FlickrStore"],["require","dojo.data.util.simpleFetch"],["require","dojo.io.script"],["require","dojo.date.stamp"]],defineResource:function(B){if(!B._hasResource["dojox.data.FlickrStore"]){B._hasResource["dojox.data.FlickrStore"]=true;
B.provide("dojox.data.FlickrStore");
B.require("dojo.data.util.simpleFetch");
B.require("dojo.io.script");
B.require("dojo.date.stamp");
B.declare("dojox.data.FlickrStore",null,{constructor:function(C){if(C&&C.label){this.label=C.label
}},_flickrUrl:"http://api.flickr.com/services/feeds/photos_public.gne",_storeRef:"_S",label:"title",_assertIsItem:function(C){if(!this.isItem(C)){throw new Error("dojox.data.FlickrStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(C){if(typeof C!=="string"){throw new Error("dojox.data.FlickrStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(E,D){var C=this.getValues(E,D);
if(C){return C[0]
}return undefined
},getAttributes:function(C){return["title","description","author","datePublished","dateTaken","imageUrl","imageUrlSmall","imageUrlMedium","tags","link"]
},hasAttribute:function(D,C){if(this.getValue(D,C)){return true
}return false
},isItemLoaded:function(C){return this.isItem(C)
},loadItem:function(C){},getLabel:function(C){return this.getValue(C,this.label)
},getLabelAttributes:function(C){return[this.label]
},containsValue:function(F,E,G){var C=this.getValues(F,E);
for(var D=0;
D<C.length;
D++){if(C[D]===G){return true
}}return false
},getValues:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
if(C==="title"){return[this._unescapeHtml(D.title)]
}else{if(C==="author"){return[this._unescapeHtml(D.author)]
}else{if(C==="datePublished"){return[B.date.stamp.fromISOString(D.published)]
}else{if(C==="dateTaken"){return[B.date.stamp.fromISOString(D.date_taken)]
}else{if(C==="imageUrlSmall"){return[D.media.m.replace(/_m\./,"_s.")]
}else{if(C==="imageUrl"){return[D.media.m.replace(/_m\./,".")]
}else{if(C==="imageUrlMedium"){return[D.media.m]
}else{if(C==="link"){return[D.link]
}else{if(C==="tags"){return D.tags.split(" ")
}else{if(C==="description"){return[this._unescapeHtml(D.description)]
}}}}}}}}}}return undefined
},isItem:function(C){if(C&&C[this._storeRef]===this){return true
}return false
},close:function(C){},_fetchItems:function(D,C,E){if(!D.query){D.query={}
}var G={format:"json",tagmode:"any"};
if(D.query.tags){G.tags=D.query.tags
}if(D.query.tagmode){G.tagmode=D.query.tagmode
}if(D.query.userid){G.id=D.query.userid
}if(D.query.userids){G.ids=D.query.userids
}if(D.query.lang){G.lang=D.query.lang
}var K=this;
var F=null;
var H={url:this._flickrUrl,preventCache:true,content:G};
var J=function(L){if(F!==null){B.disconnect(F)
}C(K._processFlickrData(L),D)
};
F=B.connect("jsonFlickrFeed",J);
var I=B.io.script.get(H);
I.addErrback(function(L){B.disconnect(F);
E(L,D)
})
},_processFlickrData:function(F){var C=[];
if(F.items){C=F.items;
for(var D=0;
D<F.items.length;
D++){var E=F.items[D];
E[this._storeRef]=this
}}return C
},_unescapeHtml:function(C){C=C.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
C=C.replace(/&#39;/gm,"'");
return C
}});
B.extend(dojox.data.FlickrStore,B.data.util.simpleFetch);
if(!A){var A=function(C){}
}}}});