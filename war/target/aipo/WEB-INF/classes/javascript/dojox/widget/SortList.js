if(!dojo._hasResource["dojox.widget.SortList"]){dojo._hasResource["dojox.widget.SortList"]=true;
dojo.provide("dojox.widget.SortList");
dojo.experimental("dojox.widget.SortList");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit._Templated");
dojo.declare("dojox.widget.SortList",[dijit.layout._LayoutWidget,dijit._Templated],{title:"",heading:"",descending:true,selected:null,sortable:true,store:"",key:"name",templateString:'<div class="sortList" id="${id}">\r\n\t\t<div class="sortListTitle" dojoAttachPoint="titleNode">\r\n\t\t<div class="sortListIcon"></div>\r\n\t\t<span dojoAttachPoint="focusNode">${title}</span>\r\n\t\t</div>\r\n\t\t<div class="sortListBodyWrapper" dojoAttachEvent="onmouseover: _set, onmouseout: _unset, onclick:_handleClick" dojoAttachPoint="bodyWrapper">\r\n\t\t<ul dojoAttachPoint="containerNode" class="sortListBody"></ul>\r\n\t</div>\r\n</div>\r\n',_addItem:function(B){var A=document.createElement("li");
var C=this.store.getValue(B,this.key);
A.innerHTML=C;
this.containerNode.appendChild(A)
},postCreate:function(){if(this.store){this.store=eval(this.store);
var props={onItem:dojo.hitch(this,"_addItem"),onComplete:dojo.hitch(this,"onSort")};
this.store.fetch(props)
}else{this.onSort()
}this.inherited("postCreate",arguments)
},startup:function(){this.inherited("startup",arguments);
if(this.heading){this.setTitle(this.heading);
this.title=this.heading
}setTimeout(dojo.hitch(this,"resize"),5);
if(this.sortable){this.connect(this.titleNode,"onclick","onSort")
}},resize:function(){this.inherited("resize",arguments);
var A=((this._contentBox.h)-(dojo.style(this.titleNode,"height")))-10;
this.bodyWrapper.style.height=Math.abs(A)+"px"
},onSort:function(C){var A=dojo.query("li",this.domNode);
if(this.sortable){this.descending=!this.descending;
dojo.addClass(this.titleNode,((this.descending)?"sortListDesc":"sortListAsc"));
dojo.removeClass(this.titleNode,((this.descending)?"sortListAsc":"sortListDesc"));
A.sort(this._sorter);
if(this.descending){A.reverse()
}}var B=0;
dojo.forEach(A,function(D){dojo[(((B++)%2)===0)?"addClass":"removeClass"](D,"sortListItemOdd");
this.containerNode.appendChild(D)
},this)
},_set:function(A){if(A.target!=this.bodyWrapper){dojo.addClass(A.target,"sortListItemHover")
}},_unset:function(A){dojo.removeClass(A.target,"sortListItemHover")
},_handleClick:function(A){dojo.toggleClass(A.target,"sortListItemSelected");
A.target.focus();
this._updateValues(A.target.innerHTML)
},_updateValues:function(){this._selected=dojo.query("li.sortListItemSelected",this.containerNode);
this.selected=[];
dojo.forEach(this._selected,function(A){this.selected.push(A.innerHTML)
},this);
this.onChanged(arguments)
},_sorter:function(C,B){var A=C.innerHTML;
var D=B.innerHTML;
if(A>D){return 1
}if(A<D){return -1
}return 0
},setTitle:function(A){this.focusNode.innerHTML=A
},onChanged:function(){}})
};