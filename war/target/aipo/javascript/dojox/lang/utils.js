if(!dojo._hasResource["dojox.lang.utils"]){dojo._hasResource["dojox.lang.utils"]=true;
dojo.provide("dojox.lang.utils");
(function(){var empty={},du=dojox.lang.utils;
dojo.mixin(dojox.lang.utils,{coerceType:function(target,source){switch(typeof target){case"number":return Number(eval("("+source+")"));
case"string":return String(source);
case"boolean":return Boolean(eval("("+source+")"))
}return eval("("+source+")")
},updateWithObject:function(target,source,conv){if(!source){return target
}for(var x in target){if(x in source&&!(x in empty)){var t=target[x];
if(t&&typeof t=="object"){du.updateObject(t,source[x])
}else{target[x]=conv?du.coerceType(t,source[x]):dojo.clone(source[x])
}}}return target
},updateWithPattern:function(target,source,pattern,conv){if(!source||!pattern){return target
}for(var x in pattern){if(x in source&&!(x in empty)){target[x]=conv?du.coerceType(pattern[x],source[x]):dojo.clone(source[x])
}}return target
}})
})()
};