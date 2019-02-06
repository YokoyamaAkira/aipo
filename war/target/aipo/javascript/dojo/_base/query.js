if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;
dojo.provide("dojo._base.query");
dojo.require("dojo._base.NodeList");
(function(){var Y=dojo;
var I=dojo.isIE?"children":"childNodes";
var U=function(m){if(m.charAt(m.length-1)==">"){m+=" *"
}m+=" ";
var g=function(x,AD){return Y.trim(m.slice(x,AD))
};
var v=[];
var n=-1;
var k=-1;
var t=-1;
var AC=-1;
var d=-1;
var j=-1;
var s=-1;
var y="";
var w="";
var l;
var r=0;
var h=m.length;
var i=null;
var AB=null;
var q=function(){if(s>=0){var x=(s==r)?null:g(s,r).toLowerCase();
i[(">~+".indexOf(x)<0)?"tag":"oper"]=x;
s=-1
}};
var AA=function(){if(j>=0){i.id=g(j,r).replace(/\\/g,"");
j=-1
}};
var p=function(){if(d>=0){i.classes.push(g(d+1,r).replace(/\\/g,""));
d=-1
}};
var u=function(){AA();
q();
p()
};
for(;
r<h,y=w,w=m.charAt(r);
r++){if(y=="\\"){continue
}if(!i){l=r;
i={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null};
s=r
}if(n>=0){if(w=="]"){if(!AB.attr){AB.attr=g(n+1,r)
}else{AB.matchFor=g((t||n+1),r)
}var z=AB.matchFor;
if(z){if((z.charAt(0)=='"')||(z.charAt(0)=="'")){AB.matchFor=z.substring(1,z.length-1)
}}i.attrs.push(AB);
AB=null;
n=t=-1
}else{if(w=="="){var o=("|~^$*".indexOf(y)>=0)?y:"";
AB.type=o+w;
AB.attr=g(n+1,r-o.length);
t=r+1
}}}else{if(k>=0){if(w==")"){if(AC>=0){AB.value=g(k+1,r)
}AC=k=-1
}}else{if(w=="#"){u();
j=r+1
}else{if(w=="."){u();
d=r
}else{if(w==":"){u();
AC=r
}else{if(w=="["){u();
n=r;
AB={}
}else{if(w=="("){if(AC>=0){AB={name:g(AC+1,r),value:null};
i.pseudos.push(AB)
}k=r
}else{if(w==" "&&y!=w){u();
if(AC>=0){i.pseudos.push({name:g(AC+1,r)})
}i.hasLoops=(i.pseudos.length||i.attrs.length||i.classes.length);
i.query=g(l,r);
i.tag=(i.oper)?null:(i.tag||"*");
v.push(i);
i=null
}}}}}}}}}return v
};
var V={"*=":function(d,g){return"[contains(@"+d+", '"+g+"')]"
},"^=":function(d,g){return"[starts-with(@"+d+", '"+g+"')]"
},"$=":function(d,g){return"[substring(@"+d+", string-length(@"+d+")-"+(g.length-1)+")='"+g+"']"
},"~=":function(d,g){return"[contains(concat(' ',@"+d+",' '), ' "+g+" ')]"
},"|=":function(d,g){return"[contains(concat(' ',@"+d+",' '), ' "+g+"-')]"
},"=":function(d,g){return"[@"+d+"='"+g+"']"
}};
var H=function(h,g,d,i){Y.forEach(g.attrs,function(j){var k;
if(j.type&&h[j.type]){k=h[j.type](j.attr,j.matchFor)
}else{if(j.attr.length){k=d(j.attr)
}}if(k){i(k)
}})
};
var B=function(j){var g=".";
var i=U(Y.trim(j));
while(i.length){var d=i.shift();
var h;
if(d.oper==">"){h="/";
d=i.shift()
}else{h="//"
}g+=h+d.tag;
if(d.id){g+="[@id='"+d.id+"'][1]"
}Y.forEach(d.classes,function(m){var k=m.length;
var l=" ";
if(m.charAt(k-1)=="*"){l="";
m=m.substr(0,k-1)
}g+="[contains(concat(' ',@class,' '), ' "+m+l+"')]"
});
H(V,d,function(k){return"[@"+k+"]"
},function(k){g+=k
})
}return g
};
var M={};
var N=function(i){if(M[i]){return M[i]
}var h=Y.doc;
var d=B(i);
var g=function(m){var l=[];
var k;
try{k=h.evaluate(d,m,null,XPathResult.ANY_TYPE,null)
}catch(n){console.debug("failure in exprssion:",d,"under:",m);
console.debug(n)
}var j=k.iterateNext();
while(j){l.push(j);
j=k.iterateNext()
}return l
};
return M[i]=g
};
var P={};
var D={};
var L=function(g,d){if(!g){return d
}if(!d){return g
}return function(){return g.apply(window,arguments)&&d.apply(window,arguments)
}
};
var K=function(l,r,n,q){var h=q+1;
var g=(r.length==h);
var d=r[q];
if(d.oper==">"){var o=l[I];
if(!o||!o.length){return 
}h++;
g=(r.length==h);
var j=Q(r[q+1]);
for(var p=0,i=o.length,k;
p<i,k=o[p];
p++){if(j(k)){if(g){n.push(k)
}else{K(k,r,n,h)
}}}}var m=G(d)(l);
if(g){while(m.length){n.push(m.shift())
}}else{while(m.length){K(m.shift(),r,n,h)
}}};
var O=function(i,h){var g=[];
var d=i.length-1,j;
while(j=i[d--]){K(j,h,g,0)
}return g
};
var Q=function(g){if(P[g.query]){return P[g.query]
}var d=null;
if(g.tag){if(g.tag=="*"){d=L(d,function(h){return(h.nodeType==1)
})
}else{d=L(d,function(h){return((h.nodeType==1)&&(g.tag==h.tagName.toLowerCase()))
})
}}if(g.id){d=L(d,function(h){return((h.nodeType==1)&&(h.id==g.id))
})
}if(g.hasLoops){d=L(d,E(g))
}return P[g.query]=d
};
var A=function(l){var j=l.parentNode;
var i=j.childNodes;
var g=-1;
var m=j.firstChild;
if(!m){return g
}var k=l.__cachedIndex;
var h=j.__cachedLength;
if(((typeof h=="number")&&(h!=i.length))||(typeof k!="number")){j.__cachedLength=i.length;
var d=1;
do{if(m===l){g=d
}if(m.nodeType==1){m.__cachedIndex=d;
d++
}m=m.nextSibling
}while(m)
}else{g=k
}return g
};
var a=0;
var J="";
var C=function(g,d){if(d=="class"){return g.className||J
}if(d=="for"){return g.htmlFor||J
}return g.getAttribute(d,2)||J
};
var T={"*=":function(d,g){return function(h){return(C(h,d).indexOf(g)>=0)
}
},"^=":function(d,g){return function(h){return(C(h,d).indexOf(g)==0)
}
},"$=":function(d,h){var g=" "+h;
return function(j){var i=" "+C(j,d);
return(i.lastIndexOf(h)==(i.length-h.length))
}
},"~=":function(d,h){var g=" "+h+" ";
return function(j){var i=" "+C(j,d)+" ";
return(i.indexOf(g)>=0)
}
},"|=":function(d,h){var g=" "+h+"-";
return function(j){var i=" "+(j.getAttribute(d,2)||"");
return((i==h)||(i.indexOf(g)==0))
}
},"=":function(d,g){return function(h){return(C(h,d)==g)
}
}};
var F={"first-child":function(d,g){return function(i){if(i.nodeType!=1){return false
}var h=i.previousSibling;
while(h&&(h.nodeType!=1)){h=h.previousSibling
}return(!h)
}
},"last-child":function(d,g){return function(h){if(h.nodeType!=1){return false
}var i=h.nextSibling;
while(i&&(i.nodeType!=1)){i=i.nextSibling
}return(!i)
}
},empty:function(d,g){return function(k){var l=k.childNodes;
var i=k.childNodes.length;
for(var h=i-1;
h>=0;
h--){var j=l[h].nodeType;
if((j==1)||(j==3)){return false
}}return true
}
},not:function(d,h){var g=Q(U(h)[0]);
return function(i){return(!g(i))
}
},"nth-child":function(h,l){var k=parseInt;
if(l=="odd"){return function(m){return(((A(m))%2)==1)
}
}else{if((l=="2n")||(l=="even")){return function(m){return((A(m)%2)==0)
}
}else{if(l.indexOf("0n+")==0){var j=k(l.substr(3));
return function(m){return(m.parentNode[I][j-1]===m)
}
}else{if((l.indexOf("n+")>0)&&(l.length>3)){var i=l.split("n+",2);
var g=k(i[0]);
var d=k(i[1]);
return function(m){return((A(m)%g)==d)
}
}else{if(l.indexOf("n")==-1){var j=k(l);
return function(m){return(A(m)==j)
}
}}}}}}};
var Z=(Y.isIE)?function(d){var g=d.toLowerCase();
return function(h){return h[d]||h[g]
}
}:function(d){return function(g){return(g&&g.getAttribute&&g.hasAttribute(d))
}
};
var E=function(g){var h=(D[g.query]||P[g.query]);
if(h){return h
}var d=null;
if(g.id){if(g.tag!="*"){d=L(d,function(i){return(i.tagName.toLowerCase()==g.tag)
})
}}Y.forEach(g.classes,function(k,j,i){var m=k.charAt(k.length-1)=="*";
if(m){k=k.substr(0,k.length-1)
}var l=new RegExp("(?:^|\\s)"+k+(m?".*":"")+"(?:\\s|$)");
d=L(d,function(n){return l.test(n.className)
});
d.count=j
});
Y.forEach(g.pseudos,function(i){if(F[i.name]){d=L(d,F[i.name](i.name,i.value))
}});
H(T,g,Z,function(i){d=L(d,i)
});
if(!d){d=function(){return true
}
}return D[g.query]=d
};
var f={};
var G=function(j,d){var g=f[j.query];
if(g){return g
}if(j.id&&!j.hasLoops&&!j.tag){return f[j.query]=function(l){return[Y.byId(j.id)]
}
}var i=E(j);
var k;
if(j.tag&&j.id&&!j.hasLoops){k=function(l){var m=Y.byId(j.id);
if(i(m)){return[m]
}}
}else{var h;
if(!j.hasLoops){k=function(m){var n=[];
var p,l=0,o=m.getElementsByTagName(j.tag);
while(p=o[l++]){n.push(p)
}return n
}
}else{k=function(m){var n=[];
var p,l=0,o=m.getElementsByTagName(j.tag);
while(p=o[l++]){if(i(p)){n.push(p)
}}return n
}
}}return f[j.query]=k
};
var W={};
var S={"*":Y.isIE?function(d){return d.all
}:function(d){return d.getElementsByTagName("*")
},">":function(g){var h=[];
var j,d=0,i=g[I];
while(j=i[d++]){if(j.nodeType==1){h.push(j)
}}return h
}};
var c=function(i){var h=U(Y.trim(i));
if(h.length==1){var g=G(h[0]);
g.nozip=true;
return g
}var d=function(j){var k=h.slice(0);
var l;
if(k[0].oper==">"){l=[j]
}else{l=G(k.shift())(j)
}return O(l,k)
};
return d
};
var b=((document.evaluate&&!Y.isSafari)?function(g){var d=g.split(" ");
if((document.evaluate)&&(g.indexOf(":")==-1)&&((true))){if(((d.length>2)&&(g.indexOf(">")==-1))||(d.length>3)||(g.indexOf("[")>=0)||((1==d.length)&&(0<=g.indexOf(".")))){return N(g)
}}return c(g)
}:c);
var R=function(d){if(S[d]){return S[d]
}if(0>d.indexOf(",")){return S[d]=b(d)
}else{var h=d.split(/\s*,\s*/);
var g=function(i){var k=0;
var j=[];
var l;
while(l=h[k++]){j=j.concat(b(l,l.indexOf(" "))(i))
}return j
};
return S[d]=g
}};
var X=0;
var e=function(g){if(g&&g.nozip){return Y.NodeList._wrap(g)
}var h=new Y.NodeList();
if(!g){return h
}if(g[0]){h.push(g[0])
}if(g.length<2){return h
}X++;
g[0]["_zipIdx"]=X;
for(var d=1,i;
i=g[d];
d++){if(g[d]["_zipIdx"]!=X){h.push(i)
}i._zipIdx=X
}return h
};
Y.query=function(g,d){if(g.constructor==Y.NodeList){return g
}if(!Y.isString(g)){return new Y.NodeList(g)
}if(Y.isString(d)){d=Y.byId(d)
}return e(R(g)(d||Y.doc))
};
Y._filterQueryResult=function(h,i){var k=new Y.NodeList();
var g=(i)?Q(U(i)[0]):function(){return true
};
for(var d=0,j;
j=h[d];
d++){if(g(j)){k.push(j)
}}return k
}
})()
};