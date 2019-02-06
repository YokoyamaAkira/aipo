dojo._xdResourceLoaded({depends:[["provide","aipo.fileupload.widget.FileuploadDialog"],["provide","aipo.fileupload.widget.FileuploadDialogUnderlay"],["require","aimluck.widget.Dialog"]],defineResource:function(B){if(!B._hasResource["aipo.widget.FileuploadDialog"]){B._hasResource["aipo.widget.FileuploadDialog"]=true;
B.provide("aipo.fileupload.widget.FileuploadDialog");
B.provide("aipo.fileupload.widget.FileuploadDialogUnderlay");
B.require("aimluck.widget.Dialog");
B.declare("aipo.fileupload.widget.FileuploadDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class=fileuploadDialogUnderlayWrapper id='${id}_underlay'><div class=fileuploadDialogUnderlay dojoAttachPoint='node'></div></div>"});
B.declare("aipo.fileupload.widget.FileuploadDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"fileuploadDialog",templateString:"<div id='fileuploadDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new B.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.fileupload.widget.FileuploadDialogUnderlay();
var A=this.domNode;
this._fadeIn=B.fx.combine([B.fadeIn({node:A,duration:this.duration}),B.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:B.hitch(this._underlay,"show")})]);
this._fadeOut=B.fx.combine([B.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),B.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:B.hitch(this._underlay,"hide")})])
}})
}}});