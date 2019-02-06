dojo._xdResourceLoaded({depends:[["provide","dijit._editor._Plugin"],["require","dijit._Widget"],["require","dijit.Editor"],["require","dijit.form.Button"]],defineResource:function(A){if(!A._hasResource["dijit._editor._Plugin"]){A._hasResource["dijit._editor._Plugin"]=true;
A.provide("dijit._editor._Plugin");
A.require("dijit._Widget");
A.require("dijit.Editor");
A.require("dijit.form.Button");
A.declare("dijit._editor._Plugin",null,{constructor:function(C,B){if(C){A.mixin(this,C)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var C=this.editor.commands[this.command];
var B="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var D={label:C,showLabel:false,iconClass:B,dropDown:this.dropDown};
this.button=new this.buttonClass(D)
}}},updateState:function(){var C=this.editor;
var D=this.command;
if(!C){return 
}if(!C.isLoaded){return 
}if(!D.length){return 
}if(this.button){try{var E=C.queryCommandEnabled(D);
this.button.setDisabled(!E);
if(this.button.setChecked){this.button.setChecked(C.queryCommandState(D))
}}catch(B){console.debug(B)
}}},setEditor:function(B){this.editor=B;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){A.connect(this.button,"onClick",A.hitch(this.editor,"execCommand",this.command,this.commandArg))
}A.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(B){if(this.button){B.addChild(this.button)
}}})
}}});