if(!dojo._hasResource["dojox.xml.DomParser"]){dojo._hasResource["dojox.xml.DomParser"]=true;
dojo.provide("dojox.xml.DomParser");
dojox.xml.DomParser=new (function(){var X={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9};
var C=/<([^>\/\s+]*)([^>]*)>([^<]*)/g;
var I=/([^=]*)="([^"]*)"/g;
var U=/<!ENTITY\s+([^"]*)\s+"([^"]*)">/g;
var A=/<!\[CDATA\[([\u0001-\uFFFF]*?)\]\]>/g;
var N=/<!--([\u0001-\uFFFF]*?)-->/g;
var R=/^\s+|\s+$/g;
var Q=/\s+/g;
var M=/\&gt;/g;
var E=/\&lt;/g;
var F=/\&quot;/g;
var B=/\&apos;/g;
var J=/\&amp;/g;
var K="_def_";
function D(){return new (function(){var Y={};
this.nodeType=X.DOCUMENT;
this.nodeName="#document";
this.namespaces={};
this._nsPaths={};
this.childNodes=[];
this.documentElement=null;
this._add=function(Z){if(typeof (Z.id)!="undefined"){Y[Z.id]=Z
}};
this._remove=function(Z){if(Y[Z]){delete Y[Z]
}};
this.byId=this.getElementById=function(Z){return keys[Z]
};
this.byName=this.getElementsByTagName=V;
this.byNameNS=this.getElementsByTagNameNS=T;
this.childrenByName=S
})()
}function V(Z){function b(d,c,a){dojo.forEach(d.childNodes,function(e){if(e.nodeType==X.ELEMENT){if(c=="*"){a.push(e)
}else{if(e.nodeName==c){a.push(e)
}}b(e,c,a)
}})
}var Y=[];
b(this,Z,Y);
return Y
}function T(Z,b){function c(f,d,e,a){dojo.forEach(f.childNodes,function(g){if(g.nodeType==X.ELEMENT){if(d=="*"&&g.ownerDocument._nsPaths[e]==g.namespace){a.push(g)
}else{if(g.localName==d&&g.ownerDocument._nsPaths[e]==g.namespace){a.push(g)
}}c(g,d,e,a)
}})
}if(!b){b=K
}var Y=[];
c(this,Z,b,Y);
return Y
}function S(Z){var Y=[];
dojo.forEach(this.childNodes,function(a){if(a.nodeType==X.ELEMENT){if(Z=="*"){Y.push(a)
}else{if(a.nodeName==Z){Y.push(a)
}}}});
return Y
}function H(Y){for(var Z=0;
Z<this.attributes.length;
Z++){if(this.attributes[Z].nodeName==Y){return this.attributes[Z].nodeValue
}}return null
}function L(Y,a){for(var Z=0;
Z<this.attributes.length;
Z++){if(this.ownerDocument._nsPaths[a]==this.attributes[Z].namespace&&this.attributes[Z].localName==Y){return this.attributes[Z].nodeValue
}}return null
}function W(Z,b){var Y=null;
for(var a=0;
a<this.attributes.length;
a++){if(this.attributes[a].nodeName==Z){Y=this.attributes[a].nodeValue;
this.attributes[a].nodeValue=b;
break
}}if(Z=="id"){if(Y!=null){this.ownerDocument._remove(Y)
}this.ownerDocument._add(this)
}}function G(Y,b,a){for(var Z=0;
Z<this.attributes.length;
Z++){if(this.ownerDocument._nsPaths[a]==this.attributes[Z].namespace&&this.attributes[Z].localName==Y){this.attributes[Z].nodeValue=b;
return 
}}}function O(){var Z=this.parentNode;
if(Z){for(var Y=0;
Y<Z.childNodes.length;
Y++){if(Z.childNodes[Y]==this&&Y>0){return Z.childNodes[Y-1]
}}}return null
}function P(){var Z=this.parentNode;
if(Z){for(var Y=0;
Y<Z.childNodes.length;
Y++){if(Z.childNodes[Y]==this&&(Y+1)<Z.childNodes.length){return Z.childNodes[Y+1]
}}}return null
}this.parse=function(k){var m=D();
if(k==null){return m
}if(k.length==0){return m
}if(k.indexOf("<!ENTITY")>0){var c,j=[];
if(U.test(k)){U.lastIndex=0;
while((c=U.exec(k))!=null){j.push({entity:"&"+c[1].replace(R,"")+";",expression:c[2]})
}for(var p=0;
p<j.length;
p++){k=k.replace(new RegExp(j[p].entity,"g"),j[p].expression)
}}}var n=[],Y;
while((Y=A.exec(k))!=null){n.push(Y[1])
}for(var p=0;
p<n.length;
p++){k=k.replace(n[p],p)
}var a=[],Z;
while((Z=N.exec(k))!=null){a.push(Z[1])
}for(p=0;
p<a.length;
p++){k=k.replace(a[p],p)
}var u,d=m;
while((u=C.exec(k))!=null){if(u[2].charAt(0)=="/"){if(d.parentNode){d=d.parentNode
}continue
}if(u[1].length>0){if(u[1].charAt(0)=="?"){var w=u[1].substr(1);
var r=u[2].substr(0,u[2].length-2);
d.childNodes.push({nodeType:X.PROCESSING_INSTRUCTION,nodeName:w,nodeValue:r})
}else{if(u[1].charAt(0)=="!"){if(u[1].indexOf("![CDATA[")==0){var v=parseInt(u[1].replace("![CDATA[","").replace("]]",""));
d.childNodes.push({nodeType:X.CDATA_SECTION,nodeName:"#cdata-section",nodeValue:n[v]})
}else{if(u[1].substr(0,3)=="!--"){var v=parseInt(u[1].replace("!--","").replace("--",""));
d.childNodes.push({nodeType:X.COMMENT,nodeName:"#comment",nodeValue:a[v]})
}}}else{var w=u[1].replace(R,"");
var h={nodeType:X.ELEMENT,nodeName:w,localName:w,namespace:K,ownerDocument:m,attributes:[],parentNode:null,childNodes:[]};
if(w.indexOf(":")>-1){var g=w.split(":");
h.namespace=g[0];
h.localName=g[1]
}h.byName=h.getElementsByTagName=V;
h.byNameNS=h.getElementsByTagNameNS=T;
h.childrenByName=S;
h.getAttribute=H;
h.getAttributeNS=L;
h.setAttribute=W;
h.setAttributeNS=G;
h.previous=h.previousSibling=O;
h.next=h.nextSibling=P;
var l;
while((l=I.exec(u[2]))!=null){if(l.length>0){var w=l[1].replace(R,"");
var v=l[2].replace(Q," ").replace(M,">").replace(E,"<").replace(B,"'").replace(F,'"').replace(J,"&");
if(w.indexOf("xmlns")==0){if(w.indexOf(":")>0){var s=w.split(":");
m.namespaces[s[1]]=v;
m._nsPaths[v]=s[1]
}else{m.namespaces[K]=v;
m._nsPaths[v]=K
}}else{var b=w;
var s=K;
if(w.indexOf(":")>0){var g=w.split(":");
b=g[1];
s=g[0]
}h.attributes.push({nodeType:X.ATTRIBUTE,nodeName:w,localName:b,namespace:s,nodeValue:v});
if(b=="id"){h.id=v
}}}}m._add(h);
var f=u[3].replace(R,"");
if(f.length>0){h.childNodes.push({nodeType:X.TEXT,nodeName:"#text",nodeValue:f.replace(Q," ").replace(M,">").replace(E,"<").replace(B,"'").replace(F,'"').replace(J,"&")})
}if(d){d.childNodes.push(h);
h.parentNode=d;
if(u[2].charAt(u[2].length-1)!="/"){d=h
}}}}}}for(var p=0;
p<m.childNodes.length;
p++){var q=m.childNodes[p];
if(q.nodeType==X.ELEMENT){m.documentElement=q;
break
}}return m
}
})()
};