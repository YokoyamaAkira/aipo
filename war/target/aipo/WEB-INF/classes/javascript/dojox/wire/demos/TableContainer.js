if(!dojo._hasResource["dojox.wire.demos.TableContainer"]){dojo._hasResource["dojox.wire.demos.TableContainer"]=true;
dojo.provide("dojox.wire.demos.TableContainer");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.wire.demos.TableContainer",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<table class='tablecontainer'><tbody dojoAttachPoint='tableContainer'></tbody></table>",rowCount:0,headers:"",addRow:function(F){try{var E=document.createElement("tr");
if((this.rowCount%2)===0){dojo.addClass(E,"alternate")
}this.rowCount++;
for(var B in F){var A=document.createElement("td");
var D=document.createTextNode(F[B]);
A.appendChild(D);
E.appendChild(A)
}this.tableContainer.appendChild(E)
}catch(C){console.debug(C)
}},clearTable:function(){while(this.tableContainer.firstChild.nextSibling){this.tableContainer.removeChild(this.tableContainer.firstChild.nextSibling)
}this.rowCount=0
},postCreate:function(){var D=this.headers.split(",");
var B=document.createElement("tr");
for(i in D){var E=D[i];
var A=document.createElement("th");
var C=document.createTextNode(E);
A.appendChild(C);
B.appendChild(A)
}this.tableContainer.appendChild(B)
}})
};