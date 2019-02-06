if(!dojo._hasResource["dojox.dtl.html"]){dojo._hasResource["dojox.dtl.html"]=true;
dojo.provide("dojox.dtl.html");
dojo.require("dojox.dtl._base");
dojox.dtl.ObjectMap=function(){this.contents=[]
};
dojo.extend(dojox.dtl.ObjectMap,{get:function(A){var C=this.contents;
for(var D=0,B;
B=C[D];
D++){if(B[0]===A){return B[1]
}}},put:function(A,D){var C=this.contents;
for(var E=0,B;
B=C[E];
E++){if(B[0]===A){if(arguments.length==1){C.splice(E,1);
return 
}B[1]=D;
return 
}}C.push([A,D])
},toString:function(){return"dojox.dtl.ObjectMap"
}});
dojox.dtl.html={types:dojo.mixin({change:-11,attr:-12,elem:1,text:3},dojox.dtl.text.types),_attributes:{},_re:/(^\s+|\s+$)/g,_re2:/\b([a-zA-Z]+)="/g,_re3:/<!--({({|%).*?(%|})})-->/g,_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_trim:function(A){return A.replace(this._re,"")
},getTemplate:function(B){if(typeof this._commentable=="undefined"){this._commentable=false;
var C=document.createElement("div");
C.innerHTML="<!--Test comment handling, and long comments, using comments whenever possible.-->";
if(C.childNodes.length&&C.childNodes[0].nodeType==8&&C.childNodes[0].data=="comment"){this._commentable=true
}}if(!this._commentable){B=B.replace(this._re3,"$1")
}var A;
while(A=this._re2.exec(B)){this._attributes[A[1]]=true
}var C=document.createElement("div");
C.innerHTML=B;
var D={pres:[],posts:[]};
while(C.childNodes.length){if(!D.node&&C.childNodes[0].nodeType==1){D.node=C.removeChild(C.childNodes[0])
}else{if(!D.node){D.pres.push(C.removeChild(C.childNodes[0]))
}else{D.posts.push(C.removeChild(C.childNodes[0]))
}}}if(!D.node){throw new Error("Template did not provide any content")
}return D
},tokenize:function(M,G,F,A){G=G||[];
var D=!G.length;
var E=this.types;
var L=[];
for(var C=0,K;
K=M.childNodes[C];
C++){L.push(K)
}if(F){for(var C=0,K;
K=F[C];
C++){this._tokenize(M,K,G)
}}G.push([E.elem,M]);
G.push([E.change,M]);
for(var I in this._attributes){var H="";
if(I=="class"){H=M.className||H
}else{if(I=="for"){H=M.htmlFor||H
}else{if(M.getAttribute){H=M.getAttribute(I,2)||H;
if(I=="href"||I=="src"){if(dojo.isIE){var B=location.href.lastIndexOf(location.hash);
var J=location.href.substring(0,B).split("/");
J.pop();
J=J.join("/")+"/";
if(H.indexOf(J)==0){H=H.replace(J,"")
}H=H.replace(/%20/g," ").replace(/%7B/g,"{").replace(/%7D/g,"}").replace(/%25/g,"%")
}if(H.indexOf("{%")!=-1||H.indexOf("{{")!=-1){M.setAttribute(I,"")
}}}}}if(typeof H=="function"){H=H.toString().replace(this._re4,"$1")
}if(typeof H=="string"&&(H.indexOf("{%")!=-1||H.indexOf("{{")!=-1||(H&&dojox.dtl.text.getTag("attr:"+I,true)))){G.push([E.attr,M,I,H])
}}if(!L.length){G.push([E.change,M.parentNode,true]);
if(A){for(var C=0,K;
K=A[C];
C++){this._tokenize(M,K,G)
}}return G
}for(var C=0,K;
K=L[C];
C++){this._tokenize(M,K,G)
}if(M.parentNode&&M.parentNode.tagName){G.push([E.change,M.parentNode,true]);
M.parentNode.removeChild(M)
}if(A){for(var C=0,K;
K=A[C];
C++){this._tokenize(M,K,G)
}}if(D){G.push([E.change,M,true])
}return G
},_tokenize:function(F,C,A){var E=this.types;
var H=C.data;
switch(C.nodeType){case 1:this.tokenize(C,A);
break;
case 3:if(H.match(/[^\s\n]/)){if(H.indexOf("{{")!=-1||H.indexOf("{%")!=-1){var G=dojox.dtl.text.tokenize(H);
for(var D=0,B;
B=G[D];
D++){if(typeof B=="string"){A.push([E.text,B])
}else{A.push(B)
}}}else{A.push([C.nodeType,C])
}}if(C.parentNode){C.parentNode.removeChild(C)
}break;
case 8:if(H.indexOf("{%")==0){A.push([E.tag,this._trim(H.substring(2,H.length-3))])
}if(H.indexOf("{{")==0){A.push([E.varr,this._trim(H.substring(2,H.length-3))])
}if(C.parentNode){C.parentNode.removeChild(C)
}break
}}};
dojox.dtl.HtmlTemplate=function(C){var E=dojox.dtl;
var A=E.html;
if(!C.node){if(typeof C=="object"){C=dojox.dtl.text.getTemplateString(C)
}C=A.getTemplate(C)
}var B=A.tokenize(C.node,[],C.pres,C.posts);
var D=new E.HtmlParser(B);
this.nodelist=D.parse()
};
dojo.extend(dojox.dtl.HtmlTemplate,{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(A){this.getRootNode().className=A
},getRootNode:function(){return this.rootNode
},getBuffer:function(){return new dojox.dtl.HtmlBuffer()
},render:function(C,D){D=D||this.getBuffer();
this.rootNode=null;
var B=dojo.connect(D,"onSetParent",this,function(E){if(!this.rootNode){this.rootNode=E||true
}});
var A=this.nodelist.render(C||new dojox.dtl.Context({}),D);
dojo.disconnect(B);
D._flushCache();
return A
},unrender:function(A,B){return this.nodelist.unrender(A,B)
},toString:function(){return"dojox.dtl.HtmlTemplate"
}});
dojox.dtl.HtmlBuffer=function(A){this._parent=A;
this._cache=[]
};
dojo.extend(dojox.dtl.HtmlBuffer,{concat:function(C){if(!this._parent){return this
}if(C.nodeType){var D=this._getCache(this._parent);
if(C.parentNode===this._parent){var B=0;
for(var B=0,A;
A=D[B];
B++){this.onAddNode(C);
this._parent.insertBefore(A,C)
}D.length=0
}if(!C.parentNode||!C.parentNode.tagName){if(!this._parent.childNodes.length){this.onAddNode(C);
this._parent.appendChild(C)
}else{D.push(C)
}}}return this
},remove:function(A){if(typeof A=="string"){this._parent.removeAttribute(A)
}else{if(A.parentNode===this._parent){this.onRemoveNode();
this._parent.removeChild(A)
}}return this
},setAttribute:function(B,A){if(B=="class"){this._parent.className=A
}else{if(B=="for"){this._parent.htmlFor=A
}else{if(this._parent.setAttribute){this._parent.setAttribute(B,A)
}}}return this
},setParent:function(D,E){if(!this._parent){this._parent=D
}var A=this._getCache(this._parent);
if(A&&A.length&&E){for(var C=0,B;
B=A[C];
C++){if(B!==this._parent&&(!B.parentNode||!B.parentNode.tagName)){this.onAddNode(B);
this._parent.appendChild(B)
}}A.length=0
}this.onSetParent(D,E);
this._parent=D;
return this
},getParent:function(){return this._parent
},onSetParent:function(){},onAddNode:function(){},onRemoveNode:function(){},_getCache:function(C){for(var B=0,A;
A=this._cache[B];
B++){if(A[0]===C){return A[1]
}}var D=[];
this._cache.push([C,D]);
return D
},_flushCache:function(B){for(var A=0,C;
C=this._cache[A];
A++){if(!C[1].length){this._cache.splice(A--,1)
}}},toString:function(){return"dojox.dtl.HtmlBuffer"
}});
dojox.dtl.HtmlNode=function(A){this.contents=A
};
dojo.extend(dojox.dtl.HtmlNode,{render:function(A,B){return B.concat(this.contents)
},unrender:function(A,B){return B.remove(this.contents)
},clone:function(A){return new dojox.dtl.HtmlNode(this.contents)
},toString:function(){return"dojox.dtl.HtmlNode"
}});
dojox.dtl.HtmlNodeList=function(A){this.contents=A||[]
};
dojo.extend(dojox.dtl.HtmlNodeList,{parents:new dojox.dtl.ObjectMap(),push:function(A){this.contents.push(A)
},unshift:function(A){this.contents.unshift(A)
},render:function(C,A,E){if(E){var D=A.getParent()
}for(var B=0;
B<this.contents.length;
B++){A=this.contents[B].render(C,A);
if(!A){throw new Error("Template node render functions must return their buffer")
}}if(D){A.setParent(D,true)
}return A
},unrender:function(B,C){for(var A=0;
A<this.contents.length;
A++){C=this.contents[A].unrender(B,C);
if(!C){throw new Error("Template node render functions must return their buffer")
}}return C
},clone:function(J){var E=dojox.dtl;
var A=E.html;
var D=J.getParent();
var I=this.contents;
var G=new E.HtmlNodeList();
var B=[];
for(var K=0;
K<I.length;
K++){var C=I[K].clone(J);
if(C instanceof E.ChangeNode||C instanceof E.HtmlNode){var F=this.parents.get(C.contents);
if(F){C.contents=F
}else{if(D!==C.contents&&C instanceof E.HtmlNode){var H=C.contents;
C.contents=C.contents.cloneNode(false);
B.push(H);
this.parents.put(H,C.contents)
}}}G.push(C)
}for(var K=0,C;
C=B[K];
K++){this.parents.put(C)
}return G
},toString:function(){return"dojox.dtl.HtmlNodeList"
}});
dojox.dtl.HtmlVarNode=function(A){this.contents=new dojox.dtl.Filter(A);
this._lists={}
};
dojo.extend(dojox.dtl.HtmlVarNode,{render:function(A,G){this._rendered=true;
var E=dojox.dtl;
var H=E.html;
var C=this.contents.resolve(A);
if(C&&C.render&&C.getRootNode){var F=this._curr=C.getRootNode();
var D=this._lists;
var B=D[F];
if(!B){B=D[F]=new E.HtmlNodeList();
B.push(new E.ChangeNode(G.getParent()));
B.push(new E.HtmlNode(F));
B.push(C);
B.push(new E.ChangeNode(G.getParent(),true))
}return B.render(A,G)
}else{if(!this._txt){this._txt=document.createTextNode(C)
}if(this._txt.data!=C){this._txt.data=C
}return G.concat(this._txt)
}return G
},unrender:function(A,B){if(this._rendered){this._rendered=false;
if(this._curr){return this._lists[this._curr].unrender(A,B)
}else{if(this._txt){return B.remove(this._txt)
}}}return B
},clone:function(){return new dojox.dtl.HtmlVarNode(this.contents.contents)
},toString:function(){return"dojox.dtl.HtmlVarNode"
}});
dojox.dtl.ChangeNode=function(A,B){this.contents=A;
this._up=B
};
dojo.extend(dojox.dtl.ChangeNode,{render:function(A,B){return B.setParent(this.contents,this._up)
},unrender:function(A,B){return B.setParent(this.contents)
},clone:function(A){return new dojox.dtl.ChangeNode(this.contents,this._up)
},toString:function(){return"dojox.dtl.ChangeNode"
}});
dojox.dtl.AttributeNode=function(B,A){this._key=B;
this._value=A;
this._tpl=new dojox.dtl.Template(A);
this.contents=""
};
dojo.extend(dojox.dtl.AttributeNode,{render:function(B,D){var A=this._key;
var C=this._tpl.render(B);
if(this._rendered){if(C!=this.contents){this.contents=C;
return D.setAttribute(A,C)
}}else{this._rendered=true;
this.contents=C;
return D.setAttribute(A,C)
}return D
},unrender:function(A,B){if(this._rendered){this._rendered=false;
this.contents="";
return B.remove(this.contents)
}return B
},clone:function(){return new dojox.dtl.AttributeNode(this._key,this._value)
},toString:function(){return"dojox.dtl.AttributeNode"
}});
dojox.dtl.HtmlTextNode=function(A){this.contents=document.createTextNode(A)
};
dojo.extend(dojox.dtl.HtmlTextNode,{render:function(A,B){return B.concat(this.contents)
},unrender:function(A,B){return B.remove(this.contents)
},clone:function(){return new dojox.dtl.HtmlTextNode(this.contents.data)
},toString:function(){return"dojox.dtl.HtmlTextNode"
}});
dojox.dtl.HtmlParser=function(A){this.contents=A
};
dojo.extend(dojox.dtl.HtmlParser,{parse:function(I){var G=dojox.dtl;
var M=G.html;
var B=M.types;
var N={};
var D=this.contents;
if(!I){I=[]
}for(var L=0;
L<I.length;
L++){N[I[L]]=true
}var H=new G.HtmlNodeList();
while(D.length){var K=D.shift();
var C=K[0];
var F=K[1];
if(C==B.change){H.push(new G.ChangeNode(F,K[2]))
}else{if(C==B.attr){var E=dojox.dtl.text.getTag("attr:"+K[2],true);
if(E){H.push(E(null,K[2]+" "+K[3]))
}else{H.push(new G.AttributeNode(K[2],K[3]))
}}else{if(C==B.elem){var E=dojox.dtl.text.getTag("node:"+F.tagName.toLowerCase(),true);
if(E){H.push(E(null,F,F.tagName.toLowerCase()))
}H.push(new G.HtmlNode(F))
}else{if(C==B.varr){H.push(new G.HtmlVarNode(F))
}else{if(C==B.text){H.push(new G.HtmlTextNode(F.data||F))
}else{if(C==B.tag){if(N[F]){D.unshift(K);
return H
}var J=F.split(/\s+/g);
if(J.length){J=J[0];
var E=dojox.dtl.text.getTag(J);
if(typeof E!="function"){throw new Error("Function not found for ",J)
}var A=E(this,F);
if(A){H.push(A)
}}}}}}}}}if(I.length){throw new Error("Could not find closing tag(s): "+I.toString())
}return H
},next:function(){var A=this.contents.shift();
return{type:A[0],text:A[1]}
},skipPast:function(A){return dojox.dtl.Parser.prototype.skipPast.call(this,A)
},getVarNode:function(){return dojox.dtl.HtmlVarNode
},getTextNode:function(){return dojox.dtl.HtmlTextNode
},getTemplate:function(A){return new dojox.dtl.HtmlTemplate(dojox.dtl.html.getTemplate(A))
},toString:function(){return"dojox.dtl.HtmlParser"
}});
dojox.dtl.register.tag("dojox.dtl.tag.event","dojox.dtl.tag.event",[[/(attr:)?on(click|key(up))/i,"on"]]);
dojox.dtl.register.tag("dojox.dtl.tag.html","dojox.dtl.tag.html",["html","attr:attach","attr:tstyle"])
};