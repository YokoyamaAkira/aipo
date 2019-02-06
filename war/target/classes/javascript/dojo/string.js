if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(D,B,C,E){var A=String(D);
if(!C){C="0"
}while(A.length<B){if(E){A+=C
}else{A=C+A
}}return A
};
dojo.string.substitute=function(B,C,A,D){return B.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(F,G,E){var H=dojo.getObject(G,false,C);
if(E){H=dojo.getObject(E,false,D)(H)
}if(A){H=A(H,G)
}return H.toString()
})
};
dojo.string.trim=function(A){A=A.replace(/^\s+/,"");
for(var B=A.length-1;
B>0;
B--){if(/\S/.test(A.charAt(B))){A=A.substring(0,B+1);
break
}}return A
}
};