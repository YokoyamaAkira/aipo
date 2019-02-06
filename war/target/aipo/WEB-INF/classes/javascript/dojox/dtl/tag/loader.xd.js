dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.loader"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.loader"]){A._hasResource["dojox.dtl.tag.loader"]=true;
A.provide("dojox.dtl.tag.loader");
A.require("dojox.dtl._base");
dojox.dtl.tag.loader.BlockNode=function(C,B){this.name=C;
this.nodelist=B
};
A.extend(dojox.dtl.tag.loader.BlockNode,{render:function(B,C){if(this.override){C=this.override.render(B,C,this);
this.rendered=this.override
}else{C=this.nodelist.render(B,C,this);
this.rendered=this.nodelist
}this.override=null;
return C
},unrender:function(B,C){return this.rendered.unrender(B,C)
},setOverride:function(B){if(!this.override){this.override=B
}},toString:function(){return"dojox.dtl.tag.loader.BlockNode"
}});
dojox.dtl.tag.loader.block=function(B,F){var E=F.split(" ");
var C=E[1];
B._blocks=B._blocks||{};
B._blocks[C]=B._blocks[C]||[];
B._blocks[C].push(C);
var D=B.parse(["endblock","endblock "+C]);
B.next();
return new dojox.dtl.tag.loader.BlockNode(C,D)
};
dojox.dtl.tag.loader.ExtendsNode=function(C,F,B,E,D){this.getTemplate=C;
this.nodelist=F;
this.shared=B;
this.parent=E;
this.key=D
};
A.extend(dojox.dtl.tag.loader.ExtendsNode,{parents:{},getParent:function(C){if(!this.parent){this.parent=C.get(this.key,false);
if(!this.parent){throw new Error("extends tag used a variable that did not resolve")
}if(typeof this.parent=="object"){if(this.parent.url){if(this.parent.shared){this.shared=true
}this.parent=this.parent.url.toString()
}else{this.parent=this.parent.toString()
}}if(this.parent&&this.parent.indexOf("shared:")==0){this.shared=true;
this.parent=this.parent.substring(7,B.length)
}}var B=this.parent;
if(!B){throw new Error("Invalid template name in 'extends' tag.")
}if(B.render){return B
}if(this.parents[B]){return this.parents[B]
}this.parent=this.getTemplate(dojox.dtl.text.getTemplateString(B));
if(this.shared){this.parents[B]=this.parent
}return this.parent
},render:function(K,D){var I=dojox.dtl;
var E=dojox.dtl.tag.loader;
var H=this.getParent(K);
var J=H.nodelist[0] instanceof this.constructor;
var G={};
for(var F=0,B;
B=H.nodelist.contents[F];
F++){if(B instanceof E.BlockNode){G[B.name]=B
}}for(var F=0,B;
B=this.nodelist.contents[F];
F++){if(B instanceof E.BlockNode){var C=G[B.name];
if(!C){if(J){H.nodelist[0].nodelist.append(B)
}}else{if(this.shared){C.setOverride(B.nodelist)
}else{C.nodelist=B.nodelist
}}}}this.rendered=H;
return H.render(K,D,this)
},unrender:function(B,C){return this.rendered.unrender(B,C,this)
},toString:function(){return"dojox.dtl.block.ExtendsNode"
}});
dojox.dtl.tag.loader.extends_=function(C,F){var E=F.split(" ");
var D=false;
var H=null;
var G=null;
if(E[1].charAt(0)=='"'||E[1].charAt(0)=="'"){H=E[1].substring(1,E[1].length-1)
}else{G=E[1]
}if(H&&H.indexOf("shared:")==0){D=true;
H=H.substring(7,H.length)
}var B=C.parse();
return new dojox.dtl.tag.loader.ExtendsNode(C.getTemplate,B,D,H,G)
}
}}});