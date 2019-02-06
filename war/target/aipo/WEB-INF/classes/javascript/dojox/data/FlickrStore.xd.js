dojo._xdResourceLoaded({depends:[["provide","dojox.data.FlickrStore"],["require","dojo.data.util.simpleFetch"],["require","dojo.io.script"],["require","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojox.data.FlickrStore"]){A._hasResource["dojox.data.FlickrStore"]=true;
A.provide("dojox.data.FlickrStore");
A.require("dojo.data.util.simpleFetch");
A.require("dojo.io.script");
A.require("dojo.date.stamp");
A.declare("dojox.data.FlickrStore",null,{constructor:function(C){if(C&&C.label){this.label=C.label
}},_flickrUrl:"http://api.flickr.com/services/feeds/photos_public.gne",_storeRef:"_S",label:"title",_assertIsItem:function(C){if(!this.isItem(C)){throw new Error("dojox.data.FlickrStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(C){if(typeof C!=="string"){throw new Error("dojox.data.FlickrStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(C,E){var D=this.getValues(C,E);
if(D){return D[0]
}return undefined
},getAttributes:function(C){return["title","description","author","datePublished","dateTaken","imageUrl","imageUrlSmall","imageUrlMedium","tags","link"]
},hasAttribute:function(C,D){if(this.getValue(C,D)){return true
}return false
},isItemLoaded:function(C){return this.isItem(C)
},loadItem:function(C){},getLabel:function(C){return this.getValue(C,this.label)
},getLabelAttributes:function(C){return[this.label]
},containsValue:function(G,F,C){var D=this.getValues(G,F);
for(var E=0;
E<D.length;
E++){if(D[E]===C){return true
}}return false
},getValues:function(C,D){this._assertIsItem(C);
this._assertIsAttribute(D);
if(D==="title"){return[this._unescapeHtml(C.title)]
}else{if(D==="author"){return[this._unescapeHtml(C.author)]
}else{if(D==="datePublished"){return[A.date.stamp.fromISOString(C.published)]
}else{if(D==="dateTaken"){return[A.date.stamp.fromISOString(C.date_taken)]
}else{if(D==="imageUrlSmall"){return[C.media.m.replace(/_m\./,"_s.")]
}else{if(D==="imageUrl"){return[C.media.m.replace(/_m\./,".")]
}else{if(D==="imageUrlMedium"){return[C.media.m]
}else{if(D==="link"){return[C.link]
}else{if(D==="tags"){return C.tags.split(" ")
}else{if(D==="description"){return[this._unescapeHtml(C.description)]
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
var J=function(L){if(F!==null){A.disconnect(F)
}C(K._processFlickrData(L),D)
};
F=A.connect("jsonFlickrFeed",J);
var I=A.io.script.get(H);
I.addErrback(function(L){A.disconnect(F);
E(L,D)
})
},_processFlickrData:function(C){var D=[];
if(C.items){D=C.items;
for(var E=0;
E<C.items.length;
E++){var F=C.items[E];
F[this._storeRef]=this
}}return D
},_unescapeHtml:function(C){C=C.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
C=C.replace(/&#39;/gm,"'");
return C
}});
A.extend(dojox.data.FlickrStore,A.data.util.simpleFetch);
if(!B){var B=function(C){}
}}}});