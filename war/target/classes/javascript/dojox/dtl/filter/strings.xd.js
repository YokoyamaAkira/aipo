dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.strings"],["require","dojox.dtl.filter.htmlstrings"],["require","dojox.string.sprintf"],["require","dojox.string.tokenize"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.strings"]){A._hasResource["dojox.dtl.filter.strings"]=true;
A.provide("dojox.dtl.filter.strings");
A.require("dojox.dtl.filter.htmlstrings");
A.require("dojox.string.sprintf");
A.require("dojox.string.tokenize");
A.mixin(dojox.dtl.filter.strings,{addslashes:function(B){return B.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/'/g,"\\'")
},capfirst:function(B){B=""+B;
return B.charAt(0).toUpperCase()+B.substring(1)
},center:function(E,C){C=C||E.length;
E=E+"";
var B=C-E.length;
if(B%2){E=E+" ";
B-=1
}for(var D=0;
D<B;
D+=2){E=" "+E+" "
}return E
},cut:function(B,C){C=C+""||"";
B=B+"";
return B.replace(new RegExp(C,"g"),"")
},_fix_ampersands:/&(?!(\w+|#\d+);)/g,fix_ampersands:function(B){return B.replace(dojox.dtl.filter.strings._fix_ampersands,"&amp;")
},floatformat:function(B,D){D=parseInt(D||-1);
B=parseFloat(B);
var C=B-B.toFixed(0);
if(!C&&D<0){return B.toFixed()
}B=B.toFixed(Math.abs(D));
return(D<0)?parseFloat(B)+"":B
},iriencode:function(B){return dojox.dtl.text.urlquote(B,"/#%[]=:;$&()+,!")
},linenumbers:function(F){var C=dojox.dtl.filter;
var H=F.split("\n");
var B=[];
var E=(H.length+"").length;
for(var D=0,G;
D<H.length;
D++){G=H[D];
B.push(C.strings.ljust(D+1,E)+". "+C.htmlstrings.escape(G))
}return B.join("\n")
},ljust:function(B,C){B=B+"";
C=parseInt(C);
while(B.length<C){B=B+" "
}return B
},lower:function(B){return(B+"").toLowerCase()
},make_list:function(B){var C=[];
if(typeof B=="number"){B=B+""
}if(B.charAt){for(var E=0;
E<B.length;
E++){C.push(B.charAt(E))
}return C
}if(typeof B=="object"){for(var D in B){C.push(B[D])
}return C
}return[]
},rjust:function(B,C){B=B+"";
C=parseInt(C);
while(B.length<C){B=" "+B
}return B
},slugify:function(B){B=B.replace(/[^\w\s-]/g,"").toLowerCase();
return B.replace(/[\-\s]+/g,"-")
},_strings:{},stringformat:function(B,D){D=""+D;
var C=dojox.dtl.filter.strings._strings;
if(!C[D]){C[D]=new dojox.string.sprintf.Formatter("%"+D)
}return C[D].format(B)
},title:function(E){var D,B="";
for(var C=0,F;
C<E.length;
C++){F=E.charAt(C);
if(D==" "||D=="\n"||D=="\t"||!D){B+=F.toUpperCase()
}else{B+=F.toLowerCase()
}D=F
}return B
},_truncatewords:/[ \n\r\t]/,truncatewords:function(F,G){G=parseInt(G);
if(!G){return F
}for(var C=0,H=F.length,E=0,B,D;
C<F.length;
C++){B=F.charAt(C);
if(dojox.dtl.filter.strings._truncatewords.test(D)){if(!dojox.dtl.filter.strings._truncatewords.test(B)){++E;
if(E==G){return F.substring(0,H+1)
}}}else{if(!dojox.dtl.filter.strings._truncatewords.test(B)){H=C
}}D=B
}return F
},_truncate_words:/(&.*?;|<.*?>|(\w[\w-]*))/g,_truncate_tag:/<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,_truncate_singlets:{br:true,col:true,link:true,base:true,img:true,param:true,area:true,hr:true,input:true},truncatewords_html:function(E,H){H=parseInt(H);
if(H<=0){return""
}var G=dojox.dtl.filter.strings;
var C=0;
var B=[];
var I=dojox.string.tokenize(E,G._truncate_words,function(K,M){if(M){++C;
if(C<H){return M
}else{if(C==H){return M+" ..."
}}}var N=K.match(G._truncate_tag);
if(!N||C>=H){return 
}var J=N[1];
var L=N[2].toLowerCase();
var P=N[3];
if(J||G._truncate_singlets[L]){}else{if(J){var O=A.indexOf(B,L);
if(O!=-1){B=B.slice(O+1)
}}else{B.unshift(L)
}}return K
}).join("");
I=I.replace(/\s+$/g,"");
for(var D=0,F;
F=B[D];
D++){I+="</"+F+">"
}return I
},upper:function(B){return B.toUpperCase()
},urlencode:function(B){return dojox.dtl.text.urlquote(B)
},_urlize:/^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,_urlize2:/^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,urlize:function(B){return dojox.dtl.filter.strings.urlizetrunc(B)
},urlizetrunc:function(B,C){C=parseInt(C);
return dojox.string.tokenize(B,/(\S+)/g,function(O){var P=dojox.dtl.filter.strings._urlize.exec(O);
if(!P){return O
}var H=P[1];
var N=P[2];
var E=P[3];
var K=N.indexOf("www.")==0;
var M=N.indexOf("@")!=-1;
var F=N.indexOf(":")!=-1;
var I=N.indexOf("http://")==0;
var L=N.indexOf("https://")==0;
var J=/[a-zA-Z0-9]/.test(N.charAt(0));
var G=N.substring(N.length-4);
var D=N;
if(C>3){D=D.substring(0,C-3)+"..."
}if(K||(!M&&!I&&N.length&&J&&(G==".org"||G==".net"||G==".com"))){return'<a href="http://'+N+'" rel="nofollow">'+D+"</a>"
}else{if(I||L){return'<a href="'+N+'" rel="nofollow">'+D+"</a>"
}else{if(M&&!K&&!F&&dojox.dtl.filter.strings._urlize2.test(N)){return'<a href="mailto:'+N+'">'+N+"</a>"
}}}return O
}).join("")
},wordcount:function(B){return dojox.dtl.text.pySplit(B).length
},wordwrap:function(C,F){F=parseInt(F);
var H=[];
var E=C.split(/ /g);
if(E.length){var D=E.shift();
H.push(D);
var B=D.length-D.lastIndexOf("\n")-1;
for(var I=0;
I<E.length;
I++){D=E[I];
if(D.indexOf("\n")!=-1){var G=D.split(/\n/g)
}else{var G=[D]
}B+=G[0].length+1;
if(F&&B>F){H.push("\n");
B=G[G.length-1].length
}else{H.push(" ");
if(G.length>1){B=G[G.length-1].length
}}H.push(D)
}}return H.join("")
}})
}}});