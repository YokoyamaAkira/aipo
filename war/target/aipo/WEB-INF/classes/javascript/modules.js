if(typeof djConfig.xDomainBasePath=="undefined"){dojo.registerModulePath("dojo","../dojo");
dojo.registerModulePath("dijit","../dijit");
dojo.registerModulePath("dojox","../dojox");
dojo.registerModulePath("aimluck","../aimluck");
dojo.registerModulePath("aipo","../aipo")
}else{djConfig.useXDomain=true;
dojo.registerModulePath("dojo",djConfig.xDomainBasePath+"/dojo");
dojo.registerModulePath("dijit",djConfig.xDomainBasePath+"/dijit");
dojo.registerModulePath("dojox",djConfig.xDomainBasePath+"/dojox");
dojo.registerModulePath("aimluck",djConfig.xDomainBasePath+"/aimluck");
dojo.registerModulePath("aipo",djConfig.xDomainBasePath+"/aipo")
};