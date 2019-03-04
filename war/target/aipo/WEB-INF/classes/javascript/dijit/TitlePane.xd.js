dojo._xdResourceLoaded({depends:[["provide","dijit.TitlePane"],["require","dojo.fx"],["require","dijit._Templated"],["require","dijit.layout.ContentPane"]],defineResource:function(A){if(!A._hasResource["dijit.TitlePane"]){A._hasResource["dijit.TitlePane"]=true;
A.provide("dijit.TitlePane");
A.require("dojo.fx");
A.require("dijit._Templated");
A.require("dijit.layout.ContentPane");
A.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated],{title:"",open:true,duration:250,baseClass:"dijitTitlePane",templateString:'<div class="dijitTitlePane">\r\n\t<div dojoAttachEvent="onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus" tabindex="0"\r\n\t\t\twaiRole="button" class="dijitTitlePaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<div dojoAttachPoint="arrowNode" class="dijitInline dijitArrowNode"><span dojoAttachPoint="arrowNodeInner" class="dijitArrowNodeInner"></span></div>\r\n\t\t<div dojoAttachPoint="titleNode" class="dijitTitlePaneTextNode"></div>\r\n\t</div>\r\n\t<div class="dijitTitlePaneContentOuter" dojoAttachPoint="hideNode">\r\n\t\t<div class="dijitReset" dojoAttachPoint="wipeNode">\r\n\t\t\t<div class="dijitTitlePaneContentInner" dojoAttachPoint="containerNode" waiRole="region" tabindex="-1">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn\'t work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setTitle(this.title);
if(!this.open){this.hideNode.style.display=this.wipeNode.style.display="none"
}this._setCss();
A.setSelectable(this.titleNode,false);
this.inherited("postCreate",arguments);
dijit.setWaiState(this.containerNode,"labelledby",this.titleNode.id);
dijit.setWaiState(this.focusNode,"haspopup","true");
var C=this.hideNode,B=this.wipeNode;
this._wipeIn=A.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){C.style.display=""
}});
this._wipeOut=A.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){C.style.display="none"
}})
},setContent:function(B){if(this._wipeOut.status()=="playing"){this.inherited("setContent",arguments)
}else{if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}A.marginBox(this.wipeNode,{h:A.marginBox(this.wipeNode).h});
this.inherited("setContent",arguments);
this._wipeIn.play()
}},toggle:function(){A.forEach([this._wipeIn,this._wipeOut],function(B){if(B.status()=="playing"){B.stop()
}});
this[this.open?"_wipeOut":"_wipeIn"].play();
this.open=!this.open;
this._loadCheck();
this._setCss()
},_setCss:function(){var B=["dijitClosed","dijitOpen"];
var C=this.open;
A.removeClass(this.focusNode,B[!C+0]);
this.focusNode.className+=" "+B[C+0];
this.arrowNodeInner.innerHTML=this.open?"-":"+"
},_onTitleKey:function(B){if(B.keyCode==A.keys.ENTER||B.charCode==A.keys.SPACE){this.toggle()
}else{if(B.keyCode==A.keys.DOWN_ARROW){if(this.open){this.containerNode.focus();
B.preventDefault()
}}}},_handleFocus:function(B){A[(B.type=="focus"?"addClass":"removeClass")](this.focusNode,this.baseClass+"Focused")
},setTitle:function(B){this.titleNode.innerHTML=B
}})
}}});