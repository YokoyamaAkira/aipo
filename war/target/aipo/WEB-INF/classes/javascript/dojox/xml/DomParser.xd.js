dojo._xdResourceLoaded({depends:[["provide","dojox.xml.DomParser"]],defineResource:function(A){if(!A._hasResource["dojox.xml.DomParser"]){A._hasResource["dojox.xml.DomParser"]=true;
A.provide("dojox.xml.DomParser");
dojox.xml.DomParser=new (function(){var Y={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9};
var D=/<([^>\/\s+]*)([^>]*)>([^<]*)/g;
var J=/([^=]*)="([^"]*)"/g;
var V=/<!ENTITY\s+([^"]*)\s+"([^"]*)">/g;
var B=/<!\[CDATA\[([\u0001-\uFFFF]*?)\]\]>/g;
var O=/<!--([\u0001-\uFFFF]*?)-->/g;
var S=/^\s+|\s+$/g;
var R=/\s+/g;
var N=/\&gt;/g;
var F=/\&lt;/g;
var G=/\&quot;/g;
var C=/\&apos;/g;
var K=/\&amp;/g;
var L="_def_";
function E(){return new (function(){var Z={};
this.nodeType=Y.DOCUMENT;
this.nodeName="#document";
this.namespaces={};
this._nsPaths={};
this.childNodes=[];
this.documentElement=null;
this._add=function(a){if(typeof (a.id)!="undefined"){Z[a.id]=a
}};
this._remove=function(a){if(Z[a]){delete Z[a]
}};
this.byId=this.getElementById=function(a){return keys[a]
};
this.byName=this.getElementsByTagName=W;
this.byNameNS=this.getElementsByTagNameNS=U;
this.childrenByName=T
})()
}function W(b){function c(e,d,a){A.forEach(e.childNodes,function(f){if(f.nodeType==Y.ELEMENT){if(d=="*"){a.push(f)
}else{if(f.nodeName==d){a.push(f)
}}c(f,d,a)
}})
}var Z=[];
c(this,b,Z);
return Z
}function U(b,c){function d(g,e,f,a){A.forEach(g.childNodes,function(h){if(h.nodeType==Y.ELEMENT){if(e=="*"&&h.ownerDocument._nsPaths[f]==h.namespace){a.push(h)
}else{if(h.localName==e&&h.ownerDocument._nsPaths[f]==h.namespace){a.push(h)
}}d(h,e,f,a)
}})
}if(!c){c=L
}var Z=[];
d(this,b,c,Z);
return Z
}function T(b){var Z=[];
A.forEach(this.childNodes,function(a){if(a.nodeType==Y.ELEMENT){if(b=="*"){Z.push(a)
}else{if(a.nodeName==b){Z.push(a)
}}}});
return Z
}function I(Z){for(var a=0;
a<this.attributes.length;
a++){if(this.attributes[a].nodeName==Z){return this.attributes[a].nodeValue
}}return null
}function M(Z,b){for(var a=0;
a<this.attributes.length;
a++){if(this.ownerDocument._nsPaths[b]==this.attributes[a].namespace&&this.attributes[a].localName==Z){return this.attributes[a].nodeValue
}}return null
}function X(a,c){var Z=null;
for(var b=0;
b<this.attributes.length;
b++){if(this.attributes[b].nodeName==a){Z=this.attributes[b].nodeValue;
this.attributes[b].nodeValue=c;
break
}}if(a=="id"){if(Z!=null){this.ownerDocument._remove(Z)
}this.ownerDocument._add(this)
}}function H(Z,c,b){for(var a=0;
a<this.attributes.length;
a++){if(this.ownerDocument._nsPaths[b]==this.attributes[a].namespace&&this.attributes[a].localName==Z){this.attributes[a].nodeValue=c;
return 
}}}function P(){var a=this.parentNode;
if(a){for(var Z=0;
Z<a.childNodes.length;
Z++){if(a.childNodes[Z]==this&&Z>0){return a.childNodes[Z-1]
}}}return null
}function Q(){var a=this.parentNode;
if(a){for(var Z=0;
Z<a.childNodes.length;
Z++){if(a.childNodes[Z]==this&&(Z+1)<a.childNodes.length){return a.childNodes[Z+1]
}}}return null
}this.parse=function(l){var n=E();
if(l==null){return n
}if(l.length==0){return n
}if(l.indexOf("<!ENTITY")>0){var d,k=[];
if(V.test(l)){V.lastIndex=0;
while((d=V.exec(l))!=null){k.push({entity:"&"+d[1].replace(S,"")+";",expression:d[2]})
}for(var q=0;
q<k.length;
q++){l=l.replace(new RegExp(k[q].entity,"g"),k[q].expression)
}}}var p=[],Z;
while((Z=B.exec(l))!=null){p.push(Z[1])
}for(var q=0;
q<p.length;
q++){l=l.replace(p[q],q)
}var b=[],a;
while((a=O.exec(l))!=null){b.push(a[1])
}for(q=0;
q<b.length;
q++){l=l.replace(b[q],q)
}var v,f=n;
while((v=D.exec(l))!=null){if(v[2].charAt(0)=="/"){if(f.parentNode){f=f.parentNode
}continue
}if(v[1].length>0){if(v[1].charAt(0)=="?"){var x=v[1].substr(1);
var s=v[2].substr(0,v[2].length-2);
f.childNodes.push({nodeType:Y.PROCESSING_INSTRUCTION,nodeName:x,nodeValue:s})
}else{if(v[1].charAt(0)=="!"){if(v[1].indexOf("![CDATA[")==0){var w=parseInt(v[1].replace("![CDATA[","").replace("]]",""));
f.childNodes.push({nodeType:Y.CDATA_SECTION,nodeName:"#cdata-section",nodeValue:p[w]})
}else{if(v[1].substr(0,3)=="!--"){var w=parseInt(v[1].replace("!--","").replace("--",""));
f.childNodes.push({nodeType:Y.COMMENT,nodeName:"#comment",nodeValue:b[w]})
}}}else{var x=v[1].replace(S,"");
var j={nodeType:Y.ELEMENT,nodeName:x,localName:x,namespace:L,ownerDocument:n,attributes:[],parentNode:null,childNodes:[]};
if(x.indexOf(":")>-1){var h=x.split(":");
j.namespace=h[0];
j.localName=h[1]
}j.byName=j.getElementsByTagName=W;
j.byNameNS=j.getElementsByTagNameNS=U;
j.childrenByName=T;
j.getAttribute=I;
j.getAttributeNS=M;
j.setAttribute=X;
j.setAttributeNS=H;
j.previous=j.previousSibling=P;
j.next=j.nextSibling=Q;
var m;
while((m=J.exec(v[2]))!=null){if(m.length>0){var x=m[1].replace(S,"");
var w=m[2].replace(R," ").replace(N,">").replace(F,"<").replace(C,"'").replace(G,'"').replace(K,"&");
if(x.indexOf("xmlns")==0){if(x.indexOf(":")>0){var u=x.split(":");
n.namespaces[u[1]]=w;
n._nsPaths[w]=u[1]
}else{n.namespaces[L]=w;
n._nsPaths[w]=L
}}else{var c=x;
var u=L;
if(x.indexOf(":")>0){var h=x.split(":");
c=h[1];
u=h[0]
}j.attributes.push({nodeType:Y.ATTRIBUTE,nodeName:x,localName:c,namespace:u,nodeValue:w});
if(c=="id"){j.id=w
}}}}n._add(j);
var g=v[3].replace(S,"");
if(g.length>0){j.childNodes.push({nodeType:Y.TEXT,nodeName:"#text",nodeValue:g.replace(R," ").replace(N,">").replace(F,"<").replace(C,"'").replace(G,'"').replace(K,"&")})
}if(f){f.childNodes.push(j);
j.parentNode=f;
if(v[2].charAt(v[2].length-1)!="/"){f=j
}}}}}}for(var q=0;
q<n.childNodes.length;
q++){var r=n.childNodes[q];
if(r.nodeType==Y.ELEMENT){n.documentElement=r;
break
}}return n
}
})()
}}});