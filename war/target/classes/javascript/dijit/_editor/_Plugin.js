if(!dojo._hasResource["dijit._editor._Plugin"]){dojo._hasResource["dijit._editor._Plugin"]=true;
dojo.provide("dijit._editor._Plugin");
dojo.require("dijit._Widget");
dojo.require("dijit.Editor");
dojo.require("dijit.form.Button");
dojo.declare("dijit._editor._Plugin",null,{constructor:function(A,B){if(A){dojo.mixin(this,A)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var A=this.editor.commands[this.command];
var C="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var B={label:A,showLabel:false,iconClass:C,dropDown:this.dropDown};
this.button=new this.buttonClass(B)
}}},updateState:function(){var A=this.editor;
var B=this.command;
if(!A){return 
}if(!A.isLoaded){return 
}if(!B.length){return 
}if(this.button){try{var C=A.queryCommandEnabled(B);
this.button.setDisabled(!C);
if(this.button.setChecked){this.button.setChecked(A.queryCommandState(B))
}}catch(D){console.debug(D)
}}},setEditor:function(A){this.editor=A;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){dojo.connect(this.button,"onClick",dojo.hitch(this.editor,"execCommand",this.command,this.commandArg))
}dojo.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(A){if(this.button){A.addChild(this.button)
}}})
};