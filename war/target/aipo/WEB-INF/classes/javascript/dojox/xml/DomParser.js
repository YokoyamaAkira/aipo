if(!dojo._hasResource["dojox.xml.DomParser"]){dojo._hasResource["dojox.xml.DomParser"]=true;
dojo.provide("dojox.xml.DomParser");
dojox.xml.DomParser=new (function(){var B={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9};
var E=/<([^>\/\s+]*)([^>]*)>([^<]*)/g;
var K=/([^=]*)="([^"]*)"/g;
var W=/<!ENTITY\s+([^"]*)\s+"([^"]*)">/g;
var C=/<!\[CDATA\[([\u0001-\uFFFF]*?)\]\]>/g;
var P=/<!--([\u0001-\uFFFF]*?)-->/g;
var T=/^\s+|\s+$/g;
var S=/\s+/g;
var O=/\&gt;/g;
var G=/\&lt;/g;
var H=/\&quot;/g;
var D=/\&apos;/g;
var L=/\&amp;/g;
var M="_def_";
function F(){return new (function(){var Y={};
this.nodeType=B.DOCUMENT;
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
this.byName=this.getElementsByTagName=X;
this.byNameNS=this.getElementsByTagNameNS=V;
this.childrenByName=U
})()
}function X(a){function Y(c,b,d){dojo.forEach(c.childNodes,function(e){if(e.nodeType==B.ELEMENT){if(b=="*"){d.push(e)
}else{if(e.nodeName==b){d.push(e)
}}Y(e,b,d)
}})
}var Z=[];
Y(this,a,Z);
return Z
}function V(b,Y){function Z(e,c,d,f){dojo.forEach(e.childNodes,function(g){if(g.nodeType==B.ELEMENT){if(c=="*"&&g.ownerDocument._nsPaths[d]==g.namespace){f.push(g)
}else{if(g.localName==c&&g.ownerDocument._nsPaths[d]==g.namespace){f.push(g)
}}Z(g,c,d,f)
}})
}if(!Y){Y=M
}var a=[];
Z(this,b,Y,a);
return a
}function U(Y){var Z=[];
dojo.forEach(this.childNodes,function(a){if(a.nodeType==B.ELEMENT){if(Y=="*"){Z.push(a)
}else{if(a.nodeName==Y){Z.push(a)
}}}});
return Z
}function J(Z){for(var Y=0;
Y<this.attributes.length;
Y++){if(this.attributes[Y].nodeName==Z){return this.attributes[Y].nodeValue
}}return null
}function N(Z,Y){for(var a=0;
a<this.attributes.length;
a++){if(this.ownerDocument._nsPaths[Y]==this.attributes[a].namespace&&this.attributes[a].localName==Z){return this.attributes[a].nodeValue
}}return null
}function A(a,Y){var Z=null;
for(var b=0;
b<this.attributes.length;
b++){if(this.attributes[b].nodeName==a){Z=this.attributes[b].nodeValue;
this.attributes[b].nodeValue=Y;
break
}}if(a=="id"){if(Z!=null){this.ownerDocument._remove(Z)
}this.ownerDocument._add(this)
}}function I(Z,Y,b){for(var a=0;
a<this.attributes.length;
a++){if(this.ownerDocument._nsPaths[b]==this.attributes[a].namespace&&this.attributes[a].localName==Z){this.attributes[a].nodeValue=Y;
return 
}}}function Q(){var Y=this.parentNode;
if(Y){for(var Z=0;
Z<Y.childNodes.length;
Z++){if(Y.childNodes[Z]==this&&Z>0){return Y.childNodes[Z-1]
}}}return null
}function R(){var Y=this.parentNode;
if(Y){for(var Z=0;
Z<Y.childNodes.length;
Z++){if(Y.childNodes[Z]==this&&(Z+1)<Y.childNodes.length){return Y.childNodes[Z+1]
}}}return null
}this.parse=function(g){var i=F();
if(g==null){return i
}if(g.length==0){return i
}if(g.indexOf("<!ENTITY")>0){var a,f=[];
if(W.test(g)){W.lastIndex=0;
while((a=W.exec(g))!=null){f.push({entity:"&"+a[1].replace(T,"")+";",expression:a[2]})
}for(var k=0;
k<f.length;
k++){g=g.replace(new RegExp(f[k].entity,"g"),f[k].expression)
}}}var j=[],r;
while((r=C.exec(g))!=null){j.push(r[1])
}for(var k=0;
k<j.length;
k++){g=g.replace(j[k],k)
}var Y=[],s;
while((s=P.exec(g))!=null){Y.push(s[1])
}for(k=0;
k<Y.length;
k++){g=g.replace(Y[k],k)
}var o,b=i;
while((o=E.exec(g))!=null){if(o[2].charAt(0)=="/"){if(b.parentNode){b=b.parentNode
}continue
}if(o[1].length>0){if(o[1].charAt(0)=="?"){var q=o[1].substr(1);
var m=o[2].substr(0,o[2].length-2);
b.childNodes.push({nodeType:B.PROCESSING_INSTRUCTION,nodeName:q,nodeValue:m})
}else{if(o[1].charAt(0)=="!"){if(o[1].indexOf("![CDATA[")==0){var p=parseInt(o[1].replace("![CDATA[","").replace("]]",""));
b.childNodes.push({nodeType:B.CDATA_SECTION,nodeName:"#cdata-section",nodeValue:j[p]})
}else{if(o[1].substr(0,3)=="!--"){var p=parseInt(o[1].replace("!--","").replace("--",""));
b.childNodes.push({nodeType:B.COMMENT,nodeName:"#comment",nodeValue:Y[p]})
}}}else{var q=o[1].replace(T,"");
var e={nodeType:B.ELEMENT,nodeName:q,localName:q,namespace:M,ownerDocument:i,attributes:[],parentNode:null,childNodes:[]};
if(q.indexOf(":")>-1){var d=q.split(":");
e.namespace=d[0];
e.localName=d[1]
}e.byName=e.getElementsByTagName=X;
e.byNameNS=e.getElementsByTagNameNS=V;
e.childrenByName=U;
e.getAttribute=J;
e.getAttributeNS=N;
e.setAttribute=A;
e.setAttributeNS=I;
e.previous=e.previousSibling=Q;
e.next=e.nextSibling=R;
var h;
while((h=K.exec(o[2]))!=null){if(h.length>0){var q=h[1].replace(T,"");
var p=h[2].replace(S," ").replace(O,">").replace(G,"<").replace(D,"'").replace(H,'"').replace(L,"&");
if(q.indexOf("xmlns")==0){if(q.indexOf(":")>0){var n=q.split(":");
i.namespaces[n[1]]=p;
i._nsPaths[p]=n[1]
}else{i.namespaces[M]=p;
i._nsPaths[p]=M
}}else{var Z=q;
var n=M;
if(q.indexOf(":")>0){var d=q.split(":");
Z=d[1];
n=d[0]
}e.attributes.push({nodeType:B.ATTRIBUTE,nodeName:q,localName:Z,namespace:n,nodeValue:p});
if(Z=="id"){e.id=p
}}}}i._add(e);
var c=o[3].replace(T,"");
if(c.length>0){e.childNodes.push({nodeType:B.TEXT,nodeName:"#text",nodeValue:c.replace(S," ").replace(O,">").replace(G,"<").replace(D,"'").replace(H,'"').replace(L,"&")})
}if(b){b.childNodes.push(e);
e.parentNode=b;
if(o[2].charAt(o[2].length-1)!="/"){b=e
}}}}}}for(var k=0;
k<i.childNodes.length;
k++){var l=i.childNodes[k];
if(l.nodeType==B.ELEMENT){i.documentElement=l;
break
}}return i
}
})()
};