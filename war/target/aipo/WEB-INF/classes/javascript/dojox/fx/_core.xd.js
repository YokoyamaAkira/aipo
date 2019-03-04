dojo._xdResourceLoaded({depends:[["provide","dojox.fx._core"]],defineResource:function(A){if(!A._hasResource["dojox.fx._core"]){A._hasResource["dojox.fx._core"]=true;
A.provide("dojox.fx._core");
dojox.fx._Line=function(D,B){this.start=D;
this.end=B;
if(A.isArray(D)){var C=[];
A.forEach(this.start,function(F,E){C[E]=this.end[E]-F
},this);
this.getValue=function(F){var E=[];
A.forEach(this.start,function(H,G){E[G]=(C[G]*F)+H
},this);
return E
}
}else{var C=B-D;
this.getValue=function(E){return(C*E)+this.start
}
}}
}}});