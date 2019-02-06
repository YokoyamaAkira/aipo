if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;
dojo.provide("dojo._base.query");
dojo.require("dojo._base.NodeList");
(function(){var e=dojo;
var D=dojo.isIE?"children":"childNodes";
var Y=function(p){if(p.charAt(p.length-1)==">"){p+=" *"
}p+=" ";
var g=function(AD,AC){return e.trim(p.slice(AD,AC))
};
var y=[];
var q=-1;
var l=-1;
var w=-1;
var o=-1;
var d=-1;
var j=-1;
var v=-1;
var AA="";
var z="";
var n;
var u=0;
var h=p.length;
var i=null;
var m=null;
var t=function(){if(v>=0){var AC=(v==u)?null:g(v,u).toLowerCase();
i[(">~+".indexOf(AC)<0)?"tag":"oper"]=AC;
v=-1
}};
var k=function(){if(j>=0){i.id=g(j,u).replace(/\\/g,"");
j=-1
}};
var s=function(){if(d>=0){i.classes.push(g(d+1,u).replace(/\\/g,""));
d=-1
}};
var x=function(){k();
t();
s()
};
for(;
u<h,AA=z,z=p.charAt(u);
u++){if(AA=="\\"){continue
}if(!i){n=u;
i={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null};
v=u
}if(q>=0){if(z=="]"){if(!m.attr){m.attr=g(q+1,u)
}else{m.matchFor=g((w||q+1),u)
}var AB=m.matchFor;
if(AB){if((AB.charAt(0)=='"')||(AB.charAt(0)=="'")){m.matchFor=AB.substring(1,AB.length-1)
}}i.attrs.push(m);
m=null;
q=w=-1
}else{if(z=="="){var r=("|~^$*".indexOf(AA)>=0)?AA:"";
m.type=r+z;
m.attr=g(q+1,u-r.length);
w=u+1
}}}else{if(l>=0){if(z==")"){if(o>=0){m.value=g(l+1,u)
}o=l=-1
}}else{if(z=="#"){x();
j=u+1
}else{if(z=="."){x();
d=u
}else{if(z==":"){x();
o=u
}else{if(z=="["){x();
q=u;
m={}
}else{if(z=="("){if(o>=0){m={name:g(o+1,u),value:null};
i.pseudos.push(m)
}l=u
}else{if(z==" "&&AA!=z){x();
if(o>=0){i.pseudos.push({name:g(o+1,u)})
}i.hasLoops=(i.pseudos.length||i.attrs.length||i.classes.length);
i.query=g(n,u);
i.tag=(i.oper)?null:(i.tag||"*");
y.push(i);
i=null
}}}}}}}}}return y
};
var a={"*=":function(g,d){return"[contains(@"+g+", '"+d+"')]"
},"^=":function(g,d){return"[starts-with(@"+g+", '"+d+"')]"
},"$=":function(g,d){return"[substring(@"+g+", string-length(@"+g+")-"+(d.length-1)+")='"+d+"']"
},"~=":function(g,d){return"[contains(concat(' ',@"+g+",' '), ' "+d+" ')]"
},"|=":function(g,d){return"[contains(concat(' ',@"+g+",' '), ' "+d+"-')]"
},"=":function(g,d){return"[@"+g+"='"+d+"']"
}};
var C=function(i,h,g,d){e.forEach(h.attrs,function(j){var k;
if(j.type&&i[j.type]){k=i[j.type](j.attr,j.matchFor)
}else{if(j.attr.length){k=g(j.attr)
}}if(k){d(k)
}})
};
var U=function(d){var h=".";
var j=Y(e.trim(d));
while(j.length){var g=j.shift();
var i;
if(g.oper==">"){i="/";
g=j.shift()
}else{i="//"
}h+=i+g.tag;
if(g.id){h+="[@id='"+g.id+"'][1]"
}e.forEach(g.classes,function(m){var k=m.length;
var l=" ";
if(m.charAt(k-1)=="*"){l="";
m=m.substr(0,k-1)
}h+="[contains(concat(' ',@class,' '), ' "+m+l+"')]"
});
C(a,g,function(k){return"[@"+k+"]"
},function(k){h+=k
})
}return h
};
var H={};
var K=function(d){if(H[d]){return H[d]
}var i=e.doc;
var g=U(d);
var h=function(n){var m=[];
var l;
try{l=i.evaluate(g,n,null,XPathResult.ANY_TYPE,null)
}catch(j){console.debug("failure in exprssion:",g,"under:",n);
console.debug(j)
}var k=l.iterateNext();
while(k){m.push(k);
k=l.iterateNext()
}return m
};
return H[d]=h
};
var O={};
var X={};
var G=function(d,g){if(!d){return g
}if(!g){return d
}return function(){return d.apply(window,arguments)&&g.apply(window,arguments)
}
};
var F=function(p,i,r,h){var l=h+1;
var k=(i.length==l);
var j=i[h];
if(j.oper==">"){var d=p[D];
if(!d||!d.length){return 
}l++;
k=(i.length==l);
var n=Q(i[h+1]);
for(var g=0,m=d.length,o;
g<m,o=d[g];
g++){if(n(o)){if(k){r.push(o)
}else{F(o,i,r,l)
}}}}var q=B(j)(p);
if(k){while(q.length){r.push(q.shift())
}}else{while(q.length){F(q.shift(),i,r,l)
}}};
var M=function(j,i){var h=[];
var g=j.length-1,d;
while(d=j[g--]){F(d,i,h,0)
}return h
};
var Q=function(d){if(O[d.query]){return O[d.query]
}var g=null;
if(d.tag){if(d.tag=="*"){g=G(g,function(h){return(h.nodeType==1)
})
}else{g=G(g,function(h){return((h.nodeType==1)&&(d.tag==h.tagName.toLowerCase()))
})
}}if(d.id){g=G(g,function(h){return((h.nodeType==1)&&(h.id==d.id))
})
}if(d.hasLoops){g=G(g,Z(d))
}return O[d.query]=g
};
var S=function(m){var k=m.parentNode;
var j=k.childNodes;
var h=-1;
var d=k.firstChild;
if(!d){return h
}var l=m.__cachedIndex;
var i=k.__cachedLength;
if(((typeof i=="number")&&(i!=j.length))||(typeof l!="number")){k.__cachedLength=j.length;
var g=1;
do{if(d===m){h=g
}if(d.nodeType==1){d.__cachedIndex=g;
g++
}d=d.nextSibling
}while(d)
}else{h=l
}return h
};
var I=0;
var E="";
var W=function(d,g){if(g=="class"){return d.className||E
}if(g=="for"){return d.htmlFor||E
}return d.getAttribute(g,2)||E
};
var V={"*=":function(g,d){return function(h){return(W(h,g).indexOf(d)>=0)
}
},"^=":function(g,d){return function(h){return(W(h,g).indexOf(d)==0)
}
},"$=":function(g,d){var h=" "+d;
return function(j){var i=" "+W(j,g);
return(i.lastIndexOf(d)==(i.length-d.length))
}
},"~=":function(g,d){var h=" "+d+" ";
return function(j){var i=" "+W(j,g)+" ";
return(i.indexOf(h)>=0)
}
},"|=":function(g,d){var h=" "+d+"-";
return function(j){var i=" "+(j.getAttribute(g,2)||"");
return((i==d)||(i.indexOf(h)==0))
}
},"=":function(g,d){return function(h){return(W(h,g)==d)
}
}};
var A={"first-child":function(g,d){return function(i){if(i.nodeType!=1){return false
}var h=i.previousSibling;
while(h&&(h.nodeType!=1)){h=h.previousSibling
}return(!h)
}
},"last-child":function(g,d){return function(h){if(h.nodeType!=1){return false
}var i=h.nextSibling;
while(i&&(i.nodeType!=1)){i=i.nextSibling
}return(!i)
}
},empty:function(g,d){return function(k){var l=k.childNodes;
var i=k.childNodes.length;
for(var h=i-1;
h>=0;
h--){var j=l[h].nodeType;
if((j==1)||(j==3)){return false
}}return true
}
},not:function(g,d){var h=Q(Y(d)[0]);
return function(i){return(!h(i))
}
},"nth-child":function(i,d){var l=parseInt;
if(d=="odd"){return function(m){return(((S(m))%2)==1)
}
}else{if((d=="2n")||(d=="even")){return function(m){return((S(m)%2)==0)
}
}else{if(d.indexOf("0n+")==0){var k=l(d.substr(3));
return function(m){return(m.parentNode[D][k-1]===m)
}
}else{if((d.indexOf("n+")>0)&&(d.length>3)){var j=d.split("n+",2);
var h=l(j[0]);
var g=l(j[1]);
return function(m){return((S(m)%h)==g)
}
}else{if(d.indexOf("n")==-1){var k=l(d);
return function(m){return(S(m)==k)
}
}}}}}}};
var f=(e.isIE)?function(g){var d=g.toLowerCase();
return function(h){return h[g]||h[d]
}
}:function(d){return function(g){return(g&&g.getAttribute&&g.hasAttribute(d))
}
};
var Z=function(h){var d=(X[h.query]||O[h.query]);
if(d){return d
}var g=null;
if(h.id){if(h.tag!="*"){g=G(g,function(i){return(i.tagName.toLowerCase()==h.tag)
})
}}e.forEach(h.classes,function(k,j,i){var m=k.charAt(k.length-1)=="*";
if(m){k=k.substr(0,k.length-1)
}var l=new RegExp("(?:^|\\s)"+k+(m?".*":"")+"(?:\\s|$)");
g=G(g,function(n){return l.test(n.className)
});
g.count=j
});
e.forEach(h.pseudos,function(i){if(A[i.name]){g=G(g,A[i.name](i.name,i.value))
}});
C(V,h,f,function(i){g=G(g,i)
});
if(!g){g=function(){return true
}
}return X[h.query]=g
};
var P={};
var B=function(k,g){var h=P[k.query];
if(h){return h
}if(k.id&&!k.hasLoops&&!k.tag){return P[k.query]=function(l){return[e.byId(k.id)]
}
}var j=Z(k);
var d;
if(k.tag&&k.id&&!k.hasLoops){d=function(l){var m=e.byId(k.id);
if(j(m)){return[m]
}}
}else{var i;
if(!k.hasLoops){d=function(p){var l=[];
var n,o=0,m=p.getElementsByTagName(k.tag);
while(n=m[o++]){l.push(n)
}return l
}
}else{d=function(p){var l=[];
var n,o=0,m=p.getElementsByTagName(k.tag);
while(n=m[o++]){if(j(n)){l.push(n)
}}return l
}
}}return P[k.query]=d
};
var b={};
var T={"*":e.isIE?function(d){return d.all
}:function(d){return d.getElementsByTagName("*")
},">":function(h){var i=[];
var d,g=0,j=h[D];
while(d=j[g++]){if(d.nodeType==1){i.push(d)
}}return i
}};
var L=function(d){var i=Y(e.trim(d));
if(i.length==1){var h=B(i[0]);
h.nozip=true;
return h
}var g=function(j){var k=i.slice(0);
var l;
if(k[0].oper==">"){l=[j]
}else{l=B(k.shift())(j)
}return M(l,k)
};
return g
};
var J=((document.evaluate&&!e.isSafari)?function(d){var g=d.split(" ");
if((document.evaluate)&&(d.indexOf(":")==-1)&&((true))){if(((g.length>2)&&(d.indexOf(">")==-1))||(g.length>3)||(d.indexOf("[")>=0)||((1==g.length)&&(0<=d.indexOf(".")))){return K(d)
}}return L(d)
}:L);
var R=function(g){if(T[g]){return T[g]
}if(0>g.indexOf(",")){return T[g]=J(g)
}else{var d=g.split(/\s*,\s*/);
var h=function(i){var k=0;
var j=[];
var l;
while(l=d[k++]){j=j.concat(J(l,l.indexOf(" "))(i))
}return j
};
return T[g]=h
}};
var c=0;
var N=function(h){if(h&&h.nozip){return e.NodeList._wrap(h)
}var i=new e.NodeList();
if(!h){return i
}if(h[0]){i.push(h[0])
}if(h.length<2){return i
}c++;
h[0]["_zipIdx"]=c;
for(var g=1,d;
d=h[g];
g++){if(h[g]["_zipIdx"]!=c){i.push(d)
}d._zipIdx=c
}return i
};
e.query=function(d,g){if(d.constructor==e.NodeList){return d
}if(!e.isString(d)){return new e.NodeList(d)
}if(e.isString(g)){g=e.byId(g)
}return N(R(d)(g||e.doc))
};
e._filterQueryResult=function(i,j){var d=new e.NodeList();
var h=(j)?Q(Y(j)[0]):function(){return true
};
for(var g=0,k;
k=i[g];
g++){if(h(k)){d.push(k)
}}return d
}
})()
};