if(!dojo._hasResource["dijit._editor._Plugin"]){dojo._hasResource["dijit._editor._Plugin"]=true;
dojo.provide("dijit._editor._Plugin");
dojo.require("dijit._Widget");
dojo.require("dijit.Editor");
dojo.require("dijit.form.Button");
dojo.declare("dijit._editor._Plugin",null,{constructor:function(B,A){if(B){dojo.mixin(this,B)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var C=this.editor.commands[this.command];
var B="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var A={label:C,showLabel:false,iconClass:B,dropDown:this.dropDown};
this.button=new this.buttonClass(A)
}}},updateState:function(){var D=this.editor;
var A=this.command;
if(!D){return 
}if(!D.isLoaded){return 
}if(!A.length){return 
}if(this.button){try{var B=D.queryCommandEnabled(A);
this.button.setDisabled(!B);
if(this.button.setChecked){this.button.setChecked(D.queryCommandState(A))
}}catch(C){console.debug(C)
}}},setEditor:function(A){this.editor=A;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){dojo.connect(this.button,"onClick",dojo.hitch(this.editor,"execCommand",this.command,this.commandArg))
}dojo.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(A){if(this.button){A.addChild(this.button)
}}})
};