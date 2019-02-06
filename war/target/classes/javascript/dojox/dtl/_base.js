if(!dojo._hasResource["dojox.dtl._base"]){dojo._hasResource["dojox.dtl._base"]=true;
dojo.provide("dojox.dtl._base");
dojo.require("dojox.string.Builder");
dojo.require("dojox.string.tokenize");
dojox.dtl.Context=function(A){dojo.mixin(this,A||{});
this._dicts=[];
this._this={}
};
dojo.extend(dojox.dtl.Context,{_dicts:[],_this:{},extend:function(D){var B=new dojox.dtl.Context();
var C=this.getKeys();
for(var A=0,E;
E=C[A];
A++){if(typeof D[E]!="undefined"){B[E]=D[E]
}else{B[E]=this[E]
}}if(D instanceof dojox.dtl.Context){C=D.getKeys()
}else{if(typeof D=="object"){C=[];
for(var E in D){C.push(E)
}}}for(var A=0,E;
E=C[A];
A++){B[E]=D[E]
}return B
},filter:function(D){var C=new dojox.dtl.Context();
var E=[];
if(D instanceof dojox.dtl.Context){E=D.getKeys()
}else{if(typeof D=="object"){for(var B in D){E.push(B)
}}else{for(var A=0,F;
F=arguments[A];
A++){if(typeof F=="string"){E.push(F)
}}}}for(var A=0,B;
B=E[A];
A++){C[B]=this[B]
}return C
},setThis:function(A){this._this=A
},getThis:function(){return this._this
},push:function(){var C={};
var B=this.getKeys();
for(var A=0,D;
D=B[A];
A++){C[D]=this[D];
delete this[D]
}this._dicts.unshift(C)
},pop:function(){if(!this._dicts.length){throw new Error("pop() has been called more times than push() on the Context")
}var A=this._dicts.shift();
dojo.mixin(this,A)
},hasKey:function(A){if(typeof this[A]!="undefined"){return true
}for(var C=0,B;
B=this._dicts[C];
C++){if(typeof B[A]!="undefined"){return true
}}return false
},getKeys:function(){var B=[];
for(var D in this){if(isNaN(D)){var C=false;
for(var A in dojox.dtl.Context.prototype){if(D==A){C=true;
break
}}if(!C){B.push(D)
}}}return B
},get:function(B,D){if(typeof this[B]!="undefined"){return this[B]
}for(var A=0,C;
C=this._dicts[A];
A++){if(typeof C[B]!="undefined"){return C[B]
}}return D
},update:function(A){this.push();
if(A){dojo.mixin(this,A)
}},toString:function(){return"dojox.dtl.Context"
}});
dojox.dtl.text={types:{tag:-1,varr:-2,text:3},pySplit:function(A){A=A.replace(/^\s+|\s+$/,"");
if(!A.length){return[]
}return A.split(/\s+/g)
},urlquote:function(B,A){if(!A){A="/"
}return dojox.string.tokenize(B,/([^\w-_.])/g,function(C){if(A.indexOf(C)==-1){if(C==" "){return"+"
}else{return"%"+C.charCodeAt(0).toString(16).toUpperCase()
}}return C
}).join("")
},_get:function(K,I,H){var B=dojox.dtl.register.get(K,I,H);
if(!B){return 
}var A=B.getRequire();
var E=B.getObj();
var F=B.getFn();
if(F.indexOf(":")!=-1){var C=F.split(":");
F=C.pop()
}dojo.requireIf(true,A);
var G=window;
var C=E.split(".");
for(var D=0,J;
J=C[D];
D++){if(!G[J]){return 
}G=G[J]
}return G[F||I]||G[I+"_"]
},getTag:function(B,A){return dojox.dtl.text._get("tag",B,A)
},getFilter:function(B,A){return dojox.dtl.text._get("filter",B,A)
},getTemplate:function(A){return new dojox.dtl.Template(dojox.dtl.getTemplateString(A))
},getTemplateString:function(A){return dojo._getText(A.toString())||""
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(.+?)\s*%\})/g,tokenize:function(A){return dojox.string.tokenize(A,dojox.dtl.text._re,dojox.dtl.text._parseDelims)
},_parseDelims:function(B,C){var A=dojox.dtl.text.types;
if(B){return[A.varr,B]
}else{return[A.tag,C]
}}};
dojox.dtl.Template=function(B){var D=dojox.dtl;
var A=D.text.tokenize(B);
var C=new D.Parser(A);
this.nodelist=C.parse()
};
dojo.extend(dojox.dtl.Template,{render:function(A,B){A=A||new dojox.dtl.Context({});
if(!B){dojo.require("dojox.string.Builder");
B=new dojox.string.Builder()
}return this.nodelist.render(A,B)+""
},toString:function(){return"dojox.dtl.Template"
}});
dojox.dtl.Filter=function(F){if(!F){throw new Error("Filter must be called with variable name")
}this.contents=F;
var E=null;
var A=this._re;
var C,H,D,G;
var B=[];
while(C=A.exec(F)){if(E===null){if(this._exists(C,3)){E=C[3]
}else{if(this._exists(C,1)){E='"'+C[1]+'"'
}else{if(this._exists(C,2)){E='"'+C[2]+'"'
}else{if(this._exists(C,9)){E='"'+C[9]+'"'
}}}}}else{if(this._exists(C,7)){D=[true,C[7]]
}else{if(this._exists(C,5)){D=[false,dojox.dtl.replace(C[5],'\\"','"')]
}else{if(this._exists(C,6)){D=[false,dojox.dtl.replace(C[6],'\\"','"')]
}else{if(this._exists(C,8)){D=[false,dojox.dtl.replace(C[8],"\\'","'")]
}}}}G=dojox.dtl.text.getFilter(C[4]);
if(typeof G!="function"){throw new Error(C[4]+" is not registered as a filter")
}B.push([G,D])
}}this.key=E;
this.filters=B
};
dojo.extend(dojox.dtl.Filter,{_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_exists:function(B,A){if(typeof B[A]!="undefined"&&B[A]!==""){return true
}return false
},resolve:function(A){var C=this.resolvePath(this.key,A);
for(var D=0,B;
B=this.filters[D];
D++){if(B[1]){if(B[1][0]){C=B[0](C,this.resolvePath(B[1][1],A))
}else{C=B[0](C,B[1][1])
}}else{C=B[0](C)
}}return C
},resolvePath:function(D,F){var C,B;
var E=D.charAt(0);
var A=D.charAt(D.length-1);
if(!isNaN(parseInt(E))){C=(D.indexOf(".")==-1)?parseInt(D):parseFloat(D)
}else{if(E=='"'&&E==A){C=D.substring(1,D.length-1)
}else{if(D=="true"){return true
}if(D=="false"){return false
}if(D=="null"||D=="None"){return null
}B=D.split(".");
C=F.get(B.shift());
while(B.length){if(C&&typeof C[B[0]]!="undefined"){C=C[B[0]];
if(typeof C=="function"){if(C.alters_data){C=""
}else{C=C()
}}}else{return""
}B.shift()
}}}return C
},toString:function(){return"dojox.dtl.Filter"
}});
dojox.dtl.Node=function(A){this.contents=A
};
dojo.extend(dojox.dtl.Node,{render:function(A,B){return B.concat(this.contents)
},toString:function(){return"dojox.dtl.Node"
}});
dojox.dtl.NodeList=function(A){this.contents=A||[]
};
dojo.extend(dojox.dtl.NodeList,{push:function(A){this.contents.push(A)
},render:function(B,C){for(var A=0;
A<this.contents.length;
A++){C=this.contents[A].render(B,C);
if(!C){throw new Error("Template node render functions must return their buffer")
}}return C
},unrender:function(A,B){return B
},clone:function(){return this
},toString:function(){return"dojox.dtl.NodeList"
}});
dojox.dtl.TextNode=dojox.dtl.Node;
dojox.dtl.VarNode=function(A){this.contents=new dojox.dtl.Filter(A)
};
dojo.extend(dojox.dtl.VarNode,{render:function(A,C){var B=this.contents.resolve(A);
return C.concat(B)
},toString:function(){return"dojox.dtl.VarNode"
}});
dojox.dtl.Parser=function(A){this.contents=A
};
dojo.extend(dojox.dtl.Parser,{parse:function(H){var G=dojox.dtl;
var A=G.text.types;
var K={};
var B=this.contents;
H=H||[];
for(var J=0;
J<H.length;
J++){K[H[J]]=true
}var F=new G.NodeList();
while(B.length){token=B.shift();
if(typeof token=="string"){F.push(new G.TextNode(token))
}else{var C=token[0];
var E=token[1];
if(C==A.varr){F.push(new G.VarNode(E))
}else{if(C==A.tag){if(K[E]){B.unshift(token);
return F
}var I=E.split(/\s+/g);
if(I.length){I=I[0];
var D=dojox.dtl.text.getTag(I);
if(D){F.push(D(this,E))
}}}}}}if(H.length){throw new Error("Could not find closing tag(s): "+H.toString())
}return F
},next:function(){var A=this.contents.shift();
return{type:A[0],text:A[1]}
},skipPast:function(B){var A=dojox.dtl.text.types;
while(this.contents.length){var C=this.contents.shift();
if(C[0]==A.tag&&C[1]==B){return 
}}throw new Error("Unclosed tag found when looking for "+B)
},getVarNode:function(){return dojox.dtl.VarNode
},getTextNode:function(){return dojox.dtl.TextNode
},getTemplate:function(A){return new dojox.dtl.Template(A)
},toString:function(){return"dojox.dtl.Parser"
}});
dojox.dtl.register=function(B,C,G,E){var A=dojox.dtl.register;
var D=A._mod[B]={params:[],Getter:function(I){A._params=I||{}
}};
C.unshift("name");
for(var H=0,F;
F=C[H];
H++){D.Getter.prototype["get"+F.substring(0,1).toUpperCase()+F.substring(1,F.length)]=A._ret(H)
}A[B]=function(O,J){if(E){var L=E(arguments)
}else{var L=[arguments]
}for(var I=0,N;
N=L[I];
I++){var K=[];
for(var M=0;
M<C.length;
M++){K.push(N[M]||null)
}if(typeof N[0]=="string"){D.params.unshift(K)
}else{D.params.push(K)
}}};
A[B].apply(null,G)
};
dojo.mixin(dojox.dtl.register,{_mod:{},_ret:function(A){return function(){return dojox.dtl.register._params[A]||""
}
},get:function(I,H,G){var F=this._mod[I]||{};
if(F.params){for(var B=0,A;
A=F.params[B];
B++){var E=A[0];
if(typeof E=="string"){if(E==H){return new F.Getter(A)
}}else{if(H.match(E)){var C=E.exec(H);
var D=[];
dojo.mixin(D,A);
D[0]=C[1];
return new F.Getter(A)
}}}}if(!G){throw new Error("'"+I+"' of name '"+H+"' does not exist")
}},_normalize:function(B){var A=B[2];
var E=[];
for(var C=0,D;
D=A[C];
C++){if(typeof D=="string"){E.push([D,B[0],B[1],D])
}else{E.push([D[0],B[0],B[1],D[1]])
}}return E
},tag:function(C,B,A){this("tag",["require","obj","fn"],arguments,this._normalize)
},filter:function(C,B,A){this("filter",["require","obj","fn"],arguments,this._normalize)
}});
(function(){var B=dojox.dtl.register;
var C="dojox.dtl.tag";
B.tag(C+".logic",C+".logic",["if","for"]);
B.tag(C+".loader",C+".loader",["extends","block"]);
B.tag(C+".misc",C+".misc",["comment","debug","filter"]);
B.tag(C+".loop",C+".loop",["cycle"]);
var A="dojox.dtl.filter";
B.filter(A+".dates",A+".dates",["date","time","timesince","timeuntil"]);
B.filter(A+".htmlstrings",A+".htmlstrings",["escape","linebreaks","linebreaksbr","removetags","striptags"]);
B.filter(A+".integers",A+".integers",["add","get_digit"]);
B.filter(A+".lists",A+".lists",["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"]);
B.filter(A+".logic",A+".logic",["default","default_if_none","divisibleby","yesno"]);
B.filter(A+".misc",A+".misc",["filesizeformat","pluralize","phone2numeric","pprint"]);
B.filter(A+".strings",A+".strings",["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"])
})();
dojox.dtl.replace=function(C,A,B){B=B||"";
var D,E=A.length;
while(1){D=C.indexOf(A);
if(D==-1){break
}C=C.substring(0,D)+B+C.substring(D+E)
}return C
};
dojox.dtl.resolveVariable=function(A,C){var B=new dojox.dtl.Filter(A);
return B.resolve(C)
}
};