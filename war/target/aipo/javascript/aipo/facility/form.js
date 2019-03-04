dojo.provide("aipo.facility");
aipo.facility.onLoadFacilityDialog=function(E){var F=dojo.byId("facility_name");
if(F){F.focus()
}var D=dijit.byId("facilitygroupselect");
if(D){var A=dojo.byId("init_grouplist");
var C;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(C=0;
C<B.length;
C++){D.addOptionSync(B[C].value,B[C].text,true)
}}};
aipo.facility.onLoadFacilityGroupDialog=function(E){var F=dojo.byId("facility_group_name");
if(F){F.focus()
}var D=dijit.byId("facilityselect");
if(D){var A=dojo.byId("init_facilitylist");
var C;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(C=0;
C<B.length;
C++){D.addOptionSync(B[C].value,B[C].text,true)
}}};
aipo.facility.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("facility")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.facility.sortsubmit=function(C){var A=C.member_so.options;
var B="";
for(i=0;
i<A.length;
i++){A[i].selected=false
}if(A.length>0){B=A[0].value;
for(i=1;
i<A.length;
i++){B=B+","+A[i].value
}}C.positions.value=B
};