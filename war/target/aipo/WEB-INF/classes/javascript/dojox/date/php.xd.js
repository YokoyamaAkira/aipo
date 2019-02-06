dojo._xdResourceLoaded({depends:[["provide","dojox.date.php"],["require","dojo.date"]],defineResource:function(A){if(!A._hasResource["dojox.date.php"]){A._hasResource["dojox.date.php"]=true;
A.provide("dojox.date.php");
A.require("dojo.date");
dojox.date.php.format=function(C,D,B){var E=new dojox.date.php.DateFormat(C);
return E.format(D,B)
};
dojox.date.php.DateFormat=function(B){this.date=B
};
A.extend(dojox.date.php.DateFormat,{weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdays_3:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],months_3:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],monthdays:[31,28,31,30,31,30,31,31,30,31,30,31],format:function(F,B){var E=[];
for(var C=0;
C<F.length;
C++){var D=F.charAt(C);
if(B&&typeof B[D]=="function"){E.push(B[D].call(this))
}else{if(typeof this[D]=="function"){E.push(this[D]())
}else{E.push(D)
}}}return E.join("")
},d:function(){var B=this.j();
return(B.length==1)?"0"+B:B
},D:function(){return this.weekdays_3[this.date.getDay()]
},j:function(){return this.date.getDate()+""
},l:function(){return this.weekdays[this.date.getDay()]
},N:function(){var B=this.w();
return(!B)?7:B
},S:function(){switch(this.date.getDate()){case 11:case 12:case 13:return"th";
case 1:case 21:case 31:return"st";
case 2:case 22:return"nd";
case 3:case 23:return"rd";
default:return"th"
}},w:function(){return this.date.getDay()+""
},z:function(){var B=this.date.getTime()-new Date(this.date.getFullYear(),0,1).getTime();
return Math.floor(B/86400000)+""
},W:function(){var F;
var G=new Date(this.date.getFullYear(),0,1).getDay()+1;
var H=this.date.getDay()+1;
var C=parseInt(this.z());
if(C<=(8-G)&&G>4){var E=new Date(this.date.getFullYear()-1,this.date.getMonth(),this.date.getDate());
if(G==5||(G==6&&A.date.isLeapYear(E))){F=53
}else{F=52
}}else{var D;
if(Boolean(this.L())){D=366
}else{D=365
}if((D-C)<(4-H)){F=1
}else{var B=C+(7-H)+(G-1);
F=Math.ceil(B/7);
if(G>4){--F
}}}return F
},F:function(){return this.months[this.date.getMonth()]
},m:function(){var B=this.n();
return(B.length==1)?"0"+B:B
},M:function(){return months_3[this.date.getMonth()]
},n:function(){return this.date.getMonth()+1+""
},t:function(){return(Boolean(this.L())&&this.date.getMonth()==1)?29:this.monthdays[this.getMonth()]
},L:function(){return(A.date.isLeapYear(this.date))?"1":"0"
},o:function(){},Y:function(){return this.date.getFullYear()+""
},y:function(){return this.date.getFullYear.substsring(2,4)
},a:function(){return this.date.getHours()>=12?"pm":"am"
},b:function(){return this.a().toUpperCase()
},B:function(){var B=this.date.getTimezoneOffset()+60;
var C=(this.date.getHours()*3600)+(this.date.getMinutes()*60)+this.getSeconds()+(B*60);
var D=Math.abs(Math.floor(C/86.4)%1000)+"";
while(D.length<2){D="0"+D
}return D
},g:function(){return(this.date.getHours()>12)?this.date.getHours()-12+"":this.date.getHours()+""
},G:function(){return this.date.getHours()+""
},h:function(){var B=this.g();
return(B.length==1)?"0"+B:B
},H:function(){var B=this.G();
return(B.length==1)?"0"+B:B
},i:function(){var B=this.date.getMinutes()+"";
return(B.length==1)?"0"+B:B
},s:function(){var B=this.date.getSeconds()+"";
return(B.length==1)?"0"+B:B
},e:function(){return A.date.getTimezoneName(this.date)
},I:function(){},O:function(){var B=Math.abs(this.date.getTimezoneOffset());
var C=Math.floor(B/60)+"";
var D=(B%60)+"";
if(C.length==1){C="0"+C
}if(D.length==1){C="0"+D
}return((this.date.getTimezoneOffset()<0)?"+":"-")+C+D
},P:function(){var B=this.O();
return B.substring(0,2)+":"+B.substring(2,4)
},T:function(){return this.e().substring(0,3)
},Z:function(){return this.date.getTimezoneOffset()*-60
},c:function(){return this.Y()+"-"+this.m()+"-"+this.d()+"T"+this.h()+":"+this.i()+":"+this.s()+this.P()
},r:function(){return this.D()+", "+this.d()+" "+this.M()+" "+this.Y()+" "+this.H()+":"+this.i()+":"+this.s()+" "+this.O()
},U:function(){return Math.floor(this.date.getTime()/1000)
}})
}}});