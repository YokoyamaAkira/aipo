dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.html"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.html"]){A._hasResource["dojox.dtl.tag.html"]=true;
A.provide("dojox.dtl.tag.html");
A.require("dojox.dtl._base");
dojox.dtl.tag.html.HtmlNode=function(B){this.contents=new dojox.dtl.Filter(B);
this._div=document.createElement("div");
this._lasts=[]
};
A.extend(dojox.dtl.tag.html.HtmlNode,{render:function(D,B){var F=this.contents.resolve(D);
F=F.replace(/<(\/?script)/ig,"&lt;$1").replace(/\bon[a-z]+\s*=/ig,"");
if(this._rendered&&this._last!=F){B=this.unrender(D,B)
}this._last=F;
if(!this._rendered){this._rendered=true;
var G=this._div;
G.innerHTML=F;
var C=G.childNodes;
while(C.length){var E=G.removeChild(C[0]);
this._lasts.push(E);
B=B.concat(E)
}}return B
},unrender:function(D,B){if(this._rendered){this._rendered=false;
this._last="";
for(var C=0,E;
E=this._lasts[C++];
){B=B.remove(E);
A._destroyElement(E)
}this._lasts=[]
}return B
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this.contents.contents)
},toString:function(){return"dojox.dtl.tag.html.HtmlNode"
}});
dojox.dtl.tag.html.StyleNode=function(C){this.contents={};
this._styles=C;
for(var B in C){this.contents[B]=new dojox.dtl.Template(C[B])
}};
A.extend(dojox.dtl.tag.html.StyleNode,{render:function(D,B){for(var C in this.contents){A.style(B.getParent(),C,this.contents[C].render(D))
}return B
},unrender:function(C,B){return B
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.StyleNode"
}});
dojox.dtl.tag.html.AttachNode=function(B){this.contents=B
};
A.extend(dojox.dtl.tag.html.AttachNode,{render:function(C,B){if(!this._rendered){this._rendered=true;
C.getThis()[this.contents]=B.getParent()
}return B
},unrender:function(C,B){if(this._rendered){this._rendered=false;
if(C.getThis()[this.contents]===B.getParent()){delete C.getThis()[this.contents]
}}return B
},clone:function(B){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.AttachNode"
}});
dojox.dtl.tag.html.html=function(D,C){var B=C.split(" ",2);
return new dojox.dtl.tag.html.HtmlNode(B[1])
};
dojox.dtl.tag.html.tstyle=function(B,H){var J={};
H=H.replace(dojox.dtl.tag.html.tstyle._re,"");
var I=H.split(dojox.dtl.tag.html.tstyle._re1);
for(var D=0,E;
E=I[D];
D++){var C=E.split(dojox.dtl.tag.html.tstyle._re2);
var G=C[0];
var F=C[1];
if(F.indexOf("{{")==0){J[G]=F
}}return new dojox.dtl.tag.html.StyleNode(J)
};
A.mixin(dojox.dtl.tag.html.tstyle,{_re:/^tstyle\s+/,_re1:/\s*;\s*/g,_re2:/\s*:\s*/g});
dojox.dtl.tag.html.attach=function(D,C){var B=C.split(dojox.dtl.tag.html.attach._re);
return new dojox.dtl.tag.html.AttachNode(B[1])
};
A.mixin(dojox.dtl.tag.html.attach,{_re:/\s+/g})
}}});