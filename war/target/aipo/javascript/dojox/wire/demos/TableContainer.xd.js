dojo._xdResourceLoaded({depends:[["provide","dojox.wire.demos.TableContainer"],["require","dojo.parser"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dojox.wire.demos.TableContainer"]){A._hasResource["dojox.wire.demos.TableContainer"]=true;
A.provide("dojox.wire.demos.TableContainer");
A.require("dojo.parser");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dojox.wire.demos.TableContainer",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<table class='tablecontainer'><tbody dojoAttachPoint='tableContainer'></tbody></table>",rowCount:0,headers:"",addRow:function(G){try{var F=document.createElement("tr");
if((this.rowCount%2)===0){A.addClass(F,"alternate")
}this.rowCount++;
for(var C in G){var B=document.createElement("td");
var E=document.createTextNode(G[C]);
B.appendChild(E);
F.appendChild(B)
}this.tableContainer.appendChild(F)
}catch(D){console.debug(D)
}},clearTable:function(){while(this.tableContainer.firstChild.nextSibling){this.tableContainer.removeChild(this.tableContainer.firstChild.nextSibling)
}this.rowCount=0
},postCreate:function(){var E=this.headers.split(",");
var C=document.createElement("tr");
for(i in E){var F=E[i];
var B=document.createElement("th");
var D=document.createTextNode(F);
B.appendChild(D);
C.appendChild(B)
}this.tableContainer.appendChild(C)
}})
}}});