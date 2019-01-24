if(!dojo._hasResource["dijit._editor.plugins.TextColor"]){dojo._hasResource["dijit._editor.plugins.TextColor"]=true;
dojo.provide("dijit._editor.plugins.TextColor");
dojo.require("dijit._editor._Plugin");
dojo.require("dijit.ColorPalette");
dojo.declare("dijit._editor.plugins.TextColor",dijit._editor._Plugin,{buttonClass:dijit.form.DropDownButton,constructor:function(){this.dropDown=new dijit.ColorPalette();
dojo.connect(this.dropDown,"onChange",this,function(A){this.editor.execCommand(this.command,A)
})
}})
};