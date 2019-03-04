if(!dojo._hasResource["dojo.dnd.Avatar"]){dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.require("dojo.dnd.common");
dojo.dnd.Avatar=function(A){this.manager=A;
this.construct()
};
dojo.extend(dojo.dnd.Avatar,{construct:function(){var B=dojo.doc.createElement("table");
B.className="dojoDndAvatar";
B.style.position="absolute";
B.style.zIndex=1999;
B.style.margin="0px";
var A=dojo.doc.createElement("tbody");
var G=dojo.doc.createElement("tr");
G.className="dojoDndAvatarHeader";
var H=dojo.doc.createElement("td");
H.innerHTML=this._generateText();
G.appendChild(H);
dojo.style(G,"opacity",0.9);
A.appendChild(G);
var C=Math.min(5,this.manager.nodes.length);
var F=this.manager.source;
for(var D=0;
D<C;
++D){G=dojo.doc.createElement("tr");
G.className="dojoDndAvatarItem";
H=dojo.doc.createElement("td");
var E=F.creator?E=F._normalizedCreator(F.getItem(this.manager.nodes[D].id).data,"avatar").node:E=this.manager.nodes[D].cloneNode(true);
E.id="";
H.appendChild(E);
G.appendChild(H);
dojo.style(G,"opacity",(9-D)/10);
A.appendChild(G)
}B.appendChild(A);
this.node=B
},destroy:function(){dojo._destroyElement(this.node);
this.node=false
},update:function(){dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var B=this.node.getElementsByTagName("td");
for(var A=0;
A<B.length;
++A){var C=B[A];
if(dojo.hasClass(C.parentNode,"dojoDndAvatarHeader")){C.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
};