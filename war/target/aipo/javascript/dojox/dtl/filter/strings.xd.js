dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.strings"],["require","dojox.dtl.filter.htmlstrings"],["require","dojox.string.sprintf"],["require","dojox.string.tokenize"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.strings"]){A._hasResource["dojox.dtl.filter.strings"]=true;
A.provide("dojox.dtl.filter.strings");
A.require("dojox.dtl.filter.htmlstrings");
A.require("dojox.string.sprintf");
A.require("dojox.string.tokenize");
A.mixin(dojox.dtl.filter.strings,{addslashes:function(B){return B.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/'/g,"\\'")
},capfirst:function(B){B=""+B;
return B.charAt(0).toUpperCase()+B.substring(1)
},center:function(D,B){B=B||D.length;
D=D+"";
var E=B-D.length;
if(E%2){D=D+" ";
E-=1
}for(var C=0;
C<E;
C+=2){D=" "+D+" "
}return D
},cut:function(C,B){B=B+""||"";
C=C+"";
return C.replace(new RegExp(B,"g"),"")
},_fix_ampersands:/&(?!(\w+|#\d+);)/g,fix_ampersands:function(B){return B.replace(dojox.dtl.filter.strings._fix_ampersands,"&amp;")
},floatformat:function(D,C){C=parseInt(C||-1);
D=parseFloat(D);
var B=D-D.toFixed(0);
if(!B&&C<0){return D.toFixed()
}D=D.toFixed(Math.abs(C));
return(C<0)?parseFloat(D)+"":D
},iriencode:function(B){return dojox.dtl.text.urlquote(B,"/#%[]=:;$&()+,!")
},linenumbers:function(G){var H=dojox.dtl.filter;
var C=G.split("\n");
var D=[];
var F=(C.length+"").length;
for(var E=0,B;
E<C.length;
E++){B=C[E];
D.push(H.strings.ljust(E+1,F)+". "+H.htmlstrings.escape(B))
}return D.join("\n")
},ljust:function(C,B){C=C+"";
B=parseInt(B);
while(C.length<B){C=C+" "
}return C
},lower:function(B){return(B+"").toLowerCase()
},make_list:function(E){var B=[];
if(typeof E=="number"){E=E+""
}if(E.charAt){for(var D=0;
D<E.length;
D++){B.push(E.charAt(D))
}return B
}if(typeof E=="object"){for(var C in E){B.push(E[C])
}return B
}return[]
},rjust:function(C,B){C=C+"";
B=parseInt(B);
while(C.length<B){C=" "+C
}return C
},slugify:function(B){B=B.replace(/[^\w\s-]/g,"").toLowerCase();
return B.replace(/[\-\s]+/g,"-")
},_strings:{},stringformat:function(D,C){C=""+C;
var B=dojox.dtl.filter.strings._strings;
if(!B[C]){B[C]=new dojox.string.sprintf.Formatter("%"+C)
}return B[C].format(D)
},title:function(D){var C,F="";
for(var B=0,E;
B<D.length;
B++){E=D.charAt(B);
if(C==" "||C=="\n"||C=="\t"||!C){F+=E.toUpperCase()
}else{F+=E.toLowerCase()
}C=E
}return F
},_truncatewords:/[ \n\r\t]/,truncatewords:function(G,B){B=parseInt(B);
if(!B){return G
}for(var D=0,C=G.length,F=0,H,E;
D<G.length;
D++){H=G.charAt(D);
if(dojox.dtl.filter.strings._truncatewords.test(E)){if(!dojox.dtl.filter.strings._truncatewords.test(H)){++F;
if(F==B){return G.substring(0,C+1)
}}}else{if(!dojox.dtl.filter.strings._truncatewords.test(H)){C=D
}}E=H
}return G
},_truncate_words:/(&.*?;|<.*?>|(\w[\w-]*))/g,_truncate_tag:/<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,_truncate_singlets:{br:true,col:true,link:true,base:true,img:true,param:true,area:true,hr:true,input:true},truncatewords_html:function(H,D){D=parseInt(D);
if(D<=0){return""
}var C=dojox.dtl.filter.strings;
var I=0;
var F=[];
var E=dojox.string.tokenize(H,C._truncate_words,function(N,P){if(P){++I;
if(I<D){return P
}else{if(I==D){return P+" ..."
}}}var J=N.match(C._truncate_tag);
if(!J||I>=D){return 
}var M=J[1];
var O=J[2].toLowerCase();
var L=J[3];
if(M||C._truncate_singlets[O]){}else{if(M){var K=A.indexOf(F,O);
if(K!=-1){F=F.slice(K+1)
}}else{F.unshift(O)
}}return N
}).join("");
E=E.replace(/\s+$/g,"");
for(var G=0,B;
B=F[G];
G++){E+="</"+B+">"
}return E
},upper:function(B){return B.toUpperCase()
},urlencode:function(B){return dojox.dtl.text.urlquote(B)
},_urlize:/^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,_urlize2:/^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,urlize:function(B){return dojox.dtl.filter.strings.urlizetrunc(B)
},urlizetrunc:function(C,B){B=parseInt(B);
return dojox.string.tokenize(C,/(\S+)/g,function(E){var F=dojox.dtl.filter.strings._urlize.exec(E);
if(!F){return E
}var J=F[1];
var P=F[2];
var D=F[3];
var M=P.indexOf("www.")==0;
var O=P.indexOf("@")!=-1;
var H=P.indexOf(":")!=-1;
var K=P.indexOf("http://")==0;
var N=P.indexOf("https://")==0;
var L=/[a-zA-Z0-9]/.test(P.charAt(0));
var I=P.substring(P.length-4);
var G=P;
if(B>3){G=G.substring(0,B-3)+"..."
}if(M||(!O&&!K&&P.length&&L&&(I==".org"||I==".net"||I==".com"))){return'<a href="http://'+P+'" rel="nofollow">'+G+"</a>"
}else{if(K||N){return'<a href="'+P+'" rel="nofollow">'+G+"</a>"
}else{if(O&&!M&&!H&&dojox.dtl.filter.strings._urlize2.test(P)){return'<a href="mailto:'+P+'">'+P+"</a>"
}}}return E
}).join("")
},wordcount:function(B){return dojox.dtl.text.pySplit(B).length
},wordwrap:function(F,B){B=parseInt(B);
var D=[];
var H=F.split(/ /g);
if(H.length){var G=H.shift();
D.push(G);
var I=G.length-G.lastIndexOf("\n")-1;
for(var E=0;
E<H.length;
E++){G=H[E];
if(G.indexOf("\n")!=-1){var C=G.split(/\n/g)
}else{var C=[G]
}I+=C[0].length+1;
if(B&&I>B){D.push("\n");
I=C[C.length-1].length
}else{D.push(" ");
if(C.length>1){I=C[C.length-1].length
}}D.push(G)
}}return D.join("")
}})
}}});