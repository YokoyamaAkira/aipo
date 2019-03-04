if(!dojo._hasResource["dojox.io.xhrMultiPart"]){dojo._hasResource["dojox.io.xhrMultiPart"]=true;
dojo.provide("dojox.io.xhrMultiPart");
dojo.require("dojo._base.xhr");
dojo.require("dojox.uuid.generateRandomUuid");
(function(){function B(D,G){if(!D.name&&!D.content){throw new Error("Each part of a multi-part request requires 'name' and 'content'.")
}var F=[];
F.push("--"+G,'Content-Disposition: form-data; name="'+D.name+'"'+(D.filename?'; filename="'+D.filename+'"':""));
if(D.contentType){var E="Content-Type: "+D.contentType;
if(D.charset){E+="; Charset="+D.charset
}F.push(E)
}if(D.contentTransferEncoding){F.push("Content-Transfer-Encoding: "+D.contentTransferEncoding)
}F.push("",D.content);
return F
}function A(D){return(!!(dojo.query("input[type=file]",D).length))
}function C(E,F){var D=[];
return D
}dojox.io.xhrMultiPart=function(E){if(!E.file&&!E.formNode){throw new Error("file or formNode must be provided to dojox.io.xhrMultiPart's arguments")
}var I=dojox.uuid.generateRandomUuid();
var G=[];
var D="";
if(E.file){var H=(dojo.isArray(E.file)?E.file:[E.file]);
for(var F=0;
F<H.length;
F++){G=G.concat(B(H[F],I))
}}if(E.formNode){G=G.concat(C(E.formNode,I))
}if(G.length){G.push("--"+I+"--","");
D=G.join("\r\n")
}return dojo.rawXhrPost(dojo.mixin(E,{contentType:"multipart/form-data; boundary="+I,postData:D}))
}
})()
};