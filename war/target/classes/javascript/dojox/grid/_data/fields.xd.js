dojo._xdResourceLoaded({depends:[["provide","dojox.grid._data.fields"]],defineResource:function(A){if(!A._hasResource["dojox.grid._data.fields"]){A._hasResource["dojox.grid._data.fields"]=true;
A.provide("dojox.grid._data.fields");
A.declare("dojox.grid.data.Mixer",null,{constructor:function(){this.defaultValue={};
this.values=[]
},count:function(){return this.values.length
},clear:function(){this.values=[]
},build:function(B){var C=A.mixin({owner:this},this.defaultValue);
C.key=B;
this.values[B]=C;
return C
},getDefault:function(){return this.defaultValue
},setDefault:function(B){for(var D=0,C;
(C=arguments[D]);
D++){A.mixin(this.defaultValue,C)
}},get:function(B){return this.values[B]||this.build(B)
},_set:function(B,E){var C=this.get(B);
for(var D=1;
D<arguments.length;
D++){A.mixin(C,arguments[D])
}this.values[B]=C
},set:function(){if(arguments.length<1){return 
}var D=arguments[0];
if(!A.isArray(D)){this._set.apply(this,arguments)
}else{if(D.length&&D[0]["default"]){this.setDefault(D.shift())
}for(var B=0,C=D.length;
B<C;
B++){this._set(B,D[B])
}}},insert:function(B,C){if(B>=this.values.length){this.values[B]=C
}else{this.values.splice(B,0,C)
}},remove:function(B){this.values.splice(B,1)
},swap:function(B,C){dojox.grid.arraySwap(this.values,B,C)
},move:function(B,C){dojox.grid.arrayMove(this.values,B,C)
}});
dojox.grid.data.compare=function(B,C){return(B>C?1:(B==C?0:-1))
};
A.declare("dojox.grid.data.Field",null,{constructor:function(B){this.name=B;
this.compare=dojox.grid.data.compare
},na:dojox.grid.na});
A.declare("dojox.grid.data.Fields",dojox.grid.data.Mixer,{constructor:function(B){var C=B?B:dojox.grid.data.Field;
this.defaultValue=new C()
},indexOf:function(D){for(var B=0;
B<this.values.length;
B++){var C=this.values[B];
if(C&&C.key==D){return B
}}return -1
}})
}}});