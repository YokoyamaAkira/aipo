dojo._xdResourceLoaded({depends:[["provide","dojox.io.xhrMultiPart"],["require","dojo._base.xhr"],["require","dojox.uuid.generateRandomUuid"]],defineResource:function(A){if(!A._hasResource["dojox.io.xhrMultiPart"]){A._hasResource["dojox.io.xhrMultiPart"]=true;
A.provide("dojox.io.xhrMultiPart");
A.require("dojo._base.xhr");
A.require("dojox.uuid.generateRandomUuid");
(function(){function C(E,H){if(!E.name&&!E.content){throw new Error("Each part of a multi-part request requires 'name' and 'content'.")
}var G=[];
G.push("--"+H,'Content-Disposition: form-data; name="'+E.name+'"'+(E.filename?'; filename="'+E.filename+'"':""));
if(E.contentType){var F="Content-Type: "+E.contentType;
if(E.charset){F+="; Charset="+E.charset
}G.push(F)
}if(E.contentTransferEncoding){G.push("Content-Transfer-Encoding: "+E.contentTransferEncoding)
}G.push("",E.content);
return G
}function B(E){return(!!(A.query("input[type=file]",E).length))
}function D(F,G){var E=[];
return E
}dojox.io.xhrMultiPart=function(F){if(!F.file&&!F.formNode){throw new Error("file or formNode must be provided to dojox.io.xhrMultiPart's arguments")
}var J=dojox.uuid.generateRandomUuid();
var H=[];
var E="";
if(F.file){var I=(A.isArray(F.file)?F.file:[F.file]);
for(var G=0;
G<I.length;
G++){H=H.concat(C(I[G],J))
}}if(F.formNode){H=H.concat(D(F.formNode,J))
}if(H.length){H.push("--"+J+"--","");
E=H.join("\r\n")
}return A.rawXhrPost(A.mixin(F,{contentType:"multipart/form-data; boundary="+J,postData:E}))
}
})()
}}});