dojo._xdResourceLoaded({depends:[["provide","dojo.string"]],defineResource:function(A){if(!A._hasResource["dojo.string"]){A._hasResource["dojo.string"]=true;
A.provide("dojo.string");
A.string.pad=function(B,E,F,C){var D=String(B);
if(!F){F="0"
}while(D.length<E){if(C){D+=F
}else{D=F+D
}}return D
};
A.string.substitute=function(E,B,D,C){return E.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(F,G,I){var H=A.getObject(G,false,B);
if(I){H=A.getObject(I,false,C)(H)
}if(D){H=D(H,G)
}return H.toString()
})
};
A.string.trim=function(B){B=B.replace(/^\s+/,"");
for(var C=B.length-1;
C>0;
C--){if(/\S/.test(B.charAt(C))){B=B.substring(0,C+1);
break
}}return B
}
}}});