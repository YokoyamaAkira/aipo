if(!dojo._hasResource["dojo.colors"]){dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
(function(){var B=function(D,C,E){if(E<0){++E
}if(E>1){--E
}var F=6*E;
if(F<1){return D+(C-D)*F
}if(2*E<1){return C
}if(3*E<2){return D+(C-D)*(2/3-E)*6
}return D
};
dojo.colorFromRgb=function(I,G){var D=I.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(D){var K=D[2].split(/\s*,\s*/),E=K.length,Q=D[1];
if((Q=="rgb"&&E==3)||(Q=="rgba"&&E==4)){var C=K[0];
if(C.charAt(C.length-1)=="%"){var M=dojo.map(K,function(H){return parseFloat(H)*2.56
});
if(E==4){M[3]=K[3]
}return dojo.colorFromArray(M,G)
}return dojo.colorFromArray(K,G)
}if((Q=="hsl"&&E==3)||(Q=="hsla"&&E==4)){var N=((parseFloat(K[0])%360)+360)%360/360,F=parseFloat(K[1])/100,J=parseFloat(K[2])/100,O=J<=0.5?J*(F+1):J+F-J*F,P=2*J-O,M=[B(P,O,N+1/3)*256,B(P,O,N)*256,B(P,O,N-1/3)*256,1];
if(E==4){M[3]=K[3]
}return dojo.colorFromArray(M,G)
}}return null
};
var A=function(E,C,D){E=Number(E);
return isNaN(E)?D:E<C?C:E>D?D:E
};
dojo.Color.prototype.sanitize=function(){var C=this;
C.r=Math.round(A(C.r,0,255));
C.g=Math.round(A(C.g,0,255));
C.b=Math.round(A(C.b,0,255));
C.a=A(C.a,0,1);
return this
}
})();
dojo.colors.makeGrey=function(B,A){return dojo.colorFromArray([B,B,B,A])
};
dojo.Color.named=dojo.mixin({aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},dojo.Color.named)
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(G,F,E){E=dojo.i18n.normalizeLocale(E);
var D=E.split("-");
var C=[G,"nls",F].join(".");
var B=dojo._loadedModules[C];
if(B){var A;
for(var H=D.length;
H>0;
H--){var I=D.slice(0,H).join("_");
if(B[I]){A=B[I];
break
}}if(!A){A=B.ROOT
}if(A){var J=function(){};
J.prototype=A;
return new J()
}}throw new Error("Bundle not found: "+F+" in "+G+" , locale="+E)
};
dojo.i18n.normalizeLocale=function(B){var A=B?B.toLowerCase():dojo.locale;
if(A=="root"){A="ROOT"
}return A
};
dojo.i18n._requireLocalization=function(M,L,J,A){var Q=dojo.i18n.normalizeLocale(J);
var P=[M,"nls",L].join(".");
var O="";
if(A){var N=A.split(",");
for(var B=0;
B<N.length;
B++){if(Q.indexOf(N[B])==0){if(N[B].length>O.length){O=N[B]
}}}if(!O){O="ROOT"
}}var K=A?O:Q;
var I=dojo._loadedModules[P];
var H=null;
if(I){if(djConfig.localizationComplete&&I._built){return 
}var G=K.replace(/-/g,"_");
var F=P+"."+G;
H=dojo._loadedModules[F]
}if(!H){I=dojo.provide(P);
var E=dojo._getModuleSymbols(M);
var D=E.concat("nls").join("/");
var C;
dojo.i18n._searchLocalePath(K,A,function(W){var R=W.replace(/-/g,"_");
var V=P+"."+R;
var U=false;
if(!dojo._loadedModules[V]){dojo.provide(V);
var T=[D];
if(W!="ROOT"){T.push(W)
}T.push(L);
var S=T.join("/")+".js";
U=dojo._loadPath(S,null,function(Z){var Y=function(){};
Y.prototype=C;
I[R]=new Y();
for(var X in Z){I[R][X]=Z[X]
}})
}else{U=true
}if(U&&I[R]){C=I[R]
}else{I[R]=C
}if(A){return true
}})
}if(A&&Q!=O){I[Q.replace(/-/g,"_")]=I[O.replace(/-/g,"_")]
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
dojo.i18n._searchLocalePath=function(C,A,F){C=dojo.i18n.normalizeLocale(C);
var E=C.split("-");
var D=[];
for(var H=E.length;
H>0;
H--){D.push(E.slice(0,H).join("-"))
}D.push(false);
if(A){D.reverse()
}for(var G=D.length-1;
G>=0;
G--){var I=D[G]||"ROOT";
var B=F(I);
if(B){break
}}};
dojo.i18n._preloadLocalizations=function(E,D){function B(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<D.length;
G++){if(D[G]==H){dojo.require(E+"_"+H);
return true
}}return false
})
}B();
var A=djConfig.extraLocale||[];
for(var C=0;
C<A.length;
C++){B(A[C])
}}
}if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
dojo.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":dojo.moduleUrl("dijit","templates/colors7x10.png"),"3x4":dojo.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){dojo.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var F=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=dojo.i18n.getLocalization("dojo","colors",this.lang);
var A=dojo.moduleUrl("dijit","templates/blank.gif");
var L=new dojo.Color(),J=this._paletteCoords;
for(var K=0;
K<F.length;
K++){for(var B=0;
B<F[K].length;
B++){var H=document.createElement("img");
H.src=A;
dojo.addClass(H,"dijitPaletteImg");
var G=F[K][B],E=L.setColor(dojo.Color.named[G]);
H.alt=this.colorNames[G];
H.color=E.toHex();
var D=H.style;
D.color=D.backgroundColor=H.color;
dojo.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(M){this.connect(H,"on"+M.toLowerCase(),"_onColor"+M)
},this);
this.divNode.appendChild(H);
D.top=J.topOffset+(K*J.cHeight)+"px";
D.left=J.leftOffset+(B*J.cWidth)+"px";
H.setAttribute("tabIndex","-1");
H.title=this.colorNames[G];
dijit.setWaiRole(H,"gridcell");
H.index=this._highlightNodes.length;
this._highlightNodes.push(H)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=F[0].length;
this._yDim=F.length;
var C={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var I in C){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:dojo.keys[I],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var M=C[I];
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
},_navigateByKey:function(A,D){if(D==-1){return 
}var C=this._currentFocus+A;
if(C<this._highlightNodes.length&&C>-1){var B=this._highlightNodes[C];
B.tabIndex=0;
B.focus()
}}})
}if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var F=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var E=dojo.query("> script[type='dojo/method'][event='preamble']",F).orphan();
var C=dojo.query("> script[type^='dojo/']",F).orphan();
var B=F.nodeName;
var A=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(G){return dojo.getObject(G)
}):[dijit._Widget,dijit._Templated];
if(E.length){A.preamble=dojo.parser._functionFromScript(E[0])
}var D=dojo.map(C,function(H){var G=H.getAttribute("event")||"postscript";
return{event:G,func:dojo.parser._functionFromScript(H)}
});
this.mixins.push(function(){dojo.forEach(D,function(G){dojo.connect(this,G.event,this,G.func)
},this)
});
A.widgetsInTemplate=true;
A._skipNodeCache=true;
A.templateString="<"+B+" class='"+F.className+"' dojoAttachPoint='"+(F.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(F.getAttribute("dojoAttachEvent")||"")+"' >"+F.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+B+">";
dojo.query("[dojoType]",F).forEach(function(G){G.removeAttribute("dojoType")
});
dojo.declare(this.widgetClass,this.mixins,A)
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
}}}var E=C.scrollLeft,D=C.scrollTop;
C.scrollLeft=C.scrollLeft+M;
C.scrollTop=C.scrollTop+K;
if(E!=C.scrollLeft||D!=C.scrollTop){return 
}}}try{C=C.parentNode
}catch(I){C=null
}}dojo.dnd.autoScroll(G)
}
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(C,D,F){this.node=dojo.byId(C);
this.marginBox={l:D.pageX,t:D.pageY};
this.mouseButton=D.button;
var A=this.host=F,E=C.ownerDocument,B=dojo.connect(E,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(E,"onmousemove",this,"onMouseMove"),dojo.connect(E,"onmouseup",this,"onMouseUp"),dojo.connect(E,"ondragstart",dojo,"stopEvent"),dojo.connect(E,"onselectstart",dojo,"stopEvent"),B];
if(A&&A.onMoveStart){A.onMoveStart(this)
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
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(B,A){this.node=dojo.byId(B);
if(!A){A={}
}this.handle=A.handle?dojo.byId(A.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=A.delay>0?A.delay:0;
this.skip=A.skip;
this.mover=A.mover?A.mover:dojo.dnd.Mover;
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
},constructor:function(B,A){if(!A){A={}
}this.constraints=A.constraints;
this.within=A.within
},onFirstMove:function(B){var C=this.constraintBox=this.constraints.call(this,B),A=B.marginBox;
C.r=C.l+C.w-(this.within?A.w:0);
C.b=C.t+C.h-(this.within?A.h:0)
},onMove:function(B,A){var C=this.constraintBox;
A.l=A.l<C.l?C.l:C.r<A.l?C.r:A.l;
A.t=A.t<C.t?C.t:C.b<A.t?C.b:A.t;
dojo.marginBox(B.node,A)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(A,B){return new dojo.dnd.move.boxConstrainedMoveable(B,A)
},constructor:function(A,C){var B=C&&C.box;
this.constraints=function(){return B
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(B,A){return new dojo.dnd.move.parentConstrainedMoveable(A,B)
},constructor:function(C,B){var A=B&&B.area;
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
dojo.dnd.move.boxConstrainedMover=function(A,B){return dojo.dnd.move.constrainedMover(function(){return A
},B)
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
dojo.declare("dojo.fx.Toggler",null,{constructor:function(B){var A=this;
dojo.mixin(A,B);
A.node=B.node;
A._showArgs=dojo.mixin({},B);
A._showArgs.node=A.node;
A._showArgs.duration=A.showDuration;
A.showAnim=A.showFunc(A._showArgs);
A._hideArgs=dojo.mixin({},B);
A._hideArgs.node=A.node;
A._hideArgs.duration=A.hideDuration;
A.hideAnim=A.hideFunc(A._hideArgs);
dojo.connect(A.showAnim,"beforeBegin",dojo.hitch(A.hideAnim,"stop",true));
dojo.connect(A.hideAnim,"beforeBegin",dojo.hitch(A.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(A){return this.showAnim.play(A||0)
},hide:function(A){return this.hideAnim.play(A||0)
}});
dojo.fx.wipeIn=function(D){D.node=dojo.byId(D.node);
var C=D.node,B=C.style;
var A=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){B.overflow="hidden";
if(B.visibility=="hidden"||B.display=="none"){B.height="1px";
B.display="";
B.visibility="";
return 1
}else{var E=dojo.style(C,"height");
return Math.max(E,1)
}},end:function(){return C.scrollHeight
}}}},D));
dojo.connect(A,"onEnd",function(){B.height="auto"
});
return A
};
dojo.fx.wipeOut=function(C){var B=C.node=dojo.byId(C.node);
var D=B.style;
var A=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},C));
dojo.connect(A,"beforeBegin",function(){D.overflow="hidden";
D.display=""
});
dojo.connect(A,"onEnd",function(){D.height="auto";
D.display="none"
});
return A
};
dojo.fx.slideTo=function(F){var E=(F.node=dojo.byId(F.node));
var D=null;
var B=null;
var A=(function(G){return function(){var I=dojo.getComputedStyle(G);
var J=I.position;
D=(J=="absolute"?G.offsetTop:parseInt(I.top)||0);
B=(J=="absolute"?G.offsetLeft:parseInt(I.left)||0);
if(J!="absolute"&&J!="relative"){var H=dojo.coords(G,true);
D=H.y;
B=H.x;
G.style.position="absolute";
G.style.top=D+"px";
G.style.left=B+"px"
}}
})(E);
A();
var C=dojo.animateProperty(dojo.mixin({properties:{top:{end:F.top||0},left:{end:F.left||0}}},F));
dojo.connect(C,"beforeBegin",C,A);
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
try{var C=this.containerNode||this.domNode;
while(C.firstChild){dojo._destroyElement(C.firstChild)
}if(typeof A=="string"){if(this.extractContent){match=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){A=match[1]
}}C.innerHTML=A
}else{if(A.nodeType){C.appendChild(A)
}else{dojo.forEach(A,function(E){C.appendChild(E.cloneNode(true))
})
}}}catch(D){var B=this.onContentError(D);
try{C.innerHTML=B
}catch(D){console.error("Fatal "+this.id+" could not change content due to "+D.message,D)
}}},_onError:function(C,D,B){var A=this["on"+C+"Error"].call(this,D);
if(B){console.error(B,D)
}else{if(A){this._setContent.call(this,A)
}}},_createSubWidgets:function(){var B=this.containerNode||this.domNode;
try{dojo.parser.parse(B,true)
}catch(A){this._onError("Content",A,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
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
for(var A in D){var C=D[A],B=dojo.getObject(A,false,E);
if(!dojo.isArray(B)){B=[B]
}if(C[0].setChecked){dojo.forEach(C,function(F,G){F.setChecked(dojo.indexOf(B,F.value)!=-1)
})
}else{dojo.forEach(C,function(F,G){F.setValue(B[G])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(D){var B=D.getValue?D.getValue():D.value;
var C=D.name;
if(!C){return 
}if(D.setChecked){if(/Radio/.test(D.declaredClass)){if(D.checked){dojo.setObject(C,B,A)
}}else{var E=dojo.getObject(C,false,A);
if(!E){E=[];
dojo.setObject(C,E,A)
}if(D.checked){E.push(B)
}}}else{dojo.setObject(C,B,A)
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
var B=this.node.style,C=this.domNode.style;
C.top=A.t+"px";
C.left=A.l+"px";
B.width=A.w+"px";
B.height=A.h+"px";
var D=dijit.getViewport();
if(A.w!=D.w){B.width=D.w+"px"
}if(A.h!=D.h){B.height=D.h+"px"
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
}var B=dijit.getViewport();
var C=dojo.marginBox(this.domNode);
var A=this.domNode.style;
A.left=Math.floor((B.l+(B.w-C.w)/2))+"px";
A.top=Math.floor((B.t+(B.h-C.h)/2))+"px"
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
}else{var D="text";
var A;
try{A=dojo.global.getSelection()
}catch(C){}if(A&&A.rangeCount==1){var B=A.getRangeAt(0);
if((B.startContainer==B.endContainer)&&((B.endOffset-B.startOffset)==1)&&(B.startContainer.nodeType!=3)){D="control"
}}return D
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
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var B=dojo.doc.selection.createRange();
if(B&&B.item){return dojo.doc.selection.createRange().item(0)
}}else{var A=dojo.global.getSelection();
return A.anchorNode.childNodes[A.anchorOffset]
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
}},selectElementChildren:function(F,E){var D=dojo.global;
var C=dojo.doc;
F=dojo.byId(F);
if(C.selection&&dojo.body().createTextRange){var A=F.ownerDocument.body.createTextRange();
A.moveToElementText(F);
if(!E){A.select()
}}else{if(D.getSelection){var B=D.getSelection();
if(B.setBaseAndExtent){B.setBaseAndExtent(F,0,F,F.innerText.length-1)
}else{if(B.selectAllChildren){B.selectAllChildren(F)
}}}}},selectElement:function(E,D){var C=dojo.doc;
E=dojo.byId(E);
if(C.selection&&dojo.body().createTextRange){try{var B=dojo.body().createControlRange();
B.addElement(E);
if(!D){B.select()
}}catch(F){this.selectElementChildren(E,D)
}}else{if(dojo.global.getSelection){var A=dojo.global.getSelection();
if(A.removeAllRanges){var B=C.createRange();
B.selectNode(E);
A.removeAllRanges();
A.addRange(B)
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
var A=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var G="",E,B=0;
while((E=A[B++])){if(E.charAt(1)!="l"){G+="<"+E+"><span>content</span></"+E+">"
}else{G+="<"+E+"><li>content</li></"+E+">"
}}var F=document.createElement("div");
F.style.position="absolute";
F.style.left="-2000px";
F.style.top="-2000px";
document.body.appendChild(F);
F.innerHTML=G;
var C=F.firstChild;
while(C){dijit._editor.selection.selectElement(C.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[C.firstChild]);
var D=C.tagName.toLowerCase();
this._local2NativeFormatNames[D]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[D]]=D;
C=C.nextSibling
}document.body.removeChild(F)
},open:function(_173){if((!this.onLoadDeferred)||(this.onLoadDeferred.fired>=0)){this.onLoadDeferred=new dojo.Deferred()
}if(!this.isClosed){this.close()
}dojo.publish("dijit._editor.RichText::open",[this]);
this._content="";
if((arguments.length==1)&&(_173.nodeName)){this.domNode=_173
}if((this.domNode.nodeName)&&(this.domNode.nodeName.toLowerCase()=="textarea")){this.textarea=this.domNode;
this.name=this.textarea.name;
var html=this._preFilterContent(this.textarea.value);
this.domNode=dojo.doc.createElement("div");
this.domNode.setAttribute("widgetId",this.id);
this.textarea.removeAttribute("widgetId");
this.domNode.cssText=this.textarea.cssText;
this.domNode.className+=" "+this.textarea.className;
dojo.place(this.domNode,this.textarea,"before");
var _175=dojo.hitch(this,function(){with(this.textarea.style){display="block";
position="absolute";
left=top="-1000px";
if(dojo.isIE){this.__overflow=overflow;
overflow="hidden"
}}});
if(dojo.isIE){setTimeout(_175,10)
}else{_175()
}}else{var html=this._preFilterContent(this.getNodeChildrenHtml(this.domNode));
this.domNode.innerHTML=""
}if(html==""){html="&nbsp;"
}var _176=dojo.contentBox(this.domNode);
this._oldHeight=_176.h;
this._oldWidth=_176.w;
this.savedContent=html;
if((this.domNode.nodeName)&&(this.domNode.nodeName=="LI")){this.domNode.innerHTML=" <br>"
}this.editingArea=dojo.doc.createElement("div");
this.domNode.appendChild(this.editingArea);
if(this.name!=""&&(!djConfig.useXDomain||djConfig.allowXdRichTextSave)){var _177=dojo.byId("dijit._editor.RichText.savedContent");
if(_177.value!=""){var _178=_177.value.split(this._SEPARATOR),i=0,dat;
while((dat=_178[i++])){var data=dat.split(":");
if(data[0]==this.name){html=data[1];
_178.splice(i,1);
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
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(C){var D=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){C="<div>"+C+"</div>"
}var B=[D.fontWeight,D.fontSize,D.fontFamily].join(" ");
var A=D.lineHeight;
if(A.indexOf("px")>=0){A=parseFloat(A)/parseFloat(D.fontSize)
}else{if(A.indexOf("em")>=0){A=parseFloat(A)
}else{A="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","\tbackground:transparent;","\tpadding: 0;","\tmargin: 0;","}","body{","\ttop:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"\tfont:",B,";","\tmin-height:",this.minHeight,";","\tline-height:",A,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+C+"</body></html>"].join("")
},_drawIframe:function(C){if(!this.iframe){var H=this.iframe=dojo.doc.createElement("iframe");
var E=H.style;
E.border="none";
E.lineHeight="0";
E.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var G=dojo.query('label[for="'+this.id+'"]');
if(G.length){this._localizedIframeTitles.iframeEditTitle=G[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var F=this.srcNodeRef
}else{var F=dojo.doc.createElement("div");
F.style.display="none";
F.innerHTML=C;
this.editingArea.appendChild(F)
}this.editingArea.appendChild(this.iframe);
var D=false;
var B=this.iframe.contentDocument;
B.open();
B.write(this._getIframeDocTxt(C));
B.close();
var A=dojo.hitch(this,function(){if(!D){D=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(I){setTimeout(A,500);
D=false;
return 
}dojo._destroyElement(F);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(F);
this.editNode.innerHTML=C;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
A()
},_applyEditingAreaStyleSheets:function(){var A=[];
if(this.styleSheets){A=this.styleSheets.split(";");
this.styleSheets=""
}A=A.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var E="",D=0,C;
while((C=A[D++])){var B=(new dojo._Url(dojo.global.location,C)).toString();
this.editingAreaStyleSheets.push(B);
E+='<link rel="stylesheet" type="text/css" href="'+B+'"/>'
}return E
},addStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new dojo._Url(dojo.global.location,url)).toString()
}if(dojo.indexOf(this.editingAreaStyleSheets,url)>-1){console.debug("dijit._editor.RichText.addStyleSheet: Style sheet "+url+" is already applied to the editing area!");
return 
}this.editingAreaStyleSheets.push(url);
if(this.document.createStyleSheet){this.document.createStyleSheet(url)
}else{var head=this.document.getElementsByTagName("head")[0];
var _191=this.document.createElement("link");
with(_191){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(_191)
}},removeStyleSheet:function(B){var A=B.toString();
if(A.charAt(0)=="."||(A.charAt(0)!="/"&&!B.host)){A=(new dojo._Url(dojo.global.location,A)).toString()
}var C=dojo.indexOf(this.editingAreaStyleSheets,A);
if(C==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+A+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[C];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+A+'"]']).orphan()
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
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(F){var A=F.ctrlKey?this.KEY_CTRL:0|F.shiftKey?this.KEY_SHIFT:0;
var D=F.keyChar||F.keyCode;
if(this._keyHandlers[D]){var C=this._keyHandlers[D],B=0,E;
while((E=C[B++])){if(A==E.modifiers){if(!E.handler.apply(this,arguments)){F.preventDefault()
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
},onChange:function(A){},_normalizeCommand:function(B){var A=B.toLowerCase();
if(A=="formatblock"){if(dojo.isSafari){A="heading"
}}else{if(A=="hilitecolor"&&!dojo.isMoz){A="backcolor"
}}return A
},queryCommandAvailable:function(I){var A=1;
var H=1<<1;
var G=1<<2;
var F=1<<3;
var E=1<<4;
var D=dojo.isSafari;
function B(J){return{ie:Boolean(J&A),mozilla:Boolean(J&H),safari:Boolean(J&G),safari420:Boolean(J&E),opera:Boolean(J&F)}
}var C=null;
switch(I.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":C=B(H|A|G|F);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":C=B(H|A|F|E);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":C=B(A);
break;
case"cut":case"copy":case"paste":C=B(A|H|E);
break;
case"inserttable":C=B(H|A);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":C=B(A|H);
break;
default:return false
}return(dojo.isIE&&C.ie)||(dojo.isMoz&&C.mozilla)||(dojo.isSafari&&C.safari)||(D&&C.safari420)||(dojo.isOpera&&C.opera)
},execCommand:function(E,D){var C;
this.focus();
E=this._normalizeCommand(E);
if(D!=undefined){if(E=="heading"){throw new Error("unimplemented")
}else{if((E=="formatblock")&&dojo.isIE){D="<"+D+">"
}}}if(E=="inserthtml"){D=this._preFilterContent(D);
if(dojo.isIE){var A=this.document.selection.createRange();
A.pasteHTML(D);
A.select();
C=true
}else{if(dojo.isMoz&&!D.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
C=true
}else{C=this.document.execCommand(E,false,D)
}}}else{if((E=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var F=this.window.getSelection();
var B=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[B]);
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
var B=false;
if(dojo.isMoz){var A=this.editNode.firstChild;
while(A){if(A.nodeType==3){if(A.nodeValue.replace(/^\s+|\s+$/g,"").length>0){B=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A]);
break
}}else{if(A.nodeType==1){B=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[A]);
break
}}A=A.nextSibling
}}else{B=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(B){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
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
},_postFilterContent:function(C,A){C=C||this.editNode;
if(this.contentDomPostFilters.length){if(A&&C.cloneNode){C=C.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(D){C=D(C)
})
}var B=this.getNodeChildrenHtml(C);
if(!B.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){B=""
}dojo.forEach(this.contentPostFilters,function(D){B=D(B)
});
return B
},_saveContent:function(B){var A=dojo.byId("dijit._editor.RichText.savedContent");
A.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(B,A){B=B.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!A){B=B.replace(/'/gm,"&#39;")
}return B
},getNodeHtml:function(B){switch(B.nodeType){case 1:var F="<"+B.tagName.toLowerCase();
if(dojo.isMoz){if(B.getAttribute("type")=="_moz"){B.removeAttribute("type")
}if(B.getAttribute("_moz_dirty")!=undefined){B.removeAttribute("_moz_dirty")
}}var I=[];
if(dojo.isIE){var K=B.outerHTML;
K=K.substr(0,K.indexOf(">"));
K=K.replace(/(?:['"])[^"']*\1/g,"");
var A=/([^\s=]+)=/g;
var C,J;
while((C=A.exec(K))!=undefined){J=C[1];
if(J.substr(0,3)!="_dj"){if(J=="src"||J=="href"){if(B.getAttribute("_djrealurl")){I.push([J,B.getAttribute("_djrealurl")]);
continue
}}if(J=="class"){I.push([J,B.className])
}else{I.push([J,B.getAttribute(J)])
}}}}else{var G,D=0,E=B.attributes;
while((G=E[D++])){if(G.name.substr(0,3)!="_dj"){var H=G.value;
if(G.name=="src"||G.name=="href"){if(B.getAttribute("_djrealurl")){H=B.getAttribute("_djrealurl")
}}I.push([G.name,H])
}}}I.sort(function(M,L){return M[0]<L[0]?-1:(M[0]==L[0]?0:1)
});
D=0;
while((G=I[D++])){F+=" "+G[0]+'="'+G[1]+'"'
}if(B.childNodes.length){F+=">"+this.getNodeChildrenHtml(B)+"</"+B.tagName.toLowerCase()+">"
}else{F+=" />"
}break;
case 3:var F=this.escapeXml(B.nodeValue,true);
break;
case 8:var F="<!--"+this.escapeXml(B.nodeValue,true)+"-->";
break;
default:var F="Element not recognized - Type: "+B.nodeType+" Name: "+B.nodeName
}return F
},getNodeChildrenHtml:function(E){var A="";
if(!E){return A
}var D=E.childNodes||E;
var B=0;
var C;
while((C=D[B++])){A+=this.getNodeHtml(C)
}return A
},close:function(save,_1eb){if(this.isClosed){return false
}if(!arguments.length){save=true
}this._content=this.getValue();
var _1ec=(this.savedContent!=this._content);
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
return _1ec
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
var B=this._onClick(D)!==false;
if(this.type=="submit"&&B){for(var C=this.domNode;
C;
C=C.parentNode){var A=dijit.byNode(C);
if(A&&A._onSubmit){A._onSubmit(D);
break
}if(C.tagName.toLowerCase()=="form"){if(!C.onsubmit||C.onsubmit()){C.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var A="";
this.label=this.containerNode.innerHTML;
A=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=A;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(A){return true
},_clicked:function(A){},setLabel:function(C){this.containerNode.innerHTML=this.label=C;
if(dojo.isMozilla){var B=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var A=this;
setTimeout(function(){A.domNode.style.display=B
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
var A=this.dropDown;
if(!A){return false
}if(!A.isShowingNow){if(A.href&&!A.isLoaded){var B=this;
var C=dojo.connect(A,"onLoad",function(){dojo.disconnect(C);
B._openDropDown()
});
A._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var E=this.dropDown;
var D=E.domNode.style.width;
var A=this;
dijit.popup.open({parent:this,popup:E,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){A._closeDropDown(true)
},onCancel:function(){A._closeDropDown(true)
},onClose:function(){E.domNode.style.width=D;
A.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>E.domNode.offsetWidth){var C=null;
if(!this.isLeftToRight()){C=E.domNode.parentNode;
var B=C.offsetLeft+C.offsetWidth
}dojo.marginBox(E.domNode,{w:this.domNode.offsetWidth});
if(C){C.style.left=B-this.domNode.offsetWidth+"px"
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
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var B=this.editor.commands[this.command];
var A="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var C={label:B,showLabel:false,iconClass:A,dropDown:this.dropDown};
this.button=new this.buttonClass(C)
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
}},_steps:[],_undoedSteps:[],execCommand:function(D){if(this.customUndo&&(D=="undo"||D=="redo")){return this[D]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var C=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return C
}catch(E){if(dojo.isMoz&&/copy|cut|paste/.test(D)){var B=dojo.string.substitute,A={cut:"X",copy:"C",paste:"V"},F=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(B(this.commands.systemShortcutFF,[this.commands[D],B(this.commands[F?"appleKey":"ctrlKey"],[A[D]])]))
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
},unBindDomNode:function(B){var D=dojo.byId(B);
var C=D[this.id]-1,A=this._bindings[C];
dojo.forEach(A,dojo.disconnect);
delete this._bindings[C]
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
}var B=this;
var C=dijit.getFocus(this);
function D(){dijit.focus(C);
dijit.popup.close(B)
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
var C=this.focusedChild;
var B=C.popup;
if(B.isShowingNow){return 
}B.parentMenu=this;
var A=this;
dijit.popup.open({parent:this,popup:B,around:C.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(B);
C.focus();
A.currentPopup=null
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
dojo.regexp.buildGroupRE=function(B,D,E){if(!(B instanceof Array)){return D(B)
}var A=[];
for(var C=0;
C<B.length;
C++){A.push(D(B[C]))
}return dojo.regexp.group(A.join("|"),E)
};
dojo.regexp.group=function(B,A){return"("+(A?"?:":"")+B+")"
}
}if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.number.format=function(D,E){E=dojo.mixin({},E||{});
var C=dojo.i18n.normalizeLocale(E.locale);
var B=dojo.i18n.getLocalization("dojo.cldr","number",C);
E.customs=B;
var A=E.pattern||B[(E.type||"decimal")+"Format"];
if(isNaN(D)){return null
}return dojo.number._applyPattern(D,A,E)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(H,G,E){E=E||{};
var D=E.customs.group;
var B=E.customs.decimal;
var A=G.split(";");
var I=A[0];
G=A[(H<0)?1:0]||("-"+I);
if(G.indexOf("%")!=-1){H*=100
}else{if(G.indexOf("‰")!=-1){H*=1000
}else{if(G.indexOf("¤")!=-1){D=E.customs.currencyGroup||D;
B=E.customs.currencyDecimal||B;
G=G.replace(/\u00a4{1,3}/,function(K){var J=["symbol","currency","displayName"][K.length-1];
return E[J]||E.currency||""
})
}else{if(G.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var F=dojo.number._numberPatternRE;
var C=I.match(F);
if(!C){throw new Error("unable to find a number expression in pattern: "+G)
}return G.replace(F,dojo.number._formatAbsolute(H,C[0],{decimal:B,group:D,places:E.places}))
};
dojo.number.round=function(E,F,D){var C=String(E).split(".");
var B=(C[1]&&C[1].length)||0;
if(B>F){var A=Math.pow(10,F);
if(D>0){A*=10/D;
F++
}E=Math.round(E*A)/A;
C=String(E).split(".");
B=(C[1]&&C[1].length)||0;
if(B>F){C[1]=C[1].substr(0,F);
E=Number(C.join("."))
}}return E
};
dojo.number._formatAbsolute=function(N,M,J){J=J||{};
if(J.places===true){J.places=0
}if(J.places===Infinity){J.places=6
}var G=M.split(".");
var D=(J.places>=0)?J.places:(G[1]&&G[1].length)||0;
if(!(J.round<0)){N=dojo.number.round(N,D,J.round)
}var P=String(Math.abs(N)).split(".");
var O=P[1]||"";
if(J.places){P[1]=dojo.string.pad(O.substr(0,J.places),J.places,"0",true)
}else{if(G[1]&&J.places!==0){var L=G[1].lastIndexOf("0")+1;
if(L>O.length){P[1]=dojo.string.pad(O,L,"0",true)
}var K=G[1].length;
if(K<O.length){P[1]=O.substr(0,K)
}}else{if(P[1]){P.pop()
}}}var I=G[0].replace(",","");
L=I.indexOf("0");
if(L!=-1){L=I.length-L;
if(L>P[0].length){P[0]=dojo.string.pad(P[0],L)
}if(I.indexOf("#")==-1){P[0]=P[0].substr(P[0].length-L)
}}var F=G[0].lastIndexOf(",");
var E,C;
if(F!=-1){E=G[0].length-F-1;
var B=G[0].substr(0,F);
F=B.lastIndexOf(",");
if(F!=-1){C=B.length-F-1
}}var A=[];
for(var Q=P[0];
Q;
){var H=Q.length-E;
A.push((H>0)?Q.substr(H):Q);
Q=(H>0)?Q.slice(0,H):"";
if(C){E=C;
delete C
}}P[0]=A.reverse().join(J.group||",");
return P.join(J.decimal||".")
};
dojo.number.regexp=function(A){return dojo.number._parseInfo(A).regexp
};
dojo.number._parseInfo=function(E){E=E||{};
var D=dojo.i18n.normalizeLocale(E.locale);
var B=dojo.i18n.getLocalization("dojo.cldr","number",D);
var A=E.pattern||B[(E.type||"decimal")+"Format"];
var J=B.group;
var I=B.decimal;
var G=1;
if(A.indexOf("%")!=-1){G/=100
}else{if(A.indexOf("‰")!=-1){G/=1000
}else{var F=A.indexOf("¤")!=-1;
if(F){J=B.currencyGroup||J;
I=B.currencyDecimal||I
}}}var C=A.split(";");
if(C.length==1){C.push("-"+C[0])
}var H=dojo.regexp.buildGroupRE(C,function(K){K="(?:"+dojo.regexp.escapeString(K,".")+")";
return K.replace(dojo.number._numberPatternRE,function(P){var O={signed:false,separator:E.strict?J:[J,""],fractional:E.fractional,decimal:I,exponent:false};
var N=P.split(".");
var M=E.places;
if(N.length==1||M===0){O.fractional=false
}else{if(typeof M=="undefined"){M=N[1].lastIndexOf("0")+1
}if(M&&E.fractional==undefined){O.fractional=true
}if(!E.places&&(M<N[1].length)){M+=","+N[1].length
}O.places=M
}var L=N[0].split(",");
if(L.length>1){O.groupSize=L.pop().length;
if(L.length>1){O.groupSize2=L.pop().length
}}return"("+dojo.number._realNumberRegexp(O)+")"
})
},true);
if(F){H=H.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(N,L,K,O){var P=["symbol","currency","displayName"][K.length-1];
var M=dojo.regexp.escapeString(E[P]||E.currency||"");
L=L?"\\s":"";
O=O?"\\s":"";
if(!E.strict){if(L){L+="*"
}if(O){O+="*"
}return"(?:"+L+M+O+")?"
}return L+M+O
})
}return{regexp:H.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:J,decimal:I,factor:G}
};
dojo.number.parse=function(D,C){var E=dojo.number._parseInfo(C);
var B=(new RegExp("^"+E.regexp+"$")).exec(D);
if(!B){return NaN
}var A=B[1];
if(!B[1]){if(!B[2]){return NaN
}A=B[2];
E.factor*=-1
}A=A.replace(new RegExp("["+E.group+"\\s\\xa0]","g"),"").replace(E.decimal,".");
return Number(A)*E.factor
};
dojo.number._realNumberRegexp=function(B){B=B||{};
if(typeof B.places=="undefined"){B.places=Infinity
}if(typeof B.decimal!="string"){B.decimal="."
}if(typeof B.fractional=="undefined"||/^0/.test(B.places)){B.fractional=[true,false]
}if(typeof B.exponent=="undefined"){B.exponent=[true,false]
}if(typeof B.eSigned=="undefined"){B.eSigned=[true,false]
}var A=dojo.number._integerRegexp(B);
var E=dojo.regexp.buildGroupRE(B.fractional,function(G){var F="";
if(G&&(B.places!==0)){F="\\"+B.decimal;
if(B.places==Infinity){F="(?:"+F+"\\d+)?"
}else{F+="\\d{"+B.places+"}"
}}return F
},true);
var D=dojo.regexp.buildGroupRE(B.exponent,function(F){if(F){return"([eE]"+dojo.number._integerRegexp({signed:B.eSigned})+")"
}return""
});
var C=A+E;
if(E){C="(?:(?:"+C+")|(?:"+E+"))"
}return C+D
};
dojo.number._integerRegexp=function(C){C=C||{};
if(typeof C.signed=="undefined"){C.signed=[true,false]
}if(typeof C.separator=="undefined"){C.separator=""
}else{if(typeof C.groupSize=="undefined"){C.groupSize=3
}}var B=dojo.regexp.buildGroupRE(C.signed,function(D){return D?"[-+]":""
},true);
var A=dojo.regexp.buildGroupRE(C.separator,function(F){if(!F){return"(?:0|[1-9]\\d*)"
}F=dojo.regexp.escapeString(F);
if(F==" "){F="\\s"
}else{if(F==" "){F="\\s\\xa0"
}}var D=C.groupSize,E=C.groupSize2;
if(E){var G="(?:0|[1-9]\\d{0,"+(E-1)+"}(?:["+F+"]\\d{"+E+"})*["+F+"]\\d{"+D+"})";
return((D-E)>0)?"(?:"+G+"|(?:0|[1-9]\\d{0,"+(D-1)+"}))":G
}return"(?:0|[1-9]\\d{0,"+(D-1)+"}(?:["+F+"]\\d{"+D+"})*)"
},true);
return B+A
}
}if(!dojo._hasResource["dijit.ProgressBar"]){dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(C){dojo.mixin(this,C||{});
var B=1,A;
if(this.indeterminate){A="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{A="removeClass";
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
}dojo[A](this.domNode,"dijitProgressBarIndeterminate");
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
},_setCss:function(){var B=["dijitClosed","dijitOpen"];
var A=this.open;
dojo.removeClass(this.focusNode,B[!A+0]);
this.focusNode.className+=" "+B[A+0];
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
},show:function(C,B){if(this.aroundNode&&this.aroundNode===B){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=C;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var A=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var D=dijit.placeOnScreenAroundElement(this.domNode,B,A);
this.domNode.className="dijitTooltip dijitTooltip"+(D.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=B
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
},_onHover:function(A){if(!this._showTimer){var B=A.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(B)
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
dojo.cookie=function(D,F,E){var H=document.cookie;
if(arguments.length==1){var A=H.lastIndexOf(D+"=");
if(A==-1){return null
}var C=A+D.length+1;
var B=H.indexOf(";",A+D.length+1);
if(B==-1){B=H.length
}return decodeURIComponent(H.substring(C,B))
}else{E=E||{};
F=encodeURIComponent(F);
if(typeof (E.expires)=="number"){var G=new Date();
G.setTime(G.getTime()+(E.expires*24*60*60*1000));
E.expires=G
}document.cookie=D+"="+F+(E.expires?"; expires="+E.expires.toUTCString():"")+(E.path?"; path="+E.path:"")+(E.domain?"; domain="+E.domain:"")+(E.secure?"; secure":"");
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
}dojo.forEach(D,function(G){var F=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(G.item)},G));
this.addChild(F);
var E=this.tree.store.getIdentity(G.item);
C[E]=F;
if(this.tree.persist){if(this.tree._openedItemIds[E]){this.tree._expandNode(F)
}}},this);
dojo.forEach(this.getChildren(),function(F,E){F._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var A=this.getChildren()[0];
var B=A?A.labelNode:this.domNode;
B.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return C
},_addChildren:function(B){var A={};
if(B&&B.length>0){dojo.forEach(B,function(D){var C=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(D.item)},D));
this.addChild(C);
A[this.tree.store.getIdentity(D.item)]=C
},this);
dojo.forEach(this.getChildren(),function(D,C){D._updateLayout()
})
}return A
},deleteNode:function(A){A.destroy();
var B=this.getChildren();
if(B.length==0){this.isExpandable=false;
this.collapse()
}dojo.forEach(B,function(C){C._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
dojo.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(B,A){dojo.publish(this.id,[dojo.mixin({tree:this,event:B},A||{})])
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
}var A={};
for(var C=0;
C<this.dndParams.length;
C++){if(this[this.dndParams[C]]){A[this.dndParams[C]]=this[this.dndParams[C]]
}}this.dndController=new this.dndController(this,A)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(A){return dojo.some(this.childrenAttr,function(B){return this.store.hasAttribute(A,B)
},this)
},getItemChildren:function(C,B){var G=this.store;
if(C==null){G.fetch({query:this.query,onComplete:B})
}else{var A=[];
for(var E=0;
E<this.childrenAttr.length;
E++){A=A.concat(G.getValues(C,this.childrenAttr[E]))
}var F=0;
dojo.forEach(A,function(H){if(!G.isItemLoaded(H)){F++
}});
if(F==0){B(A)
}else{function D(H){if(--F==0){B(A)
}}dojo.forEach(A,function(H){if(!G.isItemLoaded(H)){G.loadItem({item:H,onItem:D})
}})
}}},getItemParentIdentity:function(B,A){return this.store.getIdentity(A.item)
},getLabel:function(A){return this.store.getLabel(A)
},getIconClass:function(A){},getLabelClass:function(A){},_onLoadAllItems:function(C,B){var A=dojo.map(B,function(D){return{item:D,isExpandable:this.mayHaveChildren(D)}
},this);
dojo.mixin(this._itemNodeMap,C._setChildren(A));
this._expandNode(C)
},_onKeyPress:function(D){if(D.altKey){return 
}var B=dijit.getEnclosingWidget(D.target);
if(!B){return 
}if(D.charCode){var A=D.charCode;
if(!D.altKey&&!D.ctrlKey&&!D.shiftKey&&!D.metaKey){A=(String.fromCharCode(A)).toLowerCase();
this._onLetterKeyNav({node:B,key:A});
dojo.stopEvent(D)
}}else{var C=this._keyHandlerMap;
if(!C){C={};
C[dojo.keys.ENTER]="_onEnterKey";
C[dojo.keys.LEFT_ARROW]="_onLeftArrow";
C[dojo.keys.RIGHT_ARROW]="_onRightArrow";
C[dojo.keys.UP_ARROW]="_onUpArrow";
C[dojo.keys.DOWN_ARROW]="_onDownArrow";
C[dojo.keys.HOME]="_onHomeKey";
C[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=C
}if(this._keyHandlerMap[D.keyCode]){this[this._keyHandlerMap[D.keyCode]]({node:B,item:B.item});
dojo.stopEvent(D)
}}},_onEnterKey:function(A){this._publish("execute",{item:A.item,node:A.node});
this.onClick(A.item,A.node)
},_onDownArrow:function(B){var A=this._navToNextNode(B.node);
if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onUpArrow:function(E){var C=E.node;
var B=C;
var A=C.getPreviousSibling();
if(A){C=A;
while(C.isExpandable&&C.isExpanded&&C.hasChildren()){B=C;
var F=C.getChildren();
C=F[F.length-1]
}}else{var D=C.getParent();
if(!(this._hideRoot&&D===this)){C=D
}}if(C&&C.isTreeNode){B=C
}if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onRightArrow:function(C){var B=C.node;
var A=B;
if(B.isExpandable&&!B.isExpanded){this._expandNode(B)
}else{if(B.hasChildren()){B=B.getChildren()[0]
}}if(B&&B.isTreeNode){A=B
}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onLeftArrow:function(B){var C=B.node;
var A=C;
if(C.isExpandable&&C.isExpanded){this._collapseNode(C)
}else{C=C.getParent()
}if(C&&C.isTreeNode){A=C
}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onHomeKey:function(){var A=this._navToRootOrFirstNode();
if(A){A.tree.focusNode(A);
return A
}},_onEndKey:function(B){var A=B.node.tree;
var D=A;
while(D.isExpanded){var C=D.getChildren();
D=C[C.length-1];
if(D.isTreeNode){A=D
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
}}},_expandNode:function(C){var B=C.tree;
if(B.lastFocused){B.focusNode(B.lastFocused)
}if(!C.isExpandable){return 
}var F=this.store;
var E=this.store.getValue;
switch(C.state){case"LOADING":return ;
case"UNCHECKED":C.markProcessing();
var D=this;
var A=function(G){C.unmarkProcessing();
D._onLoadAllItems(C,G)
};
this.getItemChildren(C.item,A);
break;
default:if(C.expand){C.expand();
if(this.persist&&C.item){this._openedItemIds[this.store.getIdentity(C.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var A=this.lastFocused;
if(!A){return 
}var B=A.labelNode;
dojo.removeClass(B,"dijitTreeLabelFocused");
B.setAttribute("tabIndex","-1");
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
},_onNewItem:function(F,E){var D;
if(E){var C=this._itemNodeMap[this.getItemParentIdentity(F,E)];
if(!C||dojo.indexOf(this.childrenAttr,E.attribute)==-1){return 
}}var B={item:F,isExpandable:this.mayHaveChildren(F)};
if(C){if(!C.isExpandable){C.makeExpandable()
}if(C.state=="LOADED"||C.isExpanded){var A=C._addChildren([B])
}}else{var A=this._addChildren([B])
}if(A){dojo.mixin(this._itemNodeMap,A)
}},_onDeleteItem:function(D){var B=this.store.getIdentity(D);
var C=this._itemNodeMap[B];
if(C){var A=C.getParent();
A.deleteNode(C);
this._itemNodeMap[B]=null
}},_onSetItem:function(A){var B=this.store.getIdentity(A);
node=this._itemNodeMap[B];
if(node){node.setLabelNode(this.getLabel(A));
node._updateItemClasses(A)
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
},format:function(B,A){return((B==null||B==undefined)?"":(B.toString?B.toString():B))
},parse:function(B,A){return B
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
var A={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var B in A){this.connect(this.displayNode,B,A[B])
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
var D=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var C=document.createElement("span");
dojo.place(C,this.domNode,"before");
var B=this.editWidget=new dijit._InlineEditor({value:dojo.trim(D),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:dojo.getComputedStyle(this.displayNode),save:dojo.hitch(this,"save"),cancel:dojo.hitch(this,"cancel"),width:this.width},C);
var A=B.domNode.style;
this.displayNode.style.display="none";
A.position="static";
A.visibility="visible";
this.domNode=B.domNode;
setTimeout(function(){B.focus()
},100)
},_showText:function(C){this.displayNode.style.display="";
var B=this.editWidget.domNode.style;
B.position="absolute";
B.visibility="hidden";
this.domNode=this.displayNode;
var A=this;
setTimeout(function(){if(C){dijit.focus(A.displayNode)
}A.editWidget.destroy();
delete A.editWidget
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
dijit.selectInputText=function(E){var D=dojo.global;
var C=dojo.doc;
E=dojo.byId(E);
if(C.selection&&dojo.body()["createTextRange"]){if(E.createTextRange){var B=E.createTextRange();
B.moveStart("character",0);
B.moveEnd("character",E.value.length);
B.select()
}}else{if(D.getSelection){var A=D.getSelection();
if(E.setSelectionRange){E.setSelectionRange(0,E.value.length)
}}}E.focus()
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
dojo.data.util.filter.patternToRegExp=function(C,B){var A="^";
var E=null;
for(var D=0;
D<C.length;
D++){E=C.charAt(D);
switch(E){case"\\":A+=E;
D++;
A+=C.charAt(D);
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
dojo.data.util.sorter.createSortFunction=function(A,F){var E=[];
function B(G,H){return function(L,M){var J=F.getValue(L,G);
var I=F.getValue(M,G);
var K=null;
if(F.comparatorMap){if(typeof G!=="string"){G=F.getIdentity(G)
}K=F.comparatorMap[G]||dojo.data.util.sorter.basicComparator
}K=K||dojo.data.util.sorter.basicComparator;
return H*K(J,I)
}
}for(var D=0;
D<A.length;
D++){sortAttribute=A[D];
if(sortAttribute.attribute){var C=(sortAttribute.descending)?-1:1;
E.push(B(sortAttribute.attribute,C))
}}return function(H,G){var J=0;
while(J<E.length){var I=E[J++](H,G);
if(I!==0){return I
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(C){C=C||{};
if(!C.store){C.store=this
}var B=this;
var A=function(E,G){if(G.onError){var F=G.scope||dojo.global;
G.onError.call(F,E,G)
}};
var D=function(F,E){var N=E.abort||null;
var L=false;
var J=E.start?E.start:0;
var I=E.count?(J+E.count):F.length;
E.abort=function(){L=true;
if(N){N.call(E)
}};
var H=E.scope||dojo.global;
if(!E.store){E.store=B
}if(E.onBegin){E.onBegin.call(H,F.length,E)
}if(E.sort){F.sort(dojo.data.util.sorter.createSortFunction(E.sort,B))
}if(E.onItem){for(var G=J;
(G<F.length)&&(G<I);
++G){var K=F[G];
if(!L){E.onItem.call(H,K,E)
}}}if(E.onComplete&&!L){var M=null;
if(!E.onItem){M=F.slice(J,I)
}E.onComplete.call(H,M,E)
}};
this._fetchItems(C,D,A);
return C
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
}},getValue:function(C,B,A){var D=this.getValues(C,B);
return(D.length>0)?D[0]:A
},getValues:function(A,B){this._assertIsItem(A);
this._assertIsAttribute(B);
return A[B]||[]
},getAttributes:function(C){this._assertIsItem(C);
var B=[];
for(var A in C){if((A!==this._storeRefPropName)&&(A!==this._itemNumPropName)&&(A!==this._rootItemPropName)){B.push(A)
}}return B
},hasAttribute:function(B,A){return this.getValues(B,A).length>0
},containsValue:function(D,C,B){var A=undefined;
if(typeof B==="string"){A=dojo.data.util.filter.patternToRegExp(B,false)
}return this._containsValue(D,C,B,A)
},_containsValue:function(D,B,C,A){return dojo.some(this.getValues(D,B),function(E){if(E!==null&&!dojo.isObject(E)&&A){if(E.toString().match(A)){return true
}}else{if(C===E){return true
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
},_fetchItems:function(C,B,H){var A=this;
var E=function(M,L){var K=[];
if(M.query){var J=M.queryOptions?M.queryOptions.ignoreCase:false;
var I={};
for(var Q in M.query){var S=M.query[Q];
if(typeof S==="string"){I[Q]=dojo.data.util.filter.patternToRegExp(S,J)
}}for(var N=0;
N<L.length;
++N){var P=true;
var O=L[N];
if(O===null){P=false
}else{for(var Q in M.query){var S=M.query[Q];
if(!A._containsValue(O,Q,S,I[Q])){P=false
}}}if(P){K.push(O)
}}B(K,M)
}else{for(var N=0;
N<L.length;
++N){var R=L[N];
if(R!==null){K.push(R)
}}B(K,M)
}};
if(this._loadFinished){E(C,this._getItemsArray(C.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:C,filter:E})
}else{this._loadInProgress=true;
var G={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var D=dojo.xhrGet(G);
D.addCallback(function(I){try{A._getItemsFromLoadedData(I);
A._loadFinished=true;
A._loadInProgress=false;
E(C,A._getItemsArray(C.queryOptions));
A._handleQueuedFetches()
}catch(J){A._loadFinished=true;
A._loadInProgress=false;
H(J,C)
}});
D.addErrback(function(I){A._loadInProgress=false;
H(I,C)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
E(C,this._getItemsArray(C.queryOptions))
}catch(F){H(F,C)
}}else{H(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),C)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var A=0;
A<this._queuedFetches.length;
A++){var D=this._queuedFetches[A];
var C=D.args;
var B=D.filter;
if(B){B(C,this._getItemsArray(C.queryOptions))
}else{this.fetchItemByIdentity(C)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(A){function D(V){var U=((V!=null)&&(typeof V=="object")&&(!dojo.isArray(V))&&(!dojo.isFunction(V))&&(V.constructor==Object)&&(typeof V._reference=="undefined")&&(typeof V._type=="undefined")&&(typeof V._value=="undefined"));
return U
}var M=this;
function R(W){M._arrayOfAllItems.push(W);
for(var U in W){var Z=W[U];
if(Z){if(dojo.isArray(Z)){var Y=Z;
for(var X=0;
X<Y.length;
++X){var V=Y[X];
if(D(V)){R(V)
}}}else{if(D(Z)){R(Z)
}}}}}this._labelAttr=A.label;
var P;
var Q;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=A.items;
for(P=0;
P<this._arrayOfTopLevelItems.length;
++P){Q=this._arrayOfTopLevelItems[P];
R(Q);
Q[this._rootItemPropName]=true
}var S={};
var T;
for(P=0;
P<this._arrayOfAllItems.length;
++P){Q=this._arrayOfAllItems[P];
for(T in Q){if(T!==this._rootItemPropName){var L=Q[T];
if(L!==null){if(!dojo.isArray(L)){Q[T]=[L]
}}else{Q[T]=[null]
}}S[T]=T
}}while(S[this._storeRefPropName]){this._storeRefPropName+="_"
}while(S[this._itemNumPropName]){this._itemNumPropName+="_"
}var K;
var J=A.identifier;
if(J){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=J;
for(P=0;
P<this._arrayOfAllItems.length;
++P){Q=this._arrayOfAllItems[P];
K=Q[J];
var G=K[0];
if(!this._itemsByIdentity[G]){this._itemsByIdentity[G]=Q
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+G+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+G+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(P=0;
P<this._arrayOfAllItems.length;
++P){Q=this._arrayOfAllItems[P];
Q[this._storeRefPropName]=this;
Q[this._itemNumPropName]=P
}for(P=0;
P<this._arrayOfAllItems.length;
++P){Q=this._arrayOfAllItems[P];
for(T in Q){K=Q[T];
for(var O=0;
O<K.length;
++O){L=K[O];
if(L!==null&&typeof L=="object"){if(L._type&&L._value){var I=L._type;
var E=this._datatypeMap[I];
if(!E){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+I+"'")
}else{if(dojo.isFunction(E)){K[O]=new E(L._value)
}else{if(dojo.isFunction(E.deserialize)){K[O]=E.deserialize(L._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(L._reference){var C=L._reference;
if(dojo.isString(C)){K[O]=this._itemsByIdentity[C]
}else{for(var N=0;
N<this._arrayOfAllItems.length;
++N){var B=this._arrayOfAllItems[N];
var H=true;
for(var F in C){if(B[F]!=C[F]){H=false
}}if(H){K[O]=B
}}}}}}}}},getIdentity:function(A){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return A[this._itemNumPropName]
}else{var B=A[C];
if(B){return B[0]
}}return null
},fetchItemByIdentity:function(E){if(!this._loadFinished){var A=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:E})
}else{this._loadInProgress=true;
var D={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var B=dojo.xhrGet(D);
B.addCallback(function(J){var H=E.scope?E.scope:dojo.global;
try{A._getItemsFromLoadedData(J);
A._loadFinished=true;
A._loadInProgress=false;
var I=A._getItemByIdentity(E.identity);
if(E.onItem){E.onItem.call(H,I)
}A._handleQueuedFetches()
}catch(G){A._loadInProgress=false;
if(E.onError){E.onError.call(H,G)
}}});
B.addErrback(function(H){A._loadInProgress=false;
if(E.onError){var G=E.scope?E.scope:dojo.global;
E.onError.call(G,H)
}})
}}else{if(this._jsonData){A._getItemsFromLoadedData(A._jsonData);
A._jsonData=null;
A._loadFinished=true;
var C=A._getItemByIdentity(E.identity);
if(E.onItem){var F=E.scope?E.scope:dojo.global;
E.onItem.call(F,C)
}}}}else{var C=this._getItemByIdentity(E.identity);
if(E.onItem){var F=E.scope?E.scope:dojo.global;
E.onItem.call(F,C)
}}},_getItemByIdentity:function(A){var B=null;
if(this._itemsByIdentity){B=this._itemsByIdentity[A]
}else{B=this._arrayOfAllItems[A]
}if(B===undefined){B=null
}return B
},getIdentityAttributes:function(A){var B=this._features["dojo.data.api.Identity"];
if(B===Number){return null
}else{return[B]
}},_forceLoad:function(){var A=this;
if(this._jsonFileUrl){var B={url:A._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var C=dojo.xhrGet(B);
C.addCallback(function(D){try{if(A._loadInProgress!==true&&!A._loadFinished){A._getItemsFromLoadedData(D);
A._loadFinished=true
}}catch(E){console.log(E);
throw E
}});
C.addErrback(function(D){throw D
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
},validator:function(B,A){return(new RegExp("^("+this.regExpGen(A)+")"+(this.required?"":"?")+"$")).test(B)&&(!this.required||!this._isEmpty(B))&&(this._isEmpty(B)||this.parse(B,A)!==null)
},isValid:function(A){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(A){return/^\s*$/.test(A)
},getErrorMessage:function(A){return this.invalidMessage
},getPromptMessage:function(A){return this.promptMessage
},validate:function(D){var C="";
var B=this.isValid(D);
var A=this._isEmpty(this.textbox.value);
this.state=(B||(!this._hasBeenBlurred&&A))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(B?"false":"true"));
if(D){if(A){C=this.getPromptMessage(true)
}if(!C&&!B){C=this.getErrorMessage(true)
}}this._displayMessage(C)
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
},rangeCheck:function(D,C){var B=(typeof C.min!="undefined");
var A=(typeof C.max!="undefined");
if(B||A){return(!B||this.compare(D,C.min)>=0)&&(!A||this.compare(D,C.max)<=0)
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
},_getCaretPos:function(D){if(typeof (D.selectionStart)=="number"){return D.selectionStart
}else{if(dojo.isIE){var B=document.selection.createRange().duplicate();
var A=D.createTextRange();
B.move("character",0);
A.move("character",0);
try{A.setEndPoint("EndToEnd",B);
return String(A.text).replace(/\r/g,"").length
}catch(C){return 0
}}}},_setCaretPos:function(B,A){A=parseInt(A);
this._setSelectedRange(B,A,A)
},_setSelectedRange:function(_448,_449,end){if(!end){end=_448.value.length
}if(_448.setSelectionRange){dijit.focus(_448);
_448.setSelectionRange(_449,end)
}else{if(_448.createTextRange){var _44b=_448.createTextRange();
with(_44b){collapse(true);
moveEnd("character",end);
moveStart("character",_449);
select()
}}else{_448.value=_448.value;
_448.blur();
dijit.focus(_448);
var dist=parseInt(_448.value.length)-end;
var _44d=String.fromCharCode(37);
var tcc=_44d.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
_448.dispatchEvent(te)
}}}},onkeypress:function(C){if(C.altKey||(C.ctrlKey&&C.charCode!=118)){return 
}var D=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(C)
}switch(C.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
D=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(C);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(C);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var B;
if(this._isShowingNow&&(B=this._popupWidget.getHighlightedOption())){if(B==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(C);
break
}else{if(B==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(C);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}C.preventDefault();
case dojo.keys.TAB:var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(C);
this._selectOption();
this._hideResultList()
}else{D=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(C)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
D=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||C.charCode!=0){D=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(D){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(A){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(A))){var B=this._getCaretPos(this.focusNode);
if((B+1)>this.focusNode.value.length){this.focusNode.value=A;
this._setSelectedRange(this.focusNode,B,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}}else{this.focusNode.value=A;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",A)
}},_openResultList:function(C,B){if(this.disabled||B.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!C.length){this._hideResultList();
return 
}var A=new String(this.store.getValue(C[0],this.searchAttr));
if(A&&this.autoComplete&&!this._prev_key_backspace&&(B.query[this.searchAttr]!="*")){this._autoCompleteText(A);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",A)
}this._popupWidget.createOptions(C,B,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(B.direction){if(B.direction==1){this._popupWidget.highlightFirstOption()
}else{if(B.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var _45a=this._popupWidget.getItems(),_45b=Math.min(_45a.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var _45d=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==_45d.h)&&(best.w==_45d.w))?"hidden":"auto";
var _45e=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){_45e+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(_45e,this.domNode.offsetWidth)})
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
},_announceOption:function(B){if(B==null){return 
}var A;
if(B==this._popupWidget.nextButton||B==this._popupWidget.previousButton){A=B.innerHTML
}else{A=this.store.getValue(B.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(A)
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
}var D=this.query;
this._lastQuery=D[this.searchAttr]=A+"*";
var B=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:D,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function C(F,E){F.start+=F.count*E;
F.direction=E;
F.store.fetch(F)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,C,B)
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
},_createOption:function(D,C){var B=C(D);
var A=document.createElement("div");
if(B.html){A.innerHTML=B.label
}else{A.appendChild(document.createTextNode(B.label))
}if(A.innerHTML==""){A.innerHTML="&nbsp;"
}A.item=D;
return A
},createOptions:function(B,A,D){this.previousButton.style.display=A.start==0?"none":"";
var C=this;
dojo.forEach(B,function(F){var E=C._createOption(F,D);
E.className="dijitMenuItem";
C.domNode.insertBefore(E,C.nextButton)
});
this.nextButton.style.display=A.count==B.length?"":"none"
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
},_page:function(A){var E=0;
var D=this.domNode.scrollTop;
var C=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(E<C){if(A){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var B=this.domNode.scrollTop;
E+=(B-D)*(A?-1:1);
D=B
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
dojo.cldr.monetary.getData=function(E){var D={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var C={CHF:5};
var B=D[E],A=C[E];
if(typeof B=="undefined"){B=2
}if(typeof A=="undefined"){A=0
}return{places:B,round:A}
}
}if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.currency._mixInDefaults=function(A){A=A||{};
A.type="currency";
var B=dojo.i18n.getLocalization("dojo.cldr","currency",A.locale)||{};
var C=A.currency;
var D=dojo.cldr.monetary.getData(C);
dojo.forEach(["displayName","symbol","group","decimal"],function(E){D[E]=B[C+"_"+E]
});
D.fractional=[true,false];
return dojo.mixin(D,A)
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
dojo.cldr.supplemental.getFirstDayOfWeek=function(C){var B={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var A=dojo.cldr.supplemental._region(C);
var D=B[A];
return(typeof D=="undefined")?1:D
};
dojo.cldr.supplemental._region=function(C){C=dojo.i18n.normalizeLocale(C);
var B=C.split("-");
var A=B[1];
if(!A){A={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[B[0]]
}else{if(A.length==4){A=B[2]
}}return A
};
dojo.cldr.supplemental.getWeekend=function(C){var A={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var F={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var E=dojo.cldr.supplemental._region(C);
var D=A[E];
var B=F[E];
if(typeof D=="undefined"){D=6
}if(typeof B=="undefined"){B=0
}return{start:D,end:B}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(A){var C=A.getMonth();
var B=[31,28,31,30,31,30,31,31,30,31,30,31];
if(C==1&&dojo.date.isLeapYear(A)){return 29
}return B[C]
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
dojo.date.add=function(D,L,K){var F=new Date(Number(D));
var C=false;
var B="Date";
switch(L){case"day":break;
case"weekday":var J,A;
var H=0;
var I=K%5;
if(!I){J=(K>0)?5:-5;
A=(K>0)?((K-5)/5):((K+5)/5)
}else{J=I;
A=parseInt(K/5)
}var E=D.getDay();
if(E==6&&K>0){H=1
}else{if(E==0&&K<0){H=-1
}}var G=E+J;
if(G==0||G==6){H=(K>0)?2:-2
}K=7*A+J+H;
break;
case"year":B="FullYear";
C=true;
break;
case"week":K*=7;
break;
case"quarter":K*=3;
case"month":C=true;
B="Month";
break;
case"hour":case"minute":case"second":case"millisecond":B="UTC"+L.charAt(0).toUpperCase()+L.substring(1)+"s"
}if(B){F["set"+B](F["get"+B]()+K)
}if(C&&(F.getDate()<D.getDate())){F.setDate(0)
}return F
};
dojo.date.difference=function(N,M,L){M=M||new Date();
L=L||"day";
var K=M.getFullYear()-N.getFullYear();
var H=1;
switch(L){case"quarter":var Q=N.getMonth();
var P=M.getMonth();
var F=Math.floor(Q/3)+1;
var D=Math.floor(P/3)+1;
D+=(K*4);
H=D-F;
break;
case"weekday":var O=Math.round(dojo.date.difference(N,M,"day"));
var J=parseInt(dojo.date.difference(N,M,"week"));
var I=O%7;
if(I==0){O=J*5
}else{var G=0;
var B=N.getDay();
var A=M.getDay();
J=parseInt(O/7);
I=O%7;
var E=new Date(N);
E.setDate(E.getDate()+(J*7));
var C=E.getDay();
if(O>0){switch(true){case B==6:G=-1;
break;
case B==0:G=0;
break;
case A==6:G=-1;
break;
case A==0:G=-2;
break;
case (C+I)>5:G=-2
}}else{if(O<0){switch(true){case B==6:G=0;
break;
case B==0:G=1;
break;
case A==6:G=2;
break;
case A==0:G=1;
break;
case (C+I)<0:G=2
}}}O+=G;
O-=(J*2)
}H=O;
break;
case"year":H=K;
break;
case"month":H=(M.getMonth()-N.getMonth())+(K*12);
break;
case"week":H=parseInt(dojo.date.difference(N,M,"day")/7);
break;
case"day":H/=24;
case"hour":H/=60;
case"minute":H/=60;
case"second":H/=1000;
case"millisecond":H*=M.getTime()-N.getTime()
}return Math.round(H)
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function B(F,E,D){return D.replace(/([a-z])\1*/ig,function(P){var W;
var V=P.charAt(0);
var N=P.length;
var L;
var R=["abbr","wide","narrow"];
switch(V){case"G":W=E[(N<4)?"eraAbbr":"eraNames"][F.getFullYear()<0?0:1];
break;
case"y":W=F.getFullYear();
switch(N){case 1:break;
case 2:W=String(W);
W=W.substr(W.length-2);
break;
default:L=true
}break;
case"Q":case"q":W=Math.ceil((F.getMonth()+1)/3);
L=true;
break;
case"M":case"L":var M=F.getMonth();
var Q;
switch(N){case 1:case 2:W=M+1;
L=true;
break;
case 3:case 4:case 5:Q=R[N-3];
break
}if(Q){var U=(V=="L")?"standalone":"format";
var H=["months",U,Q].join("-");
W=E[H][M]
}break;
case"w":var K=0;
W=dojo.date.locale._getWeekOfYear(F,K);
L=true;
break;
case"d":W=F.getDate();
L=true;
break;
case"D":W=dojo.date.locale._getDayOfYear(F);
L=true;
break;
case"E":case"e":case"c":var T=F.getDay();
var Q;
switch(N){case 1:case 2:if(V=="e"){var J=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
T=(T-J+7)%7
}if(V!="c"){W=T+1;
L=true;
break
}case 3:case 4:case 5:Q=R[N-3];
break
}if(Q){var U=(V=="c")?"standalone":"format";
var H=["days",U,Q].join("-");
W=E[H][T]
}break;
case"a":var I=(F.getHours()<12)?"am":"pm";
W=E[I];
break;
case"h":case"H":case"K":case"k":var S=F.getHours();
switch(V){case"h":W=(S%12)||12;
break;
case"H":W=S;
break;
case"K":W=(S%12);
break;
case"k":W=S||24;
break
}L=true;
break;
case"m":W=F.getMinutes();
L=true;
break;
case"s":W=F.getSeconds();
L=true;
break;
case"S":W=Math.round(F.getMilliseconds()*Math.pow(10,N-3));
break;
case"v":case"z":W=dojo.date.getTimezoneName(F);
if(W){break
}N=4;
case"Z":var G=F.getTimezoneOffset();
var O=[(G<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(G)/60),2),dojo.string.pad(Math.abs(G)%60,2)];
if(N==4){O.splice(0,0,"GMT");
O.splice(3,0,":")
}W=O.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+D)
}if(L){W=dojo.string.pad(W,N)
}return W
})
}dojo.date.locale.format=function(M,K){K=K||{};
var F=dojo.i18n.normalizeLocale(K.locale);
var E=K.formatLength||"short";
var D=dojo.date.locale._getGregorianBundle(F);
var G=[];
var N=dojo.hitch(this,B,M,D);
if(K.selector=="year"){var H=M.getFullYear();
if(F.match(/^zh|^ja/)){H+="年"
}return H
}if(K.selector!="time"){var L=K.datePattern||D["dateFormat-"+E];
if(L){G.push(C(L,N))
}}if(K.selector!="date"){var J=K.timePattern||D["timeFormat-"+E];
if(J){G.push(C(J,N))
}}var I=G.join(" ");
return I
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(I){I=I||{};
var H=dojo.i18n.normalizeLocale(I.locale);
var G=dojo.date.locale._getGregorianBundle(H);
var F=I.formatLength||"short";
var E=I.datePattern||G["dateFormat-"+F];
var D=I.timePattern||G["timeFormat-"+F];
var K;
if(I.selector=="date"){K=E
}else{if(I.selector=="time"){K=D
}else{K=E+" "+D
}}var J=[];
var L=C(K,dojo.hitch(this,A,J,G,I));
return{regexp:L,tokens:J,bundle:G}
};
dojo.date.locale.parse=function(H,F){var D=dojo.date.locale._parseInfo(F);
var O=D.tokens,M=D.bundle;
var N=new RegExp("^"+D.regexp+"$");
var L=N.exec(H);
if(!L){return null
}var J=["abbr","wide","narrow"];
var I=new Date(1972,0);
var G={};
var K="";
dojo.forEach(L,function(b,S){if(!S){return 
}var a=O[S-1];
var Q=a.length;
switch(a.charAt(0)){case"y":if(Q!=2){I.setFullYear(b);
G.year=b
}else{if(b<100){b=Number(b);
var Y=""+new Date().getFullYear();
var Z=Y.substring(0,2)*100;
var X=Number(Y.substring(2,4));
var W=Math.min(X+20,99);
var T=(b<W)?Z+b:Z-100+b;
I.setFullYear(T);
G.year=T
}else{if(F.strict){return null
}I.setFullYear(b);
G.year=b
}}break;
case"M":if(Q>2){var V=M["months-format-"+J[Q-3]].concat();
if(!F.strict){b=b.replace(".","").toLowerCase();
V=dojo.map(V,function(d){return d.replace(".","").toLowerCase()
})
}b=dojo.indexOf(V,b);
if(b==-1){return null
}}else{b--
}I.setMonth(b);
G.month=b;
break;
case"E":case"e":var c=M["days-format-"+J[Q-3]].concat();
if(!F.strict){b=b.toLowerCase();
c=dojo.map(c,"".toLowerCase)
}b=dojo.indexOf(c,b);
if(b==-1){return null
}break;
case"d":I.setDate(b);
G.date=b;
break;
case"D":I.setMonth(0);
I.setDate(b);
break;
case"a":var U=F.am||M.am;
var P=F.pm||M.pm;
if(!F.strict){var R=/\./g;
b=b.replace(R,"").toLowerCase();
U=U.replace(R,"").toLowerCase();
P=P.replace(R,"").toLowerCase()
}if(F.strict&&b!=U&&b!=P){return null
}K=(b==P)?"p":(b==U)?"a":"";
break;
case"K":if(b==24){b=0
}case"h":case"H":case"k":if(b>23){return null
}I.setHours(b);
break;
case"m":I.setMinutes(b);
break;
case"s":I.setSeconds(b);
break;
case"S":I.setMilliseconds(b)
}});
var E=I.getHours();
if(K==="p"&&E<12){I.setHours(E+12)
}else{if(K==="a"&&E==12){I.setHours(0)
}}if(G.year&&I.getFullYear()!=G.year){return null
}if(G.month&&I.getMonth()!=G.month){return null
}if(G.date&&I.getDate()!=G.date){return null
}return I
};
function C(G,F,J,I){var H=function(K){return K
};
F=F||H;
J=J||H;
I=I||H;
var E=G.match(/(''|[^'])+/g);
var D=false;
dojo.forEach(E,function(L,K){if(!L){E[K]=""
}else{E[K]=(D?J:F)(L);
D=!D
}});
return I(E.join(""))
}function A(G,F,E,D){D=dojo.regexp.escapeString(D);
if(!E.strict){D=D.replace(" a"," ?a")
}return D.replace(/([a-z])\1*/ig,function(O){var J;
var N=O.charAt(0);
var H=O.length;
var M="",L="";
if(E.strict){if(H>1){M="0{"+(H-1)+"}"
}if(H>2){L="0{"+(H-2)+"}"
}}else{M="0?";
L="0{0,2}"
}switch(N){case"y":J="\\d{2,4}";
break;
case"M":J=(H>2)?"\\S+":M+"[1-9]|1[0-2]";
break;
case"D":J=M+"[1-9]|"+L+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":J=M+"[1-9]|[12]\\d|3[01]";
break;
case"w":J=M+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":J="\\S+";
break;
case"h":J=M+"[1-9]|1[0-2]";
break;
case"k":J=M+"\\d|1[01]";
break;
case"H":J=M+"\\d|1\\d|2[0-3]";
break;
case"K":J=M+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":J="[0-5]\\d";
break;
case"S":J="\\d{"+H+"}";
break;
case"a":var K=E.am||F.am||"AM";
var I=E.pm||F.pm||"PM";
if(E.strict){J=K+"|"+I
}else{J=K+"|"+I;
if(K!=K.toLowerCase()){J+="|"+K.toLowerCase()
}if(I!=I.toLowerCase()){J+="|"+I.toLowerCase()
}}break;
default:J=".*"
}if(G){G.push(O)
}return"("+J+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(B,C){A.push({pkg:B,name:C})
};
dojo.date.locale._getGregorianBundle=function(C){var B={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,C);
B=dojo.mixin(B,D)
},this);
return B
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(E,D,B,G){var F;
var C=dojo.date.locale._getGregorianBundle(G);
var A=[E,B,D];
if(B=="standAlone"){F=C[A.join("-")]
}A[1]="format";
return(F||C[A.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(A,D){var C=dojo.cldr.supplemental.getWeekend(D);
var B=(A||new Date()).getDay();
if(C.end<C.start){C.end+=7;
if(B<C.start){B+=7
}}return B>=C.start&&B<=C.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(E,D){if(arguments.length==1){D=0
}var C=new Date(E.getFullYear(),0,1).getDay();
var A=(C-D+7)%7;
var B=Math.floor((dojo.date.locale._getDayOfYear(E)+A-1)/7);
if(C==D){B++
}return B
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
},_populateGrid:function(){var C=this.displayMonth;
C.setDate(1);
var I=C.getDay();
var H=dojo.date.getDaysInMonth(C);
var G=dojo.date.getDaysInMonth(dojo.date.add(C,"month",-1));
var F=new Date();
var E=this.value;
var D=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(D>I){D-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(L,O){O+=D;
var N=new Date(C);
var R,Q="dijitCalendar",M=0;
if(O<I){R=G-I+O+1;
M=-1;
Q+="Previous"
}else{if(O>=(I+H)){R=O-I-H+1;
M=1;
Q+="Next"
}else{R=O-I+1;
Q+="Current"
}}if(M){N=dojo.date.add(N,"month",M)
}N.setDate(R);
if(!dojo.date.compare(N,F,"date")){Q="dijitCalendarCurrentDate "+Q
}if(!dojo.date.compare(N,E,"date")){Q="dijitCalendarSelectedDate "+Q
}if(this.isDisabledDate(N,this.lang)){Q="dijitCalendarDisabledDate "+Q
}L.className=Q+"Month dijitCalendarDateTemplate";
L.dijitDateValue=N.valueOf();
var P=dojo.query(".dijitCalendarDateLabel",L)[0];
this._setText(P,N.getDate())
},this);
var K=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,K[C.getMonth()]);
var J=C.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(J++,0),{selector:"year",locale:this.lang}))
},this);
var B=this;
var A=function(N,M,L){dijit.typematic.addMouseListener(B[N],B,function(O){if(O>=0){B._adjustDisplay(M,L)
}},0.8,500)
};
A("incrementMonth","month",1);
A("decrementMonth","month",-1);
A("nextYearLabelNode","year",1);
A("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var A=dojo.hitch(this,function(E,H){var G=dojo.query(E,this.domNode)[0];
for(var F=0;
F<H;
F++){G.parentNode.appendChild(G.cloneNode(true))
}});
A(".dijitCalendarDayLabelTemplate",6);
A(".dijitCalendarDateTemplate",6);
A(".dijitCalendarWeekTemplate",5);
var D=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var C=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(F,E){this._setText(F,D[(E+C)%7])
},this);
var B=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(B,function(E){var F=dojo.doc.createElement("div");
this._setText(F,E);
this.monthLabelSpacer.appendChild(F)
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
var D=dojo.date.stamp.fromISOString;
this._clickableIncrementDate=D(this.clickableIncrement);
this._visibleIncrementDate=D(this.visibleIncrement);
this._visibleRangeDate=D(this.visibleRange);
var B=function(I){return I.getHours()*60*60+I.getMinutes()*60+I.getSeconds()
};
var G=B(this._clickableIncrementDate);
var F=B(this._visibleIncrementDate);
var C=B(this._visibleRangeDate);
var E=this.value.getTime();
this._refDate=new Date(E-E%(F*1000));
this._clickableIncrement=1;
this._totalIncrements=C/G;
this._visibleIncrement=F/G;
for(var A=-this._totalIncrements/2;
A<=this._totalIncrements/2;
A+=this._clickableIncrement){var H=this._createOption(A);
this.timeMenu.appendChild(H)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(D){var E=document.createElement("div");
var C=(E.date=new Date(this._refDate));
E.index=D;
var B=this._clickableIncrementDate;
C.setHours(C.getHours()+B.getHours()*D,C.getMinutes()+B.getMinutes()*D,C.getSeconds()+B.getSeconds()*D);
var A=document.createElement("div");
dojo.addClass(E,this.baseClass+"Item");
dojo.addClass(A,this.baseClass+"ItemInner");
A.innerHTML=dojo.date.locale.format(C,this.constraints);
E.appendChild(A);
if(D%this._visibleIncrement<1&&D%this._visibleIncrement>-1){dojo.addClass(E,this.baseClass+"Marker")
}else{if(D%this._clickableIncrement==0){dojo.addClass(E,this.baseClass+"Tick")
}}if(this.isDisabledDate(C)){dojo.addClass(E,this.baseClass+"ItemDisabled")
}if(dojo.date.compare(this.value,C,this.constraints.selector)==0){E.selected=true;
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
}},_mouseWheeled:function(B){dojo.stopEvent(B);
var A=(dojo.isIE?B.wheelDelta:-B.detail);
this[(A>0?"_onArrowUp":"_onArrowDown")]()
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
dojo.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:dojo.date.locale.regexp,compare:dojo.date.compare,format:function(B,A){if(!B||B.toString()==this._invalid){return null
}return dojo.date.locale.format(B,A)
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
},_callbackSetLabel:function(C,B,A){if(B&&B.query[this.searchAttr]!=this._lastQuery){return 
}if(!C.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(C[0],A)
}},_openResultList:function(B,A){if(A.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=B.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(C,B,A){this.valueNode.value=C;
dijit.form.FilteringSelect.superclass.setValue.call(this,C,A,B);
this._lastDisplayedValue=B
},setValue:function(D,C){var B=this;
var A=function(F,E){if(F){if(B.store.isItemLoaded(F)){B._callbackSetLabel([F],undefined,E)
}else{B.store.loadItem({item:F,onItem:function(H,G){B._callbackSetLabel(H,G,E)
}})
}}else{B._isvalid=false;
B.validate(false)
}};
this.store.fetchItemByIdentity({identity:D,onItem:function(E){A(E,C)
}})
},_setValueFromItem:function(B,A){this._isvalid=true;
this._setValue(this.store.getIdentity(B),this.labelFunc(B,this.store),A)
},labelFunc:function(B,A){return A.getValue(B,this.searchAttr)
},onkeyup:function(A){},_doSelect:function(A){this.item=A.item;
this._setValueFromItem(A.item,true)
},setDisplayedValue:function(B){if(this.store){var A={};
this._lastQuery=A[this.searchAttr]=B;
this.textbox.value=B;
this._lastDisplayedValue=B;
this.store.fetch({query:A,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:dojo.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(A){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(A,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dijit.form._Spinner"]){dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(B,A){return B
},_handleUpArrowEvent:function(A){this._onMouse(A,this.upArrowNode)
},_handleDownArrowEvent:function(A){this._onMouse(A,this.downArrowNode)
},_arrowPressed:function(B,A){if(this.disabled){return 
}dojo.addClass(B,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),A*this.smallDelta),false)
},_arrowReleased:function(A){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
dojo.removeClass(A,"dijitSpinnerButtonActive")
},_typematicCallback:function(B,C,A){if(C==this.textbox){C=(A.keyCode==dojo.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(B==-1){this._arrowReleased(C)
}else{this._arrowPressed(C,(C==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(B){dojo.stopEvent(B);
var A=0;
if(typeof B.wheelDelta=="number"){A=B.wheelDelta
}else{if(typeof B.detail=="number"){A=-B.detail
}}if(A>0){var D=this.upArrowNode;
var C=+1
}else{if(A<0){var D=this.downArrowNode;
var C=-1
}else{return 
}}this._arrowPressed(D,C);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var E=this;
this._wheelTimer=setTimeout(function(){E._arrowReleased(D)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(C,B){var A=C+B;
if(isNaN(C)||isNaN(A)){return C
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
},_setPixelValue:function(E,F,D){if(this.disabled){return 
}E=E<0?0:F<E?F:E;
var C=this.discreteValues;
if(C<=1||C==Infinity){C=F
}C--;
var B=F/C;
var A=Math.round(E/B);
this.setValue((this.maximum-this.minimum)*A/C+this.minimum,D)
},setValue:function(B,A){this.valueNode.value=this.value=B;
this.inherited("setValue",arguments);
var C=(B-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(C*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-C)*100)+"%"
},_bumpValue:function(C){if(this.disabled){return 
}var B=dojo.getComputedStyle(this.sliderBarContainer);
var E=dojo._getContentBox(this.sliderBarContainer,B);
var A=this.discreteValues;
if(A<=1||A==Infinity){A=E[this._pixelCount]
}A--;
var D=(this.value-this.minimum)*A/(this.maximum-this.minimum)+C;
if(D<0){D=0
}if(D>A){D=A
}D=D*(this.maximum-this.minimum)/A+this.minimum;
this.setValue(D,true)
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
var B=this;
var A=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=B
};
dojo.extend(A,dijit.form._SliderMover.prototype);
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:A});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(F){var D=this.widget;
var G=this.constraintBox;
if(!G){var B=D.sliderBarContainer;
var E=dojo.getComputedStyle(B);
var G=dojo._getContentBox(B,E);
G[D._startingPixelCount]=0;
this.constraintBox=G
}var A=this.marginBox;
var C=D._isReversed()?F[D._mousePixelCoord]-dojo._abs(D.sliderBarContainer).x:A[D._startingPixelCount]+F[D._mousePixelCoord];
dojo.hitch(D,"_setPixelValue")(D._isReversed()||D._upsideDown?(G[D._pixelCount]-C):C,G[D._pixelCount])
},destroy:function(B){var A=this.widget;
A.setValue(A.value,true);
dojo.dnd.Mover.prototype.destroy.call(this)
}});
dojo.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(B,A){return this._positionPrefix+B+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var B=this._genHTML(50,0)
}else{var C=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var B=this._genHTML(0,0);
for(var A=1;
A<this.count-1;
A++){B+=this._genHTML(C*A,A)
}B+=this._genHTML(100,this.count-1)
}else{var B=this._genHTML(100,0);
for(var A=1;
A<this.count-1;
A++){B+=this._genHTML(100-C*A,A)
}B+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=B
}});
dojo.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
dojo.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(A){return A
},_genHTML:function(B,A){return this._positionPrefix+this._calcPosition(B)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[A]+this._suffix
},getLabels:function(){var C=this.labels;
if(!C.length){C=dojo.query("> li",this.srcNodeRef).map(function(E){return String(E.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!C.length&&this.count>1){var A=this.minimum;
var D=(this.maximum-A)/(this.count-1);
for(var B=0;
B<this.count;
B++){C.push((B<this.numericMargin||B>=(this.count-this.numericMargin))?"":dojo.number.format(A,this.constraints));
A+=D
}}return C
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
}},setValue:function(E,D){var C=this.editNode;
if(typeof E=="string"){C.innerHTML="";
if(E.split){var B=this;
var A=true;
dojo.forEach(E.split("\n"),function(H){if(A){A=false
}else{C.appendChild(document.createElement("BR"))
}C.appendChild(document.createTextNode(H))
})
}else{C.appendChild(document.createTextNode(E))
}}else{E=C.innerHTML;
if(this.iframe){E=E.replace(/<div><\/div>\r?\n?$/i,"")
}E=E.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=E;
if(this.iframe){var G=document.createElement("div");
C.appendChild(G);
var F=G.offsetTop;
if(C.scrollWidth>C.clientWidth){F+=16
}if(this.lastHeight!=F){if(F==0){F=16
}dojo.contentBox(this.iframe,{h:F});
this.lastHeight=F
}C.removeChild(G)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),D)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var C=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=C.iframeEditTitle;
this._iframeFocusTitle=C.iframeFocusTitle;
var B=dojo.query('label[for="'+this.id+'"]');
if(B.length){this._iframeEditTitle=B[0].innerHTML+" "+this._iframeEditTitle
}var A=this.focusNode=this.editNode=document.createElement("BODY");
A.style.margin="0px";
A.style.padding="0px";
A.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var B=this.iframe.contentWindow;
try{var A=this.iframe.contentDocument.title
}catch(C){var A=""
}if(!B||!A){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var D=B.document;
D.getElementsByTagName("HTML")[0].replaceChild(this.editNode,D.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){D.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=D;
B.addEventListener("resize",dojo.hitch(this,this._changed),false)
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
},_changed:function(A,B){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,B)
}})
}if(!dojo._hasResource["dijit.layout.StackContainer"]){dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var B=this.getChildren();
dojo.forEach(B,this._setupChild,this);
dojo.some(B,function(C){if(C.selected){this.selectedChildWidget=C
}return C.selected
},this);
var A=this.selectedChildWidget;
if(!A&&B[0]){A=this.selectedChildWidget=B[0];
A.selected=true
}if(A){this._showChild(A)
}dojo.publish(this.id+"-startup",[{children:B,selected:A}]);
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
}},_transition:function(A,B){if(B){this._hideChild(B)
}this._showChild(A);
if(this.doLayout&&A.resize){A.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(C){var B=this.getChildren();
var A=dojo.indexOf(B,this.selectedChildWidget);
A+=C?1:B.length-1;
return B[A%B.length]
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
}},closeChild:function(A){var B=A.onClose(this,A);
if(B){this.removeChild(A);
A.destroy()
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
},onAddChild:function(E,D){var C=document.createElement("span");
this.domNode.appendChild(C);
var A=dojo.getObject(this.buttonWidget);
var B=new A({label:E.title,closeButton:E.closable},C);
this.addChild(B,D);
this.pane2button[E]=B;
E.controlButton=B;
dojo.connect(B,"onClick",dojo.hitch(this,"onButtonClick",E));
dojo.connect(B,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",E));
if(!this._currentChild){B.focusNode.setAttribute("tabIndex","0");
this._currentChild=E
}},onRemoveChild:function(B){if(this._currentChild===B){this._currentChild=null
}var A=this.pane2button[B];
if(A){A.destroy()
}this.pane2button[B]=null
},onSelectChild:function(C){if(!C){return 
}if(this._currentChild){var B=this.pane2button[this._currentChild];
B.setChecked(false);
B.focusNode.setAttribute("tabIndex","-1")
}var A=this.pane2button[C];
A.setChecked(true);
this._currentChild=C;
A.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(B){var A=dijit.byId(this.containerId);
A.selectChild(B)
},onCloseButtonClick:function(C){var B=dijit.byId(this.containerId);
B.closeChild(C);
var A=this.pane2button[this._currentChild];
if(A){dijit.focus(A.focusNode||A.domNode)
}},adjacent:function(D){var C=this.getChildren();
var B=dojo.indexOf(C,this.pane2button[this._currentChild]);
var A=D?1:C.length-1;
return C[(B+A)%C.length]
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
},_transition:function(B,F){if(this._inTransition){return 
}this._inTransition=true;
var E=[];
var D=this._verticalSpace;
if(B){B.setSelected(true);
var C=B.containerNode;
C.style.display="";
E.push(dojo.animateProperty({node:C,duration:this.duration,properties:{height:{start:"1",end:D}},onEnd:function(){C.style.overflow="auto"
}}))
}if(F){F.setSelected(false);
var A=F.containerNode;
A.style.overflow="hidden";
E.push(dojo.animateProperty({node:A,duration:this.duration,properties:{height:{start:D,end:"1"}},onEnd:function(){A.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(E).play()
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
}dojo.forEach(this.getChildren(),function(A,B,C){this._injectChild(A);
if(B<C.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(A){A.domNode.style.position="absolute";
dojo.addClass(A.domNode,"dijitSplitPane")
},_addSizer:function(){var D=this.sizers.length;
var B=this.sizers[D]=document.createElement("div");
B.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var A=document.createElement("div");
A.className="thumb";
B.appendChild(A);
var C=this;
var E=(function(){var F=D;
return function(G){C.beginSizing(G,F)
}
})();
dojo.connect(B,"onmousedown",E);
this.domNode.appendChild(B);
dojo.setSelectable(B,false)
},removeChild:function(B){if(this.sizers.length&&dojo.indexOf(this.getChildren(),B)!=-1){var A=this.sizers.length-1;
dojo._destroyElement(this.sizers[A]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(C,B){this.inherited("addChild",arguments);
if(this._started){this._injectChild(C);
var A=this.getChildren();
if(A.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var D=this.getChildren();
if(!D.length){return 
}var B=this.isHorizontal?this.paneWidth:this.paneHeight;
if(D.length>1){B-=this.sizerWidth*(D.length-1)
}var A=0;
dojo.forEach(D,function(H){A+=H.sizeShare
});
var F=B/A;
var C=0;
dojo.forEach(D.slice(0,D.length-1),function(H){var I=Math.round(F*H.sizeShare);
H.sizeActual=I;
C+=I
});
D[D.length-1].sizeActual=B-C;
this._checkSizes();
var G=0;
var E=D[0].sizeActual;
this._movePanel(D[0],G,E);
D[0].position=G;
G+=E;
if(!this.sizers){return 
}dojo.some(D.slice(1),function(H,I){if(!this.sizers[I]){return true
}this._moveSlider(this.sizers[I],G,this.sizerWidth);
this.sizers[I].position=G;
G+=this.sizerWidth;
E=H.sizeActual;
this._movePanel(H,G,E);
H.position=G;
G+=E
},this)
},_movePanel:function(C,D,A){if(this.isHorizontal){C.domNode.style.left=D+"px";
C.domNode.style.top=0;
var B={w:A,h:this.paneHeight};
if(C.resize){C.resize(B)
}else{dojo.marginBox(C.domNode,B)
}}else{C.domNode.style.left=0;
C.domNode.style.top=D+"px";
var B={w:this.paneWidth,h:A};
if(C.resize){C.resize(B)
}else{dojo.marginBox(C.domNode,B)
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
var C=0;
var B=this.getChildren();
dojo.forEach(B,function(F){C+=F.sizeActual;
D+=F.sizeMin
});
if(D<=C){var A=0;
dojo.forEach(B,function(F){if(F.sizeActual<F.sizeMin){A+=F.sizeMin-F.sizeActual;
F.sizeActual=F.sizeMin
}});
if(A>0){var E=this.isDraggingLeft?B.reverse():B;
dojo.forEach(E,function(F){A=this._growPane(A,F)
},this)
}}else{dojo.forEach(B,function(F){F.sizeActual=Math.round(C*(F.sizeMin/D))
})
}},beginSizing:function(F,B){var E=this.getChildren();
this.paneBefore=E[B];
this.paneAfter=E[B+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[B];
if(!this.cover){this.cover=dojo.doc.createElement("div");
this.domNode.appendChild(this.cover);
var D=this.cover.style;
D.position="absolute";
D.zIndex=1;
D.top=0;
D.left=0;
D.width="100%";
D.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=dojo.coords(E[0].domNode,true);
if(this.isHorizontal){var C=(F.layerX?F.layerX:F.offsetX);
var A=F.pageX;
this.originPos=this.originPos.x
}else{var C=(F.layerY?F.layerY:F.offsetY);
var A=F.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=A;
this.screenToClientOffset=A-C;
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
var B=this.paneBefore.position;
var A=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=C-B;
this.paneAfter.position=C+this.sizerWidth;
this.paneAfter.sizeActual=A-this.paneAfter.position;
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
},_restoreState:function(){dojo.forEach(this.getChildren(),function(C,A){var B=this._getCookieName(A);
var E=dojo.cookie(B);
if(E){var D=parseInt(E);
if(typeof D=="number"){C.sizeShare=D
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
}var A=this.tabPosition.replace(/-h/,"");
var B=[{domNode:this.tablist.domNode,layoutAlign:A},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,B);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,B[1]);
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