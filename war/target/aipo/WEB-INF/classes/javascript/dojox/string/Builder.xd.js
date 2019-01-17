dojo._xdResourceLoaded({depends:[["provide","dojox.string.Builder"]],defineResource:function(A){if(!A._hasResource["dojox.string.Builder"]){A._hasResource["dojox.string.Builder"]=true;
A.provide("dojox.string.Builder");
(function(){dojox.string.Builder=function(C){this.b=A.isIE?[]:"";
if(C){this.append(C)
}};
var B={append:function(C){return this.appendArray(A._toArray(arguments))
},concat:function(C){return this.append(C)
},appendArray:function(C){this.b=String.prototype.concat.apply(this.b,C);
return this
},clear:function(){this._clear();
this.length=0;
return this
},replace:function(C,D){var E=this.toString();
E=E.replace(C,D);
this._reset(E);
this.length=E.length;
return this
},remove:function(E,C){if(C==0){return this
}var D=this.toString();
this.clear();
if(E>0){this.append(D.substring(0,E))
}if(E+C<D.length){this.append(D.substring(E+C))
}return this
},insert:function(C,E){var D=this.toString();
this.clear();
if(C==0){this.append(E);
this.append(D);
return this
}else{this.append(D.substring(0,C));
this.append(E);
this.append(D.substring(C))
}return this
},toString:function(){return this.b
},_clear:function(){this.b=""
},_reset:function(C){this.b=C
}};
if(A.isIE){A.mixin(B,{toString:function(){return this.b.join("")
},appendArray:function(C){this.b=this.b.concat(C);
return this
},_clear:function(){this.b=[]
},_reset:function(C){this.b=[C]
}})
}A.extend(dojox.string.Builder,B)
})()
}}});