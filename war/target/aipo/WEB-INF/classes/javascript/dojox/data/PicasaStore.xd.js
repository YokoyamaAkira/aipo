dojo._xdResourceLoaded({depends:[["provide","dojox.data.PicasaStore"],["require","dojo.data.util.simpleFetch"],["require","dojo.io.script"],["require","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojox.data.PicasaStore"]){A._hasResource["dojox.data.PicasaStore"]=true;
A.provide("dojox.data.PicasaStore");
A.require("dojo.data.util.simpleFetch");
A.require("dojo.io.script");
A.require("dojo.date.stamp");
A.declare("dojox.data.PicasaStore",null,{constructor:function(B){if(B&&B.label){this.label=B.label
}},_picasaUrl:"http://picasaweb.google.com/data/feed/api/all",_storeRef:"_S",label:"title",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojox.data.PicasaStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojox.data.PicasaStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(B,D){var C=this.getValues(B,D);
if(C){return C[0]
}return undefined
},getAttributes:function(B){return["id","published","updated","category","title$type","title","summary$type","summary","rights$type","rights","link","author","gphoto$id","gphoto$name","location"]
},hasAttribute:function(B,C){if(this.getValue(B,C)){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getLabel:function(B){return this.getValue(B,this.label)
},getLabelAttributes:function(B){return[this.label]
},containsValue:function(F,E,B){var C=this.getValues(F,E);
for(var D=0;
D<C.length;
D++){if(C[D]===B){return true
}}return false
},getValues:function(B,C){this._assertIsItem(B);
this._assertIsAttribute(C);
if(C==="title"){return[this._unescapeHtml(B.title)]
}else{if(C==="author"){return[this._unescapeHtml(B.author[0].name)]
}else{if(C==="datePublished"){return[A.date.stamp.fromISOString(B.published)]
}else{if(C==="dateTaken"){return[A.date.stamp.fromISOString(B.date_taken)]
}else{if(C==="imageUrlSmall"){return[B.media.thumbnail[1].url]
}else{if(C==="imageUrl"){return[B.content$src]
}else{if(C==="imageUrlMedium"){return[B.media.thumbnail[2].url]
}else{if(C==="link"){return[B.link[1]]
}else{if(C==="tags"){return B.tags.split(" ")
}else{if(C==="description"){return[this._unescapeHtml(B.summary)]
}}}}}}}}}}return undefined
},isItem:function(B){if(B&&B[this._storeRef]===this){return true
}return false
},close:function(B){},_fetchItems:function(J,I,B){if(!J.query){J.query={}
}var D={alt:"jsonm",pp:"1",psc:"G"};
D["start-index"]="1";
if(J.query.start){D["start-index"]=J.query.start
}if(J.query.tags){D.q=J.query.tags
}if(J.query.userid){D.uname=J.query.userid
}if(J.query.userids){D.ids=J.query.userids
}if(J.query.lang){D.hl=J.query.lang
}if(J.count){D["max-results"]=J.count
}else{D["max-results"]="20"
}var H=this;
var C=null;
var G=function(K){if(C!==null){A.disconnect(C)
}I(H._processPicasaData(K),J)
};
var E={url:this._picasaUrl,content:D,callbackParamName:"callback",handle:G};
var F=A.io.script.get(E);
F.addErrback(function(K){A.disconnect(C);
B(K,J)
})
},_processPicasaData:function(B){var C=[];
if(B.feed){C=B.feed.entry;
for(var D=0;
D<C.length;
D++){var E=C[D];
E[this._storeRef]=this
}}return C
},_unescapeHtml:function(B){B=B.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
B=B.replace(/&#39;/gm,"'");
return B
}});
A.extend(dojox.data.PicasaStore,A.data.util.simpleFetch)
}}});