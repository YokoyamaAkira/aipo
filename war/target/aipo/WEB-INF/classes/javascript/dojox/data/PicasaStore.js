if(!dojo._hasResource["dojox.data.PicasaStore"]){dojo._hasResource["dojox.data.PicasaStore"]=true;
dojo.provide("dojox.data.PicasaStore");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.io.script");
dojo.require("dojo.date.stamp");
dojo.declare("dojox.data.PicasaStore",null,{constructor:function(A){if(A&&A.label){this.label=A.label
}},_picasaUrl:"http://picasaweb.google.com/data/feed/api/all",_storeRef:"_S",label:"title",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.PicasaStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojox.data.PicasaStore: a function was passed an attribute argument that was not an attribute name string")
}},getFeatures:function(){return{"dojo.data.api.Read":true}
},getValue:function(C,B){var A=this.getValues(C,B);
if(A){return A[0]
}return undefined
},getAttributes:function(A){return["id","published","updated","category","title$type","title","summary$type","summary","rights$type","rights","link","author","gphoto$id","gphoto$name","location"]
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
}else{if(A==="author"){return[this._unescapeHtml(B.author[0].name)]
}else{if(A==="datePublished"){return[dojo.date.stamp.fromISOString(B.published)]
}else{if(A==="dateTaken"){return[dojo.date.stamp.fromISOString(B.date_taken)]
}else{if(A==="imageUrlSmall"){return[B.media.thumbnail[1].url]
}else{if(A==="imageUrl"){return[B.content$src]
}else{if(A==="imageUrlMedium"){return[B.media.thumbnail[2].url]
}else{if(A==="link"){return[B.link[1]]
}else{if(A==="tags"){return B.tags.split(" ")
}else{if(A==="description"){return[this._unescapeHtml(B.summary)]
}}}}}}}}}}return undefined
},isItem:function(A){if(A&&A[this._storeRef]===this){return true
}return false
},close:function(A){},_fetchItems:function(B,A,C){if(!B.query){B.query={}
}var E={alt:"jsonm",pp:"1",psc:"G"};
E["start-index"]="1";
if(B.query.start){E["start-index"]=B.query.start
}if(B.query.tags){E.q=B.query.tags
}if(B.query.userid){E.uname=B.query.userid
}if(B.query.userids){E.ids=B.query.userids
}if(B.query.lang){E.hl=B.query.lang
}if(B.count){E["max-results"]=B.count
}else{E["max-results"]="20"
}var I=this;
var D=null;
var H=function(J){if(D!==null){dojo.disconnect(D)
}A(I._processPicasaData(J),B)
};
var F={url:this._picasaUrl,content:E,callbackParamName:"callback",handle:H};
var G=dojo.io.script.get(F);
G.addErrback(function(J){dojo.disconnect(D);
C(J,B)
})
},_processPicasaData:function(D){var A=[];
if(D.feed){A=D.feed.entry;
for(var B=0;
B<A.length;
B++){var C=A[B];
C[this._storeRef]=this
}}return A
},_unescapeHtml:function(A){A=A.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"');
A=A.replace(/&#39;/gm,"'");
return A
}});
dojo.extend(dojox.data.PicasaStore,dojo.data.util.simpleFetch)
};