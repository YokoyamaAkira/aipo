dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.drag"]],defineResource:function(A){if(!A._hasResource["dojox.grid._grid.drag"]){A._hasResource["dojox.grid._grid.drag"]=true;
A.provide("dojox.grid._grid.drag");
(function(){var B=dojox.grid.drag={};
B.dragging=false;
B.hysteresis=2;
B.capture=function(C){if(C.setCapture){C.setCapture()
}else{document.addEventListener("mousemove",C.onmousemove,true);
document.addEventListener("mouseup",C.onmouseup,true);
document.addEventListener("click",C.onclick,true)
}};
B.release=function(C){if(C.releaseCapture){C.releaseCapture()
}else{document.removeEventListener("click",C.onclick,true);
document.removeEventListener("mouseup",C.onmouseup,true);
document.removeEventListener("mousemove",C.onmousemove,true)
}};
B.start=function(F,E,G,C,D){if(!F||B.dragging){console.debug("failed to start drag: bad input node or already dragging");
return 
}B.dragging=true;
B.elt=F;
B.events={drag:E||dojox.grid.nop,end:G||dojox.grid.nop,start:D||dojox.grid.nop,oldmove:F.onmousemove,oldup:F.onmouseup,oldclick:F.onclick};
B.positionX=(C&&("screenX" in C)?C.screenX:false);
B.positionY=(C&&("screenY" in C)?C.screenY:false);
B.started=(B.position===false);
F.onmousemove=B.mousemove;
F.onmouseup=B.mouseup;
F.onclick=B.click;
B.capture(B.elt)
};
B.end=function(){B.release(B.elt);
B.elt.onmousemove=B.events.oldmove;
B.elt.onmouseup=B.events.oldup;
B.elt.onclick=B.events.oldclick;
B.elt=null;
try{if(B.started){B.events.end()
}}finally{B.dragging=false
}};
B.calcDelta=function(C){C.deltaX=C.screenX-B.positionX;
C.deltaY=C.screenY-B.positionY
};
B.hasMoved=function(C){return Math.abs(C.deltaX)+Math.abs(C.deltaY)>B.hysteresis
};
B.mousemove=function(C){C=A.fixEvent(C);
A.stopEvent(C);
B.calcDelta(C);
if((!B.started)&&(B.hasMoved(C))){B.events.start(C);
B.started=true
}if(B.started){B.events.drag(C)
}};
B.mouseup=function(C){A.stopEvent(A.fixEvent(C));
B.end()
};
B.click=function(C){A.stopEvent(A.fixEvent(C))
}
})()
}}});