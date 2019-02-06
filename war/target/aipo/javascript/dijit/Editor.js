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
},addPlugin:function(D,C){var B=dojo.isString(D)?{name:D}:D;
if(!B.setEditor){var E={args:B,plugin:null,editor:this};
dojo.publish("dijit.Editor.getPlugin",[E]);
if(!E.plugin){var A=dojo.getObject(B.name);
if(A){E.plugin=new A(B)
}}if(!E.plugin){console.debug("Cannot find plugin",D);
return 
}D=E.plugin
}if(arguments.length>1){this._plugins[C]=D
}else{this._plugins.push(D)
}D.setEditor(this);
if(dojo.isFunction(D.setToolbar)){D.setToolbar(this.toolbar)
}},customUndo:dojo.isIE,editActionInterval:3,beginEditing:function(A){if(!this._inEditing){this._inEditing=true;
this._beginEditing(A)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(dojo.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(E){if(this.customUndo&&(E=="undo"||E=="redo")){return this[E]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var D=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return D
}catch(F){if(dojo.isMoz&&/copy|cut|paste/.test(E)){var C=dojo.string.substitute,A={cut:"X",copy:"C",paste:"V"},B=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(C(this.commands.systemShortcutFF,[this.commands[E],C(this.commands[B?"appleKey":"ctrlKey"],[A[E]])]))
}return false
}}},queryCommandEnabled:function(A){if(this.customUndo&&(A=="undo"||A=="redo")){return A=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(E,D){this.setValue(D.text);
var A=D.bookmark;
if(!A){return 
}if(dojo.isIE){if(dojo.isArray(A)){var B=[];
dojo.forEach(A,function(F){B.push(dijit.range.getNode(F,this.editNode))
},this);
A=B
}}else{var C=dijit.range.create();
C.setStart(dijit.range.getNode(A.startContainer,this.editNode),A.startOffset);
C.setEnd(dijit.range.getNode(A.endContainer,this.editNode),A.endOffset);
A=C
}dojo.withGlobal(this.window,"moveToBookmark",dijit,[A])
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
}},_getBookmark:function(){var A=dojo.withGlobal(this.window,dijit.getBookmark);
if(dojo.isIE){if(dojo.isArray(A)){var B=[];
dojo.forEach(A,function(C){B.push(dijit.range.getIndex(C,this.editNode).o)
},this);
A=B
}}else{var B=dijit.range.getIndex(A.startContainer,this.editNode).o;
A={startContainer:B,startOffset:A.startOffset,endContainer:A.endContainer===A.startContainer?B:dijit.range.getIndex(A.endContainer,this.editNode).o,endOffset:A.endOffset}
}return A
},_beginEditing:function(A){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(B){var A=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:A,bookmark:this._getBookmark()})
},onKeyDown:function(B){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var A=B.keyCode,C=dojo.keys;
if(B.ctrlKey){if(A===90||A===122){dojo.stopEvent(B);
this.undo();
return 
}else{if(A===89||A===121){dojo.stopEvent(B);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(A){case C.ENTER:this.beginEditing();
break;
case C.BACKSPACE:case C.DELETE:this.beginEditing();
break;
case 88:case 86:if(B.ctrlKey&&!B.altKey&&!B.metaKey){this.endEditing();
if(B.keyCode==88){this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1)
}break
}default:if(!B.ctrlKey&&!B.altKey&&!B.metaKey&&(B.keyCode<dojo.keys.F1||B.keyCode>dojo.keys.F15)){this.beginEditing();
break
}case C.ALT:this.endEditing();
break;
case C.UP_ARROW:case C.DOWN_ARROW:case C.LEFT_ARROW:case C.RIGHT_ARROW:case C.HOME:case C.END:case C.PAGE_UP:case C.PAGE_DOWN:this.endEditing(true);
break;
case C.CTRL:case C.SHIFT:case C.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
dojo.subscribe("dijit.Editor.getPlugin",null,function(E){if(E.plugin){return 
}var C=E.args,D;
var A=dijit._editor._Plugin;
var B=C.name;
switch(B){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":D=new A({command:B});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":D=new A({buttonClass:dijit.form.ToggleButton,command:B});
break;
case"|":D=new A({button:new dijit.ToolbarSeparator()});
break;
case"createLink":D=new dijit._editor.plugins.LinkDialog({command:B});
break;
case"foreColor":case"hiliteColor":D=new dijit._editor.plugins.TextColor({command:B});
break;
case"fontName":case"fontSize":case"formatBlock":D=new dijit._editor.plugins.FontChoice({command:B})
}E.plugin=D
})
};