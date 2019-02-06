dojo._xdResourceLoaded({depends:[["provide","dojox.string.sprintf"],["require","dojox.string.tokenize"]],defineResource:function(A){if(!A._hasResource["dojox.string.sprintf"]){A._hasResource["dojox.string.sprintf"]=true;
A.provide("dojox.string.sprintf");
A.require("dojox.string.tokenize");
dojox.string.sprintf=function(B,F){for(var C=[],E=1;
E<arguments.length;
E++){C.push(arguments[E])
}var D=new dojox.string.sprintf.Formatter(B);
return D.format.apply(D,C)
};
dojox.string.sprintf.Formatter=function(B){var C=[];
this._mapped=false;
this._format=B;
this._tokens=dojox.string.tokenize(B,this._re,this._parseDelim,this)
};
A.extend(dojox.string.sprintf.Formatter,{_re:/\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,_parseDelim:function(D,C,H,F,B,G,E){if(D){this._mapped=true
}return{mapping:D,intmapping:C,flags:H,_minWidth:F,period:B,_precision:G,specifier:E}
},_specifiers:{b:{base:2,isInt:true},o:{base:8,isInt:true},x:{base:16,isInt:true},X:{extend:["x"],toUpper:true},d:{base:10,isInt:true},i:{extend:["d"]},u:{extend:["d"],isUnsigned:true},c:{setArg:function(B){if(!isNaN(B.arg)){var C=parseInt(B.arg);
if(C<0||C>127){throw new Error("invalid character code passed to %c in sprintf")
}B.arg=isNaN(C)?""+C:String.fromCharCode(C)
}}},s:{setMaxWidth:function(B){B.maxWidth=(B.period==".")?B.precision:-1
}},e:{isDouble:true,doubleNotation:"e"},E:{extend:["e"],toUpper:true},f:{isDouble:true,doubleNotation:"f"},F:{extend:["f"]},g:{isDouble:true,doubleNotation:"g"},G:{extend:["g"],toUpper:true}},format:function(B){if(this._mapped&&typeof B!="object"){throw new Error("format requires a mapping")
}var G="";
var D=0;
for(var C=0,J;
C<this._tokens.length;
C++){J=this._tokens[C];
if(typeof J=="string"){G+=J
}else{if(this._mapped){if(typeof B[J.mapping]=="undefined"){throw new Error("missing key "+J.mapping)
}J.arg=B[J.mapping]
}else{if(J.intmapping){var D=parseInt(J.intmapping)-1
}if(D>=arguments.length){throw new Error("got "+arguments.length+" printf arguments, insufficient for '"+this._format+"'")
}J.arg=arguments[D++]
}if(!J.compiled){J.compiled=true;
J.sign="";
J.zeroPad=false;
J.rightJustify=false;
J.alternative=false;
var I={};
for(var H=J.flags.length;
H--;
){var F=J.flags.charAt(H);
I[F]=true;
switch(F){case" ":J.sign=" ";
break;
case"+":J.sign="+";
break;
case"0":J.zeroPad=(I["-"])?false:true;
break;
case"-":J.rightJustify=true;
J.zeroPad=false;
break;
case"#":J.alternative=true;
break;
default:throw Error("bad formatting flag '"+J.flags.charAt(H)+"'")
}}J.minWidth=(J._minWidth)?parseInt(J._minWidth):0;
J.maxWidth=-1;
J.toUpper=false;
J.isUnsigned=false;
J.isInt=false;
J.isDouble=false;
J.precision=1;
if(J.period=="."){if(J._precision){J.precision=parseInt(J._precision)
}else{J.precision=0
}}var E=this._specifiers[J.specifier];
if(typeof E=="undefined"){throw new Error("unexpected specifier '"+J.specifier+"'")
}if(E.extend){A.mixin(E,this._specifiers[E.extend]);
delete E.extend
}A.mixin(J,E)
}if(typeof J.setArg=="function"){J.setArg(J)
}if(typeof J.setMaxWidth=="function"){J.setMaxWidth(J)
}if(J._minWidth=="*"){if(this._mapped){throw new Error("* width not supported in mapped formats")
}J.minWidth=parseInt(arguments[D++]);
if(isNaN(J.minWidth)){throw new Error("the argument for * width at position "+D+" is not a number in "+this._format)
}if(J.minWidth<0){J.rightJustify=true;
J.minWidth=-J.minWidth
}}if(J._precision=="*"&&J.period=="."){if(this._mapped){throw new Error("* precision not supported in mapped formats")
}J.precision=parseInt(arguments[D++]);
if(isNaN(J.precision)){throw Error("the argument for * precision at position "+D+" is not a number in "+this._format)
}if(J.precision<0){J.precision=1;
J.period=""
}}if(J.isInt){if(J.period=="."){J.zeroPad=false
}this.formatInt(J)
}else{if(J.isDouble){if(J.period!="."){J.precision=6
}this.formatDouble(J)
}}this.fitField(J);
G+=""+J.arg
}}return G
},_zeros10:"0000000000",_spaces10:"          ",formatInt:function(B){var C=parseInt(B.arg);
if(!isFinite(C)){if(typeof B.arg!="number"){throw new Error("format argument '"+B.arg+"' not an integer; parseInt returned "+C)
}C=0
}if(C<0&&(B.isUnsigned||B.base!=10)){C=4294967295+C+1
}if(C<0){B.arg=(-C).toString(B.base);
this.zeroPad(B);
B.arg="-"+B.arg
}else{B.arg=C.toString(B.base);
if(!C&&!B.precision){B.arg=""
}else{this.zeroPad(B)
}if(B.sign){B.arg=B.sign+B.arg
}}if(B.base==16){if(B.alternative){B.arg="0x"+B.arg
}toke.art=B.toUpper?B.arg.toUpperCase():B.arg.toLowerCase()
}if(B.base==8){if(B.alternative&&B.arg.charAt(0)!="0"){B.arg="0"+B.arg
}}},formatDouble:function(C){var B=parseFloat(C.arg);
if(!isFinite(B)){if(typeof C.arg!="number"){throw new Error("format argument '"+C.arg+"' not a float; parseFloat returned "+B)
}B=0
}switch(C.doubleNotation){case"e":C.arg=B.toExponential(C.precision);
break;
case"f":C.arg=B.toFixed(C.precision);
break;
case"g":if(Math.abs(B)<0.0001){C.arg=B.toExponential(C.precision>0?C.precision-1:C.precision)
}else{C.arg=B.toPrecision(C.precision)
}if(!C.alternative){C.arg=C.arg.replace(/(\..*[^0])0*/,"$1");
C.arg=C.arg.replace(/\.0*e/,"e").replace(/\.0$/,"")
}break;
default:throw new Error("unexpected double notation '"+C.doubleNotation+"'")
}C.arg=C.arg.replace(/e\+(\d)$/,"e+0$1").replace(/e\-(\d)$/,"e-0$1");
if(A.isOpera){C.arg=C.arg.replace(/^\./,"0.")
}if(C.alternative){C.arg=C.arg.replace(/^(\d+)$/,"$1.");
C.arg=C.arg.replace(/^(\d+)e/,"$1.e")
}if(B>=0&&C.sign){C.arg=C.sign+C.arg
}C.arg=C.toUpper?C.arg.toUpperCase():C.arg.toLowerCase()
},zeroPad:function(D,E){E=(arguments.length==2)?E:D.precision;
if(typeof D.arg!="string"){D.arg=""+D.arg
}var C=E-10;
while(D.arg.length<C){D.arg=(D.rightJustify)?D.arg+this._zeros10:this._zeros10+D.arg
}var B=E-D.arg.length;
D.arg=(D.rightJustify)?D.arg+this._zeros10.substring(0,B):this._zeros10.substring(0,B)+D.arg
},fitField:function(B){if(B.maxWidth>=0&&B.arg.length>B.maxWidth){return B.arg.substring(0,B.maxWidth)
}if(B.zeroPad){this.zeroPad(B,B.minWidth);
return 
}this.spacePad(B)
},spacePad:function(D,E){E=(arguments.length==2)?E:D.minWidth;
if(typeof D.arg!="string"){D.arg=""+D.arg
}var C=E-10;
while(D.arg.length<C){D.arg=(D.rightJustify)?D.arg+this._spaces10:this._spaces10+D.arg
}var B=E-D.arg.length;
D.arg=(D.rightJustify)?D.arg+this._spaces10.substring(0,B):this._spaces10.substring(0,B)+D.arg
}})
}}});