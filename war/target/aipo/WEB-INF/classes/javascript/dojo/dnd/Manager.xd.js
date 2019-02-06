dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.Manager"],["require","dojo.dnd.common"],["require","dojo.dnd.autoscroll"],["require","dojo.dnd.Avatar"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.Manager"]){A._hasResource["dojo.dnd.Manager"]=true;
A.provide("dojo.dnd.Manager");
A.require("dojo.dnd.common");
A.require("dojo.dnd.autoscroll");
A.require("dojo.dnd.Avatar");
A.dnd.Manager=function(){this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[]
};
A.extend(A.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(B){if(this.avatar){this.target=(B&&B.targetState!="Disabled")?B:null;
this.avatar.update()
}A.publish("/dnd/source/over",[B])
},outSource:function(B){if(this.avatar){if(this.target==B){this.target=null;
this.canDropFlag=false;
this.avatar.update();
A.publish("/dnd/source/over",[null])
}}else{A.publish("/dnd/source/over",[null])
}},startDrag:function(D,C,B){this.source=D;
this.nodes=C;
this.copy=Boolean(B);
this.avatar=this.makeAvatar();
A.body().appendChild(this.avatar.node);
A.publish("/dnd/start",[D,C,this.copy]);
this.events=[A.connect(A.doc,"onmousemove",this,"onMouseMove"),A.connect(A.doc,"onmouseup",this,"onMouseUp"),A.connect(A.doc,"onkeydown",this,"onKeyDown"),A.connect(A.doc,"onkeyup",this,"onKeyUp")];
var E="dojoDnd"+(B?"Copy":"Move");
A.addClass(A.body(),E)
},canDrop:function(C){var B=this.target&&C;
if(this.canDropFlag!=B){this.canDropFlag=B;
this.avatar.update()
}},stopDrag:function(){A.removeClass(A.body(),"dojoDndCopy");
A.removeClass(A.body(),"dojoDndMove");
A.forEach(this.events,A.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=null;
this.nodes=[]
},makeAvatar:function(){return new A.dnd.Avatar(this)
},updateAvatar:function(){this.avatar.update()
},onMouseMove:function(D){var C=this.avatar;
if(C){A.dnd.autoScroll(D);
A.marginBox(C.node,{l:D.pageX+this.OFFSET_X,t:D.pageY+this.OFFSET_Y});
var B=Boolean(this.source.copyState(A.dnd.getCopyKeyState(D)));
if(this.copy!=B){this._setCopyStatus(B)
}}},onMouseUp:function(C){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==C.button)){if(this.target&&this.canDropFlag){var B=[this.source,this.nodes,Boolean(this.source.copyState(A.dnd.getCopyKeyState(C))),this.target];
A.publish("/dnd/drop/before",B);
A.publish("/dnd/drop",B)
}else{A.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(C){if(this.avatar){switch(C.keyCode){case A.keys.CTRL:var B=Boolean(this.source.copyState(true));
if(this.copy!=B){this._setCopyStatus(B)
}break;
case A.keys.ESCAPE:A.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(C){if(this.avatar&&C.keyCode==A.keys.CTRL){var B=Boolean(this.source.copyState(false));
if(this.copy!=B){this._setCopyStatus(B)
}}},_setCopyStatus:function(B){this.copy=B;
this.source._markDndStatus(this.copy);
this.updateAvatar();
A.removeClass(A.body(),"dojoDnd"+(this.copy?"Move":"Copy"));
A.addClass(A.body(),"dojoDnd"+(this.copy?"Copy":"Move"))
}});
A.dnd._manager=null;
A.dnd.manager=function(){if(!A.dnd._manager){A.dnd._manager=new A.dnd.Manager()
}return A.dnd._manager
}
}}});