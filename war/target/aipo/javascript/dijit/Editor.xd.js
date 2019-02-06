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
},addPlugin:function(E,D){var C=A.isString(E)?{name:E}:E;
if(!C.setEditor){var F={args:C,plugin:null,editor:this};
A.publish("dijit.Editor.getPlugin",[F]);
if(!F.plugin){var B=A.getObject(C.name);
if(B){F.plugin=new B(C)
}}if(!F.plugin){console.debug("Cannot find plugin",E);
return 
}E=F.plugin
}if(arguments.length>1){this._plugins[D]=E
}else{this._plugins.push(E)
}E.setEditor(this);
if(A.isFunction(E.setToolbar)){E.setToolbar(this.toolbar)
}},customUndo:A.isIE,editActionInterval:3,beginEditing:function(B){if(!this._inEditing){this._inEditing=true;
this._beginEditing(B)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(A.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(F){if(this.customUndo&&(F=="undo"||F=="redo")){return this[F]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var E=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return E
}catch(G){if(A.isMoz&&/copy|cut|paste/.test(F)){var D=A.string.substitute,B={cut:"X",copy:"C",paste:"V"},C=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(D(this.commands.systemShortcutFF,[this.commands[F],D(this.commands[C?"appleKey":"ctrlKey"],[B[F]])]))
}return false
}}},queryCommandEnabled:function(B){if(this.customUndo&&(B=="undo"||B=="redo")){return B=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(F,E){this.setValue(E.text);
var B=E.bookmark;
if(!B){return 
}if(A.isIE){if(A.isArray(B)){var C=[];
A.forEach(B,function(G){C.push(dijit.range.getNode(G,this.editNode))
},this);
B=C
}}else{var D=dijit.range.create();
D.setStart(dijit.range.getNode(B.startContainer,this.editNode),B.startOffset);
D.setEnd(dijit.range.getNode(B.endContainer,this.editNode),B.endOffset);
B=D
}A.withGlobal(this.window,"moveToBookmark",dijit,[B])
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
}},_getBookmark:function(){var B=A.withGlobal(this.window,dijit.getBookmark);
if(A.isIE){if(A.isArray(B)){var C=[];
A.forEach(B,function(D){C.push(dijit.range.getIndex(D,this.editNode).o)
},this);
B=C
}}else{var C=dijit.range.getIndex(B.startContainer,this.editNode).o;
B={startContainer:C,startOffset:B.startOffset,endContainer:B.endContainer===B.startContainer?C:dijit.range.getIndex(B.endContainer,this.editNode).o,endOffset:B.endOffset}
}return B
},_beginEditing:function(B){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(C){var B=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:B,bookmark:this._getBookmark()})
},onKeyDown:function(C){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var B=C.keyCode,D=A.keys;
if(C.ctrlKey){if(B===90||B===122){A.stopEvent(C);
this.undo();
return 
}else{if(B===89||B===121){A.stopEvent(C);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(B){case D.ENTER:this.beginEditing();
break;
case D.BACKSPACE:case D.DELETE:this.beginEditing();
break;
case 88:case 86:if(C.ctrlKey&&!C.altKey&&!C.metaKey){this.endEditing();
if(C.keyCode==88){this.beginEditing("cut");
setTimeout(A.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(A.hitch(this,this.endEditing),1)
}break
}default:if(!C.ctrlKey&&!C.altKey&&!C.metaKey&&(C.keyCode<A.keys.F1||C.keyCode>A.keys.F15)){this.beginEditing();
break
}case D.ALT:this.endEditing();
break;
case D.UP_ARROW:case D.DOWN_ARROW:case D.LEFT_ARROW:case D.RIGHT_ARROW:case D.HOME:case D.END:case D.PAGE_UP:case D.PAGE_DOWN:this.endEditing(true);
break;
case D.CTRL:case D.SHIFT:case D.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
A.subscribe("dijit.Editor.getPlugin",null,function(F){if(F.plugin){return 
}var D=F.args,E;
var B=dijit._editor._Plugin;
var C=D.name;
switch(C){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":E=new B({command:C});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":E=new B({buttonClass:dijit.form.ToggleButton,command:C});
break;
case"|":E=new B({button:new dijit.ToolbarSeparator()});
break;
case"createLink":E=new dijit._editor.plugins.LinkDialog({command:C});
break;
case"foreColor":case"hiliteColor":E=new dijit._editor.plugins.TextColor({command:C});
break;
case"fontName":case"fontSize":case"formatBlock":E=new dijit._editor.plugins.FontChoice({command:C})
}F.plugin=E
})
}}});