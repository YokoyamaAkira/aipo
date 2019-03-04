if(!dojo._hasResource["dojox.dtl.html"]){dojo._hasResource["dojox.dtl.html"]=true;
dojo.provide("dojox.dtl.html");
dojo.require("dojox.dtl._base");
dojox.dtl.ObjectMap=function(){this.contents=[]
};
dojo.extend(dojox.dtl.ObjectMap,{get:function(B){var D=this.contents;
for(var A=0,C;
C=D[A];
A++){if(C[0]===B){return C[1]
}}},put:function(B,E){var D=this.contents;
for(var A=0,C;
C=D[A];
A++){if(C[0]===B){if(arguments.length==1){D.splice(A,1);
return 
}C[1]=E;
return 
}}D.push([B,E])
},toString:function(){return"dojox.dtl.ObjectMap"
}});
dojox.dtl.html={types:dojo.mixin({change:-11,attr:-12,elem:1,text:3},dojox.dtl.text.types),_attributes:{},_re:/(^\s+|\s+$)/g,_re2:/\b([a-zA-Z]+)="/g,_re3:/<!--({({|%).*?(%|})})-->/g,_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_trim:function(A){return A.replace(this._re,"")
},getTemplate:function(C){if(typeof this._commentable=="undefined"){this._commentable=false;
var D=document.createElement("div");
D.innerHTML="<!--Test comment handling, and long comments, using comments whenever possible.-->";
if(D.childNodes.length&&D.childNodes[0].nodeType==8&&D.childNodes[0].data=="comment"){this._commentable=true
}}if(!this._commentable){C=C.replace(this._re3,"$1")
}var B;
while(B=this._re2.exec(C)){this._attributes[B[1]]=true
}var D=document.createElement("div");
D.innerHTML=C;
var A={pres:[],posts:[]};
while(D.childNodes.length){if(!A.node&&D.childNodes[0].nodeType==1){A.node=D.removeChild(D.childNodes[0])
}else{if(!A.node){A.pres.push(D.removeChild(D.childNodes[0]))
}else{A.posts.push(D.removeChild(D.childNodes[0]))
}}}if(!A.node){throw new Error("Template did not provide any content")
}return A
},tokenize:function(D,K,J,E){K=K||[];
var H=!K.length;
var I=this.types;
var C=[];
for(var G=0,B;
B=D.childNodes[G];
G++){C.push(B)
}if(J){for(var G=0,B;
B=J[G];
G++){this._tokenize(D,B,K)
}}K.push([I.elem,D]);
K.push([I.change,D]);
for(var M in this._attributes){var L="";
if(M=="class"){L=D.className||L
}else{if(M=="for"){L=D.htmlFor||L
}else{if(D.getAttribute){L=D.getAttribute(M,2)||L;
if(M=="href"||M=="src"){if(dojo.isIE){var F=location.href.lastIndexOf(location.hash);
var A=location.href.substring(0,F).split("/");
A.pop();
A=A.join("/")+"/";
if(L.indexOf(A)==0){L=L.replace(A,"")
}L=L.replace(/%20/g," ").replace(/%7B/g,"{").replace(/%7D/g,"}").replace(/%25/g,"%")
}if(L.indexOf("{%")!=-1||L.indexOf("{{")!=-1){D.setAttribute(M,"")
}}}}}if(typeof L=="function"){L=L.toString().replace(this._re4,"$1")
}if(typeof L=="string"&&(L.indexOf("{%")!=-1||L.indexOf("{{")!=-1||(L&&dojox.dtl.text.getTag("attr:"+M,true)))){K.push([I.attr,D,M,L])
}}if(!C.length){K.push([I.change,D.parentNode,true]);
if(E){for(var G=0,B;
B=E[G];
G++){this._tokenize(D,B,K)
}}return K
}for(var G=0,B;
B=C[G];
G++){this._tokenize(D,B,K)
}if(D.parentNode&&D.parentNode.tagName){K.push([I.change,D.parentNode,true]);
D.parentNode.removeChild(D)
}if(E){for(var G=0,B;
B=E[G];
G++){this._tokenize(D,B,K)
}}if(H){K.push([I.change,D,true])
}return K
},_tokenize:function(C,H,F){var B=this.types;
var E=H.data;
switch(H.nodeType){case 1:this.tokenize(H,F);
break;
case 3:if(E.match(/[^\s\n]/)){if(E.indexOf("{{")!=-1||E.indexOf("{%")!=-1){var D=dojox.dtl.text.tokenize(E);
for(var A=0,G;
G=D[A];
A++){if(typeof G=="string"){F.push([B.text,G])
}else{F.push(G)
}}}else{F.push([H.nodeType,H])
}}if(H.parentNode){H.parentNode.removeChild(H)
}break;
case 8:if(E.indexOf("{%")==0){F.push([B.tag,this._trim(E.substring(2,E.length-3))])
}if(E.indexOf("{{")==0){F.push([B.varr,this._trim(E.substring(2,E.length-3))])
}if(H.parentNode){H.parentNode.removeChild(H)
}break
}}};
dojox.dtl.HtmlTemplate=function(D){var A=dojox.dtl;
var B=A.html;
if(!D.node){if(typeof D=="object"){D=dojox.dtl.text.getTemplateString(D)
}D=B.getTemplate(D)
}var C=B.tokenize(D.node,[],D.pres,D.posts);
var E=new A.HtmlParser(C);
this.nodelist=E.parse()
};
dojo.extend(dojox.dtl.HtmlTemplate,{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(A){this.getRootNode().className=A
},getRootNode:function(){return this.rootNode
},getBuffer:function(){return new dojox.dtl.HtmlBuffer()
},render:function(D,A){A=A||this.getBuffer();
this.rootNode=null;
var C=dojo.connect(A,"onSetParent",this,function(E){if(!this.rootNode){this.rootNode=E||true
}});
var B=this.nodelist.render(D||new dojox.dtl.Context({}),A);
dojo.disconnect(C);
A._flushCache();
return B
},unrender:function(B,A){return this.nodelist.unrender(B,A)
},toString:function(){return"dojox.dtl.HtmlTemplate"
}});
dojox.dtl.HtmlBuffer=function(A){this._parent=A;
this._cache=[]
};
dojo.extend(dojox.dtl.HtmlBuffer,{concat:function(D){if(!this._parent){return this
}if(D.nodeType){var A=this._getCache(this._parent);
if(D.parentNode===this._parent){var C=0;
for(var C=0,B;
B=A[C];
C++){this.onAddNode(D);
this._parent.insertBefore(B,D)
}A.length=0
}if(!D.parentNode||!D.parentNode.tagName){if(!this._parent.childNodes.length){this.onAddNode(D);
this._parent.appendChild(D)
}else{A.push(D)
}}}return this
},remove:function(A){if(typeof A=="string"){this._parent.removeAttribute(A)
}else{if(A.parentNode===this._parent){this.onRemoveNode();
this._parent.removeChild(A)
}}return this
},setAttribute:function(A,B){if(A=="class"){this._parent.className=B
}else{if(A=="for"){this._parent.htmlFor=B
}else{if(this._parent.setAttribute){this._parent.setAttribute(A,B)
}}}return this
},setParent:function(E,A){if(!this._parent){this._parent=E
}var B=this._getCache(this._parent);
if(B&&B.length&&A){for(var D=0,C;
C=B[D];
D++){if(C!==this._parent&&(!C.parentNode||!C.parentNode.tagName)){this.onAddNode(C);
this._parent.appendChild(C)
}}B.length=0
}this.onSetParent(E,A);
this._parent=E;
return this
},getParent:function(){return this._parent
},onSetParent:function(){},onAddNode:function(){},onRemoveNode:function(){},_getCache:function(D){for(var C=0,B;
B=this._cache[C];
C++){if(B[0]===D){return B[1]
}}var A=[];
this._cache.push([D,A]);
return A
},_flushCache:function(C){for(var B=0,A;
A=this._cache[B];
B++){if(!A[1].length){this._cache.splice(B--,1)
}}},toString:function(){return"dojox.dtl.HtmlBuffer"
}});
dojox.dtl.HtmlNode=function(A){this.contents=A
};
dojo.extend(dojox.dtl.HtmlNode,{render:function(B,A){return A.concat(this.contents)
},unrender:function(B,A){return A.remove(this.contents)
},clone:function(A){return new dojox.dtl.HtmlNode(this.contents)
},toString:function(){return"dojox.dtl.HtmlNode"
}});
dojox.dtl.HtmlNodeList=function(A){this.contents=A||[]
};
dojo.extend(dojox.dtl.HtmlNodeList,{parents:new dojox.dtl.ObjectMap(),push:function(A){this.contents.push(A)
},unshift:function(A){this.contents.unshift(A)
},render:function(D,B,A){if(A){var E=B.getParent()
}for(var C=0;
C<this.contents.length;
C++){B=this.contents[C].render(D,B);
if(!B){throw new Error("Template node render functions must return their buffer")
}}if(E){B.setParent(E,true)
}return B
},unrender:function(C,A){for(var B=0;
B<this.contents.length;
B++){A=this.contents[B].unrender(C,A);
if(!A){throw new Error("Template node render functions must return their buffer")
}}return A
},clone:function(C){var I=dojox.dtl;
var E=I.html;
var H=C.getParent();
var B=this.contents;
var K=new I.HtmlNodeList();
var F=[];
for(var D=0;
D<B.length;
D++){var G=B[D].clone(C);
if(G instanceof I.ChangeNode||G instanceof I.HtmlNode){var J=this.parents.get(G.contents);
if(J){G.contents=J
}else{if(H!==G.contents&&G instanceof I.HtmlNode){var A=G.contents;
G.contents=G.contents.cloneNode(false);
F.push(A);
this.parents.put(A,G.contents)
}}}K.push(G)
}for(var D=0,G;
G=F[D];
D++){this.parents.put(G)
}return K
},toString:function(){return"dojox.dtl.HtmlNodeList"
}});
dojox.dtl.HtmlVarNode=function(A){this.contents=new dojox.dtl.Filter(A);
this._lists={}
};
dojo.extend(dojox.dtl.HtmlVarNode,{render:function(F,D){this._rendered=true;
var B=dojox.dtl;
var E=B.html;
var H=this.contents.resolve(F);
if(H&&H.render&&H.getRootNode){var C=this._curr=H.getRootNode();
var A=this._lists;
var G=A[C];
if(!G){G=A[C]=new B.HtmlNodeList();
G.push(new B.ChangeNode(D.getParent()));
G.push(new B.HtmlNode(C));
G.push(H);
G.push(new B.ChangeNode(D.getParent(),true))
}return G.render(F,D)
}else{if(!this._txt){this._txt=document.createTextNode(H)
}if(this._txt.data!=H){this._txt.data=H
}return D.concat(this._txt)
}return D
},unrender:function(B,A){if(this._rendered){this._rendered=false;
if(this._curr){return this._lists[this._curr].unrender(B,A)
}else{if(this._txt){return A.remove(this._txt)
}}}return A
},clone:function(){return new dojox.dtl.HtmlVarNode(this.contents.contents)
},toString:function(){return"dojox.dtl.HtmlVarNode"
}});
dojox.dtl.ChangeNode=function(B,A){this.contents=B;
this._up=A
};
dojo.extend(dojox.dtl.ChangeNode,{render:function(B,A){return A.setParent(this.contents,this._up)
},unrender:function(B,A){return A.setParent(this.contents)
},clone:function(A){return new dojox.dtl.ChangeNode(this.contents,this._up)
},toString:function(){return"dojox.dtl.ChangeNode"
}});
dojox.dtl.AttributeNode=function(A,B){this._key=A;
this._value=B;
this._tpl=new dojox.dtl.Template(B);
this.contents=""
};
dojo.extend(dojox.dtl.AttributeNode,{render:function(C,A){var B=this._key;
var D=this._tpl.render(C);
if(this._rendered){if(D!=this.contents){this.contents=D;
return A.setAttribute(B,D)
}}else{this._rendered=true;
this.contents=D;
return A.setAttribute(B,D)
}return A
},unrender:function(B,A){if(this._rendered){this._rendered=false;
this.contents="";
return A.remove(this.contents)
}return A
},clone:function(){return new dojox.dtl.AttributeNode(this._key,this._value)
},toString:function(){return"dojox.dtl.AttributeNode"
}});
dojox.dtl.HtmlTextNode=function(A){this.contents=document.createTextNode(A)
};
dojo.extend(dojox.dtl.HtmlTextNode,{render:function(B,A){return A.concat(this.contents)
},unrender:function(B,A){return A.remove(this.contents)
},clone:function(){return new dojox.dtl.HtmlTextNode(this.contents.data)
},toString:function(){return"dojox.dtl.HtmlTextNode"
}});
dojox.dtl.HtmlParser=function(A){this.contents=A
};
dojo.extend(dojox.dtl.HtmlParser,{parse:function(A){var M=dojox.dtl;
var E=M.html;
var H=E.types;
var F={};
var J=this.contents;
if(!A){A=[]
}for(var D=0;
D<A.length;
D++){F[A[D]]=true
}var N=new M.HtmlNodeList();
while(J.length){var C=J.shift();
var I=C[0];
var L=C[1];
if(I==H.change){N.push(new M.ChangeNode(L,C[2]))
}else{if(I==H.attr){var K=dojox.dtl.text.getTag("attr:"+C[2],true);
if(K){N.push(K(null,C[2]+" "+C[3]))
}else{N.push(new M.AttributeNode(C[2],C[3]))
}}else{if(I==H.elem){var K=dojox.dtl.text.getTag("node:"+L.tagName.toLowerCase(),true);
if(K){N.push(K(null,L,L.tagName.toLowerCase()))
}N.push(new M.HtmlNode(L))
}else{if(I==H.varr){N.push(new M.HtmlVarNode(L))
}else{if(I==H.text){N.push(new M.HtmlTextNode(L.data||L))
}else{if(I==H.tag){if(F[L]){J.unshift(C);
return N
}var B=L.split(/\s+/g);
if(B.length){B=B[0];
var K=dojox.dtl.text.getTag(B);
if(typeof K!="function"){throw new Error("Function not found for ",B)
}var G=K(this,L);
if(G){N.push(G)
}}}}}}}}}if(A.length){throw new Error("Could not find closing tag(s): "+A.toString())
}return N
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