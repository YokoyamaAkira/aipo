window.aimluck=window.aimluck||{};
aimluck.namespace=function(C){if(!C||!C.length){return null
}var D=C.split(".");
var B=aimluck;
for(var A=(D[0]=="aimluck")?1:0;
A<D.length;
++A){B[D[A]]=B[D[A]]||{};
B=B[D[A]]
}return B
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
}}function setHiddenValue(A){if(A.name){var B=document.createElement("input");
B.type="hidden";
B.name=A.name;
B.value=A.value;
A.form.appendChild(B)
}}function disableSubmit(B){var C=B.elements;
for(var A=0;
A<C.length;
A++){if(C[A].type=="submit"){C[A].disabled=true
}}}function disableButton(B){var C=B.elements;
for(var A=0;
A<C.length;
A++){if(C[A].type=="button"){C[A].disabled=true
}}}function check_new_mail(A,B){A.form.action=A.form.action+"?confirmlasttime=true&start="+B;
A.form.submit()
}function createAction(A){A.form.action=A.form.action+"?"+A.name+"=1"
}function verifyCheckBox(D,E,C){var B=0;
var A;
for(A=0;
A<D.elements.length;
A++){if(D.elements[A].checked){B++
}}if(B==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return E(C)
}}function submit_member(A){var B=A.options;
for(i=0;
i<B.length;
i++){B[i].selected=true
}}function add_option(A,C,D,E){if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}}function add_member(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,F[F.length])
}}}function remove_member(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(A,"","\u3000",false)
}}function doUpOptions10(A){var B=A.options;
for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}if(i==0){continue
}if(B[i-1].selected){continue
}up_option(A,i,10)
}}function doUpOptions(A){var B=A.options;
for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}if(i==0){continue
}if(B[i-1].selected){continue
}up_option(A,i,1)
}}function doDownOptions10(A){var B=A.options;
for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){continue
}if(i==B.length-1){continue
}if(B[i+1].selected){continue
}down_option(A,i,10)
}}function doDownOptions(A){var B=A.options;
for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){continue
}if(i==B.length-1){continue
}if(B[i+1].selected){continue
}down_option(A,i,1)
}}function up_option(A,C,D){var B=A.options;
var E=0;
if(C-D>=0){E=C-D
}else{for(i=0;
i<B.length;
i++){if(!B[i].selected){E=i;
break
}}}change_turn_option(A,C,E)
}function down_option(A,C,D){var B=A.options;
var E=0;
if(B.length-1-C-D>=0){E=C+D
}else{for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){E=i;
break
}}}change_turn_option(A,C,E)
}function change_turn_option(A,C,E){var B=A.options;
if(document.all){var D=document.createElement("OPTION");
D.value=B[C].value;
D.text=B[C].text;
D.selected=true;
A.remove(C);
B.add(D,E);
B[E].selected=true
}else{var D=document.createElement("OPTION");
D.value=B[C].value;
D.text=B[C].text;
D.selected=true;
A.removeChild(B[C]);
A.insertBefore(D,B[E]);
B[E].selected=true
}};