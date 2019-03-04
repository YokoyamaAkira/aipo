if(!dojo._hasResource["dojo.colors"]){dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
(function(){var A=function(D,C,E){if(E<0){++E
}if(E>1){--E
}var F=6*E;
if(F<1){return D+(C-D)*F
}if(2*E<1){return C
}if(3*E<2){return D+(C-D)*(2/3-E)*6
}return D
};
dojo.colorFromRgb=function(F,I){var D=F.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(D){var K=D[2].split(/\s*,\s*/),E=K.length,Q=D[1];
if((Q=="rgb"&&E==3)||(Q=="rgba"&&E==4)){var C=K[0];
if(C.charAt(C.length-1)=="%"){var M=dojo.map(K,function(H){return parseFloat(H)*2.56
});
if(E==4){M[3]=K[3]
}return dojo.colorFromArray(M,I)
}return dojo.colorFromArray(K,I)
}if((Q=="hsl"&&E==3)||(Q=="hsla"&&E==4)){var N=((parseFloat(K[0])%360)+360)%360/360,G=parseFloat(K[1])/100,J=parseFloat(K[2])/100,O=J<=0.5?J*(G+1):J+G-J*G,P=2*J-O,M=[A(P,O,N+1/3)*256,A(P,O,N)*256,A(P,O,N-1/3)*256,1];
if(E==4){M[3]=K[3]
}return dojo.colorFromArray(M,I)
}}return null
};
var B=function(E,C,D){E=Number(E);
return isNaN(E)?D:E<C?C:E>D?D:E
};
dojo.Color.prototype.sanitize=function(){var C=this;
C.r=Math.round(B(C.r,0,255));
C.g=Math.round(B(C.g,0,255));
C.b=Math.round(B(C.b,0,255));
C.a=B(C.a,0,1);
return this
}
})();
dojo.colors.makeGrey=function(B,A){return dojo.colorFromArray([B,B,B,A])
};
dojo.Color.named=dojo.mixin({aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},dojo.Color.named)
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(B,C,H){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var D=[B,"nls",C].join(".");
var J=dojo._loadedModules[D];
if(J){var I;
for(var E=A.length;
E>0;
E--){var G=A.slice(0,E).join("_");
if(J[G]){I=J[G];
break
}}if(!I){I=J.ROOT
}if(I){var F=function(){};
F.prototype=I;
return new F()
}}throw new Error("Bundle not found: "+C+" in "+B+" , locale="+H)
};
dojo.i18n.normalizeLocale=function(B){var A=B?B.toLowerCase():dojo.locale;
if(A=="root"){A="ROOT"
}return A
};
dojo.i18n._requireLocalization=function(A,B,O,K){var H=dojo.i18n.normalizeLocale(O);
var E=[A,"nls",B].join(".");
var D="";
if(K){var N=K.split(",");
for(var I=0;
I<N.length;
I++){if(H.indexOf(N[I])==0){if(N[I].length>D.length){D=N[I]
}}}if(!D){D="ROOT"
}}var L=K?D:H;
var Q=dojo._loadedModules[E];
var C=null;
if(Q){if(djConfig.localizationComplete&&Q._built){return 
}var G=L.replace(/-/g,"_");
var M=E+"."+G;
C=dojo._loadedModules[M]
}if(!C){Q=dojo.provide(E);
var F=dojo._getModuleSymbols(A);
var J=F.concat("nls").join("/");
var P;
dojo.i18n._searchLocalePath(L,K,function(V){var W=V.replace(/-/g,"_");
var U=E+"."+W;
var S=false;
if(!dojo._loadedModules[U]){dojo.provide(U);
var T=[J];
if(V!="ROOT"){T.push(V)
}T.push(B);
var R=T.join("/")+".js";
S=dojo._loadPath(R,null,function(Z){var Y=function(){};
Y.prototype=P;
Q[W]=new Y();
for(var X in Z){Q[W][X]=Z[X]
}})
}else{S=true
}if(S&&Q[W]){P=Q[W]
}else{Q[W]=P
}if(K){return true
}})
}if(K&&H!=D){Q[H.replace(/-/g,"_")]=Q[D.replace(/-/g,"_")]
}};
(function(){var A=djConfig.extraLocale;
if(A){if(!A instanceof Array){A=[A]
}var B=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(E,D,C,G){B(E,D,C,G);
if(C){return 
}for(var F=0;
F<A.length;
F++){B(E,D,A[F],G)
}}
}})();
dojo.i18n._searchLocalePath=function(H,I,C){H=dojo.i18n.normalizeLocale(H);
var A=H.split("-");
var B=[];
for(var E=A.length;
E>0;
E--){B.push(A.slice(0,E).join("-"))
}B.push(false);
if(I){B.reverse()
}for(var D=B.length-1;
D>=0;
D--){var F=B[D]||"ROOT";
var G=C(F);
if(G){break
}}};
dojo.i18n._preloadLocalizations=function(E,B){function C(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<B.length;
G++){if(B[G]==H){dojo.require(E+"_"+H);
return true
}}return false
})
}C();
var A=djConfig.extraLocale||[];
for(var D=0;
D<A.length;
D++){C(A[D])
}}
}if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
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
}if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var F=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var E=dojo.query("> script[type='dojo/method'][event='preamble']",F).orphan();
var C=dojo.query("> script[type^='dojo/']",F).orphan();
var D=F.nodeName;
var B=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(G){return dojo.getObject(G)
}):[dijit._Widget,dijit._Templated];
if(E.length){B.preamble=dojo.parser._functionFromScript(E[0])
}var A=dojo.map(C,function(H){var G=H.getAttribute("event")||"postscript";
return{event:G,func:dojo.parser._functionFromScript(H)}
});
this.mixins.push(function(){dojo.forEach(A,function(G){dojo.connect(this,G.event,this,G.func)
},this)
});
B.widgetsInTemplate=true;
B._skipNodeCache=true;
B.templateString="<"+D+" class='"+F.className+"' dojoAttachPoint='"+(F.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(F.getAttribute("dojoAttachEvent")||"")+"' >"+F.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+D+">";
dojo.query("[dojoType]",F).forEach(function(G){G.removeAttribute("dojoType")
});
dojo.declare(this.widgetClass,this.mixins,B)
}})
}if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(A){return A[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var A;
do{A="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(A));
return A
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(B){var A=B.target;
if(A.nodeType==3){A=A.parentNode
}return" button textarea input select option ".indexOf(" "+A.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var D=dojo.doc,B=D.documentElement,C=window,A=dojo.body();
if(dojo.isMozilla){return{w:B.clientWidth,h:C.innerHeight}
}else{if(!dojo.isOpera&&C.innerWidth){return{w:C.innerWidth,h:C.innerHeight}
}else{if(!dojo.isOpera&&B&&B.clientWidth){return{w:B.clientWidth,h:B.clientHeight}
}else{if(A.clientWidth){return{w:A.clientWidth,h:A.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(D){var C=dojo.dnd.getViewport(),B=0,A=0;
if(D.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){B=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(D.clientX>C.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){B=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(D.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){A=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(D.clientY>C.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){A=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(B,A)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(G){for(var C=G.target;
C;
){if(C.nodeType==1&&(C.tagName.toLowerCase() in dojo.dnd._validNodes)){var N=dojo.getComputedStyle(C);
if(N.overflow.toLowerCase() in dojo.dnd._validOverflow){var H=dojo._getContentBox(C,N),L=dojo._abs(C,true);
H.l+=L.x+C.scrollLeft;
H.t+=L.y+C.scrollTop;
var J=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,H.w/2),F=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,H.h/2),B=G.pageX-H.l,A=G.pageY-H.t,M=0,K=0;
if(B>0&&B<H.w){if(B<J){M=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(B>H.w-J){M=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(A>0&&A<H.h){if(A<F){K=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(A>H.h-F){K=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var D=C.scrollLeft,E=C.scrollTop;
C.scrollLeft=C.scrollLeft+M;
C.scrollTop=C.scrollTop+K;
if(D!=C.scrollLeft||E!=C.scrollTop){return 
}}}try{C=C.parentNode
}catch(I){C=null
}}dojo.dnd.autoScroll(G)
}
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(D,E,C){this.node=dojo.byId(D);
this.marginBox={l:E.pageX,t:E.pageY};
this.mouseButton=E.button;
var B=this.host=C,F=D.ownerDocument,A=dojo.connect(F,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(F,"onmousemove",this,"onMouseMove"),dojo.connect(F,"onmouseup",this,"onMouseUp"),dojo.connect(F,"ondragstart",dojo,"stopEvent"),dojo.connect(F,"onselectstart",dojo,"stopEvent"),A];
if(B&&B.onMoveStart){B.onMoveStart(this)
}},onMouseMove:function(B){dojo.dnd.autoScroll(B);
var A=this.marginBox;
this.host.onMove(this,{l:A.l+B.pageX,t:A.t+B.pageY})
},onMouseUp:function(A){if(this.mouseButton==A.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var A=dojo.marginBox(this.node);
A.l-=this.marginBox.l;
A.t-=this.marginBox.t;
this.marginBox=A;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var A=this.host;
if(A&&A.onMoveStop){A.onMoveStop(this)
}this.events=this.node=null
}})
}if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(A,B){this.node=dojo.byId(A);
if(!B){B={}
}this.handle=B.handle?dojo.byId(B.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=B.delay>0?B.delay:0;
this.skip=B.skip;
this.mover=B.mover?B.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(B,A){return new dojo.dnd.Moveable(A,B)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(A){if(this.skip&&dojo.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=A.pageX;
this._lastY=A.pageY
}else{new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseMove:function(A){if(Math.abs(A.pageX-this._lastX)>this.delay||Math.abs(A.pageY-this._lastY)>this.delay){this.onMouseUp(A);
new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseUp:function(A){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(A){if(!this.skip||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onMoveStart:function(A){dojo.publish("/dnd/move/start",[A]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(A){dojo.publish("/dnd/move/stop",[A]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(A){},onMove:function(B,A){this.onMoving(B,A);
dojo.marginBox(B.node,A);
this.onMoved(B,A)
},onMoving:function(B,A){},onMoved:function(B,A){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(B,A){return new dojo.dnd.move.constrainedMoveable(A,B)
},constructor:function(A,B){if(!B){B={}
}this.constraints=B.constraints;
this.within=B.within
},onFirstMove:function(B){var C=this.constraintBox=this.constraints.call(this,B),A=B.marginBox;
C.r=C.l+C.w-(this.within?A.w:0);
C.b=C.t+C.h-(this.within?A.h:0)
},onMove:function(B,A){var C=this.constraintBox;
A.l=A.l<C.l?C.l:C.r<A.l?C.r:A.l;
A.t=A.t<C.t?C.t:C.b<A.t?C.b:A.t;
dojo.marginBox(B.node,A)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(B,A){return new dojo.dnd.move.boxConstrainedMoveable(A,B)
},constructor:function(B,C){var A=C&&C.box;
this.constraints=function(){return A
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(B,A){return new dojo.dnd.move.parentConstrainedMoveable(A,B)
},constructor:function(B,C){var A=C&&C.area;
this.constraints=function(){var G=this.node.parentNode,E=dojo.getComputedStyle(G),F=dojo._getMarginBox(G,E);
if(A=="margin"){return F
}var D=dojo._getMarginExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(A=="border"){return F
}D=dojo._getBorderExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(A=="padding"){return F
}D=dojo._getPadExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
return F
}
}});
dojo.dnd.move.constrainedMover=function(A,C){var B=function(E,F,D){dojo.dnd.Mover.call(this,E,F,D)
};
dojo.extend(B,dojo.dnd.Mover.prototype);
dojo.extend(B,{onMouseMove:function(G){dojo.dnd.autoScroll(G);
var D=this.marginBox,H=this.constraintBox,E=D.l+G.pageX,F=D.t+G.pageY;
E=E<H.l?H.l:H.r<E?H.r:E;
F=F<H.t?H.t:H.b<F?H.b:F;
this.host.onMove(this,{l:E,t:F})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var E=this.constraintBox=A.call(this),D=this.marginBox;
E.r=E.l+E.w-(C?D.w:0);
E.b=E.t+E.h-(C?D.h:0)
}});
return B
};
dojo.dnd.move.boxConstrainedMover=function(B,A){return dojo.dnd.move.constrainedMover(function(){return B
},A)
};
dojo.dnd.move.parentConstrainedMover=function(C,B){var A=function(){var G=this.node.parentNode,E=dojo.getComputedStyle(G),F=dojo._getMarginBox(G,E);
if(C=="margin"){return F
}var D=dojo._getMarginExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(C=="border"){return F
}D=dojo._getBorderExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
if(C=="padding"){return F
}D=dojo._getPadExtents(G,E);
F.l+=D.l,F.t+=D.t,F.w-=D.w,F.h-=D.h;
return F
};
return dojo.dnd.move.constrainedMover(A,B)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(C){var B=C.shift();
var A=B;
dojo.forEach(C,function(D){dojo.connect(A,"onEnd",D,"play");
A=D
});
return B
};
dojo.fx.combine=function(B){var A=new dojo._Animation({curve:[0,1]});
if(!B.length){return A
}A.duration=B[0].duration;
dojo.forEach(B,function(C){dojo.forEach(["play","pause","stop"],function(D){if(C[D]){dojo.connect(A,D,C,D)
}})
});
return A
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(A){var B=this;
dojo.mixin(B,A);
B.node=A.node;
B._showArgs=dojo.mixin({},A);
B._showArgs.node=B.node;
B._showArgs.duration=B.showDuration;
B.showAnim=B.showFunc(B._showArgs);
B._hideArgs=dojo.mixin({},A);
B._hideArgs.node=B.node;
B._hideArgs.duration=B.hideDuration;
B.hideAnim=B.hideFunc(B._hideArgs);
dojo.connect(B.showAnim,"beforeBegin",dojo.hitch(B.hideAnim,"stop",true));
dojo.connect(B.hideAnim,"beforeBegin",dojo.hitch(B.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(A){return this.showAnim.play(A||0)
},hide:function(A){return this.hideAnim.play(A||0)
}});
dojo.fx.wipeIn=function(A){A.node=dojo.byId(A.node);
var C=A.node,B=C.style;
var D=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){B.overflow="hidden";
if(B.visibility=="hidden"||B.display=="none"){B.height="1px";
B.display="";
B.visibility="";
return 1
}else{var E=dojo.style(C,"height");
return Math.max(E,1)
}},end:function(){return C.scrollHeight
}}}},A));
dojo.connect(D,"onEnd",function(){B.height="auto"
});
return D
};
dojo.fx.wipeOut=function(A){var C=A.node=dojo.byId(A.node);
var B=C.style;
var D=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},A));
dojo.connect(D,"beforeBegin",function(){B.overflow="hidden";
B.display=""
});
dojo.connect(D,"onEnd",function(){B.height="auto";
B.display="none"
});
return D
};
dojo.fx.slideTo=function(A){var B=(A.node=dojo.byId(A.node));
var E=null;
var D=null;
var F=(function(G){return function(){var I=dojo.getComputedStyle(G);
var J=I.position;
E=(J=="absolute"?G.offsetTop:parseInt(I.top)||0);
D=(J=="absolute"?G.offsetLeft:parseInt(I.left)||0);
if(J!="absolute"&&J!="relative"){var H=dojo.coords(G,true);
E=H.y;
D=H.x;
G.style.position="absolute";
G.style.top=E+"px";
G.style.left=D+"px"
}}
})(B);
F();
var C=dojo.animateProperty(dojo.mixin({properties:{top:{end:A.top||0},left:{end:A.left||0}}},A));
dojo.connect(C,"beforeBegin",C,F);
return C
}
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var A=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,A);
this.errorMessage=dojo.string.substitute(this.errorMessage,A);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var B=dojo.query(">",this.containerNode||this.domNode),A=B.filter("[widgetId]");
if(B.length==1&&A.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(A[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(A){this.href=A;
return this._prepareLoad()
},setContent:function(A){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(A||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(A){dojo.marginBox(this.domNode,A);
var B=this.containerNode||this.domNode,C=dojo.mixin(dojo.marginBox(B),A||{});
this._contentBox=dijit.layout.marginBox2contentBox(B,C);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(B){var A=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(B||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&A&&!this._xhrDfd)||(!this.isLoaded&&A&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var B=this;
var C={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(C,this.ioArgs)
}var A=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(C);
A.addCallback(function(D){try{B.onDownloadEnd.call(B);
B._isDownloaded=true;
B.setContent.call(B,D)
}catch(E){B._onError.call(B,"Content",E)
}delete B._xhrDfd;
return D
});
A.addErrback(function(D){if(!A.cancelled){B._onError.call(B,"Download",D)
}delete B._xhrDfd;
return D
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(A){this.destroyDescendants();
try{var B=this.containerNode||this.domNode;
while(B.firstChild){dojo._destroyElement(B.firstChild)
}if(typeof A=="string"){if(this.extractContent){match=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){A=match[1]
}}B.innerHTML=A
}else{if(A.nodeType){B.appendChild(A)
}else{dojo.forEach(A,function(E){B.appendChild(E.cloneNode(true))
})
}}}catch(D){var C=this.onContentError(D);
try{B.innerHTML=C
}catch(D){console.error("Fatal "+this.id+" could not change content due to "+D.message,D)
}}},_onError:function(B,D,A){var C=this["on"+B+"Error"].call(this,D);
if(A){console.error(A,D)
}else{if(C){this._setContent.call(this,C)
}}},_createSubWidgets:function(){var A=this.containerNode||this.domNode;
try{dojo.parser.parse(A,true)
}catch(B){this._onError("Content",B,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(A){},onUnload:function(A){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(A){},onDownloadError:function(A){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(A){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(A){dojo.stopEvent(A);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(E){var D={};
dojo.forEach(this.getDescendants(),function(G){if(!G.name){return 
}var F=D[G.name]||(D[G.name]=[]);
F.push(G)
});
for(var B in D){var C=D[B],A=dojo.getObject(B,false,E);
if(!dojo.isArray(A)){A=[A]
}if(C[0].setChecked){dojo.forEach(C,function(F,G){F.setChecked(dojo.indexOf(A,F.value)!=-1)
})
}else{dojo.forEach(C,function(F,G){F.setValue(A[G])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(E){var D=E.getValue?E.getValue():E.value;
var B=E.name;
if(!B){return 
}if(E.setChecked){if(/Radio/.test(E.declaredClass)){if(E.checked){dojo.setObject(B,D,A)
}}else{var C=dojo.getObject(B,false,A);
if(!C){C=[];
dojo.setObject(B,C,A)
}if(E.checked){C.push(D)
}}}else{dojo.setObject(B,D,A)
}});
return A
},isValid:function(){return dojo.every(this.getDescendants(),function(A){return !A.isValid||A.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var A=dijit.getViewport();
var C=this.node.style,D=this.domNode.style;
D.top=A.t+"px";
D.left=A.l+"px";
C.width=A.w+"px";
C.height=A.h+"px";
var B=dijit.getViewport();
if(A.w!=B.w){C.width=B.w+"px"
}if(A.h!=B.h){C.height=B.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templateString:'<div class="dijitDialog">\r\n\t<div dojoAttachPoint="titleBar" class="dijitDialogTitleBar" tabindex="0" waiRole="dialog">\r\n\t<span dojoAttachPoint="titleNode" class="dijitDialogTitle">${title}</span>\r\n\t<span dojoAttachPoint="closeButtonNode" class="dijitDialogCloseIcon" dojoAttachEvent="onclick: hide">\r\n\t\t<span dojoAttachPoint="closeText" class="closeText">x</span>\r\n\t</span>\r\n\t</div>\r\n\t\t<div dojoAttachPoint="containerNode" class="dijitDialogPaneContent"></div>\r\n\t<span dojoAttachPoint="tabEnd" dojoAttachEvent="onfocus:_cycleFocus" tabindex="0"></span>\r\n</div>\r\n',open:false,duration:400,_lastFocusItem:null,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){dojo.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var A=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:A,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var A=dijit.getViewport();
var C=dojo.marginBox(this.domNode);
var B=this.domNode.style;
B.left=Math.floor((A.l+(A.w-C.w)/2))+"px";
B.top=Math.floor((A.t+(A.h-C.h)/2))+"px"
},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(A){if(A.keyCode){var B=A.target;
if(B==this.titleBar&&A.shiftKey&&A.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(A)
}else{while(B){if(B==this.domNode){if(A.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}B=B.parentNode
}if(A.keyCode!=dojo.keys.TAB){dojo.stopEvent(A)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(C){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,A,this,"_findLastFocus"));
dojo.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(dojo.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",dojo.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templateString:'<div class="dijitTooltipDialog" >\r\n\t<div class="dijitTooltipContainer">\r\n\t\t<div class ="dijitTooltipContents dijitTooltipFocusNode" dojoAttachPoint="containerNode" tabindex="0" waiRole="dialog"></div>\r\n\t</div>\r\n\t<span dojoAttachPoint="tabEnd" tabindex="0" dojoAttachEvent="focus:_cycleFocus"></span>\r\n\t<div class="dijitTooltipConnector" ></div>\r\n</div>\r\n',postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var A=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,A,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(A){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(A.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(A.charAt(0)=="T"?"Below":"Above")
},onOpen:function(A){this.orient(A.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(A){if(A.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(A.target==this.containerNode&&A.shiftKey&&A.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(A)
}else{if(A.keyCode==dojo.keys.TAB){A.stopPropagation()
}}}},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit._editor.selection"]){dojo._hasResource["dijit._editor.selection"]=true;
dojo.provide("dijit._editor.selection");
dojo.mixin(dijit._editor.selection,{getType:function(){if(dojo.doc.selection){return dojo.doc.selection.type.toLowerCase()
}else{var B="text";
var A;
try{A=dojo.global.getSelection()
}catch(C){}if(A&&A.rangeCount==1){var D=A.getRangeAt(0);
if((D.startContainer==D.endContainer)&&((D.endOffset-D.startOffset)==1)&&(D.startContainer.nodeType!=3)){B="control"
}}return B
}},getSelectedText:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().text
}else{var A=dojo.global.getSelection();
if(A){return A.toString()
}}},getSelectedHtml:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().htmlText
}else{var A=dojo.global.getSelection();
if(A&&A.rangeCount){var C=A.getRangeAt(0).cloneContents();
var B=document.createElement("div");
B.appendChild(C);
return B.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var A=dojo.doc.selection.createRange();
if(A&&A.item){return dojo.doc.selection.createRange().item(0)
}}else{var B=dojo.global.getSelection();
return B.anchorNode.childNodes[B.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var C=this.getSelectedElement();
if(C){return C.parentNode
}}else{if(dojo.doc.selection){return dojo.doc.selection.createRange().parentElement()
}else{var A=dojo.global.getSelection();
if(A){var B=A.anchorNode;
while(B&&(B.nodeType!=1)){B=B.parentNode
}return B
}}}},hasAncestorElement:function(A){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(A){var B=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(B,arguments)
},isTag:function(D,A){if(D&&D.tagName){var E=D.tagName.toLowerCase();
for(var B=0;
B<A.length;
B++){var C=String(A[B]).toLowerCase();
if(E==C){return C
}}}return""
},getParentOfType:function(B,A){while(B){if(this.isTag(B,A).length){return B
}B=B.parentNode
}return null
},remove:function(){var A=dojo.doc.selection;
if(A){if(A.type.toLowerCase()!="none"){A.clear()
}return A
}else{A=dojo.global.getSelection();
A.deleteFromDocument();
return A
}},selectElementChildren:function(D,C){var F=dojo.global;
var A=dojo.doc;
D=dojo.byId(D);
if(A.selection&&dojo.body().createTextRange){var B=D.ownerDocument.body.createTextRange();
B.moveToElementText(D);
if(!C){B.select()
}}else{if(F.getSelection){var E=F.getSelection();
if(E.setBaseAndExtent){E.setBaseAndExtent(D,0,D,D.innerText.length-1)
}else{if(E.selectAllChildren){E.selectAllChildren(D)
}}}}},selectElement:function(D,C){var A=dojo.doc;
D=dojo.byId(D);
if(A.selection&&dojo.body().createTextRange){try{var B=dojo.body().createControlRange();
B.addElement(D);
if(!C){B.select()
}}catch(F){this.selectElementChildren(D,C)
}}else{if(dojo.global.getSelection){var E=dojo.global.getSelection();
if(E.removeAllRanges){var B=A.createRange();
B.selectNode(D);
E.removeAllRanges();
E.addRange(B)
}}}}})
}if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var A=dojo.doc.createElement("textarea");
A.id="dijit._editor.RichText.savedContent";
var B=A.style;
B.display="none";
B.position="absolute";
B.top="-100px";
B.left="-100px";
B.height="3px";
B.width="3px";
dojo.body().appendChild(A)
})()
}else{try{dojo.doc.write('<textarea id="dijit._editor.RichText.savedContent" style="display:none;position:absolute;top:-100px;left:-100px;height:3px;width:3px;overflow:hidden;"></textarea>')
}catch(e){}}}dojo.declare("dijit._editor.RichText",[dijit._Widget],{constructor:function(){this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this._keyHandlers={};
this.contentPreFilters.push(dojo.hitch(this,"_preFixUrlAttributes"));
if(dojo.isMoz){this.contentPreFilters.push(this._fixContentForMoz)
}this.onLoadDeferred=new dojo.Deferred()
},inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",_content:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",onLoadDeferred:null,postCreate:function(){dojo.publish("dijit._editor.RichText::init",[this]);
this.open();
this.setupDefaultShortcuts()
},setupDefaultShortcuts:function(){var B=this.KEY_CTRL;
var A=function(D,C){return arguments.length==1?function(){this.execCommand(D)
}:function(){this.execCommand(D,C)
}
};
this.addKeyHandler("b",B,A("bold"));
this.addKeyHandler("i",B,A("italic"));
this.addKeyHandler("u",B,A("underline"));
this.addKeyHandler("a",B,A("selectall"));
this.addKeyHandler("s",B,function(){this.save(true)
});
this.addKeyHandler("1",B,A("formatblock","h1"));
this.addKeyHandler("2",B,A("formatblock","h2"));
this.addKeyHandler("3",B,A("formatblock","h3"));
this.addKeyHandler("4",B,A("formatblock","h4"));
this.addKeyHandler("\\",B,A("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",B,A("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var B=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var E="",F,C=0;
while((F=B[C++])){if(F.charAt(1)!="l"){E+="<"+F+"><span>content</span></"+F+">"
}else{E+="<"+F+"><li>content</li></"+F+">"
}}var G=document.createElement("div");
G.style.position="absolute";
G.style.left="-2000px";
G.style.top="-2000px";
document.body.appendChild(G);
G.innerHTML=E;
var D=G.firstChild;
while(D){dijit._editor.selection.selectElement(D.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D.firstChild]);
var A=D.tagName.toLowerCase();
this._local2NativeFormatNames[A]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[A]]=A;
D=D.nextSibling
}document.body.removeChild(G)
},open:function(element){if((!this.onLoadDeferred)||(this.onLoadDeferred.fired>=0)){this.onLoadDeferred=new dojo.Deferred()
}if(!this.isClosed){this.close()
}dojo.publish("dijit._editor.RichText::open",[this]);
this._content="";
if((arguments.length==1)&&(element.nodeName)){this.domNode=element
}if((this.domNode.nodeName)&&(this.domNode.nodeName.toLowerCase()=="textarea")){this.textarea=this.domNode;
this.name=this.textarea.name;
var html=this._preFilterContent(this.textarea.value);
this.domNode=dojo.doc.createElement("div");
this.domNode.setAttribute("widgetId",this.id);
this.textarea.removeAttribute("widgetId");
this.domNode.cssText=this.textarea.cssText;
this.domNode.className+=" "+this.textarea.className;
dojo.place(this.domNode,this.textarea,"before");
var tmpFunc=dojo.hitch(this,function(){with(this.textarea.style){display="block";
position="absolute";
left=top="-1000px";
if(dojo.isIE){this.__overflow=overflow;
overflow="hidden"
}}});
if(dojo.isIE){setTimeout(tmpFunc,10)
}else{tmpFunc()
}}else{var html=this._preFilterContent(this.getNodeChildrenHtml(this.domNode));
this.domNode.innerHTML=""
}if(html==""){html="&nbsp;"
}var content=dojo.contentBox(this.domNode);
this._oldHeight=content.h;
this._oldWidth=content.w;
this.savedContent=html;
if((this.domNode.nodeName)&&(this.domNode.nodeName=="LI")){this.domNode.innerHTML=" <br>"
}this.editingArea=dojo.doc.createElement("div");
this.domNode.appendChild(this.editingArea);
if(this.name!=""&&(!djConfig.useXDomain||djConfig.allowXdRichTextSave)){var saveTextarea=dojo.byId("dijit._editor.RichText.savedContent");
if(saveTextarea.value!=""){var datas=saveTextarea.value.split(this._SEPARATOR),i=0,dat;
while((dat=datas[i++])){var data=dat.split(":");
if(data[0]==this.name){html=data[1];
datas.splice(i,1);
break
}}}dojo.connect(window,"onbeforeunload",this,"_saveContent")
}this.isClosed=false;
if(dojo.isIE||dojo.isSafari||dojo.isOpera){var ifr=this.iframe=dojo.doc.createElement("iframe");
ifr.src="javascript:void(0)";
this.editorObject=ifr;
ifr.style.border="none";
ifr.style.width="100%";
ifr.frameBorder=0;
this.editingArea.appendChild(ifr);
this.window=ifr.contentWindow;
this.document=this.window.document;
this.document.open();
this.document.write(this._getIframeDocTxt(html));
this.document.close();
if(dojo.isIE>=7){if(this.height){ifr.style.height=this.height
}if(this.minHeight){ifr.style.minHeight=this.minHeight
}}else{ifr.style.height=this.height?this.height:this.minHeight
}if(dojo.isIE){this._localizeEditorCommands()
}this.onLoad()
}else{this._drawIframe(html)
}if(this.domNode.nodeName=="LI"){this.domNode.lastChild.style.marginTop="-1.2em"
}this.domNode.className+=" RichTextEditable"
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(B){var D=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){B="<div>"+B+"</div>"
}var A=[D.fontWeight,D.fontSize,D.fontFamily].join(" ");
var C=D.lineHeight;
if(C.indexOf("px")>=0){C=parseFloat(C)/parseFloat(D.fontSize)
}else{if(C.indexOf("em")>=0){C=parseFloat(C)
}else{C="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",A,";","	min-height:",this.minHeight,";","	line-height:",C,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+B+"</body></html>"].join("")
},_drawIframe:function(F){if(!this.iframe){var H=this.iframe=dojo.doc.createElement("iframe");
var G=H.style;
G.border="none";
G.lineHeight="0";
G.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var E=dojo.query('label[for="'+this.id+'"]');
if(E.length){this._localizedIframeTitles.iframeEditTitle=E[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var D=this.srcNodeRef
}else{var D=dojo.doc.createElement("div");
D.style.display="none";
D.innerHTML=F;
this.editingArea.appendChild(D)
}this.editingArea.appendChild(this.iframe);
var A=false;
var C=this.iframe.contentDocument;
C.open();
C.write(this._getIframeDocTxt(F));
C.close();
var B=dojo.hitch(this,function(){if(!A){A=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(I){setTimeout(B,500);
A=false;
return 
}dojo._destroyElement(D);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(D);
this.editNode.innerHTML=F;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
B()
},_applyEditingAreaStyleSheets:function(){var D=[];
if(this.styleSheets){D=this.styleSheets.split(";");
this.styleSheets=""
}D=D.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var E="",C=0,B;
while((B=D[C++])){var A=(new dojo._Url(dojo.global.location,B)).toString();
this.editingAreaStyleSheets.push(A);
E+='<link rel="stylesheet" type="text/css" href="'+A+'"/>'
}return E
},addStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new dojo._Url(dojo.global.location,url)).toString()
}if(dojo.indexOf(this.editingAreaStyleSheets,url)>-1){console.debug("dijit._editor.RichText.addStyleSheet: Style sheet "+url+" is already applied to the editing area!");
return 
}this.editingAreaStyleSheets.push(url);
if(this.document.createStyleSheet){this.document.createStyleSheet(url)
}else{var head=this.document.getElementsByTagName("head")[0];
var stylesheet=this.document.createElement("link");
with(stylesheet){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(stylesheet)
}},removeStyleSheet:function(C){var B=C.toString();
if(B.charAt(0)=="."||(B.charAt(0)!="/"&&!C.host)){B=(new dojo._Url(dojo.global.location,B)).toString()
}var A=dojo.indexOf(this.editingAreaStyleSheets,B);
if(A==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+B+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[A];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+B+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(A){if(dojo.isIE||dojo.isSafari||dojo.isOpera){this.editNode.contentEditable=!A
}else{if(A){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(A?"off":"on");
if(!A){dojo.forEach(this._mozSettingProps,function(C,B){this.document.execCommand(C,false,this._mozSettings[B])
},this)
}}this.disabled=A
},_isResized:function(){return false
},onLoad:function(E){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var B=this.events.concat(this.captureEvents),A=0,D;
while((D=B[A++])){this.connect(this.document,D.toLowerCase(),D)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(C){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(E);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},onKeyDown:function(A){if(dojo.isIE){if(A.keyCode===dojo.keys.BACKSPACE&&this.document.selection.type==="Control"){dojo.stopEvent(A);
this.execCommand("delete")
}else{if((65<=A.keyCode&&A.keyCode<=90)||(A.keyCode>=37&&A.keyCode<=40)){A.charCode=A.keyCode;
this.onKeyPress(A)
}}}else{if(dojo.isMoz){if(A.keyCode==dojo.keys.TAB&&!A.shiftKey&&!A.ctrlKey&&!A.altKey&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(A)
}else{if(A.keyCode==dojo.keys.TAB&&A.shiftKey){if(this.toolbar){this.toolbar.focus()
}dojo.stopEvent(A)
}}}}},onKeyUp:function(A){return 
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(F){var B=F.ctrlKey?this.KEY_CTRL:0|F.shiftKey?this.KEY_SHIFT:0;
var D=F.keyChar||F.keyCode;
if(this._keyHandlers[D]){var A=this._keyHandlers[D],C=0,E;
while((E=A[C++])){if(B==E.modifiers){if(!E.handler.apply(this,arguments)){F.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(F)
}),1)
},addKeyHandler:function(B,A,C){if(!dojo.isArray(this._keyHandlers[B])){this._keyHandlers[B]=[]
}this._keyHandlers[B].push({modifiers:A||0,handler:C})
},onKeyPressed:function(A){this.onDisplayChanged()
},onClick:function(A){this.onDisplayChanged(A)
},_onBlur:function(B){var A=this.getValue(true);
if(A!=this.savedContent){this.onChange(A);
this.savedContent=A
}if(dojo.isMoz&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeEditTitle
}},_initialFocus:true,_onFocus:function(A){if((dojo.isMoz)&&(this._initialFocus)){this._initialFocus=false;
if(this.editNode.innerHTML.replace(/^\s+|\s+$/g,"")=="&nbsp;"){this.placeCursorAtStart()
}}},blur:function(){if(this.iframe){this.window.blur()
}else{if(this.editNode){this.editNode.blur()
}}},focus:function(){if(this.iframe&&!dojo.isIE){dijit.focus(this.iframe)
}else{if(this.editNode&&this.editNode.focus){dijit.focus(this.editNode)
}else{console.debug("Have no idea how to focus into the editor!")
}}},updateInterval:200,_updateTimer:null,onDisplayChanged:function(A){if(!this._updateTimer){if(this._updateTimer){clearTimeout(this._updateTimer)
}this._updateTimer=setTimeout(dojo.hitch(this,this.onNormalizedDisplayChanged),this.updateInterval)
}},onNormalizedDisplayChanged:function(){this._updateTimer=null
},onChange:function(A){},_normalizeCommand:function(A){var B=A.toLowerCase();
if(B=="formatblock"){if(dojo.isSafari){B="heading"
}}else{if(B=="hilitecolor"&&!dojo.isMoz){B="backcolor"
}}return B
},queryCommandAvailable:function(E){var A=1;
var H=1<<1;
var B=1<<2;
var C=1<<3;
var I=1<<4;
var F=dojo.isSafari;
function D(J){return{ie:Boolean(J&A),mozilla:Boolean(J&H),safari:Boolean(J&B),safari420:Boolean(J&I),opera:Boolean(J&C)}
}var G=null;
switch(E.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":G=D(H|A|B|C);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":G=D(H|A|C|I);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":G=D(A);
break;
case"cut":case"copy":case"paste":G=D(A|H|I);
break;
case"inserttable":G=D(H|A);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":G=D(A|H);
break;
default:return false
}return(dojo.isIE&&G.ie)||(dojo.isMoz&&G.mozilla)||(dojo.isSafari&&G.safari)||(F&&G.safari420)||(dojo.isOpera&&G.opera)
},execCommand:function(E,D){var C;
this.focus();
E=this._normalizeCommand(E);
if(D!=undefined){if(E=="heading"){throw new Error("unimplemented")
}else{if((E=="formatblock")&&dojo.isIE){D="<"+D+">"
}}}if(E=="inserthtml"){D=this._preFilterContent(D);
if(dojo.isIE){var F=this.document.selection.createRange();
F.pasteHTML(D);
F.select();
C=true
}else{if(dojo.isMoz&&!D.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
C=true
}else{C=this.document.execCommand(E,false,D)
}}}else{if((E=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var B=this.window.getSelection();
var A=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A]);
C=this.document.execCommand("unlink",false,null)
}else{if((E=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
C=this.document.execCommand(E,false,D);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((E=="backcolor")||(E=="forecolor"))){D=arguments.length>1?D:null;
C=this.document.execCommand(E,false,D)
}else{D=arguments.length>1?D:null;
if(D||E!="createlink"){C=this.document.execCommand(E,false,D)
}}}}}this.onDisplayChanged();
return C
},queryCommandEnabled:function(B){B=this._normalizeCommand(B);
if(dojo.isMoz||dojo.isSafari){if(B=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(B=="inserttable"){return true
}}}if(dojo.isSafari){if(B=="copy"){B="cut"
}else{if(B=="paste"){return true
}}}var A=(dojo.isIE)?this.document.selection.createRange():this.document;
return A.queryCommandEnabled(B)
},queryCommandState:function(A){A=this._normalizeCommand(A);
return this.document.queryCommandState(A)
},queryCommandValue:function(A){A=this._normalizeCommand(A);
if(dojo.isIE&&A=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(A)]
}return this.document.queryCommandValue(A)
},placeCursorAtStart:function(){this.focus();
var A=false;
if(dojo.isMoz){var B=this.editNode.firstChild;
while(B){if(B.nodeType==3){if(B.nodeValue.replace(/^\s+|\s+$/g,"").length>0){A=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B]);
break
}}else{if(B.nodeType==1){A=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[B]);
break
}}B=B.nextSibling
}}else{A=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(A){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var A=false;
if(dojo.isMoz){var B=this.editNode.lastChild;
while(B){if(B.nodeType==3){if(B.nodeValue.replace(/^\s+|\s+$/g,"").length>0){A=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B]);
break
}}else{if(B.nodeType==1){A=true;
if(B.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B])
}break
}}B=B.previousSibling
}}else{A=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(A){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
}},getValue:function(A){if(this.textarea){if(this.isClosed||!this.isLoaded){return this.textarea.value
}}return this._postFilterContent(null,A)
},setValue:function(A){if(this.textarea&&(this.isClosed||!this.isLoaded)){this.textarea.value=A
}else{A=this._preFilterContent(A);
if(this.isClosed){this.domNode.innerHTML=A;
this._preDomFilterContent(this.domNode)
}else{this.editNode.innerHTML=A;
this._preDomFilterContent(this.editNode)
}}},replaceValue:function(A){if(this.isClosed){this.setValue(A)
}else{if(this.window&&this.window.getSelection&&!dojo.isMoz){this.setValue(A)
}else{if(this.window&&this.window.getSelection){A=this._preFilterContent(A);
this.execCommand("selectall");
if(dojo.isMoz&&!A){A="&nbsp;"
}this.execCommand("inserthtml",A);
this._preDomFilterContent(this.editNode)
}else{if(this.document&&this.document.selection){this.setValue(A)
}}}}},_preFilterContent:function(B){var A=B;
dojo.forEach(this.contentPreFilters,function(C){if(C){A=C(A)
}});
return A
},_preDomFilterContent:function(A){A=A||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(B){if(B&&dojo.isFunction(B)){B(A)
}},this)
},_postFilterContent:function(C,B){C=C||this.editNode;
if(this.contentDomPostFilters.length){if(B&&C.cloneNode){C=C.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(D){C=D(C)
})
}var A=this.getNodeChildrenHtml(C);
if(!A.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){A=""
}dojo.forEach(this.contentPostFilters,function(D){A=D(A)
});
return A
},_saveContent:function(B){var A=dojo.byId("dijit._editor.RichText.savedContent");
A.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(A,B){A=A.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!B){A=A.replace(/'/gm,"&#39;")
}return A
},getNodeHtml:function(C){switch(C.nodeType){case 1:var B="<"+C.tagName.toLowerCase();
if(dojo.isMoz){if(C.getAttribute("type")=="_moz"){C.removeAttribute("type")
}if(C.getAttribute("_moz_dirty")!=undefined){C.removeAttribute("_moz_dirty")
}}var G=[];
if(dojo.isIE){var K=C.outerHTML;
K=K.substr(0,K.indexOf(">"));
K=K.replace(/(?:['"])[^"']*\1/g,"");
var A=/([^\s=]+)=/g;
var D,J;
while((D=A.exec(K))!=undefined){J=D[1];
if(J.substr(0,3)!="_dj"){if(J=="src"||J=="href"){if(C.getAttribute("_djrealurl")){G.push([J,C.getAttribute("_djrealurl")]);
continue
}}if(J=="class"){G.push([J,C.className])
}else{G.push([J,C.getAttribute(J)])
}}}}else{var F,E=0,I=C.attributes;
while((F=I[E++])){if(F.name.substr(0,3)!="_dj"){var H=F.value;
if(F.name=="src"||F.name=="href"){if(C.getAttribute("_djrealurl")){H=C.getAttribute("_djrealurl")
}}G.push([F.name,H])
}}}G.sort(function(M,L){return M[0]<L[0]?-1:(M[0]==L[0]?0:1)
});
E=0;
while((F=G[E++])){B+=" "+F[0]+'="'+F[1]+'"'
}if(C.childNodes.length){B+=">"+this.getNodeChildrenHtml(C)+"</"+C.tagName.toLowerCase()+">"
}else{B+=" />"
}break;
case 3:var B=this.escapeXml(C.nodeValue,true);
break;
case 8:var B="<!--"+this.escapeXml(C.nodeValue,true)+"-->";
break;
default:var B="Element not recognized - Type: "+C.nodeType+" Name: "+C.nodeName
}return B
},getNodeChildrenHtml:function(E){var B="";
if(!E){return B
}var A=E.childNodes||E;
var C=0;
var D;
while((D=A[C++])){B+=this.getNodeHtml(D)
}return B
},close:function(save,force){if(this.isClosed){return false
}if(!arguments.length){save=true
}this._content=this.getValue();
var changed=(this.savedContent!=this._content);
if(this.interval){clearInterval(this.interval)
}if(this.textarea){with(this.textarea.style){position="";
left=top="";
if(dojo.isIE){overflow=this.__overflow;
this.__overflow=null
}}if(save){this.textarea.value=this._content
}else{this.textarea.value=this.savedContent
}dojo._destroyElement(this.domNode);
this.domNode=this.textarea
}else{if(save){this.domNode.innerHTML=this._content
}else{this.domNode.innerHTML=this.savedContent
}}dojo.removeClass(this.domNode,"RichTextEditable");
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
if(this.window&&this.window._frameElement){this.window._frameElement=null
}this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
return changed
},destroyRendering:function(){},destroy:function(){this.destroyRendering();
if(!this.isClosed){this.close(false)
}this.inherited("destroy",arguments)
},_fixContentForMoz:function(A){A=A.replace(/<(\/)?strong([ \>])/gi,"<$1b$2");
A=A.replace(/<(\/)?em([ \>])/gi,"<$1i$2");
return A
},_srcInImgRegex:/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,_hrefInARegex:/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,_preFixUrlAttributes:function(A){A=A.replace(this._hrefInARegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
A=A.replace(this._srcInImgRegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
return A
}})
}if(!dojo._hasResource["dijit.Toolbar"]){dojo._hasResource["dijit.Toolbar"]=true;
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\r\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\r\n\t><div class=\'dijitRight\'\r\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\r\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\r\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \r\n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \r\n\t\t\t></span\r\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\r\n\t\t></button\r\n\t></div\r\n></div>\r\n',_onClick:function(A){if(this.disabled){return false
}this._clicked();
return this.onClick(A)
},_onButtonClick:function(D){dojo.stopEvent(D);
var C=this._onClick(D)!==false;
if(this.type=="submit"&&C){for(var A=this.domNode;
A;
A=A.parentNode){var B=dijit.byNode(A);
if(B&&B._onSubmit){B._onSubmit(D);
break
}if(A.tagName.toLowerCase()=="form"){if(!A.onsubmit||A.onsubmit()){A.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var A="";
this.label=this.containerNode.innerHTML;
A=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=A;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(A){return true
},_clicked:function(A){},setLabel:function(A){this.containerNode.innerHTML=this.label=A;
if(dojo.isMozilla){var B=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var C=this;
setTimeout(function(){C.domNode.style.display=B
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\r\n\t><div class=\'dijitRight\'>\r\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\r\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\r\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\r\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\r\n\t\tid="${id}_label">${label}</span\r\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\r\n\t</button>\r\n</div></div>\r\n',_fillContent:function(){if(this.srcNodeRef){var A=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var A=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(A);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(A){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(B){var A=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!A||B.detail!=0||this._seenKeydown){this._onArrowClick(B)
}this._seenKeydown=false
},_onDropDownKeydown:function(A){this._seenKeydown=true
},_onDropDownBlur:function(A){this._seenKeydown=false
},_onKey:function(A){if(this.disabled){return 
}if(A.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(A);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var C=this.dropDown;
if(!C){return false
}if(!C.isShowingNow){if(C.href&&!C.isLoaded){var A=this;
var B=dojo.connect(C,"onLoad",function(){dojo.disconnect(B);
A._openDropDown()
});
C._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var E=this.dropDown;
var B=E.domNode.style.width;
var C=this;
dijit.popup.open({parent:this,popup:E,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){C._closeDropDown(true)
},onCancel:function(){C._closeDropDown(true)
},onClose:function(){E.domNode.style.width=B;
C.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>E.domNode.offsetWidth){var D=null;
if(!this.isLeftToRight()){D=E.domNode.parentNode;
var A=D.offsetLeft+D.offsetWidth
}dojo.marginBox(E.domNode,{w:this.domNode.offsetWidth});
if(D){D.style.left=A-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(E.focus){E.focus()
}},_closeDropDown:function(A){if(this._opened){dijit.popup.close(this.dropDown);
if(A){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\r\n\tcellspacing=\'0\' cellpadding=\'0\'\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\r\n\t<tr>\r\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\r\n\t\t\ttabIndex="${tabIndex}"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\r\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\r\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\r\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\r\n\t\t</td>\r\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\r\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\r\n\t\t\tstateModifier="DownArrow"\r\n\t\t\ttitle="${optionsTitle}" name="${name}"\r\n\t\t\twaiRole="button" waiState="haspopup-true"\r\n\t\t><div waiRole="presentation">&#9660;</div>\r\n\t</td></tr>\r\n</table>\r\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(A){if(dojo.isIE){this.connect(A,"onactivate",this._onNodeFocus)
}else{this.connect(A,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(A){this._focusedNode=A;
dijit.focus(A)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(A){this._focusedNode=A.currentTarget
},_onBlur:function(A){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(A){this.setChecked(!this.checked)
},setChecked:function(A){this.checked=A;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(A)
}})
}if(!dojo._hasResource["dijit._editor._Plugin"]){dojo._hasResource["dijit._editor._Plugin"]=true;
dojo.provide("dijit._editor._Plugin");
dojo.declare("dijit._editor._Plugin",null,{constructor:function(A,B){if(A){dojo.mixin(this,A)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var A=this.editor.commands[this.command];
var C="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var B={label:A,showLabel:false,iconClass:C,dropDown:this.dropDown};
this.button=new this.buttonClass(B)
}}},updateState:function(){var A=this.editor;
var B=this.command;
if(!A){return 
}if(!A.isLoaded){return 
}if(!B.length){return 
}if(this.button){try{var C=A.queryCommandEnabled(B);
this.button.setDisabled(!C);
if(this.button.setChecked){this.button.setChecked(A.queryCommandState(B))
}}catch(D){console.debug(D)
}}},setEditor:function(A){this.editor=A;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){dojo.connect(this.button,"onClick",dojo.hitch(this.editor,"execCommand",this.command,this.commandArg))
}dojo.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(A){if(this.button){A.addChild(this.button)
}}})
}if(!dojo._hasResource["dijit.Editor"]){dojo._hasResource["dijit.Editor"]=true;
dojo.provide("dijit.Editor");
dojo.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull"];
this._plugins=[];
this._editInterval=this.editActionInterval*1000
},postCreate:function(){if(this.customUndo){dojo.require("dijit._editor.range");
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0)
}if(dojo.isArray(this.extraPlugins)){this.plugins=this.plugins.concat(this.extraPlugins)
}dijit.Editor.superclass.postCreate.apply(this,arguments);
this.commands=dojo.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){var A=dojo.doc.createElement("div");
dojo.place(A,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},A)
}dojo.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){dojo.forEach(this._plugins,function(A){if(A.destroy){A.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(D,C){var B=dojo.isString(D)?{name:D}:D;
if(!B.setEditor){var E={args:B,plugin:null,editor:this};
dojo.publish("dijit.Editor.getPlugin",[E]);
if(!E.plugin){var A=dojo.getObject(B.name);
if(A){E.plugin=new A(B)
}}if(!E.plugin){console.debug("Cannot find plugin",D);
return 
}D=E.plugin
}if(arguments.length>1){this._plugins[C]=D
}else{this._plugins.push(D)
}D.setEditor(this);
if(dojo.isFunction(D.setToolbar)){D.setToolbar(this.toolbar)
}},customUndo:dojo.isIE,editActionInterval:3,beginEditing:function(A){if(!this._inEditing){this._inEditing=true;
this._beginEditing(A)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(dojo.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(E){if(this.customUndo&&(E=="undo"||E=="redo")){return this[E]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var D=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return D
}catch(F){if(dojo.isMoz&&/copy|cut|paste/.test(E)){var C=dojo.string.substitute,A={cut:"X",copy:"C",paste:"V"},B=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(C(this.commands.systemShortcutFF,[this.commands[E],C(this.commands[B?"appleKey":"ctrlKey"],[A[E]])]))
}return false
}}},queryCommandEnabled:function(A){if(this.customUndo&&(A=="undo"||A=="redo")){return A=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(E,D){this.setValue(D.text);
var A=D.bookmark;
if(!A){return 
}if(dojo.isIE){if(dojo.isArray(A)){var B=[];
dojo.forEach(A,function(F){B.push(dijit.range.getNode(F,this.editNode))
},this);
A=B
}}else{var C=dijit.range.create();
C.setStart(dijit.range.getNode(A.startContainer,this.editNode),A.startOffset);
C.setEnd(dijit.range.getNode(A.endContainer,this.editNode),A.endOffset);
A=C
}dojo.withGlobal(this.window,"moveToBookmark",dijit,[A])
},undo:function(){this.endEditing(true);
var A=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(A,this._steps[this._steps.length-1]);
this._undoedSteps.push(A);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var A=this._undoedSteps.pop();
if(A&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],A);
this._steps.push(A);
this.onDisplayChanged();
return true
}return false
},endEditing:function(A){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(A);
this._inEditing=false
}},_getBookmark:function(){var A=dojo.withGlobal(this.window,dijit.getBookmark);
if(dojo.isIE){if(dojo.isArray(A)){var B=[];
dojo.forEach(A,function(C){B.push(dijit.range.getIndex(C,this.editNode).o)
},this);
A=B
}}else{var B=dijit.range.getIndex(A.startContainer,this.editNode).o;
A={startContainer:B,startOffset:A.startOffset,endContainer:A.endContainer===A.startContainer?B:dijit.range.getIndex(A.endContainer,this.editNode).o,endOffset:A.endOffset}
}return A
},_beginEditing:function(A){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(B){var A=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:A,bookmark:this._getBookmark()})
},onKeyDown:function(B){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var A=B.keyCode,C=dojo.keys;
if(B.ctrlKey){if(A===90||A===122){dojo.stopEvent(B);
this.undo();
return 
}else{if(A===89||A===121){dojo.stopEvent(B);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(A){case C.ENTER:this.beginEditing();
break;
case C.BACKSPACE:case C.DELETE:this.beginEditing();
break;
case 88:case 86:if(B.ctrlKey&&!B.altKey&&!B.metaKey){this.endEditing();
if(B.keyCode==88){this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1)
}break
}default:if(!B.ctrlKey&&!B.altKey&&!B.metaKey&&(B.keyCode<dojo.keys.F1||B.keyCode>dojo.keys.F15)){this.beginEditing();
break
}case C.ALT:this.endEditing();
break;
case C.UP_ARROW:case C.DOWN_ARROW:case C.LEFT_ARROW:case C.RIGHT_ARROW:case C.HOME:case C.END:case C.PAGE_UP:case C.PAGE_DOWN:this.endEditing(true);
break;
case C.CTRL:case C.SHIFT:case C.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
dojo.subscribe("dijit.Editor.getPlugin",null,function(E){if(E.plugin){return 
}var C=E.args,D;
var A=dijit._editor._Plugin;
var B=C.name;
switch(B){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":D=new A({command:B});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":D=new A({buttonClass:dijit.form.ToggleButton,command:B});
break;
case"|":D=new A({button:new dijit.ToolbarSeparator()});
break;
case"createLink":D=new dijit._editor.plugins.LinkDialog({command:B});
break;
case"foreColor":case"hiliteColor":D=new dijit._editor.plugins.TextColor({command:B});
break;
case"fontName":case"fontSize":case"formatBlock":D=new dijit._editor.plugins.FontChoice({command:B})
}E.plugin=D
})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(A){A.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(A){},_moveToPopup:function(A){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(A)
}},_onKeyPress:function(A){if(A.ctrlKey||A.altKey){return 
}switch(A.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(A);
dojo.stopEvent(A);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(A)
}break
}},onItemHover:function(A){this.focusChild(A);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(A){dijit.popup.close(A.popup);
A._blur();
this._stopPopupTimer()
},onItemUnhover:function(A){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var A=this;
A.parentMenu;
A=A.parentMenu){}return A
},onItemClick:function(A){if(A.disabled){return false
}if(A.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
A.onClick()
}},_iframeContentWindow:function(A){var B=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(A))||dijit.Menu._iframeContentDocument(A)["__parent__"]||(A.name&&document.frames[A.name])||null;
return B
},_iframeContentDocument:function(A){var B=A.contentDocument||(A.contentWindow&&A.contentWindow.document)||(A.name&&document.frames[A.name]&&document.frames[A.name].document)||null;
return B
},bindDomNode:function(A){A=dojo.byId(A);
var B=dijit.getDocumentWindow(A.ownerDocument);
if(A.tagName.toLowerCase()=="iframe"){B=this._iframeContentWindow(A);
A=dojo.withGlobal(B,dojo.body)
}var C=(A==dojo.body()?dojo.doc:A);
A[this.id]=this._bindings.push([dojo.connect(C,"oncontextmenu",this,"_openMyself"),dojo.connect(C,"onkeydown",this,"_contextKey"),dojo.connect(C,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(D){var C=dojo.byId(D);
var B=C[this.id]-1,A=this._bindings[B];
dojo.forEach(A,dojo.disconnect);
delete this._bindings[B]
},_contextKey:function(B){this._contextMenuWithMouse=false;
if(B.keyCode==dojo.keys.F10){dojo.stopEvent(B);
if(B.shiftKey&&B.type=="keydown"){var A={target:B.target,pageX:B.pageX,pageY:B.pageY};
A.preventDefault=A.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(A)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(F){dojo.stopEvent(F);
var A,G;
if(dojo.isSafari||this._contextMenuWithMouse){A=F.pageX;
G=F.pageY
}else{var E=dojo.coords(F.target,true);
A=E.x+10;
G=E.y+10
}var C=this;
var B=dijit.getFocus(this);
function D(){dijit.focus(B);
dijit.popup.close(C)
}dijit.popup.open({popup:this,x:A,y:G,onExecute:D,onCancel:D,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(A){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var A=this.focusedChild;
var B=A.popup;
if(B.isShowingNow){return 
}B.parentMenu=this;
var C=this;
dijit.popup.open({parent:this,popup:B,around:A.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(B);
A.focus();
C.currentPopup=null
}});
this.currentPopup=B;
if(B.focus){B.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(A){this.getParent().onItemClick(this);
dojo.stopEvent(A)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(A){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(A){this.disabled=A;
dojo[A?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",A?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var A=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var A=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(A)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(B,A){return B.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(A&&A.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(B,E,D){if(!(B instanceof Array)){return E(B)
}var A=[];
for(var C=0;
C<B.length;
C++){A.push(E(B[C]))
}return dojo.regexp.group(A.join("|"),D)
};
dojo.regexp.group=function(B,A){return"("+(A?"?:":"")+B+")"
}
}if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.number.format=function(E,C){C=dojo.mixin({},C||{});
var A=dojo.i18n.normalizeLocale(C.locale);
var B=dojo.i18n.getLocalization("dojo.cldr","number",A);
C.customs=B;
var D=C.pattern||B[(C.type||"decimal")+"Format"];
if(isNaN(E)){return null
}return dojo.number._applyPattern(E,D,C)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(F,E,I){I=I||{};
var G=I.customs.group;
var B=I.customs.decimal;
var A=E.split(";");
var H=A[0];
E=A[(F<0)?1:0]||("-"+H);
if(E.indexOf("%")!=-1){F*=100
}else{if(E.indexOf("\u2030")!=-1){F*=1000
}else{if(E.indexOf("\u00a4")!=-1){G=I.customs.currencyGroup||G;
B=I.customs.currencyDecimal||B;
E=E.replace(/\u00a4{1,3}/,function(J){var K=["symbol","currency","displayName"][J.length-1];
return I[K]||I.currency||""
})
}else{if(E.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var D=dojo.number._numberPatternRE;
var C=H.match(D);
if(!C){throw new Error("unable to find a number expression in pattern: "+E)
}return E.replace(D,dojo.number._formatAbsolute(F,C[0],{decimal:B,group:G,places:I.places}))
};
dojo.number.round=function(F,B,A){var E=String(F).split(".");
var D=(E[1]&&E[1].length)||0;
if(D>B){var C=Math.pow(10,B);
if(A>0){C*=10/A;
B++
}F=Math.round(F*C)/C;
E=String(F).split(".");
D=(E[1]&&E[1].length)||0;
if(D>B){E[1]=E[1].substr(0,B);
F=Number(E.join("."))
}}return F
};
dojo.number._formatAbsolute=function(L,J,Q){Q=Q||{};
if(Q.places===true){Q.places=0
}if(Q.places===Infinity){Q.places=6
}var C=J.split(".");
var P=(Q.places>=0)?Q.places:(C[1]&&C[1].length)||0;
if(!(Q.round<0)){L=dojo.number.round(L,P,Q.round)
}var I=String(Math.abs(L)).split(".");
var G=I[1]||"";
if(Q.places){I[1]=dojo.string.pad(G.substr(0,Q.places),Q.places,"0",true)
}else{if(C[1]&&Q.places!==0){var F=C[1].lastIndexOf("0")+1;
if(F>G.length){I[1]=dojo.string.pad(G,F,"0",true)
}var A=C[1].length;
if(A<G.length){I[1]=G.substr(0,A)
}}else{if(I[1]){I.pop()
}}}var N=C[0].replace(",","");
F=N.indexOf("0");
if(F!=-1){F=N.length-F;
if(F>I[0].length){I[0]=dojo.string.pad(I[0],F)
}if(N.indexOf("#")==-1){I[0]=I[0].substr(I[0].length-F)
}}var H=C[0].lastIndexOf(",");
var M,B;
if(H!=-1){M=C[0].length-H-1;
var O=C[0].substr(0,H);
H=O.lastIndexOf(",");
if(H!=-1){B=O.length-H-1
}}var E=[];
for(var K=I[0];
K;
){var D=K.length-M;
E.push((D>0)?K.substr(D):K);
K=(D>0)?K.slice(0,D):"";
if(B){M=B;
delete B
}}I[0]=E.reverse().join(Q.group||",");
return I.join(Q.decimal||".")
};
dojo.number.regexp=function(A){return dojo.number._parseInfo(A).regexp
};
dojo.number._parseInfo=function(I){I=I||{};
var F=dojo.i18n.normalizeLocale(I.locale);
var J=dojo.i18n.getLocalization("dojo.cldr","number",F);
var D=I.pattern||J[(I.type||"decimal")+"Format"];
var G=J.group;
var C=J.decimal;
var E=1;
if(D.indexOf("%")!=-1){E/=100
}else{if(D.indexOf("\u2030")!=-1){E/=1000
}else{var B=D.indexOf("\u00a4")!=-1;
if(B){G=J.currencyGroup||G;
C=J.currencyDecimal||C
}}}var A=D.split(";");
if(A.length==1){A.push("-"+A[0])
}var H=dojo.regexp.buildGroupRE(A,function(K){K="(?:"+dojo.regexp.escapeString(K,".")+")";
return K.replace(dojo.number._numberPatternRE,function(P){var M={signed:false,separator:I.strict?G:[G,""],fractional:I.fractional,decimal:C,exponent:false};
var O=P.split(".");
var N=I.places;
if(O.length==1||N===0){M.fractional=false
}else{if(typeof N=="undefined"){N=O[1].lastIndexOf("0")+1
}if(N&&I.fractional==undefined){M.fractional=true
}if(!I.places&&(N<O[1].length)){N+=","+O[1].length
}M.places=N
}var L=O[0].split(",");
if(L.length>1){M.groupSize=L.pop().length;
if(L.length>1){M.groupSize2=L.pop().length
}}return"("+dojo.number._realNumberRegexp(M)+")"
})
},true);
if(B){H=H.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(K,M,N,O){var P=["symbol","currency","displayName"][N.length-1];
var L=dojo.regexp.escapeString(I[P]||I.currency||"");
M=M?"\\s":"";
O=O?"\\s":"";
if(!I.strict){if(M){M+="*"
}if(O){O+="*"
}return"(?:"+M+L+O+")?"
}return M+L+O
})
}return{regexp:H.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:G,decimal:C,factor:E}
};
dojo.number.parse=function(D,A){var C=dojo.number._parseInfo(A);
var B=(new RegExp("^"+C.regexp+"$")).exec(D);
if(!B){return NaN
}var E=B[1];
if(!B[1]){if(!B[2]){return NaN
}E=B[2];
C.factor*=-1
}E=E.replace(new RegExp("["+C.group+"\\s\\xa0]","g"),"").replace(C.decimal,".");
return Number(E)*C.factor
};
dojo.number._realNumberRegexp=function(A){A=A||{};
if(typeof A.places=="undefined"){A.places=Infinity
}if(typeof A.decimal!="string"){A.decimal="."
}if(typeof A.fractional=="undefined"||/^0/.test(A.places)){A.fractional=[true,false]
}if(typeof A.exponent=="undefined"){A.exponent=[true,false]
}if(typeof A.eSigned=="undefined"){A.eSigned=[true,false]
}var B=dojo.number._integerRegexp(A);
var E=dojo.regexp.buildGroupRE(A.fractional,function(G){var F="";
if(G&&(A.places!==0)){F="\\"+A.decimal;
if(A.places==Infinity){F="(?:"+F+"\\d+)?"
}else{F+="\\d{"+A.places+"}"
}}return F
},true);
var C=dojo.regexp.buildGroupRE(A.exponent,function(F){if(F){return"([eE]"+dojo.number._integerRegexp({signed:A.eSigned})+")"
}return""
});
var D=B+E;
if(E){D="(?:(?:"+D+")|(?:"+E+"))"
}return D+C
};
dojo.number._integerRegexp=function(A){A=A||{};
if(typeof A.signed=="undefined"){A.signed=[true,false]
}if(typeof A.separator=="undefined"){A.separator=""
}else{if(typeof A.groupSize=="undefined"){A.groupSize=3
}}var B=dojo.regexp.buildGroupRE(A.signed,function(D){return D?"[-+]":""
},true);
var C=dojo.regexp.buildGroupRE(A.separator,function(F){if(!F){return"(?:0|[1-9]\\d*)"
}F=dojo.regexp.escapeString(F);
if(F==" "){F="\\s"
}else{if(F=="\xa0"){F="\\s\\xa0"
}}var D=A.groupSize,E=A.groupSize2;
if(E){var G="(?:0|[1-9]\\d{0,"+(E-1)+"}(?:["+F+"]\\d{"+E+"})*["+F+"]\\d{"+D+"})";
return((D-E)>0)?"(?:"+G+"|(?:0|[1-9]\\d{0,"+(D-1)+"}))":G
}return"(?:0|[1-9]\\d{0,"+(D-1)+"}(?:["+F+"]\\d{"+D+"})*)"
},true);
return B+C
}
}if(!dojo._hasResource["dijit.ProgressBar"]){dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(A){dojo.mixin(this,A||{});
var B=1,C;
if(this.indeterminate){C="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{C="removeClass";
if(String(this.progress).indexOf("%")!=-1){B=Math.min(parseFloat(this.progress)/100,1);
this.progress=B*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
B=this.progress/this.maximum
}var D=this.report(B);
this.label.firstChild.nodeValue=D;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}dojo[C](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(B*100)+"%";
this.onChange()
},report:function(A){return dojo.number.format(A,{type:"percent",places:this.places,locale:this.lang})
},onChange:function(){}})
}if(!dojo._hasResource["dijit.TitlePane"]){dojo._hasResource["dijit.TitlePane"]=true;
dojo.provide("dijit.TitlePane");
dojo.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated],{title:"",open:true,duration:250,baseClass:"dijitTitlePane",templateString:'<div class="dijitTitlePane">\r\n\t<div dojoAttachEvent="onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus" tabindex="0"\r\n\t\t\twaiRole="button" class="dijitTitlePaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<div dojoAttachPoint="arrowNode" class="dijitInline dijitArrowNode"><span dojoAttachPoint="arrowNodeInner" class="dijitArrowNodeInner"></span></div>\r\n\t\t<div dojoAttachPoint="titleNode" class="dijitTitlePaneTextNode"></div>\r\n\t</div>\r\n\t<div class="dijitTitlePaneContentOuter" dojoAttachPoint="hideNode">\r\n\t\t<div class="dijitReset" dojoAttachPoint="wipeNode">\r\n\t\t\t<div class="dijitTitlePaneContentInner" dojoAttachPoint="containerNode" waiRole="region" tabindex="-1">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn\'t work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setTitle(this.title);
if(!this.open){this.hideNode.style.display=this.wipeNode.style.display="none"
}this._setCss();
dojo.setSelectable(this.titleNode,false);
this.inherited("postCreate",arguments);
dijit.setWaiState(this.containerNode,"labelledby",this.titleNode.id);
dijit.setWaiState(this.focusNode,"haspopup","true");
var B=this.hideNode,A=this.wipeNode;
this._wipeIn=dojo.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){B.style.display=""
}});
this._wipeOut=dojo.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){B.style.display="none"
}})
},setContent:function(A){if(this._wipeOut.status()=="playing"){this.inherited("setContent",arguments)
}else{if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}dojo.marginBox(this.wipeNode,{h:dojo.marginBox(this.wipeNode).h});
this.inherited("setContent",arguments);
this._wipeIn.play()
}},toggle:function(){dojo.forEach([this._wipeIn,this._wipeOut],function(A){if(A.status()=="playing"){A.stop()
}});
this[this.open?"_wipeOut":"_wipeIn"].play();
this.open=!this.open;
this._loadCheck();
this._setCss()
},_setCss:function(){var A=["dijitClosed","dijitOpen"];
var B=this.open;
dojo.removeClass(this.focusNode,A[!B+0]);
this.focusNode.className+=" "+A[B+0];
this.arrowNodeInner.innerHTML=this.open?"-":"+"
},_onTitleKey:function(A){if(A.keyCode==dojo.keys.ENTER||A.charCode==dojo.keys.SPACE){this.toggle()
}else{if(A.keyCode==dojo.keys.DOWN_ARROW){if(this.open){this.containerNode.focus();
A.preventDefault()
}}}},_handleFocus:function(A){dojo[(A.type=="focus"?"addClass":"removeClass")](this.focusNode,this.baseClass+"Focused")
},setTitle:function(A){this.titleNode.innerHTML=A
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\r\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\r\n\t<div class="dijitTooltipConnector"></div>\r\n</div>\r\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(D,A){if(this.aroundNode&&this.aroundNode===A){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=D;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var C=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var B=dijit.placeOnScreenAroundElement(this.domNode,A,C);
this.domNode.className="dijitTooltip dijitTooltip"+(B.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=A
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(A){if(!this.aroundNode||this.aroundNode!==A){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(B,A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(B,A)
};
dijit.hideTooltip=function(A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(A)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(B){var A=dojo.byId(B);
if(A){this._connectNodes.push(A);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(C){this.connect(A,C.toLowerCase(),"_"+C)
},this);
if(dojo.isIE){A.style.zoom=1
}}},this)
},_onMouseOver:function(A){this._onHover(A)
},_onMouseOut:function(A){if(dojo.isDescendant(A.relatedTarget,A.target)){return 
}this._onUnHover(A)
},_onFocus:function(A){this._focus=true;
this._onHover(A)
},_onBlur:function(A){this._focus=false;
this._onUnHover(A)
},_onHover:function(B){if(!this._showTimer){var A=B.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(A)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,A);
this._connectNode=A
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dojo.cookie"]){dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(C,E,D){var H=document.cookie;
if(arguments.length==1){var A=H.lastIndexOf(C+"=");
if(A==-1){return null
}var G=A+C.length+1;
var B=H.indexOf(";",A+C.length+1);
if(B==-1){B=H.length
}return decodeURIComponent(H.substring(G,B))
}else{D=D||{};
E=encodeURIComponent(E);
if(typeof (D.expires)=="number"){var F=new Date();
F.setTime(F.getTime()+(D.expires*24*60*60*1000));
D.expires=F
}document.cookie=C+"="+E+(D.expires?"; expires="+D.expires.toUTCString():"")+(D.path?"; path="+D.path:"")+(D.domain?"; domain="+D.domain:"")+(D.secure?"; secure":"");
return null
}}
}if(!dojo._hasResource["dijit.Tree"]){dojo._hasResource["dijit.Tree"]=true;
dojo.provide("dijit.Tree");
dojo.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:'<div class="dijitTreeNode dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t></span\r\n\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t></span\r\n\t>\r\n\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="-1"></span>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setLabelNode(this.label);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){dijit.setWaiState(this.labelNode,"expanded",this.isExpanded)
}},markProcessing:function(){this.state="LOADING";
this._setExpando(true)
},unmarkProcessing:function(){this._setExpando(false)
},_updateItemClasses:function(A){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(A);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(A)
},_updateLayout:function(){var A=this.getParent();
if(A&&A.isTree&&A._hideRoot){dojo.addClass(this.domNode,"dijitTreeIsRoot")
}else{dojo.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(C){var B=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var A=C?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.forEach(B,function(D){dojo.removeClass(this.expandoNode,D)
},this);
dojo.addClass(this.expandoNode,B[A]);
this.expandoNodeText.innerHTML=C?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
},expand:function(){if(this.isExpanded){return 
}if(this._wipeOut.status()=="playing"){this._wipeOut.stop()
}this.isExpanded=true;
dijit.setWaiState(this.labelNode,"expanded","true");
dijit.setWaiRole(this.containerNode,"group");
this._setExpando();
this._wipeIn.play()
},collapse:function(){if(!this.isExpanded){return 
}if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}this.isExpanded=false;
dijit.setWaiState(this.labelNode,"expanded","false");
this._setExpando();
this._wipeOut.play()
},setLabelNode:function(A){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(A))
},_setChildren:function(D){this.destroyDescendants();
this.state="LOADED";
var C={};
if(D&&D.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}dojo.forEach(D,function(F){var G=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(F.item)},F));
this.addChild(G);
var E=this.tree.store.getIdentity(F.item);
C[E]=G;
if(this.tree.persist){if(this.tree._openedItemIds[E]){this.tree._expandNode(G)
}}},this);
dojo.forEach(this.getChildren(),function(F,E){F._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var B=this.getChildren()[0];
var A=B?B.labelNode:this.domNode;
A.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return C
},_addChildren:function(B){var A={};
if(B&&B.length>0){dojo.forEach(B,function(C){var D=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(C.item)},C));
this.addChild(D);
A[this.tree.store.getIdentity(C.item)]=D
},this);
dojo.forEach(this.getChildren(),function(D,C){D._updateLayout()
})
}return A
},deleteNode:function(B){B.destroy();
var A=this.getChildren();
if(A.length==0){this.isExpandable=false;
this.collapse()
}dojo.forEach(A,function(C){C._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
dojo.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(A,B){dojo.publish(this.id,[dojo.mixin({tree:this,event:A},B||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var B=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(B){dojo.forEach(B.split(","),function(E){this._openedItemIds[E]=true
},this)
}}var D=document.createElement("div");
D.style.display="none";
D.className="dijitTreeContainer";
dijit.setWaiRole(D,"presentation");
this.containerNodeTemplate=D;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(dojo.isString(this.dndController)){this.dndController=dojo.getObject(this.dndController)
}var C={};
for(var A=0;
A<this.dndParams.length;
A++){if(this[this.dndParams[A]]){C[this.dndParams[A]]=this[this.dndParams[A]]
}}this.dndController=new this.dndController(this,C)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(A){return dojo.some(this.childrenAttr,function(B){return this.store.hasAttribute(A,B)
},this)
},getItemChildren:function(B,F){var C=this.store;
if(B==null){C.fetch({query:this.query,onComplete:F})
}else{var G=[];
for(var E=0;
E<this.childrenAttr.length;
E++){G=G.concat(C.getValues(B,this.childrenAttr[E]))
}var A=0;
dojo.forEach(G,function(H){if(!C.isItemLoaded(H)){A++
}});
if(A==0){F(G)
}else{function D(H){if(--A==0){F(G)
}}dojo.forEach(G,function(H){if(!C.isItemLoaded(H)){C.loadItem({item:H,onItem:D})
}})
}}},getItemParentIdentity:function(B,A){return this.store.getIdentity(A.item)
},getLabel:function(A){return this.store.getLabel(A)
},getIconClass:function(A){},getLabelClass:function(A){},_onLoadAllItems:function(B,A){var C=dojo.map(A,function(D){return{item:D,isExpandable:this.mayHaveChildren(D)}
},this);
dojo.mixin(this._itemNodeMap,B._setChildren(C));
this._expandNode(B)
},_onKeyPress:function(C){if(C.altKey){return 
}var A=dijit.getEnclosingWidget(C.target);
if(!A){return 
}if(C.charCode){var D=C.charCode;
if(!C.altKey&&!C.ctrlKey&&!C.shiftKey&&!C.metaKey){D=(String.fromCharCode(D)).toLowerCase();
this._onLetterKeyNav({node:A,key:D});
dojo.stopEvent(C)
}}else{var B=this._keyHandlerMap;
if(!B){B={};
B[dojo.keys.ENTER]="_onEnterKey";
B[dojo.keys.LEFT_ARROW]="_onLeftArrow";
B[dojo.keys.RIGHT_ARROW]="_onRightArrow";
B[dojo.keys.UP_ARROW]="_onUpArrow";
B[dojo.keys.DOWN_ARROW]="_onDownArrow";
B[dojo.keys.HOME]="_onHomeKey";
B[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=B
}if(this._keyHandlerMap[C.keyCode]){this[this._keyHandlerMap[C.keyCode]]({node:A,item:A.item});
dojo.stopEvent(C)
}}},_onEnterKey:function(A){this._publish("execute",{item:A.item,node:A.node});
this.onClick(A.item,A.node)
},_onDownArrow:function(B){var A=this._navToNextNode(B.node);
if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onUpArrow:function(F){var A=F.node;
var D=A;
var E=A.getPreviousSibling();
if(E){A=E;
while(A.isExpandable&&A.isExpanded&&A.hasChildren()){D=A;
var B=A.getChildren();
A=B[B.length-1]
}}else{var C=A.getParent();
if(!(this._hideRoot&&C===this)){A=C
}}if(A&&A.isTreeNode){D=A
}if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onRightArrow:function(C){var A=C.node;
var B=A;
if(A.isExpandable&&!A.isExpanded){this._expandNode(A)
}else{if(A.hasChildren()){A=A.getChildren()[0]
}}if(A&&A.isTreeNode){B=A
}if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onLeftArrow:function(C){var B=C.node;
var A=B;
if(B.isExpandable&&B.isExpanded){this._collapseNode(B)
}else{B=B.getParent()
}if(B&&B.isTreeNode){A=B
}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onHomeKey:function(){var A=this._navToRootOrFirstNode();
if(A){A.tree.focusNode(A);
return A
}},_onEndKey:function(C){var A=C.node.tree;
var B=A;
while(B.isExpanded){var D=B.getChildren();
B=D[D.length-1];
if(B.isTreeNode){A=B
}}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onLetterKeyNav:function(C){var B=startNode=C.node;
var A=C.key;
do{B=this._navToNextNode(B);
if(!B){B=this._navToRootOrFirstNode()
}}while(B!==startNode&&(B.label.charAt(0).toLowerCase()!=A));
if(B&&B.isTreeNode){if(B!==startNode){B.tree.focusNode(B)
}return B
}},_onClick:function(B){var C=B.target;
var A=dijit.getEnclosingWidget(C);
if(!A||!A.isTreeNode){return 
}if(C==A.expandoNode||C==A.expandoNodeText){if(A.isExpandable){this._onExpandoClick({node:A})
}}else{this._publish("execute",{item:A.item,node:A});
this.onClick(A.item,A);
this.focusNode(A)
}dojo.stopEvent(B)
},_onExpandoClick:function(B){var A=B.node;
if(A.isExpanded){this._collapseNode(A)
}else{this._expandNode(A)
}},onClick:function(B,A){},_navToNextNode:function(B){var A;
if(B.isExpandable&&B.isExpanded&&B.hasChildren()){A=B.getChildren()[0]
}else{while(B&&B.isTreeNode){A=B.getNextSibling();
if(A){break
}B=B.getParent()
}}return A
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var A=this.getChildren()[0];
if(A&&A.isTreeNode){return A
}}},_collapseNode:function(A){if(A.isExpandable){if(A.state=="LOADING"){return 
}if(this.lastFocused){if(dojo.isDescendant(this.lastFocused.domNode,A.domNode)){this.focusNode(A)
}else{this.focusNode(this.lastFocused)
}}A.collapse();
if(this.persist&&A.item){delete this._openedItemIds[this.store.getIdentity(A.item)];
this._saveState()
}}},_expandNode:function(D){var C=D.tree;
if(C.lastFocused){C.focusNode(C.lastFocused)
}if(!D.isExpandable){return 
}var B=this.store;
var A=this.store.getValue;
switch(D.state){case"LOADING":return ;
case"UNCHECKED":D.markProcessing();
var F=this;
var E=function(G){D.unmarkProcessing();
F._onLoadAllItems(D,G)
};
this.getItemChildren(D.item,E);
break;
default:if(D.expand){D.expand();
if(this.persist&&D.item){this._openedItemIds[this.store.getIdentity(D.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var B=this.lastFocused;
if(!B){return 
}var A=B.labelNode;
dojo.removeClass(A,"dijitTreeLabelFocused");
A.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(A){A.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var A=this.lastFocused.labelNode;
dojo.removeClass(A,"dijitTreeLabelFocused")
}},_onTreeFocus:function(A){var C=dijit.getEnclosingWidget(A.target);
if(C!=this.lastFocused){this.blurNode()
}var B=C.labelNode;
B.setAttribute("tabIndex","0");
dojo.addClass(B,"dijitTreeLabelFocused");
this.lastFocused=C
},_onNewItem:function(D,A){var E;
if(A){var C=this._itemNodeMap[this.getItemParentIdentity(D,A)];
if(!C||dojo.indexOf(this.childrenAttr,A.attribute)==-1){return 
}}var F={item:D,isExpandable:this.mayHaveChildren(D)};
if(C){if(!C.isExpandable){C.makeExpandable()
}if(C.state=="LOADED"||C.isExpanded){var B=C._addChildren([F])
}}else{var B=this._addChildren([F])
}if(B){dojo.mixin(this._itemNodeMap,B)
}},_onDeleteItem:function(D){var A=this.store.getIdentity(D);
var C=this._itemNodeMap[A];
if(C){var B=C.getParent();
B.deleteNode(C);
this._itemNodeMap[A]=null
}},_onSetItem:function(B){var A=this.store.getIdentity(B);
node=this._itemNodeMap[A];
if(node){node.setLabelNode(this.getLabel(B));
node._updateItemClasses(B)
}},_saveState:function(){if(!this.persist){return 
}var A=[];
for(var B in this._openedItemIds){A.push(B)
}dojo.cookie(this.cookieName,A.join(","))
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(D,C,B){var A=this.filter(D);
if((typeof A==typeof D)&&(B==null||B==undefined)){B=this.format(A,this.constraints)
}if(B!=null&&B!=undefined){this.textbox.value=B
}dijit.form.TextBox.superclass.setValue.call(this,A,C)
},setDisplayedValue:function(A){this.textbox.value=A;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(A,B){return((A==null||A==undefined)?"":(A.toString?A.toString():A))
},parse:function(A,B){return A
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var B=this.domNode;
var A=B.style.opacity;
B.style.opacity="0.999";
setTimeout(function(){B.style.opacity=A
},0)
}},filter:function(A){if(A==undefined||A==null){return""
}else{if(typeof A!="string"){return A
}}if(this.trim){A=dojo.trim(A)
}if(this.uppercase){A=A.toUpperCase()
}if(this.lowercase){A=A.toLowerCase()
}if(this.propercase){A=A.replace(/[^\s]+/g,function(B){return B.substring(0,1).toUpperCase()+B.substring(1)
})
}return A
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.InlineEditBox"]){dojo._hasResource["dijit.InlineEditBox"]=true;
dojo.provide("dijit.InlineEditBox");
dojo.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(A){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var B={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var A in B){this.connect(this.displayNode,A,B[A])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){dojo.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){dojo.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(A){if(this.disabled){return 
}if(A){dojo.stopEvent(A)
}this._onMouseOut();
setTimeout(dojo.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var A=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var D=document.createElement("span");
dojo.place(D,this.domNode,"before");
var C=this.editWidget=new dijit._InlineEditor({value:dojo.trim(A),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:dojo.getComputedStyle(this.displayNode),save:dojo.hitch(this,"save"),cancel:dojo.hitch(this,"cancel"),width:this.width},D);
var B=C.domNode.style;
this.displayNode.style.display="none";
B.position="static";
B.visibility="visible";
this.domNode=C.domNode;
setTimeout(function(){C.focus()
},100)
},_showText:function(A){this.displayNode.style.display="";
var B=this.editWidget.domNode.style;
B.position="absolute";
B.visibility="hidden";
this.domNode=this.displayNode;
var C=this;
setTimeout(function(){if(A){dijit.focus(C.displayNode)
}C.editWidget.destroy();
delete C.editWidget
},100)
},save:function(A){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(A)
},_setDisplayValue:function(A){this.displayNode.innerHTML=A||this.noValueIndicator
},cancel:function(A){this.editing=false;
this._showText(A)
}});
dojo.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=dojo.i18n.getLocalization("dijit","common",this.lang);
dojo.forEach(["buttonSave","buttonCancel"],function(A){if(!this[A]){this[A]=this.messages[A]
}},this)
},postCreate:function(){var A=dojo.getObject(this.editor);
var C=this.editWidget=new A(this.editorParams,this.editorPlaceholder);
var B=this.style;
dojo.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(D){C.focusNode.style[D]=B[D]
},this);
dojo.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(D){this.domNode.style[D]=B[D]
},this);
if(this.width=="100%"){C.domNode.style.width="100%";
this.domNode.style.display="block"
}else{C.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var A=this.editWidget;
return A.getDisplayedValue?A.getDisplayedValue():A.getValue()
},_onKeyPress:function(A){if(this._exitInProgress){return 
}if(this.autoSave){if(A.keyCode==dojo.keys.ESCAPE){dojo.stopEvent(A);
this._exitInProgress=true;
this.cancel(true)
}else{if(A.keyCode==dojo.keys.ENTER){dojo.stopEvent(A);
this._exitInProgress=true;
this.save(true)
}}}else{var B=this;
setTimeout(function(){B.saveButton.setDisabled(B.getValue()==B._initialText)
},100)
}},_onBlur:function(){if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
if(this.getValue()==this._initialText){this.cancel(false)
}else{this.save(false)
}}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},_onChange:function(){if(this._ignoreNextOnChange){delete this._ignoreNextOnChange;
return 
}if(this._exitInProgress){return 
}if(this.autoSave){this._exitInProgress=true;
this.save(true)
}else{this.saveButton.setDisabled((this.getValue()==this._initialText)||!this.enableSave())
}},enableSave:function(){return this.editWidget.isValid?this.editWidget.isValid():true
},focus:function(){this.editWidget.focus();
dijit.selectInputText(this.editWidget.focusNode)
}});
dijit.selectInputText=function(C){var E=dojo.global;
var A=dojo.doc;
C=dojo.byId(C);
if(A.selection&&dojo.body()["createTextRange"]){if(C.createTextRange){var B=C.createTextRange();
B.moveStart("character",0);
B.moveEnd("character",C.value.length);
B.select()
}}else{if(E.getSelection){var D=E.getSelection();
if(C.setSelectionRange){C.setSelectionRange(0,C.value.length)
}}}C.focus()
}
}if(!dojo._hasResource["dijit.form.CheckBox"]){dojo._hasResource["dijit.form.CheckBox"]=true;
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:'<fieldset class="dijitReset dijitInline" waiRole="presentation"\r\n\t><input\r\n\t \ttype="${type}" name="${name}"\r\n\t\tclass="dijitReset dijitCheckBoxInput"\r\n\t\tdojoAttachPoint="inputNode,focusNode"\r\n\t \tdojoAttachEvent="onmouseover:_onMouse,onmouseout:_onMouse,onclick:_onClick"\r\n/></fieldset>\r\n',baseClass:"dijitCheckBox",type:"checkbox",value:"on",postCreate:function(){dojo.setSelectable(this.inputNode,false);
this.setChecked(this.checked);
this.inherited(arguments)
},setChecked:function(A){if(dojo.isIE){if(A){this.inputNode.setAttribute("checked","checked")
}else{this.inputNode.removeAttribute("checked")
}}else{this.inputNode.checked=A
}this.inherited(arguments)
},setValue:function(A){if(A==null){A=""
}this.inputNode.value=A;
dijit.form.CheckBox.superclass.setValue.call(this,A)
}});
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_groups:{},postCreate:function(){(this._groups[this.name]=this._groups[this.name]||[]).push(this);
this.inherited(arguments)
},uninitialize:function(){dojo.forEach(this._groups[this.name],function(C,B,A){if(C===this){A.splice(B,1);
return 
}},this)
},setChecked:function(A){if(A){dojo.forEach(this._groups[this.name],function(B){if(B!=this&&B.checked){B.setChecked(false)
}},this)
}this.inherited(arguments)
},_clicked:function(A){if(!this.checked){this.setChecked(true)
}}})
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(D,B){var A="^";
var E=null;
for(var C=0;
C<D.length;
C++){E=D.charAt(C);
switch(E){case"\\":A+=E;
C++;
A+=D.charAt(C);
break;
case"*":A+=".*";
break;
case"?":A+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":A+="\\";
default:A+=E
}}A+="$";
if(B){return new RegExp(A,"i")
}else{return new RegExp(A)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(B,A){var C=0;
if(B>A||typeof B==="undefined"||B===null){C=1
}else{if(B<A||typeof A==="undefined"||A===null){C=-1
}}return C
};
dojo.data.util.sorter.createSortFunction=function(D,B){var F=[];
function A(G,H){return function(M,L){var K=B.getValue(M,G);
var I=B.getValue(L,G);
var J=null;
if(B.comparatorMap){if(typeof G!=="string"){G=B.getIdentity(G)
}J=B.comparatorMap[G]||dojo.data.util.sorter.basicComparator
}J=J||dojo.data.util.sorter.basicComparator;
return H*J(K,I)
}
}for(var C=0;
C<D.length;
C++){sortAttribute=D[C];
if(sortAttribute.attribute){var E=(sortAttribute.descending)?-1:1;
F.push(A(sortAttribute.attribute,E))
}}return function(H,G){var J=0;
while(J<F.length){var I=F[J++](H,G);
if(I!==0){return I
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(D){D=D||{};
if(!D.store){D.store=this
}var B=this;
var C=function(G,E){if(E.onError){var F=E.scope||dojo.global;
E.onError.call(F,G,E)
}};
var A=function(I,J){var M=J.abort||null;
var E=false;
var K=J.start?J.start:0;
var H=J.count?(K+J.count):I.length;
J.abort=function(){E=true;
if(M){M.call(J)
}};
var N=J.scope||dojo.global;
if(!J.store){J.store=B
}if(J.onBegin){J.onBegin.call(N,I.length,J)
}if(J.sort){I.sort(dojo.data.util.sorter.createSortFunction(J.sort,B))
}if(J.onItem){for(var G=K;
(G<I.length)&&(G<H);
++G){var L=I[G];
if(!E){J.onItem.call(N,L,J)
}}}if(J.onComplete&&!E){var F=null;
if(!J.onItem){F=I.slice(K,H)
}J.onComplete.call(N,F,J)
}};
this._fetchItems(D,A,C);
return D
}
}if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(A){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=A.url;
this._jsonData=A.data;
this._datatypeMap=A.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(B){return dojo.date.stamp.fromISOString(B)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(D,C,A){var B=this.getValues(D,C);
return(B.length>0)?B[0]:A
},getValues:function(B,A){this._assertIsItem(B);
this._assertIsAttribute(A);
return B[A]||[]
},getAttributes:function(C){this._assertIsItem(C);
var A=[];
for(var B in C){if((B!==this._storeRefPropName)&&(B!==this._itemNumPropName)&&(B!==this._rootItemPropName)){A.push(B)
}}return A
},hasAttribute:function(B,A){return this.getValues(B,A).length>0
},containsValue:function(B,A,D){var C=undefined;
if(typeof D==="string"){C=dojo.data.util.filter.patternToRegExp(D,false)
}return this._containsValue(B,A,D,C)
},_containsValue:function(B,A,D,C){return dojo.some(this.getValues(B,A),function(E){if(E!==null&&!dojo.isObject(E)&&C){if(E.toString().match(C)){return true
}}else{if(D===E){return true
}}})
},isItem:function(A){if(A&&A[this._storeRefPropName]===this){if(this._arrayOfAllItems[A[this._itemNumPropName]]===A){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},getFeatures:function(){return this._features
},getLabel:function(A){if(this._labelAttr&&this.isItem(A)){return this.getValue(A,this._labelAttr)
}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(C,H,B){var A=this;
var D=function(L,O){var N=[];
if(L.query){var M=L.queryOptions?L.queryOptions.ignoreCase:false;
var Q={};
for(var R in L.query){var P=L.query[R];
if(typeof P==="string"){Q[R]=dojo.data.util.filter.patternToRegExp(P,M)
}}for(var J=0;
J<O.length;
++J){var K=true;
var I=O[J];
if(I===null){K=false
}else{for(var R in L.query){var P=L.query[R];
if(!A._containsValue(I,R,P,Q[R])){K=false
}}}if(K){N.push(I)
}}H(N,L)
}else{for(var J=0;
J<O.length;
++J){var S=O[J];
if(S!==null){N.push(S)
}}H(N,L)
}};
if(this._loadFinished){D(C,this._getItemsArray(C.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:C,filter:D})
}else{this._loadInProgress=true;
var F={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var E=dojo.xhrGet(F);
E.addCallback(function(I){try{A._getItemsFromLoadedData(I);
A._loadFinished=true;
A._loadInProgress=false;
D(C,A._getItemsArray(C.queryOptions));
A._handleQueuedFetches()
}catch(J){A._loadFinished=true;
A._loadInProgress=false;
B(J,C)
}});
E.addErrback(function(I){A._loadInProgress=false;
B(I,C)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
D(C,this._getItemsArray(C.queryOptions))
}catch(G){B(G,C)
}}else{B(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),C)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var C=0;
C<this._queuedFetches.length;
C++){var A=this._queuedFetches[C];
var B=A.args;
var D=A.filter;
if(D){D(B,this._getItemsArray(B.queryOptions))
}else{this.fetchItemByIdentity(B)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(E){function B(U){var V=((U!=null)&&(typeof U=="object")&&(!dojo.isArray(U))&&(!dojo.isFunction(U))&&(U.constructor==Object)&&(typeof U._reference=="undefined")&&(typeof U._type=="undefined")&&(typeof U._value=="undefined"));
return V
}var J=this;
function R(Z){J._arrayOfAllItems.push(Z);
for(var Y in Z){var X=Z[Y];
if(X){if(dojo.isArray(X)){var W=X;
for(var V=0;
V<W.length;
++V){var U=W[V];
if(B(U)){R(U)
}}}else{if(B(X)){R(X)
}}}}}this._labelAttr=E.label;
var O;
var Q;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=E.items;
for(O=0;
O<this._arrayOfTopLevelItems.length;
++O){Q=this._arrayOfTopLevelItems[O];
R(Q);
Q[this._rootItemPropName]=true
}var L={};
var S;
for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
for(S in Q){if(S!==this._rootItemPropName){var K=Q[S];
if(K!==null){if(!dojo.isArray(K)){Q[S]=[K]
}}else{Q[S]=[null]
}}L[S]=S
}}while(L[this._storeRefPropName]){this._storeRefPropName+="_"
}while(L[this._itemNumPropName]){this._itemNumPropName+="_"
}var H;
var D=E.identifier;
if(D){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=D;
for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
H=Q[D];
var T=H[0];
if(!this._itemsByIdentity[T]){this._itemsByIdentity[T]=Q
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+D+"].  Value collided: ["+T+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+D+"].  Value collided: ["+T+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
Q[this._storeRefPropName]=this;
Q[this._itemNumPropName]=O
}for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
for(S in Q){H=Q[S];
for(var N=0;
N<H.length;
++N){K=H[N];
if(K!==null&&typeof K=="object"){if(K._type&&K._value){var F=K._type;
var G=this._datatypeMap[F];
if(!G){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+F+"'")
}else{if(dojo.isFunction(G)){H[N]=new G(K._value)
}else{if(dojo.isFunction(G.deserialize)){H[N]=G.deserialize(K._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(K._reference){var A=K._reference;
if(dojo.isString(A)){H[N]=this._itemsByIdentity[A]
}else{for(var M=0;
M<this._arrayOfAllItems.length;
++M){var C=this._arrayOfAllItems[M];
var I=true;
for(var P in A){if(C[P]!=A[P]){I=false
}}if(I){H[N]=C
}}}}}}}}},getIdentity:function(B){var A=this._features["dojo.data.api.Identity"];
if(A===Number){return B[this._itemNumPropName]
}else{var C=B[A];
if(C){return C[0]
}}return null
},fetchItemByIdentity:function(B){if(!this._loadFinished){var A=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:B})
}else{this._loadInProgress=true;
var F={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var E=dojo.xhrGet(F);
E.addCallback(function(J){var H=B.scope?B.scope:dojo.global;
try{A._getItemsFromLoadedData(J);
A._loadFinished=true;
A._loadInProgress=false;
var I=A._getItemByIdentity(B.identity);
if(B.onItem){B.onItem.call(H,I)
}A._handleQueuedFetches()
}catch(G){A._loadInProgress=false;
if(B.onError){B.onError.call(H,G)
}}});
E.addErrback(function(G){A._loadInProgress=false;
if(B.onError){var H=B.scope?B.scope:dojo.global;
B.onError.call(H,G)
}})
}}else{if(this._jsonData){A._getItemsFromLoadedData(A._jsonData);
A._jsonData=null;
A._loadFinished=true;
var D=A._getItemByIdentity(B.identity);
if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}}}else{var D=this._getItemByIdentity(B.identity);
if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}},_getItemByIdentity:function(A){var B=null;
if(this._itemsByIdentity){B=this._itemsByIdentity[A]
}else{B=this._arrayOfAllItems[A]
}if(B===undefined){B=null
}return B
},getIdentityAttributes:function(B){var A=this._features["dojo.data.api.Identity"];
if(A===Number){return null
}else{return[A]
}},_forceLoad:function(){var A=this;
if(this._jsonFileUrl){var C={url:A._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var B=dojo.xhrGet(C);
B.addCallback(function(D){try{if(A._loadInProgress!==true&&!A._loadFinished){A._getItemsFromLoadedData(D);
A._loadFinished=true
}}catch(E){console.log(E);
throw E
}});
B.addErrback(function(D){throw D
})
}else{if(this._jsonData){A._getItemsFromLoadedData(A._jsonData);
A._jsonData=null;
A._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\r\n\t\t\ttype=\'${type}\' name=\'${name}\'\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(A){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(A,B){return(new RegExp("^("+this.regExpGen(B)+")"+(this.required?"":"?")+"$")).test(A)&&(!this.required||!this._isEmpty(A))&&(this._isEmpty(A)||this.parse(A,B)!==null)
},isValid:function(A){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(A){return/^\s*$/.test(A)
},getErrorMessage:function(A){return this.invalidMessage
},getPromptMessage:function(A){return this.promptMessage
},validate:function(A){var B="";
var C=this.isValid(A);
var D=this._isEmpty(this.textbox.value);
this.state=(C||(!this._hasBeenBlurred&&D))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(C?"false":"true"));
if(A){if(D){B=this.getPromptMessage(true)
}if(!B&&!C){B=this.getErrorMessage(true)
}}this._displayMessage(B)
},_message:"",_displayMessage:function(A){if(this._message==A){return 
}this._message=A;
this.displayMessage(A)
},displayMessage:function(A){if(A){dijit.showTooltip(A,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(A){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(A){this.validate(true);
this._onMouse(A)
},onkeyup:function(A){this.onfocus(A)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var A=this.regExpGen(this.constraints);
this.regExp=A
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(B,A){return(B.toString?B.toString():"")
},toString:function(){var A=this.filter(this.getValue());
return(A!=null)?((typeof A=="string")?A:this.serialize(A,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var B=this.textbox;
var A=(this.valueNode=document.createElement("input"));
A.setAttribute("type",B.type);
A.setAttribute("value",this.toString());
dojo.style(A,"display","none");
A.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(A,B,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(B,A){return B-A
},rangeCheck:function(A,D){var C=(typeof D.min!="undefined");
var B=(typeof D.max!="undefined");
if(C||B){return(!C||this.compare(A,D.min)>=0)&&(!B||this.compare(A,D.max)<=0)
}else{return true
}},isInRange:function(A){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(A){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(A))
},getErrorMessage:function(A){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(A)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\r\n\t\t\t><input type="text" autocomplete="off" name="${name}"\r\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\r\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\r\n\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\r\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\r\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\r\n\t\t\t></div\r\n\t\t></td\t\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(A){this._lastDisplayedValue=A;
this.setValue(A,true)
},_getCaretPos:function(A){if(typeof (A.selectionStart)=="number"){return A.selectionStart
}else{if(dojo.isIE){var C=document.selection.createRange().duplicate();
var B=A.createTextRange();
C.move("character",0);
B.move("character",0);
try{B.setEndPoint("EndToEnd",C);
return String(B.text).replace(/\r/g,"").length
}catch(D){return 0
}}}},_setCaretPos:function(B,A){A=parseInt(A);
this._setSelectedRange(B,A,A)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(A){if(A.altKey||(A.ctrlKey&&A.charCode!=118)){return 
}var C=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(A)
}switch(A.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
C=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(A);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var D;
if(this._isShowingNow&&(D=this._popupWidget.getHighlightedOption())){if(D==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(A);
break
}else{if(D==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(A);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}A.preventDefault();
case dojo.keys.TAB:var B=this.getDisplayedValue();
if(this._popupWidget&&(B==this._popupWidget._messages.previousMessage||B==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(A);
this._selectOption();
this._hideResultList()
}else{C=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(A)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
C=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||A.charCode!=0){C=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(C){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(A){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(A))){var B=this._getCaretPos(this.focusNode);
if((B+1)>this.focusNode.value.length){this.focusNode.value=A;
this._setSelectedRange(this.focusNode,B,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}}else{this.focusNode.value=A;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}},_openResultList:function(A,B){if(this.disabled||B.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!A.length){this._hideResultList();
return 
}var C=new String(this.store.getValue(A[0],this.searchAttr));
if(C&&this.autoComplete&&!this._prev_key_backspace&&(B.query[this.searchAttr]!="*")){this._autoCompleteText(C);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",C)
}this._popupWidget.createOptions(A,B,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(B.direction){if(B.direction==1){this._popupWidget.highlightFirstOption()
}else{if(B.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(A)
}},onfocus:function(A){this._hasFocus=true;
this._onMouse(A)
},_announceOption:function(A){if(A==null){return 
}var B;
if(A==this._popupWidget.nextButton||A==this._popupWidget.previousButton){B=A.innerHTML
}else{B=this.store.getValue(A.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(B)
},_selectOption:function(A){var B=null;
if(!A){A={target:this._popupWidget.getHighlightedOption()}
}if(!A.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{B=A.target
}if(!A.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(B.item,this.searchAttr).length)
}this._doSelect(B)
},_doSelect:function(A){this.item=A.item;
this.setValue(this.store.getValue(A.item,this.searchAttr),true)
},_onArrowMouseDown:function(A){if(this.disabled){return 
}dojo.stopEvent(A);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(A){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var C=this.query;
this._lastQuery=C[this.searchAttr]=A+"*";
var B=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:C,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function D(E,F){E.start+=E.count*F;
E.direction=F;
E.store.fetch(E)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,D,B)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(A){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var A=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(B){B.style.display="none";
return{value:B.getAttribute("value"),name:String(B.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:A}});
if(A&&A.length&&!this.value){this.value=A[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(A){return{html:false,label:this.store.getValue(A,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(A){this.value=A;
this.onChange(A)
},onChange:function(A){},onPage:function(A){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(C,B){var A=B(C);
var D=document.createElement("div");
if(A.html){D.innerHTML=A.label
}else{D.appendChild(document.createTextNode(A.label))
}if(D.innerHTML==""){D.innerHTML="&nbsp;"
}D.item=C;
return D
},createOptions:function(B,C,A){this.previousButton.style.display=C.start==0?"none":"";
var D=this;
dojo.forEach(B,function(E){var F=D._createOption(E,A);
F.className="dijitMenuItem";
D.domNode.insertBefore(F,D.nextButton)
});
this.nextButton.style.display=C.count==B.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(A){dojo.stopEvent(A)
},onmouseup:function(A){if(A.target===this.domNode){return 
}else{if(A.target==this.previousButton){this.onPage(-1)
}else{if(A.target==this.nextButton){this.onPage(1)
}else{var B=A.target;
while(!B.item){B=B.parentNode
}this.setValue({target:B},true)
}}}},onmouseover:function(A){if(A.target===this.domNode){return 
}var B=A.target;
if(!(B==this.previousButton||B==this.nextButton)){while(!B.item){B=B.parentNode
}}this._focusOptionNode(B)
},onmouseout:function(A){if(A.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(A){if(this._highlighted_option!=A){this._blurOptionNode();
this._highlighted_option=A;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(B){var E=0;
var C=this.domNode.scrollTop;
var A=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(E<A){if(B){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var D=this.domNode.scrollTop;
E+=(D-C)*(B?-1:1);
C=D
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(A){switch(A.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dojo.cldr.monetary"]){dojo._hasResource["dojo.cldr.monetary"]=true;
dojo.provide("dojo.cldr.monetary");
dojo.cldr.monetary.getData=function(D){var E={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var C={CHF:5};
var B=E[D],A=C[D];
if(typeof B=="undefined"){B=2
}if(typeof A=="undefined"){A=0
}return{places:B,round:A}
}
}if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.currency._mixInDefaults=function(B){B=B||{};
B.type="currency";
var A=dojo.i18n.getLocalization("dojo.cldr","currency",B.locale)||{};
var C=B.currency;
var D=dojo.cldr.monetary.getData(C);
dojo.forEach(["displayName","symbol","group","decimal"],function(E){D[E]=A[C+"_"+E]
});
D.fractional=[true,false];
return dojo.mixin(D,B)
};
dojo.currency.format=function(B,A){return dojo.number.format(B,dojo.currency._mixInDefaults(A))
};
dojo.currency.regexp=function(A){return dojo.number.regexp(dojo.currency._mixInDefaults(A))
};
dojo.currency.parse=function(B,A){return dojo.number.parse(B,dojo.currency._mixInDefaults(A))
}
}if(!dojo._hasResource["dijit.form.NumberTextBox"]){dojo._hasResource["dijit.form.NumberTextBox"]=true;
dojo.provide("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,format:function(A,B){if(isNaN(A)){return""
}return dojo.number.format(A,B)
},parse:dojo.number.parse,filter:function(A){if(typeof A=="string"){return this.inherited("filter",arguments)
}return(isNaN(A)?"":A)
},value:NaN});
dojo.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{})
}if(!dojo._hasResource["dijit.form.CurrencyTextBox"]){dojo._hasResource["dijit.form.CurrencyTextBox"]=true;
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",regExpGen:dojo.currency.regexp,format:dojo.currency.format,parse:dojo.currency.parse,postMixInProperties:function(){if(this.constraints===dijit.form.ValidationTextBox.prototype.constraints){this.constraints={}
}this.constraints.currency=this.currency;
dijit.form.CurrencyTextBox.superclass.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(A){var B={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var C=dojo.cldr.supplemental._region(A);
var D=B[C];
return(typeof D=="undefined")?1:D
};
dojo.cldr.supplemental._region=function(A){A=dojo.i18n.normalizeLocale(A);
var B=A.split("-");
var C=B[1];
if(!C){C={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[B[0]]
}else{if(C.length==4){C=B[2]
}}return C
};
dojo.cldr.supplemental.getWeekend=function(B){var D={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var A={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var E=dojo.cldr.supplemental._region(B);
var F=D[E];
var C=A[E];
if(typeof F=="undefined"){F=6
}if(typeof C=="undefined"){C=0
}return{start:F,end:C}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(A){var B=A.getMonth();
var C=[31,28,31,30,31,30,31,31,30,31,30,31];
if(B==1&&dojo.date.isLeapYear(A)){return 29
}return C[B]
};
dojo.date.isLeapYear=function(B){var A=B.getFullYear();
return !(A%400)||(!(A%4)&&!!(A%100))
};
dojo.date.getTimezoneName=function(C){var D=C.toString();
var F="";
var B;
var E=D.indexOf("(");
if(E>-1){F=D.substring(++E,D.indexOf(")"))
}else{var A=/([A-Z\/]+) \d{4}$/;
if((B=D.match(A))){F=B[1]
}else{D=C.toLocaleString();
A=/ ([A-Z\/]+)$/;
if((B=D.match(A))){F=B[1]
}}}return(F=="AM"||F=="PM")?"":F
};
dojo.date.compare=function(C,B,A){C=new Date(Number(C));
B=new Date(Number(B||new Date()));
if(typeof A!=="undefined"){if(A=="date"){C.setHours(0,0,0,0);
B.setHours(0,0,0,0)
}else{if(A=="time"){C.setFullYear(0,0,0);
B.setFullYear(0,0,0)
}}}if(C>B){return 1
}if(C<B){return -1
}return 0
};
dojo.date.add=function(D,C,E){var G=new Date(Number(D));
var B=false;
var K="Date";
switch(C){case"day":break;
case"weekday":var L,A;
var I=0;
var J=E%5;
if(!J){L=(E>0)?5:-5;
A=(E>0)?((E-5)/5):((E+5)/5)
}else{L=J;
A=parseInt(E/5)
}var F=D.getDay();
if(F==6&&E>0){I=1
}else{if(F==0&&E<0){I=-1
}}var H=F+L;
if(H==0||H==6){I=(E>0)?2:-2
}E=7*A+L+I;
break;
case"year":K="FullYear";
B=true;
break;
case"week":E*=7;
break;
case"quarter":E*=3;
case"month":B=true;
K="Month";
break;
case"hour":case"minute":case"second":case"millisecond":K="UTC"+C.charAt(0).toUpperCase()+C.substring(1)+"s"
}if(K){G["set"+K](G["get"+K]()+E)
}if(B&&(G.getDate()<D.getDate())){G.setDate(0)
}return G
};
dojo.date.difference=function(P,N,D){N=N||new Date();
D=D||"day";
var C=N.getFullYear()-P.getFullYear();
var L=1;
switch(D){case"quarter":var Q=P.getMonth();
var O=N.getMonth();
var I=Math.floor(Q/3)+1;
var H=Math.floor(O/3)+1;
H+=(C*4);
L=H-I;
break;
case"weekday":var M=Math.round(dojo.date.difference(P,N,"day"));
var A=parseInt(dojo.date.difference(P,N,"week"));
var K=M%7;
if(K==0){M=A*5
}else{var J=0;
var G=P.getDay();
var E=N.getDay();
A=parseInt(M/7);
K=M%7;
var F=new Date(P);
F.setDate(F.getDate()+(A*7));
var B=F.getDay();
if(M>0){switch(true){case G==6:J=-1;
break;
case G==0:J=0;
break;
case E==6:J=-1;
break;
case E==0:J=-2;
break;
case (B+K)>5:J=-2
}}else{if(M<0){switch(true){case G==6:J=0;
break;
case G==0:J=1;
break;
case E==6:J=2;
break;
case E==0:J=1;
break;
case (B+K)<0:J=2
}}}M+=J;
M-=(A*2)
}L=M;
break;
case"year":L=C;
break;
case"month":L=(N.getMonth()-P.getMonth())+(C*12);
break;
case"week":L=parseInt(dojo.date.difference(P,N,"day")/7);
break;
case"day":L/=24;
case"hour":L/=60;
case"minute":L/=60;
case"second":L/=1000;
case"millisecond":L*=N.getTime()-P.getTime()
}return Math.round(L)
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function B(E,D,F){return F.replace(/([a-z])\1*/ig,function(S){var W;
var V=S.charAt(0);
var N=S.length;
var K;
var L=["abbr","wide","narrow"];
switch(V){case"G":W=D[(N<4)?"eraAbbr":"eraNames"][E.getFullYear()<0?0:1];
break;
case"y":W=E.getFullYear();
switch(N){case 1:break;
case 2:W=String(W);
W=W.substr(W.length-2);
break;
default:K=true
}break;
case"Q":case"q":W=Math.ceil((E.getMonth()+1)/3);
K=true;
break;
case"M":case"L":var M=E.getMonth();
var I;
switch(N){case 1:case 2:W=M+1;
K=true;
break;
case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="L")?"standalone":"format";
var H=["months",U,I].join("-");
W=D[H][M]
}break;
case"w":var G=0;
W=dojo.date.locale._getWeekOfYear(E,G);
K=true;
break;
case"d":W=E.getDate();
K=true;
break;
case"D":W=dojo.date.locale._getDayOfYear(E);
K=true;
break;
case"E":case"e":case"c":var T=E.getDay();
var I;
switch(N){case 1:case 2:if(V=="e"){var R=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
T=(T-R+7)%7
}if(V!="c"){W=T+1;
K=true;
break
}case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="c")?"standalone":"format";
var H=["days",U,I].join("-");
W=D[H][T]
}break;
case"a":var J=(E.getHours()<12)?"am":"pm";
W=D[J];
break;
case"h":case"H":case"K":case"k":var Q=E.getHours();
switch(V){case"h":W=(Q%12)||12;
break;
case"H":W=Q;
break;
case"K":W=(Q%12);
break;
case"k":W=Q||24;
break
}K=true;
break;
case"m":W=E.getMinutes();
K=true;
break;
case"s":W=E.getSeconds();
K=true;
break;
case"S":W=Math.round(E.getMilliseconds()*Math.pow(10,N-3));
break;
case"v":case"z":W=dojo.date.getTimezoneName(E);
if(W){break
}N=4;
case"Z":var P=E.getTimezoneOffset();
var O=[(P<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(P)/60),2),dojo.string.pad(Math.abs(P)%60,2)];
if(N==4){O.splice(0,0,"GMT");
O.splice(3,0,":")
}W=O.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+F)
}if(K){W=dojo.string.pad(W,N)
}return W
})
}dojo.date.locale.format=function(F,L){L=L||{};
var I=dojo.i18n.normalizeLocale(L.locale);
var M=L.formatLength||"short";
var N=dojo.date.locale._getGregorianBundle(I);
var G=[];
var E=dojo.hitch(this,B,F,N);
if(L.selector=="year"){var H=F.getFullYear();
if(I.match(/^zh|^ja/)){H+="\u5E74"
}return H
}if(L.selector!="time"){var D=L.datePattern||N["dateFormat-"+M];
if(D){G.push(C(D,E))
}}if(L.selector!="date"){var K=L.timePattern||N["timeFormat-"+M];
if(K){G.push(C(K,E))
}}var J=G.join(" ");
return J
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(I){I=I||{};
var G=dojo.i18n.normalizeLocale(I.locale);
var K=dojo.date.locale._getGregorianBundle(G);
var J=I.formatLength||"short";
var D=I.datePattern||K["dateFormat-"+J];
var L=I.timePattern||K["timeFormat-"+J];
var E;
if(I.selector=="date"){E=D
}else{if(I.selector=="time"){E=L
}else{E=D+" "+L
}}var F=[];
var H=C(E,dojo.hitch(this,A,F,K,I));
return{regexp:H,tokens:F,bundle:K}
};
dojo.date.locale.parse=function(K,N){var D=dojo.date.locale._parseInfo(N);
var H=D.tokens,O=D.bundle;
var L=new RegExp("^"+D.regexp+"$");
var F=L.exec(K);
if(!F){return null
}var E=["abbr","wide","narrow"];
var M=new Date(1972,0);
var G={};
var J="";
dojo.forEach(F,function(b,V){if(!V){return 
}var S=H[V-1];
var T=S.length;
switch(S.charAt(0)){case"y":if(T!=2){M.setFullYear(b);
G.year=b
}else{if(b<100){b=Number(b);
var a=""+new Date().getFullYear();
var U=a.substring(0,2)*100;
var X=Number(a.substring(2,4));
var Q=Math.min(X+20,99);
var W=(b<Q)?U+b:U-100+b;
M.setFullYear(W);
G.year=W
}else{if(N.strict){return null
}M.setFullYear(b);
G.year=b
}}break;
case"M":if(T>2){var P=O["months-format-"+E[T-3]].concat();
if(!N.strict){b=b.replace(".","").toLowerCase();
P=dojo.map(P,function(d){return d.replace(".","").toLowerCase()
})
}b=dojo.indexOf(P,b);
if(b==-1){return null
}}else{b--
}M.setMonth(b);
G.month=b;
break;
case"E":case"e":var c=O["days-format-"+E[T-3]].concat();
if(!N.strict){b=b.toLowerCase();
c=dojo.map(c,"".toLowerCase)
}b=dojo.indexOf(c,b);
if(b==-1){return null
}break;
case"d":M.setDate(b);
G.date=b;
break;
case"D":M.setMonth(0);
M.setDate(b);
break;
case"a":var Y=N.am||O.am;
var R=N.pm||O.pm;
if(!N.strict){var Z=/\./g;
b=b.replace(Z,"").toLowerCase();
Y=Y.replace(Z,"").toLowerCase();
R=R.replace(Z,"").toLowerCase()
}if(N.strict&&b!=Y&&b!=R){return null
}J=(b==R)?"p":(b==Y)?"a":"";
break;
case"K":if(b==24){b=0
}case"h":case"H":case"k":if(b>23){return null
}M.setHours(b);
break;
case"m":M.setMinutes(b);
break;
case"s":M.setSeconds(b);
break;
case"S":M.setMilliseconds(b)
}});
var I=M.getHours();
if(J==="p"&&I<12){M.setHours(I+12)
}else{if(J==="a"&&I==12){M.setHours(0)
}}if(G.year&&M.getFullYear()!=G.year){return null
}if(G.month&&M.getMonth()!=G.month){return null
}if(G.date&&M.getDate()!=G.date){return null
}return M
};
function C(H,D,J,G){var E=function(K){return K
};
D=D||E;
J=J||E;
G=G||E;
var I=H.match(/(''|[^'])+/g);
var F=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(F?J:D)(K);
F=!F
}});
return G(I.join(""))
}function A(G,D,E,F){F=dojo.regexp.escapeString(F);
if(!E.strict){F=F.replace(" a"," ?a")
}return F.replace(/([a-z])\1*/ig,function(I){var K;
var O=I.charAt(0);
var H=I.length;
var N="",M="";
if(E.strict){if(H>1){N="0{"+(H-1)+"}"
}if(H>2){M="0{"+(H-2)+"}"
}}else{N="0?";
M="0{0,2}"
}switch(O){case"y":K="\\d{2,4}";
break;
case"M":K=(H>2)?"\\S+":N+"[1-9]|1[0-2]";
break;
case"D":K=N+"[1-9]|"+M+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":K=N+"[1-9]|[12]\\d|3[01]";
break;
case"w":K=N+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":K="\\S+";
break;
case"h":K=N+"[1-9]|1[0-2]";
break;
case"k":K=N+"\\d|1[01]";
break;
case"H":K=N+"\\d|1\\d|2[0-3]";
break;
case"K":K=N+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":K="[0-5]\\d";
break;
case"S":K="\\d{"+H+"}";
break;
case"a":var L=E.am||D.am||"AM";
var J=E.pm||D.pm||"PM";
if(E.strict){K=L+"|"+J
}else{K=L+"|"+J;
if(L!=L.toLowerCase()){K+="|"+L.toLowerCase()
}if(J!=J.toLowerCase()){K+="|"+J.toLowerCase()
}}break;
default:K=".*"
}if(G){G.push(I)
}return"("+K+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(B,C){A.push({pkg:B,name:C})
};
dojo.date.locale._getGregorianBundle=function(B){var C={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,B);
C=dojo.mixin(C,D)
},this);
return C
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(F,E,B,A){var C;
var G=dojo.date.locale._getGregorianBundle(A);
var D=[F,B,E];
if(B=="standAlone"){C=G[D.join("-")]
}D[1]="format";
return(C||G[D.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(D,A){var C=dojo.cldr.supplemental.getWeekend(A);
var B=(D||new Date()).getDay();
if(C.end<C.start){C.end+=7;
if(B<C.start){B+=7
}}return B>=C.start&&B<=C.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(E,B){if(arguments.length==1){B=0
}var C=new Date(E.getFullYear(),0,1).getDay();
var A=(C-B+7)%7;
var D=Math.floor((dojo.date.locale._getDayOfYear(E)+A-1)/7);
if(C==B){D++
}return D
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(A){if(!this.value||dojo.date.compare(A,this.value)){A=new Date(A);
this.displayMonth=new Date(A);
if(!this.isDisabledDate(A,this.lang)){this.value=A;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(A,B){while(A.firstChild){A.removeChild(A.firstChild)
}A.appendChild(document.createTextNode(B))
},_populateGrid:function(){var F=this.displayMonth;
F.setDate(1);
var A=F.getDay();
var B=dojo.date.getDaysInMonth(F);
var I=dojo.date.getDaysInMonth(dojo.date.add(F,"month",-1));
var G=new Date();
var C=this.value;
var K=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(K>A){K-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(Q,P){P+=K;
var O=new Date(F);
var R,N="dijitCalendar",L=0;
if(P<A){R=I-A+P+1;
L=-1;
N+="Previous"
}else{if(P>=(A+B)){R=P-A-B+1;
L=1;
N+="Next"
}else{R=P-A+1;
N+="Current"
}}if(L){O=dojo.date.add(O,"month",L)
}O.setDate(R);
if(!dojo.date.compare(O,G,"date")){N="dijitCalendarCurrentDate "+N
}if(!dojo.date.compare(O,C,"date")){N="dijitCalendarSelectedDate "+N
}if(this.isDisabledDate(O,this.lang)){N="dijitCalendarDisabledDate "+N
}Q.className=N+"Month dijitCalendarDateTemplate";
Q.dijitDateValue=O.valueOf();
var M=dojo.query(".dijitCalendarDateLabel",Q)[0];
this._setText(M,O.getDate())
},this);
var D=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,D[F.getMonth()]);
var H=F.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(H++,0),{selector:"year",locale:this.lang}))
},this);
var E=this;
var J=function(M,N,L){dijit.typematic.addMouseListener(E[M],E,function(O){if(O>=0){E._adjustDisplay(N,L)
}},0.8,500)
};
J("incrementMonth","month",1);
J("decrementMonth","month",-1);
J("nextYearLabelNode","year",1);
J("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var B=dojo.hitch(this,function(E,H){var G=dojo.query(E,this.domNode)[0];
for(var F=0;
F<H;
F++){G.parentNode.appendChild(G.cloneNode(true))
}});
B(".dijitCalendarDayLabelTemplate",6);
B(".dijitCalendarDateTemplate",6);
B(".dijitCalendarWeekTemplate",5);
var D=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var A=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(E,F){this._setText(E,D[(F+A)%7])
},this);
var C=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(C,function(F){var E=dojo.doc.createElement("div");
this._setText(E,F);
this.monthLabelSpacer.appendChild(E)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(A,B){this.displayMonth=dojo.date.add(this.displayMonth,A,B);
this._populateGrid()
},_onDayClick:function(A){var B=A.target;
dojo.stopEvent(A);
while(!B.dijitDateValue){B=B.parentNode
}if(!dojo.hasClass(B,"dijitCalendarDisabledDate")){this.setValue(B.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(B,A){return false
}})
}if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(A,B){this.value=A;
this._showText()
},isDisabledDate:function(B,A){return false
},_showText:function(){this.timeMenu.innerHTML="";
var A=dojo.date.stamp.fromISOString;
this._clickableIncrementDate=A(this.clickableIncrement);
this._visibleIncrementDate=A(this.visibleIncrement);
this._visibleRangeDate=A(this.visibleRange);
var E=function(I){return I.getHours()*60*60+I.getMinutes()*60+I.getSeconds()
};
var D=E(this._clickableIncrementDate);
var G=E(this._visibleIncrementDate);
var C=E(this._visibleRangeDate);
var F=this.value.getTime();
this._refDate=new Date(F-F%(G*1000));
this._clickableIncrement=1;
this._totalIncrements=C/D;
this._visibleIncrement=G/D;
for(var B=-this._totalIncrements/2;
B<=this._totalIncrements/2;
B+=this._clickableIncrement){var H=this._createOption(B);
this.timeMenu.appendChild(H)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(C){var E=document.createElement("div");
var B=(E.date=new Date(this._refDate));
E.index=C;
var A=this._clickableIncrementDate;
B.setHours(B.getHours()+A.getHours()*C,B.getMinutes()+A.getMinutes()*C,B.getSeconds()+A.getSeconds()*C);
var D=document.createElement("div");
dojo.addClass(E,this.baseClass+"Item");
dojo.addClass(D,this.baseClass+"ItemInner");
D.innerHTML=dojo.date.locale.format(B,this.constraints);
E.appendChild(D);
if(C%this._visibleIncrement<1&&C%this._visibleIncrement>-1){dojo.addClass(E,this.baseClass+"Marker")
}else{if(C%this._clickableIncrement==0){dojo.addClass(E,this.baseClass+"Tick")
}}if(this.isDisabledDate(B)){dojo.addClass(E,this.baseClass+"ItemDisabled")
}if(dojo.date.compare(this.value,B,this.constraints.selector)==0){E.selected=true;
dojo.addClass(E,this.baseClass+"ItemSelected")
}return E
},_onOptionSelected:function(B){var A=B.target.date||B.target.parentNode.date;
if(!A||this.isDisabledDate(A)){return 
}this.setValue(A);
this.onValueSelected(A)
},onValueSelected:function(A){},onmouseover:function(B){var A=(B.target.parentNode===this.timeMenu)?B.target:B.target.parentNode;
this._highlighted_option=A;
dojo.addClass(A,this.baseClass+"ItemHover")
},onmouseout:function(B){var A=(B.target.parentNode===this.timeMenu)?B.target:B.target.parentNode;
if(this._highlighted_option===A){dojo.removeClass(A,this.baseClass+"ItemHover")
}},_mouseWheeled:function(A){dojo.stopEvent(A);
var B=(dojo.isIE?A.wheelDelta:-A.detail);
this[(B>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var A=this.timeMenu.childNodes[0].index-1;
var B=this._createOption(A);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(B,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var A=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var B=this._createOption(A);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(B)
}})
}if(!dojo._hasResource["dijit.form.TimeTextBox"]){dojo._hasResource["dijit.form.TimeTextBox"]=true;
dojo.provide("dijit.form.TimeTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:dojo.date.locale.regexp,compare:dojo.date.compare,format:function(A,B){if(!A||A.toString()==this._invalid){return null
}return dojo.date.locale.format(A,B)
},parse:dojo.date.locale.parse,serialize:dojo.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var A=this.constraints;
A.selector="time";
if(typeof A.min=="string"){A.min=dojo.date.stamp.fromISOString(A.min)
}if(typeof A.max=="string"){A.max=dojo.date.stamp.fromISOString(A.max)
}},_onFocus:function(A){this._open()
},setValue:function(B,A){this.inherited("setValue",arguments);
if(this._picker){if(!B||B.toString()==this._invalid){B=new Date()
}this._picker.setValue(B)
}},_open:function(){if(this.disabled){return 
}var A=this;
if(!this._picker){var B=dojo.getObject(this._popupClass,false);
this._picker=new B({onValueSelected:function(C){A.focus();
setTimeout(dojo.hitch(A,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(A,C,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(C){return A.constraints&&(dojo.date.compare(A.constraints.min,C)>0||dojo.date.compare(A.constraints.max,C)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:dojo.hitch(this,this._close),onClose:function(){A._opened=false
}});
this._opened=true
}dojo.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(A){this.textbox.value=A
}})
}if(!dojo._hasResource["dijit.form.DateTextBox"]){dojo._hasResource["dijit.form.DateTextBox"]=true;
dojo.provide("dijit.form.DateTextBox");
dojo.declare("dijit.form.DateTextBox",dijit.form.TimeTextBox,{_popupClass:"dijit._Calendar",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.selector="date"
}})
}if(!dojo._hasResource["dijit.form.FilteringSelect"]){dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(A,B,C){if(B&&B.query[this.searchAttr]!=this._lastQuery){return 
}if(!A.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(A[0],C)
}},_openResultList:function(A,B){if(B.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=A.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(C,A,B){this.valueNode.value=C;
dijit.form.FilteringSelect.superclass.setValue.call(this,C,B,A);
this._lastDisplayedValue=A
},setValue:function(D,B){var A=this;
var C=function(F,E){if(F){if(A.store.isItemLoaded(F)){A._callbackSetLabel([F],undefined,E)
}else{A.store.loadItem({item:F,onItem:function(G,H){A._callbackSetLabel(G,H,E)
}})
}}else{A._isvalid=false;
A.validate(false)
}};
this.store.fetchItemByIdentity({identity:D,onItem:function(E){C(E,B)
}})
},_setValueFromItem:function(B,A){this._isvalid=true;
this._setValue(this.store.getIdentity(B),this.labelFunc(B,this.store),A)
},labelFunc:function(B,A){return A.getValue(B,this.searchAttr)
},onkeyup:function(A){},_doSelect:function(A){this.item=A.item;
this._setValueFromItem(A.item,true)
},setDisplayedValue:function(A){if(this.store){var B={};
this._lastQuery=B[this.searchAttr]=A;
this.textbox.value=A;
this._lastDisplayedValue=A;
this.store.fetch({query:B,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:dojo.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(A){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(A,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dijit.form._Spinner"]){dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(A,B){return A
},_handleUpArrowEvent:function(A){this._onMouse(A,this.upArrowNode)
},_handleDownArrowEvent:function(A){this._onMouse(A,this.downArrowNode)
},_arrowPressed:function(A,B){if(this.disabled){return 
}dojo.addClass(A,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),B*this.smallDelta),false)
},_arrowReleased:function(A){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
dojo.removeClass(A,"dijitSpinnerButtonActive")
},_typematicCallback:function(C,B,A){if(B==this.textbox){B=(A.keyCode==dojo.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(C==-1){this._arrowReleased(B)
}else{this._arrowPressed(B,(B==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(A){dojo.stopEvent(A);
var D=0;
if(typeof A.wheelDelta=="number"){D=A.wheelDelta
}else{if(typeof A.detail=="number"){D=-A.detail
}}if(D>0){var C=this.upArrowNode;
var B=+1
}else{if(D<0){var C=this.downArrowNode;
var B=-1
}else{return 
}}this._arrowPressed(C,B);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var E=this;
this._wheelTimer=setTimeout(function(){E._arrowReleased(C)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(B,C){var A=B+C;
if(isNaN(B)||isNaN(A)){return B
}if((typeof this.constraints.max=="number")&&(A>this.constraints.max)){A=this.constraints.max
}if((typeof this.constraints.min=="number")&&(A<this.constraints.min)){A=this.constraints.min
}return A
}})
}if(!dojo._hasResource["dijit.form.Slider"]){dojo._hasResource["dijit.form.Slider"]=true;
dojo.provide("dijit.form.Slider");
dojo.declare("dijit.form.HorizontalSlider",[dijit.form._FormWidget,dijit._Container],{templateString:'<table class="dijit dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,topDecoration" class="dijitReset" style="text-align:center;width:100%;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer"\r\n\t\t\t><div class="dijitHorizontalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderLeftBumper dijitHorizontalSliderLeftBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><div style="position:relative;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderProgressBar dijitHorizontalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable dijitHorizontalSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitHorizontalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderRemainingBar dijitHorizontalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderRightBumper dijitHorizontalSliderRightBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer" style="right:0px;"\r\n\t\t\t><div class="dijitHorizontalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,bottomDecoration" class="dijitReset" style="text-align:center;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n></table>\r\n',value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,widgetsInTemplate:true,attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:"valueNode"}),baseClass:"dijitSlider",_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_upsideDown:false,_onKeyPress:function(A){if(this.disabled||A.altKey||A.ctrlKey){return 
}switch(A.keyCode){case dojo.keys.HOME:this.setValue(this.minimum,false);
break;
case dojo.keys.END:this.setValue(this.maximum,false);
break;
case dojo.keys.UP_ARROW:case (this._isReversed()?dojo.keys.LEFT_ARROW:dojo.keys.RIGHT_ARROW):case dojo.keys.PAGE_UP:this.increment(A);
break;
case dojo.keys.DOWN_ARROW:case (this._isReversed()?dojo.keys.RIGHT_ARROW:dojo.keys.LEFT_ARROW):case dojo.keys.PAGE_DOWN:this.decrement(A);
break;
default:this.inherited("_onKeyPress",arguments);
return 
}dojo.stopEvent(A)
},_onHandleClick:function(A){if(this.disabled){return 
}if(!dojo.isIE){dijit.focus(this.sliderHandle)
}dojo.stopEvent(A)
},_isReversed:function(){return !(this._upsideDown||this.isLeftToRight())
},_onBarClick:function(C){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
dojo.stopEvent(C);
var B=dojo.coords(this.sliderBarContainer,true);
var A=C[this._mousePixelCoord]-B[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(B[this._pixelCount]-A):A,B[this._pixelCount],true)
},_setPixelValue:function(B,D,F){if(this.disabled){return 
}B=B<0?0:D<B?D:B;
var E=this.discreteValues;
if(E<=1||E==Infinity){E=D
}E--;
var A=D/E;
var C=Math.round(B/A);
this.setValue((this.maximum-this.minimum)*C/E+this.minimum,F)
},setValue:function(C,B){this.valueNode.value=this.value=C;
this.inherited("setValue",arguments);
var A=(C-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(A*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-A)*100)+"%"
},_bumpValue:function(D){if(this.disabled){return 
}var A=dojo.getComputedStyle(this.sliderBarContainer);
var E=dojo._getContentBox(this.sliderBarContainer,A);
var B=this.discreteValues;
if(B<=1||B==Infinity){B=E[this._pixelCount]
}B--;
var C=(this.value-this.minimum)*B/(this.maximum-this.minimum)+D;
if(C<0){C=0
}if(C>B){C=B
}C=C*(this.maximum-this.minimum)/B+this.minimum;
this.setValue(C,true)
},decrement:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(A){dojo.stopEvent(A);
var B=0;
if(typeof A.wheelDelta=="number"){B=A.wheelDelta
}else{if(typeof A.detail=="number"){B=-A.detail
}}if(B>0){this.increment(A)
}else{if(B<0){this.decrement(A)
}}},startup:function(){dojo.forEach(this.getChildren(),function(A){if(this[A.container]!=this.containerNode){this[A.container].appendChild(A.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var A=this;
var B=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=A
};
dojo.extend(B,dijit.form._SliderMover.prototype);
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:B});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(F){var E=this.widget;
var G=this.constraintBox;
if(!G){var C=E.sliderBarContainer;
var D=dojo.getComputedStyle(C);
var G=dojo._getContentBox(C,D);
G[E._startingPixelCount]=0;
this.constraintBox=G
}var A=this.marginBox;
var B=E._isReversed()?F[E._mousePixelCoord]-dojo._abs(E.sliderBarContainer).x:A[E._startingPixelCount]+F[E._mousePixelCoord];
dojo.hitch(E,"_setPixelValue")(E._isReversed()||E._upsideDown?(G[E._pixelCount]-B):B,G[E._pixelCount])
},destroy:function(B){var A=this.widget;
A.setValue(A.value,true);
dojo.dnd.Mover.prototype.destroy.call(this)
}});
dojo.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(B,A){return this._positionPrefix+B+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var C=this._genHTML(50,0)
}else{var A=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var C=this._genHTML(0,0);
for(var B=1;
B<this.count-1;
B++){C+=this._genHTML(A*B,B)
}C+=this._genHTML(100,this.count-1)
}else{var C=this._genHTML(100,0);
for(var B=1;
B<this.count-1;
B++){C+=this._genHTML(100-A*B,B)
}C+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=C
}});
dojo.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
dojo.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(A){return A
},_genHTML:function(B,A){return this._positionPrefix+this._calcPosition(B)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[A]+this._suffix
},getLabels:function(){var D=this.labels;
if(!D.length){D=dojo.query("> li",this.srcNodeRef).map(function(E){return String(E.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!D.length&&this.count>1){var C=this.minimum;
var B=(this.maximum-C)/(this.count-1);
for(var A=0;
A<this.count;
A++){D.push((A<this.numericMargin||A>=(this.count-this.numericMargin))?"":dojo.number.format(C,this.constraints));
C+=B
}}return D
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
dojo.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(A){return 100-A
},_isHorizontal:false})
}if(!dojo._hasResource["dijit.form.Textarea"]){dojo._hasResource["dijit.form.Textarea"]=true;
dojo.provide("dijit.form.Textarea");
dojo.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(dojo.isIE||dojo.isSafari||dojo.isMozilla)?((dojo.isIE||dojo.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((dojo.isIE||dojo.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(dojo.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(F,E){var C=this.editNode;
if(typeof F=="string"){C.innerHTML="";
if(F.split){var G=this;
var A=true;
dojo.forEach(F.split("\n"),function(H){if(A){A=false
}else{C.appendChild(document.createElement("BR"))
}C.appendChild(document.createTextNode(H))
})
}else{C.appendChild(document.createTextNode(F))
}}else{F=C.innerHTML;
if(this.iframe){F=F.replace(/<div><\/div>\r?\n?$/i,"")
}F=F.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=F;
if(this.iframe){var D=document.createElement("div");
C.appendChild(D);
var B=D.offsetTop;
if(C.scrollWidth>C.clientWidth){B+=16
}if(this.lastHeight!=B){if(B==0){B=16
}dojo.contentBox(this.iframe,{h:B});
this.lastHeight=B
}C.removeChild(D)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),E)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var B=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=B.iframeEditTitle;
this._iframeFocusTitle=B.iframeFocusTitle;
var C=dojo.query('label[for="'+this.id+'"]');
if(C.length){this._iframeEditTitle=C[0].innerHTML+" "+this._iframeEditTitle
}var A=this.focusNode=this.editNode=document.createElement("BODY");
A.style.margin="0px";
A.style.padding="0px";
A.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var A=this.iframe.contentWindow;
try{var D=this.iframe.contentDocument.title
}catch(B){var D=""
}if(!A||!D){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var C=A.document;
C.getElementsByTagName("HTML")[0].replaceChild(this.editNode,C.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){C.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=C;
A.addEventListener("resize",dojo.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(A){dojo.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(A)
},_blurred:function(A){dojo.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(A,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(A){if(A.keyCode==dojo.keys.TAB&&!A.shiftKey&&!A.ctrlKey&&!A.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(A)
}else{if(A.keyCode==dojo.keys.ENTER){A.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var B=document.createEvent("KeyEvents");
B.initKeyEvent("keypress",true,true,null,A.ctrlKey,A.altKey,A.shiftKey,A.metaKey,A.keyCode,A.charCode);
this.iframe.dispatchEvent(B)
}}}this._changing()
},_changing:function(A){setTimeout(dojo.hitch(this,"_changed",A,false),1)
},_changed:function(B,A){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,A)
}})
}if(!dojo._hasResource["dijit.layout.StackContainer"]){dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var A=this.getChildren();
dojo.forEach(A,this._setupChild,this);
dojo.some(A,function(C){if(C.selected){this.selectedChildWidget=C
}return C.selected
},this);
var B=this.selectedChildWidget;
if(!B&&A[0]){B=this.selectedChildWidget=A[0];
B.selected=true
}if(B){this._showChild(B)
}dojo.publish(this.id+"-startup",[{children:A,selected:B}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(A){A.domNode.style.display="none";
A.domNode.style.position="relative";
return A
},addChild:function(B,A){dijit._Container.prototype.addChild.apply(this,arguments);
B=this._setupChild(B);
if(this._started){this.layout();
dojo.publish(this.id+"-addChild",[B,A]);
if(!this.selectedChildWidget){this.selectChild(B)
}}},removeChild:function(B){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){dojo.publish(this.id+"-removeChild",[B]);
this.layout()
}if(this.selectedChildWidget===B){this.selectedChildWidget=undefined;
if(this._started){var A=this.getChildren();
if(A.length){this.selectChild(A[0])
}}}},selectChild:function(A){A=dijit.byId(A);
if(this.selectedChildWidget!=A){this._transition(A,this.selectedChildWidget);
this.selectedChildWidget=A;
dojo.publish(this.id+"-selectChild",[A])
}},_transition:function(B,A){if(A){this._hideChild(A)
}this._showChild(B);
if(this.doLayout&&B.resize){B.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(B){var C=this.getChildren();
var A=dojo.indexOf(C,this.selectedChildWidget);
A+=B?1:C.length-1;
return C[A%C.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(A){dojo.publish(this.id+"-containerKeyPress",[{e:A,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(B){var A=this.getChildren();
B.isFirstChild=(B==A[0]);
B.isLastChild=(B==A[A.length-1]);
B.selected=true;
B.domNode.style.display="";
if(B._loadCheck){B._loadCheck()
}if(B.onShow){B.onShow()
}},_hideChild:function(A){A.selected=false;
A.domNode.style.display="none";
if(A.onHide){A.onHide()
}},closeChild:function(B){var A=B.onClose(this,B);
if(A){this.removeChild(B);
B.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[dojo.subscribe(this.containerId+"-startup",this,"onStartup"),dojo.subscribe(this.containerId+"-addChild",this,"onAddChild"),dojo.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),dojo.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),dojo.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(A){dojo.forEach(A.children,this.onAddChild,this);
this.onSelectChild(A.selected)
},destroy:function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(E,A){var C=document.createElement("span");
this.domNode.appendChild(C);
var B=dojo.getObject(this.buttonWidget);
var D=new B({label:E.title,closeButton:E.closable},C);
this.addChild(D,A);
this.pane2button[E]=D;
E.controlButton=D;
dojo.connect(D,"onClick",dojo.hitch(this,"onButtonClick",E));
dojo.connect(D,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",E));
if(!this._currentChild){D.focusNode.setAttribute("tabIndex","0");
this._currentChild=E
}},onRemoveChild:function(B){if(this._currentChild===B){this._currentChild=null
}var A=this.pane2button[B];
if(A){A.destroy()
}this.pane2button[B]=null
},onSelectChild:function(C){if(!C){return 
}if(this._currentChild){var A=this.pane2button[this._currentChild];
A.setChecked(false);
A.focusNode.setAttribute("tabIndex","-1")
}var B=this.pane2button[C];
B.setChecked(true);
this._currentChild=C;
B.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(B){var A=dijit.byId(this.containerId);
A.selectChild(B)
},onCloseButtonClick:function(C){var B=dijit.byId(this.containerId);
B.closeChild(C);
var A=this.pane2button[this._currentChild];
if(A){dijit.focus(A.focusNode||A.domNode)
}},adjacent:function(A){var B=this.getChildren();
var C=dojo.indexOf(B,this.pane2button[this._currentChild]);
var D=A?1:B.length-1;
return B[(C+D)%B.length]
},onkeypress:function(C){if(this.disabled||C.altKey){return 
}var B=true;
if(C.ctrlKey||!C._djpage){var A=dojo.keys;
switch(C.keyCode){case A.LEFT_ARROW:case A.UP_ARROW:case A.PAGE_UP:B=false;
case A.RIGHT_ARROW:case A.DOWN_ARROW:case A.PAGE_DOWN:this.adjacent(B).onClick();
dojo.stopEvent(C);
break;
case A.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(C);
break;
default:if(C.ctrlKey){if(C.keyCode==A.TAB){this.adjacent(!C.shiftKey).onClick();
dojo.stopEvent(C)
}else{if(C.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(C)
}}}}}},onContainerKeyPress:function(A){A.e._djpage=A.page;
this.onkeypress(A.e)
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(A){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(A){dijit.focus(this.focusNode)
},onClickCloseButton:function(A){A.stopPropagation()
}});
dojo.extend(dijit._Widget,{title:"",selected:false,closable:false,onClose:function(){return true
}})
}if(!dojo._hasResource["dijit.layout.AccordionContainer"]){dojo._hasResource["dijit.layout.AccordionContainer"]=true;
dojo.provide("dijit.layout.AccordionContainer");
dojo.declare("dijit.layout.AccordionContainer",dijit.layout.StackContainer,{duration:250,_verticalSpace:0,postCreate:function(){this.domNode.style.overflow="hidden";
this.inherited("postCreate",arguments);
dijit.setWaiRole(this.domNode,"tablist");
dojo.addClass(this.domNode,"dijitAccordionContainer")
},startup:function(){if(this._started){return 
}this.inherited("startup",arguments);
if(this.selectedChildWidget){var A=this.selectedChildWidget.containerNode.style;
A.display="";
A.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var C=0;
var B=this.selectedChildWidget;
dojo.forEach(this.getChildren(),function(D){C+=D.getTitleHeight()
});
var A=this._contentBox;
this._verticalSpace=(A.h-C);
if(B){B.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(A){return A
},_transition:function(E,D){if(this._inTransition){return 
}this._inTransition=true;
var F=[];
var C=this._verticalSpace;
if(E){E.setSelected(true);
var B=E.containerNode;
B.style.display="";
F.push(dojo.animateProperty({node:B,duration:this.duration,properties:{height:{start:"1",end:C}},onEnd:function(){B.style.overflow="auto"
}}))
}if(D){D.setSelected(false);
var A=D.containerNode;
A.style.overflow="hidden";
F.push(dojo.animateProperty({node:A,duration:this.duration,properties:{height:{start:C,end:"1"}},onEnd:function(){A.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(F).play()
},_onKeyPress:function(B){if(this.disabled||B.altKey){return 
}var A=dojo.keys;
switch(B.keyCode){case A.LEFT_ARROW:case A.UP_ARROW:case A.PAGE_UP:this._adjacent(false)._onTitleClick();
dojo.stopEvent(B);
break;
case A.RIGHT_ARROW:case A.DOWN_ARROW:case A.PAGE_DOWN:this._adjacent(true)._onTitleClick();
dojo.stopEvent(B);
break;
default:if(B.ctrlKey&&B.keyCode==A.TAB){this._adjacent(B._dijitWidget,!B.shiftKey)._onTitleClick();
dojo.stopEvent(B)
}}}});
dojo.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
dojo.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return dojo.marginBox(this.titleNode).h
},_onTitleClick:function(){var A=this.getParent();
if(!A._inTransition){A.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(A){A._dijitWidget=this;
return this.getParent()._onKeyPress(A)
},_setSelectedState:function(A){this.selected=A;
dojo[(A?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",A?"0":"-1")
},_handleFocus:function(A){dojo[(A.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(A){this._setSelectedState(A);
if(A){this.onSelected()
}},onSelected:function(){}})
}if(!dojo._hasResource["dijit.layout.LayoutContainer"]){dojo._hasResource["dijit.layout.LayoutContainer"]=true;
dojo.provide("dijit.layout.LayoutContainer");
dojo.declare("dijit.layout.LayoutContainer",dijit.layout._LayoutWidget,{layout:function(){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(B,A){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}}});
dojo.extend(dijit._Widget,{layoutAlign:"none"})
}if(!dojo._hasResource["dijit.layout.LinkPane"]){dojo._hasResource["dijit.layout.LinkPane"]=true;
dojo.provide("dijit.layout.LinkPane");
dojo.declare("dijit.layout.LinkPane",[dijit.layout.ContentPane,dijit._Templated],{templateString:'<div class="dijitLinkPane"></div>',postCreate:function(){if(this.srcNodeRef){this.title+=this.srcNodeRef.innerHTML
}this.inherited("postCreate",arguments)
}})
}if(!dojo._hasResource["dijit.layout.SplitContainer"]){dojo._hasResource["dijit.layout.SplitContainer"]=true;
dojo.provide("dijit.layout.SplitContainer");
dojo.declare("dijit.layout.SplitContainer",dijit.layout._LayoutWidget,{activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal")
},postCreate:function(){this.inherited("postCreate",arguments);
this.sizers=[];
dojo.addClass(this.domNode,"dijitSplitContainer");
if(dojo.isMozilla){this.domNode.style.overflow="-moz-scrollbars-none"
}if(typeof this.sizerWidth=="object"){try{this.sizerWidth=parseInt(this.sizerWidth.toString())
}catch(B){this.sizerWidth=7
}}var A=this.virtualSizer=document.createElement("div");
A.style.position="relative";
A.style.zIndex=10;
A.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(A);
dojo.setSelectable(A,false)
},startup:function(){if(this._started){return 
}dojo.forEach(this.getChildren(),function(C,B,A){this._injectChild(C);
if(B<A.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(A){A.domNode.style.position="absolute";
dojo.addClass(A.domNode,"dijitSplitPane")
},_addSizer:function(){var C=this.sizers.length;
var E=this.sizers[C]=document.createElement("div");
E.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var B=document.createElement("div");
B.className="thumb";
E.appendChild(B);
var A=this;
var D=(function(){var F=C;
return function(G){A.beginSizing(G,F)
}
})();
dojo.connect(E,"onmousedown",D);
this.domNode.appendChild(E);
dojo.setSelectable(E,false)
},removeChild:function(B){if(this.sizers.length&&dojo.indexOf(this.getChildren(),B)!=-1){var A=this.sizers.length-1;
dojo._destroyElement(this.sizers[A]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(C,A){this.inherited("addChild",arguments);
if(this._started){this._injectChild(C);
var B=this.getChildren();
if(B.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var C=this.getChildren();
if(!C.length){return 
}var E=this.isHorizontal?this.paneWidth:this.paneHeight;
if(C.length>1){E-=this.sizerWidth*(C.length-1)
}var D=0;
dojo.forEach(C,function(H){D+=H.sizeShare
});
var F=E/D;
var A=0;
dojo.forEach(C.slice(0,C.length-1),function(I){var H=Math.round(F*I.sizeShare);
I.sizeActual=H;
A+=H
});
C[C.length-1].sizeActual=E-A;
this._checkSizes();
var G=0;
var B=C[0].sizeActual;
this._movePanel(C[0],G,B);
C[0].position=G;
G+=B;
if(!this.sizers){return 
}dojo.some(C.slice(1),function(I,H){if(!this.sizers[H]){return true
}this._moveSlider(this.sizers[H],G,this.sizerWidth);
this.sizers[H].position=G;
G+=this.sizerWidth;
B=I.sizeActual;
this._movePanel(I,G,B);
I.position=G;
G+=B
},this)
},_movePanel:function(A,D,B){if(this.isHorizontal){A.domNode.style.left=D+"px";
A.domNode.style.top=0;
var C={w:B,h:this.paneHeight};
if(A.resize){A.resize(C)
}else{dojo.marginBox(A.domNode,C)
}}else{A.domNode.style.left=0;
A.domNode.style.top=D+"px";
var C={w:this.paneWidth,h:B};
if(A.resize){A.resize(C)
}else{dojo.marginBox(A.domNode,C)
}}},_moveSlider:function(B,C,A){if(this.isHorizontal){B.style.left=C+"px";
B.style.top=0;
dojo.marginBox(B,{w:A,h:this.paneHeight})
}else{B.style.left=0;
B.style.top=C+"px";
dojo.marginBox(B,{w:this.paneWidth,h:A})
}},_growPane:function(A,B){if(A>0){if(B.sizeActual>B.sizeMin){if((B.sizeActual-B.sizeMin)>A){B.sizeActual=B.sizeActual-A;
A=0
}else{A-=B.sizeActual-B.sizeMin;
B.sizeActual=B.sizeMin
}}}return A
},_checkSizes:function(){var D=0;
var B=0;
var C=this.getChildren();
dojo.forEach(C,function(F){B+=F.sizeActual;
D+=F.sizeMin
});
if(D<=B){var A=0;
dojo.forEach(C,function(F){if(F.sizeActual<F.sizeMin){A+=F.sizeMin-F.sizeActual;
F.sizeActual=F.sizeMin
}});
if(A>0){var E=this.isDraggingLeft?C.reverse():C;
dojo.forEach(E,function(F){A=this._growPane(A,F)
},this)
}}else{dojo.forEach(C,function(F){F.sizeActual=Math.round(B*(F.sizeMin/D))
})
}},beginSizing:function(F,D){var C=this.getChildren();
this.paneBefore=C[D];
this.paneAfter=C[D+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[D];
if(!this.cover){this.cover=dojo.doc.createElement("div");
this.domNode.appendChild(this.cover);
var E=this.cover.style;
E.position="absolute";
E.zIndex=1;
E.top=0;
E.left=0;
E.width="100%";
E.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=dojo.coords(C[0].domNode,true);
if(this.isHorizontal){var A=(F.layerX?F.layerX:F.offsetX);
var B=F.pageX;
this.originPos=this.originPos.x
}else{var A=(F.layerY?F.layerY:F.offsetY);
var B=F.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=B;
this.screenToClientOffset=B-A;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(dojo.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(dojo.connect(document.documentElement,"onmouseup",this,"endSizing"));
dojo.stopEvent(F)
},changeSizing:function(A){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?A.pageX:A.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}dojo.stopEvent(A)
},endSizing:function(A){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}dojo.forEach(this._connects,dojo.disconnect)
},movePoint:function(){var B=this.lastPoint-this.screenToClientOffset;
var A=B-this.dragOffset;
A=this.legaliseSplitPoint(A);
B=A+this.dragOffset;
this.lastPoint=B+this.screenToClientOffset
},legaliseSplitPoint:function(B){B+=this.sizingSplitter.position;
this.isDraggingLeft=!!(B>0);
if(!this.activeSizing){var C=this.paneBefore.position+this.paneBefore.sizeMin;
if(B<C){B=C
}var A=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(B>A){B=A
}}B-=this.sizingSplitter.position;
this._checkSizes();
return B
},_updateSize:function(){var C=this.lastPoint-this.dragOffset-this.originPos;
var A=this.paneBefore.position;
var B=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=C-A;
this.paneAfter.position=C+this.sizerWidth;
this.paneAfter.sizeActual=B-this.paneAfter.position;
dojo.forEach(this.getChildren(),function(D){D.sizeShare=D.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
dojo.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var A=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
dojo.style(this.virtualSizer,(this.isHorizontal?"left":"top"),A+"px")
},_getCookieName:function(A){return this.id+"_"+A
},_restoreState:function(){dojo.forEach(this.getChildren(),function(E,A){var D=this._getCookieName(A);
var B=dojo.cookie(D);
if(B){var C=parseInt(B);
if(typeof C=="number"){E.sizeShare=C
}}},this)
},_saveState:function(){dojo.forEach(this.getChildren(),function(B,A){dojo.cookie(this._getCookieName(A),B.sizeShare)
},this)
}});
dojo.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
}if(!dojo._hasResource["dijit.layout.TabContainer"]){dojo._hasResource["dijit.layout.TabContainer"]=true;
dojo.provide("dijit.layout.TabContainer");
dojo.declare("dijit.layout.TabContainer",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",templateString:null,templateString:'<div class="dijitTabContainer">\r\n\t<div dojoAttachPoint="tablistNode"></div>\r\n\t<div class="dijitTabPaneWrapper" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',postCreate:function(){dijit.layout.TabContainer.superclass.postCreate.apply(this,arguments);
this.tablist=new dijit.layout.TabController({id:this.id+"_tablist",tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id},this.tablistNode)
},_setupChild:function(A){dojo.addClass(A.domNode,"dijitTabPane");
this.inherited("_setupChild",arguments);
return A
},startup:function(){if(this._started){return 
}this.tablist.startup();
this.inherited("startup",arguments);
if(dojo.isSafari){setTimeout(dojo.hitch(this,"layout"),0)
}},layout:function(){if(!this.doLayout){return 
}var B=this.tabPosition.replace(/-h/,"");
var A=[{domNode:this.tablist.domNode,layoutAlign:B},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,A);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,A[1]);
if(this.selectedChildWidget){this._showChild(this.selectedChildWidget);
if(this.doLayout&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._containerContentBox)
}}},destroy:function(){this.tablist.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",doLayout:true,buttonWidget:"dijit.layout._TabButton",postMixInProperties:function(){this["class"]="dijitTabLabels-"+this.tabPosition+(this.doLayout?"":" dijitTabNoLayout");
this.inherited("postMixInProperties",arguments)
}});
dojo.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",templateString:"<div dojoAttachEvent='onclick:onClick,onmouseenter:_onMouse,onmouseleave:_onMouse'>\r\n    <div class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\r\n        <span dojoAttachPoint='containerNode,focusNode'>${!label}</span>\r\n        <span dojoAttachPoint='closeButtonNode' class='closeImage' dojoAttachEvent='onmouseenter:_onMouse, onmouseleave:_onMouse, onclick:onClickCloseButton' stateModifier='CloseButton'>\r\n            <span dojoAttachPoint='closeText' class='closeText'>x</span>\r\n        </span>\r\n    </div>\r\n</div>\r\n",postCreate:function(){if(this.closeButton){dojo.addClass(this.innerDiv,"dijitClosable")
}else{this.closeButtonNode.style.display="none"
}this.inherited("postCreate",arguments);
dojo.setSelectable(this.containerNode,false)
}})
}if(!dojo._hasResource["dijit.dijit-all"]){dojo._hasResource["dijit.dijit-all"]=true;
console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool");
dojo.provide("dijit.dijit-all")
}dojo.i18n._preloadLocalizations("dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]);