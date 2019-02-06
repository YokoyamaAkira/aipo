dojo._xdResourceLoaded({depends:[["provide","dijit.Declaration"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.Declaration"]){A._hasResource["dijit.Declaration"]=true;
A.provide("dijit.Declaration");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var G=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var F=A.query("> script[type='dojo/method'][event='preamble']",G).orphan();
var D=A.query("> script[type^='dojo/']",G).orphan();
var E=G.nodeName;
var C=this.defaults||{};
this.mixins=this.mixins.length?A.map(this.mixins,function(H){return A.getObject(H)
}):[dijit._Widget,dijit._Templated];
if(F.length){C.preamble=A.parser._functionFromScript(F[0])
}var B=A.map(D,function(I){var H=I.getAttribute("event")||"postscript";
return{event:H,func:A.parser._functionFromScript(I)}
});
this.mixins.push(function(){A.forEach(B,function(H){A.connect(this,H.event,this,H.func)
},this)
});
C.widgetsInTemplate=true;
C._skipNodeCache=true;
C.templateString="<"+E+" class='"+G.className+"' dojoAttachPoint='"+(G.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(G.getAttribute("dojoAttachEvent")||"")+"' >"+G.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+E+">";
A.query("[dojoType]",G).forEach(function(H){H.removeAttribute("dojoType")
});
A.declare(this.widgetClass,this.mixins,C)
}})
}}});