dojo._xdResourceLoaded({depends:[["provide","dojo.colors"]],defineResource:function(A){if(!A._hasResource["dojo.colors"]){A._hasResource["dojo.colors"]=true;
A.provide("dojo.colors");
(function(){var C=function(E,D,F){if(F<0){++F
}if(F>1){--F
}var G=6*F;
if(G<1){return E+(D-E)*G
}if(2*F<1){return D
}if(3*F<2){return E+(D-E)*(2/3-F)*6
}return E
};
A.colorFromRgb=function(E,G){var P=E.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(P){var J=P[2].split(/\s*,\s*/),Q=J.length,R=P[1];
if((R=="rgb"&&Q==3)||(R=="rgba"&&Q==4)){var D=J[0];
if(D.charAt(D.length-1)=="%"){var K=A.map(J,function(H){return parseFloat(H)*2.56
});
if(Q==4){K[3]=J[3]
}return A.colorFromArray(K,G)
}return A.colorFromArray(J,G)
}if((R=="hsl"&&Q==3)||(R=="hsla"&&Q==4)){var M=((parseFloat(J[0])%360)+360)%360/360,F=parseFloat(J[1])/100,I=parseFloat(J[2])/100,N=I<=0.5?I*(F+1):I+F-I*F,O=2*I-N,K=[C(O,N,M+1/3)*256,C(O,N,M)*256,C(O,N,M-1/3)*256,1];
if(Q==4){K[3]=J[3]
}return A.colorFromArray(K,G)
}}return null
};
var B=function(F,D,E){F=Number(F);
return isNaN(F)?E:F<D?D:F>E?E:F
};
A.Color.prototype.sanitize=function(){var D=this;
D.r=Math.round(B(D.r,0,255));
D.g=Math.round(B(D.g,0,255));
D.b=Math.round(B(D.b,0,255));
D.a=B(D.a,0,1);
return this
}
})();
A.colors.makeGrey=function(B,C){return A.colorFromArray([B,B,B,C])
};
A.Color.named=A.mixin({aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},A.Color.named)
}}});