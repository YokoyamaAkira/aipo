if(!dojo._hasResource["dijit.Editor"]){dojo._hasResource["dijit.Editor"]=true;
dojo.provide("dijit.Editor");
dojo.require("dijit._editor.RichText");
dojo.require("dijit.Toolbar");
dojo.require("dijit._editor._Plugin");
dojo.require("dijit._Container");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit._editor","commands",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull"];
this._plugins=[];
this._editInterval=this.editActionInterval*1000
},postCreate:function(){if(this.customUndo){dojo.require("dijit._editor.range");
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0)
}if(dojo.isArray(this.extraPlugins)){this.plugins=this.plugins.concat(this.extraPlugins)
}dijit.Editor.superclass.postCreate.apply(this,arguments);
this.commands=dojo.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){var A=dojo.doc.createElement("div");
dojo.place(A,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},A)
}dojo.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){dojo.forEach(this._plugins,function(A){if(A.destroy){A.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(C,B){var A=dojo.isString(C)?{name:C}:C;
if(!A.setEditor){var D={args:A,plugin:null,editor:this};
dojo.publish("dijit.Editor.getPlugin",[D]);
if(!D.plugin){var E=dojo.getObject(A.name);
if(E){D.plugin=new E(A)
}}if(!D.plugin){console.debug("Cannot find plugin",C);
return 
}C=D.plugin
}if(arguments.length>1){this._plugins[B]=C
}else{this._plugins.push(C)
}C.setEditor(this);
if(dojo.isFunction(C.setToolbar)){C.setToolbar(this.toolbar)
}},customUndo:dojo.isIE,editActionInterval:3,beginEditing:function(A){if(!this._inEditing){this._inEditing=true;
this._beginEditing(A)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(dojo.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(D){if(this.customUndo&&(D=="undo"||D=="redo")){return this[D]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var C=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return C
}catch(E){if(dojo.isMoz&&/copy|cut|paste/.test(D)){var B=dojo.string.substitute,F={cut:"X",copy:"C",paste:"V"},A=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(B(this.commands.systemShortcutFF,[this.commands[D],B(this.commands[A?"appleKey":"ctrlKey"],[F[D]])]))
}return false
}}},queryCommandEnabled:function(A){if(this.customUndo&&(A=="undo"||A=="redo")){return A=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(D,C){this.setValue(C.text);
var E=C.bookmark;
if(!E){return 
}if(dojo.isIE){if(dojo.isArray(E)){var A=[];
dojo.forEach(E,function(F){A.push(dijit.range.getNode(F,this.editNode))
},this);
E=A
}}else{var B=dijit.range.create();
B.setStart(dijit.range.getNode(E.startContainer,this.editNode),E.startOffset);
B.setEnd(dijit.range.getNode(E.endContainer,this.editNode),E.endOffset);
E=B
}dojo.withGlobal(this.window,"moveToBookmark",dijit,[E])
},undo:function(){this.endEditing(true);
var A=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(A,this._steps[this._steps.length-1]);
this._undoedSteps.push(A);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var A=this._undoedSteps.pop();
if(A&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],A);
this._steps.push(A);
this.onDisplayChanged();
return true
}return false
},endEditing:function(A){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(A);
this._inEditing=false
}},_getBookmark:function(){var B=dojo.withGlobal(this.window,dijit.getBookmark);
if(dojo.isIE){if(dojo.isArray(B)){var A=[];
dojo.forEach(B,function(C){A.push(dijit.range.getIndex(C,this.editNode).o)
},this);
B=A
}}else{var A=dijit.range.getIndex(B.startContainer,this.editNode).o;
B={startContainer:A,startOffset:B.startOffset,endContainer:B.endContainer===B.startContainer?A:dijit.range.getIndex(B.endContainer,this.editNode).o,endOffset:B.endOffset}
}return B
},_beginEditing:function(A){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(A){var B=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:B,bookmark:this._getBookmark()})
},onKeyDown:function(A){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var C=A.keyCode,B=dojo.keys;
if(A.ctrlKey){if(C===90||C===122){dojo.stopEvent(A);
this.undo();
return 
}else{if(C===89||C===121){dojo.stopEvent(A);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(C){case B.ENTER:this.beginEditing();
break;
case B.BACKSPACE:case B.DELETE:this.beginEditing();
break;
case 88:case 86:if(A.ctrlKey&&!A.altKey&&!A.metaKey){this.endEditing();
if(A.keyCode==88){this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1)
}break
}default:if(!A.ctrlKey&&!A.altKey&&!A.metaKey&&(A.keyCode<dojo.keys.F1||A.keyCode>dojo.keys.F15)){this.beginEditing();
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
dojo.subscribe("dijit.Editor.getPlugin",null,function(D){if(D.plugin){return 
}var B=D.args,C;
var E=dijit._editor._Plugin;
var A=B.name;
switch(A){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":C=new E({command:A});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":C=new E({buttonClass:dijit.form.ToggleButton,command:A});
break;
case"|":C=new E({button:new dijit.ToolbarSeparator()});
break;
case"createLink":C=new dijit._editor.plugins.LinkDialog({command:A});
break;
case"foreColor":case"hiliteColor":C=new dijit._editor.plugins.TextColor({command:A});
break;
case"fontName":case"fontSize":case"formatBlock":C=new dijit._editor.plugins.FontChoice({command:A})
}D.plugin=C
})
};