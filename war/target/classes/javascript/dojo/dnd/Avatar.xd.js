dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Avatar"],["require","dojo.dnd.common"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Avatar"]){A._hasResource["dojo.dnd.Avatar"]=true;
A.provide("dojo.dnd.Avatar");
A.require("dojo.dnd.common");
A.dnd.Avatar=function(B){this.manager=B;
this.construct()
};
A.extend(A.dnd.Avatar,{construct:function(){var G=A.doc.createElement("table");
G.className="dojoDndAvatar";
G.style.position="absolute";
G.style.zIndex=1999;
G.style.margin="0px";
var F=A.doc.createElement("tbody");
var E=A.doc.createElement("tr");
E.className="dojoDndAvatarHeader";
var C=A.doc.createElement("td");
C.innerHTML=this._generateText();
E.appendChild(C);
A.style(E,"opacity",0.9);
F.appendChild(E);
var H=Math.min(5,this.manager.nodes.length);
var D=this.manager.source;
for(var I=0;
I<H;
++I){E=A.doc.createElement("tr");
E.className="dojoDndAvatarItem";
C=A.doc.createElement("td");
var B=D.creator?B=D._normalizedCreator(D.getItem(this.manager.nodes[I].id).data,"avatar").node:B=this.manager.nodes[I].cloneNode(true);
B.id="";
C.appendChild(B);
E.appendChild(C);
A.style(E,"opacity",(9-I)/10);
F.appendChild(E)
}G.appendChild(F);
this.node=G
},destroy:function(){A._destroyElement(this.node);
this.node=false
},update:function(){A[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var D=this.node.getElementsByTagName("td");
for(var C=0;
C<D.length;
++C){var B=D[C];
if(A.hasClass(B.parentNode,"dojoDndAvatarHeader")){B.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
}}});