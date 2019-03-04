dojo._xdResourceLoaded({depends:[["provide","dojox.timing.Sequence"]],defineResource:function(A){if(!A._hasResource["dojox.timing.Sequence"]){A._hasResource["dojox.timing.Sequence"]=true;
A.provide("dojox.timing.Sequence");
A.experimental("dojox.timing.Sequence");
A.declare("dojox.timing.Sequence",null,{_defsResolved:[],_goOnPause:0,_running:false,go:function(C,B){this._running=true;
var D=this;
A.forEach(C,function(H){if(H.repeat>1){var G=H.repeat;
for(var F=0;
F<G;
F++){H.repeat=1;
D._defsResolved.push(H)
}}else{D._defsResolved.push(H)
}});
var E=C[C.length-1];
if(B){D._defsResolved.push({func:B})
}D._defsResolved.push({func:[this.stop,this]});
this._curId=0;
this._go()
},_go:function(){if(!this._running){return 
}var E=this._defsResolved[this._curId];
this._curId+=1;
function D(G){var F=null;
if(A.isArray(G)){if(G.length>2){F=G[0].apply(G[1],G.slice(2))
}else{F=G[0].apply(G[1])
}}else{F=G()
}return F
}if(this._curId>=this._defsResolved.length){D(E.func);
return 
}var C=this;
if(E.pauseAfter){if(D(E.func)!==false){window.setTimeout(function(){C._go()
},E.pauseAfter)
}else{this._goOnPause=E.pauseAfter
}}else{if(E.pauseBefore){var B=function(){if(D(E.func)!==false){C._go()
}};
window.setTimeout(B,E.pauseBefore)
}else{if(D(E.func)!==false){this._go()
}}}},goOn:function(){if(this._goOnPause){var B=this;
setTimeout(function(){B._go()
},this._goOnPause);
this._goOnPause=0
}else{this._go()
}},stop:function(){this._running=false
}})
}}});