dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.fields"]],defineResource:function(A){if(!A._hasResource["dojox.grid._data.fields"]){A._hasResource["dojox.grid._data.fields"]=true;
A.provide("dojox.grid._data.fields");
A.declare("dojox.grid.data.Mixer",null,{constructor:function(){this.defaultValue={};
this.values=[]
},count:function(){return this.values.length
},clear:function(){this.values=[]
},build:function(C){var B=A.mixin({owner:this},this.defaultValue);
B.key=C;
this.values[C]=B;
return B
},getDefault:function(){return this.defaultValue
},setDefault:function(D){for(var C=0,B;
(B=arguments[C]);
C++){A.mixin(this.defaultValue,B)
}},get:function(B){return this.values[B]||this.build(B)
},_set:function(E,D){var B=this.get(E);
for(var C=1;
C<arguments.length;
C++){A.mixin(B,arguments[C])
}this.values[E]=B
},set:function(){if(arguments.length<1){return 
}var C=arguments[0];
if(!A.isArray(C)){this._set.apply(this,arguments)
}else{if(C.length&&C[0]["default"]){this.setDefault(C.shift())
}for(var D=0,B=C.length;
D<B;
D++){this._set(D,C[D])
}}},insert:function(C,B){if(C>=this.values.length){this.values[C]=B
}else{this.values.splice(C,0,B)
}},remove:function(B){this.values.splice(B,1)
},swap:function(C,B){dojox.grid.arraySwap(this.values,C,B)
},move:function(C,B){dojox.grid.arrayMove(this.values,C,B)
}});
dojox.grid.data.compare=function(C,B){return(C>B?1:(C==B?0:-1))
};
A.declare("dojox.grid.data.Field",null,{constructor:function(B){this.name=B;
this.compare=dojox.grid.data.compare
},na:dojox.grid.na});
A.declare("dojox.grid.data.Fields",dojox.grid.data.Mixer,{constructor:function(C){var B=C?C:dojox.grid.data.Field;
this.defaultValue=new B()
},indexOf:function(C){for(var D=0;
D<this.values.length;
D++){var B=this.values[D];
if(B&&B.key==C){return D
}}return -1
}})
}}});