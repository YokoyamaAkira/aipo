if(!dojo._hasResource["dojox.off.sync"]){dojo._hasResource["dojox.off.sync"]=true;
dojo.provide("dojox.off.sync");
dojo.require("dojox.storage.GearsStorageProvider");
dojo.require("dojox.off._common");
dojo.require("dojox.off.files");
dojo.mixin(dojox.off.sync,{isSyncing:false,cancelled:false,successful:true,details:[],error:false,actions:null,autoSync:true,onSync:function(A){},synchronize:function(){if(this.isSyncing||dojox.off.goingOnline||(!dojox.off.isOnline)){return 
}this.isSyncing=true;
this.successful=false;
this.details=[];
this.cancelled=false;
this.start()
},cancel:function(){if(!this.isSyncing){return 
}this.cancelled=true;
if(dojox.off.files.refreshing){dojox.off.files.abortRefresh()
}this.onSync("cancel")
},finishedDownloading:function(A,B){if(typeof A=="undefined"){A=true
}if(!A){this.successful=false;
this.details.push(B);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(dojo.hitch(this,function(C,B){if(C){this.error=true;
this.successful=false;
for(var A=0;
A<B.length;
A++){this.details.push(B[A])
}}this.upload()
}))
},upload:function(){if(this.cancelled){this.finished();
return 
}this.onSync("upload");
dojo.connect(this.actions,"onReplayFinished",this,this.download);
this.actions.replay()
},download:function(){if(this.cancelled){this.finished();
return 
}this.onSync("download")
},finished:function(){this.isSyncing=false;
this.successful=(!this.cancelled&&!this.error);
this.onSync("finished")
},_save:function(A){this.actions._save(function(){A()
})
},_load:function(A){this.actions._load(function(){A()
})
}});
dojo.declare("dojox.off.sync.ActionLog",null,{entries:[],reasonHalted:null,isReplaying:false,autoSave:true,add:function(A){if(this.isReplaying){throw"Programming error: you can not call dojox.off.sync.actions.add() while we are replaying an action log"
}this.entries.push(A);
if(this.autoSave){this._save()
}},onReplay:function(B,A){},length:function(){return this.entries.length
},haltReplay:function(A){if(!this.isReplaying){return 
}if(A){this.reasonHalted=A.toString()
}if(this.autoSave){var B=this;
this._save(function(){B.isReplaying=false;
B.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var A=this;
this._save(function(){A.isReplaying=false;
A.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var B=this.entries[0];
this.onReplay(B,this)
},clear:function(){if(this.isReplaying){return 
}this.entries=[];
if(this.autoSave){this._save()
}},replay:function(){if(this.isReplaying){return 
}this.reasonHalted=null;
if(!this.entries.length){this.onReplayFinished();
return 
}this.isReplaying=true;
var A=this.entries[0];
this.onReplay(A,this)
},onReplayFinished:function(){},toString:function(){var B="";
B+="[";
for(var A=0;
A<this.entries.length;
A++){B+="{";
for(var C in this.entries[A]){B+=C+': "'+this.entries[A][C]+'"';
B+=", "
}B+="}, "
}B+="]";
return B
},_save:function(C){if(!C){C=function(){}
}try{var D=this;
var A=function(F,G,E){if(F==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:G,value:E,namespace:dojox.off.STORAGE_NAMESPACE});
C()
}else{if(F==dojox.storage.SUCCESS){C()
}}};
dojox.storage.put("actionlog",this.entries,A,dojox.off.STORAGE_NAMESPACE)
}catch(B){console.debug("dojox.off.sync._save: "+B.message||B);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
C()
}},_load:function(A){var B=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!B){B=[]
}this.entries=B;
A()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
};