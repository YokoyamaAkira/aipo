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
},finishedDownloading:function(B,A){if(typeof B=="undefined"){B=true
}if(!B){this.successful=false;
this.details.push(A);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(dojo.hitch(this,function(A,C){if(A){this.error=true;
this.successful=false;
for(var B=0;
B<C.length;
B++){this.details.push(C[B])
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
}},onReplay:function(A,B){},length:function(){return this.entries.length
},haltReplay:function(B){if(!this.isReplaying){return 
}if(B){this.reasonHalted=B.toString()
}if(this.autoSave){var A=this;
this._save(function(){A.isReplaying=false;
A.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var B=this;
this._save(function(){B.isReplaying=false;
B.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var A=this.entries[0];
this.onReplay(A,this)
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
},onReplayFinished:function(){},toString:function(){var C="";
C+="[";
for(var B=0;
B<this.entries.length;
B++){C+="{";
for(var A in this.entries[B]){C+=A+': "'+this.entries[B][A]+'"';
C+=", "
}C+="}, "
}C+="]";
return C
},_save:function(D){if(!D){D=function(){}
}try{var A=this;
var B=function(E,F,G){if(E==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:F,value:G,namespace:dojox.off.STORAGE_NAMESPACE});
D()
}else{if(E==dojox.storage.SUCCESS){D()
}}};
dojox.storage.put("actionlog",this.entries,B,dojox.off.STORAGE_NAMESPACE)
}catch(C){console.debug("dojox.off.sync._save: "+C.message||C);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
D()
}},_load:function(B){var A=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!A){A=[]
}this.entries=A;
B()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
};