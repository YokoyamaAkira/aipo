dojo._xdResourceLoaded({defineResource:function(A){if(!window.OpenAjax){OpenAjax=new function(){var C=true;
var G=false;
var E=window;
var F;
var B="org.openajax.hub.";
var D={};
this.hub=D;
D.implementer="http://openajax.org";
D.implVersion="0.6";
D.specVersion="0.6";
D.implExtraData={};
var F={};
D.libraries=F;
D.registerLibrary=function(K,J,I,H){F[K]={prefix:K,namespaceURI:J,version:I,extraData:H};
this.publish(B+"registerLibrary",F[K])
};
D.unregisterLibrary=function(H){this.publish(B+"unregisterLibrary",F[H]);
delete F[H]
};
D._subscriptions={c:{},s:[]};
D._cleanup=[];
D._subIndex=0;
D._pubDepth=0;
D.subscribe=function(H,O,L,K,J){if(!L){L=window
}var M=H+"."+this._subIndex;
var I={scope:L,cb:O,fcb:J,data:K,sid:this._subIndex++,hdl:M};
var N=H.split(".");
this._subscribe(this._subscriptions,N,0,I);
return M
};
D.publish=function(H,J){var K=H.split(".");
this._pubDepth++;
this._publish(this._subscriptions,K,0,H,J);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){for(var I=0;
I<this._cleanup.length;
I++){this.unsubscribe(this._cleanup[I].hdl)
}delete (this._cleanup);
this._cleanup=[]
}};
D.unsubscribe=function(I){var J=I.split(".");
var H=J.pop();
this._unsubscribe(this._subscriptions,J,0,H)
};
D._subscribe=function(H,L,I,K){var J=L[I];
if(I==L.length){H.s.push(K)
}else{if(typeof H.c=="undefined"){H.c={}
}if(typeof H.c[J]=="undefined"){H.c[J]={c:{},s:[]};
this._subscribe(H.c[J],L,I+1,K)
}else{this._subscribe(H.c[J],L,I+1,K)
}}};
D._publish=function(T,S,N,H,I){if(typeof T!="undefined"){var J;
if(N==S.length){J=T
}else{this._publish(T.c[S[N]],S,N+1,H,I);
this._publish(T.c["*"],S,N+1,H,I);
J=T.c["**"]
}if(typeof J!="undefined"){var O=J.s;
var R=O.length;
for(var L=0;
L<R;
L++){if(O[L].cb){var Q=O[L].scope;
var K=O[L].cb;
var M=O[L].fcb;
var P=O[L].data;
if(typeof K=="string"){K=Q[K]
}if(typeof M=="string"){M=Q[M]
}if((!M)||(M.call(Q,H,I,P))){K.call(Q,H,I,P)
}}}}}};
D._unsubscribe=function(P,O,K,I){if(typeof P!="undefined"){if(K<O.length){var H=P.c[O[K]];
this._unsubscribe(H,O,K+1,I);
if(H.s.length==0){for(var N in H.c){return 
}delete P.c[O[K]]
}return 
}else{var L=P.s;
var M=L.length;
for(var J=0;
J<M;
J++){if(I==L[J].sid){if(this._pubDepth>0){L[J].cb=null;
this._cleanup.push(L[J])
}else{L.splice(J,1)
}return 
}}}}};
D.reinit=function(){for(var H in OpenAjax.hub.libraries){delete OpenAjax.hub.libraries[H]
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
}}});