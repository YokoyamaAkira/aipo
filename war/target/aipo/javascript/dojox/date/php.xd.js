dojo._xdResourceLoaded({depends:[["provide","dojox.date.php"],["require","dojo.date"]],defineResource:function(A){if(!A._hasResource["dojox.date.php"]){A._hasResource["dojox.date.php"]=true;
A.provide("dojox.date.php");
A.require("dojo.date");
dojox.date.php.format=function(B,C,E){var D=new dojox.date.php.DateFormat(B);
return D.format(C,E)
};
dojox.date.php.DateFormat=function(B){this.date=B
};
A.extend(dojox.date.php.DateFormat,{weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdays_3:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],months_3:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],monthdays:[31,28,31,30,31,30,31,31,30,31,30,31],format:function(E,F){var D=[];
for(var B=0;
B<E.length;
B++){var C=E.charAt(B);
if(F&&typeof F[C]=="function"){D.push(F[C].call(this))
}else{if(typeof this[C]=="function"){D.push(this[C]())
}else{D.push(C)
}}}return D.join("")
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
},W:function(){var G;
var B=new Date(this.date.getFullYear(),0,1).getDay()+1;
var C=this.date.getDay()+1;
var H=parseInt(this.z());
if(H<=(8-B)&&B>4){var F=new Date(this.date.getFullYear()-1,this.date.getMonth(),this.date.getDate());
if(B==5||(B==6&&A.date.isLeapYear(F))){G=53
}else{G=52
}}else{var E;
if(Boolean(this.L())){E=366
}else{E=365
}if((E-H)<(4-C)){G=1
}else{var D=H+(7-C)+(B-1);
G=Math.ceil(D/7);
if(B>4){--G
}}}return G
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
},B:function(){var D=this.date.getTimezoneOffset()+60;
var B=(this.date.getHours()*3600)+(this.date.getMinutes()*60)+this.getSeconds()+(D*60);
var C=Math.abs(Math.floor(B/86.4)%1000)+"";
while(C.length<2){C="0"+C
}return C
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
},I:function(){},O:function(){var D=Math.abs(this.date.getTimezoneOffset());
var B=Math.floor(D/60)+"";
var C=(D%60)+"";
if(B.length==1){B="0"+B
}if(C.length==1){B="0"+C
}return((this.date.getTimezoneOffset()<0)?"+":"-")+B+C
},P:function(){var B=this.O();
return B.substring(0,2)+":"+B.substring(2,4)
},T:function(){return this.e().substring(0,3)
},Z:function(){return this.date.getTimezoneOffset()*-60
},c:function(){return this.Y()+"-"+this.m()+"-"+this.d()+"T"+this.h()+":"+this.i()+":"+this.s()+this.P()
},r:function(){return this.D()+", "+this.d()+" "+this.M()+" "+this.Y()+" "+this.H()+":"+this.i()+":"+this.s()+" "+this.O()
},U:function(){return Math.floor(this.date.getTime()/1000)
}})
}}});