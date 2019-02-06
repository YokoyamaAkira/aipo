dojo._xdResourceLoaded({defineResource:function(A){if(!window.OpenAjax){OpenAjax=new function(){var D=true;
var C=false;
var F=window;
var G;
var B="org.openajax.hub.";
var E={};
this.hub=E;
E.implementer="http://openajax.org";
E.implVersion="0.6";
E.specVersion="0.6";
E.implExtraData={};
var G={};
E.libraries=G;
E.registerLibrary=function(K,J,I,H){G[K]={prefix:K,namespaceURI:J,version:I,extraData:H};
this.publish(B+"registerLibrary",G[K])
};
E.unregisterLibrary=function(H){this.publish(B+"unregisterLibrary",G[H]);
delete G[H]
};
E._subscriptions={c:{},s:[]};
E._cleanup=[];
E._subIndex=0;
E._pubDepth=0;
E.subscribe=function(I,M,O,N,L){if(!O){O=window
}var H=I+"."+this._subIndex;
var K={scope:O,cb:M,fcb:L,data:N,sid:this._subIndex++,hdl:H};
var J=I.split(".");
this._subscribe(this._subscriptions,J,0,K);
return H
};
E.publish=function(H,J){var K=H.split(".");
this._pubDepth++;
this._publish(this._subscriptions,K,0,H,J);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){for(var I=0;
I<this._cleanup.length;
I++){this.unsubscribe(this._cleanup[I].hdl)
}delete (this._cleanup);
this._cleanup=[]
}};
E.unsubscribe=function(I){var J=I.split(".");
var H=J.pop();
this._unsubscribe(this._subscriptions,J,0,H)
};
E._subscribe=function(H,L,I,K){var J=L[I];
if(I==L.length){H.s.push(K)
}else{if(typeof H.c=="undefined"){H.c={}
}if(typeof H.c[J]=="undefined"){H.c[J]={c:{},s:[]};
this._subscribe(H.c[J],L,I+1,K)
}else{this._subscribe(H.c[J],L,I+1,K)
}}};
E._publish=function(I,H,N,P,Q){if(typeof I!="undefined"){var J;
if(N==H.length){J=I
}else{this._publish(I.c[H[N]],H,N+1,P,Q);
this._publish(I.c["*"],H,N+1,P,Q);
J=I.c["**"]
}if(typeof J!="undefined"){var O=J.s;
var T=O.length;
for(var L=0;
L<T;
L++){if(O[L].cb){var S=O[L].scope;
var K=O[L].cb;
var M=O[L].fcb;
var R=O[L].data;
if(typeof K=="string"){K=S[K]
}if(typeof M=="string"){M=S[M]
}if((!M)||(M.call(S,P,Q,R))){K.call(S,P,Q,R)
}}}}}};
E._unsubscribe=function(I,H,M,K){if(typeof I!="undefined"){if(M<H.length){var J=I.c[H[M]];
this._unsubscribe(J,H,M+1,K);
if(J.s.length==0){for(var P in J.c){return 
}delete I.c[H[M]]
}return 
}else{var N=I.s;
var O=N.length;
for(var L=0;
L<O;
L++){if(K==N[L].sid){if(this._pubDepth>0){N[L].cb=null;
this._cleanup.push(N[L])
}else{N.splice(L,1)
}return 
}}}}};
E.reinit=function(){for(var H in OpenAjax.hub.libraries){delete OpenAjax.hub.libraries[H]
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