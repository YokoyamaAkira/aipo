if(!dojo._hasResource["dijit.ProgressBar"]){dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.require("dojo.fx");
dojo.require("dojo.number");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",maximum:100,places:0,indeterminate:false,templateString:'<div class="dijitProgressBar dijitProgressBarEmpty"\r\n\t><div waiRole="progressbar" tabindex="0" dojoAttachPoint="internalProgress" class="dijitProgressBarFull"\r\n\t\t><div class="dijitProgressBarTile"></div\r\n\t\t><span style="visibility:hidden">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint="label" class="dijitProgressBarLabel" id="${id}_label">&nbsp;</div\r\n\t><img dojoAttachPoint="inteterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage"\r\n\t></img\r\n></div>\r\n',_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postCreate:function(){this.inherited("postCreate",arguments);
this.inteterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath);
this.update()
},update:function(D){dojo.mixin(this,D||{});
var A=1,B;
if(this.indeterminate){B="addClass";
dijit.removeWaiState(this.internalProgress,"valuenow");
dijit.removeWaiState(this.internalProgress,"valuemin");
dijit.removeWaiState(this.internalProgress,"valuemax")
}else{B="removeClass";
if(String(this.progress).indexOf("%")!=-1){A=Math.min(parseFloat(this.progress)/100,1);
this.progress=A*this.maximum
}else{this.progress=Math.min(this.progress,this.maximum);
A=this.progress/this.maximum
}var C=this.report(A);
this.label.firstChild.nodeValue=C;
dijit.setWaiState(this.internalProgress,"describedby",this.label.id);
dijit.setWaiState(this.internalProgress,"valuenow",this.progress);
dijit.setWaiState(this.internalProgress,"valuemin",0);
dijit.setWaiState(this.internalProgress,"valuemax",this.maximum)
}dojo[B](this.domNode,"dijitProgressBarIndeterminate");
this.internalProgress.style.width=(A*100)+"%";
this.onChange()
},report:function(A){return dojo.number.format(A,{type:"percent",places:this.places,locale:this.lang})
},onChange:function(){}})
};