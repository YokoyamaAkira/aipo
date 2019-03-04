if(!dojo._hasResource["dojox.dtl.tag.loader"]){dojo._hasResource["dojox.dtl.tag.loader"]=true;
dojo.provide("dojox.dtl.tag.loader");
dojo.require("dojox.dtl._base");
dojox.dtl.tag.loader.BlockNode=function(A,B){this.name=A;
this.nodelist=B
};
dojo.extend(dojox.dtl.tag.loader.BlockNode,{render:function(B,A){if(this.override){A=this.override.render(B,A,this);
this.rendered=this.override
}else{A=this.nodelist.render(B,A,this);
this.rendered=this.nodelist
}this.override=null;
return A
},unrender:function(B,A){return this.rendered.unrender(B,A)
},setOverride:function(A){if(!this.override){this.override=A
}},toString:function(){return"dojox.dtl.tag.loader.BlockNode"
}});
dojox.dtl.tag.loader.block=function(E,D){var C=D.split(" ");
var A=C[1];
E._blocks=E._blocks||{};
E._blocks[A]=E._blocks[A]||[];
E._blocks[A].push(A);
var B=E.parse(["endblock","endblock "+A]);
E.next();
return new dojox.dtl.tag.loader.BlockNode(A,B)
};
dojox.dtl.tag.loader.ExtendsNode=function(A,D,E,C,B){this.getTemplate=A;
this.nodelist=D;
this.shared=E;
this.parent=C;
this.key=B
};
dojo.extend(dojox.dtl.tag.loader.ExtendsNode,{parents:{},getParent:function(A){if(!this.parent){this.parent=A.get(this.key,false);
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
},render:function(B,E){var J=dojox.dtl;
var F=dojox.dtl.tag.loader;
var I=this.getParent(B);
var A=I.nodelist[0] instanceof this.constructor;
var H={};
for(var G=0,C;
C=I.nodelist.contents[G];
G++){if(C instanceof F.BlockNode){H[C.name]=C
}}for(var G=0,C;
C=this.nodelist.contents[G];
G++){if(C instanceof F.BlockNode){var D=H[C.name];
if(!D){if(A){I.nodelist[0].nodelist.append(C)
}}else{if(this.shared){D.setOverride(C.nodelist)
}else{D.nodelist=C.nodelist
}}}}this.rendered=I;
return I.render(B,E,this)
},unrender:function(B,A){return this.rendered.unrender(B,A,this)
},toString:function(){return"dojox.dtl.block.ExtendsNode"
}});
dojox.dtl.tag.loader.extends_=function(G,F){var E=F.split(" ");
var D=false;
var B=null;
var A=null;
if(E[1].charAt(0)=='"'||E[1].charAt(0)=="'"){B=E[1].substring(1,E[1].length-1)
}else{A=E[1]
}if(B&&B.indexOf("shared:")==0){D=true;
B=B.substring(7,B.length)
}var C=G.parse();
return new dojox.dtl.tag.loader.ExtendsNode(G.getTemplate,C,D,B,A)
}
};