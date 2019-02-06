if(!dojo._hasResource["dojox.fx._core"]){dojo._hasResource["dojox.fx._core"]=true;
dojo.provide("dojox.fx._core");
dojox.fx._Line=function(B,C){this.start=B;
this.end=C;
if(dojo.isArray(B)){var A=[];
dojo.forEach(this.start,function(D,E){A[E]=this.end[E]-D
},this);
this.getValue=function(D){var E=[];
dojo.forEach(this.start,function(G,F){E[F]=(A[F]*D)+G
},this);
return E
}
}else{var A=C-B;
this.getValue=function(D){return(A*D)+this.start
}
}}
};