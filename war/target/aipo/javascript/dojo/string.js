if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(E,C,D,A){var B=String(E);
if(!D){D="0"
}while(B.length<C){if(A){B+=D
}else{B=D+B
}}return B
};
dojo.string.substitute=function(C,D,B,A){return C.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(E,F,H){var G=dojo.getObject(F,false,D);
if(H){G=dojo.getObject(H,false,A)(G)
}if(B){G=B(G,F)
}return G.toString()
})
};
dojo.string.trim=function(B){B=B.replace(/^\s+/,"");
for(var A=B.length-1;
A>0;
A--){if(/\S/.test(B.charAt(A))){B=B.substring(0,A+1);
break
}}return B
}
};