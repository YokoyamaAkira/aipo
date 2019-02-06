dojo.provide("aipo.tutorial");
aipo.tutorial.showDialog=function(D,B,C){var A=dijit.byId("imageDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#imageDialog").addClass("mb_dialog");
if(!A){A=new aipo.widget.TutorialDialog({widgetId:"imageDialog",_portlet_id:B,_callback:C},"imageDialog")
}else{A.setCallback(B,C)
}if(A){A.setHref(D);
A.show()
}};
aipo.tutorial.hideDialog=function(){var A=dijit.byId("imageDialog");
if(A){A.hide()
}};
aipo.tutorial.onLoadImage=function(A){var B=dojo.byId("imageDialog");
B.style.visibility="hidden";
B.style.width=1050+"px";
B.style.height=650+"px";
dijit.byId("imageDialog")._position();
B.style.visibility="visible"
};
aipo.tutorial.nextPage=function(){var B=dojo.byId("page_tutorial");
var A=B.value-0;
dojo.byId("popupImage"+A).style.display="none";
if(A==1){dojo.byId("tutorial_prev").style.display=""
}A++;
dojo.byId("popupImage"+A).style.display="";
if(A==3){dojo.byId("tutorial_next").style.display="none"
}B.value=A+""
};
aipo.tutorial.prevPage=function(){var B=dojo.byId("page_tutorial");
var A=B.value-0;
dojo.byId("popupImage"+A).style.display="none";
if(A==3){dojo.byId("tutorial_next").style.display=""
}A--;
dojo.byId("popupImage"+A).style.display="";
if(A==1){dojo.byId("tutorial_prev").style.display="none"
}B.value=A+""
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