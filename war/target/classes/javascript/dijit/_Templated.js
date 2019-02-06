if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dojo.string");
dojo.require("dojo.parser");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var A=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var B;
if(dojo.isString(A)){var G=this.declaredClass,D=this;
var E=dojo.string.substitute(A,this,function(H,I){if(I.charAt(0)=="!"){H=D[I.substr(1)]
}if(typeof H=="undefined"){throw new Error(G+" template:"+I)
}if(!H){return""
}return I.charAt(0)=="!"?H:H.toString().replace(/"/g,"&quot;")
},this);
B=dijit._Templated._createNodesFromText(E)[0]
}else{B=A.cloneNode(true)
}this._attachTemplateNodes(B);
var C=this.srcNodeRef;
if(C&&C.parentNode){C.parentNode.replaceChild(B,C)
}this.domNode=B;
if(this.widgetsInTemplate){var F=dojo.parser.parse(B);
this._attachTemplateNodes(F,function(H,I){return H[I]
})
}this._fillContent(C)
},_fillContent:function(A){var B=this.containerNode;
if(A&&B){while(A.hasChildNodes()){B.appendChild(A.firstChild)
}}},_attachTemplateNodes:function(J,M){M=M||function(Q,R){return Q.getAttribute(R)
};
var H=dojo.isArray(J)?J:(J.all||J.getElementsByTagName("*"));
var A=dojo.isArray(J)?0:-1;
for(;
A<H.length;
A++){var I=(A==-1)?J:H[A];
if(this.widgetsInTemplate&&M(I,"dojoType")){continue
}var K=M(I,"dojoAttachPoint");
if(K){var B,D=K.split(/\s*,\s*/);
while(B=D.shift()){if(dojo.isArray(this[B])){this[B].push(I)
}else{this[B]=I
}}}var P=M(I,"dojoAttachEvent");
if(P){var G,E=P.split(/\s*,\s*/);
var L=dojo.trim;
while(G=E.shift()){if(G){var N=null;
if(G.indexOf(":")!=-1){var F=G.split(":");
G=L(F[0]);
N=L(F[1])
}else{G=L(G)
}if(!N){N=G
}this.connect(I,G,N)
}}}var O=M(I,"waiRole");
if(O){dijit.setWaiRole(I,O)
}var C=M(I,"waiState");
if(C){dojo.forEach(C.split(/\s*,\s*/),function(Q){if(Q.indexOf("-")!=-1){var R=Q.split("-");
dijit.setWaiState(I,R[0],R[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(B,C,E){var D=dijit._Templated._templateCache;
var F=C||B;
var A=D[F];
if(A){return A
}if(!C){C=dijit._Templated._sanitizeTemplateString(dojo._getText(B))
}C=dojo.string.trim(C);
if(C.match(/\$\{([^\}]+)\}/g)||E){return(D[F]=C)
}else{return(D[F]=dijit._Templated._createNodesFromText(C)[0])
}};
dijit._Templated._sanitizeTemplateString=function(B){if(B){B=B.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var A=B.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(A){B=A[1]
}}else{B=""
}return B
};
if(dojo.isIE){dojo.addOnUnload(function(){var C=dijit._Templated._templateCache;
for(var A in C){var B=C[A];
if(!isNaN(B.nodeType)){dojo._destroyElement(B)
}delete C[A]
}})
}(function(){var A={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var B;
dijit._Templated._createNodesFromText=function(D){if(!B){B=dojo.doc.createElement("div");
B.style.display="none";
dojo.body().appendChild(B)
}var J="none";
var G=D.replace(/^\s+/,"");
for(var C in A){var E=A[C];
if(E.re.test(G)){J=C;
D=E.pre+D+E.post;
break
}}B.innerHTML=D;
if(B.normalize){B.normalize()
}var F={cell:"tr",row:"tbody",section:"table"}[J];
var I=(typeof F!="undefined")?B.getElementsByTagName(F)[0]:B;
var H=[];
while(I.firstChild){H.push(I.removeChild(I.firstChild))
}B.innerHTML="";
return H
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
};