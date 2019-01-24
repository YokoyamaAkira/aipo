dojo._xdResourceLoaded({depends:[["provide","dojo.colors"],["provide","dijit.ColorPalette"],["provide","dijit.Declaration"],["provide","dojo.dnd.common"],["provide","dojo.dnd.autoscroll"],["provide","dojo.dnd.Mover"],["provide","dojo.dnd.Moveable"],["provide","dojo.dnd.move"],["provide","dojo.fx"],["provide","dojo.fx.Toggler"],["provide","dijit.layout.ContentPane"],["provide","dijit.form.Form"],["provide","dijit.Dialog"],["provide","dijit._editor.selection"],["provide","dijit._editor.RichText"],["provide","dijit.Toolbar"],["provide","dijit.form.Button"],["provide","dijit._editor._Plugin"],["provide","dijit.Editor"],["provide","dijit.Menu"],["provide","dojo.regexp"],["provide","dojo.number"],["provide","dijit.ProgressBar"],["provide","dijit.TitlePane"],["provide","dijit.Tooltip"],["provide","dojo.cookie"],["provide","dijit.Tree"],["provide","dijit.form.TextBox"],["provide","dijit.InlineEditBox"],["provide","dijit.form.CheckBox"],["provide","dojo.data.util.filter"],["provide","dojo.data.util.sorter"],["provide","dojo.data.util.simpleFetch"],["provide","dojo.data.ItemFileReadStore"],["provide","dijit.form.ValidationTextBox"],["provide","dijit.form.ComboBox"],["provide","dojo.cldr.monetary"],["provide","dojo.currency"],["provide","dijit.form.NumberTextBox"],["provide","dijit.form.CurrencyTextBox"],["provide","dojo.cldr.supplemental"],["provide","dojo.date"],["provide","dojo.date.locale"],["provide","dijit._Calendar"],["provide","dijit._TimePicker"],["provide","dijit.form.TimeTextBox"],["provide","dijit.form.DateTextBox"],["provide","dijit.form.FilteringSelect"],["provide","dijit.form._Spinner"],["provide","dijit.form.NumberSpinner"],["provide","dijit.form.Slider"],["provide","dijit.form.Textarea"],["provide","dijit.layout.StackContainer"],["provide","dijit.layout.AccordionContainer"],["provide","dijit.layout.LayoutContainer"],["provide","dijit.layout.LinkPane"],["provide","dijit.layout.SplitContainer"],["provide","dijit.layout.TabContainer"],["provide","dijit.dijit-all"],["i18n._preloadLocalizations","dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]]],defineResource:function(dojo){if(!dojo._hasResource["dojo.colors"]){dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
(function(){var hue2rgb=function(m1,m2,h){if(h<0){++h
}if(h>1){--h
}var h6=6*h;
if(h6<1){return m1+(m2-m1)*h6
}if(2*h<1){return m2
}if(3*h<2){return m1+(m2-m1)*(2/3-h)*6
}return m1
};
dojo.colorFromRgb=function(color,obj){var m=color.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1];
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){var r=c[0];
if(r.charAt(r.length-1)=="%"){var a=dojo.map(c,function(x){return parseFloat(x)*2.56
});
if(l==4){a[3]=c[3]
}return dojo.colorFromArray(a,obj)
}return dojo.colorFromArray(c,obj)
}if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2,a=[hue2rgb(m1,m2,H+1/3)*256,hue2rgb(m1,m2,H)*256,hue2rgb(m1,m2,H-1/3)*256,1];
if(l==4){a[3]=c[3]
}return dojo.colorFromArray(a,obj)
}}return null
};
var confine=function(c,low,high){c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c
};
dojo.Color.prototype.sanitize=function(){var t=this;
t.r=Math.round(confine(t.r,0,255));
t.g=Math.round(confine(t.g,0,255));
t.b=Math.round(confine(t.b,0,255));
t.a=confine(t.a,0,1);
return this
}
})();
dojo.colors.makeGrey=function(g,a){return dojo.colorFromArray([g,g,g,a])
};
dojo.Color.named=dojo.mixin({aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},dojo.Color.named)
}if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;
dojo.provide("dijit.ColorPalette");
dojo.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":dojo.moduleUrl("dijit","templates/colors7x10.png"),"3x4":dojo.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{leftOffset:4,topOffset:4,cWidth:20,cHeight:20},templateString:'<div class="dijitInline dijitColorPalette">\r\n\t<div class="dijitColorPaletteInner" dojoAttachPoint="divNode" waiRole="grid" tabIndex="-1">\r\n\t\t<img class="dijitColorPaletteUnder" dojoAttachPoint="imageNode" waiRole="presentation">\r\n\t</div>\t\r\n</div>\r\n',_paletteDims:{"7x10":{width:"206px",height:"145px"},"3x4":{width:"86px",height:"64px"}},postCreate:function(){dojo.mixin(this.divNode.style,this._paletteDims[this.palette]);
this.imageNode.setAttribute("src",this._imagePaths[this.palette]);
var choices=this._palettes[this.palette];
this.domNode.style.position="relative";
this._highlightNodes=[];
this.colorNames=dojo.i18n.getLocalization("dojo","colors",this.lang);
var url=dojo.moduleUrl("dijit","templates/blank.gif");
var colorObject=new dojo.Color(),coords=this._paletteCoords;
for(var row=0;
row<choices.length;
row++){for(var col=0;
col<choices[row].length;
col++){var highlightNode=document.createElement("img");
highlightNode.src=url;
dojo.addClass(highlightNode,"dijitPaletteImg");
var color=choices[row][col],colorValue=colorObject.setColor(dojo.Color.named[color]);
highlightNode.alt=this.colorNames[color];
highlightNode.color=colorValue.toHex();
var highlightStyle=highlightNode.style;
highlightStyle.color=highlightStyle.backgroundColor=highlightNode.color;
dojo.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(handler){this.connect(highlightNode,"on"+handler.toLowerCase(),"_onColor"+handler)
},this);
this.divNode.appendChild(highlightNode);
highlightStyle.top=coords.topOffset+(row*coords.cHeight)+"px";
highlightStyle.left=coords.leftOffset+(col*coords.cWidth)+"px";
highlightNode.setAttribute("tabIndex","-1");
highlightNode.title=this.colorNames[color];
dijit.setWaiRole(highlightNode,"gridcell");
highlightNode.index=this._highlightNodes.length;
this._highlightNodes.push(highlightNode)
}}this._highlightNodes[this._currentFocus].tabIndex=0;
this._xDim=choices[0].length;
this._yDim=choices.length;
var keyIncrementMap={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};
for(var key in keyIncrementMap){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:dojo.keys[key],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var increment=keyIncrementMap[key];
return function(count){this._navigateByKey(increment,count)
}
}(),this.timeoutChangeRate,this.defaultTimeout))
}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus])
},onChange:function(color){},_onColorDijitclick:function(evt){var target=evt.currentTarget;
if(this._currentFocus!=target.index){this._currentFocus=target.index;
dijit.focus(target)
}this._selectColor(target);
dojo.stopEvent(evt)
},_onColorMouseOut:function(evt){dojo.removeClass(evt.currentTarget,"dijitPaletteImgHighlight")
},_onColorMouseOver:function(evt){var target=evt.currentTarget;
target.tabIndex=0;
target.focus()
},_onColorBlur:function(evt){dojo.removeClass(evt.currentTarget,"dijitPaletteImgHighlight");
evt.currentTarget.tabIndex=-1;
this._currentFocus=0;
this._highlightNodes[0].tabIndex=0
},_onColorFocus:function(evt){if(this._currentFocus!=evt.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1
}this._currentFocus=evt.currentTarget.index;
dojo.addClass(evt.currentTarget,"dijitPaletteImgHighlight")
},_selectColor:function(selectNode){this.onChange(this.value=selectNode.color)
},_navigateByKey:function(increment,typeCount){if(typeCount==-1){return 
}var newFocusIndex=this._currentFocus+increment;
if(newFocusIndex<this._highlightNodes.length&&newFocusIndex>-1){var focusNode=this._highlightNodes[newFocusIndex];
focusNode.tabIndex=0;
focusNode.focus()
}}})
}if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var src=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var preambles=dojo.query("> script[type='dojo/method'][event='preamble']",src).orphan();
var scripts=dojo.query("> script[type^='dojo/']",src).orphan();
var srcType=src.nodeName;
var propList=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(name){return dojo.getObject(name)
}):[dijit._Widget,dijit._Templated];
if(preambles.length){propList.preamble=dojo.parser._functionFromScript(preambles[0])
}var parsedScripts=dojo.map(scripts,function(s){var evt=s.getAttribute("event")||"postscript";
return{event:evt,func:dojo.parser._functionFromScript(s)}
});
this.mixins.push(function(){dojo.forEach(parsedScripts,function(s){dojo.connect(this,s.event,this,s.func)
},this)
});
propList.widgetsInTemplate=true;
propList._skipNodeCache=true;
propList.templateString="<"+srcType+" class='"+src.className+"' dojoAttachPoint='"+(src.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(src.getAttribute("dojoAttachEvent")||"")+"' >"+src.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+srcType+">";
dojo.query("[dojoType]",src).forEach(function(node){node.removeAttribute("dojoType")
});
dojo.declare(this.widgetClass,this.mixins,propList)
}})
}if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(e){return e[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var id;
do{id="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(id));
return id
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){var t=e.target;
if(t.nodeType==3){t=t.parentNode
}return" button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){return{w:dd.clientWidth,h:w.innerHeight}
}else{if(!dojo.isOpera&&w.innerWidth){return{w:w.innerWidth,h:w.innerHeight}
}else{if(!dojo.isOpera&&dd&&dd.clientWidth){return{w:dd.clientWidth,h:dd.clientHeight}
}else{if(b.clientWidth){return{w:b.clientWidth,h:b.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){var v=dojo.dnd.getViewport(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){dx=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){dx=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){dy=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){dy=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(dx,dy)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(e){for(var n=e.target;
n;
){if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){var b=dojo._getContentBox(n,s),t=dojo._abs(n,true);
b.l+=t.x+n.scrollLeft;
b.t+=t.y+n.scrollTop;
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-b.l,ry=e.pageY-b.t,dx=0,dy=0;
if(rx>0&&rx<b.w){if(rx<w){dx=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(rx>b.w-w){dx=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(ry>0&&ry<b.h){if(ry<h){dy=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(ry>b.h-h){dy=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var oldLeft=n.scrollLeft,oldTop=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(oldLeft!=n.scrollLeft||oldTop!=n.scrollTop){return 
}}}try{n=n.parentNode
}catch(x){n=null
}}dojo.dnd.autoScroll(e)
}
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(node,e,host){this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=this.host=host,d=node.ownerDocument,firstEvent=dojo.connect(d,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo,"stopEvent"),dojo.connect(d,"onselectstart",dojo,"stopEvent"),firstEvent];
if(h&&h.onMoveStart){h.onMoveStart(this)
}},onMouseMove:function(e){dojo.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY})
},onMouseUp:function(e){if(this.mouseButton==e.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var m=dojo.marginBox(this.node);
m.l-=this.marginBox.l;
m.t-=this.marginBox.t;
this.marginBox=m;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){h.onMoveStop(this)
}this.events=this.node=null
}})
}if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(node,params){this.node=dojo.byId(node);
if(!params){params={}
}this.handle=params.handle?dojo.byId(params.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=params.delay>0?params.delay:0;
this.skip=params.skip;
this.mover=params.mover?params.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(params,node){return new dojo.dnd.Moveable(node,params)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(e){if(this.skip&&dojo.dnd.isFormElement(e)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY
}else{new this.mover(this.node,e,this)
}dojo.stopEvent(e)
},onMouseMove:function(e){if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){this.onMouseUp(e);
new this.mover(this.node,e,this)
}dojo.stopEvent(e)
},onMouseUp:function(e){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(e){if(!this.skip||!dojo.dnd.isFormElement(e)){dojo.stopEvent(e)
}},onMoveStart:function(mover){dojo.publish("/dnd/move/start",[mover]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(mover){dojo.publish("/dnd/move/stop",[mover]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(mover){},onMove:function(mover,leftTop){this.onMoving(mover,leftTop);
dojo.marginBox(mover.node,leftTop);
this.onMoved(mover,leftTop)
},onMoving:function(mover,leftTop){},onMoved:function(mover,leftTop){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(params,node){return new dojo.dnd.move.constrainedMoveable(node,params)
},constructor:function(node,params){if(!params){params={}
}this.constraints=params.constraints;
this.within=params.within
},onFirstMove:function(mover){var c=this.constraintBox=this.constraints.call(this,mover),m=mover.marginBox;
c.r=c.l+c.w-(this.within?m.w:0);
c.b=c.t+c.h-(this.within?m.h:0)
},onMove:function(mover,leftTop){var c=this.constraintBox;
leftTop.l=leftTop.l<c.l?c.l:c.r<leftTop.l?c.r:leftTop.l;
leftTop.t=leftTop.t<c.t?c.t:c.b<leftTop.t?c.b:leftTop.t;
dojo.marginBox(mover.node,leftTop)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(params,node){return new dojo.dnd.move.boxConstrainedMoveable(node,params)
},constructor:function(node,params){var box=params&&params.box;
this.constraints=function(){return box
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(params,node){return new dojo.dnd.move.parentConstrainedMoveable(node,params)
},constructor:function(node,params){var area=params&&params.area;
this.constraints=function(){var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){return mb
}var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){return mb
}t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){return mb
}t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb
}
}});
dojo.dnd.move.constrainedMover=function(fun,within){var mover=function(node,e,notifier){dojo.dnd.Mover.call(this,node,e,notifier)
};
dojo.extend(mover,dojo.dnd.Mover.prototype);
dojo.extend(mover,{onMouseMove:function(e){dojo.dnd.autoScroll(e);
var m=this.marginBox,c=this.constraintBox,l=m.l+e.pageX,t=m.t+e.pageY;
l=l<c.l?c.l:c.r<l?c.r:l;
t=t<c.t?c.t:c.b<t?c.b:t;
this.host.onMove(this,{l:l,t:t})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var c=this.constraintBox=fun.call(this),m=this.marginBox;
c.r=c.l+c.w-(within?m.w:0);
c.b=c.t+c.h-(within?m.h:0)
}});
return mover
};
dojo.dnd.move.boxConstrainedMover=function(box,within){return dojo.dnd.move.constrainedMover(function(){return box
},within)
};
dojo.dnd.move.parentConstrainedMover=function(area,within){var fun=function(){var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){return mb
}var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){return mb
}t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){return mb
}t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb
};
return dojo.dnd.move.constrainedMover(fun,within)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(animations){var first=animations.shift();
var previous=first;
dojo.forEach(animations,function(current){dojo.connect(previous,"onEnd",current,"play");
previous=current
});
return first
};
dojo.fx.combine=function(animations){var ctr=new dojo._Animation({curve:[0,1]});
if(!animations.length){return ctr
}ctr.duration=animations[0].duration;
dojo.forEach(animations,function(current){dojo.forEach(["play","pause","stop"],function(e){if(current[e]){dojo.connect(ctr,e,current,e)
}})
});
return ctr
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(args){var _t=this;
dojo.mixin(_t,args);
_t.node=args.node;
_t._showArgs=dojo.mixin({},args);
_t._showArgs.node=_t.node;
_t._showArgs.duration=_t.showDuration;
_t.showAnim=_t.showFunc(_t._showArgs);
_t._hideArgs=dojo.mixin({},args);
_t._hideArgs.node=_t.node;
_t._hideArgs.duration=_t.hideDuration;
_t.hideAnim=_t.hideFunc(_t._hideArgs);
dojo.connect(_t.showAnim,"beforeBegin",dojo.hitch(_t.hideAnim,"stop",true));
dojo.connect(_t.hideAnim,"beforeBegin",dojo.hitch(_t.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(delay){return this.showAnim.play(delay||0)
},hide:function(delay){return this.hideAnim.play(delay||0)
}});
dojo.fx.wipeIn=function(args){args.node=dojo.byId(args.node);
var node=args.node,s=node.style;
var anim=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){s.height="1px";
s.display="";
s.visibility="";
return 1
}else{var height=dojo.style(node,"height");
return Math.max(height,1)
}},end:function(){return node.scrollHeight
}}}},args));
dojo.connect(anim,"onEnd",function(){s.height="auto"
});
return anim
};
dojo.fx.wipeOut=function(args){var node=args.node=dojo.byId(args.node);
var s=node.style;
var anim=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},args));
dojo.connect(anim,"beforeBegin",function(){s.overflow="hidden";
s.display=""
});
dojo.connect(anim,"onEnd",function(){s.height="auto";
s.display="none"
});
return anim
};
dojo.fx.slideTo=function(args){var node=(args.node=dojo.byId(args.node));
var top=null;
var left=null;
var init=(function(n){return function(){var cs=dojo.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px"
}}
})(node);
init();
var anim=dojo.animateProperty(dojo.mixin({properties:{top:{end:args.top||0},left:{end:args.left||0}}},args));
dojo.connect(anim,"beforeBegin",anim,init);
return anim
}
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var messages=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,messages);
this.errorMessage=dojo.string.substitute(this.errorMessage,messages);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var childNodes=dojo.query(">",this.containerNode||this.domNode),childWidgets=childNodes.filter("[widgetId]");
if(childNodes.length==1&&childWidgets.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(childWidgets[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(href){this.href=href;
return this._prepareLoad()
},setContent:function(data){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(data||"");
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
},resize:function(size){dojo.marginBox(this.domNode,size);
var node=this.containerNode||this.domNode,mb=dojo.mixin(dojo.marginBox(node),size||{});
this._contentBox=dijit.layout.marginBox2contentBox(node,mb);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(forceLoad){this.cancel();
this.isLoaded=false;
this._loadCheck(forceLoad)
},_loadCheck:function(forceLoad){var displayState=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(forceLoad||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&displayState&&!this._xhrDfd)||(!this.isLoaded&&displayState&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var self=this;
var getArgs={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(getArgs,this.ioArgs)
}var hand=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(getArgs);
hand.addCallback(function(html){try{self.onDownloadEnd.call(self);
self._isDownloaded=true;
self.setContent.call(self,html)
}catch(err){self._onError.call(self,"Content",err)
}delete self._xhrDfd;
return html
});
hand.addErrback(function(err){if(!hand.cancelled){self._onError.call(self,"Download",err)
}delete self._xhrDfd;
return err
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(cont){this.destroyDescendants();
try{var node=this.containerNode||this.domNode;
while(node.firstChild){dojo._destroyElement(node.firstChild)
}if(typeof cont=="string"){if(this.extractContent){match=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){cont=match[1]
}}node.innerHTML=cont
}else{if(cont.nodeType){node.appendChild(cont)
}else{dojo.forEach(cont,function(n){node.appendChild(n.cloneNode(true))
})
}}}catch(e){var errMess=this.onContentError(e);
try{node.innerHTML=errMess
}catch(e){console.error("Fatal "+this.id+" could not change content due to "+e.message,e)
}}},_onError:function(type,err,consoleText){var errText=this["on"+type+"Error"].call(this,err);
if(consoleText){console.error(consoleText,err)
}else{if(errText){this._setContent.call(this,errText)
}}},_createSubWidgets:function(){var rootNode=this.containerNode||this.domNode;
try{dojo.parser.parse(rootNode,true)
}catch(e){this._onError("Content",e,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(e){},onUnload:function(e){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(error){},onDownloadError:function(error){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(formContents){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(e){dojo.stopEvent(e);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(obj){var map={};
dojo.forEach(this.getDescendants(),function(widget){if(!widget.name){return 
}var entry=map[widget.name]||(map[widget.name]=[]);
entry.push(widget)
});
for(var name in map){var widgets=map[name],values=dojo.getObject(name,false,obj);
if(!dojo.isArray(values)){values=[values]
}if(widgets[0].setChecked){dojo.forEach(widgets,function(w,i){w.setChecked(dojo.indexOf(values,w.value)!=-1)
})
}else{dojo.forEach(widgets,function(w,i){w.setValue(values[i])
})
}}},getValues:function(){var obj={};
dojo.forEach(this.getDescendants(),function(widget){var value=widget.getValue?widget.getValue():widget.value;
var name=widget.name;
if(!name){return 
}if(widget.setChecked){if(/Radio/.test(widget.declaredClass)){if(widget.checked){dojo.setObject(name,value,obj)
}}else{var ary=dojo.getObject(name,false,obj);
if(!ary){ary=[];
dojo.setObject(name,ary,obj)
}if(widget.checked){ary.push(value)
}}}else{dojo.setObject(name,value,obj)
}});
return obj
},isValid:function(){return dojo.every(this.getDescendants(),function(widget){return !widget.isValid||widget.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var viewport=dijit.getViewport();
var is=this.node.style,os=this.domNode.style;
os.top=viewport.t+"px";
os.left=viewport.l+"px";
is.width=viewport.w+"px";
is.height=viewport.h+"px";
var viewport2=dijit.getViewport();
if(viewport.w!=viewport2.w){is.width=viewport2.w+"px"
}if(viewport.h!=viewport2.h){is.height=viewport2.h+"px"
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
var node=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:node,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:node,duration:this.duration,onEnd:function(){node.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var viewport=dijit.getViewport();
var mb=dojo.marginBox(this.domNode);
var style=this.domNode.style;
style.left=Math.floor((viewport.l+(viewport.w-mb.w)/2))+"px";
style.top=Math.floor((viewport.t+(viewport.h-mb.h)/2))+"px"
},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(evt){if(evt.keyCode){var node=evt.target;
if(node==this.titleBar&&evt.shiftKey&&evt.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(evt)
}else{while(node){if(node==this.domNode){if(evt.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}node=node.parentNode
}if(evt.keyCode!=dojo.keys.TAB){dojo.stopEvent(evt)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(e){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,ev,this,"_findLastFocus"));
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
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,ev,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(corner){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(corner.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(corner.charAt(0)=="T"?"Below":"Above")
},onOpen:function(pos){this.orient(pos.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(evt){if(evt.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(evt.target==this.containerNode&&evt.shiftKey&&evt.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(evt)
}else{if(evt.keyCode==dojo.keys.TAB){evt.stopPropagation()
}}}},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit._editor.selection"]){dojo._hasResource["dijit._editor.selection"]=true;
dojo.provide("dijit._editor.selection");
dojo.mixin(dijit._editor.selection,{getType:function(){if(dojo.doc.selection){return dojo.doc.selection.type.toLowerCase()
}else{var stype="text";
var oSel;
try{oSel=dojo.global.getSelection()
}catch(e){}if(oSel&&oSel.rangeCount==1){var oRange=oSel.getRangeAt(0);
if((oRange.startContainer==oRange.endContainer)&&((oRange.endOffset-oRange.startOffset)==1)&&(oRange.startContainer.nodeType!=3)){stype="control"
}}return stype
}},getSelectedText:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().text
}else{var selection=dojo.global.getSelection();
if(selection){return selection.toString()
}}},getSelectedHtml:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().htmlText
}else{var selection=dojo.global.getSelection();
if(selection&&selection.rangeCount){var frag=selection.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var range=dojo.doc.selection.createRange();
if(range&&range.item){return dojo.doc.selection.createRange().item(0)
}}else{var selection=dojo.global.getSelection();
return selection.anchorNode.childNodes[selection.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var p=this.getSelectedElement();
if(p){return p.parentNode
}}else{if(dojo.doc.selection){return dojo.doc.selection.createRange().parentElement()
}else{var selection=dojo.global.getSelection();
if(selection){var node=selection.anchorNode;
while(node&&(node.nodeType!=1)){node=node.parentNode
}return node
}}}},hasAncestorElement:function(tagName){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(tagName){var node=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(node,arguments)
},isTag:function(node,tags){if(node&&node.tagName){var _nlc=node.tagName.toLowerCase();
for(var i=0;
i<tags.length;
i++){var _tlc=String(tags[i]).toLowerCase();
if(_nlc==_tlc){return _tlc
}}}return""
},getParentOfType:function(node,tags){while(node){if(this.isTag(node,tags).length){return node
}node=node.parentNode
}return null
},remove:function(){var _s=dojo.doc.selection;
if(_s){if(_s.type.toLowerCase()!="none"){_s.clear()
}return _s
}else{_s=dojo.global.getSelection();
_s.deleteFromDocument();
return _s
}},selectElementChildren:function(element,nochangefocus){var _window=dojo.global;
var _document=dojo.doc;
element=dojo.byId(element);
if(_document.selection&&dojo.body().createTextRange){var range=element.ownerDocument.body.createTextRange();
range.moveToElementText(element);
if(!nochangefocus){range.select()
}}else{if(_window.getSelection){var selection=_window.getSelection();
if(selection.setBaseAndExtent){selection.setBaseAndExtent(element,0,element,element.innerText.length-1)
}else{if(selection.selectAllChildren){selection.selectAllChildren(element)
}}}}},selectElement:function(element,nochangefocus){var _document=dojo.doc;
element=dojo.byId(element);
if(_document.selection&&dojo.body().createTextRange){try{var range=dojo.body().createControlRange();
range.addElement(element);
if(!nochangefocus){range.select()
}}catch(e){this.selectElementChildren(element,nochangefocus)
}}else{if(dojo.global.getSelection){var selection=dojo.global.getSelection();
if(selection.removeAllRanges){var range=_document.createRange();
range.selectNode(element);
selection.removeAllRanges();
selection.addRange(range)
}}}}})
}if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var savetextarea=dojo.doc.createElement("textarea");
savetextarea.id="dijit._editor.RichText.savedContent";
var s=savetextarea.style;
s.display="none";
s.position="absolute";
s.top="-100px";
s.left="-100px";
s.height="3px";
s.width="3px";
dojo.body().appendChild(savetextarea)
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
},setupDefaultShortcuts:function(){var ctrl=this.KEY_CTRL;
var exec=function(cmd,arg){return arguments.length==1?function(){this.execCommand(cmd)
}:function(){this.execCommand(cmd,arg)
}
};
this.addKeyHandler("b",ctrl,exec("bold"));
this.addKeyHandler("i",ctrl,exec("italic"));
this.addKeyHandler("u",ctrl,exec("underline"));
this.addKeyHandler("a",ctrl,exec("selectall"));
this.addKeyHandler("s",ctrl,function(){this.save(true)
});
this.addKeyHandler("1",ctrl,exec("formatblock","h1"));
this.addKeyHandler("2",ctrl,exec("formatblock","h2"));
this.addKeyHandler("3",ctrl,exec("formatblock","h3"));
this.addKeyHandler("4",ctrl,exec("formatblock","h4"));
this.addKeyHandler("\\",ctrl,exec("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",ctrl,exec("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var formats=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var localhtml="",format,i=0;
while((format=formats[i++])){if(format.charAt(1)!="l"){localhtml+="<"+format+"><span>content</span></"+format+">"
}else{localhtml+="<"+format+"><li>content</li></"+format+">"
}}var div=document.createElement("div");
div.style.position="absolute";
div.style.left="-2000px";
div.style.top="-2000px";
document.body.appendChild(div);
div.innerHTML=localhtml;
var node=div.firstChild;
while(node){dijit._editor.selection.selectElement(node.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[node.firstChild]);
var nativename=node.tagName.toLowerCase();
this._local2NativeFormatNames[nativename]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[nativename]]=nativename;
node=node.nextSibling
}document.body.removeChild(div)
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
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(html){var _cs=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){html="<div>"+html+"</div>"
}var font=[_cs.fontWeight,_cs.fontSize,_cs.fontFamily].join(" ");
var lineHeight=_cs.lineHeight;
if(lineHeight.indexOf("px")>=0){lineHeight=parseFloat(lineHeight)/parseFloat(_cs.fontSize)
}else{if(lineHeight.indexOf("em")>=0){lineHeight=parseFloat(lineHeight)
}else{lineHeight="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",font,";","	min-height:",this.minHeight,";","	line-height:",lineHeight,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+html+"</body></html>"].join("")
},_drawIframe:function(html){if(!this.iframe){var ifr=this.iframe=dojo.doc.createElement("iframe");
var ifrs=ifr.style;
ifrs.border="none";
ifrs.lineHeight="0";
ifrs.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var label=dojo.query('label[for="'+this.id+'"]');
if(label.length){this._localizedIframeTitles.iframeEditTitle=label[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var tmpContent=this.srcNodeRef
}else{var tmpContent=dojo.doc.createElement("div");
tmpContent.style.display="none";
tmpContent.innerHTML=html;
this.editingArea.appendChild(tmpContent)
}this.editingArea.appendChild(this.iframe);
var _iframeInitialized=false;
var contentDoc=this.iframe.contentDocument;
contentDoc.open();
contentDoc.write(this._getIframeDocTxt(html));
contentDoc.close();
var ifrFunc=dojo.hitch(this,function(){if(!_iframeInitialized){_iframeInitialized=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(e){setTimeout(ifrFunc,500);
_iframeInitialized=false;
return 
}dojo._destroyElement(tmpContent);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(tmpContent);
this.editNode.innerHTML=html;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
ifrFunc()
},_applyEditingAreaStyleSheets:function(){var files=[];
if(this.styleSheets){files=this.styleSheets.split(";");
this.styleSheets=""
}files=files.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var text="",i=0,url;
while((url=files[i++])){var abstring=(new dojo._Url(dojo.global.location,url)).toString();
this.editingAreaStyleSheets.push(abstring);
text+='<link rel="stylesheet" type="text/css" href="'+abstring+'"/>'
}return text
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
}},removeStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new dojo._Url(dojo.global.location,url)).toString()
}var index=dojo.indexOf(this.editingAreaStyleSheets,url);
if(index==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+url+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[index];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+url+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(disabled){if(dojo.isIE||dojo.isSafari||dojo.isOpera){this.editNode.contentEditable=!disabled
}else{if(disabled){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(disabled?"off":"on");
if(!disabled){dojo.forEach(this._mozSettingProps,function(s,i){this.document.execCommand(s,false,this._mozSettings[i])
},this)
}}this.disabled=disabled
},_isResized:function(){return false
},onLoad:function(e){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var events=this.events.concat(this.captureEvents),i=0,et;
while((et=events[i++])){this.connect(this.document,et.toLowerCase(),et)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(e2){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(e);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},onKeyDown:function(e){if(dojo.isIE){if(e.keyCode===dojo.keys.BACKSPACE&&this.document.selection.type==="Control"){dojo.stopEvent(e);
this.execCommand("delete")
}else{if((65<=e.keyCode&&e.keyCode<=90)||(e.keyCode>=37&&e.keyCode<=40)){e.charCode=e.keyCode;
this.onKeyPress(e)
}}}else{if(dojo.isMoz){if(e.keyCode==dojo.keys.TAB&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(e)
}else{if(e.keyCode==dojo.keys.TAB&&e.shiftKey){if(this.toolbar){this.toolbar.focus()
}dojo.stopEvent(e)
}}}}},onKeyUp:function(e){return 
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(e){var modifiers=e.ctrlKey?this.KEY_CTRL:0|e.shiftKey?this.KEY_SHIFT:0;
var key=e.keyChar||e.keyCode;
if(this._keyHandlers[key]){var handlers=this._keyHandlers[key],i=0,h;
while((h=handlers[i++])){if(modifiers==h.modifiers){if(!h.handler.apply(this,arguments)){e.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(e)
}),1)
},addKeyHandler:function(key,modifiers,handler){if(!dojo.isArray(this._keyHandlers[key])){this._keyHandlers[key]=[]
}this._keyHandlers[key].push({modifiers:modifiers||0,handler:handler})
},onKeyPressed:function(e){this.onDisplayChanged()
},onClick:function(e){this.onDisplayChanged(e)
},_onBlur:function(e){var _c=this.getValue(true);
if(_c!=this.savedContent){this.onChange(_c);
this.savedContent=_c
}if(dojo.isMoz&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeEditTitle
}},_initialFocus:true,_onFocus:function(e){if((dojo.isMoz)&&(this._initialFocus)){this._initialFocus=false;
if(this.editNode.innerHTML.replace(/^\s+|\s+$/g,"")=="&nbsp;"){this.placeCursorAtStart()
}}},blur:function(){if(this.iframe){this.window.blur()
}else{if(this.editNode){this.editNode.blur()
}}},focus:function(){if(this.iframe&&!dojo.isIE){dijit.focus(this.iframe)
}else{if(this.editNode&&this.editNode.focus){dijit.focus(this.editNode)
}else{console.debug("Have no idea how to focus into the editor!")
}}},updateInterval:200,_updateTimer:null,onDisplayChanged:function(e){if(!this._updateTimer){if(this._updateTimer){clearTimeout(this._updateTimer)
}this._updateTimer=setTimeout(dojo.hitch(this,this.onNormalizedDisplayChanged),this.updateInterval)
}},onNormalizedDisplayChanged:function(){this._updateTimer=null
},onChange:function(newContent){},_normalizeCommand:function(cmd){var command=cmd.toLowerCase();
if(command=="formatblock"){if(dojo.isSafari){command="heading"
}}else{if(command=="hilitecolor"&&!dojo.isMoz){command="backcolor"
}}return command
},queryCommandAvailable:function(command){var ie=1;
var mozilla=1<<1;
var safari=1<<2;
var opera=1<<3;
var safari420=1<<4;
var gt420=dojo.isSafari;
function isSupportedBy(browsers){return{ie:Boolean(browsers&ie),mozilla:Boolean(browsers&mozilla),safari:Boolean(browsers&safari),safari420:Boolean(browsers&safari420),opera:Boolean(browsers&opera)}
}var supportedBy=null;
switch(command.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":supportedBy=isSupportedBy(mozilla|ie|safari|opera);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":supportedBy=isSupportedBy(mozilla|ie|opera|safari420);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":supportedBy=isSupportedBy(ie);
break;
case"cut":case"copy":case"paste":supportedBy=isSupportedBy(ie|mozilla|safari420);
break;
case"inserttable":supportedBy=isSupportedBy(mozilla|ie);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":supportedBy=isSupportedBy(ie|mozilla);
break;
default:return false
}return(dojo.isIE&&supportedBy.ie)||(dojo.isMoz&&supportedBy.mozilla)||(dojo.isSafari&&supportedBy.safari)||(gt420&&supportedBy.safari420)||(dojo.isOpera&&supportedBy.opera)
},execCommand:function(command,argument){var returnValue;
this.focus();
command=this._normalizeCommand(command);
if(argument!=undefined){if(command=="heading"){throw new Error("unimplemented")
}else{if((command=="formatblock")&&dojo.isIE){argument="<"+argument+">"
}}}if(command=="inserthtml"){argument=this._preFilterContent(argument);
if(dojo.isIE){var insertRange=this.document.selection.createRange();
insertRange.pasteHTML(argument);
insertRange.select();
returnValue=true
}else{if(dojo.isMoz&&!argument.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
returnValue=true
}else{returnValue=this.document.execCommand(command,false,argument)
}}}else{if((command=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var selection=this.window.getSelection();
var a=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[a]);
returnValue=this.document.execCommand("unlink",false,null)
}else{if((command=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
returnValue=this.document.execCommand(command,false,argument);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((command=="backcolor")||(command=="forecolor"))){argument=arguments.length>1?argument:null;
returnValue=this.document.execCommand(command,false,argument)
}else{argument=arguments.length>1?argument:null;
if(argument||command!="createlink"){returnValue=this.document.execCommand(command,false,argument)
}}}}}this.onDisplayChanged();
return returnValue
},queryCommandEnabled:function(command){command=this._normalizeCommand(command);
if(dojo.isMoz||dojo.isSafari){if(command=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(command=="inserttable"){return true
}}}if(dojo.isSafari){if(command=="copy"){command="cut"
}else{if(command=="paste"){return true
}}}var elem=(dojo.isIE)?this.document.selection.createRange():this.document;
return elem.queryCommandEnabled(command)
},queryCommandState:function(command){command=this._normalizeCommand(command);
return this.document.queryCommandState(command)
},queryCommandValue:function(command){command=this._normalizeCommand(command);
if(dojo.isIE&&command=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(command)]
}return this.document.queryCommandValue(command)
},placeCursorAtStart:function(){this.focus();
var isvalid=false;
if(dojo.isMoz){var first=this.editNode.firstChild;
while(first){if(first.nodeType==3){if(first.nodeValue.replace(/^\s+|\s+$/g,"").length>0){isvalid=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[first]);
break
}}else{if(first.nodeType==1){isvalid=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[first]);
break
}}first=first.nextSibling
}}else{isvalid=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(isvalid){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var isvalid=false;
if(dojo.isMoz){var last=this.editNode.lastChild;
while(last){if(last.nodeType==3){if(last.nodeValue.replace(/^\s+|\s+$/g,"").length>0){isvalid=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[last]);
break
}}else{if(last.nodeType==1){isvalid=true;
if(last.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[last.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[last])
}break
}}last=last.previousSibling
}}else{isvalid=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(isvalid){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
}},getValue:function(nonDestructive){if(this.textarea){if(this.isClosed||!this.isLoaded){return this.textarea.value
}}return this._postFilterContent(null,nonDestructive)
},setValue:function(html){if(this.textarea&&(this.isClosed||!this.isLoaded)){this.textarea.value=html
}else{html=this._preFilterContent(html);
if(this.isClosed){this.domNode.innerHTML=html;
this._preDomFilterContent(this.domNode)
}else{this.editNode.innerHTML=html;
this._preDomFilterContent(this.editNode)
}}},replaceValue:function(html){if(this.isClosed){this.setValue(html)
}else{if(this.window&&this.window.getSelection&&!dojo.isMoz){this.setValue(html)
}else{if(this.window&&this.window.getSelection){html=this._preFilterContent(html);
this.execCommand("selectall");
if(dojo.isMoz&&!html){html="&nbsp;"
}this.execCommand("inserthtml",html);
this._preDomFilterContent(this.editNode)
}else{if(this.document&&this.document.selection){this.setValue(html)
}}}}},_preFilterContent:function(html){var ec=html;
dojo.forEach(this.contentPreFilters,function(ef){if(ef){ec=ef(ec)
}});
return ec
},_preDomFilterContent:function(dom){dom=dom||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(ef){if(ef&&dojo.isFunction(ef)){ef(dom)
}},this)
},_postFilterContent:function(dom,nonDestructive){dom=dom||this.editNode;
if(this.contentDomPostFilters.length){if(nonDestructive&&dom.cloneNode){dom=dom.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(ef){dom=ef(dom)
})
}var ec=this.getNodeChildrenHtml(dom);
if(!ec.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){ec=""
}dojo.forEach(this.contentPostFilters,function(ef){ec=ef(ec)
});
return ec
},_saveContent:function(e){var saveTextarea=dojo.byId("dijit._editor.RichText.savedContent");
saveTextarea.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(str,noSingleQuotes){str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!noSingleQuotes){str=str.replace(/'/gm,"&#39;")
}return str
},getNodeHtml:function(node){switch(node.nodeType){case 1:var output="<"+node.tagName.toLowerCase();
if(dojo.isMoz){if(node.getAttribute("type")=="_moz"){node.removeAttribute("type")
}if(node.getAttribute("_moz_dirty")!=undefined){node.removeAttribute("_moz_dirty")
}}var attrarray=[];
if(dojo.isIE){var s=node.outerHTML;
s=s.substr(0,s.indexOf(">"));
s=s.replace(/(?:['"])[^"']*\1/g,"");
var reg=/([^\s=]+)=/g;
var m,key;
while((m=reg.exec(s))!=undefined){key=m[1];
if(key.substr(0,3)!="_dj"){if(key=="src"||key=="href"){if(node.getAttribute("_djrealurl")){attrarray.push([key,node.getAttribute("_djrealurl")]);
continue
}}if(key=="class"){attrarray.push([key,node.className])
}else{attrarray.push([key,node.getAttribute(key)])
}}}}else{var attr,i=0,attrs=node.attributes;
while((attr=attrs[i++])){if(attr.name.substr(0,3)!="_dj"){var v=attr.value;
if(attr.name=="src"||attr.name=="href"){if(node.getAttribute("_djrealurl")){v=node.getAttribute("_djrealurl")
}}attrarray.push([attr.name,v])
}}}attrarray.sort(function(a,b){return a[0]<b[0]?-1:(a[0]==b[0]?0:1)
});
i=0;
while((attr=attrarray[i++])){output+=" "+attr[0]+'="'+attr[1]+'"'
}if(node.childNodes.length){output+=">"+this.getNodeChildrenHtml(node)+"</"+node.tagName.toLowerCase()+">"
}else{output+=" />"
}break;
case 3:var output=this.escapeXml(node.nodeValue,true);
break;
case 8:var output="<!--"+this.escapeXml(node.nodeValue,true)+"-->";
break;
default:var output="Element not recognized - Type: "+node.nodeType+" Name: "+node.nodeName
}return output
},getNodeChildrenHtml:function(dom){var out="";
if(!dom){return out
}var nodes=dom.childNodes||dom;
var i=0;
var node;
while((node=nodes[i++])){out+=this.getNodeHtml(node)
}return out
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
},_fixContentForMoz:function(html){html=html.replace(/<(\/)?strong([ \>])/gi,"<$1b$2");
html=html.replace(/<(\/)?em([ \>])/gi,"<$1i$2");
return html
},_srcInImgRegex:/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,_hrefInARegex:/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,_preFixUrlAttributes:function(html){html=html.replace(this._hrefInARegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
html=html.replace(this._srcInImgRegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
return html
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
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\r\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\r\n\t><div class=\'dijitRight\'\r\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\r\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\r\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \r\n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \r\n\t\t\t></span\r\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\r\n\t\t></button\r\n\t></div\r\n></div>\r\n',_onClick:function(e){if(this.disabled){return false
}this._clicked();
return this.onClick(e)
},_onButtonClick:function(e){dojo.stopEvent(e);
var okToSubmit=this._onClick(e)!==false;
if(this.type=="submit"&&okToSubmit){for(var node=this.domNode;
node;
node=node.parentNode){var widget=dijit.byNode(node);
if(widget&&widget._onSubmit){widget._onSubmit(e);
break
}if(node.tagName.toLowerCase()=="form"){if(!node.onsubmit||node.onsubmit()){node.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var labelText="";
this.label=this.containerNode.innerHTML;
labelText=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=labelText;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(e){return true
},_clicked:function(e){},setLabel:function(content){this.containerNode.innerHTML=this.label=content;
if(dojo.isMozilla){var oldDisplay=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var _this=this;
setTimeout(function(){_this.domNode.style.display=oldDisplay
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\r\n\t><div class=\'dijitRight\'>\r\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\r\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\r\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\r\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\r\n\t\tid="${id}_label">${label}</span\r\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\r\n\t</button>\r\n</div></div>\r\n',_fillContent:function(){if(this.srcNodeRef){var nodes=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,nodes[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var dropDownNode=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(dropDownNode);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(e){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(e){var isMacFFlessThan3=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!isMacFFlessThan3||e.detail!=0||this._seenKeydown){this._onArrowClick(e)
}this._seenKeydown=false
},_onDropDownKeydown:function(e){this._seenKeydown=true
},_onDropDownBlur:function(e){this._seenKeydown=false
},_onKey:function(e){if(this.disabled){return 
}if(e.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(e);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var dropDown=this.dropDown;
if(!dropDown){return false
}if(!dropDown.isShowingNow){if(dropDown.href&&!dropDown.isLoaded){var self=this;
var handler=dojo.connect(dropDown,"onLoad",function(){dojo.disconnect(handler);
self._openDropDown()
});
dropDown._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var dropDown=this.dropDown;
var oldWidth=dropDown.domNode.style.width;
var self=this;
dijit.popup.open({parent:this,popup:dropDown,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){self._closeDropDown(true)
},onCancel:function(){self._closeDropDown(true)
},onClose:function(){dropDown.domNode.style.width=oldWidth;
self.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>dropDown.domNode.offsetWidth){var adjustNode=null;
if(!this.isLeftToRight()){adjustNode=dropDown.domNode.parentNode;
var oldRight=adjustNode.offsetLeft+adjustNode.offsetWidth
}dojo.marginBox(dropDown.domNode,{w:this.domNode.offsetWidth});
if(adjustNode){adjustNode.style.left=oldRight-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(dropDown.focus){dropDown.focus()
}},_closeDropDown:function(focus){if(this._opened){dijit.popup.close(this.dropDown);
if(focus){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\r\n\tcellspacing=\'0\' cellpadding=\'0\'\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\r\n\t<tr>\r\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\r\n\t\t\ttabIndex="${tabIndex}"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\r\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\r\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\r\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\r\n\t\t</td>\r\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\r\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\r\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\r\n\t\t\tstateModifier="DownArrow"\r\n\t\t\ttitle="${optionsTitle}" name="${name}"\r\n\t\t\twaiRole="button" waiState="haspopup-true"\r\n\t\t><div waiRole="presentation">&#9660;</div>\r\n\t</td></tr>\r\n</table>\r\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(node){if(dojo.isIE){this.connect(node,"onactivate",this._onNodeFocus)
}else{this.connect(node,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(node){this._focusedNode=node;
dijit.focus(node)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(evt){this._focusedNode=evt.currentTarget
},_onBlur:function(evt){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(evt){this.setChecked(!this.checked)
},setChecked:function(checked){this.checked=checked;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(checked)
}})
}if(!dojo._hasResource["dijit._editor._Plugin"]){dojo._hasResource["dijit._editor._Plugin"]=true;
dojo.provide("dijit._editor._Plugin");
dojo.declare("dijit._editor._Plugin",null,{constructor:function(args,node){if(args){dojo.mixin(this,args)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var label=this.editor.commands[this.command];
var className="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var props={label:label,showLabel:false,iconClass:className,dropDown:this.dropDown};
this.button=new this.buttonClass(props)
}}},updateState:function(){var _e=this.editor;
var _c=this.command;
if(!_e){return 
}if(!_e.isLoaded){return 
}if(!_c.length){return 
}if(this.button){try{var enabled=_e.queryCommandEnabled(_c);
this.button.setDisabled(!enabled);
if(this.button.setChecked){this.button.setChecked(_e.queryCommandState(_c))
}}catch(e){console.debug(e)
}}},setEditor:function(editor){this.editor=editor;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){dojo.connect(this.button,"onClick",dojo.hitch(this.editor,"execCommand",this.command,this.commandArg))
}dojo.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(toolbar){if(this.button){toolbar.addChild(this.button)
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
if(!this.toolbar){var toolbarNode=dojo.doc.createElement("div");
dojo.place(toolbarNode,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},toolbarNode)
}dojo.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){dojo.forEach(this._plugins,function(p){if(p.destroy){p.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(plugin,index){var args=dojo.isString(plugin)?{name:plugin}:plugin;
if(!args.setEditor){var o={args:args,plugin:null,editor:this};
dojo.publish("dijit.Editor.getPlugin",[o]);
if(!o.plugin){var pc=dojo.getObject(args.name);
if(pc){o.plugin=new pc(args)
}}if(!o.plugin){console.debug("Cannot find plugin",plugin);
return 
}plugin=o.plugin
}if(arguments.length>1){this._plugins[index]=plugin
}else{this._plugins.push(plugin)
}plugin.setEditor(this);
if(dojo.isFunction(plugin.setToolbar)){plugin.setToolbar(this.toolbar)
}},customUndo:dojo.isIE,editActionInterval:3,beginEditing:function(cmd){if(!this._inEditing){this._inEditing=true;
this._beginEditing(cmd)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(dojo.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(cmd){if(this.customUndo&&(cmd=="undo"||cmd=="redo")){return this[cmd]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var r=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return r
}catch(e){if(dojo.isMoz&&/copy|cut|paste/.test(cmd)){var sub=dojo.string.substitute,accel={cut:"X",copy:"C",paste:"V"},isMac=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(sub(this.commands.systemShortcutFF,[this.commands[cmd],sub(this.commands[isMac?"appleKey":"ctrlKey"],[accel[cmd]])]))
}return false
}}},queryCommandEnabled:function(cmd){if(this.customUndo&&(cmd=="undo"||cmd=="redo")){return cmd=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(from,to){this.setValue(to.text);
var b=to.bookmark;
if(!b){return 
}if(dojo.isIE){if(dojo.isArray(b)){var tmp=[];
dojo.forEach(b,function(n){tmp.push(dijit.range.getNode(n,this.editNode))
},this);
b=tmp
}}else{var r=dijit.range.create();
r.setStart(dijit.range.getNode(b.startContainer,this.editNode),b.startOffset);
r.setEnd(dijit.range.getNode(b.endContainer,this.editNode),b.endOffset);
b=r
}dojo.withGlobal(this.window,"moveToBookmark",dijit,[b])
},undo:function(){this.endEditing(true);
var s=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(s,this._steps[this._steps.length-1]);
this._undoedSteps.push(s);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var s=this._undoedSteps.pop();
if(s&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],s);
this._steps.push(s);
this.onDisplayChanged();
return true
}return false
},endEditing:function(ignore_caret){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(ignore_caret);
this._inEditing=false
}},_getBookmark:function(){var b=dojo.withGlobal(this.window,dijit.getBookmark);
if(dojo.isIE){if(dojo.isArray(b)){var tmp=[];
dojo.forEach(b,function(n){tmp.push(dijit.range.getIndex(n,this.editNode).o)
},this);
b=tmp
}}else{var tmp=dijit.range.getIndex(b.startContainer,this.editNode).o;
b={startContainer:tmp,startOffset:b.startOffset,endContainer:b.endContainer===b.startContainer?tmp:dijit.range.getIndex(b.endContainer,this.editNode).o,endOffset:b.endOffset}
}return b
},_beginEditing:function(cmd){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(ignore_caret){var v=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:v,bookmark:this._getBookmark()})
},onKeyDown:function(e){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var k=e.keyCode,ks=dojo.keys;
if(e.ctrlKey){if(k===90||k===122){dojo.stopEvent(e);
this.undo();
return 
}else{if(k===89||k===121){dojo.stopEvent(e);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(k){case ks.ENTER:this.beginEditing();
break;
case ks.BACKSPACE:case ks.DELETE:this.beginEditing();
break;
case 88:case 86:if(e.ctrlKey&&!e.altKey&&!e.metaKey){this.endEditing();
if(e.keyCode==88){this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1)
}break
}default:if(!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.keyCode<dojo.keys.F1||e.keyCode>dojo.keys.F15)){this.beginEditing();
break
}case ks.ALT:this.endEditing();
break;
case ks.UP_ARROW:case ks.DOWN_ARROW:case ks.LEFT_ARROW:case ks.RIGHT_ARROW:case ks.HOME:case ks.END:case ks.PAGE_UP:case ks.PAGE_DOWN:this.endEditing(true);
break;
case ks.CTRL:case ks.SHIFT:case ks.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
dojo.subscribe("dijit.Editor.getPlugin",null,function(o){if(o.plugin){return 
}var args=o.args,p;
var _p=dijit._editor._Plugin;
var name=args.name;
switch(name){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":p=new _p({command:name});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":p=new _p({buttonClass:dijit.form.ToggleButton,command:name});
break;
case"|":p=new _p({button:new dijit.ToolbarSeparator()});
break;
case"createLink":p=new dijit._editor.plugins.LinkDialog({command:name});
break;
case"foreColor":case"hiliteColor":p=new dijit._editor.plugins.TextColor({command:name});
break;
case"fontName":case"fontSize":case"formatBlock":p=new dijit._editor.plugins.FontChoice({command:name})
}o.plugin=p
})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(child){child.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(closeAll){},_moveToPopup:function(evt){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(evt)
}},_onKeyPress:function(evt){if(evt.ctrlKey||evt.altKey){return 
}switch(evt.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(evt);
dojo.stopEvent(evt);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(evt)
}break
}},onItemHover:function(item){this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(item){dijit.popup.close(item.popup);
item._blur();
this._stopPopupTimer()
},onItemUnhover:function(item){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var top=this;
top.parentMenu;
top=top.parentMenu){}return top
},onItemClick:function(item){if(item.disabled){return false
}if(item.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
item.onClick()
}},_iframeContentWindow:function(iframe_el){var win=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(iframe_el))||dijit.Menu._iframeContentDocument(iframe_el)["__parent__"]||(iframe_el.name&&document.frames[iframe_el.name])||null;
return win
},_iframeContentDocument:function(iframe_el){var doc=iframe_el.contentDocument||(iframe_el.contentWindow&&iframe_el.contentWindow.document)||(iframe_el.name&&document.frames[iframe_el.name]&&document.frames[iframe_el.name].document)||null;
return doc
},bindDomNode:function(node){node=dojo.byId(node);
var win=dijit.getDocumentWindow(node.ownerDocument);
if(node.tagName.toLowerCase()=="iframe"){win=this._iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body)
}var cn=(node==dojo.body()?dojo.doc:node);
node[this.id]=this._bindings.push([dojo.connect(cn,"oncontextmenu",this,"_openMyself"),dojo.connect(cn,"onkeydown",this,"_contextKey"),dojo.connect(cn,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(nodeName){var node=dojo.byId(nodeName);
var bid=node[this.id]-1,b=this._bindings[bid];
dojo.forEach(b,dojo.disconnect);
delete this._bindings[bid]
},_contextKey:function(e){this._contextMenuWithMouse=false;
if(e.keyCode==dojo.keys.F10){dojo.stopEvent(e);
if(e.shiftKey&&e.type=="keydown"){var _e={target:e.target,pageX:e.pageX,pageY:e.pageY};
_e.preventDefault=_e.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(_e)
}),1)
}}},_contextMouse:function(e){this._contextMenuWithMouse=true
},_openMyself:function(e){dojo.stopEvent(e);
var x,y;
if(dojo.isSafari||this._contextMenuWithMouse){x=e.pageX;
y=e.pageY
}else{var coords=dojo.coords(e.target,true);
x=coords.x+10;
y=coords.y+10
}var self=this;
var savedFocus=dijit.getFocus(this);
function closeAndRestoreFocus(){dijit.focus(savedFocus);
dijit.popup.close(self)
}dijit.popup.open({popup:this,x:x,y:y,onExecute:closeAndRestoreFocus,onCancel:closeAndRestoreFocus,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(e){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var from_item=this.focusedChild;
var popup=from_item.popup;
if(popup.isShowingNow){return 
}popup.parentMenu=this;
var self=this;
dijit.popup.open({parent:this,popup:popup,around:from_item.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(popup);
from_item.focus();
self.currentPopup=null
}});
this.currentPopup=popup;
if(popup.focus){popup.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(evt){this.getParent().onItemClick(this);
dojo.stopEvent(evt)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(e){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(value){this.disabled=value;
dojo[value?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",value?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var nodes=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,nodes[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var node=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(node)
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
dojo.regexp.escapeString=function(str,except){return str.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(ch){if(except&&except.indexOf(ch)!=-1){return ch
}return"\\"+ch
})
};
dojo.regexp.buildGroupRE=function(arr,re,nonCapture){if(!(arr instanceof Array)){return re(arr)
}var b=[];
for(var i=0;
i<arr.length;
i++){b.push(re(arr[i]))
}return dojo.regexp.group(b.join("|"),nonCapture)
};
dojo.regexp.group=function(expression,nonCapture){return"("+(nonCapture?"?:":"")+expression+")"
}
}if(!dojo._hasResource["dojo.number"]){dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.number.format=function(value,options){options=dojo.mixin({},options||{});
var locale=dojo.i18n.normalizeLocale(options.locale);
var bundle=dojo.i18n.getLocalization("dojo.cldr","number",locale);
options.customs=bundle;
var pattern=options.pattern||bundle[(options.type||"decimal")+"Format"];
if(isNaN(value)){return null
}return dojo.number._applyPattern(value,pattern,options)
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(value,pattern,options){options=options||{};
var group=options.customs.group;
var decimal=options.customs.decimal;
var patternList=pattern.split(";");
var positivePattern=patternList[0];
pattern=patternList[(value<0)?1:0]||("-"+positivePattern);
if(pattern.indexOf("%")!=-1){value*=100
}else{if(pattern.indexOf("\u2030")!=-1){value*=1000
}else{if(pattern.indexOf("\u00a4")!=-1){group=options.customs.currencyGroup||group;
decimal=options.customs.currencyDecimal||decimal;
pattern=pattern.replace(/\u00a4{1,3}/,function(match){var prop=["symbol","currency","displayName"][match.length-1];
return options[prop]||options.currency||""
})
}else{if(pattern.indexOf("E")!=-1){throw new Error("exponential notation not supported")
}}}}var numberPatternRE=dojo.number._numberPatternRE;
var numberPattern=positivePattern.match(numberPatternRE);
if(!numberPattern){throw new Error("unable to find a number expression in pattern: "+pattern)
}return pattern.replace(numberPatternRE,dojo.number._formatAbsolute(value,numberPattern[0],{decimal:decimal,group:group,places:options.places}))
};
dojo.number.round=function(value,places,multiple){var pieces=String(value).split(".");
var length=(pieces[1]&&pieces[1].length)||0;
if(length>places){var factor=Math.pow(10,places);
if(multiple>0){factor*=10/multiple;
places++
}value=Math.round(value*factor)/factor;
pieces=String(value).split(".");
length=(pieces[1]&&pieces[1].length)||0;
if(length>places){pieces[1]=pieces[1].substr(0,places);
value=Number(pieces.join("."))
}}return value
};
dojo.number._formatAbsolute=function(value,pattern,options){options=options||{};
if(options.places===true){options.places=0
}if(options.places===Infinity){options.places=6
}var patternParts=pattern.split(".");
var maxPlaces=(options.places>=0)?options.places:(patternParts[1]&&patternParts[1].length)||0;
if(!(options.round<0)){value=dojo.number.round(value,maxPlaces,options.round)
}var valueParts=String(Math.abs(value)).split(".");
var fractional=valueParts[1]||"";
if(options.places){valueParts[1]=dojo.string.pad(fractional.substr(0,options.places),options.places,"0",true)
}else{if(patternParts[1]&&options.places!==0){var pad=patternParts[1].lastIndexOf("0")+1;
if(pad>fractional.length){valueParts[1]=dojo.string.pad(fractional,pad,"0",true)
}var places=patternParts[1].length;
if(places<fractional.length){valueParts[1]=fractional.substr(0,places)
}}else{if(valueParts[1]){valueParts.pop()
}}}var patternDigits=patternParts[0].replace(",","");
pad=patternDigits.indexOf("0");
if(pad!=-1){pad=patternDigits.length-pad;
if(pad>valueParts[0].length){valueParts[0]=dojo.string.pad(valueParts[0],pad)
}if(patternDigits.indexOf("#")==-1){valueParts[0]=valueParts[0].substr(valueParts[0].length-pad)
}}var index=patternParts[0].lastIndexOf(",");
var groupSize,groupSize2;
if(index!=-1){groupSize=patternParts[0].length-index-1;
var remainder=patternParts[0].substr(0,index);
index=remainder.lastIndexOf(",");
if(index!=-1){groupSize2=remainder.length-index-1
}}var pieces=[];
for(var whole=valueParts[0];
whole;
){var off=whole.length-groupSize;
pieces.push((off>0)?whole.substr(off):whole);
whole=(off>0)?whole.slice(0,off):"";
if(groupSize2){groupSize=groupSize2;
delete groupSize2
}}valueParts[0]=pieces.reverse().join(options.group||",");
return valueParts.join(options.decimal||".")
};
dojo.number.regexp=function(options){return dojo.number._parseInfo(options).regexp
};
dojo.number._parseInfo=function(options){options=options||{};
var locale=dojo.i18n.normalizeLocale(options.locale);
var bundle=dojo.i18n.getLocalization("dojo.cldr","number",locale);
var pattern=options.pattern||bundle[(options.type||"decimal")+"Format"];
var group=bundle.group;
var decimal=bundle.decimal;
var factor=1;
if(pattern.indexOf("%")!=-1){factor/=100
}else{if(pattern.indexOf("\u2030")!=-1){factor/=1000
}else{var isCurrency=pattern.indexOf("\u00a4")!=-1;
if(isCurrency){group=bundle.currencyGroup||group;
decimal=bundle.currencyDecimal||decimal
}}}var patternList=pattern.split(";");
if(patternList.length==1){patternList.push("-"+patternList[0])
}var re=dojo.regexp.buildGroupRE(patternList,function(pattern){pattern="(?:"+dojo.regexp.escapeString(pattern,".")+")";
return pattern.replace(dojo.number._numberPatternRE,function(format){var flags={signed:false,separator:options.strict?group:[group,""],fractional:options.fractional,decimal:decimal,exponent:false};
var parts=format.split(".");
var places=options.places;
if(parts.length==1||places===0){flags.fractional=false
}else{if(typeof places=="undefined"){places=parts[1].lastIndexOf("0")+1
}if(places&&options.fractional==undefined){flags.fractional=true
}if(!options.places&&(places<parts[1].length)){places+=","+parts[1].length
}flags.places=places
}var groups=parts[0].split(",");
if(groups.length>1){flags.groupSize=groups.pop().length;
if(groups.length>1){flags.groupSize2=groups.pop().length
}}return"("+dojo.number._realNumberRegexp(flags)+")"
})
},true);
if(isCurrency){re=re.replace(/(\s*)(\u00a4{1,3})(\s*)/g,function(match,before,target,after){var prop=["symbol","currency","displayName"][target.length-1];
var symbol=dojo.regexp.escapeString(options[prop]||options.currency||"");
before=before?"\\s":"";
after=after?"\\s":"";
if(!options.strict){if(before){before+="*"
}if(after){after+="*"
}return"(?:"+before+symbol+after+")?"
}return before+symbol+after
})
}return{regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:group,decimal:decimal,factor:factor}
};
dojo.number.parse=function(expression,options){var info=dojo.number._parseInfo(options);
var results=(new RegExp("^"+info.regexp+"$")).exec(expression);
if(!results){return NaN
}var absoluteMatch=results[1];
if(!results[1]){if(!results[2]){return NaN
}absoluteMatch=results[2];
info.factor*=-1
}absoluteMatch=absoluteMatch.replace(new RegExp("["+info.group+"\\s\\xa0]","g"),"").replace(info.decimal,".");
return Number(absoluteMatch)*info.factor
};
dojo.number._realNumberRegexp=function(flags){flags=flags||{};
if(typeof flags.places=="undefined"){flags.places=Infinity
}if(typeof flags.decimal!="string"){flags.decimal="."
}if(typeof flags.fractional=="undefined"||/^0/.test(flags.places)){flags.fractional=[true,false]
}if(typeof flags.exponent=="undefined"){flags.exponent=[true,false]
}if(typeof flags.eSigned=="undefined"){flags.eSigned=[true,false]
}var integerRE=dojo.number._integerRegexp(flags);
var decimalRE=dojo.regexp.buildGroupRE(flags.fractional,function(q){var re="";
if(q&&(flags.places!==0)){re="\\"+flags.decimal;
if(flags.places==Infinity){re="(?:"+re+"\\d+)?"
}else{re+="\\d{"+flags.places+"}"
}}return re
},true);
var exponentRE=dojo.regexp.buildGroupRE(flags.exponent,function(q){if(q){return"([eE]"+dojo.number._integerRegexp({signed:flags.eSigned})+")"
}return""
});
var realRE=integerRE+decimalRE;
if(decimalRE){realRE="(?:(?:"+realRE+")|(?:"+decimalRE+"))"
}return realRE+exponentRE
};
dojo.number._integerRegexp=function(flags){flags=flags||{};
if(typeof flags.signed=="undefined"){flags.signed=[true,false]
}if(typeof flags.separator=="undefined"){flags.separator=""
}else{if(typeof flags.groupSize=="undefined"){flags.groupSize=3
}}var signRE=dojo.regexp.buildGroupRE(flags.signed,function(q){return q?"[-+]":""
},true);
var numberRE=dojo.regexp.buildGroupRE(flags.separator,function(sep){if(!sep){return"(?:0|[1-9]\\d*)"
}sep=dojo.regexp.escapeString(sep);
if(sep==" "){sep="\\s"
}else{if(sep=="\xa0"){sep="\\s\\xa0"
}}var grp=flags.groupSize,grp2=flags.groupSize2;
if(grp2){var grp2RE="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return((grp-grp2)>0)?"(?:"+grp2RE+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":grp2RE
}return"(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)"
},true);
return signRE+numberRE
}
}if(!dojo._hasResource["dijit.ProgressBar"]){dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(attributes){dojo.mixin(this,attributes||{});
var percent=1,classFunc;
if(this.indeterminate){classFunc="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{classFunc="removeClass";
if(String(this.progress).indexOf("%")!=-1){percent=Math.min(parseFloat(this.progress)/100,1);
this.progress=percent*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
percent=this.progress/this.maximum
}var text=this.report(percent);
this.label.firstChild.nodeValue=text;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}dojo[classFunc](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(percent*100)+"%";
this.onChange()
},report:function(percent){return dojo.number.format(percent,{type:"percent",places:this.places,locale:this.lang})
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
var hideNode=this.hideNode,wipeNode=this.wipeNode;
this._wipeIn=dojo.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){hideNode.style.display=""
}});
this._wipeOut=dojo.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){hideNode.style.display="none"
}})
},setContent:function(content){if(this._wipeOut.status()=="playing"){this.inherited("setContent",arguments)
}else{if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}dojo.marginBox(this.wipeNode,{h:dojo.marginBox(this.wipeNode).h});
this.inherited("setContent",arguments);
this._wipeIn.play()
}},toggle:function(){dojo.forEach([this._wipeIn,this._wipeOut],function(animation){if(animation.status()=="playing"){animation.stop()
}});
this[this.open?"_wipeOut":"_wipeIn"].play();
this.open=!this.open;
this._loadCheck();
this._setCss()
},_setCss:function(){var classes=["dijitClosed","dijitOpen"];
var boolIndex=this.open;
dojo.removeClass(this.focusNode,classes[!boolIndex+0]);
this.focusNode.className+=" "+classes[boolIndex+0];
this.arrowNodeInner.innerHTML=this.open?"-":"+"
},_onTitleKey:function(e){if(e.keyCode==dojo.keys.ENTER||e.charCode==dojo.keys.SPACE){this.toggle()
}else{if(e.keyCode==dojo.keys.DOWN_ARROW){if(this.open){this.containerNode.focus();
e.preventDefault()
}}}},_handleFocus:function(e){dojo[(e.type=="focus"?"addClass":"removeClass")](this.focusNode,this.baseClass+"Focused")
},setTitle:function(title){this.titleNode.innerHTML=title
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\r\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\r\n\t<div class="dijitTooltipConnector"></div>\r\n</div>\r\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(innerHTML,aroundNode){if(this.aroundNode&&this.aroundNode===aroundNode){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=innerHTML;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var align=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var pos=dijit.placeOnScreenAroundElement(this.domNode,aroundNode,align);
this.domNode.className="dijitTooltip dijitTooltip"+(pos.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=aroundNode
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(aroundNode){if(!this.aroundNode||this.aroundNode!==aroundNode){return 
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
dijit.showTooltip=function(innerHTML,aroundNode){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(innerHTML,aroundNode)
};
dijit.hideTooltip=function(aroundNode){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(aroundNode)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(id){var node=dojo.byId(id);
if(node){this._connectNodes.push(node);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(event){this.connect(node,event.toLowerCase(),"_"+event)
},this);
if(dojo.isIE){node.style.zoom=1
}}},this)
},_onMouseOver:function(e){this._onHover(e)
},_onMouseOut:function(e){if(dojo.isDescendant(e.relatedTarget,e.target)){return 
}this._onUnHover(e)
},_onFocus:function(e){this._focus=true;
this._onHover(e)
},_onBlur:function(e){this._focus=false;
this._onUnHover(e)
},_onHover:function(e){if(!this._showTimer){var target=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(target)
}),this.showDelay)
}},_onUnHover:function(e){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(target){target=target||this._connectNodes[0];
if(!target){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,target);
this._connectNode=target
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dojo.cookie"]){dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(name,value,props){var c=document.cookie;
if(arguments.length==1){var idx=c.lastIndexOf(name+"=");
if(idx==-1){return null
}var start=idx+name.length+1;
var end=c.indexOf(";",idx+name.length+1);
if(end==-1){end=c.length
}return decodeURIComponent(c.substring(start,end))
}else{props=props||{};
value=encodeURIComponent(value);
if(typeof (props.expires)=="number"){var d=new Date();
d.setTime(d.getTime()+(props.expires*24*60*60*1000));
props.expires=d
}document.cookie=name+"="+value+(props.expires?"; expires="+props.expires.toUTCString():"")+(props.path?"; path="+props.path:"")+(props.domain?"; domain="+props.domain:"")+(props.secure?"; secure":"");
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
},_updateItemClasses:function(item){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(item);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(item)
},_updateLayout:function(){var parent=this.getParent();
if(parent&&parent.isTree&&parent._hideRoot){dojo.addClass(this.domNode,"dijitTreeIsRoot")
}else{dojo.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(processing){var styles=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var idx=processing?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.forEach(styles,function(s){dojo.removeClass(this.expandoNode,s)
},this);
dojo.addClass(this.expandoNode,styles[idx]);
this.expandoNodeText.innerHTML=processing?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
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
},setLabelNode:function(label){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(label))
},_setChildren:function(childrenArray){this.destroyDescendants();
this.state="LOADED";
var nodeMap={};
if(childrenArray&&childrenArray.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}dojo.forEach(childrenArray,function(childParams){var child=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(childParams.item)},childParams));
this.addChild(child);
var identity=this.tree.store.getIdentity(childParams.item);
nodeMap[identity]=child;
if(this.tree.persist){if(this.tree._openedItemIds[identity]){this.tree._expandNode(child)
}}},this);
dojo.forEach(this.getChildren(),function(child,idx){child._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var fc=this.getChildren()[0];
var tabnode=fc?fc.labelNode:this.domNode;
tabnode.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return nodeMap
},_addChildren:function(childrenArray){var nodeMap={};
if(childrenArray&&childrenArray.length>0){dojo.forEach(childrenArray,function(childParams){var child=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(childParams.item)},childParams));
this.addChild(child);
nodeMap[this.tree.store.getIdentity(childParams.item)]=child
},this);
dojo.forEach(this.getChildren(),function(child,idx){child._updateLayout()
})
}return nodeMap
},deleteNode:function(node){node.destroy();
var children=this.getChildren();
if(children.length==0){this.isExpandable=false;
this.collapse()
}dojo.forEach(children,function(child){child._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
dojo.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(topicName,message){dojo.publish(this.id,[dojo.mixin({tree:this,event:topicName},message||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var cookie=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(cookie){dojo.forEach(cookie.split(","),function(item){this._openedItemIds[item]=true
},this)
}}var div=document.createElement("div");
div.style.display="none";
div.className="dijitTreeContainer";
dijit.setWaiRole(div,"presentation");
this.containerNodeTemplate=div;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(dojo.isString(this.dndController)){this.dndController=dojo.getObject(this.dndController)
}var params={};
for(var i=0;
i<this.dndParams.length;
i++){if(this[this.dndParams[i]]){params[this.dndParams[i]]=this[this.dndParams[i]]
}}this.dndController=new this.dndController(this,params)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(item){return dojo.some(this.childrenAttr,function(attr){return this.store.hasAttribute(item,attr)
},this)
},getItemChildren:function(parentItem,onComplete){var store=this.store;
if(parentItem==null){store.fetch({query:this.query,onComplete:onComplete})
}else{var childItems=[];
for(var i=0;
i<this.childrenAttr.length;
i++){childItems=childItems.concat(store.getValues(parentItem,this.childrenAttr[i]))
}var _waitCount=0;
dojo.forEach(childItems,function(item){if(!store.isItemLoaded(item)){_waitCount++
}});
if(_waitCount==0){onComplete(childItems)
}else{function onItem(item){if(--_waitCount==0){onComplete(childItems)
}}dojo.forEach(childItems,function(item){if(!store.isItemLoaded(item)){store.loadItem({item:item,onItem:onItem})
}})
}}},getItemParentIdentity:function(item,parentInfo){return this.store.getIdentity(parentInfo.item)
},getLabel:function(item){return this.store.getLabel(item)
},getIconClass:function(item){},getLabelClass:function(item){},_onLoadAllItems:function(node,items){var childParams=dojo.map(items,function(item){return{item:item,isExpandable:this.mayHaveChildren(item)}
},this);
dojo.mixin(this._itemNodeMap,node._setChildren(childParams));
this._expandNode(node)
},_onKeyPress:function(e){if(e.altKey){return 
}var treeNode=dijit.getEnclosingWidget(e.target);
if(!treeNode){return 
}if(e.charCode){var navKey=e.charCode;
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){navKey=(String.fromCharCode(navKey)).toLowerCase();
this._onLetterKeyNav({node:treeNode,key:navKey});
dojo.stopEvent(e)
}}else{var map=this._keyHandlerMap;
if(!map){map={};
map[dojo.keys.ENTER]="_onEnterKey";
map[dojo.keys.LEFT_ARROW]="_onLeftArrow";
map[dojo.keys.RIGHT_ARROW]="_onRightArrow";
map[dojo.keys.UP_ARROW]="_onUpArrow";
map[dojo.keys.DOWN_ARROW]="_onDownArrow";
map[dojo.keys.HOME]="_onHomeKey";
map[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=map
}if(this._keyHandlerMap[e.keyCode]){this[this._keyHandlerMap[e.keyCode]]({node:treeNode,item:treeNode.item});
dojo.stopEvent(e)
}}},_onEnterKey:function(message){this._publish("execute",{item:message.item,node:message.node});
this.onClick(message.item,message.node)
},_onDownArrow:function(message){var returnNode=this._navToNextNode(message.node);
if(returnNode&&returnNode.isTreeNode){returnNode.tree.focusNode(returnNode);
return returnNode
}},_onUpArrow:function(message){var nodeWidget=message.node;
var returnWidget=nodeWidget;
var previousSibling=nodeWidget.getPreviousSibling();
if(previousSibling){nodeWidget=previousSibling;
while(nodeWidget.isExpandable&&nodeWidget.isExpanded&&nodeWidget.hasChildren()){returnWidget=nodeWidget;
var children=nodeWidget.getChildren();
nodeWidget=children[children.length-1]
}}else{var parent=nodeWidget.getParent();
if(!(this._hideRoot&&parent===this)){nodeWidget=parent
}}if(nodeWidget&&nodeWidget.isTreeNode){returnWidget=nodeWidget
}if(returnWidget&&returnWidget.isTreeNode){returnWidget.tree.focusNode(returnWidget);
return returnWidget
}},_onRightArrow:function(message){var nodeWidget=message.node;
var returnWidget=nodeWidget;
if(nodeWidget.isExpandable&&!nodeWidget.isExpanded){this._expandNode(nodeWidget)
}else{if(nodeWidget.hasChildren()){nodeWidget=nodeWidget.getChildren()[0]
}}if(nodeWidget&&nodeWidget.isTreeNode){returnWidget=nodeWidget
}if(returnWidget&&returnWidget.isTreeNode){returnWidget.tree.focusNode(returnWidget);
return returnWidget
}},_onLeftArrow:function(message){var node=message.node;
var returnWidget=node;
if(node.isExpandable&&node.isExpanded){this._collapseNode(node)
}else{node=node.getParent()
}if(node&&node.isTreeNode){returnWidget=node
}if(returnWidget&&returnWidget.isTreeNode){returnWidget.tree.focusNode(returnWidget);
return returnWidget
}},_onHomeKey:function(){var returnNode=this._navToRootOrFirstNode();
if(returnNode){returnNode.tree.focusNode(returnNode);
return returnNode
}},_onEndKey:function(message){var returnWidget=message.node.tree;
var lastChild=returnWidget;
while(lastChild.isExpanded){var c=lastChild.getChildren();
lastChild=c[c.length-1];
if(lastChild.isTreeNode){returnWidget=lastChild
}}if(returnWidget&&returnWidget.isTreeNode){returnWidget.tree.focusNode(returnWidget);
return returnWidget
}},_onLetterKeyNav:function(message){var node=startNode=message.node;
var key=message.key;
do{node=this._navToNextNode(node);
if(!node){node=this._navToRootOrFirstNode()
}}while(node!==startNode&&(node.label.charAt(0).toLowerCase()!=key));
if(node&&node.isTreeNode){if(node!==startNode){node.tree.focusNode(node)
}return node
}},_onClick:function(e){var domElement=e.target;
var nodeWidget=dijit.getEnclosingWidget(domElement);
if(!nodeWidget||!nodeWidget.isTreeNode){return 
}if(domElement==nodeWidget.expandoNode||domElement==nodeWidget.expandoNodeText){if(nodeWidget.isExpandable){this._onExpandoClick({node:nodeWidget})
}}else{this._publish("execute",{item:nodeWidget.item,node:nodeWidget});
this.onClick(nodeWidget.item,nodeWidget);
this.focusNode(nodeWidget)
}dojo.stopEvent(e)
},_onExpandoClick:function(message){var node=message.node;
if(node.isExpanded){this._collapseNode(node)
}else{this._expandNode(node)
}},onClick:function(item,node){},_navToNextNode:function(node){var returnNode;
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){returnNode=node.getChildren()[0]
}else{while(node&&node.isTreeNode){returnNode=node.getNextSibling();
if(returnNode){break
}node=node.getParent()
}}return returnNode
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var returnNode=this.getChildren()[0];
if(returnNode&&returnNode.isTreeNode){return returnNode
}}},_collapseNode:function(node){if(node.isExpandable){if(node.state=="LOADING"){return 
}if(this.lastFocused){if(dojo.isDescendant(this.lastFocused.domNode,node.domNode)){this.focusNode(node)
}else{this.focusNode(this.lastFocused)
}}node.collapse();
if(this.persist&&node.item){delete this._openedItemIds[this.store.getIdentity(node.item)];
this._saveState()
}}},_expandNode:function(node){var t=node.tree;
if(t.lastFocused){t.focusNode(t.lastFocused)
}if(!node.isExpandable){return 
}var store=this.store;
var getValue=this.store.getValue;
switch(node.state){case"LOADING":return ;
case"UNCHECKED":node.markProcessing();
var _this=this;
var onComplete=function(childItems){node.unmarkProcessing();
_this._onLoadAllItems(node,childItems)
};
this.getItemChildren(node.item,onComplete);
break;
default:if(node.expand){node.expand();
if(this.persist&&node.item){this._openedItemIds[this.store.getIdentity(node.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var node=this.lastFocused;
if(!node){return 
}var labelNode=node.labelNode;
dojo.removeClass(labelNode,"dijitTreeLabelFocused");
labelNode.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(node){node.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var labelNode=this.lastFocused.labelNode;
dojo.removeClass(labelNode,"dijitTreeLabelFocused")
}},_onTreeFocus:function(evt){var node=dijit.getEnclosingWidget(evt.target);
if(node!=this.lastFocused){this.blurNode()
}var labelNode=node.labelNode;
labelNode.setAttribute("tabIndex","0");
dojo.addClass(labelNode,"dijitTreeLabelFocused");
this.lastFocused=node
},_onNewItem:function(item,parentInfo){var loadNewItem;
if(parentInfo){var parent=this._itemNodeMap[this.getItemParentIdentity(item,parentInfo)];
if(!parent||dojo.indexOf(this.childrenAttr,parentInfo.attribute)==-1){return 
}}var childParams={item:item,isExpandable:this.mayHaveChildren(item)};
if(parent){if(!parent.isExpandable){parent.makeExpandable()
}if(parent.state=="LOADED"||parent.isExpanded){var childrenMap=parent._addChildren([childParams])
}}else{var childrenMap=this._addChildren([childParams])
}if(childrenMap){dojo.mixin(this._itemNodeMap,childrenMap)
}},_onDeleteItem:function(item){var identity=this.store.getIdentity(item);
var node=this._itemNodeMap[identity];
if(node){var parent=node.getParent();
parent.deleteNode(node);
this._itemNodeMap[identity]=null
}},_onSetItem:function(item){var identity=this.store.getIdentity(item);
node=this._itemNodeMap[identity];
if(node){node.setLabelNode(this.getLabel(item));
node._updateItemClasses(item)
}},_saveState:function(){if(!this.persist){return 
}var ary=[];
for(var id in this._openedItemIds){ary.push(id)
}dojo.cookie(this.cookieName,ary.join(","))
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\r\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\r\n\tautocomplete="off" type="${type}"\r\n\t/>\r\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(value,priorityChange,formattedValue){var filteredValue=this.filter(value);
if((typeof filteredValue==typeof value)&&(formattedValue==null||formattedValue==undefined)){formattedValue=this.format(filteredValue,this.constraints)
}if(formattedValue!=null&&formattedValue!=undefined){this.textbox.value=formattedValue
}dijit.form.TextBox.superclass.setValue.call(this,filteredValue,priorityChange)
},setDisplayedValue:function(value){this.textbox.value=value;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(value,constraints){return((value==null||value==undefined)?"":(value.toString?value.toString():value))
},parse:function(value,constraints){return value
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var node=this.domNode;
var old=node.style.opacity;
node.style.opacity="0.999";
setTimeout(function(){node.style.opacity=old
},0)
}},filter:function(val){if(val==undefined||val==null){return""
}else{if(typeof val!="string"){return val
}}if(this.trim){val=dojo.trim(val)
}if(this.uppercase){val=val.toUpperCase()
}if(this.lowercase){val=val.toLowerCase()
}if(this.propercase){val=val.replace(/[^\s]+/g,function(word){return word.substring(0,1).toUpperCase()+word.substring(1)
})
}return val
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.InlineEditBox"]){dojo._hasResource["dijit.InlineEditBox"]=true;
dojo.provide("dijit.InlineEditBox");
dojo.declare("dijit.InlineEditBox",dijit._Widget,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:"dijit.form.TextBox",editorParams:{},onChange:function(value){},width:"100%",value:"",noValueIndicator:"<span style='font-family: wingdings; text-decoration: underline;'>&nbsp;&nbsp;&nbsp;&nbsp;&#x270d;&nbsp;&nbsp;&nbsp;&nbsp;</span>",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.displayNode=this.srcNodeRef;
var events={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var name in events){this.connect(this.displayNode,name,events[name])
}dijit.setWaiRole(this.displayNode,"button");
if(!this.displayNode.getAttribute("tabIndex")){this.displayNode.setAttribute("tabIndex",0)
}if(!this.value){this.value=this.displayNode.innerHTML
}this._setDisplayValue(this.value)
},_onMouseOver:function(){dojo.addClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onMouseOut:function(){dojo.removeClass(this.displayNode,this.disabled?"dijitDisabledClickableRegion":"dijitClickableRegion")
},_onClick:function(e){if(this.disabled){return 
}if(e){dojo.stopEvent(e)
}this._onMouseOut();
setTimeout(dojo.hitch(this,"_edit"),0)
},_edit:function(){this.editing=true;
var editValue=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&"));
var placeholder=document.createElement("span");
dojo.place(placeholder,this.domNode,"before");
var ew=this.editWidget=new dijit._InlineEditor({value:dojo.trim(editValue),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:dojo.getComputedStyle(this.displayNode),save:dojo.hitch(this,"save"),cancel:dojo.hitch(this,"cancel"),width:this.width},placeholder);
var ews=ew.domNode.style;
this.displayNode.style.display="none";
ews.position="static";
ews.visibility="visible";
this.domNode=ew.domNode;
setTimeout(function(){ew.focus()
},100)
},_showText:function(focus){this.displayNode.style.display="";
var ews=this.editWidget.domNode.style;
ews.position="absolute";
ews.visibility="hidden";
this.domNode=this.displayNode;
var _this=this;
setTimeout(function(){if(focus){dijit.focus(_this.displayNode)
}_this.editWidget.destroy();
delete _this.editWidget
},100)
},save:function(focus){this.editing=false;
this.value=this.editWidget.getValue()+"";
if(this.renderAsHtml){this.value=this.value.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace("\n","<br>")
}this._setDisplayValue(this.value);
this.onChange(this.value);
this._showText(focus)
},_setDisplayValue:function(val){this.displayNode.innerHTML=val||this.noValueIndicator
},cancel:function(focus){this.editing=false;
this._showText(focus)
}});
dojo.declare("dijit._InlineEditor",[dijit._Widget,dijit._Templated],{templateString:'<fieldset dojoAttachPoint="editNode" waiRole="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"\r\n\tdojoAttachEvent="onkeypress: _onKeyPress" \r\n\t><input dojoAttachPoint="editorPlaceholder"\r\n\t/><span dojoAttachPoint="buttonContainer"\r\n\t\t><button class=\'saveButton\' dojoAttachPoint="saveButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:save">${buttonSave}</button\r\n\t\t><button class=\'cancelButton\' dojoAttachPoint="cancelButton" dojoType="dijit.form.Button" dojoAttachEvent="onClick:cancel">${buttonCancel}</button\r\n\t></span\r\n></fieldset>\r\n',widgetsInTemplate:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.messages=dojo.i18n.getLocalization("dijit","common",this.lang);
dojo.forEach(["buttonSave","buttonCancel"],function(prop){if(!this[prop]){this[prop]=this.messages[prop]
}},this)
},postCreate:function(){var cls=dojo.getObject(this.editor);
var ew=this.editWidget=new cls(this.editorParams,this.editorPlaceholder);
var srcStyle=this.style;
dojo.forEach(["fontWeight","fontFamily","fontSize","fontStyle"],function(prop){ew.focusNode.style[prop]=srcStyle[prop]
},this);
dojo.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(prop){this.domNode.style[prop]=srcStyle[prop]
},this);
if(this.width=="100%"){ew.domNode.style.width="100%";
this.domNode.style.display="block"
}else{ew.domNode.style.width=this.width+(Number(this.width)==this.width?"px":"")
}this.connect(this.editWidget,"onChange","_onChange");
this._ignoreNextOnChange=true;
(this.editWidget.setDisplayedValue||this.editWidget.setValue).call(this.editWidget,this.value);
this._initialText=this.getValue();
if(this.autoSave){this.buttonContainer.style.display="none"
}},destroy:function(){this.editWidget.destroy();
this.inherited(arguments)
},getValue:function(){var ew=this.editWidget;
return ew.getDisplayedValue?ew.getDisplayedValue():ew.getValue()
},_onKeyPress:function(e){if(this._exitInProgress){return 
}if(this.autoSave){if(e.keyCode==dojo.keys.ESCAPE){dojo.stopEvent(e);
this._exitInProgress=true;
this.cancel(true)
}else{if(e.keyCode==dojo.keys.ENTER){dojo.stopEvent(e);
this._exitInProgress=true;
this.save(true)
}}}else{var _this=this;
setTimeout(function(){_this.saveButton.setDisabled(_this.getValue()==_this._initialText)
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
dijit.selectInputText=function(element){var _window=dojo.global;
var _document=dojo.doc;
element=dojo.byId(element);
if(_document.selection&&dojo.body()["createTextRange"]){if(element.createTextRange){var range=element.createTextRange();
range.moveStart("character",0);
range.moveEnd("character",element.value.length);
range.select()
}}else{if(_window.getSelection){var selection=_window.getSelection();
if(element.setSelectionRange){element.setSelectionRange(0,element.value.length)
}}}element.focus()
}
}if(!dojo._hasResource["dijit.form.CheckBox"]){dojo._hasResource["dijit.form.CheckBox"]=true;
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:'<fieldset class="dijitReset dijitInline" waiRole="presentation"\r\n\t><input\r\n\t \ttype="${type}" name="${name}"\r\n\t\tclass="dijitReset dijitCheckBoxInput"\r\n\t\tdojoAttachPoint="inputNode,focusNode"\r\n\t \tdojoAttachEvent="onmouseover:_onMouse,onmouseout:_onMouse,onclick:_onClick"\r\n/></fieldset>\r\n',baseClass:"dijitCheckBox",type:"checkbox",value:"on",postCreate:function(){dojo.setSelectable(this.inputNode,false);
this.setChecked(this.checked);
this.inherited(arguments)
},setChecked:function(checked){if(dojo.isIE){if(checked){this.inputNode.setAttribute("checked","checked")
}else{this.inputNode.removeAttribute("checked")
}}else{this.inputNode.checked=checked
}this.inherited(arguments)
},setValue:function(value){if(value==null){value=""
}this.inputNode.value=value;
dijit.form.CheckBox.superclass.setValue.call(this,value)
}});
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_groups:{},postCreate:function(){(this._groups[this.name]=this._groups[this.name]||[]).push(this);
this.inherited(arguments)
},uninitialize:function(){dojo.forEach(this._groups[this.name],function(widget,i,arr){if(widget===this){arr.splice(i,1);
return 
}},this)
},setChecked:function(checked){if(checked){dojo.forEach(this._groups[this.name],function(widget){if(widget!=this&&widget.checked){widget.setChecked(false)
}},this)
}this.inherited(arguments)
},_clicked:function(e){if(!this.checked){this.setChecked(true)
}}})
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(pattern,ignoreCase){var rxp="^";
var c=null;
for(var i=0;
i<pattern.length;
i++){c=pattern.charAt(i);
switch(c){case"\\":rxp+=c;
i++;
rxp+=pattern.charAt(i);
break;
case"*":rxp+=".*";
break;
case"?":rxp+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":rxp+="\\";
default:rxp+=c
}}rxp+="$";
if(ignoreCase){return new RegExp(rxp,"i")
}else{return new RegExp(rxp)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(a,b){var ret=0;
if(a>b||typeof a==="undefined"||a===null){ret=1
}else{if(a<b||typeof b==="undefined"||b===null){ret=-1
}}return ret
};
dojo.data.util.sorter.createSortFunction=function(sortSpec,store){var sortFunctions=[];
function createSortFunction(attr,dir){return function(itemA,itemB){var a=store.getValue(itemA,attr);
var b=store.getValue(itemB,attr);
var comparator=null;
if(store.comparatorMap){if(typeof attr!=="string"){attr=store.getIdentity(attr)
}comparator=store.comparatorMap[attr]||dojo.data.util.sorter.basicComparator
}comparator=comparator||dojo.data.util.sorter.basicComparator;
return dir*comparator(a,b)
}
}for(var i=0;
i<sortSpec.length;
i++){sortAttribute=sortSpec[i];
if(sortAttribute.attribute){var direction=(sortAttribute.descending)?-1:1;
sortFunctions.push(createSortFunction(sortAttribute.attribute,direction))
}}return function(rowA,rowB){var i=0;
while(i<sortFunctions.length){var ret=sortFunctions[i++](rowA,rowB);
if(ret!==0){return ret
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(request){request=request||{};
if(!request.store){request.store=this
}var self=this;
var _errorHandler=function(errorData,requestObject){if(requestObject.onError){var scope=requestObject.scope||dojo.global;
requestObject.onError.call(scope,errorData,requestObject)
}};
var _fetchHandler=function(items,requestObject){var oldAbortFunction=requestObject.abort||null;
var aborted=false;
var startIndex=requestObject.start?requestObject.start:0;
var endIndex=requestObject.count?(startIndex+requestObject.count):items.length;
requestObject.abort=function(){aborted=true;
if(oldAbortFunction){oldAbortFunction.call(requestObject)
}};
var scope=requestObject.scope||dojo.global;
if(!requestObject.store){requestObject.store=self
}if(requestObject.onBegin){requestObject.onBegin.call(scope,items.length,requestObject)
}if(requestObject.sort){items.sort(dojo.data.util.sorter.createSortFunction(requestObject.sort,self))
}if(requestObject.onItem){for(var i=startIndex;
(i<items.length)&&(i<endIndex);
++i){var item=items[i];
if(!aborted){requestObject.onItem.call(scope,item,requestObject)
}}}if(requestObject.onComplete&&!aborted){var subset=null;
if(!requestObject.onItem){subset=items.slice(startIndex,endIndex)
}requestObject.onComplete.call(scope,subset,requestObject)
}};
this._fetchItems(request,_fetchHandler,_errorHandler);
return request
}
}if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(keywordParameters){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=keywordParameters.url;
this._jsonData=keywordParameters.data;
this._datatypeMap=keywordParameters.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(value){return dojo.date.stamp.fromISOString(value)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(item){if(!this.isItem(item)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(attribute){if(typeof attribute!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(item,attribute,defaultValue){var values=this.getValues(item,attribute);
return(values.length>0)?values[0]:defaultValue
},getValues:function(item,attribute){this._assertIsItem(item);
this._assertIsAttribute(attribute);
return item[attribute]||[]
},getAttributes:function(item){this._assertIsItem(item);
var attributes=[];
for(var key in item){if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)){attributes.push(key)
}}return attributes
},hasAttribute:function(item,attribute){return this.getValues(item,attribute).length>0
},containsValue:function(item,attribute,value){var regexp=undefined;
if(typeof value==="string"){regexp=dojo.data.util.filter.patternToRegExp(value,false)
}return this._containsValue(item,attribute,value,regexp)
},_containsValue:function(item,attribute,value,regexp){return dojo.some(this.getValues(item,attribute),function(possibleValue){if(possibleValue!==null&&!dojo.isObject(possibleValue)&&regexp){if(possibleValue.toString().match(regexp)){return true
}}else{if(value===possibleValue){return true
}}})
},isItem:function(something){if(something&&something[this._storeRefPropName]===this){if(this._arrayOfAllItems[something[this._itemNumPropName]]===something){return true
}}return false
},isItemLoaded:function(something){return this.isItem(something)
},loadItem:function(keywordArgs){this._assertIsItem(keywordArgs.item)
},getFeatures:function(){return this._features
},getLabel:function(item){if(this._labelAttr&&this.isItem(item)){return this.getValue(item,this._labelAttr)
}return undefined
},getLabelAttributes:function(item){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(keywordArgs,findCallback,errorCallback){var self=this;
var filter=function(requestArgs,arrayOfItems){var items=[];
if(requestArgs.query){var ignoreCase=requestArgs.queryOptions?requestArgs.queryOptions.ignoreCase:false;
var regexpList={};
for(var key in requestArgs.query){var value=requestArgs.query[key];
if(typeof value==="string"){regexpList[key]=dojo.data.util.filter.patternToRegExp(value,ignoreCase)
}}for(var i=0;
i<arrayOfItems.length;
++i){var match=true;
var candidateItem=arrayOfItems[i];
if(candidateItem===null){match=false
}else{for(var key in requestArgs.query){var value=requestArgs.query[key];
if(!self._containsValue(candidateItem,key,value,regexpList[key])){match=false
}}}if(match){items.push(candidateItem)
}}findCallback(items,requestArgs)
}else{for(var i=0;
i<arrayOfItems.length;
++i){var item=arrayOfItems[i];
if(item!==null){items.push(item)
}}findCallback(items,requestArgs)
}};
if(this._loadFinished){filter(keywordArgs,this._getItemsArray(keywordArgs.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:keywordArgs,filter:filter})
}else{this._loadInProgress=true;
var getArgs={url:self._jsonFileUrl,handleAs:"json-comment-optional"};
var getHandler=dojo.xhrGet(getArgs);
getHandler.addCallback(function(data){try{self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
filter(keywordArgs,self._getItemsArray(keywordArgs.queryOptions));
self._handleQueuedFetches()
}catch(e){self._loadFinished=true;
self._loadInProgress=false;
errorCallback(e,keywordArgs)
}});
getHandler.addErrback(function(error){self._loadInProgress=false;
errorCallback(error,keywordArgs)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
filter(keywordArgs,this._getItemsArray(keywordArgs.queryOptions))
}catch(e){errorCallback(e,keywordArgs)
}}else{errorCallback(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),keywordArgs)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var i=0;
i<this._queuedFetches.length;
i++){var fData=this._queuedFetches[i];
var delayedQuery=fData.args;
var delayedFilter=fData.filter;
if(delayedFilter){delayedFilter(delayedQuery,this._getItemsArray(delayedQuery.queryOptions))
}else{this.fetchItemByIdentity(delayedQuery)
}}this._queuedFetches=[]
}},_getItemsArray:function(queryOptions){if(queryOptions&&queryOptions.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(request){},_getItemsFromLoadedData:function(dataObject){function valueIsAnItem(aValue){var isItem=((aValue!=null)&&(typeof aValue=="object")&&(!dojo.isArray(aValue))&&(!dojo.isFunction(aValue))&&(aValue.constructor==Object)&&(typeof aValue._reference=="undefined")&&(typeof aValue._type=="undefined")&&(typeof aValue._value=="undefined"));
return isItem
}var self=this;
function addItemAndSubItemsToArrayOfAllItems(anItem){self._arrayOfAllItems.push(anItem);
for(var attribute in anItem){var valueForAttribute=anItem[attribute];
if(valueForAttribute){if(dojo.isArray(valueForAttribute)){var valueArray=valueForAttribute;
for(var k=0;
k<valueArray.length;
++k){var singleValue=valueArray[k];
if(valueIsAnItem(singleValue)){addItemAndSubItemsToArrayOfAllItems(singleValue)
}}}else{if(valueIsAnItem(valueForAttribute)){addItemAndSubItemsToArrayOfAllItems(valueForAttribute)
}}}}}this._labelAttr=dataObject.label;
var i;
var item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=dataObject.items;
for(i=0;
i<this._arrayOfTopLevelItems.length;
++i){item=this._arrayOfTopLevelItems[i];
addItemAndSubItemsToArrayOfAllItems(item);
item[this._rootItemPropName]=true
}var allAttributeNames={};
var key;
for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
for(key in item){if(key!==this._rootItemPropName){var value=item[key];
if(value!==null){if(!dojo.isArray(value)){item[key]=[value]
}}else{item[key]=[null]
}}allAttributeNames[key]=key
}}while(allAttributeNames[this._storeRefPropName]){this._storeRefPropName+="_"
}while(allAttributeNames[this._itemNumPropName]){this._itemNumPropName+="_"
}var arrayOfValues;
var identifier=dataObject.identifier;
if(identifier){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=identifier;
for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
arrayOfValues=item[identifier];
var identity=arrayOfValues[0];
if(!this._itemsByIdentity[identity]){this._itemsByIdentity[identity]=item
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+identifier+"].  Value collided: ["+identity+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+identifier+"].  Value collided: ["+identity+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i
}for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
for(key in item){arrayOfValues=item[key];
for(var j=0;
j<arrayOfValues.length;
++j){value=arrayOfValues[j];
if(value!==null&&typeof value=="object"){if(value._type&&value._value){var type=value._type;
var mappingObj=this._datatypeMap[type];
if(!mappingObj){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'")
}else{if(dojo.isFunction(mappingObj)){arrayOfValues[j]=new mappingObj(value._value)
}else{if(dojo.isFunction(mappingObj.deserialize)){arrayOfValues[j]=mappingObj.deserialize(value._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(value._reference){var referenceDescription=value._reference;
if(dojo.isString(referenceDescription)){arrayOfValues[j]=this._itemsByIdentity[referenceDescription]
}else{for(var k=0;
k<this._arrayOfAllItems.length;
++k){var candidateItem=this._arrayOfAllItems[k];
var found=true;
for(var refKey in referenceDescription){if(candidateItem[refKey]!=referenceDescription[refKey]){found=false
}}if(found){arrayOfValues[j]=candidateItem
}}}}}}}}},getIdentity:function(item){var identifier=this._features["dojo.data.api.Identity"];
if(identifier===Number){return item[this._itemNumPropName]
}else{var arrayOfValues=item[identifier];
if(arrayOfValues){return arrayOfValues[0]
}}return null
},fetchItemByIdentity:function(keywordArgs){if(!this._loadFinished){var self=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:keywordArgs})
}else{this._loadInProgress=true;
var getArgs={url:self._jsonFileUrl,handleAs:"json-comment-optional"};
var getHandler=dojo.xhrGet(getArgs);
getHandler.addCallback(function(data){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
try{self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
var item=self._getItemByIdentity(keywordArgs.identity);
if(keywordArgs.onItem){keywordArgs.onItem.call(scope,item)
}self._handleQueuedFetches()
}catch(error){self._loadInProgress=false;
if(keywordArgs.onError){keywordArgs.onError.call(scope,error)
}}});
getHandler.addErrback(function(error){self._loadInProgress=false;
if(keywordArgs.onError){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
keywordArgs.onError.call(scope,error)
}})
}}else{if(this._jsonData){self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
var item=self._getItemByIdentity(keywordArgs.identity);
if(keywordArgs.onItem){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
keywordArgs.onItem.call(scope,item)
}}}}else{var item=this._getItemByIdentity(keywordArgs.identity);
if(keywordArgs.onItem){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
keywordArgs.onItem.call(scope,item)
}}},_getItemByIdentity:function(identity){var item=null;
if(this._itemsByIdentity){item=this._itemsByIdentity[identity]
}else{item=this._arrayOfAllItems[identity]
}if(item===undefined){item=null
}return item
},getIdentityAttributes:function(item){var identifier=this._features["dojo.data.api.Identity"];
if(identifier===Number){return null
}else{return[identifier]
}},_forceLoad:function(){var self=this;
if(this._jsonFileUrl){var getArgs={url:self._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var getHandler=dojo.xhrGet(getArgs);
getHandler.addCallback(function(data){try{if(self._loadInProgress!==true&&!self._loadFinished){self._getItemsFromLoadedData(data);
self._loadFinished=true
}}catch(e){console.log(e);
throw e
}});
getHandler.addErrback(function(error){throw error
})
}else{if(this._jsonData){self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\r\n\t\t\ttype=\'${type}\' name=\'${name}\'\r\n\t\t/></td\r\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(constraints){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(value,constraints){return(new RegExp("^("+this.regExpGen(constraints)+")"+(this.required?"":"?")+"$")).test(value)&&(!this.required||!this._isEmpty(value))&&(this._isEmpty(value)||this.parse(value,constraints)!==null)
},isValid:function(isFocused){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(value){return/^\s*$/.test(value)
},getErrorMessage:function(isFocused){return this.invalidMessage
},getPromptMessage:function(isFocused){return this.promptMessage
},validate:function(isFocused){var message="";
var isValid=this.isValid(isFocused);
var isEmpty=this._isEmpty(this.textbox.value);
this.state=(isValid||(!this._hasBeenBlurred&&isEmpty))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(isValid?"false":"true"));
if(isFocused){if(isEmpty){message=this.getPromptMessage(true)
}if(!message&&!isValid){message=this.getErrorMessage(true)
}}this._displayMessage(message)
},_message:"",_displayMessage:function(message){if(this._message==message){return 
}this._message=message;
this.displayMessage(message)
},displayMessage:function(message){if(message){dijit.showTooltip(message,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(evt){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(evt){this.validate(true);
this._onMouse(evt)
},onkeyup:function(evt){this.onfocus(evt)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var p=this.regExpGen(this.constraints);
this.regExp=p
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(val,options){return(val.toString?val.toString():"")
},toString:function(){var val=this.filter(this.getValue());
return(val!=null)?((typeof val=="string")?val:this.serialize(val,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var textbox=this.textbox;
var valueNode=(this.valueNode=document.createElement("input"));
valueNode.setAttribute("type",textbox.type);
valueNode.setAttribute("value",this.toString());
dojo.style(valueNode,"display","none");
valueNode.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(valueNode,textbox,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(val1,val2){return val1-val2
},rangeCheck:function(primitive,constraints){var isMin=(typeof constraints.min!="undefined");
var isMax=(typeof constraints.max!="undefined");
if(isMin||isMax){return(!isMin||this.compare(primitive,constraints.min)>=0)&&(!isMax||this.compare(primitive,constraints.max)<=0)
}else{return true
}},isInRange:function(isFocused){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(isFocused){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(isFocused))
},getErrorMessage:function(isFocused){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(isFocused)){return this.rangeMessage
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
},setDisplayedValue:function(value){this._lastDisplayedValue=value;
this.setValue(value,true)
},_getCaretPos:function(element){if(typeof (element.selectionStart)=="number"){return element.selectionStart
}else{if(dojo.isIE){var tr=document.selection.createRange().duplicate();
var ntr=element.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{ntr.setEndPoint("EndToEnd",tr);
return String(ntr.text).replace(/\r/g,"").length
}catch(e){return 0
}}}},_setCaretPos:function(element,location){location=parseInt(location);
this._setSelectedRange(element,location,location)
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
}}}},onkeypress:function(evt){if(evt.altKey||(evt.ctrlKey&&evt.charCode!=118)){return 
}var doSearch=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(evt)
}switch(evt.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
doSearch=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var highlighted;
if(this._isShowingNow&&(highlighted=this._popupWidget.getHighlightedOption())){if(highlighted==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(evt);
break
}else{if(highlighted==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(evt);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}evt.preventDefault();
case dojo.keys.TAB:var newvalue=this.getDisplayedValue();
if(this._popupWidget&&(newvalue==this._popupWidget._messages.previousMessage||newvalue==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(evt);
this._selectOption();
this._hideResultList()
}else{doSearch=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(evt)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
doSearch=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||evt.charCode!=0){doSearch=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(doSearch){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(text){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(text))){var cpos=this._getCaretPos(this.focusNode);
if((cpos+1)>this.focusNode.value.length){this.focusNode.value=text;
this._setSelectedRange(this.focusNode,cpos,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}}else{this.focusNode.value=text;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}},_openResultList:function(results,dataObject){if(this.disabled||dataObject.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!results.length){this._hideResultList();
return 
}var zerothvalue=new String(this.store.getValue(results[0],this.searchAttr));
if(zerothvalue&&this.autoComplete&&!this._prev_key_backspace&&(dataObject.query[this.searchAttr]!="*")){this._autoCompleteText(zerothvalue);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",zerothvalue)
}this._popupWidget.createOptions(results,dataObject,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(dataObject.direction){if(dataObject.direction==1){this._popupWidget.highlightFirstOption()
}else{if(dataObject.direction==-1){this._popupWidget.highlightLastOption()
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
var newvalue=this.getDisplayedValue();
if(this._popupWidget&&(newvalue==this._popupWidget._messages.previousMessage||newvalue==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(newvalue)
}},onfocus:function(evt){this._hasFocus=true;
this._onMouse(evt)
},_announceOption:function(node){if(node==null){return 
}var newValue;
if(node==this._popupWidget.nextButton||node==this._popupWidget.previousButton){newValue=node.innerHTML
}else{newValue=this.store.getValue(node.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(newValue)
},_selectOption:function(evt){var tgt=null;
if(!evt){evt={target:this._popupWidget.getHighlightedOption()}
}if(!evt.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{tgt=evt.target
}if(!evt.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(tgt.item,this.searchAttr).length)
}this._doSelect(tgt)
},_doSelect:function(tgt){this.item=tgt.item;
this.setValue(this.store.getValue(tgt.item,this.searchAttr),true)
},_onArrowMouseDown:function(evt){if(this.disabled){return 
}dojo.stopEvent(evt);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(key){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var query=this.query;
this._lastQuery=query[this.searchAttr]=key+"*";
var dataObject=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:query,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function nextSearch(dataObject,direction){dataObject.start+=dataObject.count*direction;
dataObject.direction=direction;
dataObject.store.fetch(dataObject)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,nextSearch,dataObject)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(evt){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var items=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(node){node.style.display="none";
return{value:node.getAttribute("value"),name:String(node.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:items}});
if(items&&items.length&&!this.value){this.value=items[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(item){return{html:false,label:this.store.getValue(item,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(value){this.value=value;
this.onChange(value)
},onChange:function(value){},onPage:function(direction){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(item,labelFunc){var labelObject=labelFunc(item);
var menuitem=document.createElement("div");
if(labelObject.html){menuitem.innerHTML=labelObject.label
}else{menuitem.appendChild(document.createTextNode(labelObject.label))
}if(menuitem.innerHTML==""){menuitem.innerHTML="&nbsp;"
}menuitem.item=item;
return menuitem
},createOptions:function(results,dataObject,labelFunc){this.previousButton.style.display=dataObject.start==0?"none":"";
var _this=this;
dojo.forEach(results,function(item){var menuitem=_this._createOption(item,labelFunc);
menuitem.className="dijitMenuItem";
_this.domNode.insertBefore(menuitem,_this.nextButton)
});
this.nextButton.style.display=dataObject.count==results.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(evt){dojo.stopEvent(evt)
},onmouseup:function(evt){if(evt.target===this.domNode){return 
}else{if(evt.target==this.previousButton){this.onPage(-1)
}else{if(evt.target==this.nextButton){this.onPage(1)
}else{var tgt=evt.target;
while(!tgt.item){tgt=tgt.parentNode
}this.setValue({target:tgt},true)
}}}},onmouseover:function(evt){if(evt.target===this.domNode){return 
}var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){while(!tgt.item){tgt=tgt.parentNode
}}this._focusOptionNode(tgt)
},onmouseout:function(evt){if(evt.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(node){if(this._highlighted_option!=node){this._blurOptionNode();
this._highlighted_option=node;
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
},_page:function(up){var scrollamount=0;
var oldscroll=this.domNode.scrollTop;
var height=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(scrollamount<height){if(up){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var newscroll=this.domNode.scrollTop;
scrollamount+=(newscroll-oldscroll)*(up?-1:1);
oldscroll=newscroll
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(evt){switch(evt.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
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
dojo.cldr.monetary.getData=function(code){var placesData={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var roundingData={CHF:5};
var places=placesData[code],round=roundingData[code];
if(typeof places=="undefined"){places=2
}if(typeof round=="undefined"){round=0
}return{places:places,round:round}
}
}if(!dojo._hasResource["dojo.currency"]){dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.currency._mixInDefaults=function(options){options=options||{};
options.type="currency";
var bundle=dojo.i18n.getLocalization("dojo.cldr","currency",options.locale)||{};
var iso=options.currency;
var data=dojo.cldr.monetary.getData(iso);
dojo.forEach(["displayName","symbol","group","decimal"],function(prop){data[prop]=bundle[iso+"_"+prop]
});
data.fractional=[true,false];
return dojo.mixin(data,options)
};
dojo.currency.format=function(value,options){return dojo.number.format(value,dojo.currency._mixInDefaults(options))
};
dojo.currency.regexp=function(options){return dojo.number.regexp(dojo.currency._mixInDefaults(options))
};
dojo.currency.parse=function(expression,options){return dojo.number.parse(expression,dojo.currency._mixInDefaults(options))
}
}if(!dojo._hasResource["dijit.form.NumberTextBox"]){dojo._hasResource["dijit.form.NumberTextBox"]=true;
dojo.provide("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,format:function(value,constraints){if(isNaN(value)){return""
}return dojo.number.format(value,constraints)
},parse:dojo.number.parse,filter:function(value){if(typeof value=="string"){return this.inherited("filter",arguments)
}return(isNaN(value)?"":value)
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
dojo.cldr.supplemental.getFirstDayOfWeek=function(locale){var firstDay={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var country=dojo.cldr.supplemental._region(locale);
var dow=firstDay[country];
return(typeof dow=="undefined")?1:dow
};
dojo.cldr.supplemental._region=function(locale){locale=dojo.i18n.normalizeLocale(locale);
var tags=locale.split("-");
var region=tags[1];
if(!region){region={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]]
}else{if(region.length==4){region=tags[2]
}}return region
};
dojo.cldr.supplemental.getWeekend=function(locale){var weekendStart={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var weekendEnd={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var country=dojo.cldr.supplemental._region(locale);
var start=weekendStart[country];
var end=weekendEnd[country];
if(typeof start=="undefined"){start=6
}if(typeof end=="undefined"){end=0
}return{start:start,end:end}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(dateObject){var month=dateObject.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(month==1&&dojo.date.isLeapYear(dateObject)){return 29
}return days[month]
};
dojo.date.isLeapYear=function(dateObject){var year=dateObject.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100))
};
dojo.date.getTimezoneName=function(dateObject){var str=dateObject.toString();
var tz="";
var match;
var pos=str.indexOf("(");
if(pos>-1){tz=str.substring(++pos,str.indexOf(")"))
}else{var pat=/([A-Z\/]+) \d{4}$/;
if((match=str.match(pat))){tz=match[1]
}else{str=dateObject.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((match=str.match(pat))){tz=match[1]
}}}return(tz=="AM"||tz=="PM")?"":tz
};
dojo.date.compare=function(date1,date2,portion){date1=new Date(Number(date1));
date2=new Date(Number(date2||new Date()));
if(typeof portion!=="undefined"){if(portion=="date"){date1.setHours(0,0,0,0);
date2.setHours(0,0,0,0)
}else{if(portion=="time"){date1.setFullYear(0,0,0);
date2.setFullYear(0,0,0)
}}}if(date1>date2){return 1
}if(date1<date2){return -1
}return 0
};
dojo.date.add=function(date,interval,amount){var sum=new Date(Number(date));
var fixOvershoot=false;
var property="Date";
switch(interval){case"day":break;
case"weekday":var days,weeks;
var adj=0;
var mod=amount%5;
if(!mod){days=(amount>0)?5:-5;
weeks=(amount>0)?((amount-5)/5):((amount+5)/5)
}else{days=mod;
weeks=parseInt(amount/5)
}var strt=date.getDay();
if(strt==6&&amount>0){adj=1
}else{if(strt==0&&amount<0){adj=-1
}}var trgt=strt+days;
if(trgt==0||trgt==6){adj=(amount>0)?2:-2
}amount=7*weeks+days+adj;
break;
case"year":property="FullYear";
fixOvershoot=true;
break;
case"week":amount*=7;
break;
case"quarter":amount*=3;
case"month":fixOvershoot=true;
property="Month";
break;
case"hour":case"minute":case"second":case"millisecond":property="UTC"+interval.charAt(0).toUpperCase()+interval.substring(1)+"s"
}if(property){sum["set"+property](sum["get"+property]()+amount)
}if(fixOvershoot&&(sum.getDate()<date.getDate())){sum.setDate(0)
}return sum
};
dojo.date.difference=function(date1,date2,interval){date2=date2||new Date();
interval=interval||"day";
var yearDiff=date2.getFullYear()-date1.getFullYear();
var delta=1;
switch(interval){case"quarter":var m1=date1.getMonth();
var m2=date2.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(yearDiff*4);
delta=q2-q1;
break;
case"weekday":var days=Math.round(dojo.date.difference(date1,date2,"day"));
var weeks=parseInt(dojo.date.difference(date1,date2,"week"));
var mod=days%7;
if(mod==0){days=weeks*5
}else{var adj=0;
var aDay=date1.getDay();
var bDay=date2.getDay();
weeks=parseInt(days/7);
mod=days%7;
var dtMark=new Date(date1);
dtMark.setDate(dtMark.getDate()+(weeks*7));
var dayMark=dtMark.getDay();
if(days>0){switch(true){case aDay==6:adj=-1;
break;
case aDay==0:adj=0;
break;
case bDay==6:adj=-1;
break;
case bDay==0:adj=-2;
break;
case (dayMark+mod)>5:adj=-2
}}else{if(days<0){switch(true){case aDay==6:adj=0;
break;
case aDay==0:adj=1;
break;
case bDay==6:adj=2;
break;
case bDay==0:adj=1;
break;
case (dayMark+mod)<0:adj=2
}}}days+=adj;
days-=(weeks*2)
}delta=days;
break;
case"year":delta=yearDiff;
break;
case"month":delta=(date2.getMonth()-date1.getMonth())+(yearDiff*12);
break;
case"week":delta=parseInt(dojo.date.difference(date1,date2,"day")/7);
break;
case"day":delta/=24;
case"hour":delta/=60;
case"minute":delta/=60;
case"second":delta/=1000;
case"millisecond":delta*=date2.getTime()-date1.getTime()
}return Math.round(delta)
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function formatPattern(dateObject,bundle,pattern){return pattern.replace(/([a-z])\1*/ig,function(match){var s;
var c=match.charAt(0);
var l=match.length;
var pad;
var widthList=["abbr","wide","narrow"];
switch(c){case"G":s=bundle[(l<4)?"eraAbbr":"eraNames"][dateObject.getFullYear()<0?0:1];
break;
case"y":s=dateObject.getFullYear();
switch(l){case 1:break;
case 2:s=String(s);
s=s.substr(s.length-2);
break;
default:pad=true
}break;
case"Q":case"q":s=Math.ceil((dateObject.getMonth()+1)/3);
pad=true;
break;
case"M":case"L":var m=dateObject.getMonth();
var width;
switch(l){case 1:case 2:s=m+1;
pad=true;
break;
case 3:case 4:case 5:width=widthList[l-3];
break
}if(width){var type=(c=="L")?"standalone":"format";
var prop=["months",type,width].join("-");
s=bundle[prop][m]
}break;
case"w":var firstDay=0;
s=dojo.date.locale._getWeekOfYear(dateObject,firstDay);
pad=true;
break;
case"d":s=dateObject.getDate();
pad=true;
break;
case"D":s=dojo.date.locale._getDayOfYear(dateObject);
pad=true;
break;
case"E":case"e":case"c":var d=dateObject.getDay();
var width;
switch(l){case 1:case 2:if(c=="e"){var first=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
d=(d-first+7)%7
}if(c!="c"){s=d+1;
pad=true;
break
}case 3:case 4:case 5:width=widthList[l-3];
break
}if(width){var type=(c=="c")?"standalone":"format";
var prop=["days",type,width].join("-");
s=bundle[prop][d]
}break;
case"a":var timePeriod=(dateObject.getHours()<12)?"am":"pm";
s=bundle[timePeriod];
break;
case"h":case"H":case"K":case"k":var h=dateObject.getHours();
switch(c){case"h":s=(h%12)||12;
break;
case"H":s=h;
break;
case"K":s=(h%12);
break;
case"k":s=h||24;
break
}pad=true;
break;
case"m":s=dateObject.getMinutes();
pad=true;
break;
case"s":s=dateObject.getSeconds();
pad=true;
break;
case"S":s=Math.round(dateObject.getMilliseconds()*Math.pow(10,l-3));
break;
case"v":case"z":s=dojo.date.getTimezoneName(dateObject);
if(s){break
}l=4;
case"Z":var offset=dateObject.getTimezoneOffset();
var tz=[(offset<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(offset)/60),2),dojo.string.pad(Math.abs(offset)%60,2)];
if(l==4){tz.splice(0,0,"GMT");
tz.splice(3,0,":")
}s=tz.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+pattern)
}if(pad){s=dojo.string.pad(s,l)
}return s
})
}dojo.date.locale.format=function(dateObject,options){options=options||{};
var locale=dojo.i18n.normalizeLocale(options.locale);
var formatLength=options.formatLength||"short";
var bundle=dojo.date.locale._getGregorianBundle(locale);
var str=[];
var sauce=dojo.hitch(this,formatPattern,dateObject,bundle);
if(options.selector=="year"){var year=dateObject.getFullYear();
if(locale.match(/^zh|^ja/)){year+="\u5E74"
}return year
}if(options.selector!="time"){var datePattern=options.datePattern||bundle["dateFormat-"+formatLength];
if(datePattern){str.push(_processPattern(datePattern,sauce))
}}if(options.selector!="date"){var timePattern=options.timePattern||bundle["timeFormat-"+formatLength];
if(timePattern){str.push(_processPattern(timePattern,sauce))
}}var result=str.join(" ");
return result
};
dojo.date.locale.regexp=function(options){return dojo.date.locale._parseInfo(options).regexp
};
dojo.date.locale._parseInfo=function(options){options=options||{};
var locale=dojo.i18n.normalizeLocale(options.locale);
var bundle=dojo.date.locale._getGregorianBundle(locale);
var formatLength=options.formatLength||"short";
var datePattern=options.datePattern||bundle["dateFormat-"+formatLength];
var timePattern=options.timePattern||bundle["timeFormat-"+formatLength];
var pattern;
if(options.selector=="date"){pattern=datePattern
}else{if(options.selector=="time"){pattern=timePattern
}else{pattern=datePattern+" "+timePattern
}}var tokens=[];
var re=_processPattern(pattern,dojo.hitch(this,_buildDateTimeRE,tokens,bundle,options));
return{regexp:re,tokens:tokens,bundle:bundle}
};
dojo.date.locale.parse=function(value,options){var info=dojo.date.locale._parseInfo(options);
var tokens=info.tokens,bundle=info.bundle;
var re=new RegExp("^"+info.regexp+"$");
var match=re.exec(value);
if(!match){return null
}var widthList=["abbr","wide","narrow"];
var result=new Date(1972,0);
var expected={};
var amPm="";
dojo.forEach(match,function(v,i){if(!i){return 
}var token=tokens[i-1];
var l=token.length;
switch(token.charAt(0)){case"y":if(l!=2){result.setFullYear(v);
expected.year=v
}else{if(v<100){v=Number(v);
var year=""+new Date().getFullYear();
var century=year.substring(0,2)*100;
var yearPart=Number(year.substring(2,4));
var cutoff=Math.min(yearPart+20,99);
var num=(v<cutoff)?century+v:century-100+v;
result.setFullYear(num);
expected.year=num
}else{if(options.strict){return null
}result.setFullYear(v);
expected.year=v
}}break;
case"M":if(l>2){var months=bundle["months-format-"+widthList[l-3]].concat();
if(!options.strict){v=v.replace(".","").toLowerCase();
months=dojo.map(months,function(s){return s.replace(".","").toLowerCase()
})
}v=dojo.indexOf(months,v);
if(v==-1){return null
}}else{v--
}result.setMonth(v);
expected.month=v;
break;
case"E":case"e":var days=bundle["days-format-"+widthList[l-3]].concat();
if(!options.strict){v=v.toLowerCase();
days=dojo.map(days,"".toLowerCase)
}v=dojo.indexOf(days,v);
if(v==-1){return null
}break;
case"d":result.setDate(v);
expected.date=v;
break;
case"D":result.setMonth(0);
result.setDate(v);
break;
case"a":var am=options.am||bundle.am;
var pm=options.pm||bundle.pm;
if(!options.strict){var period=/\./g;
v=v.replace(period,"").toLowerCase();
am=am.replace(period,"").toLowerCase();
pm=pm.replace(period,"").toLowerCase()
}if(options.strict&&v!=am&&v!=pm){return null
}amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case"K":if(v==24){v=0
}case"h":case"H":case"k":if(v>23){return null
}result.setHours(v);
break;
case"m":result.setMinutes(v);
break;
case"s":result.setSeconds(v);
break;
case"S":result.setMilliseconds(v)
}});
var hours=result.getHours();
if(amPm==="p"&&hours<12){result.setHours(hours+12)
}else{if(amPm==="a"&&hours==12){result.setHours(0)
}}if(expected.year&&result.getFullYear()!=expected.year){return null
}if(expected.month&&result.getMonth()!=expected.month){return null
}if(expected.date&&result.getDate()!=expected.date){return null
}return result
};
function _processPattern(pattern,applyPattern,applyLiteral,applyAll){var identity=function(x){return x
};
applyPattern=applyPattern||identity;
applyLiteral=applyLiteral||identity;
applyAll=applyAll||identity;
var chunks=pattern.match(/(''|[^'])+/g);
var literal=false;
dojo.forEach(chunks,function(chunk,i){if(!chunk){chunks[i]=""
}else{chunks[i]=(literal?applyLiteral:applyPattern)(chunk);
literal=!literal
}});
return applyAll(chunks.join(""))
}function _buildDateTimeRE(tokens,bundle,options,pattern){pattern=dojo.regexp.escapeString(pattern);
if(!options.strict){pattern=pattern.replace(" a"," ?a")
}return pattern.replace(/([a-z])\1*/ig,function(match){var s;
var c=match.charAt(0);
var l=match.length;
var p2="",p3="";
if(options.strict){if(l>1){p2="0{"+(l-1)+"}"
}if(l>2){p3="0{"+(l-2)+"}"
}}else{p2="0?";
p3="0{0,2}"
}switch(c){case"y":s="\\d{2,4}";
break;
case"M":s=(l>2)?"\\S+":p2+"[1-9]|1[0-2]";
break;
case"D":s=p2+"[1-9]|"+p3+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":s=p2+"[1-9]|[12]\\d|3[01]";
break;
case"w":s=p2+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":s="\\S+";
break;
case"h":s=p2+"[1-9]|1[0-2]";
break;
case"k":s=p2+"\\d|1[01]";
break;
case"H":s=p2+"\\d|1\\d|2[0-3]";
break;
case"K":s=p2+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":s="[0-5]\\d";
break;
case"S":s="\\d{"+l+"}";
break;
case"a":var am=options.am||bundle.am||"AM";
var pm=options.pm||bundle.pm||"PM";
if(options.strict){s=am+"|"+pm
}else{s=am+"|"+pm;
if(am!=am.toLowerCase()){s+="|"+am.toLowerCase()
}if(pm!=pm.toLowerCase()){s+="|"+pm.toLowerCase()
}}break;
default:s=".*"
}if(tokens){tokens.push(match)
}return"("+s+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var _customFormats=[];
dojo.date.locale.addCustomFormats=function(packageName,bundleName){_customFormats.push({pkg:packageName,name:bundleName})
};
dojo.date.locale._getGregorianBundle=function(locale){var gregorian={};
dojo.forEach(_customFormats,function(desc){var bundle=dojo.i18n.getLocalization(desc.pkg,desc.name,locale);
gregorian=dojo.mixin(gregorian,bundle)
},this);
return gregorian
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,use,locale){var label;
var lookup=dojo.date.locale._getGregorianBundle(locale);
var props=[item,use,type];
if(use=="standAlone"){label=lookup[props.join("-")]
}props[1]="format";
return(label||lookup[props.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(dateObject,locale){var weekend=dojo.cldr.supplemental.getWeekend(locale);
var day=(dateObject||new Date()).getDay();
if(weekend.end<weekend.start){weekend.end+=7;
if(day<weekend.start){day+=7
}}return day>=weekend.start&&day<=weekend.end
};
dojo.date.locale._getDayOfYear=function(dateObject){return dojo.date.difference(new Date(dateObject.getFullYear(),0,1),dateObject)+1
};
dojo.date.locale._getWeekOfYear=function(dateObject,firstDayOfWeek){if(arguments.length==1){firstDayOfWeek=0
}var firstDayOfYear=new Date(dateObject.getFullYear(),0,1).getDay();
var adj=(firstDayOfYear-firstDayOfWeek+7)%7;
var week=Math.floor((dojo.date.locale._getDayOfYear(dateObject)+adj-1)/7);
if(firstDayOfYear==firstDayOfWeek){week++
}return week
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(value){if(!this.value||dojo.date.compare(value,this.value)){value=new Date(value);
this.displayMonth=new Date(value);
if(!this.isDisabledDate(value,this.lang)){this.value=value;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(node,text){while(node.firstChild){node.removeChild(node.firstChild)
}node.appendChild(document.createTextNode(text))
},_populateGrid:function(){var month=this.displayMonth;
month.setDate(1);
var firstDay=month.getDay();
var daysInMonth=dojo.date.getDaysInMonth(month);
var daysInPreviousMonth=dojo.date.getDaysInMonth(dojo.date.add(month,"month",-1));
var today=new Date();
var selected=this.value;
var dayOffset=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(dayOffset>firstDay){dayOffset-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(template,i){i+=dayOffset;
var date=new Date(month);
var number,clazz="dijitCalendar",adj=0;
if(i<firstDay){number=daysInPreviousMonth-firstDay+i+1;
adj=-1;
clazz+="Previous"
}else{if(i>=(firstDay+daysInMonth)){number=i-firstDay-daysInMonth+1;
adj=1;
clazz+="Next"
}else{number=i-firstDay+1;
clazz+="Current"
}}if(adj){date=dojo.date.add(date,"month",adj)
}date.setDate(number);
if(!dojo.date.compare(date,today,"date")){clazz="dijitCalendarCurrentDate "+clazz
}if(!dojo.date.compare(date,selected,"date")){clazz="dijitCalendarSelectedDate "+clazz
}if(this.isDisabledDate(date,this.lang)){clazz="dijitCalendarDisabledDate "+clazz
}template.className=clazz+"Month dijitCalendarDateTemplate";
template.dijitDateValue=date.valueOf();
var label=dojo.query(".dijitCalendarDateLabel",template)[0];
this._setText(label,date.getDate())
},this);
var monthNames=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,monthNames[month.getMonth()]);
var y=month.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(name){this._setText(this[name+"YearLabelNode"],dojo.date.locale.format(new Date(y++,0),{selector:"year",locale:this.lang}))
},this);
var _this=this;
var typematic=function(nodeProp,dateProp,adj){dijit.typematic.addMouseListener(_this[nodeProp],_this,function(count){if(count>=0){_this._adjustDisplay(dateProp,adj)
}},0.8,500)
};
typematic("incrementMonth","month",1);
typematic("decrementMonth","month",-1);
typematic("nextYearLabelNode","year",1);
typematic("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var cloneClass=dojo.hitch(this,function(clazz,n){var template=dojo.query(clazz,this.domNode)[0];
for(var i=0;
i<n;
i++){template.parentNode.appendChild(template.cloneNode(true))
}});
cloneClass(".dijitCalendarDayLabelTemplate",6);
cloneClass(".dijitCalendarDateTemplate",6);
cloneClass(".dijitCalendarWeekTemplate",5);
var dayNames=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var dayOffset=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(label,i){this._setText(label,dayNames[(i+dayOffset)%7])
},this);
var monthNames=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(monthNames,function(name){var monthSpacer=dojo.doc.createElement("div");
this._setText(monthSpacer,name);
this.monthLabelSpacer.appendChild(monthSpacer)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(part,amount){this.displayMonth=dojo.date.add(this.displayMonth,part,amount);
this._populateGrid()
},_onDayClick:function(evt){var node=evt.target;
dojo.stopEvent(evt);
while(!node.dijitDateValue){node=node.parentNode
}if(!dojo.hasClass(node,"dijitCalendarDisabledDate")){this.setValue(node.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(date){},onChange:function(date){},isDisabledDate:function(dateObject,locale){return false
}})
}if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(date,priority){this.value=date;
this._showText()
},isDisabledDate:function(dateObject,locale){return false
},_showText:function(){this.timeMenu.innerHTML="";
var fromIso=dojo.date.stamp.fromISOString;
this._clickableIncrementDate=fromIso(this.clickableIncrement);
this._visibleIncrementDate=fromIso(this.visibleIncrement);
this._visibleRangeDate=fromIso(this.visibleRange);
var sinceMidnight=function(date){return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds()
};
var clickableIncrementSeconds=sinceMidnight(this._clickableIncrementDate);
var visibleIncrementSeconds=sinceMidnight(this._visibleIncrementDate);
var visibleRangeSeconds=sinceMidnight(this._visibleRangeDate);
var time=this.value.getTime();
this._refDate=new Date(time-time%(visibleIncrementSeconds*1000));
this._clickableIncrement=1;
this._totalIncrements=visibleRangeSeconds/clickableIncrementSeconds;
this._visibleIncrement=visibleIncrementSeconds/clickableIncrementSeconds;
for(var i=-this._totalIncrements/2;
i<=this._totalIncrements/2;
i+=this._clickableIncrement){var div=this._createOption(i);
this.timeMenu.appendChild(div)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(index){var div=document.createElement("div");
var date=(div.date=new Date(this._refDate));
div.index=index;
var incrementDate=this._clickableIncrementDate;
date.setHours(date.getHours()+incrementDate.getHours()*index,date.getMinutes()+incrementDate.getMinutes()*index,date.getSeconds()+incrementDate.getSeconds()*index);
var innerDiv=document.createElement("div");
dojo.addClass(div,this.baseClass+"Item");
dojo.addClass(innerDiv,this.baseClass+"ItemInner");
innerDiv.innerHTML=dojo.date.locale.format(date,this.constraints);
div.appendChild(innerDiv);
if(index%this._visibleIncrement<1&&index%this._visibleIncrement>-1){dojo.addClass(div,this.baseClass+"Marker")
}else{if(index%this._clickableIncrement==0){dojo.addClass(div,this.baseClass+"Tick")
}}if(this.isDisabledDate(date)){dojo.addClass(div,this.baseClass+"ItemDisabled")
}if(dojo.date.compare(this.value,date,this.constraints.selector)==0){div.selected=true;
dojo.addClass(div,this.baseClass+"ItemSelected")
}return div
},_onOptionSelected:function(tgt){var tdate=tgt.target.date||tgt.target.parentNode.date;
if(!tdate||this.isDisabledDate(tdate)){return 
}this.setValue(tdate);
this.onValueSelected(tdate)
},onValueSelected:function(value){},onmouseover:function(e){var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
this._highlighted_option=tgr;
dojo.addClass(tgr,this.baseClass+"ItemHover")
},onmouseout:function(e){var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
if(this._highlighted_option===tgr){dojo.removeClass(tgr,this.baseClass+"ItemHover")
}},_mouseWheeled:function(e){dojo.stopEvent(e);
var scrollAmount=(dojo.isIE?e.wheelDelta:-e.detail);
this[(scrollAmount>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var index=this.timeMenu.childNodes[0].index-1;
var div=this._createOption(index);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(div,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var index=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var div=this._createOption(index);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(div)
}})
}if(!dojo._hasResource["dijit.form.TimeTextBox"]){dojo._hasResource["dijit.form.TimeTextBox"]=true;
dojo.provide("dijit.form.TimeTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form.RangeBoundTextBox,{regExpGen:dojo.date.locale.regexp,compare:dojo.date.compare,format:function(value,constraints){if(!value||value.toString()==this._invalid){return null
}return dojo.date.locale.format(value,constraints)
},parse:dojo.date.locale.parse,serialize:dojo.date.stamp.toISOString,value:new Date(""),_invalid:(new Date("")).toString(),_popupClass:"dijit._TimePicker",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
var constraints=this.constraints;
constraints.selector="time";
if(typeof constraints.min=="string"){constraints.min=dojo.date.stamp.fromISOString(constraints.min)
}if(typeof constraints.max=="string"){constraints.max=dojo.date.stamp.fromISOString(constraints.max)
}},_onFocus:function(evt){this._open()
},setValue:function(value,priorityChange){this.inherited("setValue",arguments);
if(this._picker){if(!value||value.toString()==this._invalid){value=new Date()
}this._picker.setValue(value)
}},_open:function(){if(this.disabled){return 
}var self=this;
if(!this._picker){var popupProto=dojo.getObject(this._popupClass,false);
this._picker=new popupProto({onValueSelected:function(value){self.focus();
setTimeout(dojo.hitch(self,"_close"),1);
dijit.form.TimeTextBox.superclass.setValue.call(self,value,true)
},lang:this.lang,constraints:this.constraints,isDisabledDate:function(date){return self.constraints&&(dojo.date.compare(self.constraints.min,date)>0||dojo.date.compare(self.constraints.max,date)<0)
}});
this._picker.setValue(this.getValue()||new Date())
}if(!this._opened){dijit.popup.open({parent:this,popup:this._picker,around:this.domNode,onCancel:dojo.hitch(this,this._close),onClose:function(){self._opened=false
}});
this._opened=true
}dojo.marginBox(this._picker.domNode,{w:this.domNode.offsetWidth})
},_close:function(){if(this._opened){dijit.popup.close(this._picker);
this._opened=false
}},_onBlur:function(){this._close();
this.inherited("_onBlur",arguments)
},getDisplayedValue:function(){return this.textbox.value
},setDisplayedValue:function(value){this.textbox.value=value
}})
}if(!dojo._hasResource["dijit.form.DateTextBox"]){dojo._hasResource["dijit.form.DateTextBox"]=true;
dojo.provide("dijit.form.DateTextBox");
dojo.declare("dijit.form.DateTextBox",dijit.form.TimeTextBox,{_popupClass:"dijit._Calendar",postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.selector="date"
}})
}if(!dojo._hasResource["dijit.form.FilteringSelect"]){dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(result,dataObject,priorityChange){if(dataObject&&dataObject.query[this.searchAttr]!=this._lastQuery){return 
}if(!result.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(result[0],priorityChange)
}},_openResultList:function(results,dataObject){if(dataObject.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=results.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(value,displayedValue,priorityChange){this.valueNode.value=value;
dijit.form.FilteringSelect.superclass.setValue.call(this,value,priorityChange,displayedValue);
this._lastDisplayedValue=displayedValue
},setValue:function(value,priorityChange){var self=this;
var handleFetchByIdentity=function(item,priorityChange){if(item){if(self.store.isItemLoaded(item)){self._callbackSetLabel([item],undefined,priorityChange)
}else{self.store.loadItem({item:item,onItem:function(result,dataObject){self._callbackSetLabel(result,dataObject,priorityChange)
}})
}}else{self._isvalid=false;
self.validate(false)
}};
this.store.fetchItemByIdentity({identity:value,onItem:function(item){handleFetchByIdentity(item,priorityChange)
}})
},_setValueFromItem:function(item,priorityChange){this._isvalid=true;
this._setValue(this.store.getIdentity(item),this.labelFunc(item,this.store),priorityChange)
},labelFunc:function(item,store){return store.getValue(item,this.searchAttr)
},onkeyup:function(evt){},_doSelect:function(tgt){this.item=tgt.item;
this._setValueFromItem(tgt.item,true)
},setDisplayedValue:function(label){if(this.store){var query={};
this._lastQuery=query[this.searchAttr]=label;
this.textbox.value=label;
this._lastDisplayedValue=label;
this.store.fetch({query:query,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:dojo.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(item){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(item,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}if(!dojo._hasResource["dijit.form._Spinner"]){dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(val,delta){return val
},_handleUpArrowEvent:function(e){this._onMouse(e,this.upArrowNode)
},_handleDownArrowEvent:function(e){this._onMouse(e,this.downArrowNode)
},_arrowPressed:function(nodePressed,direction){if(this.disabled){return 
}dojo.addClass(nodePressed,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),direction*this.smallDelta),false)
},_arrowReleased:function(node){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
dojo.removeClass(node,"dijitSpinnerButtonActive")
},_typematicCallback:function(count,node,evt){if(node==this.textbox){node=(evt.keyCode==dojo.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(count==-1){this._arrowReleased(node)
}else{this._arrowPressed(node,(node==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(evt){dojo.stopEvent(evt);
var scrollAmount=0;
if(typeof evt.wheelDelta=="number"){scrollAmount=evt.wheelDelta
}else{if(typeof evt.detail=="number"){scrollAmount=-evt.detail
}}if(scrollAmount>0){var node=this.upArrowNode;
var dir=+1
}else{if(scrollAmount<0){var node=this.downArrowNode;
var dir=-1
}else{return 
}}this._arrowPressed(node,dir);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var _this=this;
this._wheelTimer=setTimeout(function(){_this._arrowReleased(node)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}if(!dojo._hasResource["dijit.form.NumberSpinner"]){dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{required:true,adjust:function(val,delta){var newval=val+delta;
if(isNaN(val)||isNaN(newval)){return val
}if((typeof this.constraints.max=="number")&&(newval>this.constraints.max)){newval=this.constraints.max
}if((typeof this.constraints.min=="number")&&(newval<this.constraints.min)){newval=this.constraints.min
}return newval
}})
}if(!dojo._hasResource["dijit.form.Slider"]){dojo._hasResource["dijit.form.Slider"]=true;
dojo.provide("dijit.form.Slider");
dojo.declare("dijit.form.HorizontalSlider",[dijit.form._FormWidget,dijit._Container],{templateString:'<table class="dijit dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,topDecoration" class="dijitReset" style="text-align:center;width:100%;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer"\r\n\t\t\t><div class="dijitHorizontalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderLeftBumper dijitHorizontalSliderLeftBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><div style="position:relative;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderProgressBar dijitHorizontalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable dijitHorizontalSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitHorizontalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderRemainingBar dijitHorizontalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderRightBumper dijitHorizontalSliderRightBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer" style="right:0px;"\r\n\t\t\t><div class="dijitHorizontalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,bottomDecoration" class="dijitReset" style="text-align:center;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n></table>\r\n',value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,widgetsInTemplate:true,attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:"valueNode"}),baseClass:"dijitSlider",_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_upsideDown:false,_onKeyPress:function(e){if(this.disabled||e.altKey||e.ctrlKey){return 
}switch(e.keyCode){case dojo.keys.HOME:this.setValue(this.minimum,false);
break;
case dojo.keys.END:this.setValue(this.maximum,false);
break;
case dojo.keys.UP_ARROW:case (this._isReversed()?dojo.keys.LEFT_ARROW:dojo.keys.RIGHT_ARROW):case dojo.keys.PAGE_UP:this.increment(e);
break;
case dojo.keys.DOWN_ARROW:case (this._isReversed()?dojo.keys.RIGHT_ARROW:dojo.keys.LEFT_ARROW):case dojo.keys.PAGE_DOWN:this.decrement(e);
break;
default:this.inherited("_onKeyPress",arguments);
return 
}dojo.stopEvent(e)
},_onHandleClick:function(e){if(this.disabled){return 
}if(!dojo.isIE){dijit.focus(this.sliderHandle)
}dojo.stopEvent(e)
},_isReversed:function(){return !(this._upsideDown||this.isLeftToRight())
},_onBarClick:function(e){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
dojo.stopEvent(e);
var abspos=dojo.coords(this.sliderBarContainer,true);
var pixelValue=e[this._mousePixelCoord]-abspos[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(abspos[this._pixelCount]-pixelValue):pixelValue,abspos[this._pixelCount],true)
},_setPixelValue:function(pixelValue,maxPixels,priorityChange){if(this.disabled){return 
}pixelValue=pixelValue<0?0:maxPixels<pixelValue?maxPixels:pixelValue;
var count=this.discreteValues;
if(count<=1||count==Infinity){count=maxPixels
}count--;
var pixelsPerValue=maxPixels/count;
var wholeIncrements=Math.round(pixelValue/pixelsPerValue);
this.setValue((this.maximum-this.minimum)*wholeIncrements/count+this.minimum,priorityChange)
},setValue:function(value,priorityChange){this.valueNode.value=this.value=value;
this.inherited("setValue",arguments);
var percent=(value-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(percent*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-percent)*100)+"%"
},_bumpValue:function(signedChange){if(this.disabled){return 
}var s=dojo.getComputedStyle(this.sliderBarContainer);
var c=dojo._getContentBox(this.sliderBarContainer,s);
var count=this.discreteValues;
if(count<=1||count==Infinity){count=c[this._pixelCount]
}count--;
var value=(this.value-this.minimum)*count/(this.maximum-this.minimum)+signedChange;
if(value<0){value=0
}if(value>count){value=count
}value=value*(this.maximum-this.minimum)/count+this.minimum;
this.setValue(value,true)
},decrement:function(e){this._bumpValue(e.keyCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(e){this._bumpValue(e.keyCode==dojo.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(evt){dojo.stopEvent(evt);
var scrollAmount=0;
if(typeof evt.wheelDelta=="number"){scrollAmount=evt.wheelDelta
}else{if(typeof evt.detail=="number"){scrollAmount=-evt.detail
}}if(scrollAmount>0){this.increment(evt)
}else{if(scrollAmount<0){this.decrement(evt)
}}},startup:function(){dojo.forEach(this.getChildren(),function(child){if(this[child.container]!=this.containerNode){this[child.container].appendChild(child.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var _self=this;
var mover=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=_self
};
dojo.extend(mover,dijit.form._SliderMover.prototype);
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:mover});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(e){var widget=this.widget;
var c=this.constraintBox;
if(!c){var container=widget.sliderBarContainer;
var s=dojo.getComputedStyle(container);
var c=dojo._getContentBox(container,s);
c[widget._startingPixelCount]=0;
this.constraintBox=c
}var m=this.marginBox;
var pixelValue=widget._isReversed()?e[widget._mousePixelCoord]-dojo._abs(widget.sliderBarContainer).x:m[widget._startingPixelCount]+e[widget._mousePixelCoord];
dojo.hitch(widget,"_setPixelValue")(widget._isReversed()||widget._upsideDown?(c[widget._pixelCount]-pixelValue):pixelValue,c[widget._pixelCount])
},destroy:function(e){var widget=this.widget;
widget.setValue(widget.value,true);
dojo.dnd.Mover.prototype.destroy.call(this)
}});
dojo.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(pos,ndx){return this._positionPrefix+pos+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var innerHTML=this._genHTML(50,0)
}else{var interval=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var innerHTML=this._genHTML(0,0);
for(var i=1;
i<this.count-1;
i++){innerHTML+=this._genHTML(interval*i,i)
}innerHTML+=this._genHTML(100,this.count-1)
}else{var innerHTML=this._genHTML(100,0);
for(var i=1;
i<this.count-1;
i++){innerHTML+=this._genHTML(100-interval*i,i)
}innerHTML+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=innerHTML
}});
dojo.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
dojo.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(pos){return pos
},_genHTML:function(pos,ndx){return this._positionPrefix+this._calcPosition(pos)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[ndx]+this._suffix
},getLabels:function(){var labels=this.labels;
if(!labels.length){labels=dojo.query("> li",this.srcNodeRef).map(function(node){return String(node.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!labels.length&&this.count>1){var start=this.minimum;
var inc=(this.maximum-start)/(this.count-1);
for(var i=0;
i<this.count;
i++){labels.push((i<this.numericMargin||i>=(this.count-this.numericMargin))?"":dojo.number.format(start,this.constraints));
start+=inc
}}return labels
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
dojo.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(pos){return 100-pos
},_isHorizontal:false})
}if(!dojo._hasResource["dijit.form.Textarea"]){dojo._hasResource["dijit.form.Textarea"]=true;
dojo.provide("dijit.form.Textarea");
dojo.declare("dijit.form.Textarea",dijit.form._FormWidget,{attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{style:"styleNode","class":"styleNode"}),templateString:(dojo.isIE||dojo.isSafari||dojo.isMozilla)?((dojo.isIE||dojo.isSafari)?'<fieldset id="${id}" class="dijitInline dijitInputField dijitTextArea" dojoAttachPoint="styleNode" waiRole="presentation"><div dojoAttachPoint="editNode,focusNode,eventNode" dojoAttachEvent="onpaste:_changing,oncut:_changing" waiRole="textarea" style="text-decoration:none;_padding-bottom:16px;display:block;overflow:auto;" contentEditable="true"></div>':'<span id="${id}" class="dijitReset"><iframe src="javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();<\/script></body></html>" dojoAttachPoint="iframe,styleNode" dojoAttachEvent="onblur:_onIframeBlur" class="dijitInline dijitInputField dijitTextArea"></iframe>')+'<textarea name="${name}" value="${value}" dojoAttachPoint="formValueNode" style="display:none;"></textarea>'+((dojo.isIE||dojo.isSafari)?"</fieldset>":"</span>"):'<textarea id="${id}" name="${name}" value="${value}" dojoAttachPoint="formValueNode,editNode,focusNode,styleNode" class="dijitInputField dijitTextArea"></textarea>',focus:function(){if(!this.disabled){this._changing()
}if(dojo.isMozilla){dijit.focus(this.iframe)
}else{dijit.focus(this.focusNode)
}},setValue:function(value,priorityChange){var editNode=this.editNode;
if(typeof value=="string"){editNode.innerHTML="";
if(value.split){var _this=this;
var isFirst=true;
dojo.forEach(value.split("\n"),function(line){if(isFirst){isFirst=false
}else{editNode.appendChild(document.createElement("BR"))
}editNode.appendChild(document.createTextNode(line))
})
}else{editNode.appendChild(document.createTextNode(value))
}}else{value=editNode.innerHTML;
if(this.iframe){value=value.replace(/<div><\/div>\r?\n?$/i,"")
}value=value.replace(/\s*\r?\n|^\s+|\s+$|&nbsp;/g,"").replace(/>\s+</g,"><").replace(/<\/(p|div)>$|^<(p|div)[^>]*>/gi,"").replace(/([^>])<div>/g,"$1\n").replace(/<\/p>\s*<p[^>]*>|<br[^>]*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
}this.value=this.formValueNode.value=value;
if(this.iframe){var sizeNode=document.createElement("div");
editNode.appendChild(sizeNode);
var newHeight=sizeNode.offsetTop;
if(editNode.scrollWidth>editNode.clientWidth){newHeight+=16
}if(this.lastHeight!=newHeight){if(newHeight==0){newHeight=16
}dojo.contentBox(this.iframe,{h:newHeight});
this.lastHeight=newHeight
}editNode.removeChild(sizeNode)
}dijit.form.Textarea.superclass.setValue.call(this,this.getValue(),priorityChange)
},getValue:function(){return this.formValueNode.value.replace(/\r/g,"")
},postMixInProperties:function(){dijit.form.Textarea.superclass.postMixInProperties.apply(this,arguments);
if(this.srcNodeRef&&this.srcNodeRef.innerHTML!=""){this.value=this.srcNodeRef.innerHTML;
this.srcNodeRef.innerHTML=""
}if((!this.value||this.value=="")&&this.srcNodeRef&&this.srcNodeRef.value){this.value=this.srcNodeRef.value
}if(!this.value){this.value=""
}this.value=this.value.replace(/\r\n/g,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
if(dojo.isMozilla){var _nlsResources=dojo.i18n.getLocalization("dijit","Textarea");
this._iframeEditTitle=_nlsResources.iframeEditTitle;
this._iframeFocusTitle=_nlsResources.iframeFocusTitle;
var label=dojo.query('label[for="'+this.id+'"]');
if(label.length){this._iframeEditTitle=label[0].innerHTML+" "+this._iframeEditTitle
}var body=this.focusNode=this.editNode=document.createElement("BODY");
body.style.margin="0px";
body.style.padding="0px";
body.style.border="0px"
}},postCreate:function(){if(dojo.isIE||dojo.isSafari){this.domNode.style.overflowY="hidden"
}else{if(dojo.isMozilla){var w=this.iframe.contentWindow;
try{var title=this.iframe.contentDocument.title
}catch(e){var title=""
}if(!w||!title){this.iframe.postCreate=dojo.hitch(this,this.postCreate);
return 
}var d=w.document;
d.getElementsByTagName("HTML")[0].replaceChild(this.editNode,d.getElementsByTagName("BODY")[0]);
if(!this.isLeftToRight()){d.getElementsByTagName("HTML")[0].dir="rtl"
}this.iframe.style.overflowY="hidden";
this.eventNode=d;
w.addEventListener("resize",dojo.hitch(this,this._changed),false)
}else{this.focusNode=this.domNode
}}if(this.eventNode){this.connect(this.eventNode,"keypress",this._onKeyPress);
this.connect(this.eventNode,"mousemove",this._changed);
this.connect(this.eventNode,"focus",this._focused);
this.connect(this.eventNode,"blur",this._blurred)
}if(this.editNode){this.connect(this.editNode,"change",this._changed)
}this.inherited("postCreate",arguments)
},_focused:function(e){dojo.addClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(e)
},_blurred:function(e){dojo.removeClass(this.iframe||this.domNode,"dijitInputFieldFocused");
this._changed(e,true)
},_onIframeBlur:function(){this.iframe.contentDocument.title=this._iframeEditTitle
},_onKeyPress:function(e){if(e.keyCode==dojo.keys.TAB&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&this.iframe){this.iframe.contentDocument.title=this._iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(e)
}else{if(e.keyCode==dojo.keys.ENTER){e.stopPropagation()
}else{if(this.inherited("_onKeyPress",arguments)&&this.iframe){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.keyCode,e.charCode);
this.iframe.dispatchEvent(te)
}}}this._changing()
},_changing:function(e){setTimeout(dojo.hitch(this,"_changed",e,false),1)
},_changed:function(e,priorityChange){if(this.iframe&&this.iframe.contentDocument.designMode!="on"){this.iframe.contentDocument.designMode="on"
}this.setValue(null,priorityChange)
}})
}if(!dojo._hasResource["dijit.layout.StackContainer"]){dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var children=this.getChildren();
dojo.forEach(children,this._setupChild,this);
dojo.some(children,function(child){if(child.selected){this.selectedChildWidget=child
}return child.selected
},this);
var selected=this.selectedChildWidget;
if(!selected&&children[0]){selected=this.selectedChildWidget=children[0];
selected.selected=true
}if(selected){this._showChild(selected)
}dojo.publish(this.id+"-startup",[{children:children,selected:selected}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(page){page.domNode.style.display="none";
page.domNode.style.position="relative";
return page
},addChild:function(child,insertIndex){dijit._Container.prototype.addChild.apply(this,arguments);
child=this._setupChild(child);
if(this._started){this.layout();
dojo.publish(this.id+"-addChild",[child,insertIndex]);
if(!this.selectedChildWidget){this.selectChild(child)
}}},removeChild:function(page){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){dojo.publish(this.id+"-removeChild",[page]);
this.layout()
}if(this.selectedChildWidget===page){this.selectedChildWidget=undefined;
if(this._started){var children=this.getChildren();
if(children.length){this.selectChild(children[0])
}}}},selectChild:function(page){page=dijit.byId(page);
if(this.selectedChildWidget!=page){this._transition(page,this.selectedChildWidget);
this.selectedChildWidget=page;
dojo.publish(this.id+"-selectChild",[page])
}},_transition:function(newWidget,oldWidget){if(oldWidget){this._hideChild(oldWidget)
}this._showChild(newWidget);
if(this.doLayout&&newWidget.resize){newWidget.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(forward){var children=this.getChildren();
var index=dojo.indexOf(children,this.selectedChildWidget);
index+=forward?1:children.length-1;
return children[index%children.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(e){dojo.publish(this.id+"-containerKeyPress",[{e:e,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(page){var children=this.getChildren();
page.isFirstChild=(page==children[0]);
page.isLastChild=(page==children[children.length-1]);
page.selected=true;
page.domNode.style.display="";
if(page._loadCheck){page._loadCheck()
}if(page.onShow){page.onShow()
}},_hideChild:function(page){page.selected=false;
page.domNode.style.display="none";
if(page.onHide){page.onHide()
}},closeChild:function(page){var remove=page.onClose(this,page);
if(remove){this.removeChild(page);
page.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[dojo.subscribe(this.containerId+"-startup",this,"onStartup"),dojo.subscribe(this.containerId+"-addChild",this,"onAddChild"),dojo.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),dojo.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),dojo.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(info){dojo.forEach(info.children,this.onAddChild,this);
this.onSelectChild(info.selected)
},destroy:function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(page,insertIndex){var refNode=document.createElement("span");
this.domNode.appendChild(refNode);
var cls=dojo.getObject(this.buttonWidget);
var button=new cls({label:page.title,closeButton:page.closable},refNode);
this.addChild(button,insertIndex);
this.pane2button[page]=button;
page.controlButton=button;
dojo.connect(button,"onClick",dojo.hitch(this,"onButtonClick",page));
dojo.connect(button,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",page));
if(!this._currentChild){button.focusNode.setAttribute("tabIndex","0");
this._currentChild=page
}},onRemoveChild:function(page){if(this._currentChild===page){this._currentChild=null
}var button=this.pane2button[page];
if(button){button.destroy()
}this.pane2button[page]=null
},onSelectChild:function(page){if(!page){return 
}if(this._currentChild){var oldButton=this.pane2button[this._currentChild];
oldButton.setChecked(false);
oldButton.focusNode.setAttribute("tabIndex","-1")
}var newButton=this.pane2button[page];
newButton.setChecked(true);
this._currentChild=page;
newButton.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(page){var container=dijit.byId(this.containerId);
container.selectChild(page)
},onCloseButtonClick:function(page){var container=dijit.byId(this.containerId);
container.closeChild(page);
var b=this.pane2button[this._currentChild];
if(b){dijit.focus(b.focusNode||b.domNode)
}},adjacent:function(forward){var children=this.getChildren();
var current=dojo.indexOf(children,this.pane2button[this._currentChild]);
var offset=forward?1:children.length-1;
return children[(current+offset)%children.length]
},onkeypress:function(e){if(this.disabled||e.altKey){return 
}var forward=true;
if(e.ctrlKey||!e._djpage){var k=dojo.keys;
switch(e.keyCode){case k.LEFT_ARROW:case k.UP_ARROW:case k.PAGE_UP:forward=false;
case k.RIGHT_ARROW:case k.DOWN_ARROW:case k.PAGE_DOWN:this.adjacent(forward).onClick();
dojo.stopEvent(e);
break;
case k.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(e);
break;
default:if(e.ctrlKey){if(e.keyCode==k.TAB){this.adjacent(!e.shiftKey).onClick();
dojo.stopEvent(e)
}else{if(e.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(e)
}}}}}},onContainerKeyPress:function(info){info.e._djpage=info.page;
this.onkeypress(info.e)
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(evt){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(evt){dijit.focus(this.focusNode)
},onClickCloseButton:function(evt){evt.stopPropagation()
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
if(this.selectedChildWidget){var style=this.selectedChildWidget.containerNode.style;
style.display="";
style.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var totalCollapsedHeight=0;
var openPane=this.selectedChildWidget;
dojo.forEach(this.getChildren(),function(child){totalCollapsedHeight+=child.getTitleHeight()
});
var mySize=this._contentBox;
this._verticalSpace=(mySize.h-totalCollapsedHeight);
if(openPane){openPane.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(page){return page
},_transition:function(newWidget,oldWidget){if(this._inTransition){return 
}this._inTransition=true;
var animations=[];
var paneHeight=this._verticalSpace;
if(newWidget){newWidget.setSelected(true);
var newContents=newWidget.containerNode;
newContents.style.display="";
animations.push(dojo.animateProperty({node:newContents,duration:this.duration,properties:{height:{start:"1",end:paneHeight}},onEnd:function(){newContents.style.overflow="auto"
}}))
}if(oldWidget){oldWidget.setSelected(false);
var oldContents=oldWidget.containerNode;
oldContents.style.overflow="hidden";
animations.push(dojo.animateProperty({node:oldContents,duration:this.duration,properties:{height:{start:paneHeight,end:"1"}},onEnd:function(){oldContents.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(animations).play()
},_onKeyPress:function(e){if(this.disabled||e.altKey){return 
}var k=dojo.keys;
switch(e.keyCode){case k.LEFT_ARROW:case k.UP_ARROW:case k.PAGE_UP:this._adjacent(false)._onTitleClick();
dojo.stopEvent(e);
break;
case k.RIGHT_ARROW:case k.DOWN_ARROW:case k.PAGE_DOWN:this._adjacent(true)._onTitleClick();
dojo.stopEvent(e);
break;
default:if(e.ctrlKey&&e.keyCode==k.TAB){this._adjacent(e._dijitWidget,!e.shiftKey)._onTitleClick();
dojo.stopEvent(e)
}}}});
dojo.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
dojo.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return dojo.marginBox(this.titleNode).h
},_onTitleClick:function(){var parent=this.getParent();
if(!parent._inTransition){parent.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(evt){evt._dijitWidget=this;
return this.getParent()._onKeyPress(evt)
},_setSelectedState:function(isSelected){this.selected=isSelected;
dojo[(isSelected?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",isSelected?"0":"-1")
},_handleFocus:function(e){dojo[(e.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(isSelected){this._setSelectedState(isSelected);
if(isSelected){this.onSelected()
}},onSelected:function(){}})
}if(!dojo._hasResource["dijit.layout.LayoutContainer"]){dojo._hasResource["dijit.layout.LayoutContainer"]=true;
dojo.provide("dijit.layout.LayoutContainer");
dojo.declare("dijit.layout.LayoutContainer",dijit.layout._LayoutWidget,{layout:function(){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
},addChild:function(child,insertIndex){dijit._Container.prototype.addChild.apply(this,arguments);
if(this._started){dijit.layout.layoutChildren(this.domNode,this._contentBox,this.getChildren())
}},removeChild:function(widget){dijit._Container.prototype.removeChild.apply(this,arguments);
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
}catch(e){this.sizerWidth=7
}}var sizer=this.virtualSizer=document.createElement("div");
sizer.style.position="relative";
sizer.style.zIndex=10;
sizer.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(sizer);
dojo.setSelectable(sizer,false)
},startup:function(){if(this._started){return 
}dojo.forEach(this.getChildren(),function(child,i,children){this._injectChild(child);
if(i<children.length-1){this._addSizer()
}},this);
if(this.persist){this._restoreState()
}this.inherited("startup",arguments);
this._started=true
},_injectChild:function(child){child.domNode.style.position="absolute";
dojo.addClass(child.domNode,"dijitSplitPane")
},_addSizer:function(){var i=this.sizers.length;
var sizer=this.sizers[i]=document.createElement("div");
sizer.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var thumb=document.createElement("div");
thumb.className="thumb";
sizer.appendChild(thumb);
var self=this;
var handler=(function(){var sizer_i=i;
return function(e){self.beginSizing(e,sizer_i)
}
})();
dojo.connect(sizer,"onmousedown",handler);
this.domNode.appendChild(sizer);
dojo.setSelectable(sizer,false)
},removeChild:function(widget){if(this.sizers.length&&dojo.indexOf(this.getChildren(),widget)!=-1){var i=this.sizers.length-1;
dojo._destroyElement(this.sizers[i]);
this.sizers.length--
}this.inherited("removeChild",arguments);
if(this._started){this.layout()
}},addChild:function(child,insertIndex){this.inherited("addChild",arguments);
if(this._started){this._injectChild(child);
var children=this.getChildren();
if(children.length>1){this._addSizer()
}this.layout()
}},layout:function(){this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var children=this.getChildren();
if(!children.length){return 
}var space=this.isHorizontal?this.paneWidth:this.paneHeight;
if(children.length>1){space-=this.sizerWidth*(children.length-1)
}var outOf=0;
dojo.forEach(children,function(child){outOf+=child.sizeShare
});
var pixPerUnit=space/outOf;
var totalSize=0;
dojo.forEach(children.slice(0,children.length-1),function(child){var size=Math.round(pixPerUnit*child.sizeShare);
child.sizeActual=size;
totalSize+=size
});
children[children.length-1].sizeActual=space-totalSize;
this._checkSizes();
var pos=0;
var size=children[0].sizeActual;
this._movePanel(children[0],pos,size);
children[0].position=pos;
pos+=size;
if(!this.sizers){return 
}dojo.some(children.slice(1),function(child,i){if(!this.sizers[i]){return true
}this._moveSlider(this.sizers[i],pos,this.sizerWidth);
this.sizers[i].position=pos;
pos+=this.sizerWidth;
size=child.sizeActual;
this._movePanel(child,pos,size);
child.position=pos;
pos+=size
},this)
},_movePanel:function(panel,pos,size){if(this.isHorizontal){panel.domNode.style.left=pos+"px";
panel.domNode.style.top=0;
var box={w:size,h:this.paneHeight};
if(panel.resize){panel.resize(box)
}else{dojo.marginBox(panel.domNode,box)
}}else{panel.domNode.style.left=0;
panel.domNode.style.top=pos+"px";
var box={w:this.paneWidth,h:size};
if(panel.resize){panel.resize(box)
}else{dojo.marginBox(panel.domNode,box)
}}},_moveSlider:function(slider,pos,size){if(this.isHorizontal){slider.style.left=pos+"px";
slider.style.top=0;
dojo.marginBox(slider,{w:size,h:this.paneHeight})
}else{slider.style.left=0;
slider.style.top=pos+"px";
dojo.marginBox(slider,{w:this.paneWidth,h:size})
}},_growPane:function(growth,pane){if(growth>0){if(pane.sizeActual>pane.sizeMin){if((pane.sizeActual-pane.sizeMin)>growth){pane.sizeActual=pane.sizeActual-growth;
growth=0
}else{growth-=pane.sizeActual-pane.sizeMin;
pane.sizeActual=pane.sizeMin
}}}return growth
},_checkSizes:function(){var totalMinSize=0;
var totalSize=0;
var children=this.getChildren();
dojo.forEach(children,function(child){totalSize+=child.sizeActual;
totalMinSize+=child.sizeMin
});
if(totalMinSize<=totalSize){var growth=0;
dojo.forEach(children,function(child){if(child.sizeActual<child.sizeMin){growth+=child.sizeMin-child.sizeActual;
child.sizeActual=child.sizeMin
}});
if(growth>0){var list=this.isDraggingLeft?children.reverse():children;
dojo.forEach(list,function(child){growth=this._growPane(growth,child)
},this)
}}else{dojo.forEach(children,function(child){child.sizeActual=Math.round(totalSize*(child.sizeMin/totalMinSize))
})
}},beginSizing:function(e,i){var children=this.getChildren();
this.paneBefore=children[i];
this.paneAfter=children[i+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[i];
if(!this.cover){this.cover=dojo.doc.createElement("div");
this.domNode.appendChild(this.cover);
var s=this.cover.style;
s.position="absolute";
s.zIndex=1;
s.top=0;
s.left=0;
s.width="100%";
s.height="100%"
}else{this.cover.style.zIndex=1
}this.sizingSplitter.style.zIndex=2;
this.originPos=dojo.coords(children[0].domNode,true);
if(this.isHorizontal){var client=(e.layerX?e.layerX:e.offsetX);
var screen=e.pageX;
this.originPos=this.originPos.x
}else{var client=(e.layerY?e.layerY:e.offsetY);
var screen=e.pageY;
this.originPos=this.originPos.y
}this.startPoint=this.lastPoint=screen;
this.screenToClientOffset=screen-client;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){this._showSizingLine()
}this._connects=[];
this._connects.push(dojo.connect(document.documentElement,"onmousemove",this,"changeSizing"));
this._connects.push(dojo.connect(document.documentElement,"onmouseup",this,"endSizing"));
dojo.stopEvent(e)
},changeSizing:function(e){if(!this.isSizing){return 
}this.lastPoint=this.isHorizontal?e.pageX:e.pageY;
this.movePoint();
if(this.activeSizing){this._updateSize()
}else{this._moveSizingLine()
}dojo.stopEvent(e)
},endSizing:function(e){if(!this.isSizing){return 
}if(this.cover){this.cover.style.zIndex=-1
}if(!this.activeSizing){this._hideSizingLine()
}this._updateSize();
this.isSizing=false;
if(this.persist){this._saveState(this)
}dojo.forEach(this._connects,dojo.disconnect)
},movePoint:function(){var p=this.lastPoint-this.screenToClientOffset;
var a=p-this.dragOffset;
a=this.legaliseSplitPoint(a);
p=a+this.dragOffset;
this.lastPoint=p+this.screenToClientOffset
},legaliseSplitPoint:function(a){a+=this.sizingSplitter.position;
this.isDraggingLeft=!!(a>0);
if(!this.activeSizing){var min=this.paneBefore.position+this.paneBefore.sizeMin;
if(a<min){a=min
}var max=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
if(a>max){a=max
}}a-=this.sizingSplitter.position;
this._checkSizes();
return a
},_updateSize:function(){var pos=this.lastPoint-this.dragOffset-this.originPos;
var start_region=this.paneBefore.position;
var end_region=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=pos-start_region;
this.paneAfter.position=pos+this.sizerWidth;
this.paneAfter.sizeActual=end_region-this.paneAfter.position;
dojo.forEach(this.getChildren(),function(child){child.sizeShare=child.sizeActual
});
if(this._started){this.layout()
}},_showSizingLine:function(){this._moveSizingLine();
dojo.marginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block"
},_hideSizingLine:function(){this.virtualSizer.style.display="none"
},_moveSizingLine:function(){var pos=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
dojo.style(this.virtualSizer,(this.isHorizontal?"left":"top"),pos+"px")
},_getCookieName:function(i){return this.id+"_"+i
},_restoreState:function(){dojo.forEach(this.getChildren(),function(child,i){var cookieName=this._getCookieName(i);
var cookieValue=dojo.cookie(cookieName);
if(cookieValue){var pos=parseInt(cookieValue);
if(typeof pos=="number"){child.sizeShare=pos
}}},this)
},_saveState:function(){dojo.forEach(this.getChildren(),function(child,i){dojo.cookie(this._getCookieName(i),child.sizeShare)
},this)
}});
dojo.extend(dijit._Widget,{sizeMin:10,sizeShare:10})
}if(!dojo._hasResource["dijit.layout.TabContainer"]){dojo._hasResource["dijit.layout.TabContainer"]=true;
dojo.provide("dijit.layout.TabContainer");
dojo.declare("dijit.layout.TabContainer",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",templateString:null,templateString:'<div class="dijitTabContainer">\r\n\t<div dojoAttachPoint="tablistNode"></div>\r\n\t<div class="dijitTabPaneWrapper" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',postCreate:function(){dijit.layout.TabContainer.superclass.postCreate.apply(this,arguments);
this.tablist=new dijit.layout.TabController({id:this.id+"_tablist",tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id},this.tablistNode)
},_setupChild:function(tab){dojo.addClass(tab.domNode,"dijitTabPane");
this.inherited("_setupChild",arguments);
return tab
},startup:function(){if(this._started){return 
}this.tablist.startup();
this.inherited("startup",arguments);
if(dojo.isSafari){setTimeout(dojo.hitch(this,"layout"),0)
}},layout:function(){if(!this.doLayout){return 
}var titleAlign=this.tabPosition.replace(/-h/,"");
var children=[{domNode:this.tablist.domNode,layoutAlign:titleAlign},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,children);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,children[1]);
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
}}});