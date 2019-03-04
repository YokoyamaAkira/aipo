if(!dojo._hasResource["dojox.grid._grid.views"]){dojo._hasResource["dojox.grid._grid.views"]=true;
dojo.provide("dojox.grid._grid.views");
dojo.declare("dojox.grid.views",null,{constructor:function(A){this.grid=A
},defaultWidth:200,views:[],resize:function(){this.onEach("resize")
},render:function(){this.onEach("render");
this.normalizeHeaderNodeHeight()
},addView:function(A){A.idx=this.views.length;
this.views.push(A)
},destroyViews:function(){for(var B=0,A;
A=this.views[B];
B++){A.destroy()
}this.views=[]
},getContentNodes:function(){var B=[];
for(var C=0,A;
A=this.views[C];
C++){B.push(A.contentNode)
}return B
},forEach:function(A){for(var C=0,B;
B=this.views[C];
C++){A(B,C)
}},onEach:function(C,D){D=D||[];
for(var B=0,A;
A=this.views[B];
B++){if(C in A){A[C].apply(A,D)
}}},normalizeHeaderNodeHeight:function(){var C=[];
for(var B=0,A;
(A=this.views[B]);
B++){if(A.headerContentNode.firstChild){C.push(A.headerContentNode)
}}this.normalizeRowNodeHeights(C)
},normalizeRowNodeHeights:function(D){var B=0;
for(var A=0,F,E;
(F=D[A]);
A++){B=Math.max(B,(F.firstChild.clientHeight)||(F.firstChild.offsetHeight))
}B=(B>=0?B:0);
var C=B+"px";
for(var A=0,F;
(F=D[A]);
A++){if(F.firstChild.clientHeight!=B){F.firstChild.style.height=C
}}if(D&&D[0]){D[0].parentNode.offsetHeight
}},renormalizeRow:function(D){var C=[];
for(var B=0,A,E;
(A=this.views[B])&&(E=A.getRowNode(D));
B++){E.firstChild.style.height="";
C.push(E)
}this.normalizeRowNodeHeights(C)
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
},findClient:function(C){var D=this.grid.elasticView||-1;
if(D<0){for(var B=1,A;
(A=this.views[B]);
B++){if(A.viewWidth){for(B=1;
(A=this.views[B]);
B++){if(!A.viewWidth){D=B;
break
}}break
}}}if(D<0){D=Math.floor(this.views.length/2)
}return D
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
},arrange:function(B,C,A,D){var A=this._arrange(B,C,A,D);
this.resize();
return A
},renderRow:function(F,E){var D=[];
for(var B=0,A,G,C;
(A=this.views[B])&&(G=E[B]);
B++){C=A.renderRow(F);
G.appendChild(C);
D.push(C)
}this.normalizeRowNodeHeights(D)
},rowRemoved:function(A){this.onEach("rowRemoved",[A])
},updateRow:function(D,C){for(var B=0,A;
A=this.views[B];
B++){A.updateRow(D,C)
}this.renormalizeRow(D)
},updateRowStyles:function(A){this.onEach("updateRowStyles",[A])
},setScrollTop:function(C){var D=C;
for(var B=0,A;
A=this.views[B];
B++){D=A.setScrollTop(C)
}return D
},getFirstScrollingView:function(){for(var B=0,A;
(A=this.views[B]);
B++){if(A.hasScrollbar()){return A
}}}})
};