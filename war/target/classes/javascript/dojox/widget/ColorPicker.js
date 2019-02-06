if(!dojo._hasResource["dojox.widget.ColorPicker"]){dojo._hasResource["dojox.widget.ColorPicker"]=true;
dojo.provide("dojox.widget.ColorPicker");
dojo.experimental("dojox.widget.ColorPicker");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.dnd.move");
dojo.require("dojo.fx");
dojo.declare("dojox.widget.ColorPicker",dijit.form._FormWidget,{showRgb:true,showHsv:true,showHex:true,webSafe:true,animatePoint:true,slideDuration:250,_underlay:dojo.moduleUrl("dojox.widget","ColorPicker/images/underlay.png"),templateString:'<div class="dojoxColorPicker">\r\n\t<div class="dojoxColorPickerBox">\r\n\t\t<div dojoAttachPoint="cursorNode" class="dojoxColorPickerPoint"></div>\r\n\t\t<img dojoAttachPoint="colorUnderlay" dojoAttachEvent="onclick: _setPoint" class="dojoxColorPickerUnderlay" src="${_underlay}">\r\n\t</div>\r\n\t<div class="dojoxHuePicker">\r\n\t\t<div dojoAttachPoint="hueCursorNode" class="dojoxHuePickerPoint"></div>\r\n\t\t<div dojoAttachPoint="hueNode" class="dojoxHuePickerUnderlay" dojoAttachEvent="onclick: _setHuePoint"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint="previewNode" class="dojoxColorPickerPreview"></div>\r\n\t<div dojoAttachPoint="safePreviewNode" class="dojoxColorPickerWebSafePreview"></div>\r\n\t<div class="dojoxColorPickerOptional">\r\n\t\t<div class="dijitInline dojoxColorPickerRgb" dojoAttachPoint="rgbNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>r</td><td><input dojoAttachPoint="Rval" size="1"></td></tr>\r\n\t\t\t<tr><td>g</td><td><input dojoAttachPoint="Gval" size="1"></td></tr>\r\n\t\t\t<tr><td>b</td><td><input dojoAttachPoint="Bval" size="1"></td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dijitInline dojoxColorPickerHsv" dojoAttachPoint="hsvNode">\r\n\t\t\t<table>\r\n\t\t\t<tr><td>h</td><td><input dojoAttachPoint="Hval"size="1"> &deg;</td></tr>\r\n\t\t\t<tr><td>s</td><td><input dojoAttachPoint="Sval" size="1"> %</td></tr>\r\n\t\t\t<tr><td>v</td><td><input dojoAttachPoint="Vval" size="1"> %</td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div class="dojoxColorPickerHex" dojoAttachPoint="hexNode">\t\r\n\t\t\thex: <input dojoAttachPoint="hexCode, focusNode" size="6" class="dojoxColorPickerHexCode">\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){if(dojo.isIE&&dojo.isIE<7){this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')";
this.colorUnderlay.src=dojo.moduleUrl("dojox.widget","FisheyeList/blank.gif").toString()
}if(!this.showRgb){this.rgbNode.style.display="none"
}if(!this.showHsv){this.hsvNode.style.display="none"
}if(!this.showHex){this.hexNode.style.display="none"
}if(!this.webSafe){this.safePreviewNode.style.display="none"
}},startup:function(){this._offset=0;
this._mover=new dojo.dnd.Moveable(this.cursorNode,{mover:dojo.dnd.boxConstrainedMover({t:0,l:0,w:150,h:150})});
this._hueMover=new dojo.dnd.Moveable(this.hueCursorNode,{mover:dojo.dnd.boxConstrainedMover({t:0,l:0,w:0,h:150})});
dojo.subscribe("/dnd/move/stop",dojo.hitch(this,"_clearTimer"));
dojo.subscribe("/dnd/move/start",dojo.hitch(this,"_setTimer"));
this._sc=(1/dojo.coords(this.colorUnderlay).w);
this._hueSc=(255/(dojo.coords(this.hueNode).h+this._offset));
this._updateColor()
},_setTimer:function(A){this._timer=setInterval(dojo.hitch(this,"_updateColor"),45)
},_clearTimer:function(A){clearInterval(this._timer);
this.onChange(this.value)
},_setHue:function(A){var B=dojo.colorFromArray(this._hsv2rgb(A,1,1,{inputRange:1})).toHex();
dojo.style(this.colorUnderlay,"backgroundColor",B)
},_updateColor:function(){var C=Math.round((255+(this._offset))-((dojo.style(this.hueCursorNode,"top")+this._offset)*this._hueSc));
var B=Math.round((dojo.style(this.cursorNode,"left")*this._sc)*100);
var E=Math.round(100-(dojo.style(this.cursorNode,"top")*this._sc)*100);
if(C!=this._hue){this._setHue(C)
}var A=this._hsv2rgb(C,B/100,E/100,{inputRange:1});
var D=(dojo.colorFromArray(A).toHex());
this.previewNode.style.backgroundColor=D;
if(this.webSafe){this.safePreviewNode.style.backgroundColor=D
}if(this.showHex){this.hexCode.value=D
}if(this.showRgb){this.Rval.value=A[0];
this.Gval.value=A[1];
this.Bval.value=A[2]
}if(this.showHsv){this.Hval.value=Math.round((C*360)/255);
this.Sval.value=B;
this.Vval.value=E
}this.value=D;
if(!this._timer&&!(arguments[1])){this.setValue(this.value);
this.onChange(this.value)
}},_setHuePoint:function(A){if(this.animatePoint){dojo.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:A.layerY,left:0,onEnd:dojo.hitch(this,"_updateColor")}).play()
}else{dojo.style(this.hueCursorNode,"top",(A.layerY)+"px");
this._updateColor(false)
}},_setPoint:function(A){if(this.animatePoint){dojo.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:A.layerY-this._offset,left:A.layerX-this._offset,onEnd:dojo.hitch(this,"_updateColor")}).play()
}else{dojo.style(this.cursorNode,"left",(A.layerX-this._offset)+"px");
dojo.style(this.cursorNode,"top",(A.layerY-this._offset)+"px");
this._updateColor(false)
}},_hsv2rgb:function(A,G,E,H){if(dojo.isArray(A)){if(G){H=G
}E=A[2]||0;
G=A[1]||0;
A=A[0]||0
}var L={inputRange:(H&&H.inputRange)?H.inputRange:[255,255,255],outputRange:(H&&H.outputRange)?H.outputRange:255};
switch(L.inputRange[0]){case 1:A=A*360;
break;
case 100:A=(A/100)*360;
break;
case 360:A=A;
break;
default:A=(A/255)*360
}if(A==360){A=0
}switch(L.inputRange[1]){case 100:G/=100;
break;
case 255:G/=255
}switch(L.inputRange[2]){case 100:E/=100;
break;
case 255:E/=255
}var I=null;
var B=null;
var D=null;
if(G==0){I=E;
B=E;
D=E
}else{var M=A/60;
var N=Math.floor(M);
var C=M-N;
var K=E*(1-G);
var J=E*(1-(G*C));
var F=E*(1-(G*(1-C)));
switch(N){case 0:I=E;
B=F;
D=K;
break;
case 1:I=J;
B=E;
D=K;
break;
case 2:I=K;
B=E;
D=F;
break;
case 3:I=K;
B=J;
D=E;
break;
case 4:I=F;
B=K;
D=E;
break;
case 5:I=E;
B=K;
D=J;
break
}}switch(L.outputRange){case 1:I=dojo.math.round(I,2);
B=dojo.math.round(B,2);
D=dojo.math.round(D,2);
break;
case 100:I=Math.round(I*100);
B=Math.round(B*100);
D=Math.round(D*100);
break;
default:I=Math.round(I*255);
B=Math.round(B*255);
D=Math.round(D*255)
}return[I,B,D]
}})
};