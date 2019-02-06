dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Menu"],["provide","aimluck.widget.Menuitem"],["provide","aimluck.widget.Menuseparator"],["provide","aimluck.widget.Menubar"],["provide","aimluck.widget.DropDownButton"],["require","dijit.layout.ContentPane"],["require","dijit.Menu"],["require","dijit.Toolbar"],["require","dijit.form.Button"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Menu"]){A._hasResource["aimluck.widget.Menu"]=true;
A.provide("aimluck.widget.Menu");
A.provide("aimluck.widget.Menuitem");
A.provide("aimluck.widget.Menuseparator");
A.provide("aimluck.widget.Menubar");
A.provide("aimluck.widget.DropDownButton");
A.require("dijit.layout.ContentPane");
A.require("dijit.Menu");
A.require("dijit.Toolbar");
A.require("dijit.form.Button");
A.declare("aimluck.widget.Menuitem",[dijit.MenuItem],{label:"",iconSrc:"",iconClass:"",url:"",templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem" nowrap="nowrap"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline moz-inline-box dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',onClick:function(){location.href=this.url
}});
A.declare("aimluck.widget.MenuButton",[dijit.form.Button],{label:"",iconSrc:"",iconClass:"",url:"",itemClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"><div class=\'dijitRight\'><button class="dijitStretch dijitButtonNode dijitButtonContents  ${itemClass}" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"><div class="dijitInline ${iconClass} menuItemIcon " dojoAttachPoint="iconNode"></div><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span></button></div></div>\n',onClick:function(){location.href=this.url
}});
A.declare("aimluck.widget.Menu",[dijit.Menu],{templateString:'<table class="popupMenu dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>'});
A.declare("aimluck.widget.Menuseparator",[dijit.MenuSeparator],{templateString:'<tr class="menuSeparator"><td colspan=4><div class="menuSeparatorTop"></div><div class="menuSeparatorBottom"></div></td></tr>'});
A.declare("aimluck.widget.ToolbarSeparator",[dijit.ToolbarSeparator],{templateString:'<div class="dijitInline moz-inline-box">&nbsp;｜&nbsp;</div>',postCreate:function(){A.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}});
A.declare("aimluck.widget.DropDownButton",[dijit.form.DropDownButton],{label:"",iconSrc:"",iconClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n'});
A.declare("aimluck.widget.ComboButton",[dijit.form.ComboButton],{url:"",itemClass:"",templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft moz-inline-box ${itemClass} \'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',onClick:function(){location.href=this.url
}});
A.declare("aimluck.widget.Menubar",[dijit.Toolbar],{selectedIndex:-1,templateString:'<div class="tundra"><div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div></div>',postCreate:function(){dijit.Toolbar.superclass.postCreate.apply(this,arguments);
this.makeMenu(this.items);
this.isShowingNow=true
},makeMenu:function(D){var B=this;
var C=0;
A.forEach(D,function(F){if(F.submenu){var H=new aimluck.widget.Menu({id:F.caption,style:"display: none;"});
A.forEach(F.submenu,function(I){if(I!=null){if(I.caption){H.addChild(new aimluck.widget.Menuitem({label:I.caption,url:I.url,iconClass:I.iconClass}))
}else{H.addChild(new aimluck.widget.Menuseparator())
}}});
var E="";
if(B.selectedIndex==parseInt(C)){E+="menuBarItemSelected"
}var G=new aimluck.widget.ComboButton({label:F.caption,iconClass:F.iconClass,dropDown:H,url:F.url,itemClass:E});
G.addChild(H);
B.addChild(G)
}else{if(F.url){var E="";
if(B.selectedIndex==C){E+="menuBarItemSelected"
}var G=new aimluck.widget.MenuButton({id:F.caption+"_Button"+C,label:F.caption,url:F.url,iconClass:F.iconClass,itemClass:E});
B.addChild(G)
}else{B.addChild(new aimluck.widget.ToolbarSeparator())
}}C++
})
}})
}}});