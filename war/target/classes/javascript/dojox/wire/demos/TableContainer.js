if(!dojo._hasResource["dojox.wire.demos.TableContainer"]){dojo._hasResource["dojox.wire.demos.TableContainer"]=true;
dojo.provide("dojox.wire.demos.TableContainer");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.wire.demos.TableContainer",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<table class='tablecontainer'><tbody dojoAttachPoint='tableContainer'></tbody></table>",rowCount:0,headers:"",addRow:function(E){try{var D=document.createElement("tr");
if((this.rowCount%2)===0){dojo.addClass(D,"alternate")
}this.rowCount++;
for(var A in E){var F=document.createElement("td");
var C=document.createTextNode(E[A]);
F.appendChild(C);
D.appendChild(F)
}this.tableContainer.appendChild(D)
}catch(B){console.debug(B)
}},clearTable:function(){while(this.tableContainer.firstChild.nextSibling){this.tableContainer.removeChild(this.tableContainer.firstChild.nextSibling)
}this.rowCount=0
},postCreate:function(){var C=this.headers.split(",");
var A=document.createElement("tr");
for(i in C){var D=C[i];
var E=document.createElement("th");
var B=document.createTextNode(D);
E.appendChild(B);
A.appendChild(E)
}this.tableContainer.appendChild(A)
}})
};