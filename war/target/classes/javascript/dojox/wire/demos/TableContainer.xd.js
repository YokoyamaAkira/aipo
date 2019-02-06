dojo._xdResourceLoaded({depends:[["provide","dojox.wire.demos.TableContainer"],["require","dojo.parser"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dojox.wire.demos.TableContainer"]){A._hasResource["dojox.wire.demos.TableContainer"]=true;
A.provide("dojox.wire.demos.TableContainer");
A.require("dojo.parser");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dojox.wire.demos.TableContainer",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<table class='tablecontainer'><tbody dojoAttachPoint='tableContainer'></tbody></table>",rowCount:0,headers:"",addRow:function(C){try{var G=document.createElement("tr");
if((this.rowCount%2)===0){A.addClass(G,"alternate")
}this.rowCount++;
for(var D in C){var B=document.createElement("td");
var F=document.createTextNode(C[D]);
B.appendChild(F);
G.appendChild(B)
}this.tableContainer.appendChild(G)
}catch(E){console.debug(E)
}},clearTable:function(){while(this.tableContainer.firstChild.nextSibling){this.tableContainer.removeChild(this.tableContainer.firstChild.nextSibling)
}this.rowCount=0
},postCreate:function(){var F=this.headers.split(",");
var D=document.createElement("tr");
for(i in F){var B=F[i];
var C=document.createElement("th");
var E=document.createTextNode(B);
C.appendChild(E);
D.appendChild(C)
}this.tableContainer.appendChild(D)
}})
}}});