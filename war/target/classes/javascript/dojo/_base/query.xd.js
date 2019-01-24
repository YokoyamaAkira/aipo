dojo._xdResourceLoaded({depends:[["provide","dojo._base.query"],["require","dojo._base.NodeList"]],defineResource:function(A){if(!A._hasResource["dojo._base.query"]){A._hasResource["dojo._base.query"]=true;
A.provide("dojo._base.query");
A.require("dojo._base.NodeList");
(function(){var Z=A;
var J=A.isIE?"children":"childNodes";
var V=function(n){if(n.charAt(n.length-1)==">"){n+=" *"
}n+=" ";
var h=function(x,AE){return Z.trim(n.slice(x,AE))
};
var w=[];
var o=-1;
var l=-1;
var u=-1;
var AD=-1;
var d=-1;
var k=-1;
var t=-1;
var z="";
var y="";
var m;
var s=0;
var i=n.length;
var j=null;
var AC=null;
var r=function(){if(t>=0){var x=(t==s)?null:h(t,s).toLowerCase();
j[(">~+".indexOf(x)<0)?"tag":"oper"]=x;
t=-1
}};
var AB=function(){if(k>=0){j.id=h(k,s).replace(/\\/g,"");
k=-1
}};
var q=function(){if(d>=0){j.classes.push(h(d+1,s).replace(/\\/g,""));
d=-1
}};
var v=function(){AB();
r();
q()
};
for(;
s<i,z=y,y=n.charAt(s);
s++){if(z=="\\"){continue
}if(!j){m=s;
j={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null};
t=s
}if(o>=0){if(y=="]"){if(!AC.attr){AC.attr=h(o+1,s)
}else{AC.matchFor=h((u||o+1),s)
}var AA=AC.matchFor;
if(AA){if((AA.charAt(0)=='"')||(AA.charAt(0)=="'")){AC.matchFor=AA.substring(1,AA.length-1)
}}j.attrs.push(AC);
AC=null;
o=u=-1
}else{if(y=="="){var p=("|~^$*".indexOf(z)>=0)?z:"";
AC.type=p+y;
AC.attr=h(o+1,s-p.length);
u=s+1
}}}else{if(l>=0){if(y==")"){if(AD>=0){AC.value=h(l+1,s)
}AD=l=-1
}}else{if(y=="#"){v();
k=s+1
}else{if(y=="."){v();
d=s
}else{if(y==":"){v();
AD=s
}else{if(y=="["){v();
o=s;
AC={}
}else{if(y=="("){if(AD>=0){AC={name:h(AD+1,s),value:null};
j.pseudos.push(AC)
}l=s
}else{if(y==" "&&z!=y){v();
if(AD>=0){j.pseudos.push({name:h(AD+1,s)})
}j.hasLoops=(j.pseudos.length||j.attrs.length||j.classes.length);
j.query=h(m,s);
j.tag=(j.oper)?null:(j.tag||"*");
w.push(j);
j=null
}}}}}}}}}return w
};
var W={"*=":function(d,h){return"[contains(@"+d+", '"+h+"')]"
},"^=":function(d,h){return"[starts-with(@"+d+", '"+h+"')]"
},"$=":function(d,h){return"[substring(@"+d+", string-length(@"+d+")-"+(h.length-1)+")='"+h+"']"
},"~=":function(d,h){return"[contains(concat(' ',@"+d+",' '), ' "+h+" ')]"
},"|=":function(d,h){return"[contains(concat(' ',@"+d+",' '), ' "+h+"-')]"
},"=":function(d,h){return"[@"+d+"='"+h+"']"
}};
var I=function(i,h,d,j){Z.forEach(h.attrs,function(k){var l;
if(k.type&&i[k.type]){l=i[k.type](k.attr,k.matchFor)
}else{if(k.attr.length){l=d(k.attr)
}}if(l){j(l)
}})
};
var C=function(k){var h=".";
var j=V(Z.trim(k));
while(j.length){var d=j.shift();
var i;
if(d.oper==">"){i="/";
d=j.shift()
}else{i="//"
}h+=i+d.tag;
if(d.id){h+="[@id='"+d.id+"'][1]"
}Z.forEach(d.classes,function(n){var l=n.length;
var m=" ";
if(n.charAt(l-1)=="*"){m="";
n=n.substr(0,l-1)
}h+="[contains(concat(' ',@class,' '), ' "+n+m+"')]"
});
I(W,d,function(l){return"[@"+l+"]"
},function(l){h+=l
})
}return h
};
var N={};
var O=function(j){if(N[j]){return N[j]
}var i=Z.doc;
var d=C(j);
var h=function(n){var m=[];
var l;
try{l=i.evaluate(d,n,null,XPathResult.ANY_TYPE,null)
}catch(o){console.debug("failure in exprssion:",d,"under:",n);
console.debug(o)
}var k=l.iterateNext();
while(k){m.push(k);
k=l.iterateNext()
}return m
};
return N[j]=h
};
var Q={};
var E={};
var M=function(h,d){if(!h){return d
}if(!d){return h
}return function(){return h.apply(window,arguments)&&d.apply(window,arguments)
}
};
var L=function(m,s,o,r){var i=r+1;
var h=(s.length==i);
var d=s[r];
if(d.oper==">"){var p=m[J];
if(!p||!p.length){return 
}i++;
h=(s.length==i);
var k=R(s[r+1]);
for(var q=0,j=p.length,l;
q<j,l=p[q];
q++){if(k(l)){if(h){o.push(l)
}else{L(l,s,o,i)
}}}}var n=H(d)(m);
if(h){while(n.length){o.push(n.shift())
}}else{while(n.length){L(n.shift(),s,o,i)
}}};
var P=function(j,i){var h=[];
var d=j.length-1,k;
while(k=j[d--]){L(k,i,h,0)
}return h
};
var R=function(h){if(Q[h.query]){return Q[h.query]
}var d=null;
if(h.tag){if(h.tag=="*"){d=M(d,function(i){return(i.nodeType==1)
})
}else{d=M(d,function(i){return((i.nodeType==1)&&(h.tag==i.tagName.toLowerCase()))
})
}}if(h.id){d=M(d,function(i){return((i.nodeType==1)&&(i.id==h.id))
})
}if(h.hasLoops){d=M(d,F(h))
}return Q[h.query]=d
};
var B=function(m){var k=m.parentNode;
var j=k.childNodes;
var h=-1;
var n=k.firstChild;
if(!n){return h
}var l=m.__cachedIndex;
var i=k.__cachedLength;
if(((typeof i=="number")&&(i!=j.length))||(typeof l!="number")){k.__cachedLength=j.length;
var d=1;
do{if(n===m){h=d
}if(n.nodeType==1){n.__cachedIndex=d;
d++
}n=n.nextSibling
}while(n)
}else{h=l
}return h
};
var b=0;
var K="";
var D=function(h,d){if(d=="class"){return h.className||K
}if(d=="for"){return h.htmlFor||K
}return h.getAttribute(d,2)||K
};
var U={"*=":function(d,h){return function(i){return(D(i,d).indexOf(h)>=0)
}
},"^=":function(d,h){return function(i){return(D(i,d).indexOf(h)==0)
}
},"$=":function(d,i){var h=" "+i;
return function(k){var j=" "+D(k,d);
return(j.lastIndexOf(i)==(j.length-i.length))
}
},"~=":function(d,i){var h=" "+i+" ";
return function(k){var j=" "+D(k,d)+" ";
return(j.indexOf(h)>=0)
}
},"|=":function(d,i){var h=" "+i+"-";
return function(k){var j=" "+(k.getAttribute(d,2)||"");
return((j==i)||(j.indexOf(h)==0))
}
},"=":function(d,h){return function(i){return(D(i,d)==h)
}
}};
var G={"first-child":function(d,h){return function(j){if(j.nodeType!=1){return false
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
},not:function(d,i){var h=R(V(i)[0]);
return function(j){return(!h(j))
}
},"nth-child":function(i,m){var l=parseInt;
if(m=="odd"){return function(n){return(((B(n))%2)==1)
}
}else{if((m=="2n")||(m=="even")){return function(n){return((B(n)%2)==0)
}
}else{if(m.indexOf("0n+")==0){var k=l(m.substr(3));
return function(n){return(n.parentNode[J][k-1]===n)
}
}else{if((m.indexOf("n+")>0)&&(m.length>3)){var j=m.split("n+",2);
var h=l(j[0]);
var d=l(j[1]);
return function(n){return((B(n)%h)==d)
}
}else{if(m.indexOf("n")==-1){var k=l(m);
return function(n){return(B(n)==k)
}
}}}}}}};
var a=(Z.isIE)?function(d){var h=d.toLowerCase();
return function(i){return i[d]||i[h]
}
}:function(d){return function(h){return(h&&h.getAttribute&&h.hasAttribute(d))
}
};
var F=function(h){var i=(E[h.query]||Q[h.query]);
if(i){return i
}var d=null;
if(h.id){if(h.tag!="*"){d=M(d,function(j){return(j.tagName.toLowerCase()==h.tag)
})
}}Z.forEach(h.classes,function(l,k,j){var n=l.charAt(l.length-1)=="*";
if(n){l=l.substr(0,l.length-1)
}var m=new RegExp("(?:^|\\s)"+l+(n?".*":"")+"(?:\\s|$)");
d=M(d,function(o){return m.test(o.className)
});
d.count=k
});
Z.forEach(h.pseudos,function(j){if(G[j.name]){d=M(d,G[j.name](j.name,j.value))
}});
I(U,h,a,function(j){d=M(d,j)
});
if(!d){d=function(){return true
}
}return E[h.query]=d
};
var g={};
var H=function(k,d){var h=g[k.query];
if(h){return h
}if(k.id&&!k.hasLoops&&!k.tag){return g[k.query]=function(m){return[Z.byId(k.id)]
}
}var j=F(k);
var l;
if(k.tag&&k.id&&!k.hasLoops){l=function(m){var n=Z.byId(k.id);
if(j(n)){return[n]
}}
}else{var i;
if(!k.hasLoops){l=function(n){var o=[];
var q,m=0,p=n.getElementsByTagName(k.tag);
while(q=p[m++]){o.push(q)
}return o
}
}else{l=function(n){var o=[];
var q,m=0,p=n.getElementsByTagName(k.tag);
while(q=p[m++]){if(j(q)){o.push(q)
}}return o
}
}}return g[k.query]=l
};
var X={};
var T={"*":Z.isIE?function(d){return d.all
}:function(d){return d.getElementsByTagName("*")
},">":function(h){var i=[];
var k,d=0,j=h[J];
while(k=j[d++]){if(k.nodeType==1){i.push(k)
}}return i
}};
var e=function(j){var i=V(Z.trim(j));
if(i.length==1){var h=H(i[0]);
h.nozip=true;
return h
}var d=function(k){var l=i.slice(0);
var m;
if(l[0].oper==">"){m=[k]
}else{m=H(l.shift())(k)
}return P(m,l)
};
return d
};
var c=((document.evaluate&&!Z.isSafari)?function(h){var d=h.split(" ");
if((document.evaluate)&&(h.indexOf(":")==-1)&&((true))){if(((d.length>2)&&(h.indexOf(">")==-1))||(d.length>3)||(h.indexOf("[")>=0)||((1==d.length)&&(0<=h.indexOf(".")))){return O(h)
}}return e(h)
}:e);
var S=function(d){if(T[d]){return T[d]
}if(0>d.indexOf(",")){return T[d]=c(d)
}else{var i=d.split(/\s*,\s*/);
var h=function(j){var l=0;
var k=[];
var m;
while(m=i[l++]){k=k.concat(c(m,m.indexOf(" "))(j))
}return k
};
return T[d]=h
}};
var Y=0;
var f=function(h){if(h&&h.nozip){return Z.NodeList._wrap(h)
}var i=new Z.NodeList();
if(!h){return i
}if(h[0]){i.push(h[0])
}if(h.length<2){return i
}Y++;
h[0]["_zipIdx"]=Y;
for(var d=1,j;
j=h[d];
d++){if(h[d]["_zipIdx"]!=Y){i.push(j)
}j._zipIdx=Y
}return i
};
Z.query=function(h,d){if(h.constructor==Z.NodeList){return h
}if(!Z.isString(h)){return new Z.NodeList(h)
}if(Z.isString(d)){d=Z.byId(d)
}return f(S(h)(d||Z.doc))
};
Z._filterQueryResult=function(i,j){var l=new Z.NodeList();
var h=(j)?R(V(j)[0]):function(){return true
};
for(var d=0,k;
k=i[d];
d++){if(h(k)){l.push(k)
}}return l
}
})()
}}});