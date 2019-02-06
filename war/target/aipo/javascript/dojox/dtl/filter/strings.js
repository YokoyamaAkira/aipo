if(!dojo._hasResource["dojox.dtl.filter.strings"]){dojo._hasResource["dojox.dtl.filter.strings"]=true;
dojo.provide("dojox.dtl.filter.strings");
dojo.require("dojox.dtl.filter.htmlstrings");
dojo.require("dojox.string.sprintf");
dojo.require("dojox.string.tokenize");
dojo.mixin(dojox.dtl.filter.strings,{addslashes:function(A){return A.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/'/g,"\\'")
},capfirst:function(A){A=""+A;
return A.charAt(0).toUpperCase()+A.substring(1)
},center:function(C,A){A=A||C.length;
C=C+"";
var D=A-C.length;
if(D%2){C=C+" ";
D-=1
}for(var B=0;
B<D;
B+=2){C=" "+C+" "
}return C
},cut:function(B,A){A=A+""||"";
B=B+"";
return B.replace(new RegExp(A,"g"),"")
},_fix_ampersands:/&(?!(\w+|#\d+);)/g,fix_ampersands:function(A){return A.replace(dojox.dtl.filter.strings._fix_ampersands,"&amp;")
},floatformat:function(C,B){B=parseInt(B||-1);
C=parseFloat(C);
var A=C-C.toFixed(0);
if(!A&&B<0){return C.toFixed()
}C=C.toFixed(Math.abs(B));
return(B<0)?parseFloat(C)+"":C
},iriencode:function(A){return dojox.dtl.text.urlquote(A,"/#%[]=:;$&()+,!")
},linenumbers:function(F){var G=dojox.dtl.filter;
var B=F.split("\n");
var C=[];
var E=(B.length+"").length;
for(var D=0,A;
D<B.length;
D++){A=B[D];
C.push(G.strings.ljust(D+1,E)+". "+G.htmlstrings.escape(A))
}return C.join("\n")
},ljust:function(B,A){B=B+"";
A=parseInt(A);
while(B.length<A){B=B+" "
}return B
},lower:function(A){return(A+"").toLowerCase()
},make_list:function(D){var A=[];
if(typeof D=="number"){D=D+""
}if(D.charAt){for(var C=0;
C<D.length;
C++){A.push(D.charAt(C))
}return A
}if(typeof D=="object"){for(var B in D){A.push(D[B])
}return A
}return[]
},rjust:function(B,A){B=B+"";
A=parseInt(A);
while(B.length<A){B=" "+B
}return B
},slugify:function(A){A=A.replace(/[^\w\s-]/g,"").toLowerCase();
return A.replace(/[\-\s]+/g,"-")
},_strings:{},stringformat:function(C,B){B=""+B;
var A=dojox.dtl.filter.strings._strings;
if(!A[B]){A[B]=new dojox.string.sprintf.Formatter("%"+B)
}return A[B].format(C)
},title:function(C){var B,E="";
for(var A=0,D;
A<C.length;
A++){D=C.charAt(A);
if(B==" "||B=="\n"||B=="\t"||!B){E+=D.toUpperCase()
}else{E+=D.toLowerCase()
}B=D
}return E
},_truncatewords:/[ \n\r\t]/,truncatewords:function(F,A){A=parseInt(A);
if(!A){return F
}for(var C=0,B=F.length,E=0,G,D;
C<F.length;
C++){G=F.charAt(C);
if(dojox.dtl.filter.strings._truncatewords.test(D)){if(!dojox.dtl.filter.strings._truncatewords.test(G)){++E;
if(E==A){return F.substring(0,B+1)
}}}else{if(!dojox.dtl.filter.strings._truncatewords.test(G)){B=C
}}D=G
}return F
},_truncate_words:/(&.*?;|<.*?>|(\w[\w-]*))/g,_truncate_tag:/<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,_truncate_singlets:{br:true,col:true,link:true,base:true,img:true,param:true,area:true,hr:true,input:true},truncatewords_html:function(G,C){C=parseInt(C);
if(C<=0){return""
}var B=dojox.dtl.filter.strings;
var H=0;
var E=[];
var D=dojox.string.tokenize(G,B._truncate_words,function(M,O){if(O){++H;
if(H<C){return O
}else{if(H==C){return O+" ..."
}}}var I=M.match(B._truncate_tag);
if(!I||H>=C){return 
}var L=I[1];
var N=I[2].toLowerCase();
var K=I[3];
if(L||B._truncate_singlets[N]){}else{if(L){var J=dojo.indexOf(E,N);
if(J!=-1){E=E.slice(J+1)
}}else{E.unshift(N)
}}return M
}).join("");
D=D.replace(/\s+$/g,"");
for(var F=0,A;
A=E[F];
F++){D+="</"+A+">"
}return D
},upper:function(A){return A.toUpperCase()
},urlencode:function(A){return dojox.dtl.text.urlquote(A)
},_urlize:/^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,_urlize2:/^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,urlize:function(A){return dojox.dtl.filter.strings.urlizetrunc(A)
},urlizetrunc:function(B,A){A=parseInt(A);
return dojox.string.tokenize(B,/(\S+)/g,function(D){var E=dojox.dtl.filter.strings._urlize.exec(D);
if(!E){return D
}var I=E[1];
var O=E[2];
var C=E[3];
var L=O.indexOf("www.")==0;
var N=O.indexOf("@")!=-1;
var G=O.indexOf(":")!=-1;
var J=O.indexOf("http://")==0;
var M=O.indexOf("https://")==0;
var K=/[a-zA-Z0-9]/.test(O.charAt(0));
var H=O.substring(O.length-4);
var F=O;
if(A>3){F=F.substring(0,A-3)+"..."
}if(L||(!N&&!J&&O.length&&K&&(H==".org"||H==".net"||H==".com"))){return'<a href="http://'+O+'" rel="nofollow">'+F+"</a>"
}else{if(J||M){return'<a href="'+O+'" rel="nofollow">'+F+"</a>"
}else{if(N&&!L&&!G&&dojox.dtl.filter.strings._urlize2.test(O)){return'<a href="mailto:'+O+'">'+O+"</a>"
}}}return D
}).join("")
},wordcount:function(A){return dojox.dtl.text.pySplit(A).length
},wordwrap:function(E,A){A=parseInt(A);
var C=[];
var G=E.split(/ /g);
if(G.length){var F=G.shift();
C.push(F);
var H=F.length-F.lastIndexOf("\n")-1;
for(var D=0;
D<G.length;
D++){F=G[D];
if(F.indexOf("\n")!=-1){var B=F.split(/\n/g)
}else{var B=[F]
}H+=B[0].length+1;
if(A&&H>A){C.push("\n");
H=B[B.length-1].length
}else{C.push(" ");
if(B.length>1){H=B[B.length-1].length
}}C.push(F)
}}return C.join("")
}})
};