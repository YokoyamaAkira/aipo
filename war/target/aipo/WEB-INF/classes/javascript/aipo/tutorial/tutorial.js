dojo.provide("aipo.tutorial");
aipo.tutorial.showDialog=function(A,C,D){var B=dijit.byId("imageDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#imageDialog").addClass("mb_dialog");
if(!B){B=new aipo.widget.TutorialDialog({widgetId:"imageDialog",_portlet_id:C,_callback:D},"imageDialog")
}else{B.setCallback(C,D)
}if(B){B.setHref(A);
B.show()
}};
aipo.tutorial.hideDialog=function(){var A=dijit.byId("imageDialog");
if(A){A.hide()
}};
aipo.tutorial.onLoadImage=function(B){var A=dojo.byId("imageDialog");
A.style.visibility="hidden";
A.style.width=1050+"px";
A.style.height=650+"px";
dijit.byId("imageDialog")._position();
A.style.visibility="visible"
};
aipo.tutorial.nextPage=function(){var A=dojo.byId("page_tutorial");
var B=A.value-0;
dojo.byId("popupImage"+B).style.display="none";
if(B==1){dojo.byId("tutorial_prev").style.display=""
}B++;
dojo.byId("popupImage"+B).style.display="";
if(B==3){dojo.byId("tutorial_next").style.display="none"
}A.value=B+""
};
aipo.tutorial.prevPage=function(){var A=dojo.byId("page_tutorial");
var B=A.value-0;
dojo.byId("popupImage"+B).style.display="none";
if(B==3){dojo.byId("tutorial_next").style.display=""
}B--;
dojo.byId("popupImage"+B).style.display="";
if(B==1){dojo.byId("tutorial_prev").style.display="none"
}A.value=B+""
};
dojo.provide("aipo.widget.TutorialDialog");
dojo.provide("aipo.widget.TutorialDialogUnderlay");
dojo.require("aimluck.widget.Dialog");
dojo.declare("aipo.widget.TutorialDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class='tutorialDialogUnderlayWrapper modalDialogUnderlayWrapper' id='${id}_underlay'><div class='tutorialDialogUnderlay modalDialogUnderlay' dojoAttachPoint='node'></div></div>"});
dojo.declare("aipo.widget.TutorialDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"tutorialDialog",templateString:"<div id='tutorialDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.widget.TutorialDialogUnderlay();
var A=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:A,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})]);
A.style.visibility="hidden"
},onLoad:function(){this._position();
aimluck.widget.Dialog.superclass.onLoad.call(this)
}});