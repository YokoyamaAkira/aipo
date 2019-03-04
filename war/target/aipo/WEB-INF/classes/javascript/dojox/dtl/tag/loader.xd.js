dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.tag.loader"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.tag.loader"]){A._hasResource["dojox.dtl.tag.loader"]=true;
A.provide("dojox.dtl.tag.loader");
A.require("dojox.dtl._base");
dojox.dtl.tag.loader.BlockNode=function(B,C){this.name=B;
this.nodelist=C
};
A.extend(dojox.dtl.tag.loader.BlockNode,{render:function(C,B){if(this.override){B=this.override.render(C,B,this);
this.rendered=this.override
}else{B=this.nodelist.render(C,B,this);
this.rendered=this.nodelist
}this.override=null;
return B
},unrender:function(C,B){return this.rendered.unrender(C,B)
},setOverride:function(B){if(!this.override){this.override=B
}},toString:function(){return"dojox.dtl.tag.loader.BlockNode"
}});
dojox.dtl.tag.loader.block=function(F,E){var D=E.split(" ");
var B=D[1];
F._blocks=F._blocks||{};
F._blocks[B]=F._blocks[B]||[];
F._blocks[B].push(B);
var C=F.parse(["endblock","endblock "+B]);
F.next();
return new dojox.dtl.tag.loader.BlockNode(B,C)
};
dojox.dtl.tag.loader.ExtendsNode=function(B,E,F,D,C){this.getTemplate=B;
this.nodelist=E;
this.shared=F;
this.parent=D;
this.key=C
};
A.extend(dojox.dtl.tag.loader.ExtendsNode,{parents:{},getParent:function(B){if(!this.parent){this.parent=B.get(this.key,false);
if(!this.parent){throw new Error("extends tag used a variable that did not resolve")
}if(typeof this.parent=="object"){if(this.parent.url){if(this.parent.shared){this.shared=true
}this.parent=this.parent.url.toString()
}else{this.parent=this.parent.toString()
}}if(this.parent&&this.parent.indexOf("shared:")==0){this.shared=true;
this.parent=this.parent.substring(7,C.length)
}}var C=this.parent;
if(!C){throw new Error("Invalid template name in 'extends' tag.")
}if(C.render){return C
}if(this.parents[C]){return this.parents[C]
}this.parent=this.getTemplate(dojox.dtl.text.getTemplateString(C));
if(this.shared){this.parents[C]=this.parent
}return this.parent
},render:function(C,F){var K=dojox.dtl;
var G=dojox.dtl.tag.loader;
var J=this.getParent(C);
var B=J.nodelist[0] instanceof this.constructor;
var I={};
for(var H=0,D;
D=J.nodelist.contents[H];
H++){if(D instanceof G.BlockNode){I[D.name]=D
}}for(var H=0,D;
D=this.nodelist.contents[H];
H++){if(D instanceof G.BlockNode){var E=I[D.name];
if(!E){if(B){J.nodelist[0].nodelist.append(D)
}}else{if(this.shared){E.setOverride(D.nodelist)
}else{E.nodelist=D.nodelist
}}}}this.rendered=J;
return J.render(C,F,this)
},unrender:function(C,B){return this.rendered.unrender(C,B,this)
},toString:function(){return"dojox.dtl.block.ExtendsNode"
}});
dojox.dtl.tag.loader.extends_=function(H,G){var F=G.split(" ");
var E=false;
var C=null;
var B=null;
if(F[1].charAt(0)=='"'||F[1].charAt(0)=="'"){C=F[1].substring(1,F[1].length-1)
}else{B=F[1]
}if(C&&C.indexOf("shared:")==0){E=true;
C=C.substring(7,C.length)
}var D=H.parse();
return new dojox.dtl.tag.loader.ExtendsNode(H.getTemplate,D,E,C,B)
}
}}});