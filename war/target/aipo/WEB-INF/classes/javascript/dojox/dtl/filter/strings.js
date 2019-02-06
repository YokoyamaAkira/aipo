if(!dojo._hasResource["dojox.dtl.filter.strings"]){dojo._hasResource["dojox.dtl.filter.strings"]=true;
dojo.provide("dojox.dtl.filter.strings");
dojo.require("dojox.dtl.filter.htmlstrings");
dojo.require("dojox.string.sprintf");
dojo.require("dojox.string.tokenize");
dojo.mixin(dojox.dtl.filter.strings,{addslashes:function(A){return A.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/'/g,"\\'")
},capfirst:function(A){A=""+A;
return A.charAt(0).toUpperCase()+A.substring(1)
},center:function(B,D){D=D||B.length;
B=B+"";
var C=D-B.length;
if(C%2){B=B+" ";
C-=1
}for(var A=0;
A<C;
A+=2){B=" "+B+" "
}return B
},cut:function(A,B){B=B+""||"";
A=A+"";
return A.replace(new RegExp(B,"g"),"")
},_fix_ampersands:/&(?!(\w+|#\d+);)/g,fix_ampersands:function(A){return A.replace(dojox.dtl.filter.strings._fix_ampersands,"&amp;")
},floatformat:function(B,A){A=parseInt(A||-1);
B=parseFloat(B);
var C=B-B.toFixed(0);
if(!C&&A<0){return B.toFixed()
}B=B.toFixed(Math.abs(A));
return(A<0)?parseFloat(B)+"":B
},iriencode:function(A){return dojox.dtl.text.urlquote(A,"/#%[]=:;$&()+,!")
},linenumbers:function(C){var D=dojox.dtl.filter;
var F=C.split("\n");
var G=[];
var B=(F.length+"").length;
for(var A=0,E;
A<F.length;
A++){E=F[A];
G.push(D.strings.ljust(A+1,B)+". "+D.htmlstrings.escape(E))
}return G.join("\n")
},ljust:function(A,B){A=A+"";
B=parseInt(B);
while(A.length<B){A=A+" "
}return A
},lower:function(A){return(A+"").toLowerCase()
},make_list:function(C){var D=[];
if(typeof C=="number"){C=C+""
}if(C.charAt){for(var B=0;
B<C.length;
B++){D.push(C.charAt(B))
}return D
}if(typeof C=="object"){for(var A in C){D.push(C[A])
}return D
}return[]
},rjust:function(A,B){A=A+"";
B=parseInt(B);
while(A.length<B){A=" "+A
}return A
},slugify:function(A){A=A.replace(/[^\w\s-]/g,"").toLowerCase();
return A.replace(/[\-\s]+/g,"-")
},_strings:{},stringformat:function(B,A){A=""+A;
var C=dojox.dtl.filter.strings._strings;
if(!C[A]){C[A]=new dojox.string.sprintf.Formatter("%"+A)
}return C[A].format(B)
},title:function(B){var A,D="";
for(var E=0,C;
E<B.length;
E++){C=B.charAt(E);
if(A==" "||A=="\n"||A=="\t"||!A){D+=C.toUpperCase()
}else{D+=C.toLowerCase()
}A=C
}return D
},_truncatewords:/[ \n\r\t]/,truncatewords:function(C,E){E=parseInt(E);
if(!E){return C
}for(var G=0,F=C.length,B=0,D,A;
G<C.length;
G++){D=C.charAt(G);
if(dojox.dtl.filter.strings._truncatewords.test(A)){if(!dojox.dtl.filter.strings._truncatewords.test(D)){++B;
if(B==E){return C.substring(0,F+1)
}}}else{if(!dojox.dtl.filter.strings._truncatewords.test(D)){F=G
}}A=D
}return C
},_truncate_words:/(&.*?;|<.*?>|(\w[\w-]*))/g,_truncate_tag:/<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,_truncate_singlets:{br:true,col:true,link:true,base:true,img:true,param:true,area:true,hr:true,input:true},truncatewords_html:function(B,F){F=parseInt(F);
if(F<=0){return""
}var E=dojox.dtl.filter.strings;
var C=0;
var H=[];
var G=dojox.string.tokenize(B,E._truncate_words,function(J,L){if(L){++C;
if(C<F){return L
}else{if(C==F){return L+" ..."
}}}var M=J.match(E._truncate_tag);
if(!M||C>=F){return 
}var I=M[1];
var K=M[2].toLowerCase();
var O=M[3];
if(I||E._truncate_singlets[K]){}else{if(I){var N=dojo.indexOf(H,K);
if(N!=-1){H=H.slice(N+1)
}}else{H.unshift(K)
}}return J
}).join("");
G=G.replace(/\s+$/g,"");
for(var A=0,D;
D=H[A];
A++){G+="</"+D+">"
}return G
},upper:function(A){return A.toUpperCase()
},urlencode:function(A){return dojox.dtl.text.urlquote(A)
},_urlize:/^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,_urlize2:/^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,urlize:function(A){return dojox.dtl.filter.strings.urlizetrunc(A)
},urlizetrunc:function(A,B){B=parseInt(B);
return dojox.string.tokenize(A,/(\S+)/g,function(G){var C=dojox.dtl.filter.strings._urlize.exec(G);
if(!C){return G
}var I=C[1];
var O=C[2];
var E=C[3];
var L=O.indexOf("www.")==0;
var N=O.indexOf("@")!=-1;
var F=O.indexOf(":")!=-1;
var J=O.indexOf("http://")==0;
var M=O.indexOf("https://")==0;
var K=/[a-zA-Z0-9]/.test(O.charAt(0));
var H=O.substring(O.length-4);
var D=O;
if(B>3){D=D.substring(0,B-3)+"..."
}if(L||(!N&&!J&&O.length&&K&&(H==".org"||H==".net"||H==".com"))){return'<a href="http://'+O+'" rel="nofollow">'+D+"</a>"
}else{if(J||M){return'<a href="'+O+'" rel="nofollow">'+D+"</a>"
}else{if(N&&!L&&!F&&dojox.dtl.filter.strings._urlize2.test(O)){return'<a href="mailto:'+O+'">'+O+"</a>"
}}}return G
}).join("")
},wordcount:function(A){return dojox.dtl.text.pySplit(A).length
},wordwrap:function(H,D){D=parseInt(D);
var F=[];
var B=H.split(/ /g);
if(B.length){var A=B.shift();
F.push(A);
var C=A.length-A.lastIndexOf("\n")-1;
for(var G=0;
G<B.length;
G++){A=B[G];
if(A.indexOf("\n")!=-1){var E=A.split(/\n/g)
}else{var E=[A]
}C+=E[0].length+1;
if(D&&C>D){F.push("\n");
C=E[E.length-1].length
}else{F.push(" ");
if(E.length>1){C=E[E.length-1].length
}}F.push(A)
}}return F.join("")
}})
};