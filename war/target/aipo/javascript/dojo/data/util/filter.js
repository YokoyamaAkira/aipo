if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(D,B){var A="^";
var E=null;
for(var C=0;
C<D.length;
C++){E=D.charAt(C);
switch(E){case"\\":A+=E;
C++;
A+=D.charAt(C);
break;
case"*":A+=".*";
break;
case"?":A+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":A+="\\";
default:A+=E
}}A+="$";
if(B){return new RegExp(A,"i")
}else{return new RegExp(A)
}}
};