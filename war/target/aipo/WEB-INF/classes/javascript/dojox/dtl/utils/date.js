if(!dojo._hasResource["dojox.dtl.utils.date"]){dojo._hasResource["dojox.dtl.utils.date"]=true;
dojo.provide("dojox.dtl.utils.date");
dojo.require("dojox.date.php");
dojo.mixin(dojox.dtl.utils.date,{format:function(A,B){return dojox.date.php.format(A,B,dojox.dtl.utils.date._overrides)
},timesince:function(E,B){if(!(E instanceof Date)){E=new Date(E.year,E.month,E.day)
}if(!B){B=new Date()
}var F=Math.abs(B.getTime()-E.getTime());
for(var C=0,A;
A=dojox.dtl.utils.date._chunks[C];
C++){var D=Math.floor(F/A[0]);
if(D){break
}}return D+" "+A[1](D)
},_chunks:[[60*60*24*365*1000,function(A){return(A==1)?"year":"years"
}],[60*60*24*30*1000,function(A){return(A==1)?"month":"months"
}],[60*60*24*7*1000,function(A){return(A==1)?"week":"weeks"
}],[60*60*24*1000,function(A){return(A==1)?"day":"days"
}],[60*60*1000,function(A){return(A==1)?"hour":"hours"
}],[60*1000,function(A){return(A==1)?"minute":"minutes"
}]],_months_ap:["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],_overrides:{f:function(){if(!this.date.getMinutes()){return this.g()
}},N:function(){return dojox.dtl.utils.date._months_ap[this.date.getMonth()]
},P:function(){if(!this.date.getMinutes()&&!this.date.getHours()){return"midnight"
}if(!this.date.getMinutes()&&this.date.getHours()==12){return"noon"
}return self.f()+" "+self.a()
}}})
};