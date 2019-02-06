dojo._xdResourceLoaded({depends:[["provide","aipo.widget.AddressbookDialog"],["provide","aipo.widget.AddressbookDialogUnderlay"],["require","aimluck.widget.Dialog"]],defineResource:function(B){if(!B._hasResource["aipo.widget.AddressbookDialog"]){B._hasResource["aipo.widget.AddressbookDialog"]=true;
B.provide("aipo.widget.AddressbookDialog");
B.provide("aipo.widget.AddressbookDialogUnderlay");
B.require("aimluck.widget.Dialog");
B.declare("aipo.webmail.widget.AddressbookDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class=addressbookDialogUnderlayWrapper id='${id}_underlay'><div class=addressbookDialogUnderlay dojoAttachPoint='node'></div></div>"});
B.declare("aipo.webmail.widget.AddressbookDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"addressbookDialog",templateString:"<div id='addressbookDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new B.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.webmail.widget.AddressbookDialogUnderlay();
var A=this.domNode;
this._fadeIn=B.fx.combine([B.fadeIn({node:A,duration:this.duration}),B.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:B.hitch(this._underlay,"show")})]);
this._fadeOut=B.fx.combine([B.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),B.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:B.hitch(this._underlay,"hide")})])
}})
}}});