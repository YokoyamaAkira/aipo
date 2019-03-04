dojo._xdResourceLoaded({depends:[["provide","aipo.fileupload.widget.FileuploadDialog"],["provide","aipo.fileupload.widget.FileuploadDialogUnderlay"],["require","aimluck.widget.Dialog"]],defineResource:function(A){if(!A._hasResource["aipo.widget.FileuploadDialog"]){A._hasResource["aipo.widget.FileuploadDialog"]=true;
A.provide("aipo.fileupload.widget.FileuploadDialog");
A.provide("aipo.fileupload.widget.FileuploadDialogUnderlay");
A.require("aimluck.widget.Dialog");
A.declare("aipo.fileupload.widget.FileuploadDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class=fileuploadDialogUnderlayWrapper id='${id}_underlay'><div class=fileuploadDialogUnderlay dojoAttachPoint='node'></div></div>"});
A.declare("aipo.fileupload.widget.FileuploadDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"fileuploadDialog",templateString:"<div id='fileuploadDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new A.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.fileupload.widget.FileuploadDialogUnderlay();
var B=this.domNode;
this._fadeIn=A.fx.combine([A.fadeIn({node:B,duration:this.duration}),A.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:A.hitch(this._underlay,"show")})]);
this._fadeOut=A.fx.combine([A.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),A.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:A.hitch(this._underlay,"hide")})])
}})
}}});