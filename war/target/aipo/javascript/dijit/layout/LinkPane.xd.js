dojo._xdResourceLoaded({depends:[["provide","dijit.layout.LinkPane"],["require","dijit.layout.ContentPane"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.layout.LinkPane"]){A._hasResource["dijit.layout.LinkPane"]=true;
A.provide("dijit.layout.LinkPane");
A.require("dijit.layout.ContentPane");
A.require("dijit._Templated");
A.declare("dijit.layout.LinkPane",[dijit.layout.ContentPane,dijit._Templated],{templateString:'<div class="dijitLinkPane"></div>',postCreate:function(){if(this.srcNodeRef){this.title+=this.srcNodeRef.innerHTML
}this.inherited("postCreate",arguments)
}})
}}});