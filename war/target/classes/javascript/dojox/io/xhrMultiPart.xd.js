dojo._xdResourceLoaded({depends:[["provide","dojox.io.xhrMultiPart"],["require","dojo._base.xhr"],["require","dojox.uuid.generateRandomUuid"]],defineResource:function(A){if(!A._hasResource["dojox.io.xhrMultiPart"]){A._hasResource["dojox.io.xhrMultiPart"]=true;
A.provide("dojox.io.xhrMultiPart");
A.require("dojo._base.xhr");
A.require("dojox.uuid.generateRandomUuid");
(function(){function D(E,H){if(!E.name&&!E.content){throw new Error("Each part of a multi-part request requires 'name' and 'content'.")
}var G=[];
G.push("--"+H,'Content-Disposition: form-data; name="'+E.name+'"'+(E.filename?'; filename="'+E.filename+'"':""));
if(E.contentType){var F="Content-Type: "+E.contentType;
if(E.charset){F+="; Charset="+E.charset
}G.push(F)
}if(E.contentTransferEncoding){G.push("Content-Transfer-Encoding: "+E.contentTransferEncoding)
}G.push("",E.content);
return G
}function C(E){return(!!(A.query("input[type=file]",E).length))
}function B(F,G){var E=[];
return E
}dojox.io.xhrMultiPart=function(J){if(!J.file&&!J.formNode){throw new Error("file or formNode must be provided to dojox.io.xhrMultiPart's arguments")
}var I=dojox.uuid.generateRandomUuid();
var F=[];
var H="";
if(J.file){var G=(A.isArray(J.file)?J.file:[J.file]);
for(var E=0;
E<G.length;
E++){F=F.concat(D(G[E],I))
}}if(J.formNode){F=F.concat(B(J.formNode,I))
}if(F.length){F.push("--"+I+"--","");
H=F.join("\r\n")
}return A.rawXhrPost(A.mixin(J,{contentType:"multipart/form-data; boundary="+I,postData:H}))
}
})()
}}});