if(!dojo._hasResource["dojox.timing.Sequence"]){dojo._hasResource["dojox.timing.Sequence"]=true;
dojo.provide("dojox.timing.Sequence");
dojo.experimental("dojox.timing.Sequence");
dojo.declare("dojox.timing.Sequence",null,{_defsResolved:[],_goOnPause:0,_running:false,go:function(A,D){this._running=true;
var B=this;
dojo.forEach(A,function(E){if(E.repeat>1){var G=E.repeat;
for(var F=0;
F<G;
F++){E.repeat=1;
B._defsResolved.push(E)
}}else{B._defsResolved.push(E)
}});
var C=A[A.length-1];
if(D){B._defsResolved.push({func:D})
}B._defsResolved.push({func:[this.stop,this]});
this._curId=0;
this._go()
},_go:function(){if(!this._running){return 
}var C=this._defsResolved[this._curId];
this._curId+=1;
function B(E){var F=null;
if(dojo.isArray(E)){if(E.length>2){F=E[0].apply(E[1],E.slice(2))
}else{F=E[0].apply(E[1])
}}else{F=E()
}return F
}if(this._curId>=this._defsResolved.length){B(C.func);
return 
}var A=this;
if(C.pauseAfter){if(B(C.func)!==false){window.setTimeout(function(){A._go()
},C.pauseAfter)
}else{this._goOnPause=C.pauseAfter
}}else{if(C.pauseBefore){var D=function(){if(B(C.func)!==false){A._go()
}};
window.setTimeout(D,C.pauseBefore)
}else{if(B(C.func)!==false){this._go()
}}}},goOn:function(){if(this._goOnPause){var A=this;
setTimeout(function(){A._go()
},this._goOnPause);
this._goOnPause=0
}else{this._go()
}},stop:function(){this._running=false
}})
};