dojo._xdResourceLoaded({depends:[["provide","dojox.dtl._base"],["require","dojox.string.Builder"],["require","dojox.string.tokenize"],["requireIf",true,require],["require","dojox.string.Builder"]],defineResource:function(A){if(!A._hasResource["dojox.dtl._base"]){A._hasResource["dojox.dtl._base"]=true;
A.provide("dojox.dtl._base");
A.require("dojox.string.Builder");
A.require("dojox.string.tokenize");
dojox.dtl.Context=function(B){A.mixin(this,B||{});
this._dicts=[];
this._this={}
};
A.extend(dojox.dtl.Context,{_dicts:[],_this:{},extend:function(F){var D=new dojox.dtl.Context();
var E=this.getKeys();
for(var C=0,B;
B=E[C];
C++){if(typeof F[B]!="undefined"){D[B]=F[B]
}else{D[B]=this[B]
}}if(F instanceof dojox.dtl.Context){E=F.getKeys()
}else{if(typeof F=="object"){E=[];
for(var B in F){E.push(B)
}}}for(var C=0,B;
B=E[C];
C++){D[B]=F[B]
}return D
},filter:function(F){var E=new dojox.dtl.Context();
var G=[];
if(F instanceof dojox.dtl.Context){G=F.getKeys()
}else{if(typeof F=="object"){for(var D in F){G.push(D)
}}else{for(var C=0,B;
B=arguments[C];
C++){if(typeof B=="string"){G.push(B)
}}}}for(var C=0,D;
D=G[C];
C++){E[D]=this[D]
}return E
},setThis:function(B){this._this=B
},getThis:function(){return this._this
},push:function(){var E={};
var D=this.getKeys();
for(var C=0,B;
B=D[C];
C++){E[B]=this[B];
delete this[B]
}this._dicts.unshift(E)
},pop:function(){if(!this._dicts.length){throw new Error("pop() has been called more times than push() on the Context")
}var B=this._dicts.shift();
A.mixin(this,B)
},hasKey:function(C){if(typeof this[C]!="undefined"){return true
}for(var B=0,D;
D=this._dicts[B];
B++){if(typeof D[C]!="undefined"){return true
}}return false
},getKeys:function(){var D=[];
for(var B in this){if(isNaN(B)){var E=false;
for(var C in dojox.dtl.Context.prototype){if(B==C){E=true;
break
}}if(!E){D.push(B)
}}}return D
},get:function(D,B){if(typeof this[D]!="undefined"){return this[D]
}for(var C=0,E;
E=this._dicts[C];
C++){if(typeof E[D]!="undefined"){return E[D]
}}return B
},update:function(B){this.push();
if(B){A.mixin(this,B)
}},toString:function(){return"dojox.dtl.Context"
}});
dojox.dtl.text={types:{tag:-1,varr:-2,text:3},pySplit:function(B){B=B.replace(/^\s+|\s+$/,"");
if(!B.length){return[]
}return B.split(/\s+/g)
},urlquote:function(B,C){if(!C){C="/"
}return dojox.string.tokenize(B,/([^\w-_.])/g,function(D){if(C.indexOf(D)==-1){if(D==" "){return"+"
}else{return"%"+D.charCodeAt(0).toString(16).toUpperCase()
}}return D
}).join("")
},_get:function(E,C,B){var G=dojox.dtl.register.get(E,C,B);
if(!G){return 
}var F=G.getRequire();
var J=G.getObj();
var K=G.getFn();
if(K.indexOf(":")!=-1){var H=K.split(":");
K=H.pop()
}A.requireIf(true,F);
var L=window;
var H=J.split(".");
for(var I=0,D;
D=H[I];
I++){if(!L[D]){return 
}L=L[D]
}return L[K||C]||L[C+"_"]
},getTag:function(B,C){return dojox.dtl.text._get("tag",B,C)
},getFilter:function(B,C){return dojox.dtl.text._get("filter",B,C)
},getTemplate:function(B){return new dojox.dtl.Template(dojox.dtl.getTemplateString(B))
},getTemplateString:function(B){return A._getText(B.toString())||""
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(.+?)\s*%\})/g,tokenize:function(B){return dojox.string.tokenize(B,dojox.dtl.text._re,dojox.dtl.text._parseDelims)
},_parseDelims:function(D,B){var C=dojox.dtl.text.types;
if(D){return[C.varr,D]
}else{return[C.tag,B]
}}};
dojox.dtl.Template=function(D){var B=dojox.dtl;
var C=B.text.tokenize(D);
var E=new B.Parser(C);
this.nodelist=E.parse()
};
A.extend(dojox.dtl.Template,{render:function(C,B){C=C||new dojox.dtl.Context({});
if(!B){A.require("dojox.string.Builder");
B=new dojox.string.Builder()
}return this.nodelist.render(C,B)+""
},toString:function(){return"dojox.dtl.Template"
}});
dojox.dtl.Filter=function(D){if(!D){throw new Error("Filter must be called with variable name")
}this.contents=D;
var C=null;
var G=this._re;
var I,F,B,E;
var H=[];
while(I=G.exec(D)){if(C===null){if(this._exists(I,3)){C=I[3]
}else{if(this._exists(I,1)){C='"'+I[1]+'"'
}else{if(this._exists(I,2)){C='"'+I[2]+'"'
}else{if(this._exists(I,9)){C='"'+I[9]+'"'
}}}}}else{if(this._exists(I,7)){B=[true,I[7]]
}else{if(this._exists(I,5)){B=[false,dojox.dtl.replace(I[5],'\\"','"')]
}else{if(this._exists(I,6)){B=[false,dojox.dtl.replace(I[6],'\\"','"')]
}else{if(this._exists(I,8)){B=[false,dojox.dtl.replace(I[8],"\\'","'")]
}}}}E=dojox.dtl.text.getFilter(I[4]);
if(typeof E!="function"){throw new Error(I[4]+" is not registered as a filter")
}H.push([E,B])
}}this.key=C;
this.filters=H
};
A.extend(dojox.dtl.Filter,{_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_exists:function(B,C){if(typeof B[C]!="undefined"&&B[C]!==""){return true
}return false
},resolve:function(C){var E=this.resolvePath(this.key,C);
for(var B=0,D;
D=this.filters[B];
B++){if(D[1]){if(D[1][0]){E=D[0](E,this.resolvePath(D[1][1],C))
}else{E=D[0](E,D[1][1])
}}else{E=D[0](E)
}}return E
},resolvePath:function(F,B){var E,D;
var G=F.charAt(0);
var C=F.charAt(F.length-1);
if(!isNaN(parseInt(G))){E=(F.indexOf(".")==-1)?parseInt(F):parseFloat(F)
}else{if(G=='"'&&G==C){E=F.substring(1,F.length-1)
}else{if(F=="true"){return true
}if(F=="false"){return false
}if(F=="null"||F=="None"){return null
}D=F.split(".");
E=B.get(D.shift());
while(D.length){if(E&&typeof E[D[0]]!="undefined"){E=E[D[0]];
if(typeof E=="function"){if(E.alters_data){E=""
}else{E=E()
}}}else{return""
}D.shift()
}}}return E
},toString:function(){return"dojox.dtl.Filter"
}});
dojox.dtl.Node=function(B){this.contents=B
};
A.extend(dojox.dtl.Node,{render:function(C,B){return B.concat(this.contents)
},toString:function(){return"dojox.dtl.Node"
}});
dojox.dtl.NodeList=function(B){this.contents=B||[]
};
A.extend(dojox.dtl.NodeList,{push:function(B){this.contents.push(B)
},render:function(D,B){for(var C=0;
C<this.contents.length;
C++){B=this.contents[C].render(D,B);
if(!B){throw new Error("Template node render functions must return their buffer")
}}return B
},unrender:function(C,B){return B
},clone:function(){return this
},toString:function(){return"dojox.dtl.NodeList"
}});
dojox.dtl.TextNode=dojox.dtl.Node;
dojox.dtl.VarNode=function(B){this.contents=new dojox.dtl.Filter(B)
};
A.extend(dojox.dtl.VarNode,{render:function(C,B){var D=this.contents.resolve(C);
return B.concat(D)
},toString:function(){return"dojox.dtl.VarNode"
}});
dojox.dtl.Parser=function(B){this.contents=B
};
A.extend(dojox.dtl.Parser,{parse:function(B){var L=dojox.dtl;
var F=L.text.types;
var E={};
var G=this.contents;
B=B||[];
for(var D=0;
D<B.length;
D++){E[B[D]]=true
}var K=new L.NodeList();
while(G.length){token=G.shift();
if(typeof token=="string"){K.push(new L.TextNode(token))
}else{var H=token[0];
var J=token[1];
if(H==F.varr){K.push(new L.VarNode(J))
}else{if(H==F.tag){if(E[J]){G.unshift(token);
return K
}var C=J.split(/\s+/g);
if(C.length){C=C[0];
var I=dojox.dtl.text.getTag(C);
if(I){K.push(I(this,J))
}}}}}}if(B.length){throw new Error("Could not find closing tag(s): "+B.toString())
}return K
},next:function(){var B=this.contents.shift();
return{type:B[0],text:B[1]}
},skipPast:function(D){var C=dojox.dtl.text.types;
while(this.contents.length){var B=this.contents.shift();
if(B[0]==C.tag&&B[1]==D){return 
}}throw new Error("Unclosed tag found when looking for "+D)
},getVarNode:function(){return dojox.dtl.VarNode
},getTextNode:function(){return dojox.dtl.TextNode
},getTemplate:function(B){return new dojox.dtl.Template(B)
},toString:function(){return"dojox.dtl.Parser"
}});
dojox.dtl.register=function(H,I,E,C){var G=dojox.dtl.register;
var B=G._mod[H]={params:[],Getter:function(J){G._params=J||{}
}};
I.unshift("name");
for(var F=0,D;
D=I[F];
F++){B.Getter.prototype["get"+D.substring(0,1).toUpperCase()+D.substring(1,D.length)]=G._ret(F)
}G[H]=function(L,N){if(C){var P=C(arguments)
}else{var P=[arguments]
}for(var M=0,K;
K=P[M];
M++){var O=[];
for(var J=0;
J<I.length;
J++){O.push(K[J]||null)
}if(typeof K[0]=="string"){B.params.unshift(O)
}else{B.params.push(O)
}}};
G[H].apply(null,E)
};
A.mixin(dojox.dtl.register,{_mod:{},_ret:function(B){return function(){return dojox.dtl.register._params[B]||""
}
},get:function(E,D,C){var B=this._mod[E]||{};
if(B.params){for(var G=0,F;
F=B.params[G];
G++){var J=F[0];
if(typeof J=="string"){if(J==D){return new B.Getter(F)
}}else{if(D.match(J)){var H=J.exec(D);
var I=[];
A.mixin(I,F);
I[0]=H[1];
return new B.Getter(F)
}}}}if(!C){throw new Error("'"+E+"' of name '"+D+"' does not exist")
}},_normalize:function(D){var C=D[2];
var B=[];
for(var E=0,F;
F=C[E];
E++){if(typeof F=="string"){B.push([F,D[0],D[1],F])
}else{B.push([F[0],D[0],D[1],F[1]])
}}return B
},tag:function(B,D,C){this("tag",["require","obj","fn"],arguments,this._normalize)
},filter:function(B,D,C){this("filter",["require","obj","fn"],arguments,this._normalize)
}});
(function(){var D=dojox.dtl.register;
var B="dojox.dtl.tag";
D.tag(B+".logic",B+".logic",["if","for"]);
D.tag(B+".loader",B+".loader",["extends","block"]);
D.tag(B+".misc",B+".misc",["comment","debug","filter"]);
D.tag(B+".loop",B+".loop",["cycle"]);
var C="dojox.dtl.filter";
D.filter(C+".dates",C+".dates",["date","time","timesince","timeuntil"]);
D.filter(C+".htmlstrings",C+".htmlstrings",["escape","linebreaks","linebreaksbr","removetags","striptags"]);
D.filter(C+".integers",C+".integers",["add","get_digit"]);
D.filter(C+".lists",C+".lists",["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"]);
D.filter(C+".logic",C+".logic",["default","default_if_none","divisibleby","yesno"]);
D.filter(C+".misc",C+".misc",["filesizeformat","pluralize","phone2numeric","pprint"]);
D.filter(C+".strings",C+".strings",["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"])
})();
dojox.dtl.replace=function(E,C,D){D=D||"";
var F,B=C.length;
while(1){F=E.indexOf(C);
if(F==-1){break
}E=E.substring(0,F)+D+E.substring(F+B)
}return E
};
dojox.dtl.resolveVariable=function(C,B){var D=new dojox.dtl.Filter(C);
return D.resolve(B)
}
}}});