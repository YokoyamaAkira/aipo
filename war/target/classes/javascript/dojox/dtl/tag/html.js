if(!dojo._hasResource["dojox.dtl.tag.html"]){dojo._hasResource["dojox.dtl.tag.html"]=true;
dojo.provide("dojox.dtl.tag.html");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.html.HtmlNode=function(A){this.contents=new dojox.dtl.Filter(A);
this._div=document.createElement("div");
this._lasts=[]
};
dojo.extend(dojox.dtl.tag.html.HtmlNode,{render:function(C,A){var E=this.contents.resolve(C);
E=E.replace(/<(\/?script)/ig,"&lt;$1").replace(/\bon[a-z]+\s*=/ig,"");
if(this._rendered&&this._last!=E){A=this.unrender(C,A)
}this._last=E;
if(!this._rendered){this._rendered=true;
var F=this._div;
F.innerHTML=E;
var B=F.childNodes;
while(B.length){var D=F.removeChild(B[0]);
this._lasts.push(D);
A=A.concat(D)
}}return A
},unrender:function(C,A){if(this._rendered){this._rendered=false;
this._last="";
for(var B=0,D;
D=this._lasts[B++];
){A=A.remove(D);
dojo._destroyElement(D)
}this._lasts=[]
}return A
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this.contents.contents)
},toString:function(){return"dojox.dtl.tag.html.HtmlNode"
}});
dojox.dtl.tag.html.StyleNode=function(B){this.contents={};
this._styles=B;
for(var A in B){this.contents[A]=new dojox.dtl.Template(B[A])
}};
dojo.extend(dojox.dtl.tag.html.StyleNode,{render:function(C,A){for(var B in this.contents){dojo.style(A.getParent(),B,this.contents[B].render(C))
}return A
},unrender:function(B,A){return A
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.StyleNode"
}});
dojox.dtl.tag.html.AttachNode=function(A){this.contents=A
};
dojo.extend(dojox.dtl.tag.html.AttachNode,{render:function(B,A){if(!this._rendered){this._rendered=true;
B.getThis()[this.contents]=A.getParent()
}return A
},unrender:function(B,A){if(this._rendered){this._rendered=false;
if(B.getThis()[this.contents]===A.getParent()){delete B.getThis()[this.contents]
}}return A
},clone:function(A){return new dojox.dtl.tag.html.HtmlNode(this._styles)
},toString:function(){return"dojox.dtl.tag.html.AttachNode"
}});
dojox.dtl.tag.html.html=function(C,B){var A=B.split(" ",2);
return new dojox.dtl.tag.html.HtmlNode(A[1])
};
dojox.dtl.tag.html.tstyle=function(A,G){var I={};
G=G.replace(dojox.dtl.tag.html.tstyle._re,"");
var H=G.split(dojox.dtl.tag.html.tstyle._re1);
for(var C=0,D;
D=H[C];
C++){var B=D.split(dojox.dtl.tag.html.tstyle._re2);
var F=B[0];
var E=B[1];
if(E.indexOf("{{")==0){I[F]=E
}}return new dojox.dtl.tag.html.StyleNode(I)
};
dojo.mixin(dojox.dtl.tag.html.tstyle,{_re:/^tstyle\s+/,_re1:/\s*;\s*/g,_re2:/\s*:\s*/g});
dojox.dtl.tag.html.attach=function(C,B){var A=B.split(dojox.dtl.tag.html.attach._re);
return new dojox.dtl.tag.html.AttachNode(A[1])
};
dojo.mixin(dojox.dtl.tag.html.attach,{_re:/\s+/g})
};