dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.filter"]],defineResource:function(A){if(!A._hasResource["dojo.data.util.filter"]){A._hasResource["dojo.data.util.filter"]=true;
A.provide("dojo.data.util.filter");
A.data.util.filter.patternToRegExp=function(E,C){var B="^";
var F=null;
for(var D=0;
D<E.length;
D++){F=E.charAt(D);
switch(F){case"\\":B+=F;
D++;
B+=E.charAt(D);
break;
case"*":B+=".*";
break;
case"?":B+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":B+="\\";
default:B+=F
}}B+="$";
if(C){return new RegExp(B,"i")
}else{return new RegExp(B)
}}
}}});