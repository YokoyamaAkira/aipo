dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.html"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.html"]){A._hasResource["dojox.dtl.html"]=true;
A.provide("dojox.dtl.html");
A.require("dojox.dtl._base");
dojox.dtl.ObjectMap=function(){this.contents=[]
};
A.extend(dojox.dtl.ObjectMap,{get:function(C){var E=this.contents;
for(var B=0,D;
D=E[B];
B++){if(D[0]===C){return D[1]
}}},put:function(C,F){var E=this.contents;
for(var B=0,D;
D=E[B];
B++){if(D[0]===C){if(arguments.length==1){E.splice(B,1);
return 
}D[1]=F;
return 
}}E.push([C,F])
},toString:function(){return"dojox.dtl.ObjectMap"
}});
dojox.dtl.html={types:A.mixin({change:-11,attr:-12,elem:1,text:3},dojox.dtl.text.types),_attributes:{},_re:/(^\s+|\s+$)/g,_re2:/\b([a-zA-Z]+)="/g,_re3:/<!--({({|%).*?(%|})})-->/g,_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_trim:function(B){return B.replace(this._re,"")
},getTemplate:function(D){if(typeof this._commentable=="undefined"){this._commentable=false;
var E=document.createElement("div");
E.innerHTML="<!--Test comment handling, and long comments, using comments whenever possible.-->";
if(E.childNodes.length&&E.childNodes[0].nodeType==8&&E.childNodes[0].data=="comment"){this._commentable=true
}}if(!this._commentable){D=D.replace(this._re3,"$1")
}var C;
while(C=this._re2.exec(D)){this._attributes[C[1]]=true
}var E=document.createElement("div");
E.innerHTML=D;
var B={pres:[],posts:[]};
while(E.childNodes.length){if(!B.node&&E.childNodes[0].nodeType==1){B.node=E.removeChild(E.childNodes[0])
}else{if(!B.node){B.pres.push(E.removeChild(E.childNodes[0]))
}else{B.posts.push(E.removeChild(E.childNodes[0]))
}}}if(!B.node){throw new Error("Template did not provide any content")
}return B
},tokenize:function(E,L,K,F){L=L||[];
var I=!L.length;
var J=this.types;
var D=[];
for(var H=0,C;
C=E.childNodes[H];
H++){D.push(C)
}if(K){for(var H=0,C;
C=K[H];
H++){this._tokenize(E,C,L)
}}L.push([J.elem,E]);
L.push([J.change,E]);
for(var N in this._attributes){var M="";
if(N=="class"){M=E.className||M
}else{if(N=="for"){M=E.htmlFor||M
}else{if(E.getAttribute){M=E.getAttribute(N,2)||M;
if(N=="href"||N=="src"){if(A.isIE){var G=location.href.lastIndexOf(location.hash);
var B=location.href.substring(0,G).split("/");
B.pop();
B=B.join("/")+"/";
if(M.indexOf(B)==0){M=M.replace(B,"")
}M=M.replace(/%20/g," ").replace(/%7B/g,"{").replace(/%7D/g,"}").replace(/%25/g,"%")
}if(M.indexOf("{%")!=-1||M.indexOf("{{")!=-1){E.setAttribute(N,"")
}}}}}if(typeof M=="function"){M=M.toString().replace(this._re4,"$1")
}if(typeof M=="string"&&(M.indexOf("{%")!=-1||M.indexOf("{{")!=-1||(M&&dojox.dtl.text.getTag("attr:"+N,true)))){L.push([J.attr,E,N,M])
}}if(!D.length){L.push([J.change,E.parentNode,true]);
if(F){for(var H=0,C;
C=F[H];
H++){this._tokenize(E,C,L)
}}return L
}for(var H=0,C;
C=D[H];
H++){this._tokenize(E,C,L)
}if(E.parentNode&&E.parentNode.tagName){L.push([J.change,E.parentNode,true]);
E.parentNode.removeChild(E)
}if(F){for(var H=0,C;
C=F[H];
H++){this._tokenize(E,C,L)
}}if(I){L.push([J.change,E,true])
}return L
},_tokenize:function(D,I,G){var C=this.types;
var F=I.data;
switch(I.nodeType){case 1:this.tokenize(I,G);
break;
case 3:if(F.match(/[^\s\n]/)){if(F.indexOf("{{")!=-1||F.indexOf("{%")!=-1){var E=dojox.dtl.text.tokenize(F);
for(var B=0,H;
H=E[B];
B++){if(typeof H=="string"){G.push([C.text,H])
}else{G.push(H)
}}}else{G.push([I.nodeType,I])
}}if(I.parentNode){I.parentNode.removeChild(I)
}break;
case 8:if(F.indexOf("{%")==0){G.push([C.tag,this._trim(F.substring(2,F.length-3))])
}if(F.indexOf("{{")==0){G.push([C.varr,this._trim(F.substring(2,F.length-3))])
}if(I.parentNode){I.parentNode.removeChild(I)
}break
}}};
dojox.dtl.HtmlTemplate=function(E){var B=dojox.dtl;
var C=B.html;
if(!E.node){if(typeof E=="object"){E=dojox.dtl.text.getTemplateString(E)
}E=C.getTemplate(E)
}var D=C.tokenize(E.node,[],E.pres,E.posts);
var F=new B.HtmlParser(D);
this.nodelist=F.parse()
};
A.extend(dojox.dtl.HtmlTemplate,{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(B){this.getRootNode().className=B
},getRootNode:function(){return this.rootNode
},getBuffer:function(){return new dojox.dtl.HtmlBuffer()
},render:function(E,B){B=B||this.getBuffer();
this.rootNode=null;
var D=A.connect(B,"onSetParent",this,function(F){if(!this.rootNode){this.rootNode=F||true
}});
var C=this.nodelist.render(E||new dojox.dtl.Context({}),B);
A.disconnect(D);
B._flushCache();
return C
},unrender:function(C,B){return this.nodelist.unrender(C,B)
},toString:function(){return"dojox.dtl.HtmlTemplate"
}});
dojox.dtl.HtmlBuffer=function(B){this._parent=B;
this._cache=[]
};
A.extend(dojox.dtl.HtmlBuffer,{concat:function(E){if(!this._parent){return this
}if(E.nodeType){var B=this._getCache(this._parent);
if(E.parentNode===this._parent){var D=0;
for(var D=0,C;
C=B[D];
D++){this.onAddNode(E);
this._parent.insertBefore(C,E)
}B.length=0
}if(!E.parentNode||!E.parentNode.tagName){if(!this._parent.childNodes.length){this.onAddNode(E);
this._parent.appendChild(E)
}else{B.push(E)
}}}return this
},remove:function(B){if(typeof B=="string"){this._parent.removeAttribute(B)
}else{if(B.parentNode===this._parent){this.onRemoveNode();
this._parent.removeChild(B)
}}return this
},setAttribute:function(B,C){if(B=="class"){this._parent.className=C
}else{if(B=="for"){this._parent.htmlFor=C
}else{if(this._parent.setAttribute){this._parent.setAttribute(B,C)
}}}return this
},setParent:function(F,B){if(!this._parent){this._parent=F
}var C=this._getCache(this._parent);
if(C&&C.length&&B){for(var E=0,D;
D=C[E];
E++){if(D!==this._parent&&(!D.parentNode||!D.parentNode.tagName)){this.onAddNode(D);
this._parent.appendChild(D)
}}C.length=0
}this.onSetParent(F,B);
this._parent=F;
return this
},getParent:function(){return this._parent
},onSetParent:function(){},onAddNode:function(){},onRemoveNode:function(){},_getCache:function(E){for(var D=0,C;
C=this._cache[D];
D++){if(C[0]===E){return C[1]
}}var B=[];
this._cache.push([E,B]);
return B
},_flushCache:function(D){for(var C=0,B;
B=this._cache[C];
C++){if(!B[1].length){this._cache.splice(C--,1)
}}},toString:function(){return"dojox.dtl.HtmlBuffer"
}});
dojox.dtl.HtmlNode=function(B){this.contents=B
};
A.extend(dojox.dtl.HtmlNode,{render:function(C,B){return B.concat(this.contents)
},unrender:function(C,B){return B.remove(this.contents)
},clone:function(B){return new dojox.dtl.HtmlNode(this.contents)
},toString:function(){return"dojox.dtl.HtmlNode"
}});
dojox.dtl.HtmlNodeList=function(B){this.contents=B||[]
};
A.extend(dojox.dtl.HtmlNodeList,{parents:new dojox.dtl.ObjectMap(),push:function(B){this.contents.push(B)
},unshift:function(B){this.contents.unshift(B)
},render:function(E,C,B){if(B){var F=C.getParent()
}for(var D=0;
D<this.contents.length;
D++){C=this.contents[D].render(E,C);
if(!C){throw new Error("Template node render functions must return their buffer")
}}if(F){C.setParent(F,true)
}return C
},unrender:function(D,B){for(var C=0;
C<this.contents.length;
C++){B=this.contents[C].unrender(D,B);
if(!B){throw new Error("Template node render functions must return their buffer")
}}return B
},clone:function(D){var J=dojox.dtl;
var F=J.html;
var I=D.getParent();
var C=this.contents;
var L=new J.HtmlNodeList();
var G=[];
for(var E=0;
E<C.length;
E++){var H=C[E].clone(D);
if(H instanceof J.ChangeNode||H instanceof J.HtmlNode){var K=this.parents.get(H.contents);
if(K){H.contents=K
}else{if(I!==H.contents&&H instanceof J.HtmlNode){var B=H.contents;
H.contents=H.contents.cloneNode(false);
G.push(B);
this.parents.put(B,H.contents)
}}}L.push(H)
}for(var E=0,H;
H=G[E];
E++){this.parents.put(H)
}return L
},toString:function(){return"dojox.dtl.HtmlNodeList"
}});
dojox.dtl.HtmlVarNode=function(B){this.contents=new dojox.dtl.Filter(B);
this._lists={}
};
A.extend(dojox.dtl.HtmlVarNode,{render:function(G,E){this._rendered=true;
var C=dojox.dtl;
var F=C.html;
var I=this.contents.resolve(G);
if(I&&I.render&&I.getRootNode){var D=this._curr=I.getRootNode();
var B=this._lists;
var H=B[D];
if(!H){H=B[D]=new C.HtmlNodeList();
H.push(new C.ChangeNode(E.getParent()));
H.push(new C.HtmlNode(D));
H.push(I);
H.push(new C.ChangeNode(E.getParent(),true))
}return H.render(G,E)
}else{if(!this._txt){this._txt=document.createTextNode(I)
}if(this._txt.data!=I){this._txt.data=I
}return E.concat(this._txt)
}return E
},unrender:function(C,B){if(this._rendered){this._rendered=false;
if(this._curr){return this._lists[this._curr].unrender(C,B)
}else{if(this._txt){return B.remove(this._txt)
}}}return B
},clone:function(){return new dojox.dtl.HtmlVarNode(this.contents.contents)
},toString:function(){return"dojox.dtl.HtmlVarNode"
}});
dojox.dtl.ChangeNode=function(C,B){this.contents=C;
this._up=B
};
A.extend(dojox.dtl.ChangeNode,{render:function(C,B){return B.setParent(this.contents,this._up)
},unrender:function(C,B){return B.setParent(this.contents)
},clone:function(B){return new dojox.dtl.ChangeNode(this.contents,this._up)
},toString:function(){return"dojox.dtl.ChangeNode"
}});
dojox.dtl.AttributeNode=function(B,C){this._key=B;
this._value=C;
this._tpl=new dojox.dtl.Template(C);
this.contents=""
};
A.extend(dojox.dtl.AttributeNode,{render:function(D,B){var C=this._key;
var E=this._tpl.render(D);
if(this._rendered){if(E!=this.contents){this.contents=E;
return B.setAttribute(C,E)
}}else{this._rendered=true;
this.contents=E;
return B.setAttribute(C,E)
}return B
},unrender:function(C,B){if(this._rendered){this._rendered=false;
this.contents="";
return B.remove(this.contents)
}return B
},clone:function(){return new dojox.dtl.AttributeNode(this._key,this._value)
},toString:function(){return"dojox.dtl.AttributeNode"
}});
dojox.dtl.HtmlTextNode=function(B){this.contents=document.createTextNode(B)
};
A.extend(dojox.dtl.HtmlTextNode,{render:function(C,B){return B.concat(this.contents)
},unrender:function(C,B){return B.remove(this.contents)
},clone:function(){return new dojox.dtl.HtmlTextNode(this.contents.data)
},toString:function(){return"dojox.dtl.HtmlTextNode"
}});
dojox.dtl.HtmlParser=function(B){this.contents=B
};
A.extend(dojox.dtl.HtmlParser,{parse:function(B){var N=dojox.dtl;
var F=N.html;
var I=F.types;
var G={};
var K=this.contents;
if(!B){B=[]
}for(var E=0;
E<B.length;
E++){G[B[E]]=true
}var O=new N.HtmlNodeList();
while(K.length){var D=K.shift();
var J=D[0];
var M=D[1];
if(J==I.change){O.push(new N.ChangeNode(M,D[2]))
}else{if(J==I.attr){var L=dojox.dtl.text.getTag("attr:"+D[2],true);
if(L){O.push(L(null,D[2]+" "+D[3]))
}else{O.push(new N.AttributeNode(D[2],D[3]))
}}else{if(J==I.elem){var L=dojox.dtl.text.getTag("node:"+M.tagName.toLowerCase(),true);
if(L){O.push(L(null,M,M.tagName.toLowerCase()))
}O.push(new N.HtmlNode(M))
}else{if(J==I.varr){O.push(new N.HtmlVarNode(M))
}else{if(J==I.text){O.push(new N.HtmlTextNode(M.data||M))
}else{if(J==I.tag){if(G[M]){K.unshift(D);
return O
}var C=M.split(/\s+/g);
if(C.length){C=C[0];
var L=dojox.dtl.text.getTag(C);
if(typeof L!="function"){throw new Error("Function not found for ",C)
}var H=L(this,M);
if(H){O.push(H)
}}}}}}}}}if(B.length){throw new Error("Could not find closing tag(s): "+B.toString())
}return O
},next:function(){var B=this.contents.shift();
return{type:B[0],text:B[1]}
},skipPast:function(B){return dojox.dtl.Parser.prototype.skipPast.call(this,B)
},getVarNode:function(){return dojox.dtl.HtmlVarNode
},getTextNode:function(){return dojox.dtl.HtmlTextNode
},getTemplate:function(B){return new dojox.dtl.HtmlTemplate(dojox.dtl.html.getTemplate(B))
},toString:function(){return"dojox.dtl.HtmlParser"
}});
dojox.dtl.register.tag("dojox.dtl.tag.event","dojox.dtl.tag.event",[[/(attr:)?on(click|key(up))/i,"on"]]);
dojox.dtl.register.tag("dojox.dtl.tag.html","dojox.dtl.tag.html",["html","attr:attach","attr:tstyle"])
}}});