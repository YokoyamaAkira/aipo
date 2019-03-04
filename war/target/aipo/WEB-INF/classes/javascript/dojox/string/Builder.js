if(!dojo._hasResource["dojox.string.Builder"]){dojo._hasResource["dojox.string.Builder"]=true;
dojo.provide("dojox.string.Builder");
(function(){dojox.string.Builder=function(B){this.b=dojo.isIE?[]:"";
if(B){this.append(B)
}};
var A={append:function(B){return this.appendArray(dojo._toArray(arguments))
},concat:function(B){return this.append(B)
},appendArray:function(B){this.b=String.prototype.concat.apply(this.b,B);
return this
},clear:function(){this._clear();
this.length=0;
return this
},replace:function(B,C){var D=this.toString();
D=D.replace(B,C);
this._reset(D);
this.length=D.length;
return this
},remove:function(D,B){if(B==0){return this
}var C=this.toString();
this.clear();
if(D>0){this.append(C.substring(0,D))
}if(D+B<C.length){this.append(C.substring(D+B))
}return this
},insert:function(B,D){var C=this.toString();
this.clear();
if(B==0){this.append(D);
this.append(C);
return this
}else{this.append(C.substring(0,B));
this.append(D);
this.append(C.substring(B))
}return this
},toString:function(){return this.b
},_clear:function(){this.b=""
},_reset:function(B){this.b=B
}};
if(dojo.isIE){dojo.mixin(A,{toString:function(){return this.b.join("")
},appendArray:function(B){this.b=this.b.concat(B);
return this
},_clear:function(){this.b=[]
},_reset:function(B){this.b=[B]
}})
}dojo.extend(dojox.string.Builder,A)
})()
};