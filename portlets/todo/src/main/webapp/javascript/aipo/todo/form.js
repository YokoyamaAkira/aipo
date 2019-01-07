/*
 * Aipo is a groupware program developed by Aimluck,Inc.
 * Copyright (C) 2004-2011 Aimluck,Inc.
 * http://www.aipo.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

dojo.provide("aipo.todo");

dojo.require("aipo.widget.DropdownDatepicker");

aipo.todo.onLoadTodoDialog = function(portlet_id){
  var url_userlist = dojo.byId('urlUserlist'+portlet_id).value;
  var login_user_id = dojo.byId('loginUser'+portlet_id).value;
  var todo_user_id = dojo.byId('todoUser'+portlet_id).value;

  if(todo_user_id == 0) {
      todo_user_id = login_user_id;
  }
  if(url_userlist){
      aipo.todo.changeGroup(url_userlist, 'LoginUser', todo_user_id);
  }

  var obj = dojo.byId("todo_name");
  if(obj){
     obj.focus();
  }
}

aipo.todo.onLoadCategoryDialog = function(portlet_id){

  var obj = dojo.byId("category_name");
  if(obj){
     obj.focus();
  }
}

aipo.todo.formSwitchCategoryInput = function(button) {
    if(button.form.is_new_category.value == 'TRUE' || button.form.is_new_category.value == 'true') {
        button.value = aimluck.io.escapeText("todo_val_switch1");
        aipo.todo.formCategoryInputOff(button.form);
    } else {
        button.value = aimluck.io.escapeText("todo_val_switch2");
        aipo.todo.formCategoryInputOn(button.form);
    }
}

aipo.todo.formCategoryInputOn = function(form) {
    dojo.byId('todoCategorySelectField').style.display = "none";
    dojo.byId('todoCategoryInputField').style.display = "";

    form.is_new_category.value = 'TRUE';
}

aipo.todo.formCategoryInputOff = function(form) {
    dojo.byId('todoCategoryInputField').style.display = "none";
    dojo.byId('todoCategorySelectField').style.display = "";

    form.is_new_category.value = 'FALSE';
}

aipo.todo.changeGroup = function(link, group, sel) {
    aimluck.utils.form.createSelect("user_id", "destuserDiv", link + "?mode=group&groupname=" + group + "&inc_luser=true", "userId", "aliasName", sel, '', 'class="w49"');
}

aipo.todo.onReceiveMessage = function(msg){
    if(!msg) {
        var arrDialog = dijit.byId("modalDialog");
        if(arrDialog){
            arrDialog.hide();
        }
        aipo.portletReload('todo');
        aipo.portletReload('schedule');
        aipo.portletReload('timeline');
    }
    if (dojo.byId('messageDiv')) {
        dojo.byId('messageDiv').innerHTML = msg;
    }

}

aipo.todo.onListReceiveMessage = function(msg){
    if(!msg) {
        var arrDialog = dijit.byId("modalDialog");
        if(arrDialog){
            arrDialog.hide();
        }
        aipo.portletReload('todo');
        aipo.portletReload('schedule');
    }
    if (dojo.byId('listmessageDiv')) {
        dojo.byId('listmessageDiv').innerHTML = msg;
    }
}

aipo.todo.doKeywordSearch = function(baseuri, portlet_id) {
    var params = new Array(2);
    params[0] = ["template", "ToDoListScreen"];
    params[1] = ["keyword", dojo.byId("q"+portlet_id).value];
    aipo.viewPage(baseuri, portlet_id, params);
}


