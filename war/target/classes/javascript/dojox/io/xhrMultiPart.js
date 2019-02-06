if(!dojo._hasResource["dojox.io.xhrMultiPart"]){dojo._hasResource["dojox.io.xhrMultiPart"]=true;
dojo.provide("dojox.io.xhrMultiPart");
dojo.require("dojo._base.xhr");
dojo.require("dojox.uuid.generateRandomUuid");
(function(){function A(E,D){if(!E.name&&!E.content){throw new Error("Each part of a multi-part request requires 'name' and 'content'.")
}var G=[];
G.push("--"+D,'Content-Disposition: form-data; name="'+E.name+'"'+(E.filename?'; filename="'+E.filename+'"':""));
if(E.contentType){var F="Content-Type: "+E.contentType;
if(E.charset){F+="; Charset="+E.charset
}G.push(F)
}if(E.contentTransferEncoding){G.push("Content-Transfer-Encoding: "+E.contentTransferEncoding)
}G.push("",E.content);
return G
}function C(D){return(!!(dojo.query("input[type=file]",D).length))
}function B(F,D){var E=[];
return E
}dojox.io.xhrMultiPart=function(F){if(!F.file&&!F.formNode){throw new Error("file or formNode must be provided to dojox.io.xhrMultiPart's arguments")
}var E=dojox.uuid.generateRandomUuid();
var H=[];
var D="";
if(F.file){var I=(dojo.isArray(F.file)?F.file:[F.file]);
for(var G=0;
G<I.length;
G++){H=H.concat(A(I[G],E))
}}if(F.formNode){H=H.concat(B(F.formNode,E))
}if(H.length){H.push("--"+E+"--","");
D=H.join("\r\n")
}return dojo.rawXhrPost(dojo.mixin(F,{contentType:"multipart/form-data; boundary="+E,postData:D}))
}
})()
};