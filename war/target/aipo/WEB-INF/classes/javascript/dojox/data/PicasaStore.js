if(!dojo._hasResource["dojox.data.PicasaStore"]){dojo._hasResource["dojox.data.PicasaStore"]=true;
dojo.provide("dojox.data.PicasaStore");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.io.script");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.data.PicasaStore",null,{constructor:function(A){if(A&&A.label){this.label=A.label
}},_picasaUrl:"http://picasaweb.google.com/data/feed/api/all",_storeRef:"_S",label:"title",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.PicasaStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojox.data.PicasaStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(B,A){var C=this.getValues(B,A);
if(C){return C[0]
}return undefined
},getAttributes:function(A){return["id","published","updated","category","title$type","title","summary$type","summary","rights$type","rights","link","author","gphoto$id","gphoto$name","location"]
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
}else{if(B==="author"){return[this._unescapeHtml(A.author[0].name)]
}else{if(B==="datePublished"){return[dojo.date.stamp.fromISOString(A.published)]
}else{if(B==="dateTaken"){return[dojo.date.stamp.fromISOString(A.date_taken)]
}else{if(B==="imageUrlSmall"){return[A.media.thumbnail[1].url]
}else{if(B==="imageUrl"){return[A.content$src]
}else{if(B==="imageUrlMedium"){return[A.media.thumbnail[2].url]
}else{if(B==="link"){return[A.link[1]]
}else{if(B==="tags"){return A.tags.split(" ")
}else{if(B==="description"){return[this._unescapeHtml(A.summary)]
}}}}}}}}}}return undefined
},isItem:function(A){if(A&&A[this._storeRef]===this){return true
}return false
},close:function(A){},_fetchItems:function(G,F,H){if(!G.query){G.query={}
}var A={alt:"jsonm",pp:"1",psc:"G"};
A["start-index"]="1";
if(G.query.start){A["start-index"]=G.query.start
}if(G.query.tags){A.q=G.query.tags
}if(G.query.userid){A.uname=G.query.userid
}if(G.query.userids){A.ids=G.query.userids
}if(G.query.lang){A.hl=G.query.lang
}if(G.count){A["max-results"]=G.count
}else{A["max-results"]="20"
}var E=this;
var I=null;
var D=function(J){if(I!==null){dojo.disconnect(I)
}F(E._processPicasaData(J),G)
};
var B={url:this._picasaUrl,content:A,callbackParamName:"callback",handle:D};
var C=dojo.io.script.get(B);
C.addErrback(function(J){dojo.disconnect(I);
H(J,G)
})
},_processPicasaData:function(C){var D=[];
if(C.feed){D=C.feed.entry;
for(var A=0;
A<D.length;
A++){var B=D[A];
B[this._storeRef]=this
}}return D
},_unescapeHtml:function(A){A=A.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
A=A.replace(/&#39;/gm,"'");
return A
}});
dojo.extend(dojox.data.PicasaStore,dojo.data.util.simpleFetch)
};