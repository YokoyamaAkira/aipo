if(!dojo._hasResource["dojox.uuid.Uuid"]){dojo._hasResource["dojox.uuid.Uuid"]=true;
dojo.provide("dojox.uuid.Uuid");
dojo.require("dojox.uuid");
dojox.uuid.Uuid=function(B){this._uuidString=dojox.uuid.NIL_UUID;
if(B){dojox.uuid.assert(dojo.isString(B));
this._uuidString=B.toLowerCase();
dojox.uuid.assert(this.isValid())
}else{var A=dojox.uuid.Uuid.getGenerator();
if(A){this._uuidString=A();
dojox.uuid.assert(this.isValid())
}}};
dojox.uuid.Uuid.compare=function(D,C){var B=D.toString();
var A=C.toString();
if(B>A){return 1
}if(B<A){return -1
}return 0
};
dojox.uuid.Uuid.setGenerator=function(A){dojox.uuid.assert(!A||dojo.isFunction(A));
dojox.uuid.Uuid._ourGenerator=A
};
dojox.uuid.Uuid.getGenerator=function(){return dojox.uuid.Uuid._ourGenerator
};
dojox.uuid.Uuid.prototype.toString=function(){return this._uuidString
};
dojox.uuid.Uuid.prototype.compare=function(A){return dojox.uuid.Uuid.compare(this,A)
};
dojox.uuid.Uuid.prototype.isEqual=function(A){return(this.compare(A)==0)
};
dojox.uuid.Uuid.prototype.isValid=function(){return dojox.uuid.isValid(this)
};
dojox.uuid.Uuid.prototype.getVariant=function(){return dojox.uuid.getVariant(this)
};
dojox.uuid.Uuid.prototype.getVersion=function(){if(!this._versionNumber){this._versionNumber=dojox.uuid.getVersion(this)
}return this._versionNumber
};
dojox.uuid.Uuid.prototype.getNode=function(){if(!this._nodeString){this._nodeString=dojox.uuid.getNode(this)
}return this._nodeString
};
dojox.uuid.Uuid.prototype.getTimestamp=function(A){if(!A){A=null
}switch(A){case"string":case String:return this.getTimestamp(Date).toUTCString();
break;
case"hex":if(!this._timestampAsHexString){this._timestampAsHexString=dojox.uuid.getTimestamp(this,"hex")
}return this._timestampAsHexString;
break;
case null:case"date":case Date:if(!this._timestampAsDate){this._timestampAsDate=dojox.uuid.getTimestamp(this,Date)
}return this._timestampAsDate;
break;
default:dojox.uuid.assert(false,"The getTimestamp() method dojox.uuid.Uuid was passed a bogus returnType: "+A);
break
}}
};