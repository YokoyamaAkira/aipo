dojo._xdResourceLoaded({depends:[["provide","dojo._base.json"]],defineResource:function(dojo){if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){try{return eval("("+json+")")
}catch(e){console.debug(e);
return json
}};
dojo._escapeString=function(str){return('"'+str.replace(/(["\\])/g,"\\$1")+'"').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,prettyPrint,_indentStr){_indentStr=_indentStr||"";
var nextIndent=(prettyPrint?_indentStr+dojo.toJsonIndentStr:"");
var newLine=(prettyPrint?"\n":"");
var objtype=typeof (it);
if(objtype=="undefined"){return"undefined"
}else{if((objtype=="number")||(objtype=="boolean")){return it+""
}else{if(it===null){return"null"
}}}if(dojo.isString(it)){return dojo._escapeString(it)
}if(it.nodeType&&it.cloneNode){return""
}var recurse=arguments.callee;
var newObj;
if(typeof it.__json__=="function"){newObj=it.__json__();
if(it!==newObj){return recurse(newObj,prettyPrint,nextIndent)
}}if(typeof it.json=="function"){newObj=it.json();
if(it!==newObj){return recurse(newObj,prettyPrint,nextIndent)
}}if(dojo.isArray(it)){var res=[];
for(var i=0;
i<it.length;
i++){var val=recurse(it[i],prettyPrint,nextIndent);
if(typeof (val)!="string"){val="undefined"
}res.push(newLine+nextIndent+val)
}return"["+res.join(", ")+newLine+_indentStr+"]"
}if(objtype=="function"){return null
}var output=[];
for(var key in it){var keyStr;
if(typeof (key)=="number"){keyStr='"'+key+'"'
}else{if(typeof (key)=="string"){keyStr=dojo._escapeString(key)
}else{continue
}}val=recurse(it[key],prettyPrint,nextIndent);
if(typeof (val)!="string"){continue
}output.push(newLine+nextIndent+keyStr+": "+val)
}return"{"+output.join(", ")+newLine+_indentStr+"}"
}
}}});