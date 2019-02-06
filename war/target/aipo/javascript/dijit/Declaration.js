if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var F=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var E=dojo.query("> script[type='dojo/method'][event='preamble']",F).orphan();
var C=dojo.query("> script[type^='dojo/']",F).orphan();
var D=F.nodeName;
var B=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(G){return dojo.getObject(G)
}):[dijit._Widget,dijit._Templated];
if(E.length){B.preamble=dojo.parser._functionFromScript(E[0])
}var A=dojo.map(C,function(H){var G=H.getAttribute("event")||"postscript";
return{event:G,func:dojo.parser._functionFromScript(H)}
});
this.mixins.push(function(){dojo.forEach(A,function(G){dojo.connect(this,G.event,this,G.func)
},this)
});
B.widgetsInTemplate=true;
B._skipNodeCache=true;
B.templateString="<"+D+" class='"+F.className+"' dojoAttachPoint='"+(F.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(F.getAttribute("dojoAttachEvent")||"")+"' >"+F.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+D+">";
dojo.query("[dojoType]",F).forEach(function(G){G.removeAttribute("dojoType")
});
dojo.declare(this.widgetClass,this.mixins,B)
}})
};