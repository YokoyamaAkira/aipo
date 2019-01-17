dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.views"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.grid._grid.views"]){dojo._hasResource["dojox.grid._grid.views"]=true;
dojo.provide("dojox.grid._grid.views");
dojo.declare("dojox.grid.views",null,{constructor:function(inGrid){this.grid=inGrid
},defaultWidth:200,views:[],resize:function(){this.onEach("resize")
},render:function(){this.onEach("render");
this.normalizeHeaderNodeHeight()
},addView:function(inView){inView.idx=this.views.length;
this.views.push(inView)
},destroyViews:function(){for(var i=0,v;
v=this.views[i];
i++){v.destroy()
}this.views=[]
},getContentNodes:function(){var nodes=[];
for(var i=0,v;
v=this.views[i];
i++){nodes.push(v.contentNode)
}return nodes
},forEach:function(inCallback){for(var i=0,v;
v=this.views[i];
i++){inCallback(v,i)
}},onEach:function(inMethod,inArgs){inArgs=inArgs||[];
for(var i=0,v;
v=this.views[i];
i++){if(inMethod in v){v[inMethod].apply(v,inArgs)
}}},normalizeHeaderNodeHeight:function(){var rowNodes=[];
for(var i=0,v;
(v=this.views[i]);
i++){if(v.headerContentNode.firstChild){rowNodes.push(v.headerContentNode)
}}this.normalizeRowNodeHeights(rowNodes)
},normalizeRowNodeHeights:function(inRowNodes){var h=0;
for(var i=0,n,o;
(n=inRowNodes[i]);
i++){h=Math.max(h,(n.firstChild.clientHeight)||(n.firstChild.offsetHeight))
}h=(h>=0?h:0);
var hpx=h+"px";
for(var i=0,n;
(n=inRowNodes[i]);
i++){if(n.firstChild.clientHeight!=h){n.firstChild.style.height=hpx
}}if(inRowNodes&&inRowNodes[0]){inRowNodes[0].parentNode.offsetHeight
}},renormalizeRow:function(inRowIndex){var rowNodes=[];
for(var i=0,v,n;
(v=this.views[i])&&(n=v.getRowNode(inRowIndex));
i++){n.firstChild.style.height="";
rowNodes.push(n)
}this.normalizeRowNodeHeights(rowNodes)
},getViewWidth:function(inIndex){return this.views[inIndex].getWidth()||this.defaultWidth
},measureHeader:function(){this.forEach(function(inView){inView.headerContentNode.style.height=""
});
var h=0;
this.forEach(function(inView){h=Math.max(inView.headerNode.offsetHeight,h)
});
return h
},measureContent:function(){var h=0;
this.forEach(function(inView){h=Math.max(inView.domNode.offsetHeight,h)
});
return h
},findClient:function(inAutoWidth){var c=this.grid.elasticView||-1;
if(c<0){for(var i=1,v;
(v=this.views[i]);
i++){if(v.viewWidth){for(i=1;
(v=this.views[i]);
i++){if(!v.viewWidth){c=i;
break
}}break
}}}if(c<0){c=Math.floor(this.views.length/2)
}return c
},_arrange:function(l,t,w,h){var i,v,vw,len=this.views.length;
var c=(w<=0?len:this.findClient());
var setPosition=function(v,l,t){with(v.domNode.style){left=l+"px";
top=t+"px"
}with(v.headerNode.style){left=l+"px";
top=0
}};
for(i=0;
(v=this.views[i])&&(i<c);
i++){vw=this.getViewWidth(i);
v.setSize(vw,h);
setPosition(v,l,t);
vw=v.domNode.offsetWidth;
l+=vw
}i++;
var r=w;
for(var j=len-1;
(v=this.views[j])&&(i<=j);
j--){vw=this.getViewWidth(j);
v.setSize(vw,h);
vw=v.domNode.offsetWidth;
r-=vw;
setPosition(v,r,t)
}if(c<len){v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",h);
setPosition(v,l,t)
}return l
},arrange:function(l,t,w,h){var w=this._arrange(l,t,w,h);
this.resize();
return w
},renderRow:function(inRowIndex,inNodes){var rowNodes=[];
for(var i=0,v,n,rowNode;
(v=this.views[i])&&(n=inNodes[i]);
i++){rowNode=v.renderRow(inRowIndex);
n.appendChild(rowNode);
rowNodes.push(rowNode)
}this.normalizeRowNodeHeights(rowNodes)
},rowRemoved:function(inRowIndex){this.onEach("rowRemoved",[inRowIndex])
},updateRow:function(inRowIndex,inHeight){for(var i=0,v;
v=this.views[i];
i++){v.updateRow(inRowIndex,inHeight)
}this.renormalizeRow(inRowIndex)
},updateRowStyles:function(inRowIndex){this.onEach("updateRowStyles",[inRowIndex])
},setScrollTop:function(inTop){var top=inTop;
for(var i=0,v;
v=this.views[i];
i++){top=v.setScrollTop(inTop)
}return top
},getFirstScrollingView:function(){for(var i=0,v;
(v=this.views[i]);
i++){if(v.hasScrollbar()){return v
}}}})
}}});