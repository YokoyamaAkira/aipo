if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.colors");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo","colors",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":dojo.moduleUrl("dijit","templates/colors7x10.png"),"3x4":dojo.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){dojo.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var G=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=dojo.i18n.getLocalization("dojo","colors",this.lang);
var J=dojo.moduleUrl("dijit","templates/blank.gif");
var F=new dojo.Color(),C=this._paletteCoords;
for(var H=0;
H<G.length;
H++){for(var K=0;
K<G[H].length;
K++){var E=document.createElement("img");
E.src=J;
dojo.addClass(E,"dijitPaletteImg");
var L=G[H][K],I=F.setColor(dojo.Color.named[L]);
E.alt=this.colorNames[L];
E.color=I.toHex();
var B=E.style;
B.color=B.backgroundColor=E.color;
dojo.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(M){this.connect(E,"on"+M.toLowerCase(),"_onColor"+M)
},this);
this.divNode.appendChild(E);
B.top=C.topOffset+(H*C.cHeight)+"px";
B.left=C.leftOffset+(K*C.cWidth)+"px";
E.setAttribute("tabIndex","-1");
E.title=this.colorNames[L];
dijit.setWaiRole(E,"gridcell");
E.index=this._highlightNodes.length;
this._highlightNodes.push(E)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=G[0].length;
this._yDim=G.length;
var A={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var D in A){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:dojo.keys[D],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var M=A[D];
return function(N){this._navigateByKey(M,N)
}
}(),this.timeoutChangeRate,this.defaultTimeout))
}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus])
},onChange:function(A){},_onColorDijitclick:function(B){var A=B.currentTarget;
if(this._currentFocus!=A.index){this._currentFocus=A.index;
dijit.focus(A)
}this._selectColor(A);
dojo.stopEvent(B)
},_onColorMouseOut:function(A){dojo.removeClass(A.currentTarget,"dijitPaletteImgHighlight")
},_onColorMouseOver:function(B){var A=B.currentTarget;
A.tabIndex=0;
A.focus()
},_onColorBlur:function(A){dojo.removeClass(A.currentTarget,"dijitPaletteImgHighlight");
A.currentTarget.tabIndex=-1;
this._currentFocus=0;
this._highlightNodes[0].tabIndex=0
},_onColorFocus:function(A){if(this._currentFocus!=A.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1
}this._currentFocus=A.currentTarget.index;
dojo.addClass(A.currentTarget,"dijitPaletteImgHighlight")
},_selectColor:function(A){this.onChange(this.value=A.color)
},_navigateByKey:function(D,B){if(B==-1){return 
}var A=this._currentFocus+D;
if(A<this._highlightNodes.length&&A>-1){var C=this._highlightNodes[A];
C.tabIndex=0;
C.focus()
}}})
};