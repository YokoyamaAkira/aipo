dojo._xdResourceLoaded({depends:[["provide","dijit.Editor"],["require","dijit._editor.RichText"],["require","dijit.Toolbar"],["require","dijit._editor._Plugin"],["require","dijit._Container"],["require","dojo.i18n"],["requireLocalization","dijit._editor","commands",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(A){if(!A._hasResource["dijit.Editor"]){A._hasResource["dijit.Editor"]=true;
A.provide("dijit.Editor");
A.require("dijit._editor.RichText");
A.require("dijit.Toolbar");
A.require("dijit._editor._Plugin");
A.require("dijit._Container");
A.require("dojo.i18n");
A.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull"];
this._plugins=[];
this._editInterval=this.editActionInterval*1000
},postCreate:function(){if(this.customUndo){A.require("dijit._editor.range");
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0)
}if(A.isArray(this.extraPlugins)){this.plugins=this.plugins.concat(this.extraPlugins)
}dijit.Editor.superclass.postCreate.apply(this,arguments);
this.commands=A.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){var B=A.doc.createElement("div");
A.place(B,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},B)
}A.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){A.forEach(this._plugins,function(B){if(B.destroy){B.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(F,E){var D=A.isString(F)?{name:F}:F;
if(!D.setEditor){var B={args:D,plugin:null,editor:this};
A.publish("dijit.Editor.getPlugin",[B]);
if(!B.plugin){var C=A.getObject(D.name);
if(C){B.plugin=new C(D)
}}if(!B.plugin){console.debug("Cannot find plugin",F);
return 
}F=B.plugin
}if(arguments.length>1){this._plugins[E]=F
}else{this._plugins.push(F)
}F.setEditor(this);
if(A.isFunction(F.setToolbar)){F.setToolbar(this.toolbar)
}},customUndo:A.isIE,editActionInterval:3,beginEditing:function(B){if(!this._inEditing){this._inEditing=true;
this._beginEditing(B)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(A.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(G){if(this.customUndo&&(G=="undo"||G=="redo")){return this[G]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var F=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return F
}catch(C){if(A.isMoz&&/copy|cut|paste/.test(G)){var E=A.string.substitute,B={cut:"X",copy:"C",paste:"V"},D=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(E(this.commands.systemShortcutFF,[this.commands[G],E(this.commands[D?"appleKey":"ctrlKey"],[B[G]])]))
}return false
}}},queryCommandEnabled:function(B){if(this.customUndo&&(B=="undo"||B=="redo")){return B=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(B,F){this.setValue(F.text);
var C=F.bookmark;
if(!C){return 
}if(A.isIE){if(A.isArray(C)){var D=[];
A.forEach(C,function(G){D.push(dijit.range.getNode(G,this.editNode))
},this);
C=D
}}else{var E=dijit.range.create();
E.setStart(dijit.range.getNode(C.startContainer,this.editNode),C.startOffset);
E.setEnd(dijit.range.getNode(C.endContainer,this.editNode),C.endOffset);
C=E
}A.withGlobal(this.window,"moveToBookmark",dijit,[C])
},undo:function(){this.endEditing(true);
var B=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(B,this._steps[this._steps.length-1]);
this._undoedSteps.push(B);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var B=this._undoedSteps.pop();
if(B&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],B);
this._steps.push(B);
this.onDisplayChanged();
return true
}return false
},endEditing:function(B){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(B);
this._inEditing=false
}},_getBookmark:function(){var C=A.withGlobal(this.window,dijit.getBookmark);
if(A.isIE){if(A.isArray(C)){var B=[];
A.forEach(C,function(D){B.push(dijit.range.getIndex(D,this.editNode).o)
},this);
C=B
}}else{var B=dijit.range.getIndex(C.startContainer,this.editNode).o;
C={startContainer:B,startOffset:C.startOffset,endContainer:C.endContainer===C.startContainer?B:dijit.range.getIndex(C.endContainer,this.editNode).o,endOffset:C.endOffset}
}return C
},_beginEditing:function(B){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(B){var C=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:C,bookmark:this._getBookmark()})
},onKeyDown:function(D){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var C=D.keyCode,B=A.keys;
if(D.ctrlKey){if(C===90||C===122){A.stopEvent(D);
this.undo();
return 
}else{if(C===89||C===121){A.stopEvent(D);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(C){case B.ENTER:this.beginEditing();
break;
case B.BACKSPACE:case B.DELETE:this.beginEditing();
break;
case 88:case 86:if(D.ctrlKey&&!D.altKey&&!D.metaKey){this.endEditing();
if(D.keyCode==88){this.beginEditing("cut");
setTimeout(A.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(A.hitch(this,this.endEditing),1)
}break
}default:if(!D.ctrlKey&&!D.altKey&&!D.metaKey&&(D.keyCode<A.keys.F1||D.keyCode>A.keys.F15)){this.beginEditing();
break
}case B.ALT:this.endEditing();
break;
case B.UP_ARROW:case B.DOWN_ARROW:case B.LEFT_ARROW:case B.RIGHT_ARROW:case B.HOME:case B.END:case B.PAGE_UP:case B.PAGE_DOWN:this.endEditing(true);
break;
case B.CTRL:case B.SHIFT:case B.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
A.subscribe("dijit.Editor.getPlugin",null,function(B){if(B.plugin){return 
}var E=B.args,F;
var C=dijit._editor._Plugin;
var D=E.name;
switch(D){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":F=new C({command:D});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":F=new C({buttonClass:dijit.form.ToggleButton,command:D});
break;
case"|":F=new C({button:new dijit.ToolbarSeparator()});
break;
case"createLink":F=new dijit._editor.plugins.LinkDialog({command:D});
break;
case"foreColor":case"hiliteColor":F=new dijit._editor.plugins.TextColor({command:D});
break;
case"fontName":case"fontSize":case"formatBlock":F=new dijit._editor.plugins.FontChoice({command:D})
}B.plugin=F
})
}}});