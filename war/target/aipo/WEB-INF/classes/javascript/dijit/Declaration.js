if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var E=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var D=dojo.query("> script[type='dojo/method'][event='preamble']",E).orphan();
var B=dojo.query("> script[type^='dojo/']",E).orphan();
var C=E.nodeName;
var A=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(G){return dojo.getObject(G)
}):[dijit._Widget,dijit._Templated];
if(D.length){A.preamble=dojo.parser._functionFromScript(D[0])
}var F=dojo.map(B,function(G){var H=G.getAttribute("event")||"postscript";
return{event:H,func:dojo.parser._functionFromScript(G)}
});
this.mixins.push(function(){dojo.forEach(F,function(G){dojo.connect(this,G.event,this,G.func)
},this)
});
A.widgetsInTemplate=true;
A._skipNodeCache=true;
A.templateString="<"+C+" class='"+E.className+"' dojoAttachPoint='"+(E.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(E.getAttribute("dojoAttachEvent")||"")+"' >"+E.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+C+">";
dojo.query("[dojoType]",E).forEach(function(G){G.removeAttribute("dojoType")
});
dojo.declare(this.widgetClass,this.mixins,A)
}})
};