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
}},startDrag:function(C,B,E){this.source=C;
this.nodes=B;
this.copy=Boolean(E);
this.avatar=this.makeAvatar();
A.body().appendChild(this.avatar.node);
A.publish("/dnd/start",[C,B,this.copy]);
this.events=[A.connect(A.doc,"onmousemove",this,"onMouseMove"),A.connect(A.doc,"onmouseup",this,"onMouseUp"),A.connect(A.doc,"onkeydown",this,"onKeyDown"),A.connect(A.doc,"onkeyup",this,"onKeyUp")];
var D="dojoDnd"+(E?"Copy":"Move");
A.addClass(A.body(),D)
},canDrop:function(B){var C=this.target&&B;
if(this.canDropFlag!=C){this.canDropFlag=C;
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
},onMouseMove:function(C){var B=this.avatar;
if(B){A.dnd.autoScroll(C);
A.marginBox(B.node,{l:C.pageX+this.OFFSET_X,t:C.pageY+this.OFFSET_Y});
var D=Boolean(this.source.copyState(A.dnd.getCopyKeyState(C)));
if(this.copy!=D){this._setCopyStatus(D)
}}},onMouseUp:function(B){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==B.button)){if(this.target&&this.canDropFlag){var C=[this.source,this.nodes,Boolean(this.source.copyState(A.dnd.getCopyKeyState(B))),this.target];
A.publish("/dnd/drop/before",C);
A.publish("/dnd/drop",C)
}else{A.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(B){if(this.avatar){switch(B.keyCode){case A.keys.CTRL:var C=Boolean(this.source.copyState(true));
if(this.copy!=C){this._setCopyStatus(C)
}break;
case A.keys.ESCAPE:A.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(B){if(this.avatar&&B.keyCode==A.keys.CTRL){var C=Boolean(this.source.copyState(false));
if(this.copy!=C){this._setCopyStatus(C)
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