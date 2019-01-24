dojo._xdResourceLoaded({depends:[["provide","dojox.widget.SortList"],["require","dijit.layout._LayoutWidget"],["require","dijit._Templated"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.widget.SortList"]){dojo._hasResource["dojox.widget.SortList"]=true;
dojo.provide("dojox.widget.SortList");
dojo.experimental("dojox.widget.SortList");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit._Templated");
dojo.declare("dojox.widget.SortList",[dijit.layout._LayoutWidget,dijit._Templated],{title:"",heading:"",descending:true,selected:null,sortable:true,store:"",key:"name",templateString:'<div class="sortList" id="${id}">\r\n\t\t<div class="sortListTitle" dojoAttachPoint="titleNode">\r\n\t\t<div class="sortListIcon"></div>\r\n\t\t<span dojoAttachPoint="focusNode">${title}</span>\r\n\t\t</div>\r\n\t\t<div class="sortListBodyWrapper" dojoAttachEvent="onmouseover: _set, onmouseout: _unset, onclick:_handleClick" dojoAttachPoint="bodyWrapper">\r\n\t\t<ul dojoAttachPoint="containerNode" class="sortListBody"></ul>\r\n\t</div>\r\n</div>\r\n',_addItem:function(item){var node=document.createElement("li");
var text=this.store.getValue(item,this.key);
node.innerHTML=text;
this.containerNode.appendChild(node)
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
var offset=((this._contentBox.h)-(dojo.style(this.titleNode,"height")))-10;
this.bodyWrapper.style.height=Math.abs(offset)+"px"
},onSort:function(e){var arr=dojo.query("li",this.domNode);
if(this.sortable){this.descending=!this.descending;
dojo.addClass(this.titleNode,((this.descending)?"sortListDesc":"sortListAsc"));
dojo.removeClass(this.titleNode,((this.descending)?"sortListAsc":"sortListDesc"));
arr.sort(this._sorter);
if(this.descending){arr.reverse()
}}var i=0;
dojo.forEach(arr,function(item){dojo[(((i++)%2)===0)?"addClass":"removeClass"](item,"sortListItemOdd");
this.containerNode.appendChild(item)
},this)
},_set:function(e){if(e.target!=this.bodyWrapper){dojo.addClass(e.target,"sortListItemHover")
}},_unset:function(e){dojo.removeClass(e.target,"sortListItemHover")
},_handleClick:function(e){dojo.toggleClass(e.target,"sortListItemSelected");
e.target.focus();
this._updateValues(e.target.innerHTML)
},_updateValues:function(){this._selected=dojo.query("li.sortListItemSelected",this.containerNode);
this.selected=[];
dojo.forEach(this._selected,function(node){this.selected.push(node.innerHTML)
},this);
this.onChanged(arguments)
},_sorter:function(a,b){var aStr=a.innerHTML;
var bStr=b.innerHTML;
if(aStr>bStr){return 1
}if(aStr<bStr){return -1
}return 0
},setTitle:function(title){this.focusNode.innerHTML=title
},onChanged:function(){}})
}}});