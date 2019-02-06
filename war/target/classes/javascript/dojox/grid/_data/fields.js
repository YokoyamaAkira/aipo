if(!dojo._hasResource["dojox.grid._data.fields"]){dojo._hasResource["dojox.grid._data.fields"]=true;
dojo.provide("dojox.grid._data.fields");
dojo.declare("dojox.grid.data.Mixer",null,{constructor:function(){this.defaultValue={};
this.values=[]
},count:function(){return this.values.length
},clear:function(){this.values=[]
},build:function(A){var B=dojo.mixin({owner:this},this.defaultValue);
B.key=A;
this.values[A]=B;
return B
},getDefault:function(){return this.defaultValue
},setDefault:function(B){for(var A=0,C;
(C=arguments[A]);
A++){dojo.mixin(this.defaultValue,C)
}},get:function(A){return this.values[A]||this.build(A)
},_set:function(C,B){var D=this.get(C);
for(var A=1;
A<arguments.length;
A++){dojo.mixin(D,arguments[A])
}this.values[C]=D
},set:function(){if(arguments.length<1){return 
}var A=arguments[0];
if(!dojo.isArray(A)){this._set.apply(this,arguments)
}else{if(A.length&&A[0]["default"]){this.setDefault(A.shift())
}for(var B=0,C=A.length;
B<C;
B++){this._set(B,A[B])
}}},insert:function(A,B){if(A>=this.values.length){this.values[A]=B
}else{this.values.splice(A,0,B)
}},remove:function(A){this.values.splice(A,1)
},swap:function(A,B){dojox.grid.arraySwap(this.values,A,B)
},move:function(A,B){dojox.grid.arrayMove(this.values,A,B)
}});
dojox.grid.data.compare=function(A,B){return(A>B?1:(A==B?0:-1))
};
dojo.declare("dojox.grid.data.Field",null,{constructor:function(A){this.name=A;
this.compare=dojox.grid.data.compare
},na:dojox.grid.na});
dojo.declare("dojox.grid.data.Fields",dojox.grid.data.Mixer,{constructor:function(A){var B=A?A:dojox.grid.data.Field;
this.defaultValue=new B()
},indexOf:function(A){for(var B=0;
B<this.values.length;
B++){var C=this.values[B];
if(C&&C.key==A){return B
}}return -1
}})
};