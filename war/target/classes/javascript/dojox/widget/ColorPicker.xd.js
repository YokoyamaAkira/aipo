dojo._xdResourceLoaded({depends:[["provide","dojox.widget.ColorPicker"],["require","dijit.form._FormWidget"],["require","dojo.dnd.move"],["require","dojo.fx"]],defineResource:function(A){if(!A._hasResource["dojox.widget.ColorPicker"]){A._hasResource["dojox.widget.ColorPicker"]=true;
A.provide("dojox.widget.ColorPicker");
A.experimental("dojox.widget.ColorPicker");
A.require("dijit.form._FormWidget");
A.require("dojo.dnd.move");
A.require("dojo.fx");
A.declare("dojox.widget.ColorPicker",dijit.form._FormWidget,{showRgb:true,showHsv:true,showHex:true,webSafe:true,animatePoint:true,slideDuration:250,_underlay:A.moduleUrl("dojox.widget","ColorPicker/images/underlay.png"),templateString:'<div class="dojoxColorPicker">\r\n\t<div class="dojoxColorPickerBox">\r\n\t\t<div dojoAttachPoint="cursorNode" class="dojoxColorPickerPoint"></div>\r\n\t\t<img dojoAttachPoint="colorUnderlay" dojoAttachEvent="onclick: _setPoint" class="dojoxColorPickerUnderlay" src="${_underlay}">\r\n\t</div>\r\n\t<div class="dojoxHuePicker">\r\n\t\t<div dojoAttachPoint="hueCursorNode" class="dojoxHuePickerPoint"></div>\r\n\t\t<div dojoAttachPoint="hueNode" class="dojoxHuePickerUnderlay" dojoAttachEvent="onclick: _setHuePoint"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="previewNode" class="dojoxColorPickerPreview"></div>\r\n\t<div dojoAttachPoint="safePreviewNode" class="dojoxColorPickerWebSafePreview"></div>\r\n\t<div class="dojoxColorPickerOptional">\r\n\t\t<div class="dijitInline dojoxColorPickerRgb" dojoAttachPoint="rgbNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>r</td><td><input dojoAttachPoint="Rval" size="1"></td></tr>\r\n\t\t\t<tr><td>g</td><td><input dojoAttachPoint="Gval" size="1"></td></tr>\r\n\t\t\t<tr><td>b</td><td><input dojoAttachPoint="Bval" size="1"></td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dijitInline dojoxColorPickerHsv" dojoAttachPoint="hsvNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>h</td><td><input dojoAttachPoint="Hval"size="1"> &deg;</td></tr>\r\n\t\t\t<tr><td>s</td><td><input dojoAttachPoint="Sval" size="1"> %</td></tr>\r\n\t\t\t<tr><td>v</td><td><input dojoAttachPoint="Vval" size="1"> %</td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dojoxColorPickerHex" dojoAttachPoint="hexNode">\t\r\n\t\t\thex: <input dojoAttachPoint="hexCode, focusNode" size="6" class="dojoxColorPickerHexCode">\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){if(A.isIE&&A.isIE<7){this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')";
this.colorUnderlay.src=A.moduleUrl("dojox.widget","FisheyeList/blank.gif").toString()
}if(!this.showRgb){this.rgbNode.style.display="none"
}if(!this.showHsv){this.hsvNode.style.display="none"
}if(!this.showHex){this.hexNode.style.display="none"
}if(!this.webSafe){this.safePreviewNode.style.display="none"
}},startup:function(){this._offset=0;
this._mover=new A.dnd.Moveable(this.cursorNode,{mover:A.dnd.boxConstrainedMover({t:0,l:0,w:150,h:150})});
this._hueMover=new A.dnd.Moveable(this.hueCursorNode,{mover:A.dnd.boxConstrainedMover({t:0,l:0,w:0,h:150})});
A.subscribe("/dnd/move/stop",A.hitch(this,"_clearTimer"));
A.subscribe("/dnd/move/start",A.hitch(this,"_setTimer"));
this._sc=(1/A.coords(this.colorUnderlay).w);
this._hueSc=(255/(A.coords(this.hueNode).h+this._offset));
this._updateColor()
},_setTimer:function(B){this._timer=setInterval(A.hitch(this,"_updateColor"),45)
},_clearTimer:function(B){clearInterval(this._timer);
this.onChange(this.value)
},_setHue:function(C){var B=A.colorFromArray(this._hsv2rgb(C,1,1,{inputRange:1})).toHex();
A.style(this.colorUnderlay,"backgroundColor",B)
},_updateColor:function(){var E=Math.round((255+(this._offset))-((A.style(this.hueCursorNode,"top")+this._offset)*this._hueSc));
var D=Math.round((A.style(this.cursorNode,"left")*this._sc)*100);
var B=Math.round(100-(A.style(this.cursorNode,"top")*this._sc)*100);
if(E!=this._hue){this._setHue(E)
}var C=this._hsv2rgb(E,D/100,B/100,{inputRange:1});
var F=(A.colorFromArray(C).toHex());
this.previewNode.style.backgroundColor=F;
if(this.webSafe){this.safePreviewNode.style.backgroundColor=F
}if(this.showHex){this.hexCode.value=F
}if(this.showRgb){this.Rval.value=C[0];
this.Gval.value=C[1];
this.Bval.value=C[2]
}if(this.showHsv){this.Hval.value=Math.round((E*360)/255);
this.Sval.value=D;
this.Vval.value=B
}this.value=F;
if(!this._timer&&!(arguments[1])){this.setValue(this.value);
this.onChange(this.value)
}},_setHuePoint:function(B){if(this.animatePoint){A.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:B.layerY,left:0,onEnd:A.hitch(this,"_updateColor")}).play()
}else{A.style(this.hueCursorNode,"top",(B.layerY)+"px");
this._updateColor(false)
}},_setPoint:function(B){if(this.animatePoint){A.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:B.layerY-this._offset,left:B.layerX-this._offset,onEnd:A.hitch(this,"_updateColor")}).play()
}else{A.style(this.cursorNode,"left",(B.layerX-this._offset)+"px");
A.style(this.cursorNode,"top",(B.layerY-this._offset)+"px");
this._updateColor(false)
}},_hsv2rgb:function(H,N,L,O){if(A.isArray(H)){if(N){O=N
}L=H[2]||0;
N=H[1]||0;
H=H[0]||0
}var E={inputRange:(O&&O.inputRange)?O.inputRange:[255,255,255],outputRange:(O&&O.outputRange)?O.outputRange:255};
switch(E.inputRange[0]){case 1:H=H*360;
break;
case 100:H=(H/100)*360;
break;
case 360:H=H;
break;
default:H=(H/255)*360
}if(H==360){H=0
}switch(E.inputRange[1]){case 100:N/=100;
break;
case 255:N/=255
}switch(E.inputRange[2]){case 100:L/=100;
break;
case 255:L/=255
}var B=null;
var I=null;
var K=null;
if(N==0){B=L;
I=L;
K=L
}else{var F=H/60;
var G=Math.floor(F);
var J=F-G;
var D=L*(1-N);
var C=L*(1-(N*J));
var M=L*(1-(N*(1-J)));
switch(G){case 0:B=L;
I=M;
K=D;
break;
case 1:B=C;
I=L;
K=D;
break;
case 2:B=D;
I=L;
K=M;
break;
case 3:B=D;
I=C;
K=L;
break;
case 4:B=M;
I=D;
K=L;
break;
case 5:B=L;
I=D;
K=C;
break
}}switch(E.outputRange){case 1:B=A.math.round(B,2);
I=A.math.round(I,2);
K=A.math.round(K,2);
break;
case 100:B=Math.round(B*100);
I=Math.round(I*100);
K=Math.round(K*100);
break;
default:B=Math.round(B*255);
I=Math.round(I*255);
K=Math.round(K*255)
}return[B,I,K]
}})
}}});