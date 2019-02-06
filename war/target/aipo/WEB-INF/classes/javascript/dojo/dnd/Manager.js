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
}},startDrag:function(A,D,C){this.source=A;
this.nodes=D;
this.copy=Boolean(C);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[A,D,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp")];
var B="dojoDnd"+(C?"Copy":"Move");
dojo.addClass(dojo.body(),B)
},canDrop:function(B){var A=this.target&&B;
if(this.canDropFlag!=A){this.canDropFlag=A;
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
},onMouseMove:function(A){var C=this.avatar;
if(C){dojo.dnd.autoScroll(A);
dojo.marginBox(C.node,{l:A.pageX+this.OFFSET_X,t:A.pageY+this.OFFSET_Y});
var B=Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(A)));
if(this.copy!=B){this._setCopyStatus(B)
}}},onMouseUp:function(B){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==B.button)){if(this.target&&this.canDropFlag){var A=[this.source,this.nodes,Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(B))),this.target];
dojo.publish("/dnd/drop/before",A);
dojo.publish("/dnd/drop",A)
}else{dojo.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(B){if(this.avatar){switch(B.keyCode){case dojo.keys.CTRL:var A=Boolean(this.source.copyState(true));
if(this.copy!=A){this._setCopyStatus(A)
}break;
case dojo.keys.ESCAPE:dojo.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(B){if(this.avatar&&B.keyCode==dojo.keys.CTRL){var A=Boolean(this.source.copyState(false));
if(this.copy!=A){this._setCopyStatus(A)
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