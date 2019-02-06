if(!dojo._hasResource["dojox.dtl.utils.date"]){dojo._hasResource["dojox.dtl.utils.date"]=true;
dojo.provide("dojox.dtl.utils.date");
dojo.require("dojox.date.php");
dojo.mixin(dojox.dtl.utils.date,{format:function(B,A){return dojox.date.php.format(B,A,dojox.dtl.utils.date._overrides)
},timesince:function(D,A){if(!(D instanceof Date)){D=new Date(D.year,D.month,D.day)
}if(!A){A=new Date()
}var E=Math.abs(A.getTime()-D.getTime());
for(var B=0,F;
F=dojox.dtl.utils.date._chunks[B];
B++){var C=Math.floor(E/F[0]);
if(C){break
}}return C+" "+F[1](C)
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