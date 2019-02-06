dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.utils.date"],["require","dojox.date.php"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.utils.date"]){A._hasResource["dojox.dtl.utils.date"]=true;
A.provide("dojox.dtl.utils.date");
A.require("dojox.date.php");
A.mixin(dojox.dtl.utils.date,{format:function(C,B){return dojox.date.php.format(C,B,dojox.dtl.utils.date._overrides)
},timesince:function(G,D){if(!(G instanceof Date)){G=new Date(G.year,G.month,G.day)
}if(!D){D=new Date()
}var C=Math.abs(D.getTime()-G.getTime());
for(var E=0,B;
B=dojox.dtl.utils.date._chunks[E];
E++){var F=Math.floor(C/B[0]);
if(F){break
}}return F+" "+B[1](F)
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