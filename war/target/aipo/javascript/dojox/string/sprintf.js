if(!dojo._hasResource["dojox.string.sprintf"]){dojo._hasResource["dojox.string.sprintf"]=true;
dojo.provide("dojox.string.sprintf");
dojo.require("dojox.string.tokenize");
dojox.string.sprintf=function(E,D){for(var A=[],C=1;
C<arguments.length;
C++){A.push(arguments[C])
}var B=new dojox.string.sprintf.Formatter(E);
return B.format.apply(B,A)
};
dojox.string.sprintf.Formatter=function(B){var A=[];
this._mapped=false;
this._format=B;
this._tokens=dojox.string.tokenize(B,this._re,this._parseDelim,this)
};
dojo.extend(dojox.string.sprintf.Formatter,{_re:/\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,_parseDelim:function(D,C,B,F,G,A,E){if(D){this._mapped=true
}return{mapping:D,intmapping:C,flags:B,_minWidth:F,period:G,_precision:A,specifier:E}
},_specifiers:{b:{base:2,isInt:true},o:{base:8,isInt:true},x:{base:16,isInt:true},X:{extend:["x"],toUpper:true},d:{base:10,isInt:true},i:{extend:["d"]},u:{extend:["d"],isUnsigned:true},c:{setArg:function(B){if(!isNaN(B.arg)){var A=parseInt(B.arg);
if(A<0||A>127){throw new Error("invalid character code passed to %c in sprintf")
}B.arg=isNaN(A)?""+A:String.fromCharCode(A)
}}},s:{setMaxWidth:function(A){A.maxWidth=(A.period==".")?A.precision:-1
}},e:{isDouble:true,doubleNotation:"e"},E:{extend:["e"],toUpper:true},f:{isDouble:true,doubleNotation:"f"},F:{extend:["f"]},g:{isDouble:true,doubleNotation:"g"},G:{extend:["g"],toUpper:true}},format:function(C){if(this._mapped&&typeof C!="object"){throw new Error("format requires a mapping")
}var H="";
var E=0;
for(var D=0,B;
D<this._tokens.length;
D++){B=this._tokens[D];
if(typeof B=="string"){H+=B
}else{if(this._mapped){if(typeof C[B.mapping]=="undefined"){throw new Error("missing key "+B.mapping)
}B.arg=C[B.mapping]
}else{if(B.intmapping){var E=parseInt(B.intmapping)-1
}if(E>=arguments.length){throw new Error("got "+arguments.length+" printf arguments, insufficient for '"+this._format+"'")
}B.arg=arguments[E++]
}if(!B.compiled){B.compiled=true;
B.sign="";
B.zeroPad=false;
B.rightJustify=false;
B.alternative=false;
var A={};
for(var I=B.flags.length;
I--;
){var G=B.flags.charAt(I);
A[G]=true;
switch(G){case" ":B.sign=" ";
break;
case"+":B.sign="+";
break;
case"0":B.zeroPad=(A["-"])?false:true;
break;
case"-":B.rightJustify=true;
B.zeroPad=false;
break;
case"#":B.alternative=true;
break;
default:throw Error("bad formatting flag '"+B.flags.charAt(I)+"'")
}}B.minWidth=(B._minWidth)?parseInt(B._minWidth):0;
B.maxWidth=-1;
B.toUpper=false;
B.isUnsigned=false;
B.isInt=false;
B.isDouble=false;
B.precision=1;
if(B.period=="."){if(B._precision){B.precision=parseInt(B._precision)
}else{B.precision=0
}}var F=this._specifiers[B.specifier];
if(typeof F=="undefined"){throw new Error("unexpected specifier '"+B.specifier+"'")
}if(F.extend){dojo.mixin(F,this._specifiers[F.extend]);
delete F.extend
}dojo.mixin(B,F)
}if(typeof B.setArg=="function"){B.setArg(B)
}if(typeof B.setMaxWidth=="function"){B.setMaxWidth(B)
}if(B._minWidth=="*"){if(this._mapped){throw new Error("* width not supported in mapped formats")
}B.minWidth=parseInt(arguments[E++]);
if(isNaN(B.minWidth)){throw new Error("the argument for * width at position "+E+" is not a number in "+this._format)
}if(B.minWidth<0){B.rightJustify=true;
B.minWidth=-B.minWidth
}}if(B._precision=="*"&&B.period=="."){if(this._mapped){throw new Error("* precision not supported in mapped formats")
}B.precision=parseInt(arguments[E++]);
if(isNaN(B.precision)){throw Error("the argument for * precision at position "+E+" is not a number in "+this._format)
}if(B.precision<0){B.precision=1;
B.period=""
}}if(B.isInt){if(B.period=="."){B.zeroPad=false
}this.formatInt(B)
}else{if(B.isDouble){if(B.period!="."){B.precision=6
}this.formatDouble(B)
}}this.fitField(B);
H+=""+B.arg
}}return H
},_zeros10:"0000000000",_spaces10:"          ",formatInt:function(B){var A=parseInt(B.arg);
if(!isFinite(A)){if(typeof B.arg!="number"){throw new Error("format argument '"+B.arg+"' not an integer; parseInt returned "+A)
}A=0
}if(A<0&&(B.isUnsigned||B.base!=10)){A=4294967295+A+1
}if(A<0){B.arg=(-A).toString(B.base);
this.zeroPad(B);
B.arg="-"+B.arg
}else{B.arg=A.toString(B.base);
if(!A&&!B.precision){B.arg=""
}else{this.zeroPad(B)
}if(B.sign){B.arg=B.sign+B.arg
}}if(B.base==16){if(B.alternative){B.arg="0x"+B.arg
}toke.art=B.toUpper?B.arg.toUpperCase():B.arg.toLowerCase()
}if(B.base==8){if(B.alternative&&B.arg.charAt(0)!="0"){B.arg="0"+B.arg
}}},formatDouble:function(A){var B=parseFloat(A.arg);
if(!isFinite(B)){if(typeof A.arg!="number"){throw new Error("format argument '"+A.arg+"' not a float; parseFloat returned "+B)
}B=0
}switch(A.doubleNotation){case"e":A.arg=B.toExponential(A.precision);
break;
case"f":A.arg=B.toFixed(A.precision);
break;
case"g":if(Math.abs(B)<0.0001){A.arg=B.toExponential(A.precision>0?A.precision-1:A.precision)
}else{A.arg=B.toPrecision(A.precision)
}if(!A.alternative){A.arg=A.arg.replace(/(\..*[^0])0*/,"$1");
A.arg=A.arg.replace(/\.0*e/,"e").replace(/\.0$/,"")
}break;
default:throw new Error("unexpected double notation '"+A.doubleNotation+"'")
}A.arg=A.arg.replace(/e\+(\d)$/,"e+0$1").replace(/e\-(\d)$/,"e-0$1");
if(dojo.isOpera){A.arg=A.arg.replace(/^\./,"0.")
}if(A.alternative){A.arg=A.arg.replace(/^(\d+)$/,"$1.");
A.arg=A.arg.replace(/^(\d+)e/,"$1.e")
}if(B>=0&&A.sign){A.arg=A.sign+A.arg
}A.arg=A.toUpper?A.arg.toUpperCase():A.arg.toLowerCase()
},zeroPad:function(B,C){C=(arguments.length==2)?C:B.precision;
if(typeof B.arg!="string"){B.arg=""+B.arg
}var A=C-10;
while(B.arg.length<A){B.arg=(B.rightJustify)?B.arg+this._zeros10:this._zeros10+B.arg
}var D=C-B.arg.length;
B.arg=(B.rightJustify)?B.arg+this._zeros10.substring(0,D):this._zeros10.substring(0,D)+B.arg
},fitField:function(A){if(A.maxWidth>=0&&A.arg.length>A.maxWidth){return A.arg.substring(0,A.maxWidth)
}if(A.zeroPad){this.zeroPad(A,A.minWidth);
return 
}this.spacePad(A)
},spacePad:function(B,C){C=(arguments.length==2)?C:B.minWidth;
if(typeof B.arg!="string"){B.arg=""+B.arg
}var A=C-10;
while(B.arg.length<A){B.arg=(B.rightJustify)?B.arg+this._spaces10:this._spaces10+B.arg
}var D=C-B.arg.length;
B.arg=(B.rightJustify)?B.arg+this._spaces10.substring(0,D):this._spaces10.substring(0,D)+B.arg
}})
};