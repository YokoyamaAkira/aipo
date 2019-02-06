if(!dojo._hasResource["dojo.AdapterRegistry"]){dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(A){this.pairs=[];
this.returnWrappers=A||false
};
dojo.extend(dojo.AdapterRegistry,{register:function(C,B,E,A,D){this.pairs[((D)?"unshift":"push")]([C,B,E,A])
},match:function(){for(var A=0;
A<this.pairs.length;
A++){var B=this.pairs[A];
if(B[1].apply(this,arguments)){if((B[3])||(this.returnWrappers)){return B[2]
}else{return B[2].apply(this,arguments)
}}}throw new Error("No match found")
},unregister:function(A){for(var B=0;
B<this.pairs.length;
B++){var C=this.pairs[B];
if(C[0]==A){this.pairs.splice(B,1);
return true
}}return false
}})
};