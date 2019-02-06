dojo._xdResourceLoaded({depends:[["provide","dojox.string.sprintf"],["require","dojox.string.tokenize"]],defineResource:function(A){if(!A._hasResource["dojox.string.sprintf"]){A._hasResource["dojox.string.sprintf"]=true;
A.provide("dojox.string.sprintf");
A.require("dojox.string.tokenize");
dojox.string.sprintf=function(F,E){for(var B=[],D=1;
D<arguments.length;
D++){B.push(arguments[D])
}var C=new dojox.string.sprintf.Formatter(F);
return C.format.apply(C,B)
};
dojox.string.sprintf.Formatter=function(C){var B=[];
this._mapped=false;
this._format=C;
this._tokens=dojox.string.tokenize(C,this._re,this._parseDelim,this)
};
A.extend(dojox.string.sprintf.Formatter,{_re:/\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,_parseDelim:function(E,D,C,G,H,B,F){if(E){this._mapped=true
}return{mapping:E,intmapping:D,flags:C,_minWidth:G,period:H,_precision:B,specifier:F}
},_specifiers:{b:{base:2,isInt:true},o:{base:8,isInt:true},x:{base:16,isInt:true},X:{extend:["x"],toUpper:true},d:{base:10,isInt:true},i:{extend:["d"]},u:{extend:["d"],isUnsigned:true},c:{setArg:function(C){if(!isNaN(C.arg)){var B=parseInt(C.arg);
if(B<0||B>127){throw new Error("invalid character code passed to %c in sprintf")
}C.arg=isNaN(B)?""+B:String.fromCharCode(B)
}}},s:{setMaxWidth:function(B){B.maxWidth=(B.period==".")?B.precision:-1
}},e:{isDouble:true,doubleNotation:"e"},E:{extend:["e"],toUpper:true},f:{isDouble:true,doubleNotation:"f"},F:{extend:["f"]},g:{isDouble:true,doubleNotation:"g"},G:{extend:["g"],toUpper:true}},format:function(D){if(this._mapped&&typeof D!="object"){throw new Error("format requires a mapping")
}var I="";
var F=0;
for(var E=0,C;
E<this._tokens.length;
E++){C=this._tokens[E];
if(typeof C=="string"){I+=C
}else{if(this._mapped){if(typeof D[C.mapping]=="undefined"){throw new Error("missing key "+C.mapping)
}C.arg=D[C.mapping]
}else{if(C.intmapping){var F=parseInt(C.intmapping)-1
}if(F>=arguments.length){throw new Error("got "+arguments.length+" printf arguments, insufficient for '"+this._format+"'")
}C.arg=arguments[F++]
}if(!C.compiled){C.compiled=true;
C.sign="";
C.zeroPad=false;
C.rightJustify=false;
C.alternative=false;
var B={};
for(var J=C.flags.length;
J--;
){var H=C.flags.charAt(J);
B[H]=true;
switch(H){case" ":C.sign=" ";
break;
case"+":C.sign="+";
break;
case"0":C.zeroPad=(B["-"])?false:true;
break;
case"-":C.rightJustify=true;
C.zeroPad=false;
break;
case"#":C.alternative=true;
break;
default:throw Error("bad formatting flag '"+C.flags.charAt(J)+"'")
}}C.minWidth=(C._minWidth)?parseInt(C._minWidth):0;
C.maxWidth=-1;
C.toUpper=false;
C.isUnsigned=false;
C.isInt=false;
C.isDouble=false;
C.precision=1;
if(C.period=="."){if(C._precision){C.precision=parseInt(C._precision)
}else{C.precision=0
}}var G=this._specifiers[C.specifier];
if(typeof G=="undefined"){throw new Error("unexpected specifier '"+C.specifier+"'")
}if(G.extend){A.mixin(G,this._specifiers[G.extend]);
delete G.extend
}A.mixin(C,G)
}if(typeof C.setArg=="function"){C.setArg(C)
}if(typeof C.setMaxWidth=="function"){C.setMaxWidth(C)
}if(C._minWidth=="*"){if(this._mapped){throw new Error("* width not supported in mapped formats")
}C.minWidth=parseInt(arguments[F++]);
if(isNaN(C.minWidth)){throw new Error("the argument for * width at position "+F+" is not a number in "+this._format)
}if(C.minWidth<0){C.rightJustify=true;
C.minWidth=-C.minWidth
}}if(C._precision=="*"&&C.period=="."){if(this._mapped){throw new Error("* precision not supported in mapped formats")
}C.precision=parseInt(arguments[F++]);
if(isNaN(C.precision)){throw Error("the argument for * precision at position "+F+" is not a number in "+this._format)
}if(C.precision<0){C.precision=1;
C.period=""
}}if(C.isInt){if(C.period=="."){C.zeroPad=false
}this.formatInt(C)
}else{if(C.isDouble){if(C.period!="."){C.precision=6
}this.formatDouble(C)
}}this.fitField(C);
I+=""+C.arg
}}return I
},_zeros10:"0000000000",_spaces10:"          ",formatInt:function(C){var B=parseInt(C.arg);
if(!isFinite(B)){if(typeof C.arg!="number"){throw new Error("format argument '"+C.arg+"' not an integer; parseInt returned "+B)
}B=0
}if(B<0&&(C.isUnsigned||C.base!=10)){B=4294967295+B+1
}if(B<0){C.arg=(-B).toString(C.base);
this.zeroPad(C);
C.arg="-"+C.arg
}else{C.arg=B.toString(C.base);
if(!B&&!C.precision){C.arg=""
}else{this.zeroPad(C)
}if(C.sign){C.arg=C.sign+C.arg
}}if(C.base==16){if(C.alternative){C.arg="0x"+C.arg
}toke.art=C.toUpper?C.arg.toUpperCase():C.arg.toLowerCase()
}if(C.base==8){if(C.alternative&&C.arg.charAt(0)!="0"){C.arg="0"+C.arg
}}},formatDouble:function(B){var C=parseFloat(B.arg);
if(!isFinite(C)){if(typeof B.arg!="number"){throw new Error("format argument '"+B.arg+"' not a float; parseFloat returned "+C)
}C=0
}switch(B.doubleNotation){case"e":B.arg=C.toExponential(B.precision);
break;
case"f":B.arg=C.toFixed(B.precision);
break;
case"g":if(Math.abs(C)<0.0001){B.arg=C.toExponential(B.precision>0?B.precision-1:B.precision)
}else{B.arg=C.toPrecision(B.precision)
}if(!B.alternative){B.arg=B.arg.replace(/(\..*[^0])0*/,"$1");
B.arg=B.arg.replace(/\.0*e/,"e").replace(/\.0$/,"")
}break;
default:throw new Error("unexpected double notation '"+B.doubleNotation+"'")
}B.arg=B.arg.replace(/e\+(\d)$/,"e+0$1").replace(/e\-(\d)$/,"e-0$1");
if(A.isOpera){B.arg=B.arg.replace(/^\./,"0.")
}if(B.alternative){B.arg=B.arg.replace(/^(\d+)$/,"$1.");
B.arg=B.arg.replace(/^(\d+)e/,"$1.e")
}if(C>=0&&B.sign){B.arg=B.sign+B.arg
}B.arg=B.toUpper?B.arg.toUpperCase():B.arg.toLowerCase()
},zeroPad:function(C,D){D=(arguments.length==2)?D:C.precision;
if(typeof C.arg!="string"){C.arg=""+C.arg
}var B=D-10;
while(C.arg.length<B){C.arg=(C.rightJustify)?C.arg+this._zeros10:this._zeros10+C.arg
}var E=D-C.arg.length;
C.arg=(C.rightJustify)?C.arg+this._zeros10.substring(0,E):this._zeros10.substring(0,E)+C.arg
},fitField:function(B){if(B.maxWidth>=0&&B.arg.length>B.maxWidth){return B.arg.substring(0,B.maxWidth)
}if(B.zeroPad){this.zeroPad(B,B.minWidth);
return 
}this.spacePad(B)
},spacePad:function(C,D){D=(arguments.length==2)?D:C.minWidth;
if(typeof C.arg!="string"){C.arg=""+C.arg
}var B=D-10;
while(C.arg.length<B){C.arg=(C.rightJustify)?C.arg+this._spaces10:this._spaces10+C.arg
}var E=D-C.arg.length;
C.arg=(C.rightJustify)?C.arg+this._spaces10.substring(0,E):this._spaces10.substring(0,E)+C.arg
}})
}}});