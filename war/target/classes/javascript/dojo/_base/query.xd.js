dojo._xdResourceLoaded({depends:[["provide","dojo._base.query"],["require","dojo._base.NodeList"]],defineResource:function(A){if(!A._hasResource["dojo._base.query"]){A._hasResource["dojo._base.query"]=true;
A.provide("dojo._base.query");
A.require("dojo._base.NodeList");
(function(){var P=A;
var F=A.isIE?"children":"childNodes";
var c=function(r){if(r.charAt(r.length-1)==">"){r+=" *"
}r+=" ";
var h=function(AE,AD){return P.trim(r.slice(AE,AD))
};
var AA=[];
var s=-1;
var n=-1;
var y=-1;
var q=-1;
var d=-1;
var l=-1;
var x=-1;
var AC="";
var AB="";
var p;
var w=0;
var i=r.length;
var j=null;
var o=null;
var v=function(){if(x>=0){var AD=(x==w)?null:h(x,w).toLowerCase();
j[(">~+".indexOf(AD)<0)?"tag":"oper"]=AD;
x=-1
}};
var m=function(){if(l>=0){j.id=h(l,w).replace(/\\/g,"");
l=-1
}};
var u=function(){if(d>=0){j.classes.push(h(d+1,w).replace(/\\/g,""));
d=-1
}};
var z=function(){m();
v();
u()
};
for(;
w<i,AC=AB,AB=r.charAt(w);
w++){if(AC=="\\"){continue
}if(!j){p=w;
j={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null};
x=w
}if(s>=0){if(AB=="]"){if(!o.attr){o.attr=h(s+1,w)
}else{o.matchFor=h((y||s+1),w)
}var k=o.matchFor;
if(k){if((k.charAt(0)=='"')||(k.charAt(0)=="'")){o.matchFor=k.substring(1,k.length-1)
}}j.attrs.push(o);
o=null;
s=y=-1
}else{if(AB=="="){var t=("|~^$*".indexOf(AC)>=0)?AC:"";
o.type=t+AB;
o.attr=h(s+1,w-t.length);
y=w+1
}}}else{if(n>=0){if(AB==")"){if(q>=0){o.value=h(n+1,w)
}q=n=-1
}}else{if(AB=="#"){z();
l=w+1
}else{if(AB=="."){z();
d=w
}else{if(AB==":"){z();
q=w
}else{if(AB=="["){z();
s=w;
o={}
}else{if(AB=="("){if(q>=0){o={name:h(q+1,w),value:null};
j.pseudos.push(o)
}n=w
}else{if(AB==" "&&AC!=AB){z();
if(q>=0){j.pseudos.push({name:h(q+1,w)})
}j.hasLoops=(j.pseudos.length||j.attrs.length||j.classes.length);
j.query=h(p,w);
j.tag=(j.oper)?null:(j.tag||"*");
AA.push(j);
j=null
}}}}}}}}}return AA
};
var e={"*=":function(d,h){return"[contains(@"+d+", '"+h+"')]"
},"^=":function(d,h){return"[starts-with(@"+d+", '"+h+"')]"
},"$=":function(d,h){return"[substring(@"+d+", string-length(@"+d+")-"+(h.length-1)+")='"+h+"']"
},"~=":function(d,h){return"[contains(concat(' ',@"+d+",' '), ' "+h+" ')]"
},"|=":function(d,h){return"[contains(concat(' ',@"+d+",' '), ' "+h+"-')]"
},"=":function(d,h){return"[@"+d+"='"+h+"']"
}};
var E=function(i,h,d,j){P.forEach(h.attrs,function(k){var l;
if(k.type&&i[k.type]){l=i[k.type](k.attr,k.matchFor)
}else{if(k.attr.length){l=d(k.attr)
}}if(l){j(l)
}})
};
var Y=function(k){var h=".";
var j=c(P.trim(k));
while(j.length){var d=j.shift();
var i;
if(d.oper==">"){i="/";
d=j.shift()
}else{i="//"
}h+=i+d.tag;
if(d.id){h+="[@id='"+d.id+"'][1]"
}P.forEach(d.classes,function(l){var m=l.length;
var n=" ";
if(l.charAt(m-1)=="*"){n="";
l=l.substr(0,m-1)
}h+="[contains(concat(' ',@class,' '), ' "+l+n+"')]"
});
E(e,d,function(l){return"[@"+l+"]"
},function(l){h+=l
})
}return h
};
var L={};
var N=function(j){if(L[j]){return L[j]
}var i=P.doc;
var d=Y(j);
var h=function(k){var o=[];
var n;
try{n=i.evaluate(d,k,null,XPathResult.ANY_TYPE,null)
}catch(l){console.debug("failure in exprssion:",d,"under:",k);
console.debug(l)
}var m=n.iterateNext();
while(m){o.push(m);
m=n.iterateNext()
}return o
};
return L[j]=h
};
var S={};
var b={};
var J=function(h,d){if(!h){return d
}if(!d){return h
}return function(){return h.apply(window,arguments)&&d.apply(window,arguments)
}
};
var H=function(p,i,r,h){var l=h+1;
var k=(i.length==l);
var j=i[h];
if(j.oper==">"){var s=p[F];
if(!s||!s.length){return 
}l++;
k=(i.length==l);
var n=U(i[h+1]);
for(var d=0,m=s.length,o;
d<m,o=s[d];
d++){if(n(o)){if(k){r.push(o)
}else{H(o,i,r,l)
}}}}var q=D(j)(p);
if(k){while(q.length){r.push(q.shift())
}}else{while(q.length){H(q.shift(),i,r,l)
}}};
var Q=function(j,i){var h=[];
var d=j.length-1,k;
while(k=j[d--]){H(k,i,h,0)
}return h
};
var U=function(h){if(S[h.query]){return S[h.query]
}var d=null;
if(h.tag){if(h.tag=="*"){d=J(d,function(i){return(i.nodeType==1)
})
}else{d=J(d,function(i){return((i.nodeType==1)&&(h.tag==i.tagName.toLowerCase()))
})
}}if(h.id){d=J(d,function(i){return((i.nodeType==1)&&(i.id==h.id))
})
}if(h.hasLoops){d=J(d,B(h))
}return S[h.query]=d
};
var W=function(n){var l=n.parentNode;
var k=l.childNodes;
var i=-1;
var d=l.firstChild;
if(!d){return i
}var m=n.__cachedIndex;
var j=l.__cachedLength;
if(((typeof j=="number")&&(j!=k.length))||(typeof m!="number")){l.__cachedLength=k.length;
var h=1;
do{if(d===n){i=h
}if(d.nodeType==1){d.__cachedIndex=h;
h++
}d=d.nextSibling
}while(d)
}else{i=m
}return i
};
var K=0;
var G="";
var a=function(h,d){if(d=="class"){return h.className||G
}if(d=="for"){return h.htmlFor||G
}return h.getAttribute(d,2)||G
};
var Z={"*=":function(d,h){return function(i){return(a(i,d).indexOf(h)>=0)
}
},"^=":function(d,h){return function(i){return(a(i,d).indexOf(h)==0)
}
},"$=":function(d,i){var h=" "+i;
return function(k){var j=" "+a(k,d);
return(j.lastIndexOf(i)==(j.length-i.length))
}
},"~=":function(d,i){var h=" "+i+" ";
return function(k){var j=" "+a(k,d)+" ";
return(j.indexOf(h)>=0)
}
},"|=":function(d,i){var h=" "+i+"-";
return function(k){var j=" "+(k.getAttribute(d,2)||"");
return((j==i)||(j.indexOf(h)==0))
}
},"=":function(d,h){return function(i){return(a(i,d)==h)
}
}};
var C={"first-child":function(d,h){return function(j){if(j.nodeType!=1){return false
}var i=j.previousSibling;
while(i&&(i.nodeType!=1)){i=i.previousSibling
}return(!i)
}
},"last-child":function(d,h){return function(i){if(i.nodeType!=1){return false
}var j=i.nextSibling;
while(j&&(j.nodeType!=1)){j=j.nextSibling
}return(!j)
}
},empty:function(d,h){return function(l){var m=l.childNodes;
var j=l.childNodes.length;
for(var i=j-1;
i>=0;
i--){var k=m[i].nodeType;
if((k==1)||(k==3)){return false
}}return true
}
},not:function(d,i){var h=U(c(i)[0]);
return function(j){return(!h(j))
}
},"nth-child":function(i,m){var l=parseInt;
if(m=="odd"){return function(n){return(((W(n))%2)==1)
}
}else{if((m=="2n")||(m=="even")){return function(n){return((W(n)%2)==0)
}
}else{if(m.indexOf("0n+")==0){var k=l(m.substr(3));
return function(n){return(n.parentNode[F][k-1]===n)
}
}else{if((m.indexOf("n+")>0)&&(m.length>3)){var j=m.split("n+",2);
var h=l(j[0]);
var d=l(j[1]);
return function(n){return((W(n)%h)==d)
}
}else{if(m.indexOf("n")==-1){var k=l(m);
return function(n){return(W(n)==k)
}
}}}}}}};
var I=(P.isIE)?function(d){var h=d.toLowerCase();
return function(i){return i[d]||i[h]
}
}:function(d){return function(h){return(h&&h.getAttribute&&h.hasAttribute(d))
}
};
var B=function(h){var i=(b[h.query]||S[h.query]);
if(i){return i
}var d=null;
if(h.id){if(h.tag!="*"){d=J(d,function(j){return(j.tagName.toLowerCase()==h.tag)
})
}}P.forEach(h.classes,function(m,l,k){var j=m.charAt(m.length-1)=="*";
if(j){m=m.substr(0,m.length-1)
}var n=new RegExp("(?:^|\\s)"+m+(j?".*":"")+"(?:\\s|$)");
d=J(d,function(o){return n.test(o.className)
});
d.count=l
});
P.forEach(h.pseudos,function(j){if(C[j.name]){d=J(d,C[j.name](j.name,j.value))
}});
E(Z,h,I,function(j){d=J(d,j)
});
if(!d){d=function(){return true
}
}return b[h.query]=d
};
var T={};
var D=function(k,d){var h=T[k.query];
if(h){return h
}if(k.id&&!k.hasLoops&&!k.tag){return T[k.query]=function(m){return[P.byId(k.id)]
}
}var j=B(k);
var l;
if(k.tag&&k.id&&!k.hasLoops){l=function(n){var m=P.byId(k.id);
if(j(m)){return[m]
}}
}else{var i;
if(!k.hasLoops){l=function(q){var m=[];
var o,p=0,n=q.getElementsByTagName(k.tag);
while(o=n[p++]){m.push(o)
}return m
}
}else{l=function(q){var m=[];
var o,p=0,n=q.getElementsByTagName(k.tag);
while(o=n[p++]){if(j(o)){m.push(o)
}}return m
}
}}return T[k.query]=l
};
var f={};
var X={"*":P.isIE?function(d){return d.all
}:function(d){return d.getElementsByTagName("*")
},">":function(h){var i=[];
var k,d=0,j=h[F];
while(k=j[d++]){if(k.nodeType==1){i.push(k)
}}return i
}};
var O=function(j){var i=c(P.trim(j));
if(i.length==1){var h=D(i[0]);
h.nozip=true;
return h
}var d=function(k){var l=i.slice(0);
var m;
if(l[0].oper==">"){m=[k]
}else{m=D(l.shift())(k)
}return Q(m,l)
};
return d
};
var M=((document.evaluate&&!P.isSafari)?function(h){var d=h.split(" ");
if((document.evaluate)&&(h.indexOf(":")==-1)&&((true))){if(((d.length>2)&&(h.indexOf(">")==-1))||(d.length>3)||(h.indexOf("[")>=0)||((1==d.length)&&(0<=h.indexOf(".")))){return N(h)
}}return O(h)
}:O);
var V=function(d){if(X[d]){return X[d]
}if(0>d.indexOf(",")){return X[d]=M(d)
}else{var i=d.split(/\s*,\s*/);
var h=function(j){var l=0;
var k=[];
var m;
while(m=i[l++]){k=k.concat(M(m,m.indexOf(" "))(j))
}return k
};
return X[d]=h
}};
var g=0;
var R=function(h){if(h&&h.nozip){return P.NodeList._wrap(h)
}var i=new P.NodeList();
if(!h){return i
}if(h[0]){i.push(h[0])
}if(h.length<2){return i
}g++;
h[0]["_zipIdx"]=g;
for(var d=1,j;
j=h[d];
d++){if(h[d]["_zipIdx"]!=g){i.push(j)
}j._zipIdx=g
}return i
};
P.query=function(h,d){if(h.constructor==P.NodeList){return h
}if(!P.isString(h)){return new P.NodeList(h)
}if(P.isString(d)){d=P.byId(d)
}return R(V(h)(d||P.doc))
};
P._filterQueryResult=function(i,j){var l=new P.NodeList();
var h=(j)?U(c(j)[0]):function(){return true
};
for(var d=0,k;
k=i[d];
d++){if(h(k)){l.push(k)
}}return l
}
})()
}}});