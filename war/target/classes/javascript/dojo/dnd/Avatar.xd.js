dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Avatar"],["require","dojo.dnd.common"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Avatar"]){A._hasResource["dojo.dnd.Avatar"]=true;
A.provide("dojo.dnd.Avatar");
A.require("dojo.dnd.common");
A.dnd.Avatar=function(B){this.manager=B;
this.construct()
};
A.extend(A.dnd.Avatar,{construct:function(){var C=A.doc.createElement("table");
C.className="dojoDndAvatar";
C.style.position="absolute";
C.style.zIndex=1999;
C.style.margin="0px";
var B=A.doc.createElement("tbody");
var H=A.doc.createElement("tr");
H.className="dojoDndAvatarHeader";
var I=A.doc.createElement("td");
I.innerHTML=this._generateText();
H.appendChild(I);
A.style(H,"opacity",0.9);
B.appendChild(H);
var D=Math.min(5,this.manager.nodes.length);
var G=this.manager.source;
for(var E=0;
E<D;
++E){H=A.doc.createElement("tr");
H.className="dojoDndAvatarItem";
I=A.doc.createElement("td");
var F=G.creator?F=G._normalizedCreator(G.getItem(this.manager.nodes[E].id).data,"avatar").node:F=this.manager.nodes[E].cloneNode(true);
F.id="";
I.appendChild(F);
H.appendChild(I);
A.style(H,"opacity",(9-E)/10);
B.appendChild(H)
}C.appendChild(B);
this.node=C
},destroy:function(){A._destroyElement(this.node);
this.node=false
},update:function(){A[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var C=this.node.getElementsByTagName("td");
for(var B=0;
B<C.length;
++B){var D=C[B];
if(A.hasClass(D.parentNode,"dojoDndAvatarHeader")){D.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
}}});