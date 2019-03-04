if(!dojo._hasResource["dojox.fx._core"]){dojo._hasResource["dojox.fx._core"]=true;
dojo.provide("dojox.fx._core");
dojox.fx._Line=function(C,A){this.start=C;
this.end=A;
if(dojo.isArray(C)){var B=[];
dojo.forEach(this.start,function(E,D){B[D]=this.end[D]-E
},this);
this.getValue=function(E){var D=[];
dojo.forEach(this.start,function(G,F){D[F]=(B[F]*E)+G
},this);
return D
}
}else{var B=A-C;
this.getValue=function(D){return(B*D)+this.start
}
}}
};