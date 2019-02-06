dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.html"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.html"]){A._hasResource["dojox.dtl.tag.html"]=true;
A.provide("dojox.dtl.tag.html");
A.require("dojox.dtl._base");
dojox.dtl.tag.html.HtmlNode=function(B){this.contents=new dojox.dtl.Filter(B);
this._div=document.createElement("div");
this._lasts=[]
};
A.extend(dojox.dtl.tag.html.HtmlNode,{render:function(E,C){var G=this.contents.resolve(E);
G=G.replace(/<(\/?script)/ig,"&lt;$1").replace(/\bon[a-z]+\s*=/ig,"");
if(this._rendered&&this._last!=G){C=this.unrender(E,C)
}this._last=G;
if(!this._rendered){this._rendered=true;
var B=this._div;
B.innerHTML=G;
var D=B.childNodes;
while(D.length){var F=B.removeChild(D[0]);
this._lasts.push(F);
C=C.concat(F)
}}return C
},unrender:function(E,C){if(this._rendered){this._rendered=false;
this._last="";
for(var D=0,B;
B=this._lasts[D++];
){C=C.remove(B);
A._destroyElement(B)
}this._lasts=[]
}return C
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this.contents.contents)
},toString:function(){return"dojox.dtl.tag.html.HtmlNode"
}});
dojox.dtl.tag.html.StyleNode=function(B){this.contents={};
this._styles=B;
for(var C in B){this.contents[C]=new dojox.dtl.Template(B[C])
}};
A.extend(dojox.dtl.tag.html.StyleNode,{render:function(B,C){for(var D in this.contents){A.style(C.getParent(),D,this.contents[D].render(B))
}return C
},unrender:function(B,C){return C
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.StyleNode"
}});
dojox.dtl.tag.html.AttachNode=function(B){this.contents=B
};
A.extend(dojox.dtl.tag.html.AttachNode,{render:function(B,C){if(!this._rendered){this._rendered=true;
B.getThis()[this.contents]=C.getParent()
}return C
},unrender:function(B,C){if(this._rendered){this._rendered=false;
if(B.getThis()[this.contents]===C.getParent()){delete B.getThis()[this.contents]
}}return C
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.AttachNode"
}});
dojox.dtl.tag.html.html=function(B,D){var C=D.split(" ",2);
return new dojox.dtl.tag.html.HtmlNode(C[1])
};
dojox.dtl.tag.html.tstyle=function(I,F){var H={};
F=F.replace(dojox.dtl.tag.html.tstyle._re,"");
var G=F.split(dojox.dtl.tag.html.tstyle._re1);
for(var B=0,C;
C=G[B];
B++){var J=C.split(dojox.dtl.tag.html.tstyle._re2);
var E=J[0];
var D=J[1];
if(D.indexOf("{{")==0){H[E]=D
}}return new dojox.dtl.tag.html.StyleNode(H)
};
A.mixin(dojox.dtl.tag.html.tstyle,{_re:/^tstyle\s+/,_re1:/\s*;\s*/g,_re2:/\s*:\s*/g});
dojox.dtl.tag.html.attach=function(B,D){var C=D.split(dojox.dtl.tag.html.attach._re);
return new dojox.dtl.tag.html.AttachNode(C[1])
};
A.mixin(dojox.dtl.tag.html.attach,{_re:/\s+/g})
}}});