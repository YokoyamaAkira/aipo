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

dojo.require("aipo.widget.MemberNormalSelectList");

dojo.provide("aipo.cabinet");

aipo.cabinet.onLoadCabinetFileDialog = function(pid){

    var obj = dojo.byId("file_title");
    if(obj){
        obj.focus();
    }

}

aipo.cabinet.onLoadCabinetFolderDialog = function(pid){

    var obj = dojo.byId("folder_name");
    if(obj){
        obj.focus();
    }

    var mpicker = dijit.byId("membernormalselect");
    if(mpicker){
      var select = dojo.byId('init_memberlist');
      var i;
      var s_o = select.options;
      if (s_o.length == 1 && s_o[0].value == "") return;
      for(i = 0 ; i < s_o.length; i ++ ) {
        mpicker.addOptionSync(s_o[i].value,s_o[i].text,true);
      }
    }

}

aipo.cabinet.onReceiveMessage = function(msg){
    //送信時に作成した場合selectを削除。
	var select=dojo.byId("attachments_select");
	if(typeof select!="undefined"&& select!=null)
		select.parentNode.removeChild(select);

	if(!msg) {
        var arrDialog = dijit.byId("modalDialog");
        if(arrDialog){
            arrDialog.hide();
        }
        aipo.portletReload('cabinet');
        aipo.portletReload('schedule');
        aipo.portletReload('timeline');
    }
    if (dojo.byId('messageDiv')) {
        dojo.byId('messageDiv').innerHTML = msg;
    }
}

aipo.cabinet.onListReceiveMessage = function(msg){
    if(!msg) {
        var arrDialog = dijit.byId("modalDialog");
        if(arrDialog){
            arrDialog.hide();
        }
        aipo.portletReload('cabinet');
    }
    if (dojo.byId('listmessageDiv')) {
        dojo.byId('listmessageDiv').innerHTML = msg;
    }
}

aipo.cabinet.onSubmitSerchButton = function(form,url,p_id){
     var exec_url = url;
     var search_params = [["sword",form.sword.value]];
     aipo.viewPage(exec_url, p_id, search_params);
}

aipo.cabinet.viewpageByFolderId = function(url,p_id,f_id){
    url = url + '&folder_id=' + f_id;
    aipo.viewPage(url, p_id);
}

aipo.cabinet.ajaxDeleteSubmit = function(button, url, indicator_id, portlet_id, receive) {
  if(confirm('この'+button.form._name.value+'を削除してよろしいですか？なお、フォルダに含まれるファイルやフォルダはすべて削除されます。')) {
    aimluck.io.disableForm(button.form, true);
    aimluck.io.setHiddenValue(button);
    button.form.action = url;
    aimluck.io.submit(button.form, indicator_id, portlet_id, receive);
  }
}

aipo.cabinet.showMember = function(button) {
  dojo.byId('Block-GroupMember-Show').style.display="";
  dojo.byId('is_member').value = "TRUE";
}

aipo.cabinet.hideMember = function(button) {
  dojo.byId('Block-GroupMember-Show').style.display="none";
  dojo.byId('member_to').options.length = 0;
  dojo.byId('is_member').value = "FALSE";
}

