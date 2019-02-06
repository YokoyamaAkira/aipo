if(!dojo._hasResource["dojox.grid._grid.drag"]){dojo._hasResource["dojox.grid._grid.drag"]=true;
dojo.provide("dojox.grid._grid.drag");
(function(){var A=dojox.grid.drag={};
A.dragging=false;
A.hysteresis=2;
A.capture=function(B){if(B.setCapture){B.setCapture()
}else{document.addEventListener("mousemove",B.onmousemove,true);
document.addEventListener("mouseup",B.onmouseup,true);
document.addEventListener("click",B.onclick,true)
}};
A.release=function(B){if(B.releaseCapture){B.releaseCapture()
}else{document.removeEventListener("click",B.onclick,true);
document.removeEventListener("mouseup",B.onmouseup,true);
document.removeEventListener("mousemove",B.onmousemove,true)
}};
A.start=function(E,D,F,B,C){if(!E||A.dragging){console.debug("failed to start drag: bad input node or already dragging");
return 
}A.dragging=true;
A.elt=E;
A.events={drag:D||dojox.grid.nop,end:F||dojox.grid.nop,start:C||dojox.grid.nop,oldmove:E.onmousemove,oldup:E.onmouseup,oldclick:E.onclick};
A.positionX=(B&&("screenX" in B)?B.screenX:false);
A.positionY=(B&&("screenY" in B)?B.screenY:false);
A.started=(A.position===false);
E.onmousemove=A.mousemove;
E.onmouseup=A.mouseup;
E.onclick=A.click;
A.capture(A.elt)
};
A.end=function(){A.release(A.elt);
A.elt.onmousemove=A.events.oldmove;
A.elt.onmouseup=A.events.oldup;
A.elt.onclick=A.events.oldclick;
A.elt=null;
try{if(A.started){A.events.end()
}}finally{A.dragging=false
}};
A.calcDelta=function(B){B.deltaX=B.screenX-A.positionX;
B.deltaY=B.screenY-A.positionY
};
A.hasMoved=function(B){return Math.abs(B.deltaX)+Math.abs(B.deltaY)>A.hysteresis
};
A.mousemove=function(B){B=dojo.fixEvent(B);
dojo.stopEvent(B);
A.calcDelta(B);
if((!A.started)&&(A.hasMoved(B))){A.events.start(B);
A.started=true
}if(A.started){A.events.drag(B)
}};
A.mouseup=function(B){dojo.stopEvent(dojo.fixEvent(B));
A.end()
};
A.click=function(B){dojo.stopEvent(dojo.fixEvent(B))
}
})()
};