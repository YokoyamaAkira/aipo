if(!dojo._hasResource["aipo.widget.FileuploadViewDialog"]){dojo._hasResource["aipo.widget.FileuploadViewDialog"]=true;
dojo.provide("aipo.fileupload.widget.FileuploadViewDialog");
dojo.provide("aipo.fileupload.widget.FileuploadViewDialogUnderlay");
dojo.require("aimluck.widget.Dialog");
dojo.declare("aipo.fileupload.widget.FileuploadViewDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class='fileuploadViewDialogUnderlayWrapper modalDialogUnderlayWrapper' id='${id}_underlay'><div class='fileuploadViewDialogUnderlay modalDialogUnderlay' dojoAttachPoint='node'></div></div>"});
dojo.declare("aipo.fileupload.widget.FileuploadViewDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"auiPopup imgPopup fileuploadViewDialog",templateString:"<div id='fileuploadViewDialog' class='${templateCssString}' dojoattachpoint='wrapper' onclick='aipo.fileupload.hideImageDialog()'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.fileupload.widget.FileuploadViewDialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},onLoad:function(){this._position();
aimluck.widget.Dialog.superclass.onLoad.call(this)
}})
};