dojo._xdResourceLoaded({depends:[["provide","dojox.timing.Sequence"]],defineResource:function(A){if(!A._hasResource["dojox.timing.Sequence"]){A._hasResource["dojox.timing.Sequence"]=true;
A.provide("dojox.timing.Sequence");
A.experimental("dojox.timing.Sequence");
A.declare("dojox.timing.Sequence",null,{_defsResolved:[],_goOnPause:0,_running:false,go:function(D,C){this._running=true;
var E=this;
A.forEach(D,function(H){if(H.repeat>1){var G=H.repeat;
for(var F=0;
F<G;
F++){H.repeat=1;
E._defsResolved.push(H)
}}else{E._defsResolved.push(H)
}});
var B=D[D.length-1];
if(C){E._defsResolved.push({func:C})
}E._defsResolved.push({func:[this.stop,this]});
this._curId=0;
this._go()
},_go:function(){if(!this._running){return 
}var B=this._defsResolved[this._curId];
this._curId+=1;
function E(G){var F=null;
if(A.isArray(G)){if(G.length>2){F=G[0].apply(G[1],G.slice(2))
}else{F=G[0].apply(G[1])
}}else{F=G()
}return F
}if(this._curId>=this._defsResolved.length){E(B.func);
return 
}var D=this;
if(B.pauseAfter){if(E(B.func)!==false){window.setTimeout(function(){D._go()
},B.pauseAfter)
}else{this._goOnPause=B.pauseAfter
}}else{if(B.pauseBefore){var C=function(){if(E(B.func)!==false){D._go()
}};
window.setTimeout(C,B.pauseBefore)
}else{if(E(B.func)!==false){this._go()
}}}},goOn:function(){if(this._goOnPause){var B=this;
setTimeout(function(){B._go()
},this._goOnPause);
this._goOnPause=0
}else{this._go()
}},stop:function(){this._running=false
}})
}}});