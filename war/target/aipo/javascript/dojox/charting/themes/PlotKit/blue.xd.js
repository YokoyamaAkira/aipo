dojo._xdResourceLoaded({depends:[["provide","dojox.charting.themes.PlotKit.blue"],["require","dojox.charting.Theme"]],defineResource:function(A){if(!A._hasResource["dojox.charting.themes.PlotKit.blue"]){A._hasResource["dojox.charting.themes.PlotKit.blue"]=true;
A.provide("dojox.charting.themes.PlotKit.blue");
A.require("dojox.charting.Theme");
(function(){var B=dojox.charting;
B.themes.PlotKit.blue=new B.Theme({chart:{stroke:null,fill:"white"},plotarea:{stroke:null,fill:"#e7eef6"},axis:{stroke:{color:"#fff",width:2},line:{color:"#fff",width:1},majorTick:{color:"#fff",width:2,length:12},minorTick:{color:"#fff",width:1,length:8},font:"normal normal normal 8pt Tahoma",fontColor:"#999"},series:{outline:{width:1,color:"#fff"},stroke:{width:2,color:"#666"},fill:new A.Color([102,102,102,0.8]),font:"normal normal normal 7pt Tahoma",fontColor:"#000"},marker:{stroke:{width:2},fill:"#333",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},colors:[]});
B.themes.PlotKit.blue.defineColors({hue:217,saturation:60,low:40,high:88})
})()
}}});