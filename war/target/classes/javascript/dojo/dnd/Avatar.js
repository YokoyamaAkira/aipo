if(!dojo._hasResource["dojo.dnd.Avatar"]){dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.require("dojo.dnd.common");
dojo.dnd.Avatar=function(A){this.manager=A;
this.construct()
};
dojo.extend(dojo.dnd.Avatar,{construct:function(){var E=dojo.doc.createElement("table");
E.className="dojoDndAvatar";
E.style.position="absolute";
E.style.zIndex=1999;
E.style.margin="0px";
var D=dojo.doc.createElement("tbody");
var B=dojo.doc.createElement("tr");
B.className="dojoDndAvatarHeader";
var C=dojo.doc.createElement("td");
C.innerHTML=this._generateText();
B.appendChild(C);
dojo.style(B,"opacity",0.9);
D.appendChild(B);
var F=Math.min(5,this.manager.nodes.length);
var A=this.manager.source;
for(var G=0;
G<F;
++G){B=dojo.doc.createElement("tr");
B.className="dojoDndAvatarItem";
C=dojo.doc.createElement("td");
var H=A.creator?H=A._normalizedCreator(A.getItem(this.manager.nodes[G].id).data,"avatar").node:H=this.manager.nodes[G].cloneNode(true);
H.id="";
C.appendChild(H);
B.appendChild(C);
dojo.style(B,"opacity",(9-G)/10);
D.appendChild(B)
}E.appendChild(D);
this.node=E
},destroy:function(){dojo._destroyElement(this.node);
this.node=false
},update:function(){dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var A=this.node.getElementsByTagName("td");
for(var C=0;
C<A.length;
++C){var B=A[C];
if(dojo.hasClass(B.parentNode,"dojoDndAvatarHeader")){B.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
};