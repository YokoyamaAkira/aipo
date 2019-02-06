if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(C,A){var E="^";
var D=null;
for(var B=0;
B<C.length;
B++){D=C.charAt(B);
switch(D){case"\\":E+=D;
B++;
E+=C.charAt(B);
break;
case"*":E+=".*";
break;
case"?":E+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":E+="\\";
default:E+=D
}}E+="$";
if(A){return new RegExp(E,"i")
}else{return new RegExp(E)
}}
};