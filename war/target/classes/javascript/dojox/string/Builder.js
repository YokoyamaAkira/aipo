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
},replace:function(C,D){var B=this.toString();
B=B.replace(C,D);
this._reset(B);
this.length=B.length;
return this
},remove:function(B,C){if(C==0){return this
}var D=this.toString();
this.clear();
if(B>0){this.append(D.substring(0,B))
}if(B+C<D.length){this.append(D.substring(B+C))
}return this
},insert:function(C,B){var D=this.toString();
this.clear();
if(C==0){this.append(B);
this.append(D);
return this
}else{this.append(D.substring(0,C));
this.append(B);
this.append(D.substring(C))
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