if(!dojo._hasResource["dojox.dtl.filter.htmlstrings"]){dojo._hasResource["dojox.dtl.filter.htmlstrings"]=true;
dojo.provide("dojox.dtl.filter.htmlstrings");
dojo.require("dojox.dtl._base");
dojo.mixin(dojox.dtl.filter.htmlstrings,{_escapeamp:/&/g,_escapelt:/</g,_escapegt:/>/g,_escapeqt:/'/g,_escapedblqt:/"/g,_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,escape:function(A){var B=dojox.dtl.filter.htmlstrings;
return A.replace(B._escapeamp,"&amp;").replace(B._escapelt,"&lt;").replace(B._escapegt,"&gt;").replace(B._escapedblqt,"&quot;").replace(B._escapeqt,"&#39;")
},linebreaks:function(D){var F=[];
var C=dojox.dtl.filter.htmlstrings;
D=D.replace(C._linebreaksrn,"\n");
var E=D.split(C._linebreaksn);
for(var B=0;
B<E.length;
B++){var A=E[B].replace(C._linebreakss,"").replace(C._linebreaksbr,"<br />");
F.push("<p>"+A+"</p>")
}return F.join("\n\n")
},linebreaksbr:function(A){var B=dojox.dtl.filter.htmlstrings;
return A.replace(B._linebreaksrn,"\n").replace(B._linebreaksbr,"<br />")
},removetags:function(C,E){var B=dojox.dtl.filter.htmlstrings;
var A=[];
var D;
while(D=B._removetagsfind.exec(E)){A.push(D[0])
}A="("+A.join("|")+")";
return C.replace(new RegExp("</?s*"+A+"s*[^>]*>","gi"),"")
},striptags:function(A){return A.replace(dojox.dtl.filter.htmlstrings._striptags,"")
}})
};