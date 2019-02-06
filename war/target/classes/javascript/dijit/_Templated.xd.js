dojo._xdResourceLoaded({depends:[["provide","dijit._Templated"],["require","dijit._Widget"],["require","dojo.string"],["require","dojo.parser"]],defineResource:function(A){if(!A._hasResource["dijit._Templated"]){A._hasResource["dijit._Templated"]=true;
A.provide("dijit._Templated");
A.require("dijit._Widget");
A.require("dojo.string");
A.require("dojo.parser");
A.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var D=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var E;
if(A.isString(D)){var C=this.declaredClass,B=this;
var G=A.string.substitute(D,this,function(J,I){if(I.charAt(0)=="!"){J=B[I.substr(1)]
}if(typeof J=="undefined"){throw new Error(C+" template:"+I)
}if(!J){return""
}return I.charAt(0)=="!"?J:J.toString().replace(/"/g,"&quot;")
},this);
E=dijit._Templated._createNodesFromText(G)[0]
}else{E=D.cloneNode(true)
}this._attachTemplateNodes(E);
var F=this.srcNodeRef;
if(F&&F.parentNode){F.parentNode.replaceChild(E,F)
}this.domNode=E;
if(this.widgetsInTemplate){var H=A.parser.parse(E);
this._attachTemplateNodes(H,function(J,I){return J[I]
})
}this._fillContent(F)
},_fillContent:function(B){var C=this.containerNode;
if(B&&C){while(B.hasChildNodes()){C.appendChild(B.firstChild)
}}},_attachTemplateNodes:function(L,O){O=O||function(S,R){return S.getAttribute(R)
};
var K=A.isArray(L)?L:(L.all||L.getElementsByTagName("*"));
var C=A.isArray(L)?0:-1;
for(;
C<K.length;
C++){var E=(C==-1)?L:K[C];
if(this.widgetsInTemplate&&O(E,"dojoType")){continue
}var M=O(E,"dojoAttachPoint");
if(M){var D,G=M.split(/\s*,\s*/);
while(D=G.shift()){if(A.isArray(this[D])){this[D].push(E)
}else{this[D]=E
}}}var B=O(E,"dojoAttachEvent");
if(B){var J,H=B.split(/\s*,\s*/);
var N=A.trim;
while(J=H.shift()){if(J){var P=null;
if(J.indexOf(":")!=-1){var I=J.split(":");
J=N(I[0]);
P=N(I[1])
}else{J=N(J)
}if(!P){P=J
}this.connect(E,J,P)
}}}var Q=O(E,"waiRole");
if(Q){dijit.setWaiRole(E,Q)
}var F=O(E,"waiState");
if(F){A.forEach(F.split(/\s*,\s*/),function(S){if(S.indexOf("-")!=-1){var R=S.split("-");
dijit.setWaiState(E,R[0],R[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(E,F,C){var G=dijit._Templated._templateCache;
var B=F||E;
var D=G[B];
if(D){return D
}if(!F){F=dijit._Templated._sanitizeTemplateString(A._getText(E))
}F=A.string.trim(F);
if(F.match(/\$\{([^\}]+)\}/g)||C){return(G[B]=F)
}else{return(G[B]=dijit._Templated._createNodesFromText(F)[0])
}};
dijit._Templated._sanitizeTemplateString=function(C){if(C){C=C.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var B=C.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(B){C=B[1]
}}else{C=""
}return C
};
if(A.isIE){A.addOnUnload(function(){var C=dijit._Templated._templateCache;
for(var D in C){var B=C[D];
if(!isNaN(B.nodeType)){A._destroyElement(B)
}delete C[D]
}})
}(function(){var B={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var C;
dijit._Templated._createNodesFromText=function(J){if(!C){C=A.doc.createElement("div");
C.style.display="none";
A.body().appendChild(C)
}var H="none";
var F=J.replace(/^\s+/,"");
for(var I in B){var K=B[I];
if(K.re.test(F)){H=I;
J=K.pre+J+K.post;
break
}}C.innerHTML=J;
if(C.normalize){C.normalize()
}var E={cell:"tr",row:"tbody",section:"table"}[H];
var D=(typeof E!="undefined")?C.getElementsByTagName(E)[0]:C;
var G=[];
while(D.firstChild){G.push(D.removeChild(D.firstChild))
}C.innerHTML="";
return G
}
})();
A.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}}});