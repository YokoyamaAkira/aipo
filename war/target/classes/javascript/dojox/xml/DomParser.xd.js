dojo._xdResourceLoaded({depends:[["provide","dojox.xml.DomParser"]],defineResource:function(A){if(!A._hasResource["dojox.xml.DomParser"]){A._hasResource["dojox.xml.DomParser"]=true;
A.provide("dojox.xml.DomParser");
dojox.xml.DomParser=new (function(){var J={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9};
var E=/<([^>\/\s+]*)([^>]*)>([^<]*)/g;
var L=/([^=]*)="([^"]*)"/g;
var X=/<!ENTITY\s+([^"]*)\s+"([^"]*)">/g;
var C=/<!\[CDATA\[([\u0001-\uFFFF]*?)\]\]>/g;
var Q=/<!--([\u0001-\uFFFF]*?)-->/g;
var U=/^\s+|\s+$/g;
var T=/\s+/g;
var P=/\&gt;/g;
var G=/\&lt;/g;
var H=/\&quot;/g;
var D=/\&apos;/g;
var M=/\&amp;/g;
var N="_def_";
function F(){return new (function(){var Z={};
this.nodeType=J.DOCUMENT;
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
this.byName=this.getElementsByTagName=Y;
this.byNameNS=this.getElementsByTagNameNS=W;
this.childrenByName=V
})()
}function Y(b){function Z(d,c,e){A.forEach(d.childNodes,function(f){if(f.nodeType==J.ELEMENT){if(c=="*"){e.push(f)
}else{if(f.nodeName==c){e.push(f)
}}Z(f,c,e)
}})
}var a=[];
Z(this,b,a);
return a
}function W(c,Z){function a(f,d,e,g){A.forEach(f.childNodes,function(h){if(h.nodeType==J.ELEMENT){if(d=="*"&&h.ownerDocument._nsPaths[e]==h.namespace){g.push(h)
}else{if(h.localName==d&&h.ownerDocument._nsPaths[e]==h.namespace){g.push(h)
}}a(h,d,e,g)
}})
}if(!Z){Z=N
}var b=[];
a(this,c,Z,b);
return b
}function V(a){var Z=[];
A.forEach(this.childNodes,function(b){if(b.nodeType==J.ELEMENT){if(a=="*"){Z.push(b)
}else{if(b.nodeName==a){Z.push(b)
}}}});
return Z
}function K(Z){for(var a=0;
a<this.attributes.length;
a++){if(this.attributes[a].nodeName==Z){return this.attributes[a].nodeValue
}}return null
}function O(Z,b){for(var a=0;
a<this.attributes.length;
a++){if(this.ownerDocument._nsPaths[b]==this.attributes[a].namespace&&this.attributes[a].localName==Z){return this.attributes[a].nodeValue
}}return null
}function B(b,Z){var a=null;
for(var c=0;
c<this.attributes.length;
c++){if(this.attributes[c].nodeName==b){a=this.attributes[c].nodeValue;
this.attributes[c].nodeValue=Z;
break
}}if(b=="id"){if(a!=null){this.ownerDocument._remove(a)
}this.ownerDocument._add(this)
}}function I(a,Z,c){for(var b=0;
b<this.attributes.length;
b++){if(this.ownerDocument._nsPaths[c]==this.attributes[b].namespace&&this.attributes[b].localName==a){this.attributes[b].nodeValue=Z;
return 
}}}function R(){var a=this.parentNode;
if(a){for(var Z=0;
Z<a.childNodes.length;
Z++){if(a.childNodes[Z]==this&&Z>0){return a.childNodes[Z-1]
}}}return null
}function S(){var a=this.parentNode;
if(a){for(var Z=0;
Z<a.childNodes.length;
Z++){if(a.childNodes[Z]==this&&(Z+1)<a.childNodes.length){return a.childNodes[Z+1]
}}}return null
}this.parse=function(i){var k=F();
if(i==null){return k
}if(i.length==0){return k
}if(i.indexOf("<!ENTITY")>0){var c,h=[];
if(X.test(i)){X.lastIndex=0;
while((c=X.exec(i))!=null){h.push({entity:"&"+c[1].replace(U,"")+";",expression:c[2]})
}for(var m=0;
m<h.length;
m++){i=i.replace(new RegExp(h[m].entity,"g"),h[m].expression)
}}}var l=[],t;
while((t=C.exec(i))!=null){l.push(t[1])
}for(var m=0;
m<l.length;
m++){i=i.replace(l[m],m)
}var a=[],Z;
while((Z=Q.exec(i))!=null){a.push(Z[1])
}for(m=0;
m<a.length;
m++){i=i.replace(a[m],m)
}var q,d=k;
while((q=E.exec(i))!=null){if(q[2].charAt(0)=="/"){if(d.parentNode){d=d.parentNode
}continue
}if(q[1].length>0){if(q[1].charAt(0)=="?"){var s=q[1].substr(1);
var o=q[2].substr(0,q[2].length-2);
d.childNodes.push({nodeType:J.PROCESSING_INSTRUCTION,nodeName:s,nodeValue:o})
}else{if(q[1].charAt(0)=="!"){if(q[1].indexOf("![CDATA[")==0){var r=parseInt(q[1].replace("![CDATA[","").replace("]]",""));
d.childNodes.push({nodeType:J.CDATA_SECTION,nodeName:"#cdata-section",nodeValue:l[r]})
}else{if(q[1].substr(0,3)=="!--"){var r=parseInt(q[1].replace("!--","").replace("--",""));
d.childNodes.push({nodeType:J.COMMENT,nodeName:"#comment",nodeValue:a[r]})
}}}else{var s=q[1].replace(U,"");
var g={nodeType:J.ELEMENT,nodeName:s,localName:s,namespace:N,ownerDocument:k,attributes:[],parentNode:null,childNodes:[]};
if(s.indexOf(":")>-1){var f=s.split(":");
g.namespace=f[0];
g.localName=f[1]
}g.byName=g.getElementsByTagName=Y;
g.byNameNS=g.getElementsByTagNameNS=W;
g.childrenByName=V;
g.getAttribute=K;
g.getAttributeNS=O;
g.setAttribute=B;
g.setAttributeNS=I;
g.previous=g.previousSibling=R;
g.next=g.nextSibling=S;
var j;
while((j=L.exec(q[2]))!=null){if(j.length>0){var s=j[1].replace(U,"");
var r=j[2].replace(T," ").replace(P,">").replace(G,"<").replace(D,"'").replace(H,'"').replace(M,"&");
if(s.indexOf("xmlns")==0){if(s.indexOf(":")>0){var p=s.split(":");
k.namespaces[p[1]]=r;
k._nsPaths[r]=p[1]
}else{k.namespaces[N]=r;
k._nsPaths[r]=N
}}else{var b=s;
var p=N;
if(s.indexOf(":")>0){var f=s.split(":");
b=f[1];
p=f[0]
}g.attributes.push({nodeType:J.ATTRIBUTE,nodeName:s,localName:b,namespace:p,nodeValue:r});
if(b=="id"){g.id=r
}}}}k._add(g);
var e=q[3].replace(U,"");
if(e.length>0){g.childNodes.push({nodeType:J.TEXT,nodeName:"#text",nodeValue:e.replace(T," ").replace(P,">").replace(G,"<").replace(D,"'").replace(H,'"').replace(M,"&")})
}if(d){d.childNodes.push(g);
g.parentNode=d;
if(q[2].charAt(q[2].length-1)!="/"){d=g
}}}}}}for(var m=0;
m<k.childNodes.length;
m++){var n=k.childNodes[m];
if(n.nodeType==J.ELEMENT){k.documentElement=n;
break
}}return k
}
})()
}}});