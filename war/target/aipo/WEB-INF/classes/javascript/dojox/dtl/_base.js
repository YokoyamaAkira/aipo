if(!dojo._hasResource["dojox.dtl._base"]){dojo._hasResource["dojox.dtl._base"]=true;
dojo.provide("dojox.dtl._base");
dojo.require("dojox.string.Builder");
dojo.require("dojox.string.tokenize");
dojox.dtl.Context=function(A){dojo.mixin(this,A||{});
this._dicts=[];
this._this={}
};
dojo.extend(dojox.dtl.Context,{_dicts:[],_this:{},extend:function(E){var C=new dojox.dtl.Context();
var D=this.getKeys();
for(var B=0,A;
A=D[B];
B++){if(typeof E[A]!="undefined"){C[A]=E[A]
}else{C[A]=this[A]
}}if(E instanceof dojox.dtl.Context){D=E.getKeys()
}else{if(typeof E=="object"){D=[];
for(var A in E){D.push(A)
}}}for(var B=0,A;
A=D[B];
B++){C[A]=E[A]
}return C
},filter:function(E){var D=new dojox.dtl.Context();
var F=[];
if(E instanceof dojox.dtl.Context){F=E.getKeys()
}else{if(typeof E=="object"){for(var C in E){F.push(C)
}}else{for(var B=0,A;
A=arguments[B];
B++){if(typeof A=="string"){F.push(A)
}}}}for(var B=0,C;
C=F[B];
B++){D[C]=this[C]
}return D
},setThis:function(A){this._this=A
},getThis:function(){return this._this
},push:function(){var D={};
var C=this.getKeys();
for(var B=0,A;
A=C[B];
B++){D[A]=this[A];
delete this[A]
}this._dicts.unshift(D)
},pop:function(){if(!this._dicts.length){throw new Error("pop() has been called more times than push() on the Context")
}var A=this._dicts.shift();
dojo.mixin(this,A)
},hasKey:function(B){if(typeof this[B]!="undefined"){return true
}for(var A=0,C;
C=this._dicts[A];
A++){if(typeof C[B]!="undefined"){return true
}}return false
},getKeys:function(){var C=[];
for(var A in this){if(isNaN(A)){var D=false;
for(var B in dojox.dtl.Context.prototype){if(A==B){D=true;
break
}}if(!D){C.push(A)
}}}return C
},get:function(C,A){if(typeof this[C]!="undefined"){return this[C]
}for(var B=0,D;
D=this._dicts[B];
B++){if(typeof D[C]!="undefined"){return D[C]
}}return A
},update:function(A){this.push();
if(A){dojo.mixin(this,A)
}},toString:function(){return"dojox.dtl.Context"
}});
dojox.dtl.text={types:{tag:-1,varr:-2,text:3},pySplit:function(A){A=A.replace(/^\s+|\s+$/,"");
if(!A.length){return[]
}return A.split(/\s+/g)
},urlquote:function(A,B){if(!B){B="/"
}return dojox.string.tokenize(A,/([^\w-_.])/g,function(C){if(B.indexOf(C)==-1){if(C==" "){return"+"
}else{return"%"+C.charCodeAt(0).toString(16).toUpperCase()
}}return C
}).join("")
},_get:function(D,B,A){var F=dojox.dtl.register.get(D,B,A);
if(!F){return 
}var E=F.getRequire();
var I=F.getObj();
var J=F.getFn();
if(J.indexOf(":")!=-1){var G=J.split(":");
J=G.pop()
}dojo.requireIf(true,E);
var K=window;
var G=I.split(".");
for(var H=0,C;
C=G[H];
H++){if(!K[C]){return 
}K=K[C]
}return K[J||B]||K[B+"_"]
},getTag:function(A,B){return dojox.dtl.text._get("tag",A,B)
},getFilter:function(A,B){return dojox.dtl.text._get("filter",A,B)
},getTemplate:function(A){return new dojox.dtl.Template(dojox.dtl.getTemplateString(A))
},getTemplateString:function(A){return dojo._getText(A.toString())||""
},_re:/(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(.+?)\s*%\})/g,tokenize:function(A){return dojox.string.tokenize(A,dojox.dtl.text._re,dojox.dtl.text._parseDelims)
},_parseDelims:function(C,A){var B=dojox.dtl.text.types;
if(C){return[B.varr,C]
}else{return[B.tag,A]
}}};
dojox.dtl.Template=function(C){var A=dojox.dtl;
var B=A.text.tokenize(C);
var D=new A.Parser(B);
this.nodelist=D.parse()
};
dojo.extend(dojox.dtl.Template,{render:function(B,A){B=B||new dojox.dtl.Context({});
if(!A){dojo.require("dojox.string.Builder");
A=new dojox.string.Builder()
}return this.nodelist.render(B,A)+""
},toString:function(){return"dojox.dtl.Template"
}});
dojox.dtl.Filter=function(C){if(!C){throw new Error("Filter must be called with variable name")
}this.contents=C;
var B=null;
var F=this._re;
var H,E,A,D;
var G=[];
while(H=F.exec(C)){if(B===null){if(this._exists(H,3)){B=H[3]
}else{if(this._exists(H,1)){B='"'+H[1]+'"'
}else{if(this._exists(H,2)){B='"'+H[2]+'"'
}else{if(this._exists(H,9)){B='"'+H[9]+'"'
}}}}}else{if(this._exists(H,7)){A=[true,H[7]]
}else{if(this._exists(H,5)){A=[false,dojox.dtl.replace(H[5],'\\"','"')]
}else{if(this._exists(H,6)){A=[false,dojox.dtl.replace(H[6],'\\"','"')]
}else{if(this._exists(H,8)){A=[false,dojox.dtl.replace(H[8],"\\'","'")]
}}}}D=dojox.dtl.text.getFilter(H[4]);
if(typeof D!="function"){throw new Error(H[4]+" is not registered as a filter")
}G.push([D,A])
}}this.key=B;
this.filters=G
};
dojo.extend(dojox.dtl.Filter,{_re:/(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,_exists:function(A,B){if(typeof A[B]!="undefined"&&A[B]!==""){return true
}return false
},resolve:function(B){var D=this.resolvePath(this.key,B);
for(var A=0,C;
C=this.filters[A];
A++){if(C[1]){if(C[1][0]){D=C[0](D,this.resolvePath(C[1][1],B))
}else{D=C[0](D,C[1][1])
}}else{D=C[0](D)
}}return D
},resolvePath:function(E,A){var D,C;
var F=E.charAt(0);
var B=E.charAt(E.length-1);
if(!isNaN(parseInt(F))){D=(E.indexOf(".")==-1)?parseInt(E):parseFloat(E)
}else{if(F=='"'&&F==B){D=E.substring(1,E.length-1)
}else{if(E=="true"){return true
}if(E=="false"){return false
}if(E=="null"||E=="None"){return null
}C=E.split(".");
D=A.get(C.shift());
while(C.length){if(D&&typeof D[C[0]]!="undefined"){D=D[C[0]];
if(typeof D=="function"){if(D.alters_data){D=""
}else{D=D()
}}}else{return""
}C.shift()
}}}return D
},toString:function(){return"dojox.dtl.Filter"
}});
dojox.dtl.Node=function(A){this.contents=A
};
dojo.extend(dojox.dtl.Node,{render:function(B,A){return A.concat(this.contents)
},toString:function(){return"dojox.dtl.Node"
}});
dojox.dtl.NodeList=function(A){this.contents=A||[]
};
dojo.extend(dojox.dtl.NodeList,{push:function(A){this.contents.push(A)
},render:function(C,A){for(var B=0;
B<this.contents.length;
B++){A=this.contents[B].render(C,A);
if(!A){throw new Error("Template node render functions must return their buffer")
}}return A
},unrender:function(B,A){return A
},clone:function(){return this
},toString:function(){return"dojox.dtl.NodeList"
}});
dojox.dtl.TextNode=dojox.dtl.Node;
dojox.dtl.VarNode=function(A){this.contents=new dojox.dtl.Filter(A)
};
dojo.extend(dojox.dtl.VarNode,{render:function(B,A){var C=this.contents.resolve(B);
return A.concat(C)
},toString:function(){return"dojox.dtl.VarNode"
}});
dojox.dtl.Parser=function(A){this.contents=A
};
dojo.extend(dojox.dtl.Parser,{parse:function(A){var K=dojox.dtl;
var E=K.text.types;
var D={};
var F=this.contents;
A=A||[];
for(var C=0;
C<A.length;
C++){D[A[C]]=true
}var J=new K.NodeList();
while(F.length){token=F.shift();
if(typeof token=="string"){J.push(new K.TextNode(token))
}else{var G=token[0];
var I=token[1];
if(G==E.varr){J.push(new K.VarNode(I))
}else{if(G==E.tag){if(D[I]){F.unshift(token);
return J
}var B=I.split(/\s+/g);
if(B.length){B=B[0];
var H=dojox.dtl.text.getTag(B);
if(H){J.push(H(this,I))
}}}}}}if(A.length){throw new Error("Could not find closing tag(s): "+A.toString())
}return J
},next:function(){var A=this.contents.shift();
return{type:A[0],text:A[1]}
},skipPast:function(C){var B=dojox.dtl.text.types;
while(this.contents.length){var A=this.contents.shift();
if(A[0]==B.tag&&A[1]==C){return 
}}throw new Error("Unclosed tag found when looking for "+C)
},getVarNode:function(){return dojox.dtl.VarNode
},getTextNode:function(){return dojox.dtl.TextNode
},getTemplate:function(A){return new dojox.dtl.Template(A)
},toString:function(){return"dojox.dtl.Parser"
}});
dojox.dtl.register=function(G,H,D,B){var F=dojox.dtl.register;
var A=F._mod[G]={params:[],Getter:function(I){F._params=I||{}
}};
H.unshift("name");
for(var E=0,C;
C=H[E];
E++){A.Getter.prototype["get"+C.substring(0,1).toUpperCase()+C.substring(1,C.length)]=F._ret(E)
}F[G]=function(K,M){if(B){var O=B(arguments)
}else{var O=[arguments]
}for(var L=0,J;
J=O[L];
L++){var N=[];
for(var I=0;
I<H.length;
I++){N.push(J[I]||null)
}if(typeof J[0]=="string"){A.params.unshift(N)
}else{A.params.push(N)
}}};
F[G].apply(null,D)
};
dojo.mixin(dojox.dtl.register,{_mod:{},_ret:function(A){return function(){return dojox.dtl.register._params[A]||""
}
},get:function(D,C,B){var A=this._mod[D]||{};
if(A.params){for(var F=0,E;
E=A.params[F];
F++){var I=E[0];
if(typeof I=="string"){if(I==C){return new A.Getter(E)
}}else{if(C.match(I)){var G=I.exec(C);
var H=[];
dojo.mixin(H,E);
H[0]=G[1];
return new A.Getter(E)
}}}}if(!B){throw new Error("'"+D+"' of name '"+C+"' does not exist")
}},_normalize:function(C){var B=C[2];
var A=[];
for(var D=0,E;
E=B[D];
D++){if(typeof E=="string"){A.push([E,C[0],C[1],E])
}else{A.push([E[0],C[0],C[1],E[1]])
}}return A
},tag:function(A,C,B){this("tag",["require","obj","fn"],arguments,this._normalize)
},filter:function(A,C,B){this("filter",["require","obj","fn"],arguments,this._normalize)
}});
(function(){var C=dojox.dtl.register;
var A="dojox.dtl.tag";
C.tag(A+".logic",A+".logic",["if","for"]);
C.tag(A+".loader",A+".loader",["extends","block"]);
C.tag(A+".misc",A+".misc",["comment","debug","filter"]);
C.tag(A+".loop",A+".loop",["cycle"]);
var B="dojox.dtl.filter";
C.filter(B+".dates",B+".dates",["date","time","timesince","timeuntil"]);
C.filter(B+".htmlstrings",B+".htmlstrings",["escape","linebreaks","linebreaksbr","removetags","striptags"]);
C.filter(B+".integers",B+".integers",["add","get_digit"]);
C.filter(B+".lists",B+".lists",["dictsort","dictsortreversed","first","join","length","length_is","random","slice","unordered_list"]);
C.filter(B+".logic",B+".logic",["default","default_if_none","divisibleby","yesno"]);
C.filter(B+".misc",B+".misc",["filesizeformat","pluralize","phone2numeric","pprint"]);
C.filter(B+".strings",B+".strings",["addslashes","capfirst","center","cut","fix_ampersands","floatformat","iriencode","linenumbers","ljust","lower","make_list","rjust","slugify","stringformat","title","truncatewords","truncatewords_html","upper","urlencode","urlize","urlizetrunc","wordcount","wordwrap"])
})();
dojox.dtl.replace=function(D,B,C){C=C||"";
var E,A=B.length;
while(1){E=D.indexOf(B);
if(E==-1){break
}D=D.substring(0,E)+C+D.substring(E+A)
}return D
};
dojox.dtl.resolveVariable=function(B,A){var C=new dojox.dtl.Filter(B);
return C.resolve(A)
}
};