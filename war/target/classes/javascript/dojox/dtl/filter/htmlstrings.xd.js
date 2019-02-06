dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.htmlstrings"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.htmlstrings"]){A._hasResource["dojox.dtl.filter.htmlstrings"]=true;
A.provide("dojox.dtl.filter.htmlstrings");
A.require("dojox.dtl._base");
A.mixin(dojox.dtl.filter.htmlstrings,{_escapeamp:/&/g,_escapelt:/</g,_escapegt:/>/g,_escapeqt:/'/g,_escapedblqt:/"/g,_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,escape:function(B){var C=dojox.dtl.filter.htmlstrings;
return B.replace(C._escapeamp,"&amp;").replace(C._escapelt,"&lt;").replace(C._escapegt,"&gt;").replace(C._escapedblqt,"&quot;").replace(C._escapeqt,"&#39;")
},linebreaks:function(G){var C=[];
var F=dojox.dtl.filter.htmlstrings;
G=G.replace(F._linebreaksrn,"\n");
var B=G.split(F._linebreaksn);
for(var E=0;
E<B.length;
E++){var D=B[E].replace(F._linebreakss,"").replace(F._linebreaksbr,"<br />");
C.push("<p>"+D+"</p>")
}return C.join("\n\n")
},linebreaksbr:function(B){var C=dojox.dtl.filter.htmlstrings;
return B.replace(C._linebreaksrn,"\n").replace(C._linebreaksbr,"<br />")
},removetags:function(F,C){var E=dojox.dtl.filter.htmlstrings;
var D=[];
var B;
while(B=E._removetagsfind.exec(C)){D.push(B[0])
}D="("+D.join("|")+")";
return F.replace(new RegExp("</?s*"+D+"s*[^>]*>","gi"),"")
},striptags:function(B){return B.replace(dojox.dtl.filter.htmlstrings._striptags,"")
}})
}}});