if(!window.OpenAjax){OpenAjax=new function(){var A=true;
var E=false;
var C=window;
var D;
var F="org.openajax.hub.";
var B={};
this.hub=B;
B.implementer="http://openajax.org";
B.implVersion="0.6";
B.specVersion="0.6";
B.implExtraData={};
var D={};
B.libraries=D;
B.registerLibrary=function(G,J,I,H){D[G]={prefix:G,namespaceURI:J,version:I,extraData:H};
this.publish(F+"registerLibrary",D[G])
};
B.unregisterLibrary=function(G){this.publish(F+"unregisterLibrary",D[G]);
delete D[G]
};
B._subscriptions={c:{},s:[]};
B._cleanup=[];
B._subIndex=0;
B._pubDepth=0;
B.subscribe=function(H,L,N,M,K){if(!N){N=window
}var G=H+"."+this._subIndex;
var J={scope:N,cb:L,fcb:K,data:M,sid:this._subIndex++,hdl:G};
var I=H.split(".");
this._subscribe(this._subscriptions,I,0,J);
return G
};
B.publish=function(H,J){var G=H.split(".");
this._pubDepth++;
this._publish(this._subscriptions,G,0,H,J);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){for(var I=0;
I<this._cleanup.length;
I++){this.unsubscribe(this._cleanup[I].hdl)
}delete (this._cleanup);
this._cleanup=[]
}};
B.unsubscribe=function(I){var G=I.split(".");
var H=G.pop();
this._unsubscribe(this._subscriptions,G,0,H)
};
B._subscribe=function(H,G,I,K){var J=G[I];
if(I==G.length){H.s.push(K)
}else{if(typeof H.c=="undefined"){H.c={}
}if(typeof H.c[J]=="undefined"){H.c[J]={c:{},s:[]};
this._subscribe(H.c[J],G,I+1,K)
}else{this._subscribe(H.c[J],G,I+1,K)
}}};
B._publish=function(M,J,Q,I,K){if(typeof M!="undefined"){var L;
if(Q==J.length){L=M
}else{this._publish(M.c[J[Q]],J,Q+1,I,K);
this._publish(M.c["*"],J,Q+1,I,K);
L=M.c["**"]
}if(typeof L!="undefined"){var R=L.s;
var H=R.length;
for(var O=0;
O<H;
O++){if(R[O].cb){var G=R[O].scope;
var N=R[O].cb;
var P=R[O].fcb;
var S=R[O].data;
if(typeof N=="string"){N=G[N]
}if(typeof P=="string"){P=G[P]
}if((!P)||(P.call(G,I,K,S))){N.call(G,I,K,S)
}}}}}};
B._unsubscribe=function(J,I,N,L){if(typeof J!="undefined"){if(N<I.length){var K=J.c[I[N]];
this._unsubscribe(K,I,N+1,L);
if(K.s.length==0){for(var H in K.c){return 
}delete J.c[I[N]]
}return 
}else{var O=J.s;
var G=O.length;
for(var M=0;
M<G;
M++){if(L==O[M].sid){if(this._pubDepth>0){O[M].cb=null;
this._cleanup.push(O[M])
}else{O.splice(M,1)
}return 
}}}}};
B.reinit=function(){for(var G in OpenAjax.hub.libraries){delete OpenAjax.hub.libraries[G]
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