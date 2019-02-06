dojo._xdResourceLoaded({depends:[["provide","dojox.fx._core"]],defineResource:function(A){if(!A._hasResource["dojox.fx._core"]){A._hasResource["dojox.fx._core"]=true;
A.provide("dojox.fx._core");
dojox.fx._Line=function(B,C){this.start=B;
this.end=C;
if(A.isArray(B)){var D=[];
A.forEach(this.start,function(F,E){D[E]=this.end[E]-F
},this);
this.getValue=function(F){var E=[];
A.forEach(this.start,function(H,G){E[G]=(D[G]*F)+H
},this);
return E
}
}else{var D=C-B;
this.getValue=function(E){return(D*E)+this.start
}
}}
}}});