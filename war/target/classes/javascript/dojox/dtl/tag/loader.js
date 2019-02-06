if(!dojo._hasResource["dojox.dtl.tag.loader"]){dojo._hasResource["dojox.dtl.tag.loader"]=true;
dojo.provide("dojox.dtl.tag.loader");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.loader.BlockNode=function(B,A){this.name=B;
this.nodelist=A
};
dojo.extend(dojox.dtl.tag.loader.BlockNode,{render:function(A,B){if(this.override){B=this.override.render(A,B,this);
this.rendered=this.override
}else{B=this.nodelist.render(A,B,this);
this.rendered=this.nodelist
}this.override=null;
return B
},unrender:function(A,B){return this.rendered.unrender(A,B)
},setOverride:function(A){if(!this.override){this.override=A
}},toString:function(){return"dojox.dtl.tag.loader.BlockNode"
}});
dojox.dtl.tag.loader.block=function(D,C){var B=C.split(" ");
var E=B[1];
D._blocks=D._blocks||{};
D._blocks[E]=D._blocks[E]||[];
D._blocks[E].push(E);
var A=D.parse(["endblock","endblock "+E]);
D.next();
return new dojox.dtl.tag.loader.BlockNode(E,A)
};
dojox.dtl.tag.loader.ExtendsNode=function(E,C,D,B,A){this.getTemplate=E;
this.nodelist=C;
this.shared=D;
this.parent=B;
this.key=A
};
dojo.extend(dojox.dtl.tag.loader.ExtendsNode,{parents:{},getParent:function(B){if(!this.parent){this.parent=B.get(this.key,false);
if(!this.parent){throw new Error("extends tag used a variable that did not resolve")
}if(typeof this.parent=="object"){if(this.parent.url){if(this.parent.shared){this.shared=true
}this.parent=this.parent.url.toString()
}else{this.parent=this.parent.toString()
}}if(this.parent&&this.parent.indexOf("shared:")==0){this.shared=true;
this.parent=this.parent.substring(7,A.length)
}}var A=this.parent;
if(!A){throw new Error("Invalid template name in 'extends' tag.")
}if(A.render){return A
}if(this.parents[A]){return this.parents[A]
}this.parent=this.getTemplate(dojox.dtl.text.getTemplateString(A));
if(this.shared){this.parents[A]=this.parent
}return this.parent
},render:function(H,A){var F=dojox.dtl;
var B=dojox.dtl.tag.loader;
var E=this.getParent(H);
var G=E.nodelist[0] instanceof this.constructor;
var D={};
for(var C=0,I;
I=E.nodelist.contents[C];
C++){if(I instanceof B.BlockNode){D[I.name]=I
}}for(var C=0,I;
I=this.nodelist.contents[C];
C++){if(I instanceof B.BlockNode){var J=D[I.name];
if(!J){if(G){E.nodelist[0].nodelist.append(I)
}}else{if(this.shared){J.setOverride(I.nodelist)
}else{J.nodelist=I.nodelist
}}}}this.rendered=E;
return E.render(H,A,this)
},unrender:function(A,B){return this.rendered.unrender(A,B,this)
},toString:function(){return"dojox.dtl.block.ExtendsNode"
}});
dojox.dtl.tag.loader.extends_=function(D,C){var B=C.split(" ");
var A=false;
var F=null;
var E=null;
if(B[1].charAt(0)=='"'||B[1].charAt(0)=="'"){F=B[1].substring(1,B[1].length-1)
}else{E=B[1]
}if(F&&F.indexOf("shared:")==0){A=true;
F=F.substring(7,F.length)
}var G=D.parse();
return new dojox.dtl.tag.loader.ExtendsNode(D.getTemplate,G,A,F,E)
}
};