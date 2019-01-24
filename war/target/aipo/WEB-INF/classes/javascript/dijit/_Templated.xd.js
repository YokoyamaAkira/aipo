dojo._xdResourceLoaded({depends:[["provide","dijit._Templated"],["require","dijit._Widget"],["require","dojo.string"],["require","dojo.parser"]],defineResource:function(A){if(!A._hasResource["dijit._Templated"]){A._hasResource["dijit._Templated"]=true;
A.provide("dijit._Templated");
A.require("dijit._Widget");
A.require("dojo.string");
A.require("dojo.parser");
A.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var E=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var F;
if(A.isString(E)){var D=this.declaredClass,H=this;
var B=A.string.substitute(E,this,function(J,I){if(I.charAt(0)=="!"){J=H[I.substr(1)]
}if(typeof J=="undefined"){throw new Error(D+" template:"+I)
}if(!J){return""
}return I.charAt(0)=="!"?J:J.toString().replace(/"/g,"&quot;")
},this);
F=dijit._Templated._createNodesFromText(B)[0]
}else{F=E.cloneNode(true)
}this._attachTemplateNodes(F);
var G=this.srcNodeRef;
if(G&&G.parentNode){G.parentNode.replaceChild(F,G)
}this.domNode=F;
if(this.widgetsInTemplate){var C=A.parser.parse(F);
this._attachTemplateNodes(C,function(J,I){return J[I]
})
}this._fillContent(G)
},_fillContent:function(C){var B=this.containerNode;
if(C&&B){while(C.hasChildNodes()){B.appendChild(C.firstChild)
}}},_attachTemplateNodes:function(E,H){H=H||function(S,R){return S.getAttribute(R)
};
var C=A.isArray(E)?E:(E.all||E.getElementsByTagName("*"));
var L=A.isArray(E)?0:-1;
for(;
L<C.length;
L++){var D=(L==-1)?E:C[L];
if(this.widgetsInTemplate&&H(D,"dojoType")){continue
}var F=H(D,"dojoAttachPoint");
if(F){var M,O=F.split(/\s*,\s*/);
while(M=O.shift()){if(A.isArray(this[M])){this[M].push(D)
}else{this[M]=D
}}}var K=H(D,"dojoAttachEvent");
if(K){var B,P=K.split(/\s*,\s*/);
var G=A.trim;
while(B=P.shift()){if(B){var I=null;
if(B.indexOf(":")!=-1){var Q=B.split(":");
B=G(Q[0]);
I=G(Q[1])
}else{B=G(B)
}if(!I){I=B
}this.connect(D,B,I)
}}}var J=H(D,"waiRole");
if(J){dijit.setWaiRole(D,J)
}var N=H(D,"waiState");
if(N){A.forEach(N.split(/\s*,\s*/),function(S){if(S.indexOf("-")!=-1){var R=S.split("-");
dijit.setWaiState(D,R[0],R[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(D,E,G){var F=dijit._Templated._templateCache;
var B=E||D;
var C=F[B];
if(C){return C
}if(!E){E=dijit._Templated._sanitizeTemplateString(A._getText(D))
}E=A.string.trim(E);
if(E.match(/\$\{([^\}]+)\}/g)||G){return(F[B]=E)
}else{return(F[B]=dijit._Templated._createNodesFromText(E)[0])
}};
dijit._Templated._sanitizeTemplateString=function(B){if(B){B=B.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var C=B.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(C){B=C[1]
}}else{B=""
}return B
};
if(A.isIE){A.addOnUnload(function(){var B=dijit._Templated._templateCache;
for(var C in B){var D=B[C];
if(!isNaN(D.nodeType)){A._destroyElement(D)
}delete B[C]
}})
}(function(){var C={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var B;
dijit._Templated._createNodesFromText=function(K){if(!B){B=A.doc.createElement("div");
B.style.display="none";
A.body().appendChild(B)
}var G="none";
var E=K.replace(/^\s+/,"");
for(var H in C){var I=C[H];
if(I.re.test(E)){G=H;
K=I.pre+K+I.post;
break
}}B.innerHTML=K;
if(B.normalize){B.normalize()
}var D={cell:"tr",row:"tbody",section:"table"}[G];
var J=(typeof D!="undefined")?B.getElementsByTagName(D)[0]:B;
var F=[];
while(J.firstChild){F.push(J.removeChild(J.firstChild))
}B.innerHTML="";
return F
}
})();
A.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}}});