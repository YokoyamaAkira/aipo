dojo._xdResourceLoaded({depends:[["provide","dojox.uuid.Uuid"],["require","dojox.uuid"]],defineResource:function(A){if(!A._hasResource["dojox.uuid.Uuid"]){A._hasResource["dojox.uuid.Uuid"]=true;
A.provide("dojox.uuid.Uuid");
A.require("dojox.uuid");
dojox.uuid.Uuid=function(B){this._uuidString=dojox.uuid.NIL_UUID;
if(B){dojox.uuid.assert(A.isString(B));
this._uuidString=B.toLowerCase();
dojox.uuid.assert(this.isValid())
}else{var C=dojox.uuid.Uuid.getGenerator();
if(C){this._uuidString=C();
dojox.uuid.assert(this.isValid())
}}};
dojox.uuid.Uuid.compare=function(B,E){var D=B.toString();
var C=E.toString();
if(D>C){return 1
}if(D<C){return -1
}return 0
};
dojox.uuid.Uuid.setGenerator=function(B){dojox.uuid.assert(!B||A.isFunction(B));
dojox.uuid.Uuid._ourGenerator=B
};
dojox.uuid.Uuid.getGenerator=function(){return dojox.uuid.Uuid._ourGenerator
};
dojox.uuid.Uuid.prototype.toString=function(){return this._uuidString
};
dojox.uuid.Uuid.prototype.compare=function(B){return dojox.uuid.Uuid.compare(this,B)
};
dojox.uuid.Uuid.prototype.isEqual=function(B){return(this.compare(B)==0)
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
dojox.uuid.Uuid.prototype.getTimestamp=function(B){if(!B){B=null
}switch(B){case"string":case String:return this.getTimestamp(Date).toUTCString();
break;
case"hex":if(!this._timestampAsHexString){this._timestampAsHexString=dojox.uuid.getTimestamp(this,"hex")
}return this._timestampAsHexString;
break;
case null:case"date":case Date:if(!this._timestampAsDate){this._timestampAsDate=dojox.uuid.getTimestamp(this,Date)
}return this._timestampAsDate;
break;
default:dojox.uuid.assert(false,"The getTimestamp() method dojox.uuid.Uuid was passed a bogus returnType: "+B);
break
}}
}}});