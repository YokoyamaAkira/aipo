dojo.provide("aipo.facility");
aipo.facility.onLoadFacilityDialog=function(I){var H=dojo.byId("facility_name");
if(H){H.focus()
}var J=dijit.byId("facilitygroupselect");
if(J){var G=dojo.byId("init_grouplist");
var K;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(K=0;
K<L.length;
K++){J.addOptionSync(L[K].value,L[K].text,true)
}}};
aipo.facility.onLoadFacilityGroupDialog=function(I){var H=dojo.byId("facility_group_name");
if(H){H.focus()
}var J=dijit.byId("facilityselect");
if(J){var G=dojo.byId("init_facilitylist");
var K;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(K=0;
K<L.length;
K++){J.addOptionSync(L[K].value,L[K].text,true)
}}};
aipo.facility.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("facility")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.facility.sortsubmit=function(E){var D=E.member_so.options;
var F="";
for(i=0;
i<D.length;
i++){D[i].selected=false
}if(D.length>0){F=D[0].value;
for(i=1;
i<D.length;
i++){F=F+","+D[i].value
}}E.positions.value=F
};