dojo._xdResourceLoaded({depends:[["provide","dijit.Declaration"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.Declaration"]){A._hasResource["dijit.Declaration"]=true;
A.provide("dijit.Declaration");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var C=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var G=A.query("> script[type='dojo/method'][event='preamble']",C).orphan();
var E=A.query("> script[type^='dojo/']",C).orphan();
var F=C.nodeName;
var D=this.defaults||{};
this.mixins=this.mixins.length?A.map(this.mixins,function(H){return A.getObject(H)
}):[dijit._Widget,dijit._Templated];
if(G.length){D.preamble=A.parser._functionFromScript(G[0])
}var B=A.map(E,function(I){var H=I.getAttribute("event")||"postscript";
return{event:H,func:A.parser._functionFromScript(I)}
});
this.mixins.push(function(){A.forEach(B,function(H){A.connect(this,H.event,this,H.func)
},this)
});
D.widgetsInTemplate=true;
D._skipNodeCache=true;
D.templateString="<"+F+" class='"+C.className+"' dojoAttachPoint='"+(C.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(C.getAttribute("dojoAttachEvent")||"")+"' >"+C.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+F+">";
A.query("[dojoType]",C).forEach(function(H){H.removeAttribute("dojoType")
});
A.declare(this.widgetClass,this.mixins,D)
}})
}}});