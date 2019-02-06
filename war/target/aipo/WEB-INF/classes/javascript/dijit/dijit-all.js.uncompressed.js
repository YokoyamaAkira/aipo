if(!dojo._hasResource["dojo.colors"]){dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
(function(){var B=function(E,D,F){if(F<0){++F
}if(F>1){--F
}var C=6*F;
if(C<1){return E+(D-E)*C
}if(2*F<1){return D
}if(3*F<2){return E+(D-E)*(2/3-F)*6
}return E
};
dojo.colorFromRgb=function(E,I){var G=E.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(G){var K=G[2].split(/\s*,\s*/),C=K.length,Q=G[1];
if((Q=="rgb"&&C==3)||(Q=="rgba"&&C==4)){var D=K[0];
if(D.charAt(D.length-1)=="%"){var M=dojo.map(K,function(H){return parseFloat(H)*2.56
});
if(C==4){M[3]=K[3]
}return dojo.colorFromArray(M,I)
}return dojo.colorFromArray(K,I)
}if((Q=="hsl"&&C==3)||(Q=="hsla"&&C==4)){var N=((parseFloat(K[0])%360)+360)%360/360,F=parseFloat(K[1])/100,J=parseFloat(K[2])/100,O=J<=0.5?J*(F+1):J+F-J*F,P=2*J-O,M=[B(P,O,N+1/3)*256,B(P,O,N)*256,B(P,O,N-1/3)*256,1];
if(C==4){M[3]=K[3]
}return dojo.colorFromArray(M,I)
}}return null
};
var A=function(C,D,E){C=Number(C);
return isNaN(C)?E:C<D?D:C>E?E:C
};
dojo.Color.prototype.sanitize=function(){var C=this;
C.r=Math.round(A(C.r,0,255));
C.g=Math.round(A(C.g,0,255));
C.b=Math.round(A(C.b,0,255));
C.a=A(C.a,0,1);
return this
}
})();
dojo.colors.makeGrey=function(A,B){return dojo.colorFromArray([A,A,A,B])
};
dojo.Color.named=dojo.mixin({aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},dojo.Color.named)
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(H,I,D){D=dojo.i18n.normalizeLocale(D);
var G=D.split("-");
var J=[H,"nls",I].join(".");
var F=dojo._loadedModules[J];
if(F){var E;
for(var A=G.length;
A>0;
A--){var C=G.slice(0,A).join("_");
if(F[C]){E=F[C];
break
}}if(!E){E=F.ROOT
}if(E){var B=function(){};
B.prototype=E;
return new B()
}}throw new Error("Bundle not found: "+I+" in "+H+" , locale="+D)
};
dojo.i18n.normalizeLocale=function(A){var B=A?A.toLowerCase():dojo.locale;
if(B=="root"){B="ROOT"
}return B
};
dojo.i18n._requireLocalization=function(F,G,C,P){var M=dojo.i18n.normalizeLocale(C);
var J=[F,"nls",G].join(".");
var I="";
if(P){var B=P.split(",");
for(var N=0;
N<B.length;
N++){if(M.indexOf(B[N])==0){if(B[N].length>I.length){I=B[N]
}}}if(!I){I="ROOT"
}}var Q=P?I:M;
var E=dojo._loadedModules[J];
var H=null;
if(E){if(djConfig.localizationComplete&&E._built){return 
}var L=Q.replace(/-/g,"_");
var A=J+"."+L;
H=dojo._loadedModules[A]
}if(!H){E=dojo.provide(J);
var K=dojo._getModuleSymbols(F);
var O=K.concat("nls").join("/");
var D;
dojo.i18n._searchLocalePath(Q,P,function(W){var R=W.replace(/-/g,"_");
var V=J+"."+R;
var T=false;
if(!dojo._loadedModules[V]){dojo.provide(V);
var U=[O];
if(W!="ROOT"){U.push(W)
}U.push(G);
var S=U.join("/")+".js";
T=dojo._loadPath(S,null,function(Z){var Y=function(){};
Y.prototype=D;
E[R]=new Y();
for(var X in Z){E[R][X]=Z[X]
}})
}else{T=true
}if(T&&E[R]){D=E[R]
}else{E[R]=D
}if(P){return true
}})
}if(P&&M!=I){E[M.replace(/-/g,"_")]=E[I.replace(/-/g,"_")]
}};
(function(){var B=djConfig.extraLocale;
if(B){if(!B instanceof Array){B=[B]
}var A=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(F,E,D,C){A(F,E,D,C);
if(D){return 
}for(var G=0;
G<B.length;
G++){A(F,E,B[G],C)
}}
}})();
dojo.i18n._searchLocalePath=function(D,E,H){D=dojo.i18n.normalizeLocale(D);
var F=D.split("-");
var G=[];
for(var A=F.length;
A>0;
A--){G.push(F.slice(0,A).join("-"))
}G.push(false);
if(E){G.reverse()
}for(var I=G.length-1;
I>=0;
I--){var B=G[I]||"ROOT";
var C=H(B);
if(C){break
}}};
dojo.i18n._preloadLocalizations=function(D,A){function B(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<A.length;
G++){if(A[G]==H){dojo.require(D+"_"+H);
return true
}}return false
})
}B();
var E=djConfig.extraLocale||[];
for(var C=0;
C<E.length;
C++){B(E[C])
}}
}if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
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
}if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var E=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var D=dojo.query("> script[type='dojo/method'][event='preamble']",E).orphan();
var B=dojo.query("> script[type^='dojo/']",E).orphan();
var C=E.nodeName;
var A=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(G){return dojo.getObject(G)
}):[dijit._Widget,dijit._Templated];
if(D.length){A.preamble=dojo.parser._functionFromScript(D[0])
}var F=dojo.map(B,function(G){var H=G.getAttribute("event")||"postscript";
return{event:H,func:dojo.parser._functionFromScript(G)}
});
this.mixins.push(function(){dojo.forEach(F,function(G){dojo.connect(this,G.event,this,G.func)
},this)
});
A.widgetsInTemplate=true;
A._skipNodeCache=true;
A.templateString="<"+C+" class='"+E.className+"' dojoAttachPoint='"+(E.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(E.getAttribute("dojoAttachEvent")||"")+"' >"+E.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+C+">";
dojo.query("[dojoType]",E).forEach(function(G){G.removeAttribute("dojoType")
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
dojo.dnd.isFormElement=function(A){var B=A.target;
if(B.nodeType==3){B=B.parentNode
}return" button textarea input select option ".indexOf(" "+B.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var C=dojo.doc,A=C.documentElement,B=window,D=dojo.body();
if(dojo.isMozilla){return{w:A.clientWidth,h:B.innerHeight}
}else{if(!dojo.isOpera&&B.innerWidth){return{w:B.innerWidth,h:B.innerHeight}
}else{if(!dojo.isOpera&&A&&A.clientWidth){return{w:A.clientWidth,h:A.clientHeight}
}else{if(D.clientWidth){return{w:D.clientWidth,h:D.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(C){var B=dojo.dnd.getViewport(),A=0,D=0;
if(C.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){A=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(C.clientX>B.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){A=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(C.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){D=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(C.clientY>B.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){D=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(A,D)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(A){for(var K=A.target;
K;
){if(K.nodeType==1&&(K.tagName.toLowerCase() in dojo.dnd._validNodes)){var H=dojo.getComputedStyle(K);
if(H.overflow.toLowerCase() in dojo.dnd._validOverflow){var B=dojo._getContentBox(K,H),F=dojo._abs(K,true);
B.l+=F.x+K.scrollLeft;
B.t+=F.y+K.scrollTop;
var D=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,B.w/2),N=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,B.h/2),J=A.pageX-B.l,I=A.pageY-B.t,G=0,E=0;
if(J>0&&J<B.w){if(J<D){G=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(J>B.w-D){G=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(I>0&&I<B.h){if(I<N){E=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(I>B.h-N){E=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var L=K.scrollLeft,M=K.scrollTop;
K.scrollLeft=K.scrollLeft+G;
K.scrollTop=K.scrollTop+E;
if(L!=K.scrollLeft||M!=K.scrollTop){return 
}}}try{K=K.parentNode
}catch(C){K=null
}}dojo.dnd.autoScroll(A)
}
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(C,D,B){this.node=dojo.byId(C);
this.marginBox={l:D.pageX,t:D.pageY};
this.mouseButton=D.button;
var A=this.host=B,E=C.ownerDocument,F=dojo.connect(E,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(E,"onmousemove",this,"onMouseMove"),dojo.connect(E,"onmouseup",this,"onMouseUp"),dojo.connect(E,"ondragstart",dojo,"stopEvent"),dojo.connect(E,"onselectstart",dojo,"stopEvent"),F];
if(A&&A.onMoveStart){A.onMoveStart(this)
}},onMouseMove:function(A){dojo.dnd.autoScroll(A);
var B=this.marginBox;
this.host.onMove(this,{l:B.l+A.pageX,t:B.t+A.pageY})
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
},markupFactory:function(A,B){return new dojo.dnd.Moveable(B,A)
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
},onFirstMove:function(A){},onMove:function(A,B){this.onMoving(A,B);
dojo.marginBox(A.node,B);
this.onMoved(A,B)
},onMoving:function(A,B){},onMoved:function(A,B){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(A,B){return new dojo.dnd.move.constrainedMoveable(B,A)
},constructor:function(B,A){if(!A){A={}
}this.constraints=A.constraints;
this.within=A.within
},onFirstMove:function(A){var B=this.constraintBox=this.constraints.call(this,A),C=A.marginBox;
B.r=B.l+B.w-(this.within?C.w:0);
B.b=B.t+B.h-(this.within?C.h:0)
},onMove:function(A,C){var B=this.constraintBox;
C.l=C.l<B.l?B.l:B.r<C.l?B.r:C.l;
C.t=C.t<B.t?B.t:B.b<C.t?B.b:C.t;
dojo.marginBox(A.node,C)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(A,B){return new dojo.dnd.move.boxConstrainedMoveable(B,A)
},constructor:function(A,B){var C=B&&B.box;
this.constraints=function(){return C
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(A,B){return new dojo.dnd.move.parentConstrainedMoveable(B,A)
},constructor:function(A,B){var C=B&&B.area;
this.constraints=function(){var D=this.node.parentNode,F=dojo.getComputedStyle(D),G=dojo._getMarginBox(D,F);
if(C=="margin"){return G
}var E=dojo._getMarginExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="border"){return G
}E=dojo._getBorderExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="padding"){return G
}E=dojo._getPadExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
}
}});
dojo.dnd.move.constrainedMover=function(C,B){var A=function(F,D,E){dojo.dnd.Mover.call(this,F,D,E)
};
dojo.extend(A,dojo.dnd.Mover.prototype);
dojo.extend(A,{onMouseMove:function(H){dojo.dnd.autoScroll(H);
var E=this.marginBox,D=this.constraintBox,F=E.l+H.pageX,G=E.t+H.pageY;
F=F<D.l?D.l:D.r<F?D.r:F;
G=G<D.t?D.t:D.b<G?D.b:G;
this.host.onMove(this,{l:F,t:G})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var D=this.constraintBox=C.call(this),E=this.marginBox;
D.r=D.l+D.w-(B?E.w:0);
D.b=D.t+D.h-(B?E.h:0)
}});
return A
};
dojo.dnd.move.boxConstrainedMover=function(A,B){return dojo.dnd.move.constrainedMover(function(){return A
},B)
};
dojo.dnd.move.parentConstrainedMover=function(B,A){var C=function(){var D=this.node.parentNode,F=dojo.getComputedStyle(D),G=dojo._getMarginBox(D,F);
if(B=="margin"){return G
}var E=dojo._getMarginExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="border"){return G
}E=dojo._getBorderExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="padding"){return G
}E=dojo._getPadExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
};
return dojo.dnd.move.constrainedMover(C,A)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(B){var A=B.shift();
var C=A;
dojo.forEach(B,function(D){dojo.connect(C,"onEnd",D,"play");
C=D
});
return A
};
dojo.fx.combine=function(A){var B=new dojo._Animation({curve:[0,1]});
if(!A.length){return B
}B.duration=A[0].duration;
dojo.forEach(A,function(C){dojo.forEach(["play","pause","stop"],function(D){if(C[D]){dojo.connect(B,D,C,D)
}})
});
return B
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
var B=D.node,A=B.style;
var C=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){A.overflow="hidden";
if(A.visibility=="hidden"||A.display=="none"){A.height="1px";
A.display="";
A.visibility="";
return 1
}else{var E=dojo.style(B,"height");
return Math.max(E,1)
}},end:function(){return B.scrollHeight
}}}},D));
dojo.connect(C,"onEnd",function(){A.height="auto"
});
return C
};
dojo.fx.wipeOut=function(D){var B=D.node=dojo.byId(D.node);
var A=B.style;
var C=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},D));
dojo.connect(C,"beforeBegin",function(){A.overflow="hidden";
A.display=""
});
dojo.connect(C,"onEnd",function(){A.height="auto";
A.display="none"
});
return C
};
dojo.fx.slideTo=function(F){var A=(F.node=dojo.byId(F.node));
var D=null;
var C=null;
var E=(function(G){return function(){var I=dojo.getComputedStyle(G);
var J=I.position;
D=(J=="absolute"?G.offsetTop:parseInt(I.top)||0);
C=(J=="absolute"?G.offsetLeft:parseInt(I.left)||0);
if(J!="absolute"&&J!="relative"){var H=dojo.coords(G,true);
D=H.y;
C=H.x;
G.style.position="absolute";
G.style.top=D+"px";
G.style.left=C+"px"
}}
})(A);
E();
var B=dojo.animateProperty(dojo.mixin({properties:{top:{end:F.top||0},left:{end:F.left||0}}},F));
dojo.connect(B,"beforeBegin",B,E);
return B
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
},_checkIfSingleChild:function(){var A=dojo.query(">",this.containerNode||this.domNode),B=A.filter("[widgetId]");
if(A.length==1&&B.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(B[0])
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
},resize:function(C){dojo.marginBox(this.domNode,C);
var A=this.containerNode||this.domNode,B=dojo.mixin(dojo.marginBox(A),C||{});
this._contentBox=dijit.layout.marginBox2contentBox(A,B);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(A){this.cancel();
this.isLoaded=false;
this._loadCheck(A)
},_loadCheck:function(A){var B=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(A||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&B&&!this._xhrDfd)||(!this.isLoaded&&B&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var A=this;
var B={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(B,this.ioArgs)
}var C=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(B);
C.addCallback(function(E){try{A.onDownloadEnd.call(A);
A._isDownloaded=true;
A.setContent.call(A,E)
}catch(D){A._onError.call(A,"Content",D)
}delete A._xhrDfd;
return E
});
C.addErrback(function(D){if(!C.cancelled){A._onError.call(A,"Download",D)
}delete A._xhrDfd;
return D
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(A){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(D){this.destroyDescendants();
try{var A=this.containerNode||this.domNode;
while(A.firstChild){dojo._destroyElement(A.firstChild)
}if(typeof D=="string"){if(this.extractContent){match=D.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){D=match[1]
}}A.innerHTML=D
}else{if(D.nodeType){A.appendChild(D)
}else{dojo.forEach(D,function(E){A.appendChild(E.cloneNode(true))
})
}}}catch(C){var B=this.onContentError(C);
try{A.innerHTML=B
}catch(C){console.error("Fatal "+this.id+" could not change content due to "+C.message,C)
}}},_onError:function(A,C,D){var B=this["on"+A+"Error"].call(this,C);
if(D){console.error(D,C)
}else{if(B){this._setContent.call(this,B)
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
},setValues:function(D){var C={};
dojo.forEach(this.getDescendants(),function(F){if(!F.name){return 
}var G=C[F.name]||(C[F.name]=[]);
G.push(F)
});
for(var A in C){var B=C[A],E=dojo.getObject(A,false,D);
if(!dojo.isArray(E)){E=[E]
}if(B[0].setChecked){dojo.forEach(B,function(G,F){G.setChecked(dojo.indexOf(E,G.value)!=-1)
})
}else{dojo.forEach(B,function(G,F){G.setValue(E[F])
})
}}},getValues:function(){var A={};
dojo.forEach(this.getDescendants(),function(B){var E=B.getValue?B.getValue():B.value;
var C=B.name;
if(!C){return 
}if(B.setChecked){if(/Radio/.test(B.declaredClass)){if(B.checked){dojo.setObject(C,E,A)
}}else{var D=dojo.getObject(C,false,A);
if(!D){D=[];
dojo.setObject(C,D,A)
}if(B.checked){D.push(E)
}}}else{dojo.setObject(C,E,A)
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
},layout:function(){var D=dijit.getViewport();
var B=this.node.style,C=this.domNode.style;
C.top=D.t+"px";
C.left=D.l+"px";
B.width=D.w+"px";
B.height=D.h+"px";
var A=dijit.getViewport();
if(D.w!=A.w){B.width=A.w+"px"
}if(D.h!=A.h){B.height=A.h+"px"
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
}var C=dijit.getViewport();
var B=dojo.marginBox(this.domNode);
var A=this.domNode.style;
A.left=Math.floor((C.l+(C.w-B.w)/2))+"px";
A.top=Math.floor((C.t+(C.h-B.h)/2))+"px"
},_findLastFocus:function(A){this._lastFocused=A.target
},_cycleFocus:function(A){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(C){if(C.keyCode){var A=C.target;
if(A==this.titleBar&&C.shiftKey&&C.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(C)
}else{while(A){if(A==this.domNode){if(C.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}A=A.parentNode
}if(C.keyCode!=dojo.keys.TAB){dojo.stopEvent(C)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(B){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
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
}else{var A="text";
var D;
try{D=dojo.global.getSelection()
}catch(B){}if(D&&D.rangeCount==1){var C=D.getRangeAt(0);
if((C.startContainer==C.endContainer)&&((C.endOffset-C.startOffset)==1)&&(C.startContainer.nodeType!=3)){A="control"
}}return A
}},getSelectedText:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().text
}else{var A=dojo.global.getSelection();
if(A){return A.toString()
}}},getSelectedHtml:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().htmlText
}else{var C=dojo.global.getSelection();
if(C&&C.rangeCount){var B=C.getRangeAt(0).cloneContents();
var A=document.createElement("div");
A.appendChild(B);
return A.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var B=dojo.doc.selection.createRange();
if(B&&B.item){return dojo.doc.selection.createRange().item(0)
}}else{var A=dojo.global.getSelection();
return A.anchorNode.childNodes[A.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var B=this.getSelectedElement();
if(B){return B.parentNode
}}else{if(dojo.doc.selection){return dojo.doc.selection.createRange().parentElement()
}else{var C=dojo.global.getSelection();
if(C){var A=C.anchorNode;
while(A&&(A.nodeType!=1)){A=A.parentNode
}return A
}}}},hasAncestorElement:function(A){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(B){var A=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(A,arguments)
},isTag:function(C,E){if(C&&C.tagName){var D=C.tagName.toLowerCase();
for(var A=0;
A<E.length;
A++){var B=String(E[A]).toLowerCase();
if(D==B){return B
}}}return""
},getParentOfType:function(A,B){while(A){if(this.isTag(A,B).length){return A
}A=A.parentNode
}return null
},remove:function(){var A=dojo.doc.selection;
if(A){if(A.type.toLowerCase()!="none"){A.clear()
}return A
}else{A=dojo.global.getSelection();
A.deleteFromDocument();
return A
}},selectElementChildren:function(C,B){var E=dojo.global;
var F=dojo.doc;
C=dojo.byId(C);
if(F.selection&&dojo.body().createTextRange){var A=C.ownerDocument.body.createTextRange();
A.moveToElementText(C);
if(!B){A.select()
}}else{if(E.getSelection){var D=E.getSelection();
if(D.setBaseAndExtent){D.setBaseAndExtent(C,0,C,C.innerText.length-1)
}else{if(D.selectAllChildren){D.selectAllChildren(C)
}}}}},selectElement:function(C,B){var F=dojo.doc;
C=dojo.byId(C);
if(F.selection&&dojo.body().createTextRange){try{var A=dojo.body().createControlRange();
A.addElement(C);
if(!B){A.select()
}}catch(E){this.selectElementChildren(C,B)
}}else{if(dojo.global.getSelection){var D=dojo.global.getSelection();
if(D.removeAllRanges){var A=F.createRange();
A.selectNode(C);
D.removeAllRanges();
D.addRange(A)
}}}}})
}if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var B=dojo.doc.createElement("textarea");
B.id="dijit._editor.RichText.savedContent";
var A=B.style;
A.display="none";
A.position="absolute";
A.top="-100px";
A.left="-100px";
A.height="3px";
A.width="3px";
dojo.body().appendChild(B)
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
},setupDefaultShortcuts:function(){var A=this.KEY_CTRL;
var B=function(C,D){return arguments.length==1?function(){this.execCommand(C)
}:function(){this.execCommand(C,D)
}
};
this.addKeyHandler("b",A,B("bold"));
this.addKeyHandler("i",A,B("italic"));
this.addKeyHandler("u",A,B("underline"));
this.addKeyHandler("a",A,B("selectall"));
this.addKeyHandler("s",A,function(){this.save(true)
});
this.addKeyHandler("1",A,B("formatblock","h1"));
this.addKeyHandler("2",A,B("formatblock","h2"));
this.addKeyHandler("3",A,B("formatblock","h3"));
this.addKeyHandler("4",A,B("formatblock","h4"));
this.addKeyHandler("\\",A,B("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",A,B("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var F=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var B="",C,G=0;
while((C=F[G++])){if(C.charAt(1)!="l"){B+="<"+C+"><span>content</span></"+C+">"
}else{B+="<"+C+"><li>content</li></"+C+">"
}}var D=document.createElement("div");
D.style.position="absolute";
D.style.left="-2000px";
D.style.top="-2000px";
document.body.appendChild(D);
D.innerHTML=B;
var A=D.firstChild;
while(A){dijit._editor.selection.selectElement(A.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A.firstChild]);
var E=A.tagName.toLowerCase();
this._local2NativeFormatNames[E]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[E]]=E;
A=A.nextSibling
}document.body.removeChild(D)
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
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(A){var C=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){A="<div>"+A+"</div>"
}var D=[C.fontWeight,C.fontSize,C.fontFamily].join(" ");
var B=C.lineHeight;
if(B.indexOf("px")>=0){B=parseFloat(B)/parseFloat(C.fontSize)
}else{if(B.indexOf("em")>=0){B=parseFloat(B)
}else{B="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",D,";","	min-height:",this.minHeight,";","	line-height:",B,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+A+"</body></html>"].join("")
},_drawIframe:function(A){if(!this.iframe){var C=this.iframe=dojo.doc.createElement("iframe");
var B=C.style;
B.border="none";
B.lineHeight="0";
B.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var H=dojo.query('label[for="'+this.id+'"]');
if(H.length){this._localizedIframeTitles.iframeEditTitle=H[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var G=this.srcNodeRef
}else{var G=dojo.doc.createElement("div");
G.style.display="none";
G.innerHTML=A;
this.editingArea.appendChild(G)
}this.editingArea.appendChild(this.iframe);
var D=false;
var F=this.iframe.contentDocument;
F.open();
F.write(this._getIframeDocTxt(A));
F.close();
var E=dojo.hitch(this,function(){if(!D){D=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(I){setTimeout(E,500);
D=false;
return 
}dojo._destroyElement(G);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(G);
this.editNode.innerHTML=A;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
E()
},_applyEditingAreaStyleSheets:function(){var C=[];
if(this.styleSheets){C=this.styleSheets.split(";");
this.styleSheets=""
}C=C.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var D="",B=0,A;
while((A=C[B++])){var E=(new dojo._Url(dojo.global.location,A)).toString();
this.editingAreaStyleSheets.push(E);
D+='<link rel="stylesheet" type="text/css" href="'+E+'"/>'
}return D
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
if(!A){dojo.forEach(this._mozSettingProps,function(B,C){this.document.execCommand(B,false,this._mozSettings[C])
},this)
}}this.disabled=A
},_isResized:function(){return false
},onLoad:function(D){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var A=this.events.concat(this.captureEvents),E=0,C;
while((C=A[E++])){this.connect(this.document,C.toLowerCase(),C)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(B){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(D);
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
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(E){var A=E.ctrlKey?this.KEY_CTRL:0|E.shiftKey?this.KEY_SHIFT:0;
var C=E.keyChar||E.keyCode;
if(this._keyHandlers[C]){var F=this._keyHandlers[C],B=0,D;
while((D=F[B++])){if(A==D.modifiers){if(!D.handler.apply(this,arguments)){E.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(E)
}),1)
},addKeyHandler:function(A,C,B){if(!dojo.isArray(this._keyHandlers[A])){this._keyHandlers[A]=[]
}this._keyHandlers[A].push({modifiers:C||0,handler:B})
},onKeyPressed:function(A){this.onDisplayChanged()
},onClick:function(A){this.onDisplayChanged(A)
},_onBlur:function(A){var B=this.getValue(true);
if(B!=this.savedContent){this.onChange(B);
this.savedContent=B
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
},queryCommandAvailable:function(A){var F=1;
var D=1<<1;
var G=1<<2;
var H=1<<3;
var E=1<<4;
var B=dojo.isSafari;
function I(J){return{ie:Boolean(J&F),mozilla:Boolean(J&D),safari:Boolean(J&G),safari420:Boolean(J&E),opera:Boolean(J&H)}
}var C=null;
switch(A.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":C=I(D|F|G|H);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":C=I(D|F|H|E);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":C=I(F);
break;
case"cut":case"copy":case"paste":C=I(F|D|E);
break;
case"inserttable":C=I(D|F);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":C=I(F|D);
break;
default:return false
}return(dojo.isIE&&C.ie)||(dojo.isMoz&&C.mozilla)||(dojo.isSafari&&C.safari)||(B&&C.safari420)||(dojo.isOpera&&C.opera)
},execCommand:function(D,C){var B;
this.focus();
D=this._normalizeCommand(D);
if(C!=undefined){if(D=="heading"){throw new Error("unimplemented")
}else{if((D=="formatblock")&&dojo.isIE){C="<"+C+">"
}}}if(D=="inserthtml"){C=this._preFilterContent(C);
if(dojo.isIE){var E=this.document.selection.createRange();
E.pasteHTML(C);
E.select();
B=true
}else{if(dojo.isMoz&&!C.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
B=true
}else{B=this.document.execCommand(D,false,C)
}}}else{if((D=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var A=this.window.getSelection();
var F=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[F]);
B=this.document.execCommand("unlink",false,null)
}else{if((D=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
B=this.document.execCommand(D,false,C);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((D=="backcolor")||(D=="forecolor"))){C=arguments.length>1?C:null;
B=this.document.execCommand(D,false,C)
}else{C=arguments.length>1?C:null;
if(C||D!="createlink"){B=this.document.execCommand(D,false,C)
}}}}}this.onDisplayChanged();
return B
},queryCommandEnabled:function(A){A=this._normalizeCommand(A);
if(dojo.isMoz||dojo.isSafari){if(A=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(A=="inserttable"){return true
}}}if(dojo.isSafari){if(A=="copy"){A="cut"
}else{if(A=="paste"){return true
}}}var B=(dojo.isIE)?this.document.selection.createRange():this.document;
return B.queryCommandEnabled(A)
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
var B=false;
if(dojo.isMoz){var A=this.editNode.lastChild;
while(A){if(A.nodeType==3){if(A.nodeValue.replace(/^\s+|\s+$/g,"").length>0){B=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A]);
break
}}else{if(A.nodeType==1){B=true;
if(A.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[A])
}break
}}A=A.previousSibling
}}else{B=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(B){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
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
}}}}},_preFilterContent:function(A){var B=A;
dojo.forEach(this.contentPreFilters,function(C){if(C){B=C(B)
}});
return B
},_preDomFilterContent:function(A){A=A||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(B){if(B&&dojo.isFunction(B)){B(A)
}},this)
},_postFilterContent:function(B,A){B=B||this.editNode;
if(this.contentDomPostFilters.length){if(A&&B.cloneNode){B=B.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(D){B=D(B)
})
}var C=this.getNodeChildrenHtml(B);
if(!C.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){C=""
}dojo.forEach(this.contentPostFilters,function(D){C=D(C)
});
return C
},_saveContent:function(A){var B=dojo.byId("dijit._editor.RichText.savedContent");
B.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(B,A){B=B.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!A){B=B.replace(/'/gm,"&#39;")
}return B
},getNodeHtml:function(J){switch(J.nodeType){case 1:var I="<"+J.tagName.toLowerCase();
if(dojo.isMoz){if(J.getAttribute("type")=="_moz"){J.removeAttribute("type")
}if(J.getAttribute("_moz_dirty")!=undefined){J.removeAttribute("_moz_dirty")
}}var C=[];
if(dojo.isIE){var G=J.outerHTML;
G=G.substr(0,G.indexOf(">"));
G=G.replace(/(?:['"])[^"']*\1/g,"");
var H=/([^\s=]+)=/g;
var K,F;
while((K=H.exec(G))!=undefined){F=K[1];
if(F.substr(0,3)!="_dj"){if(F=="src"||F=="href"){if(J.getAttribute("_djrealurl")){C.push([F,J.getAttribute("_djrealurl")]);
continue
}}if(F=="class"){C.push([F,J.className])
}else{C.push([F,J.getAttribute(F)])
}}}}else{var B,A=0,E=J.attributes;
while((B=E[A++])){if(B.name.substr(0,3)!="_dj"){var D=B.value;
if(B.name=="src"||B.name=="href"){if(J.getAttribute("_djrealurl")){D=J.getAttribute("_djrealurl")
}}C.push([B.name,D])
}}}C.sort(function(M,L){return M[0]<L[0]?-1:(M[0]==L[0]?0:1)
});
A=0;
while((B=C[A++])){I+=" "+B[0]+'="'+B[1]+'"'
}if(J.childNodes.length){I+=">"+this.getNodeChildrenHtml(J)+"</"+J.tagName.toLowerCase()+">"
}else{I+=" />"
}break;
case 3:var I=this.escapeXml(J.nodeValue,true);
break;
case 8:var I="<!--"+this.escapeXml(J.nodeValue,true)+"-->";
break;
default:var I="Element not recognized - Type: "+J.nodeType+" Name: "+J.nodeName
}return I
},getNodeChildrenHtml:function(D){var A="";
if(!D){return A
}var E=D.childNodes||D;
var B=0;
var C;
while((C=E[B++])){A+=this.getNodeHtml(C)
}return A
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
},_onButtonClick:function(C){dojo.stopEvent(C);
var B=this._onClick(C)!==false;
if(this.type=="submit"&&B){for(var D=this.domNode;
D;
D=D.parentNode){var A=dijit.byNode(D);
if(A&&A._onSubmit){A._onSubmit(C);
break
}if(D.tagName.toLowerCase()=="form"){if(!D.onsubmit||D.onsubmit()){D.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var A="";
this.label=this.containerNode.innerHTML;
A=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=A;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(A){return true
},_clicked:function(A){},setLabel:function(C){this.containerNode.innerHTML=this.label=C;
if(dojo.isMozilla){var A=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var B=this;
setTimeout(function(){B.domNode.style.display=A
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
},_onDropDownClick:function(A){var B=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!B||A.detail!=0||this._seenKeydown){this._onArrowClick(A)
}this._seenKeydown=false
},_onDropDownKeydown:function(A){this._seenKeydown=true
},_onDropDownBlur:function(A){this._seenKeydown=false
},_onKey:function(A){if(this.disabled){return 
}if(A.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(A);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var B=this.dropDown;
if(!B){return false
}if(!B.isShowingNow){if(B.href&&!B.isLoaded){var C=this;
var A=dojo.connect(B,"onLoad",function(){dojo.disconnect(A);
C._openDropDown()
});
B._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var D=this.dropDown;
var A=D.domNode.style.width;
var B=this;
dijit.popup.open({parent:this,popup:D,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){B._closeDropDown(true)
},onCancel:function(){B._closeDropDown(true)
},onClose:function(){D.domNode.style.width=A;
B.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>D.domNode.offsetWidth){var C=null;
if(!this.isLeftToRight()){C=D.domNode.parentNode;
var E=C.offsetLeft+C.offsetWidth
}dojo.marginBox(D.domNode,{w:this.domNode.offsetWidth});
if(C){C.style.left=E-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(D.focus){D.focus()
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
dojo.declare("dijit._editor._Plugin",null,{constructor:function(B,A){if(B){dojo.mixin(this,B)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var C=this.editor.commands[this.command];
var B="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var A={label:C,showLabel:false,iconClass:B,dropDown:this.dropDown};
this.button=new this.buttonClass(A)
}}},updateState:function(){var D=this.editor;
var A=this.command;
if(!D){return 
}if(!D.isLoaded){return 
}if(!A.length){return 
}if(this.button){try{var B=D.queryCommandEnabled(A);
this.button.setDisabled(!B);
if(this.button.setChecked){this.button.setChecked(D.queryCommandState(A))
}}catch(C){console.debug(C)
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
},addPlugin:function(C,B){var A=dojo.isString(C)?{name:C}:C;
if(!A.setEditor){var D={args:A,plugin:null,editor:this};
dojo.publish("dijit.Editor.getPlugin",[D]);
if(!D.plugin){var E=dojo.getObject(A.name);
if(E){D.plugin=new E(A)
}}if(!D.plugin){console.debug("Cannot find plugin",C);
return 
}C=D.plugin
}if(arguments.length>1){this._plugins[B]=C
}else{this._plugins.push(C)
}C.setEditor(this);
if(dojo.isFunction(C.setToolbar)){C.setToolbar(this.toolbar)
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
}catch(E){if(dojo.isMoz&&/copy|cut|paste/.test(D)){var B=dojo.string.substitute,F={cut:"X",copy:"C",paste:"V"},A=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(B(this.commands.systemShortcutFF,[this.commands[D],B(this.commands[A?"appleKey":"ctrlKey"],[F[D]])]))
}return false
}}},queryCommandEnabled:function(A){if(this.customUndo&&(A=="undo"||A=="redo")){return A=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(D,C){this.setValue(C.text);
var E=C.bookmark;
if(!E){return 
}if(dojo.isIE){if(dojo.isArray(E)){var A=[];
dojo.forEach(E,function(F){A.push(dijit.range.getNode(F,this.editNode))
},this);
E=A
}}else{var B=dijit.range.create();
B.setStart(dijit.range.getNode(E.startContainer,this.editNode),E.startOffset);
B.setEnd(dijit.range.getNode(E.endContainer,this.editNode),E.endOffset);
E=B
}dojo.withGlobal(this.window,"moveToBookmark",dijit,[E])
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
}},_getBookmark:function(){var B=dojo.withGlobal(this.window,dijit.getBookmark);
if(dojo.isIE){if(dojo.isArray(B)){var A=[];
dojo.forEach(B,function(C){A.push(dijit.range.getIndex(C,this.editNode).o)
},this);
B=A
}}else{var A=dijit.range.getIndex(B.startContainer,this.editNode).o;
B={startContainer:A,startOffset:B.startOffset,endContainer:B.endContainer===B.startContainer?A:dijit.range.getIndex(B.endContainer,this.editNode).o,endOffset:B.endOffset}
}return B
},_beginEditing:function(A){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(A){var B=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:B,bookmark:this._getBookmark()})
},onKeyDown:function(A){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var C=A.keyCode,B=dojo.keys;
if(A.ctrlKey){if(C===90||C===122){dojo.stopEvent(A);
this.undo();
return 
}else{if(C===89||C===121){dojo.stopEvent(A);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(C){case B.ENTER:this.beginEditing();
break;
case B.BACKSPACE:case B.DELETE:this.beginEditing();
break;
case 88:case 86:if(A.ctrlKey&&!A.altKey&&!A.metaKey){this.endEditing();
if(A.keyCode==88){this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1)
}break
}default:if(!A.ctrlKey&&!A.altKey&&!A.metaKey&&(A.keyCode<dojo.keys.F1||A.keyCode>dojo.keys.F15)){this.beginEditing();
break
}case B.ALT:this.endEditing();
break;
case B.UP_ARROW:case B.DOWN_ARROW:case B.LEFT_ARROW:case B.RIGHT_ARROW:case B.HOME:case B.END:case B.PAGE_UP:case B.PAGE_DOWN:this.endEditing(true);
break;
case B.CTRL:case B.SHIFT:case B.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
dojo.subscribe("dijit.Editor.getPlugin",null,function(D){if(D.plugin){return 
}var B=D.args,C;
var E=dijit._editor._Plugin;
var A=B.name;
switch(A){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":C=new E({command:A});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":C=new E({buttonClass:dijit.form.ToggleButton,command:A});
break;
case"|":C=new E({button:new dijit.ToolbarSeparator()});
break;
case"createLink":C=new dijit._editor.plugins.LinkDialog({command:A});
break;
case"foreColor":case"hiliteColor":C=new dijit._editor.plugins.TextColor({command:A});
break;
case"fontName":case"fontSize":case"formatBlock":C=new dijit._editor.plugins.FontChoice({command:A})
}D.plugin=C
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
}},_iframeContentWindow:function(B){var A=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(B))||dijit.Menu._iframeContentDocument(B)["__parent__"]||(B.name&&document.frames[B.name])||null;
return A
},_iframeContentDocument:function(B){var A=B.contentDocument||(B.contentWindow&&B.contentWindow.document)||(B.name&&document.frames[B.name]&&document.frames[B.name].document)||null;
return A
},bindDomNode:function(C){C=dojo.byId(C);
var A=dijit.getDocumentWindow(C.ownerDocument);
if(C.tagName.toLowerCase()=="iframe"){A=this._iframeContentWindow(C);
C=dojo.withGlobal(A,dojo.body)
}var B=(C==dojo.body()?dojo.doc:C);
C[this.id]=this._bindings.push([dojo.connect(B,"oncontextmenu",this,"_openMyself"),dojo.connect(B,"onkeydown",this,"_contextKey"),dojo.connect(B,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(C){var B=dojo.byId(C);
var A=B[this.id]-1,D=this._bindings[A];
dojo.forEach(D,dojo.disconnect);
delete this._bindings[A]
},_contextKey:function(A){this._contextMenuWithMouse=false;
if(A.keyCode==dojo.keys.F10){dojo.stopEvent(A);
if(A.shiftKey&&A.type=="keydown"){var B={target:A.target,pageX:A.pageX,pageY:A.pageY};
B.preventDefault=B.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(B)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(C){dojo.stopEvent(C);
var E,D;
if(dojo.isSafari||this._contextMenuWithMouse){E=C.pageX;
D=C.pageY
}else{var B=dojo.coords(C.target,true);
E=B.x+10;
D=B.y+10
}var G=this;
var F=dijit.getFocus(this);
function A(){dijit.focus(F);
dijit.popup.close(G)
}dijit.popup.open({popup:this,x:E,y:D,onExecute:A,onCancel:A,orient:this.isLeftToRight()?"L":"R"});
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
var A=C.popup;
if(A.isShowingNow){return 
}A.parentMenu=this;
var B=this;
dijit.popup.open({parent:this,popup:A,around:C.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(A);
C.focus();
B.currentPopup=null
}});
this.currentPopup=A;
if(A.focus){A.focus()
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
dojo.regexp.escapeString=function(A,B){return A.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(B&&B.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(A,D,C){if(!(A instanceof Array)){return D(A)
}var E=[];
for(var B=0;
B<A.length;
B++){E.push(D(A[B]))
}return dojo.regexp.group(E.join("|"),C)
};
dojo.regexp.group=function(A,B){return"("+(B?"?:":"")+A+")"
}
}if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.number.format=function(D,B){B=dojo.mixin({},B||{});
var E=dojo.i18n.normalizeLocale(B.locale);
var A=dojo.i18n.getLocalization("dojo.cldr","number",E);
B.customs=A;
var C=B.pattern||A[(B.type||"decimal")+"Format"];
if(isNaN(D)){return null
}return dojo.number._applyPattern(D,C,B)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(B,A,E){E=E||{};
var C=E.customs.group;
var G=E.customs.decimal;
var F=A.split(";");
var D=F[0];
A=F[(B<0)?1:0]||("-"+D);
if(A.indexOf("%")!=-1){B*=100
}else{if(A.indexOf("\u2030")!=-1){B*=1000
}else{if(A.indexOf("\u00a4")!=-1){C=E.customs.currencyGroup||C;
G=E.customs.currencyDecimal||G;
A=A.replace(/\u00a4{1,3}/,function(K){var J=["symbol","currency","displayName"][K.length-1];
return E[J]||E.currency||""
})
}else{if(A.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var I=dojo.number._numberPatternRE;
var H=D.match(I);
if(!H){throw new Error("unable to find a number expression in pattern: "+A)
}return A.replace(I,dojo.number._formatAbsolute(B,H[0],{decimal:G,group:C,places:E.places}))
};
dojo.number.round=function(E,A,F){var D=String(E).split(".");
var C=(D[1]&&D[1].length)||0;
if(C>A){var B=Math.pow(10,A);
if(F>0){B*=10/F;
A++
}E=Math.round(E*B)/B;
D=String(E).split(".");
C=(D[1]&&D[1].length)||0;
if(C>A){D[1]=D[1].substr(0,A);
E=Number(D.join("."))
}}return E
};
dojo.number._formatAbsolute=function(Q,O,E){E=E||{};
if(E.places===true){E.places=0
}if(E.places===Infinity){E.places=6
}var H=O.split(".");
var D=(E.places>=0)?E.places:(H[1]&&H[1].length)||0;
if(!(E.round<0)){Q=dojo.number.round(Q,D,E.round)
}var N=String(Math.abs(Q)).split(".");
var L=N[1]||"";
if(E.places){N[1]=dojo.string.pad(L.substr(0,E.places),E.places,"0",true)
}else{if(H[1]&&E.places!==0){var K=H[1].lastIndexOf("0")+1;
if(K>L.length){N[1]=dojo.string.pad(L,K,"0",true)
}var F=H[1].length;
if(F<L.length){N[1]=L.substr(0,F)
}}else{if(N[1]){N.pop()
}}}var B=H[0].replace(",","");
K=B.indexOf("0");
if(K!=-1){K=B.length-K;
if(K>N[0].length){N[0]=dojo.string.pad(N[0],K)
}if(B.indexOf("#")==-1){N[0]=N[0].substr(N[0].length-K)
}}var M=H[0].lastIndexOf(",");
var A,G;
if(M!=-1){A=H[0].length-M-1;
var C=H[0].substr(0,M);
M=C.lastIndexOf(",");
if(M!=-1){G=C.length-M-1
}}var J=[];
for(var P=N[0];
P;
){var I=P.length-A;
J.push((I>0)?P.substr(I):P);
P=(I>0)?P.slice(0,I):"";
if(G){A=G;
delete G
}}N[0]=J.reverse().join(E.group||",");
return N.join(E.decimal||".")
};
dojo.number.regexp=function(A){return dojo.number._parseInfo(A).regexp
};
dojo.number._parseInfo=function(E){E=E||{};
var B=dojo.i18n.normalizeLocale(E.locale);
var F=dojo.i18n.getLocalization("dojo.cldr","number",B);
var J=E.pattern||F[(E.type||"decimal")+"Format"];
var C=F.group;
var I=F.decimal;
var A=1;
if(J.indexOf("%")!=-1){A/=100
}else{if(J.indexOf("\u2030")!=-1){A/=1000
}else{var H=J.indexOf("\u00a4")!=-1;
if(H){C=F.currencyGroup||C;
I=F.currencyDecimal||I
}}}var G=J.split(";");
if(G.length==1){G.push("-"+G[0])
}var D=dojo.regexp.buildGroupRE(G,function(K){K="(?:"+dojo.regexp.escapeString(K,".")+")";
return K.replace(dojo.number._numberPatternRE,function(O){var L={signed:false,separator:E.strict?C:[C,""],fractional:E.fractional,decimal:I,exponent:false};
var N=O.split(".");
var M=E.places;
if(N.length==1||M===0){L.fractional=false
}else{if(typeof M=="undefined"){M=N[1].lastIndexOf("0")+1
}if(M&&E.fractional==undefined){L.fractional=true
}if(!E.places&&(M<N[1].length)){M+=","+N[1].length
}L.places=M
}var P=N[0].split(",");
if(P.length>1){L.groupSize=P.pop().length;
if(P.length>1){L.groupSize2=P.pop().length
}}return"("+dojo.number._realNumberRegexp(L)+")"
})
},true);
if(H){D=D.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(P,L,M,N){var O=["symbol","currency","displayName"][M.length-1];
var K=dojo.regexp.escapeString(E[O]||E.currency||"");
L=L?"\\s":"";
N=N?"\\s":"";
if(!E.strict){if(L){L+="*"
}if(N){N+="*"
}return"(?:"+L+K+N+")?"
}return L+K+N
})
}return{regexp:D.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:C,decimal:I,factor:A}
};
dojo.number.parse=function(C,E){var B=dojo.number._parseInfo(E);
var A=(new RegExp("^"+B.regexp+"$")).exec(C);
if(!A){return NaN
}var D=A[1];
if(!A[1]){if(!A[2]){return NaN
}D=A[2];
B.factor*=-1
}D=D.replace(new RegExp("["+B.group+"\\s\\xa0]","g"),"").replace(B.decimal,".");
return Number(D)*B.factor
};
dojo.number._realNumberRegexp=function(E){E=E||{};
if(typeof E.places=="undefined"){E.places=Infinity
}if(typeof E.decimal!="string"){E.decimal="."
}if(typeof E.fractional=="undefined"||/^0/.test(E.places)){E.fractional=[true,false]
}if(typeof E.exponent=="undefined"){E.exponent=[true,false]
}if(typeof E.eSigned=="undefined"){E.eSigned=[true,false]
}var A=dojo.number._integerRegexp(E);
var D=dojo.regexp.buildGroupRE(E.fractional,function(F){var G="";
if(F&&(E.places!==0)){G="\\"+E.decimal;
if(E.places==Infinity){G="(?:"+G+"\\d+)?"
}else{G+="\\d{"+E.places+"}"
}}return G
},true);
var B=dojo.regexp.buildGroupRE(E.exponent,function(F){if(F){return"([eE]"+dojo.number._integerRegexp({signed:E.eSigned})+")"
}return""
});
var C=A+D;
if(D){C="(?:(?:"+C+")|(?:"+D+"))"
}return C+B
};
dojo.number._integerRegexp=function(C){C=C||{};
if(typeof C.signed=="undefined"){C.signed=[true,false]
}if(typeof C.separator=="undefined"){C.separator=""
}else{if(typeof C.groupSize=="undefined"){C.groupSize=3
}}var A=dojo.regexp.buildGroupRE(C.signed,function(D){return D?"[-+]":""
},true);
var B=dojo.regexp.buildGroupRE(C.separator,function(G){if(!G){return"(?:0|[1-9]\\d*)"
}G=dojo.regexp.escapeString(G);
if(G==" "){G="\\s"
}else{if(G=="\xa0"){G="\\s\\xa0"
}}var E=C.groupSize,F=C.groupSize2;
if(F){var D="(?:0|[1-9]\\d{0,"+(F-1)+"}(?:["+G+"]\\d{"+F+"})*["+G+"]\\d{"+E+"})";
return((E-F)>0)?"(?:"+D+"|(?:0|[1-9]\\d{0,"+(E-1)+"}))":D
}return"(?:0|[1-9]\\d{0,"+(E-1)+"}(?:["+G+"]\\d{"+E+"})*)"
},true);
return A+B
}
}if(!dojo._hasResource["dijit.ProgressBar"]){dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(D){dojo.mixin(this,D||{});
var A=1,B;
if(this.indeterminate){B="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{B="removeClass";
if(String(this.progress).indexOf("%")!=-1){A=Math.min(parseFloat(this.progress)/100,1);
this.progress=A*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
A=this.progress/this.maximum
}var C=this.report(A);
this.label.firstChild.nodeValue=C;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}dojo[B](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(A*100)+"%";
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
var A=this.hideNode,B=this.wipeNode;
this._wipeIn=dojo.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){A.style.display=""
}});
this._wipeOut=dojo.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){A.style.display="none"
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
},show:function(C,D){if(this.aroundNode&&this.aroundNode===D){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=C;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var B=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var A=dijit.placeOnScreenAroundElement(this.domNode,D,B);
this.domNode.className="dijitTooltip dijitTooltip"+(A.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=D
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
dijit.showTooltip=function(A,B){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(A,B)
};
dijit.hideTooltip=function(A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(A)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(A){var B=dojo.byId(A);
if(B){this._connectNodes.push(B);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(C){this.connect(B,C.toLowerCase(),"_"+C)
},this);
if(dojo.isIE){B.style.zoom=1
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
dojo.cookie=function(F,H,G){var C=document.cookie;
if(arguments.length==1){var D=C.lastIndexOf(F+"=");
if(D==-1){return null
}var B=D+F.length+1;
var E=C.indexOf(";",D+F.length+1);
if(E==-1){E=C.length
}return decodeURIComponent(C.substring(B,E))
}else{G=G||{};
H=encodeURIComponent(H);
if(typeof (G.expires)=="number"){var A=new Date();
A.setTime(A.getTime()+(G.expires*24*60*60*1000));
G.expires=A
}document.cookie=F+"="+H+(G.expires?"; expires="+G.expires.toUTCString():"")+(G.path?"; path="+G.path:"")+(G.domain?"; domain="+G.domain:"")+(G.secure?"; secure":"");
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
}},_setExpando:function(B){var A=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var C=B?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.forEach(A,function(D){dojo.removeClass(this.expandoNode,D)
},this);
dojo.addClass(this.expandoNode,A[C]);
this.expandoNodeText.innerHTML=B?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
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
},_setChildren:function(C){this.destroyDescendants();
this.state="LOADED";
var B={};
if(C&&C.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}dojo.forEach(C,function(G){var E=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(G.item)},G));
this.addChild(E);
var F=this.tree.store.getIdentity(G.item);
B[F]=E;
if(this.tree.persist){if(this.tree._openedItemIds[F]){this.tree._expandNode(E)
}}},this);
dojo.forEach(this.getChildren(),function(E,F){E._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var A=this.getChildren()[0];
var D=A?A.labelNode:this.domNode;
D.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return B
},_addChildren:function(A){var B={};
if(A&&A.length>0){dojo.forEach(A,function(D){var C=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(D.item)},D));
this.addChild(C);
B[this.tree.store.getIdentity(D.item)]=C
},this);
dojo.forEach(this.getChildren(),function(C,D){C._updateLayout()
})
}return B
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
}},postCreate:function(){if(this.persist){var A=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(A){dojo.forEach(A.split(","),function(E){this._openedItemIds[E]=true
},this)
}}var C=document.createElement("div");
C.style.display="none";
C.className="dijitTreeContainer";
dijit.setWaiRole(C,"presentation");
this.containerNodeTemplate=C;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(dojo.isString(this.dndController)){this.dndController=dojo.getObject(this.dndController)
}var B={};
for(var D=0;
D<this.dndParams.length;
D++){if(this[this.dndParams[D]]){B[this.dndParams[D]]=this[this.dndParams[D]]
}}this.dndController=new this.dndController(this,B)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(A){return dojo.some(this.childrenAttr,function(B){return this.store.hasAttribute(A,B)
},this)
},getItemChildren:function(F,C){var G=this.store;
if(F==null){G.fetch({query:this.query,onComplete:C})
}else{var D=[];
for(var B=0;
B<this.childrenAttr.length;
B++){D=D.concat(G.getValues(F,this.childrenAttr[B]))
}var E=0;
dojo.forEach(D,function(H){if(!G.isItemLoaded(H)){E++
}});
if(E==0){C(D)
}else{function A(H){if(--E==0){C(D)
}}dojo.forEach(D,function(H){if(!G.isItemLoaded(H)){G.loadItem({item:H,onItem:A})
}})
}}},getItemParentIdentity:function(A,B){return this.store.getIdentity(B.item)
},getLabel:function(A){return this.store.getLabel(A)
},getIconClass:function(A){},getLabelClass:function(A){},_onLoadAllItems:function(A,C){var B=dojo.map(C,function(D){return{item:D,isExpandable:this.mayHaveChildren(D)}
},this);
dojo.mixin(this._itemNodeMap,A._setChildren(B));
this._expandNode(A)
},_onKeyPress:function(B){if(B.altKey){return 
}var D=dijit.getEnclosingWidget(B.target);
if(!D){return 
}if(B.charCode){var C=B.charCode;
if(!B.altKey&&!B.ctrlKey&&!B.shiftKey&&!B.metaKey){C=(String.fromCharCode(C)).toLowerCase();
this._onLetterKeyNav({node:D,key:C});
dojo.stopEvent(B)
}}else{var A=this._keyHandlerMap;
if(!A){A={};
A[dojo.keys.ENTER]="_onEnterKey";
A[dojo.keys.LEFT_ARROW]="_onLeftArrow";
A[dojo.keys.RIGHT_ARROW]="_onRightArrow";
A[dojo.keys.UP_ARROW]="_onUpArrow";
A[dojo.keys.DOWN_ARROW]="_onDownArrow";
A[dojo.keys.HOME]="_onHomeKey";
A[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=A
}if(this._keyHandlerMap[B.keyCode]){this[this._keyHandlerMap[B.keyCode]]({node:D,item:D.item});
dojo.stopEvent(B)
}}},_onEnterKey:function(A){this._publish("execute",{item:A.item,node:A.node});
this.onClick(A.item,A.node)
},_onDownArrow:function(A){var B=this._navToNextNode(A.node);
if(B&&B.isTreeNode){B.tree.focusNode(B);
return B
}},_onUpArrow:function(E){var F=E.node;
var C=F;
var D=F.getPreviousSibling();
if(D){F=D;
while(F.isExpandable&&F.isExpanded&&F.hasChildren()){C=F;
var A=F.getChildren();
F=A[A.length-1]
}}else{var B=F.getParent();
if(!(this._hideRoot&&B===this)){F=B
}}if(F&&F.isTreeNode){C=F
}if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onRightArrow:function(B){var C=B.node;
var A=C;
if(C.isExpandable&&!C.isExpanded){this._expandNode(C)
}else{if(C.hasChildren()){C=C.getChildren()[0]
}}if(C&&C.isTreeNode){A=C
}if(A&&A.isTreeNode){A.tree.focusNode(A);
return A
}},_onLeftArrow:function(B){var A=B.node;
var C=A;
if(A.isExpandable&&A.isExpanded){this._collapseNode(A)
}else{A=A.getParent()
}if(A&&A.isTreeNode){C=A
}if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onHomeKey:function(){var A=this._navToRootOrFirstNode();
if(A){A.tree.focusNode(A);
return A
}},_onEndKey:function(B){var D=B.node.tree;
var A=D;
while(A.isExpanded){var C=A.getChildren();
A=C[C.length-1];
if(A.isTreeNode){D=A
}}if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onLetterKeyNav:function(B){var A=startNode=B.node;
var C=B.key;
do{A=this._navToNextNode(A);
if(!A){A=this._navToRootOrFirstNode()
}}while(A!==startNode&&(A.label.charAt(0).toLowerCase()!=C));
if(A&&A.isTreeNode){if(A!==startNode){A.tree.focusNode(A)
}return A
}},_onClick:function(A){var B=A.target;
var C=dijit.getEnclosingWidget(B);
if(!C||!C.isTreeNode){return 
}if(B==C.expandoNode||B==C.expandoNodeText){if(C.isExpandable){this._onExpandoClick({node:C})
}}else{this._publish("execute",{item:C.item,node:C});
this.onClick(C.item,C);
this.focusNode(C)
}dojo.stopEvent(A)
},_onExpandoClick:function(A){var B=A.node;
if(B.isExpanded){this._collapseNode(B)
}else{this._expandNode(B)
}},onClick:function(A,B){},_navToNextNode:function(A){var B;
if(A.isExpandable&&A.isExpanded&&A.hasChildren()){B=A.getChildren()[0]
}else{while(A&&A.isTreeNode){B=A.getNextSibling();
if(B){break
}A=A.getParent()
}}return B
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
}var A=this.store;
var F=this.store.getValue;
switch(C.state){case"LOADING":return ;
case"UNCHECKED":C.markProcessing();
var E=this;
var D=function(G){C.unmarkProcessing();
E._onLoadAllItems(C,G)
};
this.getItemChildren(C.item,D);
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
}},_onTreeFocus:function(C){var B=dijit.getEnclosingWidget(C.target);
if(B!=this.lastFocused){this.blurNode()
}var A=B.labelNode;
A.setAttribute("tabIndex","0");
dojo.addClass(A,"dijitTreeLabelFocused");
this.lastFocused=B
},_onNewItem:function(C,F){var D;
if(F){var B=this._itemNodeMap[this.getItemParentIdentity(C,F)];
if(!B||dojo.indexOf(this.childrenAttr,F.attribute)==-1){return 
}}var E={item:C,isExpandable:this.mayHaveChildren(C)};
if(B){if(!B.isExpandable){B.makeExpandable()
}if(B.state=="LOADED"||B.isExpanded){var A=B._addChildren([E])
}}else{var A=this._addChildren([E])
}if(A){dojo.mixin(this._itemNodeMap,A)
}},_onDeleteItem:function(C){var D=this.store.getIdentity(C);
var B=this._itemNodeMap[D];
if(B){var A=B.getParent();
A.deleteNode(B);
this._itemNodeMap[D]=null
}},_onSetItem:function(A){var B=this.store.getIdentity(A);
node=this._itemNodeMap[B];
if(node){node.setLabelNode(this.getLabel(A));
node._updateItemClasses(A)
}},_saveState:function(){if(!this.persist){return 
}var B=[];
for(var A in this._openedItemIds){B.push(A)
}dojo.cookie(this.cookieName,B.join(","))
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(C,B,A){var D=this.filter(C);
if((typeof D==typeof C)&&(A==null||A==undefined)){A=this.format(D,this.constraints)
}if(A!=null&&A!=undefined){this.textbox.value=A
}dijit.form.TextBox.superclass.setValue.call(this,D,B)
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
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var A=this.domNode;
var B=A.style.opacity;
A.style.opacity="0.999";
setTimeout(function(){A.style.opacity=B
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
var A=this.editWidget.domNode.style;
A.position="absolute";
A.visibility="hidden";
this.domNode=this.displayNode;
var B=this;
setTimeout(function(){if(C){dijit.focus(B.displayNode)
}B.editWidget.destroy();
delete B.editWidget
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
},postCreate:function(){var C=dojo.getObject(this.editor);
var B=this.editWidget=new C(this.editorParams,this.editorPlaceholder);
var A=this.style;
dojo.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(D){B.focusNode.style[D]=A[D]
},this);
dojo.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(D){this.domNode.style[D]=A[D]
},this);
if(this.width=="100%"){B.domNode.style.width="100%";
this.domNode.style.display="block"
}else{B.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var A=this.editWidget;
return A.getDisplayedValue?A.getDisplayedValue():A.getValue()
},_onKeyPress:function(B){if(this._exitInProgress){return 
}if(this.autoSave){if(B.keyCode==dojo.keys.ESCAPE){dojo.stopEvent(B);
this._exitInProgress=true;
this.cancel(true)
}else{if(B.keyCode==dojo.keys.ENTER){dojo.stopEvent(B);
this._exitInProgress=true;
this.save(true)
}}}else{var A=this;
setTimeout(function(){A.saveButton.setDisabled(A.getValue()==A._initialText)
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
dijit.selectInputText=function(B){var D=dojo.global;
var E=dojo.doc;
B=dojo.byId(B);
if(E.selection&&dojo.body()["createTextRange"]){if(B.createTextRange){var A=B.createTextRange();
A.moveStart("character",0);
A.moveEnd("character",B.value.length);
A.select()
}}else{if(D.getSelection){var C=D.getSelection();
if(B.setSelectionRange){B.setSelectionRange(0,B.value.length)
}}}B.focus()
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
},uninitialize:function(){dojo.forEach(this._groups[this.name],function(B,A,C){if(B===this){C.splice(A,1);
return 
}},this)
},setChecked:function(A){if(A){dojo.forEach(this._groups[this.name],function(B){if(B!=this&&B.checked){B.setChecked(false)
}},this)
}this.inherited(arguments)
},_clicked:function(A){if(!this.checked){this.setChecked(true)
}}})
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(C,A){var E="^";
var D=null;
for(var B=0;
B<C.length;
B++){D=C.charAt(B);
switch(D){case"\\":E+=D;
B++;
E+=C.charAt(B);
break;
case"*":E+=".*";
break;
case"?":E+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":E+="\\";
default:E+=D
}}E+="$";
if(A){return new RegExp(E,"i")
}else{return new RegExp(E)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(A,C){var B=0;
if(A>C||typeof A==="undefined"||A===null){B=1
}else{if(A<C||typeof C==="undefined"||C===null){B=-1
}}return B
};
dojo.data.util.sorter.createSortFunction=function(C,A){var E=[];
function F(H,G){return function(M,L){var K=A.getValue(M,H);
var I=A.getValue(L,H);
var J=null;
if(A.comparatorMap){if(typeof H!=="string"){H=A.getIdentity(H)
}J=A.comparatorMap[H]||dojo.data.util.sorter.basicComparator
}J=J||dojo.data.util.sorter.basicComparator;
return G*J(K,I)
}
}for(var B=0;
B<C.length;
B++){sortAttribute=C[B];
if(sortAttribute.attribute){var D=(sortAttribute.descending)?-1:1;
E.push(F(sortAttribute.attribute,D))
}}return function(I,H){var G=0;
while(G<E.length){var J=E[G++](I,H);
if(J!==0){return J
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(C){C=C||{};
if(!C.store){C.store=this
}var A=this;
var B=function(E,F){if(F.onError){var G=F.scope||dojo.global;
F.onError.call(G,E,F)
}};
var D=function(M,N){var G=N.abort||null;
var I=false;
var E=N.start?N.start:0;
var L=N.count?(E+N.count):M.length;
N.abort=function(){I=true;
if(G){G.call(N)
}};
var H=N.scope||dojo.global;
if(!N.store){N.store=A
}if(N.onBegin){N.onBegin.call(H,M.length,N)
}if(N.sort){M.sort(dojo.data.util.sorter.createSortFunction(N.sort,A))
}if(N.onItem){for(var K=E;
(K<M.length)&&(K<L);
++K){var F=M[K];
if(!I){N.onItem.call(H,F,N)
}}}if(N.onComplete&&!I){var J=null;
if(!N.onItem){J=M.slice(E,L)
}N.onComplete.call(H,J,N)
}};
this._fetchItems(C,D,B);
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
}},getValue:function(C,B,D){var A=this.getValues(C,B);
return(A.length>0)?A[0]:D
},getValues:function(A,B){this._assertIsItem(A);
this._assertIsAttribute(B);
return A[B]||[]
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var A in B){if((A!==this._storeRefPropName)&&(A!==this._itemNumPropName)&&(A!==this._rootItemPropName)){C.push(A)
}}return C
},hasAttribute:function(A,B){return this.getValues(A,B).length>0
},containsValue:function(A,D,C){var B=undefined;
if(typeof C==="string"){B=dojo.data.util.filter.patternToRegExp(C,false)
}return this._containsValue(A,D,C,B)
},_containsValue:function(A,D,C,B){return dojo.some(this.getValues(A,D),function(E){if(E!==null&&!dojo.isObject(E)&&B){if(E.toString().match(B)){return true
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
},_fetchItems:function(F,C,E){var D=this;
var G=function(P,S){var R=[];
if(P.query){var Q=P.queryOptions?P.queryOptions.ignoreCase:false;
var J={};
for(var K in P.query){var I=P.query[K];
if(typeof I==="string"){J[K]=dojo.data.util.filter.patternToRegExp(I,Q)
}}for(var N=0;
N<S.length;
++N){var O=true;
var M=S[N];
if(M===null){O=false
}else{for(var K in P.query){var I=P.query[K];
if(!D._containsValue(M,K,I,J[K])){O=false
}}}if(O){R.push(M)
}}C(R,P)
}else{for(var N=0;
N<S.length;
++N){var L=S[N];
if(L!==null){R.push(L)
}}C(R,P)
}};
if(this._loadFinished){G(F,this._getItemsArray(F.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:F,filter:G})
}else{this._loadInProgress=true;
var A={url:D._jsonFileUrl,handleAs:"json-comment-optional"};
var H=dojo.xhrGet(A);
H.addCallback(function(J){try{D._getItemsFromLoadedData(J);
D._loadFinished=true;
D._loadInProgress=false;
G(F,D._getItemsArray(F.queryOptions));
D._handleQueuedFetches()
}catch(I){D._loadFinished=true;
D._loadInProgress=false;
E(I,F)
}});
H.addErrback(function(I){D._loadInProgress=false;
E(I,F)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
G(F,this._getItemsArray(F.queryOptions))
}catch(B){E(B,F)
}}else{E(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),F)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var B=0;
B<this._queuedFetches.length;
B++){var D=this._queuedFetches[B];
var A=D.args;
var C=D.filter;
if(C){C(A,this._getItemsArray(A.queryOptions))
}else{this.fetchItemByIdentity(A)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(K){function H(V){var U=((V!=null)&&(typeof V=="object")&&(!dojo.isArray(V))&&(!dojo.isFunction(V))&&(V.constructor==Object)&&(typeof V._reference=="undefined")&&(typeof V._type=="undefined")&&(typeof V._value=="undefined"));
return U
}var P=this;
function D(X){P._arrayOfAllItems.push(X);
for(var W in X){var V=X[W];
if(V){if(dojo.isArray(V)){var U=V;
for(var Z=0;
Z<U.length;
++Z){var Y=U[Z];
if(H(Y)){D(Y)
}}}else{if(H(V)){D(V)
}}}}}this._labelAttr=K.label;
var A;
var C;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=K.items;
for(A=0;
A<this._arrayOfTopLevelItems.length;
++A){C=this._arrayOfTopLevelItems[A];
D(C);
C[this._rootItemPropName]=true
}var R={};
var E;
for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
for(E in C){if(E!==this._rootItemPropName){var Q=C[E];
if(Q!==null){if(!dojo.isArray(Q)){C[E]=[Q]
}}else{C[E]=[null]
}}R[E]=E
}}while(R[this._storeRefPropName]){this._storeRefPropName+="_"
}while(R[this._itemNumPropName]){this._itemNumPropName+="_"
}var N;
var J=K.identifier;
if(J){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=J;
for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
N=C[J];
var F=N[0];
if(!this._itemsByIdentity[F]){this._itemsByIdentity[F]=C
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+F+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+F+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
C[this._storeRefPropName]=this;
C[this._itemNumPropName]=A
}for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
for(E in C){N=C[E];
for(var T=0;
T<N.length;
++T){Q=N[T];
if(Q!==null&&typeof Q=="object"){if(Q._type&&Q._value){var L=Q._type;
var M=this._datatypeMap[L];
if(!M){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+L+"'")
}else{if(dojo.isFunction(M)){N[T]=new M(Q._value)
}else{if(dojo.isFunction(M.deserialize)){N[T]=M.deserialize(Q._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(Q._reference){var G=Q._reference;
if(dojo.isString(G)){N[T]=this._itemsByIdentity[G]
}else{for(var S=0;
S<this._arrayOfAllItems.length;
++S){var I=this._arrayOfAllItems[S];
var O=true;
for(var B in G){if(I[B]!=G[B]){O=false
}}if(O){N[T]=I
}}}}}}}}},getIdentity:function(A){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return A[this._itemNumPropName]
}else{var B=A[C];
if(B){return B[0]
}}return null
},fetchItemByIdentity:function(A){if(!this._loadFinished){var F=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:A})
}else{this._loadInProgress=true;
var E={url:F._jsonFileUrl,handleAs:"json-comment-optional"};
var D=dojo.xhrGet(E);
D.addCallback(function(G){var I=A.scope?A.scope:dojo.global;
try{F._getItemsFromLoadedData(G);
F._loadFinished=true;
F._loadInProgress=false;
var J=F._getItemByIdentity(A.identity);
if(A.onItem){A.onItem.call(I,J)
}F._handleQueuedFetches()
}catch(H){F._loadInProgress=false;
if(A.onError){A.onError.call(I,H)
}}});
D.addErrback(function(H){F._loadInProgress=false;
if(A.onError){var G=A.scope?A.scope:dojo.global;
A.onError.call(G,H)
}})
}}else{if(this._jsonData){F._getItemsFromLoadedData(F._jsonData);
F._jsonData=null;
F._loadFinished=true;
var C=F._getItemByIdentity(A.identity);
if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}}}else{var C=this._getItemByIdentity(A.identity);
if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}},_getItemByIdentity:function(B){var A=null;
if(this._itemsByIdentity){A=this._itemsByIdentity[B]
}else{A=this._arrayOfAllItems[B]
}if(A===undefined){A=null
}return A
},getIdentityAttributes:function(A){var B=this._features["dojo.data.api.Identity"];
if(B===Number){return null
}else{return[B]
}},_forceLoad:function(){var C=this;
if(this._jsonFileUrl){var B={url:C._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var A=dojo.xhrGet(B);
A.addCallback(function(E){try{if(C._loadInProgress!==true&&!C._loadFinished){C._getItemsFromLoadedData(E);
C._loadFinished=true
}}catch(D){console.log(D);
throw D
}});
A.addErrback(function(D){throw D
})
}else{if(this._jsonData){C._getItemsFromLoadedData(C._jsonData);
C._jsonData=null;
C._loadFinished=true
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
},validate:function(D){var A="";
var B=this.isValid(D);
var C=this._isEmpty(this.textbox.value);
this.state=(B||(!this._hasBeenBlurred&&C))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(B?"false":"true"));
if(D){if(C){A=this.getPromptMessage(true)
}if(!A&&!B){A=this.getErrorMessage(true)
}}this._displayMessage(A)
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
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(A,B){return(A.toString?A.toString():"")
},toString:function(){var A=this.filter(this.getValue());
return(A!=null)?((typeof A=="string")?A:this.serialize(A,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var A=this.textbox;
var B=(this.valueNode=document.createElement("input"));
B.setAttribute("type",A.type);
B.setAttribute("value",this.toString());
dojo.style(B,"display","none");
B.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(B,A,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(A,B){return A-B
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
}}}},_setCaretPos:function(A,B){B=parseInt(B);
this._setSelectedRange(A,B,B)
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
}}}},onkeypress:function(D){if(D.altKey||(D.ctrlKey&&D.charCode!=118)){return 
}var B=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(D)
}switch(D.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
B=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(D);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(D);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var C;
if(this._isShowingNow&&(C=this._popupWidget.getHighlightedOption())){if(C==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(D);
break
}else{if(C==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(D);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}D.preventDefault();
case dojo.keys.TAB:var A=this.getDisplayedValue();
if(this._popupWidget&&(A==this._popupWidget._messages.previousMessage||A==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(D);
this._selectOption();
this._hideResultList()
}else{B=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(D)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
B=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||D.charCode!=0){B=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(B){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(B){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(B))){var A=this._getCaretPos(this.focusNode);
if((A+1)>this.focusNode.value.length){this.focusNode.value=B;
this._setSelectedRange(this.focusNode,A,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",B)
}}else{this.focusNode.value=B;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",B)
}},_openResultList:function(C,A){if(this.disabled||A.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!C.length){this._hideResultList();
return 
}var B=new String(this.store.getValue(C[0],this.searchAttr));
if(B&&this.autoComplete&&!this._prev_key_backspace&&(A.query[this.searchAttr]!="*")){this._autoCompleteText(B);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",B)
}this._popupWidget.createOptions(C,A,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(A.direction){if(A.direction==1){this._popupWidget.highlightFirstOption()
}else{if(A.direction==-1){this._popupWidget.highlightLastOption()
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
},_announceOption:function(B){if(B==null){return 
}var A;
if(B==this._popupWidget.nextButton||B==this._popupWidget.previousButton){A=B.innerHTML
}else{A=this.store.getValue(B.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(A)
},_selectOption:function(B){var A=null;
if(!B){B={target:this._popupWidget.getHighlightedOption()}
}if(!B.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{A=B.target
}if(!B.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(A.item,this.searchAttr).length)
}this._doSelect(A)
},_doSelect:function(A){this.item=A.item;
this.setValue(this.store.getValue(A.item,this.searchAttr),true)
},_onArrowMouseDown:function(A){if(this.disabled){return 
}dojo.stopEvent(A);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(D){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var B=this.query;
this._lastQuery=B[this.searchAttr]=D+"*";
var A=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:B,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function C(F,E){F.start+=F.count*E;
F.direction=E;
F.store.fetch(F)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,C,A)
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
},_createOption:function(B,A){var D=A(B);
var C=document.createElement("div");
if(D.html){C.innerHTML=D.label
}else{C.appendChild(document.createTextNode(D.label))
}if(C.innerHTML==""){C.innerHTML="&nbsp;"
}C.item=B;
return C
},createOptions:function(A,B,D){this.previousButton.style.display=B.start==0?"none":"";
var C=this;
dojo.forEach(A,function(F){var E=C._createOption(F,D);
E.className="dijitMenuItem";
C.domNode.insertBefore(E,C.nextButton)
});
this.nextButton.style.display=B.count==A.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(A){dojo.stopEvent(A)
},onmouseup:function(B){if(B.target===this.domNode){return 
}else{if(B.target==this.previousButton){this.onPage(-1)
}else{if(B.target==this.nextButton){this.onPage(1)
}else{var A=B.target;
while(!A.item){A=A.parentNode
}this.setValue({target:A},true)
}}}},onmouseover:function(B){if(B.target===this.domNode){return 
}var A=B.target;
if(!(A==this.previousButton||A==this.nextButton)){while(!A.item){A=A.parentNode
}}this._focusOptionNode(A)
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
},_page:function(A){var D=0;
var B=this.domNode.scrollTop;
var E=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(D<E){if(A){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var C=this.domNode.scrollTop;
D+=(C-B)*(A?-1:1);
B=C
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
dojo.cldr.monetary.getData=function(C){var D={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var B={CHF:5};
var A=D[C],E=B[C];
if(typeof A=="undefined"){A=2
}if(typeof E=="undefined"){E=0
}return{places:A,round:E}
}
}if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.currency._mixInDefaults=function(A){A=A||{};
A.type="currency";
var D=dojo.i18n.getLocalization("dojo.cldr","currency",A.locale)||{};
var B=A.currency;
var C=dojo.cldr.monetary.getData(B);
dojo.forEach(["displayName","symbol","group","decimal"],function(E){C[E]=D[B+"_"+E]
});
C.fractional=[true,false];
return dojo.mixin(C,A)
};
dojo.currency.format=function(A,B){return dojo.number.format(A,dojo.currency._mixInDefaults(B))
};
dojo.currency.regexp=function(A){return dojo.number.regexp(dojo.currency._mixInDefaults(A))
};
dojo.currency.parse=function(A,B){return dojo.number.parse(A,dojo.currency._mixInDefaults(B))
}
}if(!dojo._hasResource["dijit.form.NumberTextBox"]){dojo._hasResource["dijit.form.NumberTextBox"]=true;
dojo.provide("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,format:function(B,A){if(isNaN(B)){return""
}return dojo.number.format(B,A)
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
dojo.cldr.supplemental.getFirstDayOfWeek=function(D){var A={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var B=dojo.cldr.supplemental._region(D);
var C=A[B];
return(typeof C=="undefined")?1:C
};
dojo.cldr.supplemental._region=function(C){C=dojo.i18n.normalizeLocale(C);
var A=C.split("-");
var B=A[1];
if(!B){B={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[A[0]]
}else{if(B.length==4){B=A[2]
}}return B
};
dojo.cldr.supplemental.getWeekend=function(A){var C={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var F={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var D=dojo.cldr.supplemental._region(A);
var E=C[D];
var B=F[D];
if(typeof E=="undefined"){E=6
}if(typeof B=="undefined"){B=0
}return{start:E,end:B}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(C){var A=C.getMonth();
var B=[31,28,31,30,31,30,31,31,30,31,30,31];
if(A==1&&dojo.date.isLeapYear(C)){return 29
}return B[A]
};
dojo.date.isLeapYear=function(A){var B=A.getFullYear();
return !(B%400)||(!(B%4)&&!!(B%100))
};
dojo.date.getTimezoneName=function(B){var C=B.toString();
var E="";
var A;
var D=C.indexOf("(");
if(D>-1){E=C.substring(++D,C.indexOf(")"))
}else{var F=/([A-Z\/]+) \d{4}$/;
if((A=C.match(F))){E=A[1]
}else{C=B.toLocaleString();
F=/ ([A-Z\/]+)$/;
if((A=C.match(F))){E=A[1]
}}}return(E=="AM"||E=="PM")?"":E
};
dojo.date.compare=function(B,A,C){B=new Date(Number(B));
A=new Date(Number(A||new Date()));
if(typeof C!=="undefined"){if(C=="date"){B.setHours(0,0,0,0);
A.setHours(0,0,0,0)
}else{if(C=="time"){B.setFullYear(0,0,0);
A.setFullYear(0,0,0)
}}}if(B>A){return 1
}if(B<A){return -1
}return 0
};
dojo.date.add=function(L,K,A){var C=new Date(Number(L));
var J=false;
var G="Date";
switch(K){case"day":break;
case"weekday":var H,I;
var E=0;
var F=A%5;
if(!F){H=(A>0)?5:-5;
I=(A>0)?((A-5)/5):((A+5)/5)
}else{H=F;
I=parseInt(A/5)
}var B=L.getDay();
if(B==6&&A>0){E=1
}else{if(B==0&&A<0){E=-1
}}var D=B+H;
if(D==0||D==6){E=(A>0)?2:-2
}A=7*I+H+E;
break;
case"year":G="FullYear";
J=true;
break;
case"week":A*=7;
break;
case"quarter":A*=3;
case"month":J=true;
G="Month";
break;
case"hour":case"minute":case"second":case"millisecond":G="UTC"+K.charAt(0).toUpperCase()+K.substring(1)+"s"
}if(G){C["set"+G](C["get"+G]()+A)
}if(J&&(C.getDate()<L.getDate())){C.setDate(0)
}return C
};
dojo.date.difference=function(D,B,J){B=B||new Date();
J=J||"day";
var H=B.getFullYear()-D.getFullYear();
var Q=1;
switch(J){case"quarter":var E=D.getMonth();
var C=B.getMonth();
var N=Math.floor(E/3)+1;
var M=Math.floor(C/3)+1;
M+=(H*4);
Q=M-N;
break;
case"weekday":var A=Math.round(dojo.date.difference(D,B,"day"));
var F=parseInt(dojo.date.difference(D,B,"week"));
var P=A%7;
if(P==0){A=F*5
}else{var O=0;
var L=D.getDay();
var I=B.getDay();
F=parseInt(A/7);
P=A%7;
var K=new Date(D);
K.setDate(K.getDate()+(F*7));
var G=K.getDay();
if(A>0){switch(true){case L==6:O=-1;
break;
case L==0:O=0;
break;
case I==6:O=-1;
break;
case I==0:O=-2;
break;
case (G+P)>5:O=-2
}}else{if(A<0){switch(true){case L==6:O=0;
break;
case L==0:O=1;
break;
case I==6:O=2;
break;
case I==0:O=1;
break;
case (G+P)<0:O=2
}}}A+=O;
A-=(F*2)
}Q=A;
break;
case"year":Q=H;
break;
case"month":Q=(B.getMonth()-D.getMonth())+(H*12);
break;
case"week":Q=parseInt(dojo.date.difference(D,B,"day")/7);
break;
case"day":Q/=24;
case"hour":Q/=60;
case"minute":Q/=60;
case"second":Q/=1000;
case"millisecond":Q*=B.getTime()-D.getTime()
}return Math.round(Q)
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function A(F,E,D){return D.replace(/([a-z])\1*/ig,function(V){var J;
var H=V.charAt(0);
var Q=V.length;
var N;
var O=["abbr","wide","narrow"];
switch(H){case"G":J=E[(Q<4)?"eraAbbr":"eraNames"][F.getFullYear()<0?0:1];
break;
case"y":J=F.getFullYear();
switch(Q){case 1:break;
case 2:J=String(J);
J=J.substr(J.length-2);
break;
default:N=true
}break;
case"Q":case"q":J=Math.ceil((F.getMonth()+1)/3);
N=true;
break;
case"M":case"L":var P=F.getMonth();
var L;
switch(Q){case 1:case 2:J=P+1;
N=true;
break;
case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var G=(H=="L")?"standalone":"format";
var K=["months",G,L].join("-");
J=E[K][P]
}break;
case"w":var I=0;
J=dojo.date.locale._getWeekOfYear(F,I);
N=true;
break;
case"d":J=F.getDate();
N=true;
break;
case"D":J=dojo.date.locale._getDayOfYear(F);
N=true;
break;
case"E":case"e":case"c":var W=F.getDay();
var L;
switch(Q){case 1:case 2:if(H=="e"){var U=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
W=(W-U+7)%7
}if(H!="c"){J=W+1;
N=true;
break
}case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var G=(H=="c")?"standalone":"format";
var K=["days",G,L].join("-");
J=E[K][W]
}break;
case"a":var M=(F.getHours()<12)?"am":"pm";
J=E[M];
break;
case"h":case"H":case"K":case"k":var T=F.getHours();
switch(H){case"h":J=(T%12)||12;
break;
case"H":J=T;
break;
case"K":J=(T%12);
break;
case"k":J=T||24;
break
}N=true;
break;
case"m":J=F.getMinutes();
N=true;
break;
case"s":J=F.getSeconds();
N=true;
break;
case"S":J=Math.round(F.getMilliseconds()*Math.pow(10,Q-3));
break;
case"v":case"z":J=dojo.date.getTimezoneName(F);
if(J){break
}Q=4;
case"Z":var S=F.getTimezoneOffset();
var R=[(S<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(S)/60),2),dojo.string.pad(Math.abs(S)%60,2)];
if(Q==4){R.splice(0,0,"GMT");
R.splice(3,0,":")
}J=R.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+D)
}if(N){J=dojo.string.pad(J,Q)
}return J
})
}dojo.date.locale.format=function(H,N){N=N||{};
var K=dojo.i18n.normalizeLocale(N.locale);
var D=N.formatLength||"short";
var E=dojo.date.locale._getGregorianBundle(K);
var I=[];
var G=dojo.hitch(this,A,H,E);
if(N.selector=="year"){var J=H.getFullYear();
if(K.match(/^zh|^ja/)){J+="\u5E74"
}return J
}if(N.selector!="time"){var F=N.datePattern||E["dateFormat-"+D];
if(F){I.push(B(F,G))
}}if(N.selector!="date"){var M=N.timePattern||E["timeFormat-"+D];
if(M){I.push(B(M,G))
}}var L=I.join(" ");
return L
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(K){K=K||{};
var I=dojo.i18n.normalizeLocale(K.locale);
var D=dojo.date.locale._getGregorianBundle(I);
var L=K.formatLength||"short";
var F=K.datePattern||D["dateFormat-"+L];
var E=K.timePattern||D["timeFormat-"+L];
var G;
if(K.selector=="date"){G=F
}else{if(K.selector=="time"){G=E
}else{G=F+" "+E
}}var H=[];
var J=B(G,dojo.hitch(this,C,H,D,K));
return{regexp:J,tokens:H,bundle:D}
};
dojo.date.locale.parse=function(M,D){var G=dojo.date.locale._parseInfo(D);
var J=G.tokens,E=G.bundle;
var N=new RegExp("^"+G.regexp+"$");
var H=N.exec(M);
if(!H){return null
}var F=["abbr","wide","narrow"];
var O=new Date(1972,0);
var I={};
var L="";
dojo.forEach(H,function(Q,Y){if(!Y){return 
}var U=J[Y-1];
var V=U.length;
switch(U.charAt(0)){case"y":if(V!=2){O.setFullYear(Q);
I.year=Q
}else{if(Q<100){Q=Number(Q);
var P=""+new Date().getFullYear();
var X=P.substring(0,2)*100;
var a=Number(P.substring(2,4));
var W=Math.min(a+20,99);
var Z=(Q<W)?X+Q:X-100+Q;
O.setFullYear(Z);
I.year=Z
}else{if(D.strict){return null
}O.setFullYear(Q);
I.year=Q
}}break;
case"M":if(V>2){var T=E["months-format-"+F[V-3]].concat();
if(!D.strict){Q=Q.replace(".","").toLowerCase();
T=dojo.map(T,function(d){return d.replace(".","").toLowerCase()
})
}Q=dojo.indexOf(T,Q);
if(Q==-1){return null
}}else{Q--
}O.setMonth(Q);
I.month=Q;
break;
case"E":case"e":var R=E["days-format-"+F[V-3]].concat();
if(!D.strict){Q=Q.toLowerCase();
R=dojo.map(R,"".toLowerCase)
}Q=dojo.indexOf(R,Q);
if(Q==-1){return null
}break;
case"d":O.setDate(Q);
I.date=Q;
break;
case"D":O.setMonth(0);
O.setDate(Q);
break;
case"a":var b=D.am||E.am;
var S=D.pm||E.pm;
if(!D.strict){var c=/\./g;
Q=Q.replace(c,"").toLowerCase();
b=b.replace(c,"").toLowerCase();
S=S.replace(c,"").toLowerCase()
}if(D.strict&&Q!=b&&Q!=S){return null
}L=(Q==S)?"p":(Q==b)?"a":"";
break;
case"K":if(Q==24){Q=0
}case"h":case"H":case"k":if(Q>23){return null
}O.setHours(Q);
break;
case"m":O.setMinutes(Q);
break;
case"s":O.setSeconds(Q);
break;
case"S":O.setMilliseconds(Q)
}});
var K=O.getHours();
if(L==="p"&&K<12){O.setHours(K+12)
}else{if(L==="a"&&K==12){O.setHours(0)
}}if(I.year&&O.getFullYear()!=I.year){return null
}if(I.month&&O.getMonth()!=I.month){return null
}if(I.date&&O.getDate()!=I.date){return null
}return O
};
function B(H,G,E,F){var J=function(K){return K
};
G=G||J;
E=E||J;
F=F||J;
var I=H.match(/(''|[^'])+/g);
var D=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(D?E:G)(K);
D=!D
}});
return F(I.join(""))
}function C(D,E,F,G){G=dojo.regexp.escapeString(G);
if(!F.strict){G=G.replace(" a"," ?a")
}return G.replace(/([a-z])\1*/ig,function(M){var O;
var J=M.charAt(0);
var K=M.length;
var I="",H="";
if(F.strict){if(K>1){I="0{"+(K-1)+"}"
}if(K>2){H="0{"+(K-2)+"}"
}}else{I="0?";
H="0{0,2}"
}switch(J){case"y":O="\\d{2,4}";
break;
case"M":O=(K>2)?"\\S+":I+"[1-9]|1[0-2]";
break;
case"D":O=I+"[1-9]|"+H+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":O=I+"[1-9]|[12]\\d|3[01]";
break;
case"w":O=I+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":O="\\S+";
break;
case"h":O=I+"[1-9]|1[0-2]";
break;
case"k":O=I+"\\d|1[01]";
break;
case"H":O=I+"\\d|1\\d|2[0-3]";
break;
case"K":O=I+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":O="[0-5]\\d";
break;
case"S":O="\\d{"+K+"}";
break;
case"a":var L=F.am||E.am||"AM";
var N=F.pm||E.pm||"PM";
if(F.strict){O=L+"|"+N
}else{O=L+"|"+N;
if(L!=L.toLowerCase()){O+="|"+L.toLowerCase()
}if(N!=N.toLowerCase()){O+="|"+N.toLowerCase()
}}break;
default:O=".*"
}if(D){D.push(M)
}return"("+O+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(C,B){A.push({pkg:C,name:B})
};
dojo.date.locale._getGregorianBundle=function(C){var B={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,C);
B=dojo.mixin(B,D)
},this);
return B
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(C,B,F,E){var G;
var D=dojo.date.locale._getGregorianBundle(E);
var A=[C,F,B];
if(F=="standAlone"){G=D[A.join("-")]
}A[1]="format";
return(G||D[A.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(C,D){var B=dojo.cldr.supplemental.getWeekend(D);
var A=(C||new Date()).getDay();
if(B.end<B.start){B.end+=7;
if(A<B.start){A+=7
}}return A>=B.start&&A<=B.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(D,A){if(arguments.length==1){A=0
}var B=new Date(D.getFullYear(),0,1).getDay();
var E=(B-A+7)%7;
var C=Math.floor((dojo.date.locale._getDayOfYear(D)+E-1)/7);
if(B==A){C++
}return C
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(A){if(!this.value||dojo.date.compare(A,this.value)){A=new Date(A);
this.displayMonth=new Date(A);
if(!this.isDisabledDate(A,this.lang)){this.value=A;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(B,A){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(A))
},_populateGrid:function(){var B=this.displayMonth;
B.setDate(1);
var H=B.getDay();
var I=dojo.date.getDaysInMonth(B);
var E=dojo.date.getDaysInMonth(dojo.date.add(B,"month",-1));
var C=new Date();
var J=this.value;
var G=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(G>H){G-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(Q,P){P+=G;
var O=new Date(B);
var R,N="dijitCalendar",L=0;
if(P<H){R=E-H+P+1;
L=-1;
N+="Previous"
}else{if(P>=(H+I)){R=P-H-I+1;
L=1;
N+="Next"
}else{R=P-H+1;
N+="Current"
}}if(L){O=dojo.date.add(O,"month",L)
}O.setDate(R);
if(!dojo.date.compare(O,C,"date")){N="dijitCalendarCurrentDate "+N
}if(!dojo.date.compare(O,J,"date")){N="dijitCalendarSelectedDate "+N
}if(this.isDisabledDate(O,this.lang)){N="dijitCalendarDisabledDate "+N
}Q.className=N+"Month dijitCalendarDateTemplate";
Q.dijitDateValue=O.valueOf();
var M=dojo.query(".dijitCalendarDateLabel",Q)[0];
this._setText(M,O.getDate())
},this);
var K=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,K[B.getMonth()]);
var D=B.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(D++,0),{selector:"year",locale:this.lang}))
},this);
var A=this;
var F=function(M,N,L){dijit.typematic.addMouseListener(A[M],A,function(O){if(O>=0){A._adjustDisplay(N,L)
}},0.8,500)
};
F("incrementMonth","month",1);
F("decrementMonth","month",-1);
F("nextYearLabelNode","year",1);
F("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var A=dojo.hitch(this,function(F,E){var H=dojo.query(F,this.domNode)[0];
for(var G=0;
G<E;
G++){H.parentNode.appendChild(H.cloneNode(true))
}});
A(".dijitCalendarDayLabelTemplate",6);
A(".dijitCalendarDateTemplate",6);
A(".dijitCalendarWeekTemplate",5);
var C=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var D=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(F,E){this._setText(F,C[(E+D)%7])
},this);
var B=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(B,function(E){var F=dojo.doc.createElement("div");
this._setText(F,E);
this.monthLabelSpacer.appendChild(F)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(B,A){this.displayMonth=dojo.date.add(this.displayMonth,B,A);
this._populateGrid()
},_onDayClick:function(B){var A=B.target;
dojo.stopEvent(B);
while(!A.dijitDateValue){A=A.parentNode
}if(!dojo.hasClass(A,"dijitCalendarDisabledDate")){this.setValue(A.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(A,B){return false
}})
}if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(B,A){this.value=B;
this._showText()
},isDisabledDate:function(A,B){return false
},_showText:function(){this.timeMenu.innerHTML="";
var D=dojo.date.stamp.fromISOString;
this._clickableIncrementDate=D(this.clickableIncrement);
this._visibleIncrementDate=D(this.visibleIncrement);
this._visibleRangeDate=D(this.visibleRange);
var H=function(I){return I.getHours()*60*60+I.getMinutes()*60+I.getSeconds()
};
var G=H(this._clickableIncrementDate);
var B=H(this._visibleIncrementDate);
var F=H(this._visibleRangeDate);
var A=this.value.getTime();
this._refDate=new Date(A-A%(B*1000));
this._clickableIncrement=1;
this._totalIncrements=F/G;
this._visibleIncrement=B/G;
for(var E=-this._totalIncrements/2;
E<=this._totalIncrements/2;
E+=this._clickableIncrement){var C=this._createOption(E);
this.timeMenu.appendChild(C)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(B){var D=document.createElement("div");
var A=(D.date=new Date(this._refDate));
D.index=B;
var E=this._clickableIncrementDate;
A.setHours(A.getHours()+E.getHours()*B,A.getMinutes()+E.getMinutes()*B,A.getSeconds()+E.getSeconds()*B);
var C=document.createElement("div");
dojo.addClass(D,this.baseClass+"Item");
dojo.addClass(C,this.baseClass+"ItemInner");
C.innerHTML=dojo.date.locale.format(A,this.constraints);
D.appendChild(C);
if(B%this._visibleIncrement<1&&B%this._visibleIncrement>-1){dojo.addClass(D,this.baseClass+"Marker")
}else{if(B%this._clickableIncrement==0){dojo.addClass(D,this.baseClass+"Tick")
}}if(this.isDisabledDate(A)){dojo.addClass(D,this.baseClass+"ItemDisabled")
}if(dojo.date.compare(this.value,A,this.constraints.selector)==0){D.selected=true;
dojo.addClass(D,this.baseClass+"ItemSelected")
}return D
},_onOptionSelected:function(A){var B=A.target.date||A.target.parentNode.date;
if(!B||this.isDisabledDate(B)){return 
}this.setValue(B);
this.onValueSelected(B)
},onValueSelected:function(A){},onmouseover:function(A){var B=(A.target.parentNode===this.timeMenu)?A.target:A.target.parentNode;
this._highlighted_option=B;
dojo.addClass(B,this.baseClass+"ItemHover")
},onmouseout:function(A){var B=(A.target.parentNode===this.timeMenu)?A.target:A.target.parentNode;
if(this._highlighted_option===B){dojo.removeClass(B,this.baseClass+"ItemHover")
}},_mouseWheeled:function(B){dojo.stopEvent(B);
var A=(dojo.isIE?B.wheelDelta:-B.detail);
this[(A>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var B=this.timeMenu.childNodes[0].index-1;
var A=this._createOption(B);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(A,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var B=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var A=this._createOption(B);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(A)
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
},setValue:function(A,B){this.inherited("setValue",arguments);
if(this._picker){if(!A||A.toString()==this._invalid){A=new Date()
}this._picker.setValue(A)
}},_open:function(){if(this.disabled){return 
}var B=this;
if(!this._picker){var A=dojo.getObject(this._popupClass,false);
this._picker=new A({onValueSelected:function(C){B.focus();
setTimeout(dojo.hitch(B,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(B,C,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(C){return B.constraints&&(dojo.date.compare(B.constraints.min,C)>0||dojo.date.compare(B.constraints.max,C)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:dojo.hitch(this,this._close),onClose:function(){B._opened=false
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
},_callbackSetLabel:function(C,A,B){if(A&&A.query[this.searchAttr]!=this._lastQuery){return 
}if(!C.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(C[0],B)
}},_openResultList:function(B,A){if(A.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=B.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(B,C,A){this.valueNode.value=B;
dijit.form.FilteringSelect.superclass.setValue.call(this,B,A,C);
this._lastDisplayedValue=C
},setValue:function(C,A){var D=this;
var B=function(E,F){if(E){if(D.store.isItemLoaded(E)){D._callbackSetLabel([E],undefined,F)
}else{D.store.loadItem({item:E,onItem:function(G,H){D._callbackSetLabel(G,H,F)
}})
}}else{D._isvalid=false;
D.validate(false)
}};
this.store.fetchItemByIdentity({identity:C,onItem:function(E){B(E,A)
}})
},_setValueFromItem:function(A,B){this._isvalid=true;
this._setValue(this.store.getIdentity(A),this.labelFunc(A,this.store),B)
},labelFunc:function(A,B){return B.getValue(A,this.searchAttr)
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
},_typematicCallback:function(B,A,C){if(A==this.textbox){A=(C.keyCode==dojo.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(B==-1){this._arrowReleased(A)
}else{this._arrowPressed(A,(A==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(E){dojo.stopEvent(E);
var C=0;
if(typeof E.wheelDelta=="number"){C=E.wheelDelta
}else{if(typeof E.detail=="number"){C=-E.detail
}}if(C>0){var B=this.upArrowNode;
var A=+1
}else{if(C<0){var B=this.downArrowNode;
var A=-1
}else{return 
}}this._arrowPressed(B,A);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var D=this;
this._wheelTimer=setTimeout(function(){D._arrowReleased(B)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(A,B){var C=A+B;
if(isNaN(A)||isNaN(C)){return A
}if((typeof this.constraints.max=="number")&&(C>this.constraints.max)){C=this.constraints.max
}if((typeof this.constraints.min=="number")&&(C<this.constraints.min)){C=this.constraints.min
}return C
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
},_onBarClick:function(B){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
dojo.stopEvent(B);
var A=dojo.coords(this.sliderBarContainer,true);
var C=B[this._mousePixelCoord]-A[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(A[this._pixelCount]-C):C,A[this._pixelCount],true)
},_setPixelValue:function(A,C,E){if(this.disabled){return 
}A=A<0?0:C<A?C:A;
var D=this.discreteValues;
if(D<=1||D==Infinity){D=C
}D--;
var F=C/D;
var B=Math.round(A/F);
this.setValue((this.maximum-this.minimum)*B/D+this.minimum,E)
},setValue:function(B,A){this.valueNode.value=this.value=B;
this.inherited("setValue",arguments);
var C=(B-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(C*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-C)*100)+"%"
},_bumpValue:function(C){if(this.disabled){return 
}var E=dojo.getComputedStyle(this.sliderBarContainer);
var D=dojo._getContentBox(this.sliderBarContainer,E);
var A=this.discreteValues;
if(A<=1||A==Infinity){A=D[this._pixelCount]
}A--;
var B=(this.value-this.minimum)*A/(this.maximum-this.minimum)+C;
if(B<0){B=0
}if(B>A){B=A
}B=B*(this.maximum-this.minimum)/A+this.minimum;
this.setValue(B,true)
},decrement:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(B){dojo.stopEvent(B);
var A=0;
if(typeof B.wheelDelta=="number"){A=B.wheelDelta
}else{if(typeof B.detail=="number"){A=-B.detail
}}if(A>0){this.increment(B)
}else{if(A<0){this.decrement(B)
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
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(C){var B=this.widget;
var D=this.constraintBox;
if(!D){var G=B.sliderBarContainer;
var A=dojo.getComputedStyle(G);
var D=dojo._getContentBox(G,A);
D[B._startingPixelCount]=0;
this.constraintBox=D
}var E=this.marginBox;
var F=B._isReversed()?C[B._mousePixelCoord]-dojo._abs(B.sliderBarContainer).x:E[B._startingPixelCount]+C[B._mousePixelCoord];
dojo.hitch(B,"_setPixelValue")(B._isReversed()||B._upsideDown?(D[B._pixelCount]-F):F,D[B._pixelCount])
},destroy:function(A){var B=this.widget;
B.setValue(B.value,true);
dojo.dnd.Mover.prototype.destroy.call(this)
}});
dojo.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(A,B){return this._positionPrefix+A+this._positionSuffix+this.ruleStyle+this._suffix
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
},_genHTML:function(A,B){return this._positionPrefix+this._calcPosition(A)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[B]+this._suffix
},getLabels:function(){var C=this.labels;
if(!C.length){C=dojo.query("> li",this.srcNodeRef).map(function(E){return String(E.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!C.length&&this.count>1){var B=this.minimum;
var A=(this.maximum-B)/(this.count-1);
for(var D=0;
D<this.count;
D++){C.push((D<this.numericMargin||D>=(this.count-this.numericMargin))?"":dojo.number.format(B,this.constraints));
B+=A
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
}},setValue:function(C,B){var G=this.editNode;
if(typeof C=="string"){G.innerHTML="";
if(C.split){var D=this;
var E=true;
dojo.forEach(C.split("\n"),function(H){if(E){E=false
}else{G.appendChild(document.createElement("BR"))
}G.appendChild(document.createTextNode(H))
})
}else{G.appendChild(document.createTextNode(C))
}}else{C=G.innerHTML;
if(this.iframe){C=C.replace(/<div><\/div>\r?\n?$/i,"")
}C=C.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=C;
if(this.iframe){var A=document.createElement("div");
G.appendChild(A);
var F=A.offsetTop;
if(G.scrollWidth>G.clientWidth){F+=16
}if(this.lastHeight!=F){if(F==0){F=16
}dojo.contentBox(this.iframe,{h:F});
this.lastHeight=F
}G.removeChild(A)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),B)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var A=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=A.iframeEditTitle;
this._iframeFocusTitle=A.iframeFocusTitle;
var B=dojo.query('label[for="'+this.id+'"]');
if(B.length){this._iframeEditTitle=B[0].innerHTML+" "+this._iframeEditTitle
}var C=this.focusNode=this.editNode=document.createElement("BODY");
C.style.margin="0px";
C.style.padding="0px";
C.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var D=this.iframe.contentWindow;
try{var C=this.iframe.contentDocument.title
}catch(A){var C=""
}if(!D||!C){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var B=D.document;
B.getElementsByTagName("HTML")[0].replaceChild(this.editNode,B.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){B.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=B;
D.addEventListener("resize",dojo.hitch(this,this._changed),false)
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
},_onKeyPress:function(B){if(B.keyCode==dojo.keys.TAB&&!B.shiftKey&&!B.ctrlKey&&!B.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(B)
}else{if(B.keyCode==dojo.keys.ENTER){B.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var A=document.createEvent("KeyEvents");
A.initKeyEvent("keypress",true,true,null,B.ctrlKey,B.altKey,B.shiftKey,B.metaKey,B.keyCode,B.charCode);
this.iframe.dispatchEvent(A)
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
},addChild:function(A,B){dijit._Container.prototype.addChild.apply(this,arguments);
A=this._setupChild(A);
if(this._started){this.layout();
dojo.publish(this.id+"-addChild",[A,B]);
if(!this.selectedChildWidget){this.selectChild(A)
}}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){dojo.publish(this.id+"-removeChild",[A]);
this.layout()
}if(this.selectedChildWidget===A){this.selectedChildWidget=undefined;
if(this._started){var B=this.getChildren();
if(B.length){this.selectChild(B[0])
}}}},selectChild:function(A){A=dijit.byId(A);
if(this.selectedChildWidget!=A){this._transition(A,this.selectedChildWidget);
this.selectedChildWidget=A;
dojo.publish(this.id+"-selectChild",[A])
}},_transition:function(A,B){if(B){this._hideChild(B)
}this._showChild(A);
if(this.doLayout&&A.resize){A.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(A){var B=this.getChildren();
var C=dojo.indexOf(B,this.selectedChildWidget);
C+=A?1:B.length-1;
return B[C%B.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(A){dojo.publish(this.id+"-containerKeyPress",[{e:A,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(A){var B=this.getChildren();
A.isFirstChild=(A==B[0]);
A.isLastChild=(A==B[B.length-1]);
A.selected=true;
A.domNode.style.display="";
if(A._loadCheck){A._loadCheck()
}if(A.onShow){A.onShow()
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
},onAddChild:function(D,E){var B=document.createElement("span");
this.domNode.appendChild(B);
var A=dojo.getObject(this.buttonWidget);
var C=new A({label:D.title,closeButton:D.closable},B);
this.addChild(C,E);
this.pane2button[D]=C;
D.controlButton=C;
dojo.connect(C,"onClick",dojo.hitch(this,"onButtonClick",D));
dojo.connect(C,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",D));
if(!this._currentChild){C.focusNode.setAttribute("tabIndex","0");
this._currentChild=D
}},onRemoveChild:function(A){if(this._currentChild===A){this._currentChild=null
}var B=this.pane2button[A];
if(B){B.destroy()
}this.pane2button[A]=null
},onSelectChild:function(B){if(!B){return 
}if(this._currentChild){var C=this.pane2button[this._currentChild];
C.setChecked(false);
C.focusNode.setAttribute("tabIndex","-1")
}var A=this.pane2button[B];
A.setChecked(true);
this._currentChild=B;
A.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(A){var B=dijit.byId(this.containerId);
B.selectChild(A)
},onCloseButtonClick:function(B){var A=dijit.byId(this.containerId);
A.closeChild(B);
var C=this.pane2button[this._currentChild];
if(C){dijit.focus(C.focusNode||C.domNode)
}},adjacent:function(D){var A=this.getChildren();
var B=dojo.indexOf(A,this.pane2button[this._currentChild]);
var C=D?1:A.length-1;
return A[(B+C)%A.length]
},onkeypress:function(B){if(this.disabled||B.altKey){return 
}var A=true;
if(B.ctrlKey||!B._djpage){var C=dojo.keys;
switch(B.keyCode){case C.LEFT_ARROW:case C.UP_ARROW:case C.PAGE_UP:A=false;
case C.RIGHT_ARROW:case C.DOWN_ARROW:case C.PAGE_DOWN:this.adjacent(A).onClick();
dojo.stopEvent(B);
break;
case C.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(B);
break;
default:if(B.ctrlKey){if(B.keyCode==C.TAB){this.adjacent(!B.shiftKey).onClick();
dojo.stopEvent(B)
}else{if(B.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(B)
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
}},layout:function(){var B=0;
var A=this.selectedChildWidget;
dojo.forEach(this.getChildren(),function(D){B+=D.getTitleHeight()
});
var C=this._contentBox;
this._verticalSpace=(C.h-B);
if(A){A.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(A){return A
},_transition:function(D,C){if(this._inTransition){return 
}this._inTransition=true;
var E=[];
var B=this._verticalSpace;
if(D){D.setSelected(true);
var A=D.containerNode;
A.style.display="";
E.push(dojo.animateProperty({node:A,duration:this.duration,properties:{height:{start:"1",end:B}},onEnd:function(){A.style.overflow="auto"
}}))
}if(C){C.setSelected(false);
var F=C.containerNode;
F.style.overflow="hidden";
E.push(dojo.animateProperty({node:F,duration:this.duration,properties:{height:{start:B,end:"1"}},onEnd:function(){F.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(E).play()
},_onKeyPress:function(A){if(this.disabled||A.altKey){return 
}var B=dojo.keys;
switch(A.keyCode){case B.LEFT_ARROW:case B.UP_ARROW:case B.PAGE_UP:this._adjacent(false)._onTitleClick();
dojo.stopEvent(A);
break;
case B.RIGHT_ARROW:case B.DOWN_ARROW:case B.PAGE_DOWN:this._adjacent(true)._onTitleClick();
dojo.stopEvent(A);
break;
default:if(A.ctrlKey&&A.keyCode==B.TAB){this._adjacent(A._dijitWidget,!A.shiftKey)._onTitleClick();
dojo.stopEvent(A)
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
},addChild:function(A,B){dijit._Container.prototype.addChild.apply(this,arguments);
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
}catch(A){this.sizerWidth=7
}}var B=this.virtualSizer=document.createElement("div");
B.style.position="relative";
B.style.zIndex=10;
B.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(B);
dojo.setSelectable(B,false)
},startup:function(){if(this._started){return 
}dojo.forEach(this.getChildren(),function(B,A,C){this._injectChild(B);
if(A<C.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(A){A.domNode.style.position="absolute";
dojo.addClass(A.domNode,"dijitSplitPane")
},_addSizer:function(){var B=this.sizers.length;
var D=this.sizers[B]=document.createElement("div");
D.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var A=document.createElement("div");
A.className="thumb";
D.appendChild(A);
var E=this;
var C=(function(){var F=B;
return function(G){E.beginSizing(G,F)
}
})();
dojo.connect(D,"onmousedown",C);
this.domNode.appendChild(D);
dojo.setSelectable(D,false)
},removeChild:function(A){if(this.sizers.length&&dojo.indexOf(this.getChildren(),A)!=-1){var B=this.sizers.length-1;
dojo._destroyElement(this.sizers[B]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(B,C){this.inherited("addChild",arguments);
if(this._started){this._injectChild(B);
var A=this.getChildren();
if(A.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var G=this.getChildren();
if(!G.length){return 
}var B=this.isHorizontal?this.paneWidth:this.paneHeight;
if(G.length>1){B-=this.sizerWidth*(G.length-1)
}var A=0;
dojo.forEach(G,function(H){A+=H.sizeShare
});
var C=B/A;
var E=0;
dojo.forEach(G.slice(0,G.length-1),function(H){var I=Math.round(C*H.sizeShare);
H.sizeActual=I;
E+=I
});
G[G.length-1].sizeActual=B-E;
this._checkSizes();
var D=0;
var F=G[0].sizeActual;
this._movePanel(G[0],D,F);
G[0].position=D;
D+=F;
if(!this.sizers){return 
}dojo.some(G.slice(1),function(H,I){if(!this.sizers[I]){return true
}this._moveSlider(this.sizers[I],D,this.sizerWidth);
this.sizers[I].position=D;
D+=this.sizerWidth;
F=H.sizeActual;
this._movePanel(H,D,F);
H.position=D;
D+=F
},this)
},_movePanel:function(D,C,A){if(this.isHorizontal){D.domNode.style.left=C+"px";
D.domNode.style.top=0;
var B={w:A,h:this.paneHeight};
if(D.resize){D.resize(B)
}else{dojo.marginBox(D.domNode,B)
}}else{D.domNode.style.left=0;
D.domNode.style.top=C+"px";
var B={w:this.paneWidth,h:A};
if(D.resize){D.resize(B)
}else{dojo.marginBox(D.domNode,B)
}}},_moveSlider:function(A,B,C){if(this.isHorizontal){A.style.left=B+"px";
A.style.top=0;
dojo.marginBox(A,{w:C,h:this.paneHeight})
}else{A.style.left=0;
A.style.top=B+"px";
dojo.marginBox(A,{w:this.paneWidth,h:C})
}},_growPane:function(B,A){if(B>0){if(A.sizeActual>A.sizeMin){if((A.sizeActual-A.sizeMin)>B){A.sizeActual=A.sizeActual-B;
B=0
}else{B-=A.sizeActual-A.sizeMin;
A.sizeActual=A.sizeMin
}}}return B
},_checkSizes:function(){var C=0;
var A=0;
var B=this.getChildren();
dojo.forEach(B,function(F){A+=F.sizeActual;
C+=F.sizeMin
});
if(C<=A){var E=0;
dojo.forEach(B,function(F){if(F.sizeActual<F.sizeMin){E+=F.sizeMin-F.sizeActual;
F.sizeActual=F.sizeMin
}});
if(E>0){var D=this.isDraggingLeft?B.reverse():B;
dojo.forEach(D,function(F){E=this._growPane(E,F)
},this)
}}else{dojo.forEach(B,function(F){F.sizeActual=Math.round(A*(F.sizeMin/C))
})
}},beginSizing:function(E,C){var B=this.getChildren();
this.paneBefore=B[C];
this.paneAfter=B[C+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[C];
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
this.originPos=dojo.coords(B[0].domNode,true);
if(this.isHorizontal){var F=(E.layerX?E.layerX:E.offsetX);
var A=E.pageX;
this.originPos=this.originPos.x
}else{var F=(E.layerY?E.layerY:E.offsetY);
var A=E.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=A;
this.screenToClientOffset=A-F;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(dojo.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(dojo.connect(document.documentElement,"onmouseup",this,"endSizing"));
dojo.stopEvent(E)
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
},movePoint:function(){var A=this.lastPoint-this.screenToClientOffset;
var B=A-this.dragOffset;
B=this.legaliseSplitPoint(B);
A=B+this.dragOffset;
this.lastPoint=A+this.screenToClientOffset
},legaliseSplitPoint:function(A){A+=this.sizingSplitter.position;
this.isDraggingLeft=!!(A>0);
if(!this.activeSizing){var B=this.paneBefore.position+this.paneBefore.sizeMin;
if(A<B){A=B
}var C=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(A>C){A=C
}}A-=this.sizingSplitter.position;
this._checkSizes();
return A
},_updateSize:function(){var B=this.lastPoint-this.dragOffset-this.originPos;
var C=this.paneBefore.position;
var A=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=B-C;
this.paneAfter.position=B+this.sizerWidth;
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
},_restoreState:function(){dojo.forEach(this.getChildren(),function(D,E){var C=this._getCookieName(E);
var A=dojo.cookie(C);
if(A){var B=parseInt(A);
if(typeof B=="number"){D.sizeShare=B
}}},this)
},_saveState:function(){dojo.forEach(this.getChildren(),function(A,B){dojo.cookie(this._getCookieName(B),A.sizeShare)
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