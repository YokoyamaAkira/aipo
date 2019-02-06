dojo._xdResourceLoaded({depends:[["provide","dojox.off.sync"],["require","dojox.storage.GearsStorageProvider"],["require","dojox.off._common"],["require","dojox.off.files"]],defineResource:function(A){if(!A._hasResource["dojox.off.sync"]){A._hasResource["dojox.off.sync"]=true;
A.provide("dojox.off.sync");
A.require("dojox.storage.GearsStorageProvider");
A.require("dojox.off._common");
A.require("dojox.off.files");
A.mixin(dojox.off.sync,{isSyncing:false,cancelled:false,successful:true,details:[],error:false,actions:null,autoSync:true,onSync:function(B){},synchronize:function(){if(this.isSyncing||dojox.off.goingOnline||(!dojox.off.isOnline)){return 
}this.isSyncing=true;
this.successful=false;
this.details=[];
this.cancelled=false;
this.start()
},cancel:function(){if(!this.isSyncing){return 
}this.cancelled=true;
if(dojox.off.files.refreshing){dojox.off.files.abortRefresh()
}this.onSync("cancel")
},finishedDownloading:function(B,C){if(typeof B=="undefined"){B=true
}if(!B){this.successful=false;
this.details.push(C);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(A.hitch(this,function(C,B){if(C){this.error=true;
this.successful=false;
for(var D=0;
D<B.length;
D++){this.details.push(B[D])
}}this.upload()
}))
},upload:function(){if(this.cancelled){this.finished();
return 
}this.onSync("upload");
A.connect(this.actions,"onReplayFinished",this,this.download);
this.actions.replay()
},download:function(){if(this.cancelled){this.finished();
return 
}this.onSync("download")
},finished:function(){this.isSyncing=false;
this.successful=(!this.cancelled&&!this.error);
this.onSync("finished")
},_save:function(B){this.actions._save(function(){B()
})
},_load:function(B){this.actions._load(function(){B()
})
}});
A.declare("dojox.off.sync.ActionLog",null,{entries:[],reasonHalted:null,isReplaying:false,autoSave:true,add:function(B){if(this.isReplaying){throw"Programming error: you can not call dojox.off.sync.actions.add() while we are replaying an action log"
}this.entries.push(B);
if(this.autoSave){this._save()
}},onReplay:function(C,B){},length:function(){return this.entries.length
},haltReplay:function(B){if(!this.isReplaying){return 
}if(B){this.reasonHalted=B.toString()
}if(this.autoSave){var C=this;
this._save(function(){C.isReplaying=false;
C.onReplayFinished()
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
}}var C=this.entries[0];
this.onReplay(C,this)
},clear:function(){if(this.isReplaying){return 
}this.entries=[];
if(this.autoSave){this._save()
}},replay:function(){if(this.isReplaying){return 
}this.reasonHalted=null;
if(!this.entries.length){this.onReplayFinished();
return 
}this.isReplaying=true;
var B=this.entries[0];
this.onReplay(B,this)
},onReplayFinished:function(){},toString:function(){var B="";
B+="[";
for(var D=0;
D<this.entries.length;
D++){B+="{";
for(var C in this.entries[D]){B+=C+': "'+this.entries[D][C]+'"';
B+=", "
}B+="}, "
}B+="]";
return B
},_save:function(B){if(!B){B=function(){}
}try{var C=this;
var D=function(F,G,H){if(F==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:G,value:H,namespace:dojox.off.STORAGE_NAMESPACE});
B()
}else{if(F==dojox.storage.SUCCESS){B()
}}};
dojox.storage.put("actionlog",this.entries,D,dojox.off.STORAGE_NAMESPACE)
}catch(E){console.debug("dojox.off.sync._save: "+E.message||E);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
B()
}},_load:function(B){var C=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!C){C=[]
}this.entries=C;
B()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
}}});