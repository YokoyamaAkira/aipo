if(!dojo._hasResource["dojox.charting.Element"]){dojo._hasResource["dojox.charting.Element"]=true;
dojo.provide("dojox.charting.Element");
dojo.declare("dojox.charting.Element",null,{constructor:function(A){this.chart=A;
this.group=null;
this.htmlElements=[];
this.dirty=true
},createGroup:function(A){if(!A){A=this.chart.surface
}if(!this.group){this.group=A.createGroup()
}return this
},purgeGroup:function(){this.destroyHtmlElements();
if(this.group){this.group.clear();
this.group.removeShape();
this.group=null
}this.dirty=true;
return this
},cleanGroup:function(A){this.destroyHtmlElements();
if(!A){A=this.chart.surface
}if(this.group){this.group.clear()
}else{this.group=A.createGroup()
}this.dirty=true;
return this
},destroyHtmlElements:function(){dojo.forEach(this.htmlElements,dojo._destroyElement);
this.htmlElements=[]
},destroy:function(){this.purgeGroup()
}})
};