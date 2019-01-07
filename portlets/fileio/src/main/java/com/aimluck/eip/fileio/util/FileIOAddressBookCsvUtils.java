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

package com.aimluck.eip.fileio.util;

import org.apache.turbine.util.RunData;

import com.aimluck.eip.common.ALCsvTokenizer;
import com.aimluck.eip.services.storage.ALStorageService;

/**
 * AddressbookのCSV読取用ユーティリティクラスです。
 * 
 */
public class FileIOAddressBookCsvUtils {

  /** CSVファイルを一時保管するファイル名の指定 */
  public static final String CSV_ADDRESSBOOK_TEMP_FILENAME = "address_book.csv";

  /** エラーリスト用CSVファイルを一時保管するファイル名の指定 */
  public static final String CSV_ADDRESSBOOK_TEMP_ERROR_FILENAME =
    "address_book_err.csv";

  /** CSVファイルを一時保管するディレクトリの指定 */
  public static final String CSV_ADDRESSBOOK_TEMP_FOLDER = "address_book";

  /**
   * アクセスしてきたユーザが利用するブラウザ名が Windows の MSIE であるかを判定する．
   * 
   * @param rundata
   * @return MSIE の場合は，true．
   */
  public static boolean isMsieBrowser(RunData rundata) {
    String browserNames = "MSIE";

    // User-Agent の取得
    String userAgent = rundata.getRequest().getHeader("User-Agent");
    if (userAgent == null || userAgent.equals("")) {
      return false;
    }

    if (userAgent.indexOf("Win") < 0) {
      return false;
    }

    if (userAgent.indexOf(browserNames) > 0) {
      return true;
    }
    return false;
  }

  /**
   * 一時ファイルの保存先フォルダを取得
   * 
   * @param index
   * @return
   */
  public static String getAddressBookCsvFolderName(String index) {
    return ALStorageService.getDocumentPath(
      ALCsvTokenizer.CSV_TEMP_FOLDER,
      FileIOAddressBookCsvUtils.CSV_ADDRESSBOOK_TEMP_FOLDER
        + ALStorageService.separator()
        + index);
  }

}
