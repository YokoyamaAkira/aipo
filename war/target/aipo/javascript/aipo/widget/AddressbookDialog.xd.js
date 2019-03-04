dojo._xdResourceLoaded({depends:[["provide","aipo.widget.AddressbookDialog"],["provide","aipo.widget.AddressbookDialogUnderlay"],["require","aimluck.widget.Dialog"]],defineResource:function(A){if(!A._hasResource["aipo.widget.AddressbookDialog"]){A._hasResource["aipo.widget.AddressbookDialog"]=true;
A.provide("aipo.widget.AddressbookDialog");
A.provide("aipo.widget.AddressbookDialogUnderlay");
A.require("aimluck.widget.Dialog");
A.declare("aipo.webmail.widget.AddressbookDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class=addressbookDialogUnderlayWrapper id='${id}_underlay'><div class=addressbookDialogUnderlay dojoAttachPoint='node'></div></div>"});
A.declare("aipo.webmail.widget.AddressbookDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"addressbookDialog",templateString:"<div id='addressbookDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new A.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.webmail.widget.AddressbookDialogUnderlay();
var B=this.domNode;
this._fadeIn=A.fx.combine([A.fadeIn({node:B,duration:this.duration}),A.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:A.hitch(this._underlay,"show")})]);
this._fadeOut=A.fx.combine([A.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),A.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:A.hitch(this._underlay,"hide")})])
}})
}}});