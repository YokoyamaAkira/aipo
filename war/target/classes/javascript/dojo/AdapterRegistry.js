if(!dojo._hasResource["dojo.AdapterRegistry"]){dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(A){this.pairs=[];
this.returnWrappers=A||false
};
dojo.extend(dojo.AdapterRegistry,{register:function(B,A,D,E,C){this.pairs[((C)?"unshift":"push")]([B,A,D,E])
},match:function(){for(var B=0;
B<this.pairs.length;
B++){var A=this.pairs[B];
if(A[1].apply(this,arguments)){if((A[3])||(this.returnWrappers)){return A[2]
}else{return A[2].apply(this,arguments)
}}}throw new Error("No match found")
},unregister:function(C){for(var A=0;
A<this.pairs.length;
A++){var B=this.pairs[A];
if(B[0]==C){this.pairs.splice(A,1);
return true
}}return false
}})
};