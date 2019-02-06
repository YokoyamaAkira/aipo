dojo._xdResourceLoaded({depends:[["provide","dojox.dtl._base"],["require","dojox.string.Builder"],["require","dojox.string.tokenize"],["requireIf",true,require],["require","dojox.string.Builder"]],defineResource:function(A){if(!A._hasResource["dojox.dtl._base"]){A._hasResource["dojox.dtl._base"]=true;
A.provide("dojox.dtl._base");
A.require("dojox.string.Builder");
A.require("dojox.string.tokenize");
dojox.dtl.Context=function(B){A.mixin(this,B||{});
this._dicts=[];
this._this={}
};
A.extend(dojox.dtl.Context,{_dicts:[],_this:{},extend:function(B){var E=new dojox.dtl.Context();
var F=this.getKeys();
for(var D=0,C;
C=F[D];
D++){if(typeof B[C]!="undefined"){E[C]=B[C]
}else{E[C]=this[C]
}}if(B instanceof dojox.dtl.Context){F=B.getKeys()
}else{if(typeof B=="object"){F=[];
for(var C in B){F.push(C)
}}}for(var D=0,C;
C=F[D];
D++){E[C]=B[C]
}return E
},filter:function(G){var F=new dojox.dtl.Context();
var C=[];
if(G instanceof dojox.dtl.Context){C=G.getKeys()
}else{if(typeof G=="object"){for(var E in G){C.push(E)
}}else{for(var D=0,B;
B=arguments[D];
D++){if(typeof B=="string"){C.push(B)
}}}}for(var D=0,E;
E=C[D];
D++){F[E]=this[E]
}return F
},setThis:function(B){this._this=B
},getThis:function(){return this._this
},push:function(){var B={};
var E=this.getKeys();
for(var D=0,C;
C=E[D];
D++){B[C]=this[C];
delete this[C]
}this._dicts.unshift(B)
},pop:function(){if(!this._dicts.length){throw new Error("pop() has been called more times than push() on the Context")
}var B=this._dicts.shift();
A.mixin(this,B)
},hasKey:function(D){if(typeof this[D]!="undefined"){return true
}for(var C=0,B;
B=this._dicts[C];
C++){if(typeof B[D]!="undefined"){return true
}}return false
},getKeys:function(){var E=[];
for(var C in this){if(isNaN(C)){var B=false;
for(var D in dojox.dtl.Context.prototype){if(C==D){B=true;
break
}}if(!B){E.push(C)
}}}return E
},get:function(E,C){if(typeof this[E]!="undefined"){return this[E]
}for(var D=0,B;
B=this._dicts[D];
D++){if(typeof B[E]!="undefined"){return B[E]
}}return C
},update:function(B){this.push();
if(B){A.mixin(this,B)
}},toString:function(){return"dojox.dtl.Context"
}});
dojox.dtl.text={types:{tag:-1,varr:-2,text:3},pySplit:function(B){B=B.replace(/^\s+|\s+$/,"");
if(!B.length){return[]
}return B.split(/\s+/g)
},urlquote:function(C,B){if(!B){B="/"
}return dojox.string.tokenize(C,/([^\w-_.])/g,function(D){if(B.indexOf(D)==-1){if(D==" "){return"+"
}else{return"%"+D.charCodeAt(0).toString(16).toUpperCase()
}}return D
}).join("")
},_get:function(C,L,K){var E=dojox.dtl.register.get(C,L,K);
if(!E){return 
}var D=E.getRequire();
var H=E.getObj();
var I=E.getFn();
if(I.indexOf(":")!=-1){var F=I.split(":");
I=F.pop()
}A.requireIf(true,D);
var J=window;
var F=H.split(".");
for(var G=0,B;
B=F[G];
G++){if(!J[B]){return 
}J=J[B]
}return J[I||L]||J[L+"_"]
},getTag:function(C,B){return dojox.dtl.text._get("tag",C,B)
},getFilter:function(C,B){return dojox.dtl.text._get("filter",C,B)
},getTemplate:function(B){return new dojox.dtl.Template(dojox.dtl.getTemplateString(B))
},getTemplateString:function(B){return A._getText(B.toString())||""
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(.+?)\s*%\})/g,tokenize:function(B){return dojox.string.tokenize(B,dojox.dtl.text._re,dojox.dtl.text._parseDelims)
},_parseDelims:function(B,C){var D=dojox.dtl.text.types;
if(B){return[D.varr,B]
}else{return[D.tag,C]
}}};
dojox.dtl.Template=function(E){var C=dojox.dtl;
var D=C.text.tokenize(E);
var B=new C.Parser(D);
this.nodelist=B.parse()
};
A.extend(dojox.dtl.Template,{render:function(B,C){B=B||new dojox.dtl.Context({});
if(!C){A.require("dojox.string.Builder");
C=new dojox.string.Builder()
}return this.nodelist.render(B,C)+""
},toString:function(){return"dojox.dtl.Template"
}});
dojox.dtl.Filter=function(H){if(!H){throw new Error("Filter must be called with variable name")
}this.contents=H;
var G=null;
var D=this._re;
var C,B,F,I;
var E=[];
while(C=D.exec(H)){if(G===null){if(this._exists(C,3)){G=C[3]
}else{if(this._exists(C,1)){G='"'+C[1]+'"'
}else{if(this._exists(C,2)){G='"'+C[2]+'"'
}else{if(this._exists(C,9)){G='"'+C[9]+'"'
}}}}}else{if(this._exists(C,7)){F=[true,C[7]]
}else{if(this._exists(C,5)){F=[false,dojox.dtl.replace(C[5],'\\"','"')]
}else{if(this._exists(C,6)){F=[false,dojox.dtl.replace(C[6],'\\"','"')]
}else{if(this._exists(C,8)){F=[false,dojox.dtl.replace(C[8],"\\'","'")]
}}}}I=dojox.dtl.text.getFilter(C[4]);
if(typeof I!="function"){throw new Error(C[4]+" is not registered as a filter")
}E.push([I,F])
}}this.key=G;
this.filters=E
};
A.extend(dojox.dtl.Filter,{_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_exists:function(C,B){if(typeof C[B]!="undefined"&&C[B]!==""){return true
}return false
},resolve:function(D){var B=this.resolvePath(this.key,D);
for(var C=0,E;
E=this.filters[C];
C++){if(E[1]){if(E[1][0]){B=E[0](B,this.resolvePath(E[1][1],D))
}else{B=E[0](B,E[1][1])
}}else{B=E[0](B)
}}return B
},resolvePath:function(G,C){var F,E;
var B=G.charAt(0);
var D=G.charAt(G.length-1);
if(!isNaN(parseInt(B))){F=(G.indexOf(".")==-1)?parseInt(G):parseFloat(G)
}else{if(B=='"'&&B==D){F=G.substring(1,G.length-1)
}else{if(G=="true"){return true
}if(G=="false"){return false
}if(G=="null"||G=="None"){return null
}E=G.split(".");
F=C.get(E.shift());
while(E.length){if(F&&typeof F[E[0]]!="undefined"){F=F[E[0]];
if(typeof F=="function"){if(F.alters_data){F=""
}else{F=F()
}}}else{return""
}E.shift()
}}}return F
},toString:function(){return"dojox.dtl.Filter"
}});
dojox.dtl.Node=function(B){this.contents=B
};
A.extend(dojox.dtl.Node,{render:function(B,C){return C.concat(this.contents)
},toString:function(){return"dojox.dtl.Node"
}});
dojox.dtl.NodeList=function(B){this.contents=B||[]
};
A.extend(dojox.dtl.NodeList,{push:function(B){this.contents.push(B)
},render:function(B,C){for(var D=0;
D<this.contents.length;
D++){C=this.contents[D].render(B,C);
if(!C){throw new Error("Template node render functions must return their buffer")
}}return C
},unrender:function(B,C){return C
},clone:function(){return this
},toString:function(){return"dojox.dtl.NodeList"
}});
dojox.dtl.TextNode=dojox.dtl.Node;
dojox.dtl.VarNode=function(B){this.contents=new dojox.dtl.Filter(B)
};
A.extend(dojox.dtl.VarNode,{render:function(D,C){var B=this.contents.resolve(D);
return C.concat(B)
},toString:function(){return"dojox.dtl.VarNode"
}});
dojox.dtl.Parser=function(B){this.contents=B
};
A.extend(dojox.dtl.Parser,{parse:function(K){var J=dojox.dtl;
var D=J.text.types;
var C={};
var E=this.contents;
K=K||[];
for(var B=0;
B<K.length;
B++){C[K[B]]=true
}var I=new J.NodeList();
while(E.length){token=E.shift();
if(typeof token=="string"){I.push(new J.TextNode(token))
}else{var F=token[0];
var H=token[1];
if(F==D.varr){I.push(new J.VarNode(H))
}else{if(F==D.tag){if(C[H]){E.unshift(token);
return I
}var L=H.split(/\s+/g);
if(L.length){L=L[0];
var G=dojox.dtl.text.getTag(L);
if(G){I.push(G(this,H))
}}}}}}if(K.length){throw new Error("Could not find closing tag(s): "+K.toString())
}return I
},next:function(){var B=this.contents.shift();
return{type:B[0],text:B[1]}
},skipPast:function(B){var D=dojox.dtl.text.types;
while(this.contents.length){var C=this.contents.shift();
if(C[0]==D.tag&&C[1]==B){return 
}}throw new Error("Unclosed tag found when looking for "+B)
},getVarNode:function(){return dojox.dtl.VarNode
},getTextNode:function(){return dojox.dtl.TextNode
},getTemplate:function(B){return new dojox.dtl.Template(B)
},toString:function(){return"dojox.dtl.Parser"
}});
dojox.dtl.register=function(E,C,I,G){var D=dojox.dtl.register;
var F=D._mod[E]={params:[],Getter:function(J){D._params=J||{}
}};
C.unshift("name");
for(var B=0,H;
H=C[B];
B++){F.Getter.prototype["get"+H.substring(0,1).toUpperCase()+H.substring(1,H.length)]=D._ret(B)
}D[E]=function(P,K){if(G){var M=G(arguments)
}else{var M=[arguments]
}for(var J=0,O;
O=M[J];
J++){var L=[];
for(var N=0;
N<C.length;
N++){L.push(O[N]||null)
}if(typeof O[0]=="string"){F.params.unshift(L)
}else{F.params.push(L)
}}};
D[E].apply(null,I)
};
A.mixin(dojox.dtl.register,{_mod:{},_ret:function(B){return function(){return dojox.dtl.register._params[B]||""
}
},get:function(C,B,J){var I=this._mod[C]||{};
if(I.params){for(var E=0,D;
D=I.params[E];
E++){var H=D[0];
if(typeof H=="string"){if(H==B){return new I.Getter(D)
}}else{if(B.match(H)){var F=H.exec(B);
var G=[];
A.mixin(G,D);
G[0]=F[1];
return new I.Getter(D)
}}}}if(!J){throw new Error("'"+C+"' of name '"+B+"' does not exist")
}},_normalize:function(E){var D=E[2];
var C=[];
for(var F=0,B;
B=D[F];
F++){if(typeof B=="string"){C.push([B,E[0],E[1],B])
}else{C.push([B[0],E[0],E[1],B[1]])
}}return C
},tag:function(C,B,D){this("tag",["require","obj","fn"],arguments,this._normalize)
},filter:function(C,B,D){this("filter",["require","obj","fn"],arguments,this._normalize)
}});
(function(){var B=dojox.dtl.register;
var C="dojox.dtl.tag";
B.tag(C+".logic",C+".logic",["if","for"]);
B.tag(C+".loader",C+".loader",["extends","block"]);
B.tag(C+".misc",C+".misc",["comment","debug","filter"]);
B.tag(C+".loop",C+".loop",["cycle"]);
var D="dojox.dtl.filter";
B.filter(D+".dates",D+".dates",["date","time","timesince","timeuntil"]);
B.filter(D+".htmlstrings",D+".htmlstrings",["escape","linebreaks","linebreaksbr","removetags","striptags"]);
B.filter(D+".integers",D+".integers",["add","get_digit"]);
B.filter(D+".lists",D+".lists",["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"]);
B.filter(D+".logic",D+".logic",["default","default_if_none","divisibleby","yesno"]);
B.filter(D+".misc",D+".misc",["filesizeformat","pluralize","phone2numeric","pprint"]);
B.filter(D+".strings",D+".strings",["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"])
})();
dojox.dtl.replace=function(F,D,E){E=E||"";
var B,C=D.length;
while(1){B=F.indexOf(D);
if(B==-1){break
}F=F.substring(0,B)+E+F.substring(B+C)
}return F
};
dojox.dtl.resolveVariable=function(D,C){var B=new dojox.dtl.Filter(D);
return B.resolve(C)
}
}}});