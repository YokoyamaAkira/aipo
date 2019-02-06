if(!dojo._hasResource["dojox.date.php"]){dojo._hasResource["dojox.date.php"]=true;
dojo.provide("dojox.date.php");
dojo.require("dojo.date");
dojox.date.php.format=function(D,A,C){var B=new dojox.date.php.DateFormat(D);
return B.format(A,C)
};
dojox.date.php.DateFormat=function(A){this.date=A
};
dojo.extend(dojox.date.php.DateFormat,{weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdays_3:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],months_3:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],monthdays:[31,28,31,30,31,30,31,31,30,31,30,31],format:function(C,D){var B=[];
for(var E=0;
E<C.length;
E++){var A=C.charAt(E);
if(D&&typeof D[A]=="function"){B.push(D[A].call(this))
}else{if(typeof this[A]=="function"){B.push(this[A]())
}else{B.push(A)
}}}return B.join("")
},d:function(){var A=this.j();
return(A.length==1)?"0"+A:A
},D:function(){return this.weekdays_3[this.date.getDay()]
},j:function(){return this.date.getDate()+""
},l:function(){return this.weekdays[this.date.getDay()]
},N:function(){var A=this.w();
return(!A)?7:A
},S:function(){switch(this.date.getDate()){case 11:case 12:case 13:return"th";
case 1:case 21:case 31:return"st";
case 2:case 22:return"nd";
case 3:case 23:return"rd";
default:return"th"
}},w:function(){return this.date.getDay()+""
},z:function(){var A=this.date.getTime()-new Date(this.date.getFullYear(),0,1).getTime();
return Math.floor(A/86400000)+""
},W:function(){var C;
var E=new Date(this.date.getFullYear(),0,1).getDay()+1;
var F=this.date.getDay()+1;
var D=parseInt(this.z());
if(D<=(8-E)&&E>4){var B=new Date(this.date.getFullYear()-1,this.date.getMonth(),this.date.getDate());
if(E==5||(E==6&&dojo.date.isLeapYear(B))){C=53
}else{C=52
}}else{var A;
if(Boolean(this.L())){A=366
}else{A=365
}if((A-D)<(4-F)){C=1
}else{var G=D+(7-F)+(E-1);
C=Math.ceil(G/7);
if(E>4){--C
}}}return C
},F:function(){return this.months[this.date.getMonth()]
},m:function(){var A=this.n();
return(A.length==1)?"0"+A:A
},M:function(){return months_3[this.date.getMonth()]
},n:function(){return this.date.getMonth()+1+""
},t:function(){return(Boolean(this.L())&&this.date.getMonth()==1)?29:this.monthdays[this.getMonth()]
},L:function(){return(dojo.date.isLeapYear(this.date))?"1":"0"
},o:function(){},Y:function(){return this.date.getFullYear()+""
},y:function(){return this.date.getFullYear.substsring(2,4)
},a:function(){return this.date.getHours()>=12?"pm":"am"
},b:function(){return this.a().toUpperCase()
},B:function(){var B=this.date.getTimezoneOffset()+60;
var C=(this.date.getHours()*3600)+(this.date.getMinutes()*60)+this.getSeconds()+(B*60);
var A=Math.abs(Math.floor(C/86.4)%1000)+"";
while(A.length<2){A="0"+A
}return A
},g:function(){return(this.date.getHours()>12)?this.date.getHours()-12+"":this.date.getHours()+""
},G:function(){return this.date.getHours()+""
},h:function(){var A=this.g();
return(A.length==1)?"0"+A:A
},H:function(){var A=this.G();
return(A.length==1)?"0"+A:A
},i:function(){var A=this.date.getMinutes()+"";
return(A.length==1)?"0"+A:A
},s:function(){var A=this.date.getSeconds()+"";
return(A.length==1)?"0"+A:A
},e:function(){return dojo.date.getTimezoneName(this.date)
},I:function(){},O:function(){var B=Math.abs(this.date.getTimezoneOffset());
var C=Math.floor(B/60)+"";
var A=(B%60)+"";
if(C.length==1){C="0"+C
}if(A.length==1){C="0"+A
}return((this.date.getTimezoneOffset()<0)?"+":"-")+C+A
},P:function(){var A=this.O();
return A.substring(0,2)+":"+A.substring(2,4)
},T:function(){return this.e().substring(0,3)
},Z:function(){return this.date.getTimezoneOffset()*-60
},c:function(){return this.Y()+"-"+this.m()+"-"+this.d()+"T"+this.h()+":"+this.i()+":"+this.s()+this.P()
},r:function(){return this.D()+", "+this.d()+" "+this.M()+" "+this.Y()+" "+this.H()+":"+this.i()+":"+this.s()+" "+this.O()
},U:function(){return Math.floor(this.date.getTime()/1000)
}})
};