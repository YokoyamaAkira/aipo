dojo._xdResourceLoaded({depends:[["provide","dojo.string"]],defineResource:function(A){if(!A._hasResource["dojo.string"]){A._hasResource["dojo.string"]=true;
A.provide("dojo.string");
A.string.pad=function(F,D,E,B){var C=String(F);
if(!E){E="0"
}while(C.length<D){if(B){C+=E
}else{C=E+C
}}return C
};
A.string.substitute=function(D,E,C,B){return D.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(F,G,I){var H=A.getObject(G,false,E);
if(I){H=A.getObject(I,false,B)(H)
}if(C){H=C(H,G)
}return H.toString()
})
};
A.string.trim=function(C){C=C.replace(/^\s+/,"");
for(var B=C.length-1;
B>0;
B--){if(/\S/.test(C.charAt(B))){C=C.substring(0,B+1);
break
}}return C
}
}}});