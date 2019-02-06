if(!dojo._hasResource["dojox.grid._grid.views"]){dojo._hasResource["dojox.grid._grid.views"]=true;
dojo.provide("dojox.grid._grid.views");
dojo.declare("dojox.grid.views",null,{constructor:function(A){this.grid=A
},defaultWidth:200,views:[],resize:function(){this.onEach("resize")
},render:function(){this.onEach("render");
this.normalizeHeaderNodeHeight()
},addView:function(A){A.idx=this.views.length;
this.views.push(A)
},destroyViews:function(){for(var A=0,B;
B=this.views[A];
A++){B.destroy()
}this.views=[]
},getContentNodes:function(){var A=[];
for(var B=0,C;
C=this.views[B];
B++){A.push(C.contentNode)
}return A
},forEach:function(C){for(var B=0,A;
A=this.views[B];
B++){C(A,B)
}},onEach:function(B,C){C=C||[];
for(var A=0,D;
D=this.views[A];
A++){if(B in D){D[B].apply(D,C)
}}},normalizeHeaderNodeHeight:function(){var B=[];
for(var A=0,C;
(C=this.views[A]);
A++){if(C.headerContentNode.firstChild){B.push(C.headerContentNode)
}}this.normalizeRowNodeHeights(B)
},normalizeRowNodeHeights:function(C){var A=0;
for(var F=0,E,D;
(E=C[F]);
F++){A=Math.max(A,(E.firstChild.clientHeight)||(E.firstChild.offsetHeight))
}A=(A>=0?A:0);
var B=A+"px";
for(var F=0,E;
(E=C[F]);
F++){if(E.firstChild.clientHeight!=A){E.firstChild.style.height=B
}}if(C&&C[0]){C[0].parentNode.offsetHeight
}},renormalizeRow:function(C){var B=[];
for(var A=0,E,D;
(E=this.views[A])&&(D=E.getRowNode(C));
A++){D.firstChild.style.height="";
B.push(D)
}this.normalizeRowNodeHeights(B)
},getViewWidth:function(A){return this.views[A].getWidth()||this.defaultWidth
},measureHeader:function(){this.forEach(function(B){B.headerContentNode.style.height=""
});
var A=0;
this.forEach(function(B){A=Math.max(B.headerNode.offsetHeight,A)
});
return A
},measureContent:function(){var A=0;
this.forEach(function(B){A=Math.max(B.domNode.offsetHeight,A)
});
return A
},findClient:function(B){var C=this.grid.elasticView||-1;
if(C<0){for(var A=1,D;
(D=this.views[A]);
A++){if(D.viewWidth){for(A=1;
(D=this.views[A]);
A++){if(!D.viewWidth){C=A;
break
}}break
}}}if(C<0){C=Math.floor(this.views.length/2)
}return C
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
},arrange:function(A,B,D,C){var D=this._arrange(A,B,D,C);
this.resize();
return D
},renderRow:function(C,B){var A=[];
for(var F=0,E,D,G;
(E=this.views[F])&&(D=B[F]);
F++){G=E.renderRow(C);
D.appendChild(G);
A.push(G)
}this.normalizeRowNodeHeights(A)
},rowRemoved:function(A){this.onEach("rowRemoved",[A])
},updateRow:function(C,B){for(var A=0,D;
D=this.views[A];
A++){D.updateRow(C,B)
}this.renormalizeRow(C)
},updateRowStyles:function(A){this.onEach("updateRowStyles",[A])
},setScrollTop:function(B){var C=B;
for(var A=0,D;
D=this.views[A];
A++){C=D.setScrollTop(B)
}return C
},getFirstScrollingView:function(){for(var A=0,B;
(B=this.views[A]);
A++){if(B.hasScrollbar()){return B
}}}})
};