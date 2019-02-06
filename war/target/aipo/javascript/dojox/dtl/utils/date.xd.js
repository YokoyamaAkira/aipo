dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.utils.date"],["require","dojox.date.php"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.utils.date"]){A._hasResource["dojox.dtl.utils.date"]=true;
A.provide("dojox.dtl.utils.date");
A.require("dojox.date.php");
A.mixin(dojox.dtl.utils.date,{format:function(B,C){return dojox.date.php.format(B,C,dojox.dtl.utils.date._overrides)
},timesince:function(F,C){if(!(F instanceof Date)){F=new Date(F.year,F.month,F.day)
}if(!C){C=new Date()
}var G=Math.abs(C.getTime()-F.getTime());
for(var D=0,B;
B=dojox.dtl.utils.date._chunks[D];
D++){var E=Math.floor(G/B[0]);
if(E){break
}}return E+" "+B[1](E)
},_chunks:[[60*60*24*365*1000,function(B){return(B==1)?"year":"years"
}],[60*60*24*30*1000,function(B){return(B==1)?"month":"months"
}],[60*60*24*7*1000,function(B){return(B==1)?"week":"weeks"
}],[60*60*24*1000,function(B){return(B==1)?"day":"days"
}],[60*60*1000,function(B){return(B==1)?"hour":"hours"
}],[60*1000,function(B){return(B==1)?"minute":"minutes"
}]],_months_ap:["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],_overrides:{f:function(){if(!this.date.getMinutes()){return this.g()
}},N:function(){return dojox.dtl.utils.date._months_ap[this.date.getMonth()]
},P:function(){if(!this.date.getMinutes()&&!this.date.getHours()){return"midnight"
}if(!this.date.getMinutes()&&this.date.getHours()==12){return"noon"
}return self.f()+" "+self.a()
}}})
}}});