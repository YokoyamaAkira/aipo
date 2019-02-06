if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dojo.string");
dojo.require("dojo.parser");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var D=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var E;
if(dojo.isString(D)){var C=this.declaredClass,G=this;
var A=dojo.string.substitute(D,this,function(I,H){if(H.charAt(0)=="!"){I=G[H.substr(1)]
}if(typeof I=="undefined"){throw new Error(C+" template:"+H)
}if(!I){return""
}return H.charAt(0)=="!"?I:I.toString().replace(/"/g,"&quot;")
},this);
E=dijit._Templated._createNodesFromText(A)[0]
}else{E=D.cloneNode(true)
}this._attachTemplateNodes(E);
var F=this.srcNodeRef;
if(F&&F.parentNode){F.parentNode.replaceChild(E,F)
}this.domNode=E;
if(this.widgetsInTemplate){var B=dojo.parser.parse(E);
this._attachTemplateNodes(B,function(I,H){return I[H]
})
}this._fillContent(F)
},_fillContent:function(B){var A=this.containerNode;
if(B&&A){while(B.hasChildNodes()){A.appendChild(B.firstChild)
}}},_attachTemplateNodes:function(D,G){G=G||function(R,Q){return R.getAttribute(Q)
};
var B=dojo.isArray(D)?D:(D.all||D.getElementsByTagName("*"));
var K=dojo.isArray(D)?0:-1;
for(;
K<B.length;
K++){var C=(K==-1)?D:B[K];
if(this.widgetsInTemplate&&G(C,"dojoType")){continue
}var E=G(C,"dojoAttachPoint");
if(E){var L,N=E.split(/\s*,\s*/);
while(L=N.shift()){if(dojo.isArray(this[L])){this[L].push(C)
}else{this[L]=C
}}}var J=G(C,"dojoAttachEvent");
if(J){var A,O=J.split(/\s*,\s*/);
var F=dojo.trim;
while(A=O.shift()){if(A){var H=null;
if(A.indexOf(":")!=-1){var P=A.split(":");
A=F(P[0]);
H=F(P[1])
}else{A=F(A)
}if(!H){H=A
}this.connect(C,A,H)
}}}var I=G(C,"waiRole");
if(I){dijit.setWaiRole(C,I)
}var M=G(C,"waiState");
if(M){dojo.forEach(M.split(/\s*,\s*/),function(R){if(R.indexOf("-")!=-1){var Q=R.split("-");
dijit.setWaiState(C,Q[0],Q[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(C,D,F){var E=dijit._Templated._templateCache;
var A=D||C;
var B=E[A];
if(B){return B
}if(!D){D=dijit._Templated._sanitizeTemplateString(dojo._getText(C))
}D=dojo.string.trim(D);
if(D.match(/\$\{([^\}]+)\}/g)||F){return(E[A]=D)
}else{return(E[A]=dijit._Templated._createNodesFromText(D)[0])
}};
dijit._Templated._sanitizeTemplateString=function(A){if(A){A=A.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var B=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(B){A=B[1]
}}else{A=""
}return A
};
if(dojo.isIE){dojo.addOnUnload(function(){var A=dijit._Templated._templateCache;
for(var B in A){var C=A[B];
if(!isNaN(C.nodeType)){dojo._destroyElement(C)
}delete A[B]
}})
}(function(){var B={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var A;
dijit._Templated._createNodesFromText=function(J){if(!A){A=dojo.doc.createElement("div");
A.style.display="none";
dojo.body().appendChild(A)
}var F="none";
var D=J.replace(/^\s+/,"");
for(var G in B){var H=B[G];
if(H.re.test(D)){F=G;
J=H.pre+J+H.post;
break
}}A.innerHTML=J;
if(A.normalize){A.normalize()
}var C={cell:"tr",row:"tbody",section:"table"}[F];
var I=(typeof C!="undefined")?A.getElementsByTagName(C)[0]:A;
var E=[];
while(I.firstChild){E.push(I.removeChild(I.firstChild))
}A.innerHTML="";
return E
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
};