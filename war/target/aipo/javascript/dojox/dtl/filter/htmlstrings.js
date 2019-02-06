if(!dojo._hasResource["dojox.dtl.filter.htmlstrings"]){dojo._hasResource["dojox.dtl.filter.htmlstrings"]=true;
dojo.provide("dojox.dtl.filter.htmlstrings");
dojo.require("dojox.dtl._base");
dojo.mixin(dojox.dtl.filter.htmlstrings,{_escapeamp:/&/g,_escapelt:/</g,_escapegt:/>/g,_escapeqt:/'/g,_escapedblqt:/"/g,_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,escape:function(B){var A=dojox.dtl.filter.htmlstrings;
return B.replace(A._escapeamp,"&amp;").replace(A._escapelt,"&lt;").replace(A._escapegt,"&gt;").replace(A._escapedblqt,"&quot;").replace(A._escapeqt,"&#39;")
},linebreaks:function(E){var A=[];
var D=dojox.dtl.filter.htmlstrings;
E=E.replace(D._linebreaksrn,"\n");
var F=E.split(D._linebreaksn);
for(var C=0;
C<F.length;
C++){var B=F[C].replace(D._linebreakss,"").replace(D._linebreaksbr,"<br />");
A.push("<p>"+B+"</p>")
}return A.join("\n\n")
},linebreaksbr:function(B){var A=dojox.dtl.filter.htmlstrings;
return B.replace(A._linebreaksrn,"\n").replace(A._linebreaksbr,"<br />")
},removetags:function(D,A){var C=dojox.dtl.filter.htmlstrings;
var B=[];
var E;
while(E=C._removetagsfind.exec(A)){B.push(E[0])
}B="("+B.join("|")+")";
return D.replace(new RegExp("</?s*"+B+"s*[^>]*>","gi"),"")
},striptags:function(A){return A.replace(dojox.dtl.filter.htmlstrings._striptags,"")
}})
};