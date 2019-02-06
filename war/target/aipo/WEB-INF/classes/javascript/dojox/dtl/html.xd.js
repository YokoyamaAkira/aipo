dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.html"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.html"]){A._hasResource["dojox.dtl.html"]=true;
A.provide("dojox.dtl.html");
A.require("dojox.dtl._base");
dojox.dtl.ObjectMap=function(){this.contents=[]
};
A.extend(dojox.dtl.ObjectMap,{get:function(D){var B=this.contents;
for(var C=0,E;
E=B[C];
C++){if(E[0]===D){return E[1]
}}},put:function(D,B){var F=this.contents;
for(var C=0,E;
E=F[C];
C++){if(E[0]===D){if(arguments.length==1){F.splice(C,1);
return 
}E[1]=B;
return 
}}F.push([D,B])
},toString:function(){return"dojox.dtl.ObjectMap"
}});
dojox.dtl.html={types:A.mixin({change:-11,attr:-12,elem:1,text:3},dojox.dtl.text.types),_attributes:{},_re:/(^\s+|\s+$)/g,_re2:/\b([a-zA-Z]+)="/g,_re3:/<!--({({|%).*?(%|})})-->/g,_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_trim:function(B){return B.replace(this._re,"")
},getTemplate:function(E){if(typeof this._commentable=="undefined"){this._commentable=false;
var B=document.createElement("div");
B.innerHTML="<!--Test comment handling, and long comments, using comments whenever possible.-->";
if(B.childNodes.length&&B.childNodes[0].nodeType==8&&B.childNodes[0].data=="comment"){this._commentable=true
}}if(!this._commentable){E=E.replace(this._re3,"$1")
}var D;
while(D=this._re2.exec(E)){this._attributes[D[1]]=true
}var B=document.createElement("div");
B.innerHTML=E;
var C={pres:[],posts:[]};
while(B.childNodes.length){if(!C.node&&B.childNodes[0].nodeType==1){C.node=B.removeChild(B.childNodes[0])
}else{if(!C.node){C.pres.push(B.removeChild(B.childNodes[0]))
}else{C.posts.push(B.removeChild(B.childNodes[0]))
}}}if(!C.node){throw new Error("Template did not provide any content")
}return C
},tokenize:function(B,J,I,C){J=J||[];
var G=!J.length;
var H=this.types;
var E=[];
for(var F=0,N;
N=B.childNodes[F];
F++){E.push(N)
}if(I){for(var F=0,N;
N=I[F];
F++){this._tokenize(B,N,J)
}}J.push([H.elem,B]);
J.push([H.change,B]);
for(var L in this._attributes){var K="";
if(L=="class"){K=B.className||K
}else{if(L=="for"){K=B.htmlFor||K
}else{if(B.getAttribute){K=B.getAttribute(L,2)||K;
if(L=="href"||L=="src"){if(A.isIE){var D=location.href.lastIndexOf(location.hash);
var M=location.href.substring(0,D).split("/");
M.pop();
M=M.join("/")+"/";
if(K.indexOf(M)==0){K=K.replace(M,"")
}K=K.replace(/%20/g," ").replace(/%7B/g,"{").replace(/%7D/g,"}").replace(/%25/g,"%")
}if(K.indexOf("{%")!=-1||K.indexOf("{{")!=-1){B.setAttribute(L,"")
}}}}}if(typeof K=="function"){K=K.toString().replace(this._re4,"$1")
}if(typeof K=="string"&&(K.indexOf("{%")!=-1||K.indexOf("{{")!=-1||(K&&dojox.dtl.text.getTag("attr:"+L,true)))){J.push([H.attr,B,L,K])
}}if(!E.length){J.push([H.change,B.parentNode,true]);
if(C){for(var F=0,N;
N=C[F];
F++){this._tokenize(B,N,J)
}}return J
}for(var F=0,N;
N=E[F];
F++){this._tokenize(B,N,J)
}if(B.parentNode&&B.parentNode.tagName){J.push([H.change,B.parentNode,true]);
B.parentNode.removeChild(B)
}if(C){for(var F=0,N;
N=C[F];
F++){this._tokenize(B,N,J)
}}if(G){J.push([H.change,B,true])
}return J
},_tokenize:function(H,C,D){var G=this.types;
var B=C.data;
switch(C.nodeType){case 1:this.tokenize(C,D);
break;
case 3:if(B.match(/[^\s\n]/)){if(B.indexOf("{{")!=-1||B.indexOf("{%")!=-1){var I=dojox.dtl.text.tokenize(B);
for(var F=0,E;
E=I[F];
F++){if(typeof E=="string"){D.push([G.text,E])
}else{D.push(E)
}}}else{D.push([C.nodeType,C])
}}if(C.parentNode){C.parentNode.removeChild(C)
}break;
case 8:if(B.indexOf("{%")==0){D.push([G.tag,this._trim(B.substring(2,B.length-3))])
}if(B.indexOf("{{")==0){D.push([G.varr,this._trim(B.substring(2,B.length-3))])
}if(C.parentNode){C.parentNode.removeChild(C)
}break
}}};
dojox.dtl.HtmlTemplate=function(F){var C=dojox.dtl;
var D=C.html;
if(!F.node){if(typeof F=="object"){F=dojox.dtl.text.getTemplateString(F)
}F=D.getTemplate(F)
}var E=D.tokenize(F.node,[],F.pres,F.posts);
var B=new C.HtmlParser(E);
this.nodelist=B.parse()
};
A.extend(dojox.dtl.HtmlTemplate,{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(B){this.getRootNode().className=B
},getRootNode:function(){return this.rootNode
},getBuffer:function(){return new dojox.dtl.HtmlBuffer()
},render:function(B,C){C=C||this.getBuffer();
this.rootNode=null;
var E=A.connect(C,"onSetParent",this,function(F){if(!this.rootNode){this.rootNode=F||true
}});
var D=this.nodelist.render(B||new dojox.dtl.Context({}),C);
A.disconnect(E);
C._flushCache();
return D
},unrender:function(B,C){return this.nodelist.unrender(B,C)
},toString:function(){return"dojox.dtl.HtmlTemplate"
}});
dojox.dtl.HtmlBuffer=function(B){this._parent=B;
this._cache=[]
};
A.extend(dojox.dtl.HtmlBuffer,{concat:function(B){if(!this._parent){return this
}if(B.nodeType){var C=this._getCache(this._parent);
if(B.parentNode===this._parent){var E=0;
for(var E=0,D;
D=C[E];
E++){this.onAddNode(B);
this._parent.insertBefore(D,B)
}C.length=0
}if(!B.parentNode||!B.parentNode.tagName){if(!this._parent.childNodes.length){this.onAddNode(B);
this._parent.appendChild(B)
}else{C.push(B)
}}}return this
},remove:function(B){if(typeof B=="string"){this._parent.removeAttribute(B)
}else{if(B.parentNode===this._parent){this.onRemoveNode();
this._parent.removeChild(B)
}}return this
},setAttribute:function(C,B){if(C=="class"){this._parent.className=B
}else{if(C=="for"){this._parent.htmlFor=B
}else{if(this._parent.setAttribute){this._parent.setAttribute(C,B)
}}}return this
},setParent:function(B,C){if(!this._parent){this._parent=B
}var D=this._getCache(this._parent);
if(D&&D.length&&C){for(var F=0,E;
E=D[F];
F++){if(E!==this._parent&&(!E.parentNode||!E.parentNode.tagName)){this.onAddNode(E);
this._parent.appendChild(E)
}}D.length=0
}this.onSetParent(B,C);
this._parent=B;
return this
},getParent:function(){return this._parent
},onSetParent:function(){},onAddNode:function(){},onRemoveNode:function(){},_getCache:function(B){for(var E=0,D;
D=this._cache[E];
E++){if(D[0]===B){return D[1]
}}var C=[];
this._cache.push([B,C]);
return C
},_flushCache:function(B){for(var D=0,C;
C=this._cache[D];
D++){if(!C[1].length){this._cache.splice(D--,1)
}}},toString:function(){return"dojox.dtl.HtmlBuffer"
}});
dojox.dtl.HtmlNode=function(B){this.contents=B
};
A.extend(dojox.dtl.HtmlNode,{render:function(B,C){return C.concat(this.contents)
},unrender:function(B,C){return C.remove(this.contents)
},clone:function(B){return new dojox.dtl.HtmlNode(this.contents)
},toString:function(){return"dojox.dtl.HtmlNode"
}});
dojox.dtl.HtmlNodeList=function(B){this.contents=B||[]
};
A.extend(dojox.dtl.HtmlNodeList,{parents:new dojox.dtl.ObjectMap(),push:function(B){this.contents.push(B)
},unshift:function(B){this.contents.unshift(B)
},render:function(F,D,C){if(C){var B=D.getParent()
}for(var E=0;
E<this.contents.length;
E++){D=this.contents[E].render(F,D);
if(!D){throw new Error("Template node render functions must return their buffer")
}}if(B){D.setParent(B,true)
}return D
},unrender:function(B,C){for(var D=0;
D<this.contents.length;
D++){C=this.contents[D].unrender(B,C);
if(!C){throw new Error("Template node render functions must return their buffer")
}}return C
},clone:function(B){var H=dojox.dtl;
var D=H.html;
var G=B.getParent();
var L=this.contents;
var J=new H.HtmlNodeList();
var E=[];
for(var C=0;
C<L.length;
C++){var F=L[C].clone(B);
if(F instanceof H.ChangeNode||F instanceof H.HtmlNode){var I=this.parents.get(F.contents);
if(I){F.contents=I
}else{if(G!==F.contents&&F instanceof H.HtmlNode){var K=F.contents;
F.contents=F.contents.cloneNode(false);
E.push(K);
this.parents.put(K,F.contents)
}}}J.push(F)
}for(var C=0,F;
F=E[C];
C++){this.parents.put(F)
}return J
},toString:function(){return"dojox.dtl.HtmlNodeList"
}});
dojox.dtl.HtmlVarNode=function(B){this.contents=new dojox.dtl.Filter(B);
this._lists={}
};
A.extend(dojox.dtl.HtmlVarNode,{render:function(D,I){this._rendered=true;
var G=dojox.dtl;
var C=G.html;
var B=this.contents.resolve(D);
if(B&&B.render&&B.getRootNode){var H=this._curr=B.getRootNode();
var F=this._lists;
var E=F[H];
if(!E){E=F[H]=new G.HtmlNodeList();
E.push(new G.ChangeNode(I.getParent()));
E.push(new G.HtmlNode(H));
E.push(B);
E.push(new G.ChangeNode(I.getParent(),true))
}return E.render(D,I)
}else{if(!this._txt){this._txt=document.createTextNode(B)
}if(this._txt.data!=B){this._txt.data=B
}return I.concat(this._txt)
}return I
},unrender:function(B,C){if(this._rendered){this._rendered=false;
if(this._curr){return this._lists[this._curr].unrender(B,C)
}else{if(this._txt){return C.remove(this._txt)
}}}return C
},clone:function(){return new dojox.dtl.HtmlVarNode(this.contents.contents)
},toString:function(){return"dojox.dtl.HtmlVarNode"
}});
dojox.dtl.ChangeNode=function(B,C){this.contents=B;
this._up=C
};
A.extend(dojox.dtl.ChangeNode,{render:function(B,C){return C.setParent(this.contents,this._up)
},unrender:function(B,C){return C.setParent(this.contents)
},clone:function(B){return new dojox.dtl.ChangeNode(this.contents,this._up)
},toString:function(){return"dojox.dtl.ChangeNode"
}});
dojox.dtl.AttributeNode=function(C,B){this._key=C;
this._value=B;
this._tpl=new dojox.dtl.Template(B);
this.contents=""
};
A.extend(dojox.dtl.AttributeNode,{render:function(E,C){var D=this._key;
var B=this._tpl.render(E);
if(this._rendered){if(B!=this.contents){this.contents=B;
return C.setAttribute(D,B)
}}else{this._rendered=true;
this.contents=B;
return C.setAttribute(D,B)
}return C
},unrender:function(B,C){if(this._rendered){this._rendered=false;
this.contents="";
return C.remove(this.contents)
}return C
},clone:function(){return new dojox.dtl.AttributeNode(this._key,this._value)
},toString:function(){return"dojox.dtl.AttributeNode"
}});
dojox.dtl.HtmlTextNode=function(B){this.contents=document.createTextNode(B)
};
A.extend(dojox.dtl.HtmlTextNode,{render:function(B,C){return C.concat(this.contents)
},unrender:function(B,C){return C.remove(this.contents)
},clone:function(){return new dojox.dtl.HtmlTextNode(this.contents.data)
},toString:function(){return"dojox.dtl.HtmlTextNode"
}});
dojox.dtl.HtmlParser=function(B){this.contents=B
};
A.extend(dojox.dtl.HtmlParser,{parse:function(L){var J=dojox.dtl;
var O=J.html;
var E=O.types;
var B={};
var G=this.contents;
if(!L){L=[]
}for(var N=0;
N<L.length;
N++){B[L[N]]=true
}var K=new J.HtmlNodeList();
while(G.length){var D=G.shift();
var F=D[0];
var I=D[1];
if(F==E.change){K.push(new J.ChangeNode(I,D[2]))
}else{if(F==E.attr){var H=dojox.dtl.text.getTag("attr:"+D[2],true);
if(H){K.push(H(null,D[2]+" "+D[3]))
}else{K.push(new J.AttributeNode(D[2],D[3]))
}}else{if(F==E.elem){var H=dojox.dtl.text.getTag("node:"+I.tagName.toLowerCase(),true);
if(H){K.push(H(null,I,I.tagName.toLowerCase()))
}K.push(new J.HtmlNode(I))
}else{if(F==E.varr){K.push(new J.HtmlVarNode(I))
}else{if(F==E.text){K.push(new J.HtmlTextNode(I.data||I))
}else{if(F==E.tag){if(B[I]){G.unshift(D);
return K
}var M=I.split(/\s+/g);
if(M.length){M=M[0];
var H=dojox.dtl.text.getTag(M);
if(typeof H!="function"){throw new Error("Function not found for ",M)
}var C=H(this,I);
if(C){K.push(C)
}}}}}}}}}if(L.length){throw new Error("Could not find closing tag(s): "+L.toString())
}return K
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