if(!dojo._hasResource["dojox.string.sprintf"]){dojo._hasResource["dojox.string.sprintf"]=true;
dojo.provide("dojox.string.sprintf");
dojo.require("dojox.string.tokenize");
dojox.string.sprintf=function(D,C){for(var E=[],B=1;
B<arguments.length;
B++){E.push(arguments[B])
}var A=new dojox.string.sprintf.Formatter(D);
return A.format.apply(A,E)
};
dojox.string.sprintf.Formatter=function(A){var B=[];
this._mapped=false;
this._format=A;
this._tokens=dojox.string.tokenize(A,this._re,this._parseDelim,this)
};
dojo.extend(dojox.string.sprintf.Formatter,{_re:/\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,_parseDelim:function(A,G,F,C,D,E,B){if(A){this._mapped=true
}return{mapping:A,intmapping:G,flags:F,_minWidth:C,period:D,_precision:E,specifier:B}
},_specifiers:{b:{base:2,isInt:true},o:{base:8,isInt:true},x:{base:16,isInt:true},X:{extend:["x"],toUpper:true},d:{base:10,isInt:true},i:{extend:["d"]},u:{extend:["d"],isUnsigned:true},c:{setArg:function(A){if(!isNaN(A.arg)){var B=parseInt(A.arg);
if(B<0||B>127){throw new Error("invalid character code passed to %c in sprintf")
}A.arg=isNaN(B)?""+B:String.fromCharCode(B)
}}},s:{setMaxWidth:function(A){A.maxWidth=(A.period==".")?A.precision:-1
}},e:{isDouble:true,doubleNotation:"e"},E:{extend:["e"],toUpper:true},f:{isDouble:true,doubleNotation:"f"},F:{extend:["f"]},g:{isDouble:true,doubleNotation:"g"},G:{extend:["g"],toUpper:true}},format:function(H){if(this._mapped&&typeof H!="object"){throw new Error("format requires a mapping")
}var D="";
var A=0;
for(var I=0,G;
I<this._tokens.length;
I++){G=this._tokens[I];
if(typeof G=="string"){D+=G
}else{if(this._mapped){if(typeof H[G.mapping]=="undefined"){throw new Error("missing key "+G.mapping)
}G.arg=H[G.mapping]
}else{if(G.intmapping){var A=parseInt(G.intmapping)-1
}if(A>=arguments.length){throw new Error("got "+arguments.length+" printf arguments, insufficient for '"+this._format+"'")
}G.arg=arguments[A++]
}if(!G.compiled){G.compiled=true;
G.sign="";
G.zeroPad=false;
G.rightJustify=false;
G.alternative=false;
var F={};
for(var E=G.flags.length;
E--;
){var C=G.flags.charAt(E);
F[C]=true;
switch(C){case" ":G.sign=" ";
break;
case"+":G.sign="+";
break;
case"0":G.zeroPad=(F["-"])?false:true;
break;
case"-":G.rightJustify=true;
G.zeroPad=false;
break;
case"#":G.alternative=true;
break;
default:throw Error("bad formatting flag '"+G.flags.charAt(E)+"'")
}}G.minWidth=(G._minWidth)?parseInt(G._minWidth):0;
G.maxWidth=-1;
G.toUpper=false;
G.isUnsigned=false;
G.isInt=false;
G.isDouble=false;
G.precision=1;
if(G.period=="."){if(G._precision){G.precision=parseInt(G._precision)
}else{G.precision=0
}}var B=this._specifiers[G.specifier];
if(typeof B=="undefined"){throw new Error("unexpected specifier '"+G.specifier+"'")
}if(B.extend){dojo.mixin(B,this._specifiers[B.extend]);
delete B.extend
}dojo.mixin(G,B)
}if(typeof G.setArg=="function"){G.setArg(G)
}if(typeof G.setMaxWidth=="function"){G.setMaxWidth(G)
}if(G._minWidth=="*"){if(this._mapped){throw new Error("* width not supported in mapped formats")
}G.minWidth=parseInt(arguments[A++]);
if(isNaN(G.minWidth)){throw new Error("the argument for * width at position "+A+" is not a number in "+this._format)
}if(G.minWidth<0){G.rightJustify=true;
G.minWidth=-G.minWidth
}}if(G._precision=="*"&&G.period=="."){if(this._mapped){throw new Error("* precision not supported in mapped formats")
}G.precision=parseInt(arguments[A++]);
if(isNaN(G.precision)){throw Error("the argument for * precision at position "+A+" is not a number in "+this._format)
}if(G.precision<0){G.precision=1;
G.period=""
}}if(G.isInt){if(G.period=="."){G.zeroPad=false
}this.formatInt(G)
}else{if(G.isDouble){if(G.period!="."){G.precision=6
}this.formatDouble(G)
}}this.fitField(G);
D+=""+G.arg
}}return D
},_zeros10:"0000000000",_spaces10:"          ",formatInt:function(A){var B=parseInt(A.arg);
if(!isFinite(B)){if(typeof A.arg!="number"){throw new Error("format argument '"+A.arg+"' not an integer; parseInt returned "+B)
}B=0
}if(B<0&&(A.isUnsigned||A.base!=10)){B=4294967295+B+1
}if(B<0){A.arg=(-B).toString(A.base);
this.zeroPad(A);
A.arg="-"+A.arg
}else{A.arg=B.toString(A.base);
if(!B&&!A.precision){A.arg=""
}else{this.zeroPad(A)
}if(A.sign){A.arg=A.sign+A.arg
}}if(A.base==16){if(A.alternative){A.arg="0x"+A.arg
}toke.art=A.toUpper?A.arg.toUpperCase():A.arg.toLowerCase()
}if(A.base==8){if(A.alternative&&A.arg.charAt(0)!="0"){A.arg="0"+A.arg
}}},formatDouble:function(B){var A=parseFloat(B.arg);
if(!isFinite(A)){if(typeof B.arg!="number"){throw new Error("format argument '"+B.arg+"' not a float; parseFloat returned "+A)
}A=0
}switch(B.doubleNotation){case"e":B.arg=A.toExponential(B.precision);
break;
case"f":B.arg=A.toFixed(B.precision);
break;
case"g":if(Math.abs(A)<0.0001){B.arg=A.toExponential(B.precision>0?B.precision-1:B.precision)
}else{B.arg=A.toPrecision(B.precision)
}if(!B.alternative){B.arg=B.arg.replace(/(\..*[^0])0*/,"$1");
B.arg=B.arg.replace(/\.0*e/,"e").replace(/\.0$/,"")
}break;
default:throw new Error("unexpected double notation '"+B.doubleNotation+"'")
}B.arg=B.arg.replace(/e\+(\d)$/,"e+0$1").replace(/e\-(\d)$/,"e-0$1");
if(dojo.isOpera){B.arg=B.arg.replace(/^\./,"0.")
}if(B.alternative){B.arg=B.arg.replace(/^(\d+)$/,"$1.");
B.arg=B.arg.replace(/^(\d+)e/,"$1.e")
}if(A>=0&&B.sign){B.arg=B.sign+B.arg
}B.arg=B.toUpper?B.arg.toUpperCase():B.arg.toLowerCase()
},zeroPad:function(A,B){B=(arguments.length==2)?B:A.precision;
if(typeof A.arg!="string"){A.arg=""+A.arg
}var D=B-10;
while(A.arg.length<D){A.arg=(A.rightJustify)?A.arg+this._zeros10:this._zeros10+A.arg
}var C=B-A.arg.length;
A.arg=(A.rightJustify)?A.arg+this._zeros10.substring(0,C):this._zeros10.substring(0,C)+A.arg
},fitField:function(A){if(A.maxWidth>=0&&A.arg.length>A.maxWidth){return A.arg.substring(0,A.maxWidth)
}if(A.zeroPad){this.zeroPad(A,A.minWidth);
return 
}this.spacePad(A)
},spacePad:function(A,B){B=(arguments.length==2)?B:A.minWidth;
if(typeof A.arg!="string"){A.arg=""+A.arg
}var D=B-10;
while(A.arg.length<D){A.arg=(A.rightJustify)?A.arg+this._spaces10:this._spaces10+A.arg
}var C=B-A.arg.length;
A.arg=(A.rightJustify)?A.arg+this._spaces10.substring(0,C):this._spaces10.substring(0,C)+A.arg
}})
};