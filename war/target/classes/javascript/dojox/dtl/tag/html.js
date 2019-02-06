if(!dojo._hasResource["dojox.dtl.tag.html"]){dojo._hasResource["dojox.dtl.tag.html"]=true;
dojo.provide("dojox.dtl.tag.html");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.html.HtmlNode=function(A){this.contents=new dojox.dtl.Filter(A);
this._div=document.createElement("div");
this._lasts=[]
};
dojo.extend(dojox.dtl.tag.html.HtmlNode,{render:function(B,F){var D=this.contents.resolve(B);
D=D.replace(/<(\/?script)/ig,"&lt;$1").replace(/\bon[a-z]+\s*=/ig,"");
if(this._rendered&&this._last!=D){F=this.unrender(B,F)
}this._last=D;
if(!this._rendered){this._rendered=true;
var E=this._div;
E.innerHTML=D;
var A=E.childNodes;
while(A.length){var C=E.removeChild(A[0]);
this._lasts.push(C);
F=F.concat(C)
}}return F
},unrender:function(B,D){if(this._rendered){this._rendered=false;
this._last="";
for(var A=0,C;
C=this._lasts[A++];
){D=D.remove(C);
dojo._destroyElement(C)
}this._lasts=[]
}return D
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this.contents.contents)
},toString:function(){return"dojox.dtl.tag.html.HtmlNode"
}});
dojox.dtl.tag.html.StyleNode=function(A){this.contents={};
this._styles=A;
for(var B in A){this.contents[B]=new dojox.dtl.Template(A[B])
}};
dojo.extend(dojox.dtl.tag.html.StyleNode,{render:function(B,C){for(var A in this.contents){dojo.style(C.getParent(),A,this.contents[A].render(B))
}return C
},unrender:function(A,B){return B
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.StyleNode"
}});
dojox.dtl.tag.html.AttachNode=function(A){this.contents=A
};
dojo.extend(dojox.dtl.tag.html.AttachNode,{render:function(A,B){if(!this._rendered){this._rendered=true;
A.getThis()[this.contents]=B.getParent()
}return B
},unrender:function(A,B){if(this._rendered){this._rendered=false;
if(A.getThis()[this.contents]===B.getParent()){delete A.getThis()[this.contents]
}}return B
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.AttachNode"
}});
dojox.dtl.tag.html.html=function(B,A){var C=A.split(" ",2);
return new dojox.dtl.tag.html.HtmlNode(C[1])
};
dojox.dtl.tag.html.tstyle=function(F,C){var E={};
C=C.replace(dojox.dtl.tag.html.tstyle._re,"");
var D=C.split(dojox.dtl.tag.html.tstyle._re1);
for(var H=0,I;
I=D[H];
H++){var G=I.split(dojox.dtl.tag.html.tstyle._re2);
var B=G[0];
var A=G[1];
if(A.indexOf("{{")==0){E[B]=A
}}return new dojox.dtl.tag.html.StyleNode(E)
};
dojo.mixin(dojox.dtl.tag.html.tstyle,{_re:/^tstyle\s+/,_re1:/\s*;\s*/g,_re2:/\s*:\s*/g});
dojox.dtl.tag.html.attach=function(B,A){var C=A.split(dojox.dtl.tag.html.attach._re);
return new dojox.dtl.tag.html.AttachNode(C[1])
};
dojo.mixin(dojox.dtl.tag.html.attach,{_re:/\s+/g})
};