if(!dojo._hasResource["dojox.grid._data.fields"]){dojo._hasResource["dojox.grid._data.fields"]=true;
dojo.provide("dojox.grid._data.fields");
dojo.declare("dojox.grid.data.Mixer",null,{constructor:function(){this.defaultValue={};
this.values=[]
},count:function(){return this.values.length
},clear:function(){this.values=[]
},build:function(B){var A=dojo.mixin({owner:this},this.defaultValue);
A.key=B;
this.values[B]=A;
return A
},getDefault:function(){return this.defaultValue
},setDefault:function(C){for(var B=0,A;
(A=arguments[B]);
B++){dojo.mixin(this.defaultValue,A)
}},get:function(A){return this.values[A]||this.build(A)
},_set:function(D,C){var A=this.get(D);
for(var B=1;
B<arguments.length;
B++){dojo.mixin(A,arguments[B])
}this.values[D]=A
},set:function(){if(arguments.length<1){return 
}var B=arguments[0];
if(!dojo.isArray(B)){this._set.apply(this,arguments)
}else{if(B.length&&B[0]["default"]){this.setDefault(B.shift())
}for(var C=0,A=B.length;
C<A;
C++){this._set(C,B[C])
}}},insert:function(B,A){if(B>=this.values.length){this.values[B]=A
}else{this.values.splice(B,0,A)
}},remove:function(A){this.values.splice(A,1)
},swap:function(B,A){dojox.grid.arraySwap(this.values,B,A)
},move:function(B,A){dojox.grid.arrayMove(this.values,B,A)
}});
dojox.grid.data.compare=function(B,A){return(B>A?1:(B==A?0:-1))
};
dojo.declare("dojox.grid.data.Field",null,{constructor:function(A){this.name=A;
this.compare=dojox.grid.data.compare
},na:dojox.grid.na});
dojo.declare("dojox.grid.data.Fields",dojox.grid.data.Mixer,{constructor:function(B){var A=B?B:dojox.grid.data.Field;
this.defaultValue=new A()
},indexOf:function(B){for(var C=0;
C<this.values.length;
C++){var A=this.values[C];
if(A&&A.key==B){return C
}}return -1
}})
};