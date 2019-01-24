dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.htmlstrings"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.htmlstrings"]){A._hasResource["dojox.dtl.filter.htmlstrings"]=true;
A.provide("dojox.dtl.filter.htmlstrings");
A.require("dojox.dtl._base");
A.mixin(dojox.dtl.filter.htmlstrings,{_escapeamp:/&/g,_escapelt:/</g,_escapegt:/>/g,_escapeqt:/'/g,_escapedblqt:/"/g,_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,escape:function(C){var B=dojox.dtl.filter.htmlstrings;
return C.replace(B._escapeamp,"&amp;").replace(B._escapelt,"&lt;").replace(B._escapegt,"&gt;").replace(B._escapedblqt,"&quot;").replace(B._escapeqt,"&#39;")
},linebreaks:function(F){var B=[];
var E=dojox.dtl.filter.htmlstrings;
F=F.replace(E._linebreaksrn,"\n");
var G=F.split(E._linebreaksn);
for(var D=0;
D<G.length;
D++){var C=G[D].replace(E._linebreakss,"").replace(E._linebreaksbr,"<br />");
B.push("<p>"+C+"</p>")
}return B.join("\n\n")
},linebreaksbr:function(C){var B=dojox.dtl.filter.htmlstrings;
return C.replace(B._linebreaksrn,"\n").replace(B._linebreaksbr,"<br />")
},removetags:function(E,B){var D=dojox.dtl.filter.htmlstrings;
var C=[];
var F;
while(F=D._removetagsfind.exec(B)){C.push(F[0])
}C="("+C.join("|")+")";
return E.replace(new RegExp("</?s*"+C+"s*[^>]*>","gi"),"")
},striptags:function(B){return B.replace(dojox.dtl.filter.htmlstrings._striptags,"")
}})
}}});