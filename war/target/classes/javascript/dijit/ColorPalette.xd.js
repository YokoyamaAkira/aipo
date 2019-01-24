dojo._xdResourceLoaded({depends:[["provide","dijit.ColorPalette"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dojo.colors"],["require","dojo.i18n"],["requireLocalization","dojo","colors",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(A){if(!A._hasResource["dijit.ColorPalette"]){A._hasResource["dijit.ColorPalette"]=true;
A.provide("dijit.ColorPalette");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dojo.colors");
A.require("dojo.i18n");
A.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":A.moduleUrl("dijit","templates/colors7x10.png"),"3x4":A.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){A.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var L=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=A.i18n.getLocalization("dojo","colors",this.lang);
var C=A.moduleUrl("dijit","templates/blank.gif");
var K=new A.Color(),H=this._paletteCoords;
for(var M=0;
M<L.length;
M++){for(var D=0;
D<L[M].length;
D++){var J=document.createElement("img");
J.src=C;
A.addClass(J,"dijitPaletteImg");
var E=L[M][D],B=K.setColor(A.Color.named[E]);
J.alt=this.colorNames[E];
J.color=B.toHex();
var G=J.style;
G.color=G.backgroundColor=J.color;
A.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(N){this.connect(J,"on"+N.toLowerCase(),"_onColor"+N)
},this);
this.divNode.appendChild(J);
G.top=H.topOffset+(M*H.cHeight)+"px";
G.left=H.leftOffset+(D*H.cWidth)+"px";
J.setAttribute("tabIndex","-1");
J.title=this.colorNames[E];
dijit.setWaiRole(J,"gridcell");
J.index=this._highlightNodes.length;
this._highlightNodes.push(J)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=L[0].length;
this._yDim=L.length;
var F={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var I in F){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:A.keys[I],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var N=F[I];
return function(O){this._navigateByKey(N,O)
}
}(),this.timeoutChangeRate,this.defaultTimeout))
}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus])
},onChange:function(B){},_onColorDijitclick:function(B){var C=B.currentTarget;
if(this._currentFocus!=C.index){this._currentFocus=C.index;
dijit.focus(C)
}this._selectColor(C);
A.stopEvent(B)
},_onColorMouseOut:function(B){A.removeClass(B.currentTarget,"dijitPaletteImgHighlight")
},_onColorMouseOver:function(B){var C=B.currentTarget;
C.tabIndex=0;
C.focus()
},_onColorBlur:function(B){A.removeClass(B.currentTarget,"dijitPaletteImgHighlight");
B.currentTarget.tabIndex=-1;
this._currentFocus=0;
this._highlightNodes[0].tabIndex=0
},_onColorFocus:function(B){if(this._currentFocus!=B.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1
}this._currentFocus=B.currentTarget.index;
A.addClass(B.currentTarget,"dijitPaletteImgHighlight")
},_selectColor:function(B){this.onChange(this.value=B.color)
},_navigateByKey:function(B,D){if(D==-1){return 
}var C=this._currentFocus+B;
if(C<this._highlightNodes.length&&C>-1){var E=this._highlightNodes[C];
E.tabIndex=0;
E.focus()
}}})
}}});