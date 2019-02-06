dojo._xdResourceLoaded({depends:[["provide","dojo.cldr.supplemental"],["require","dojo.i18n"]],defineResource:function(A){if(!A._hasResource["dojo.cldr.supplemental"]){A._hasResource["dojo.cldr.supplemental"]=true;
A.provide("dojo.cldr.supplemental");
A.require("dojo.i18n");
A.cldr.supplemental.getFirstDayOfWeek=function(C){var D={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var E=A.cldr.supplemental._region(C);
var B=D[E];
return(typeof B=="undefined")?1:B
};
A.cldr.supplemental._region=function(C){C=A.i18n.normalizeLocale(C);
var D=C.split("-");
var B=D[1];
if(!B){B={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[D[0]]
}else{if(B.length==4){B=D[2]
}}return B
};
A.cldr.supplemental.getWeekend=function(D){var F={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var C={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var G=A.cldr.supplemental._region(D);
var B=F[G];
var E=C[G];
if(typeof B=="undefined"){B=6
}if(typeof E=="undefined"){E=0
}return{start:B,end:E}
}
}}});