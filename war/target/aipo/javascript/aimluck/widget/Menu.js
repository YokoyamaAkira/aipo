if(!dojo._hasResource["aimluck.widget.Menu"]){dojo._hasResource["aimluck.widget.Menu"]=true;
dojo.provide("aimluck.widget.Menu");
dojo.provide("aimluck.widget.Menuitem");
dojo.provide("aimluck.widget.Menuseparator");
dojo.provide("aimluck.widget.Menubar");
dojo.provide("aimluck.widget.DropDownButton");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.Menu");
dojo.require("dijit.Toolbar");
dojo.require("dijit.form.Button");
dojo.declare("aimluck.widget.Menuitem",[dijit.MenuItem],{label:"",iconSrc:"",iconClass:"",url:"",templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem" nowrap="nowrap"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline moz-inline-box dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',onClick:function(){location.href=this.url
}});
dojo.declare("aimluck.widget.MenuButton",[dijit.form.Button],{label:"",iconSrc:"",iconClass:"",url:"",itemClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"><div class=\'dijitRight\'><button class="dijitStretch dijitButtonNode dijitButtonContents  ${itemClass}" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"><div class="dijitInline ${iconClass} menuItemIcon " dojoAttachPoint="iconNode"></div><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span></button></div></div>\n',onClick:function(){location.href=this.url
}});
dojo.declare("aimluck.widget.Menu",[dijit.Menu],{templateString:'<table class="popupMenu dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>'});
dojo.declare("aimluck.widget.Menuseparator",[dijit.MenuSeparator],{templateString:'<tr class="menuSeparator"><td colspan=4><div class="menuSeparatorTop"></div><div class="menuSeparatorBottom"></div></td></tr>'});
dojo.declare("aimluck.widget.ToolbarSeparator",[dijit.ToolbarSeparator],{templateString:'<div class="dijitInline moz-inline-box">&nbsp;｜&nbsp;</div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}});
dojo.declare("aimluck.widget.DropDownButton",[dijit.form.DropDownButton],{label:"",iconSrc:"",iconClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n'});
dojo.declare("aimluck.widget.ComboButton",[dijit.form.ComboButton],{url:"",itemClass:"",templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft moz-inline-box ${itemClass} \'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',onClick:function(){location.href=this.url
}});
dojo.declare("aimluck.widget.Menubar",[dijit.Toolbar],{selectedIndex:-1,templateString:'<div class="tundra"><div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div></div>',postCreate:function(){dijit.Toolbar.superclass.postCreate.apply(this,arguments);
this.makeMenu(this.items);
this.isShowingNow=true
},makeMenu:function(B){var C=this;
var A=0;
dojo.forEach(B,function(E){if(E.submenu){var G=new aimluck.widget.Menu({id:E.caption,style:"display: none;"});
dojo.forEach(E.submenu,function(H){if(H!=null){if(H.caption){G.addChild(new aimluck.widget.Menuitem({label:H.caption,url:H.url,iconClass:H.iconClass}))
}else{G.addChild(new aimluck.widget.Menuseparator())
}}});
var D="";
if(C.selectedIndex==parseInt(A)){D+="menuBarItemSelected"
}var F=new aimluck.widget.ComboButton({label:E.caption,iconClass:E.iconClass,dropDown:G,url:E.url,itemClass:D});
F.addChild(G);
C.addChild(F)
}else{if(E.url){var D="";
if(C.selectedIndex==A){D+="menuBarItemSelected"
}var F=new aimluck.widget.MenuButton({id:E.caption+"_Button"+A,label:E.caption,url:E.url,iconClass:E.iconClass,itemClass:D});
C.addChild(F)
}else{C.addChild(new aimluck.widget.ToolbarSeparator())
}}A++
})
}})
};