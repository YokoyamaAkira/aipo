dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Element"]],defineResource:function(A){if(!A._hasResource["dojox.charting.Element"]){A._hasResource["dojox.charting.Element"]=true;
A.provide("dojox.charting.Element");
A.declare("dojox.charting.Element",null,{constructor:function(B){this.chart=B;
this.group=null;
this.htmlElements=[];
this.dirty=true
},createGroup:function(B){if(!B){B=this.chart.surface
}if(!this.group){this.group=B.createGroup()
}return this
},purgeGroup:function(){this.destroyHtmlElements();
if(this.group){this.group.clear();
this.group.removeShape();
this.group=null
}this.dirty=true;
return this
},cleanGroup:function(B){this.destroyHtmlElements();
if(!B){B=this.chart.surface
}if(this.group){this.group.clear()
}else{this.group=B.createGroup()
}this.dirty=true;
return this
},destroyHtmlElements:function(){A.forEach(this.htmlElements,A._destroyElement);
this.htmlElements=[]
},destroy:function(){this.purgeGroup()
}})
}}});