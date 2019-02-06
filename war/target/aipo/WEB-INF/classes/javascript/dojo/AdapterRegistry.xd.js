dojo._xdResourceLoaded({depends:[["provide","dojo.AdapterRegistry"]],defineResource:function(A){if(!A._hasResource["dojo.AdapterRegistry"]){A._hasResource["dojo.AdapterRegistry"]=true;
A.provide("dojo.AdapterRegistry");
A.AdapterRegistry=function(B){this.pairs=[];
this.returnWrappers=B||false
};
A.extend(A.AdapterRegistry,{register:function(E,D,B,C,F){this.pairs[((F)?"unshift":"push")]([E,D,B,C])
},match:function(){for(var C=0;
C<this.pairs.length;
C++){var B=this.pairs[C];
if(B[1].apply(this,arguments)){if((B[3])||(this.returnWrappers)){return B[2]
}else{return B[2].apply(this,arguments)
}}}throw new Error("No match found")
},unregister:function(C){for(var D=0;
D<this.pairs.length;
D++){var B=this.pairs[D];
if(B[0]==C){this.pairs.splice(D,1);
return true
}}return false
}})
}}});