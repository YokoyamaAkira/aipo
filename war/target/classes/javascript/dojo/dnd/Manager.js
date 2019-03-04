if(!dojo._hasResource["dojo.dnd.Manager"]){dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.autoscroll");
dojo.require("dojo.dnd.Avatar");
dojo.dnd.Manager=function(){this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[]
};
dojo.extend(dojo.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(A){if(this.avatar){this.target=(A&&A.targetState!="Disabled")?A:null;
this.avatar.update()
}dojo.publish("/dnd/source/over",[A])
},outSource:function(A){if(this.avatar){if(this.target==A){this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null])
}}else{dojo.publish("/dnd/source/over",[null])
}},startDrag:function(B,A,D){this.source=B;
this.nodes=A;
this.copy=Boolean(D);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[B,A,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp")];
var C="dojoDnd"+(D?"Copy":"Move");
dojo.addClass(dojo.body(),C)
},canDrop:function(A){var B=this.target&&A;
if(this.canDropFlag!=B){this.canDropFlag=B;
this.avatar.update()
}},stopDrag:function(){dojo.removeClass(dojo.body(),"dojoDndCopy");
dojo.removeClass(dojo.body(),"dojoDndMove");
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=null;
this.nodes=[]
},makeAvatar:function(){return new dojo.dnd.Avatar(this)
},updateAvatar:function(){this.avatar.update()
},onMouseMove:function(B){var A=this.avatar;
if(A){dojo.dnd.autoScroll(B);
dojo.marginBox(A.node,{l:B.pageX+this.OFFSET_X,t:B.pageY+this.OFFSET_Y});
var C=Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(B)));
if(this.copy!=C){this._setCopyStatus(C)
}}},onMouseUp:function(A){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==A.button)){if(this.target&&this.canDropFlag){var B=[this.source,this.nodes,Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(A))),this.target];
dojo.publish("/dnd/drop/before",B);
dojo.publish("/dnd/drop",B)
}else{dojo.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(A){if(this.avatar){switch(A.keyCode){case dojo.keys.CTRL:var B=Boolean(this.source.copyState(true));
if(this.copy!=B){this._setCopyStatus(B)
}break;
case dojo.keys.ESCAPE:dojo.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(A){if(this.avatar&&A.keyCode==dojo.keys.CTRL){var B=Boolean(this.source.copyState(false));
if(this.copy!=B){this._setCopyStatus(B)
}}},_setCopyStatus:function(A){this.copy=A;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.removeClass(dojo.body(),"dojoDnd"+(this.copy?"Move":"Copy"));
dojo.addClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"))
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){if(!dojo.dnd._manager){dojo.dnd._manager=new dojo.dnd.Manager()
}return dojo.dnd._manager
}
};