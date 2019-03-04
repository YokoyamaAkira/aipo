if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.colors");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo","colors",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":dojo.moduleUrl("dijit","templates/colors7x10.png"),"3x4":dojo.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){dojo.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var K=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=dojo.i18n.getLocalization("dojo","colors",this.lang);
var B=dojo.moduleUrl("dijit","templates/blank.gif");
var J=new dojo.Color(),G=this._paletteCoords;
for(var L=0;
L<K.length;
L++){for(var C=0;
C<K[L].length;
C++){var I=document.createElement("img");
I.src=B;
dojo.addClass(I,"dijitPaletteImg");
var D=K[L][C],A=J.setColor(dojo.Color.named[D]);
I.alt=this.colorNames[D];
I.color=A.toHex();
var F=I.style;
F.color=F.backgroundColor=I.color;
dojo.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(M){this.connect(I,"on"+M.toLowerCase(),"_onColor"+M)
},this);
this.divNode.appendChild(I);
F.top=G.topOffset+(L*G.cHeight)+"px";
F.left=G.leftOffset+(C*G.cWidth)+"px";
I.setAttribute("tabIndex","-1");
I.title=this.colorNames[D];
dijit.setWaiRole(I,"gridcell");
I.index=this._highlightNodes.length;
this._highlightNodes.push(I)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=K[0].length;
this._yDim=K.length;
var E={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var H in E){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:dojo.keys[H],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var M=E[H];
return function(N){this._navigateByKey(M,N)
}
}(),this.timeoutChangeRate,this.defaultTimeout))
}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus])
},onChange:function(A){},_onColorDijitclick:function(A){var B=A.currentTarget;
if(this._currentFocus!=B.index){this._currentFocus=B.index;
dijit.focus(B)
}this._selectColor(B);
dojo.stopEvent(A)
},_onColorMouseOut:function(A){dojo.removeClass(A.currentTarget,"dijitPaletteImgHighlight")
},_onColorMouseOver:function(A){var B=A.currentTarget;
B.tabIndex=0;
B.focus()
},_onColorBlur:function(A){dojo.removeClass(A.currentTarget,"dijitPaletteImgHighlight");
A.currentTarget.tabIndex=-1;
this._currentFocus=0;
this._highlightNodes[0].tabIndex=0
},_onColorFocus:function(A){if(this._currentFocus!=A.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1
}this._currentFocus=A.currentTarget.index;
dojo.addClass(A.currentTarget,"dijitPaletteImgHighlight")
},_selectColor:function(A){this.onChange(this.value=A.color)
},_navigateByKey:function(A,C){if(C==-1){return 
}var B=this._currentFocus+A;
if(B<this._highlightNodes.length&&B>-1){var D=this._highlightNodes[B];
D.tabIndex=0;
D.focus()
}}})
};