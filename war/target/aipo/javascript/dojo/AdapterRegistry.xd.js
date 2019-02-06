dojo._xdResourceLoaded({depends:[["provide","dojo.AdapterRegistry"]],defineResource:function(A){if(!A._hasResource["dojo.AdapterRegistry"]){A._hasResource["dojo.AdapterRegistry"]=true;
A.provide("dojo.AdapterRegistry");
A.AdapterRegistry=function(B){this.pairs=[];
this.returnWrappers=B||false
};
A.extend(A.AdapterRegistry,{register:function(D,C,F,B,E){this.pairs[((E)?"unshift":"push")]([D,C,F,B])
},match:function(){for(var B=0;
B<this.pairs.length;
B++){var C=this.pairs[B];
if(C[1].apply(this,arguments)){if((C[3])||(this.returnWrappers)){return C[2]
}else{return C[2].apply(this,arguments)
}}}throw new Error("No match found")
},unregister:function(B){for(var C=0;
C<this.pairs.length;
C++){var D=this.pairs[C];
if(D[0]==B){this.pairs.splice(C,1);
return true
}}return false
}})
}}});