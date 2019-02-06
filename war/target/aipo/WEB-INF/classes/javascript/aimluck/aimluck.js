window.aimluck=window.aimluck||{};
aimluck.namespace=function(B){if(!B||!B.length){return null
}var C=B.split(".");
var A=aimluck;
for(var D=(C[0]=="aimluck")?1:0;
D<C.length;
++D){A[C[D]]=A[C[D]]||{};
A=A[C[D]]
}return A
};
function getObjectById(A){if(document.getElementById){return document.getElementById(A)
}else{if(document.all){return document.all(A)
}else{if(document.layers){return document.layers[A]
}}}}function ew(A){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}function dw(A){if(confirm("\u3053\u306e"+A.form.name+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}}function ews(A){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}function dws(A){if(confirm("\u9078\u629e\u3057\u305f"+A.form.name+"\u3092\u3059\u3079\u3066\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}}function setHiddenValue(B){if(B.name){var A=document.createElement("input");
A.type="hidden";
A.name=B.name;
A.value=B.value;
B.form.appendChild(A)
}}function disableSubmit(A){var B=A.elements;
for(var C=0;
C<B.length;
C++){if(B[C].type=="submit"){B[C].disabled=true
}}}function disableButton(A){var B=A.elements;
for(var C=0;
C<B.length;
C++){if(B[C].type=="button"){B[C].disabled=true
}}}function check_new_mail(B,A){B.form.action=B.form.action+"?confirmlasttime=true&start="+A;
B.form.submit()
}function createAction(A){A.form.action=A.form.action+"?"+A.name+"=1"
}function verifyCheckBox(C,D,B){var A=0;
var E;
for(E=0;
E<C.elements.length;
E++){if(C.elements[E].checked){A++
}}if(A==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return D(B)
}}function submit_member(B){var A=B.options;
for(i=0;
i<A.length;
i++){A[i].selected=true
}}function add_option(E,B,C,D){if(document.all){var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
if(E.options.length==1&&E.options[0].value==""){E.options.remove(0)
}E.add(A,E.options.length)
}else{var A=document.createElement("OPTION");
A.value=B;
A.text=C;
A.selected=D;
if(E.options.length==1&&E.options[0].value==""){E.removeChild(E.options[0])
}E.insertBefore(A,E.options[E.options.length])
}}function add_member(D,A){if(document.all){var F=D.options;
var E=A.options;
if(F.length==1&&F[0].value==""){return 
}for(i=0;
i<F.length;
i++){if(!F[i].selected){continue
}var C=false;
for(j=0;
j<E.length;
j++){if(E[j].value==F[i].value){C=true;
break
}}if(C){continue
}var B=document.createElement("OPTION");
B.value=F[i].value;
B.text=F[i].text;
B.selected=true;
if(E.length==1&&E[0].value==""){E.remove(0)
}E.add(B,E.length)
}}else{var F=D.options;
var E=A.options;
if(F.length==1&&F[0].value==""){return 
}for(i=0;
i<F.length;
i++){if(!F[i].selected){continue
}var C=false;
for(j=0;
j<E.length;
j++){if(E[j].value==F[i].value){C=true;
break
}}if(C){continue
}var B=document.createElement("OPTION");
B.value=F[i].value;
B.text=F[i].text;
B.selected=true;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,E[E.length])
}}}function remove_member(B){if(document.all){var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=B.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){B.removeChild(A[i]);
i-=1
}}}if(A.length==0){add_option(B,"","\u3000",false)
}}function doUpOptions10(B){var A=B.options;
for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}if(i==0){continue
}if(A[i-1].selected){continue
}up_option(B,i,10)
}}function doUpOptions(B){var A=B.options;
for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}if(i==0){continue
}if(A[i-1].selected){continue
}up_option(B,i,1)
}}function doDownOptions10(B){var A=B.options;
for(i=A.length-1;
i>=0;
i--){if(!A[i].selected){continue
}if(i==A.length-1){continue
}if(A[i+1].selected){continue
}down_option(B,i,10)
}}function doDownOptions(B){var A=B.options;
for(i=A.length-1;
i>=0;
i--){if(!A[i].selected){continue
}if(i==A.length-1){continue
}if(A[i+1].selected){continue
}down_option(B,i,1)
}}function up_option(E,B,C){var A=E.options;
var D=0;
if(B-C>=0){D=B-C
}else{for(i=0;
i<A.length;
i++){if(!A[i].selected){D=i;
break
}}}change_turn_option(E,B,D)
}function down_option(E,B,C){var A=E.options;
var D=0;
if(A.length-1-B-C>=0){D=B+C
}else{for(i=A.length-1;
i>=0;
i--){if(!A[i].selected){D=i;
break
}}}change_turn_option(E,B,D)
}function change_turn_option(E,B,D){var A=E.options;
if(document.all){var C=document.createElement("OPTION");
C.value=A[B].value;
C.text=A[B].text;
C.selected=true;
E.remove(B);
A.add(C,D);
A[D].selected=true
}else{var C=document.createElement("OPTION");
C.value=A[B].value;
C.text=A[B].text;
C.selected=true;
E.removeChild(A[B]);
E.insertBefore(C,A[D]);
A[D].selected=true
}};