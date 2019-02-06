if(!dojo._hasResource["dojo.cldr.monetary"]){dojo._hasResource["dojo.cldr.monetary"]=true;
dojo.provide("dojo.cldr.monetary");
dojo.cldr.monetary.getData=function(C){var D={ADP:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,DJF:0,ESP:0,GNF:0,IQD:3,ITL:0,JOD:3,JPY:0,KMF:0,KRW:0,KWD:3,LUF:0,LYD:3,MGA:0,MGF:0,OMR:3,PYG:0,RWF:0,TND:3,TRL:0,VUV:0,XAF:0,XOF:0,XPF:0};
var B={CHF:5};
var A=D[C],E=B[C];
if(typeof A=="undefined"){A=2
}if(typeof E=="undefined"){E=0
}return{places:A,round:E}
}
};