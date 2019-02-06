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
},_setHue:function(B){var C=A.colorFromArray(this._hsv2rgb(B,1,1,{inputRange:1})).toHex();
A.style(this.colorUnderlay,"backgroundColor",C)
},_updateColor:function(){var F=Math.round((255+(this._offset))-((A.style(this.hueCursorNode,"top")+this._offset)*this._hueSc));
var E=Math.round((A.style(this.cursorNode,"left")*this._sc)*100);
var C=Math.round(100-(A.style(this.cursorNode,"top")*this._sc)*100);
if(F!=this._hue){this._setHue(F)
}var D=this._hsv2rgb(F,E/100,C/100,{inputRange:1});
var B=(A.colorFromArray(D).toHex());
this.previewNode.style.backgroundColor=B;
if(this.webSafe){this.safePreviewNode.style.backgroundColor=B
}if(this.showHex){this.hexCode.value=B
}if(this.showRgb){this.Rval.value=D[0];
this.Gval.value=D[1];
this.Bval.value=D[2]
}if(this.showHsv){this.Hval.value=Math.round((F*360)/255);
this.Sval.value=E;
this.Vval.value=C
}this.value=B;
if(!this._timer&&!(arguments[1])){this.setValue(this.value);
this.onChange(this.value)
}},_setHuePoint:function(B){if(this.animatePoint){A.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:B.layerY,left:0,onEnd:A.hitch(this,"_updateColor")}).play()
}else{A.style(this.hueCursorNode,"top",(B.layerY)+"px");
this._updateColor(false)
}},_setPoint:function(B){if(this.animatePoint){A.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:B.layerY-this._offset,left:B.layerX-this._offset,onEnd:A.hitch(this,"_updateColor")}).play()
}else{A.style(this.cursorNode,"left",(B.layerX-this._offset)+"px");
A.style(this.cursorNode,"top",(B.layerY-this._offset)+"px");
this._updateColor(false)
}},_hsv2rgb:function(C,J,H,K){if(A.isArray(C)){if(J){K=J
}H=C[2]||0;
J=C[1]||0;
C=C[0]||0
}var N={inputRange:(K&&K.inputRange)?K.inputRange:[255,255,255],outputRange:(K&&K.outputRange)?K.outputRange:255};
switch(N.inputRange[0]){case 1:C=C*360;
break;
case 100:C=(C/100)*360;
break;
case 360:C=C;
break;
default:C=(C/255)*360
}if(C==360){C=0
}switch(N.inputRange[1]){case 100:J/=100;
break;
case 255:J/=255
}switch(N.inputRange[2]){case 100:H/=100;
break;
case 255:H/=255
}var L=null;
var E=null;
var G=null;
if(J==0){L=H;
E=H;
G=H
}else{var O=C/60;
var B=Math.floor(O);
var F=O-B;
var D=H*(1-J);
var M=H*(1-(J*F));
var I=H*(1-(J*(1-F)));
switch(B){case 0:L=H;
E=I;
G=D;
break;
case 1:L=M;
E=H;
G=D;
break;
case 2:L=D;
E=H;
G=I;
break;
case 3:L=D;
E=M;
G=H;
break;
case 4:L=I;
E=D;
G=H;
break;
case 5:L=H;
E=D;
G=M;
break
}}switch(N.outputRange){case 1:L=A.math.round(L,2);
E=A.math.round(E,2);
G=A.math.round(G,2);
break;
case 100:L=Math.round(L*100);
E=Math.round(E*100);
G=Math.round(G*100);
break;
default:L=Math.round(L*255);
E=Math.round(E*255);
G=Math.round(G*255)
}return[L,E,G]
}})
}}});