if(!dojo._hasResource["dojox.timing.Sequence"]){dojo._hasResource["dojox.timing.Sequence"]=true;
dojo.provide("dojox.timing.Sequence");
dojo.experimental("dojox.timing.Sequence");
dojo.declare("dojox.timing.Sequence",null,{_defsResolved:[],_goOnPause:0,_running:false,go:function(B,A){this._running=true;
var C=this;
dojo.forEach(B,function(G){if(G.repeat>1){var F=G.repeat;
for(var E=0;
E<F;
E++){G.repeat=1;
C._defsResolved.push(G)
}}else{C._defsResolved.push(G)
}});
var D=B[B.length-1];
if(A){C._defsResolved.push({func:A})
}C._defsResolved.push({func:[this.stop,this]});
this._curId=0;
this._go()
},_go:function(){if(!this._running){return 
}var D=this._defsResolved[this._curId];
this._curId+=1;
function C(F){var E=null;
if(dojo.isArray(F)){if(F.length>2){E=F[0].apply(F[1],F.slice(2))
}else{E=F[0].apply(F[1])
}}else{E=F()
}return E
}if(this._curId>=this._defsResolved.length){C(D.func);
return 
}var B=this;
if(D.pauseAfter){if(C(D.func)!==false){window.setTimeout(function(){B._go()
},D.pauseAfter)
}else{this._goOnPause=D.pauseAfter
}}else{if(D.pauseBefore){var A=function(){if(C(D.func)!==false){B._go()
}};
window.setTimeout(A,D.pauseBefore)
}else{if(C(D.func)!==false){this._go()
}}}},goOn:function(){if(this._goOnPause){var A=this;
setTimeout(function(){A._go()
},this._goOnPause);
this._goOnPause=0
}else{this._go()
}},stop:function(){this._running=false
}})
};