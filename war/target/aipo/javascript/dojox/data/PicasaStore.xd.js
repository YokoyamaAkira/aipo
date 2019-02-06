dojo._xdResourceLoaded({depends:[["provide","dojox.data.PicasaStore"],["require","dojo.data.util.simpleFetch"],["require","dojo.io.script"],["require","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojox.data.PicasaStore"]){A._hasResource["dojox.data.PicasaStore"]=true;
A.provide("dojox.data.PicasaStore");
A.require("dojo.data.util.simpleFetch");
A.require("dojo.io.script");
A.require("dojo.date.stamp");
A.declare("dojox.data.PicasaStore",null,{constructor:function(B){if(B&&B.label){this.label=B.label
}},_picasaUrl:"http://picasaweb.google.com/data/feed/api/all",_storeRef:"_S",label:"title",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojox.data.PicasaStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojox.data.PicasaStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(D,C){var B=this.getValues(D,C);
if(B){return B[0]
}return undefined
},getAttributes:function(B){return["id","published","updated","category","title$type","title","summary$type","summary","rights$type","rights","link","author","gphoto$id","gphoto$name","location"]
},hasAttribute:function(C,B){if(this.getValue(C,B)){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getLabel:function(B){return this.getValue(B,this.label)
},getLabelAttributes:function(B){return[this.label]
},containsValue:function(E,D,F){var B=this.getValues(E,D);
for(var C=0;
C<B.length;
C++){if(B[C]===F){return true
}}return false
},getValues:function(C,B){this._assertIsItem(C);
this._assertIsAttribute(B);
if(B==="title"){return[this._unescapeHtml(C.title)]
}else{if(B==="author"){return[this._unescapeHtml(C.author[0].name)]
}else{if(B==="datePublished"){return[A.date.stamp.fromISOString(C.published)]
}else{if(B==="dateTaken"){return[A.date.stamp.fromISOString(C.date_taken)]
}else{if(B==="imageUrlSmall"){return[C.media.thumbnail[1].url]
}else{if(B==="imageUrl"){return[C.content$src]
}else{if(B==="imageUrlMedium"){return[C.media.thumbnail[2].url]
}else{if(B==="link"){return[C.link[1]]
}else{if(B==="tags"){return C.tags.split(" ")
}else{if(B==="description"){return[this._unescapeHtml(C.summary)]
}}}}}}}}}}return undefined
},isItem:function(B){if(B&&B[this._storeRef]===this){return true
}return false
},close:function(B){},_fetchItems:function(C,B,D){if(!C.query){C.query={}
}var F={alt:"jsonm",pp:"1",psc:"G"};
F["start-index"]="1";
if(C.query.start){F["start-index"]=C.query.start
}if(C.query.tags){F.q=C.query.tags
}if(C.query.userid){F.uname=C.query.userid
}if(C.query.userids){F.ids=C.query.userids
}if(C.query.lang){F.hl=C.query.lang
}if(C.count){F["max-results"]=C.count
}else{F["max-results"]="20"
}var J=this;
var E=null;
var I=function(K){if(E!==null){A.disconnect(E)
}B(J._processPicasaData(K),C)
};
var G={url:this._picasaUrl,content:F,callbackParamName:"callback",handle:I};
var H=A.io.script.get(G);
H.addErrback(function(K){A.disconnect(E);
D(K,C)
})
},_processPicasaData:function(E){var B=[];
if(E.feed){B=E.feed.entry;
for(var C=0;
C<B.length;
C++){var D=B[C];
D[this._storeRef]=this
}}return B
},_unescapeHtml:function(B){B=B.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
B=B.replace(/&#39;/gm,"'");
return B
}});
A.extend(dojox.data.PicasaStore,A.data.util.simpleFetch)
}}});