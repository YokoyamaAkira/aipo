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
},_setHue:function(B){var A=dojo.colorFromArray(this._hsv2rgb(B,1,1,{inputRange:1})).toHex();
dojo.style(this.colorUnderlay,"backgroundColor",A)
},_updateColor:function(){var D=Math.round((255+(this._offset))-((dojo.style(this.hueCursorNode,"top")+this._offset)*this._hueSc));
var C=Math.round((dojo.style(this.cursorNode,"left")*this._sc)*100);
var A=Math.round(100-(dojo.style(this.cursorNode,"top")*this._sc)*100);
if(D!=this._hue){this._setHue(D)
}var B=this._hsv2rgb(D,C/100,A/100,{inputRange:1});
var E=(dojo.colorFromArray(B).toHex());
this.previewNode.style.backgroundColor=E;
if(this.webSafe){this.safePreviewNode.style.backgroundColor=E
}if(this.showHex){this.hexCode.value=E
}if(this.showRgb){this.Rval.value=B[0];
this.Gval.value=B[1];
this.Bval.value=B[2]
}if(this.showHsv){this.Hval.value=Math.round((D*360)/255);
this.Sval.value=C;
this.Vval.value=A
}this.value=E;
if(!this._timer&&!(arguments[1])){this.setValue(this.value);
this.onChange(this.value)
}},_setHuePoint:function(A){if(this.animatePoint){dojo.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:A.layerY,left:0,onEnd:dojo.hitch(this,"_updateColor")}).play()
}else{dojo.style(this.hueCursorNode,"top",(A.layerY)+"px");
this._updateColor(false)
}},_setPoint:function(A){if(this.animatePoint){dojo.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:A.layerY-this._offset,left:A.layerX-this._offset,onEnd:dojo.hitch(this,"_updateColor")}).play()
}else{dojo.style(this.cursorNode,"left",(A.layerX-this._offset)+"px");
dojo.style(this.cursorNode,"top",(A.layerY-this._offset)+"px");
this._updateColor(false)
}},_hsv2rgb:function(G,M,K,N){if(dojo.isArray(G)){if(M){N=M
}K=G[2]||0;
M=G[1]||0;
G=G[0]||0
}var D={inputRange:(N&&N.inputRange)?N.inputRange:[255,255,255],outputRange:(N&&N.outputRange)?N.outputRange:255};
switch(D.inputRange[0]){case 1:G=G*360;
break;
case 100:G=(G/100)*360;
break;
case 360:G=G;
break;
default:G=(G/255)*360
}if(G==360){G=0
}switch(D.inputRange[1]){case 100:M/=100;
break;
case 255:M/=255
}switch(D.inputRange[2]){case 100:K/=100;
break;
case 255:K/=255
}var A=null;
var H=null;
var J=null;
if(M==0){A=K;
H=K;
J=K
}else{var E=G/60;
var F=Math.floor(E);
var I=E-F;
var C=K*(1-M);
var B=K*(1-(M*I));
var L=K*(1-(M*(1-I)));
switch(F){case 0:A=K;
H=L;
J=C;
break;
case 1:A=B;
H=K;
J=C;
break;
case 2:A=C;
H=K;
J=L;
break;
case 3:A=C;
H=B;
J=K;
break;
case 4:A=L;
H=C;
J=K;
break;
case 5:A=K;
H=C;
J=B;
break
}}switch(D.outputRange){case 1:A=dojo.math.round(A,2);
H=dojo.math.round(H,2);
J=dojo.math.round(J,2);
break;
case 100:A=Math.round(A*100);
H=Math.round(H*100);
J=Math.round(J*100);
break;
default:A=Math.round(A*255);
H=Math.round(H*255);
J=Math.round(J*255)
}return[A,H,J]
}})
};