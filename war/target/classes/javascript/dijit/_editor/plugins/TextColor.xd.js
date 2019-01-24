dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.TextColor"],["require","dijit._editor._Plugin"],["require","dijit.ColorPalette"]],defineResource:function(A){if(!A._hasResource["dijit._editor.plugins.TextColor"]){A._hasResource["dijit._editor.plugins.TextColor"]=true;
A.provide("dijit._editor.plugins.TextColor");
A.require("dijit._editor._Plugin");
A.require("dijit.ColorPalette");
A.declare("dijit._editor.plugins.TextColor",dijit._editor._Plugin,{buttonClass:dijit.form.DropDownButton,constructor:function(){this.dropDown=new dijit.ColorPalette();
A.connect(this.dropDown,"onChange",this,function(B){this.editor.execCommand(this.command,B)
})
}})
}}});