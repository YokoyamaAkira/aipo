if(!window.OpenAjax){OpenAjax=new function(){var B=true;
var F=false;
var D=window;
var E;
var A="org.openajax.hub.";
var C={};
this.hub=C;
C.implementer="http://openajax.org";
C.implVersion="0.6";
C.specVersion="0.6";
C.implExtraData={};
var E={};
C.libraries=E;
C.registerLibrary=function(J,I,H,G){E[J]={prefix:J,namespaceURI:I,version:H,extraData:G};
this.publish(A+"registerLibrary",E[J])
};
C.unregisterLibrary=function(G){this.publish(A+"unregisterLibrary",E[G]);
delete E[G]
};
C._subscriptions={c:{},s:[]};
C._cleanup=[];
C._subIndex=0;
C._pubDepth=0;
C.subscribe=function(G,N,K,J,I){if(!K){K=window
}var L=G+"."+this._subIndex;
var H={scope:K,cb:N,fcb:I,data:J,sid:this._subIndex++,hdl:L};
var M=G.split(".");
this._subscribe(this._subscriptions,M,0,H);
return L
};
C.publish=function(G,I){var J=G.split(".");
this._pubDepth++;
this._publish(this._subscriptions,J,0,G,I);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){for(var H=0;
H<this._cleanup.length;
H++){this.unsubscribe(this._cleanup[H].hdl)
}delete (this._cleanup);
this._cleanup=[]
}};
C.unsubscribe=function(H){var I=H.split(".");
var G=I.pop();
this._unsubscribe(this._subscriptions,I,0,G)
};
C._subscribe=function(G,K,H,J){var I=K[H];
if(H==K.length){G.s.push(J)
}else{if(typeof G.c=="undefined"){G.c={}
}if(typeof G.c[I]=="undefined"){G.c[I]={c:{},s:[]};
this._subscribe(G.c[I],K,H+1,J)
}else{this._subscribe(G.c[I],K,H+1,J)
}}};
C._publish=function(S,R,M,G,H){if(typeof S!="undefined"){var I;
if(M==R.length){I=S
}else{this._publish(S.c[R[M]],R,M+1,G,H);
this._publish(S.c["*"],R,M+1,G,H);
I=S.c["**"]
}if(typeof I!="undefined"){var N=I.s;
var Q=N.length;
for(var K=0;
K<Q;
K++){if(N[K].cb){var P=N[K].scope;
var J=N[K].cb;
var L=N[K].fcb;
var O=N[K].data;
if(typeof J=="string"){J=P[J]
}if(typeof L=="string"){L=P[L]
}if((!L)||(L.call(P,G,H,O))){J.call(P,G,H,O)
}}}}}};
C._unsubscribe=function(O,N,J,H){if(typeof O!="undefined"){if(J<N.length){var G=O.c[N[J]];
this._unsubscribe(G,N,J+1,H);
if(G.s.length==0){for(var M in G.c){return 
}delete O.c[N[J]]
}return 
}else{var K=O.s;
var L=K.length;
for(var I=0;
I<L;
I++){if(H==K[I].sid){if(this._pubDepth>0){K[I].cb=null;
this._cleanup.push(K[I])
}else{K.splice(I,1)
}return 
}}}}};
C.reinit=function(){for(var G in OpenAjax.hub.libraries){delete OpenAjax.hub.libraries[G]
}OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","0.6",{});
delete OpenAjax._subscriptions;
OpenAjax._subscriptions={c:{},s:[]};
delete OpenAjax._cleanup;
OpenAjax._cleanup=[];
OpenAjax._subIndex=0;
OpenAjax._pubDepth=0
}
};
OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","0.6",{})
};