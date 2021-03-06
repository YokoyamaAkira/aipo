/*
 * Copyright 2000-2001,2004 The Apache Software Foundation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.jetspeed.portal.portlets.browser;

import java.sql.Types;
import java.util.Collections;
import java.util.List;

import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;

/**
 * A class for iterating over the window. The window constitutes the selection
 * of rows being displayed to the user from the List storing all the ResultSet.
 * 
 * @author <a href="mailto:taylor@apache.org">David Sean Taylor</a>
 * @version $Id: DatabaseBrowserIterator.java,v 1.11 2004/02/23 03:26:43 jford
 *          Exp $
 * 
 */
public class DatabaseBrowserIterator implements BrowserIterator {

  /**
   * Static initialization of the logger for this class
   */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(DatabaseBrowserIterator.class.getName());

  private static final String VELOCITY_NULL_ENTRY = "-";

  int top = 0;

  int index = 0;

  int bottom = -1;

  int windowSize = -1;

  int rsListSize = -1;

  boolean ascendingOrder = true;

  String sortColumnName = null;

  List<?> rsList;

  List<?> rsTitleList;

  List<?> rsTypeList;

  /**
   * Constructor for the database browser iterator
   * 
   * @param result
   *          The List containg all the rows from the resultSet.
   * @param columnTitles
   *          The List containg all the columnLabels from a resultSet.
   * @param pageSize
   *          The number of rows to be displayed in a window configured by the
   *          user.
   */
  public DatabaseBrowserIterator(List<?> result, List<?> columnTitles,
      List<?> columnTypes, int pageSize) {
    this.rsList = result;
    this.rsTitleList = columnTitles;
    this.rsTypeList = columnTypes;
    this.windowSize = pageSize;
    this.rsListSize = result.size();
    setBottom();
  }

  /**
   * This method returns the result set.
   * 
   */
  @Override
  public List<?> getResultSet() {
    return rsList;
  }

  /**
   * This method returns the number of rows in the result set.
   * 
   */
  @Override
  public int getResultSetSize() {
    return rsListSize;
  }

  /**
   * This method returns the List containg the column labels of the result set.
   * 
   */
  @Override
  public List<?> getResultSetTitleList() {
    return rsTitleList;
  }

  /**
   * This method returns the List containg the column type names of the result
   * set.
   * 
   * @see java.sql.Types
   */
  @Override
  public List<?> getResultSetTypesList() {
    return rsTypeList;
  }

  /**
   * This method returns the index of the row to which the cursor is pointing
   * at.
   * 
   */
  @Override
  public int getTop() {
    return top;
  }

  /**
   * This method points the cursor to the index provided.
   * 
   * @param start
   *          Index to which cursor should point to
   */
  @Override
  public void setTop(int start) {
    top = start;
    index = top;
    setBottom();
  }

  /**
   * This method returns the last index of the row in the window displayed.
   * 
   */
  @Override
  public int getBottom() {
    return bottom;
  }

  /**
   * This method returns the window size.
   * 
   */
  @Override
  public int getWindowSize() {
    return windowSize;
  }

  /**
   * This method sets the bottom based on which index the cursor points to and
   * the size of the result set.
   * 
   */
  private void setBottom() {
    bottom = top + windowSize;
    if (bottom > rsListSize) {
      bottom = rsListSize;
    }
  }

  /**
   * Returns true if the iteration has more elements
   */
  @Override
  public boolean hasNext() {
    if (index <= rsListSize && index < bottom) {
      return true;
    }
    return false;
  }

  /**
   * Returns the next element in the iteration
   */
  @Override
  public Object next() {
    index = index + 1;
    return rsList.get(index - 1);
  }

  /**
   * Logs as info - since remove operation is not supported by this Iterator.
   */
  @Override
  public void remove() {
    logger.info("The remove operation is not supported.");
  }

  /**
   * This method sorts the result set according to the value of the column as
   * specified by the parameter column name. Changes the order of the result set
   * vector.
   * 
   * @param String
   *          sortColumnName
   */
  @Override
  public void sort(String columnName) {
    // System.out.println("current columnName="+columnName);
    // System.out.println("old columnName="+sortColumnName);
    if (columnName != null) {
      if (sortColumnName != null && sortColumnName.equals(columnName)) {
        ascendingOrder = !ascendingOrder;
      } else {
        ascendingOrder = true;
        sortColumnName = columnName;
      }
      Collections.sort(rsList, this);
    }
  }

  /*
   * Compares its two arguments for order.
   */
  @Override
  public int compare(Object obj1, Object obj2) {
    int idx = rsTitleList.indexOf(sortColumnName);
    int order = 0;

    if (idx != -1) {
      Object col1 = ((List<?>) obj1).get(idx);
      Object col2 = ((List<?>) obj2).get(idx);

      if ((col1).equals(VELOCITY_NULL_ENTRY)) {
        if ((col2).equals(VELOCITY_NULL_ENTRY)) {
          order = 0;
        } else {
          order = -1;
        }
      } else if ((col2).equals(VELOCITY_NULL_ENTRY)) {
        order = 1;
      } else {
        int type = Integer.parseInt((String) rsTypeList.get(idx));
        switch (type) {

          case Types.NUMERIC:
            order =
              (((java.math.BigDecimal) col1)
                .compareTo((java.math.BigDecimal) col2));
            break;

          case Types.DECIMAL:
            order =
              (((java.math.BigDecimal) col1)
                .compareTo((java.math.BigDecimal) col2));
            break;

          case Types.TINYINT:
            order = (((Byte) col1).compareTo((Byte) col2));
            break;

          case Types.SMALLINT:
            order = (((Short) col1).compareTo((Short) col2));
            break;

          case Types.INTEGER:
            order = (((Integer) col1).compareTo((Integer) col2));
            break;

          case Types.BIGINT:
            order = (((Long) col1).compareTo((Long) col2));
            break;

          case Types.REAL:
            order = (((Float) col1).compareTo((Float) col2));
            break;

          case Types.FLOAT:
            order = (((Double) col1).compareTo((Double) col2));
            break;

          case Types.DOUBLE:
            order = (((Double) col1).compareTo((Double) col2));
            break;

          case Types.DATE:
            order = (((java.sql.Date) col1).compareTo((java.sql.Date) col2));
            break;

          case Types.TIME:
            order = (((java.sql.Time) col1).compareTo((java.sql.Time) col2));
            break;

          case Types.TIMESTAMP:
            order =
              (((java.sql.Timestamp) col1).compareTo((java.sql.Timestamp) col2));
            break;

          case Types.CHAR:
            order = (((String) col1).compareTo((String) col2));
            break;

          case Types.VARCHAR:
            order = (((String) col1).compareTo((String) col2));
            break;

          case Types.LONGVARCHAR:
            order = (((String) col1).compareTo((String) col2));
            break;

          default:
            logger
              .info("DatabaseBrowserIterator.compare DataType mapping not found"
                + " in DatabaseBrowserIterator. "
                + "Hence cannot sort based on provided column.");
            break;
        }
      }
    }
    // System.out.println("index of type= "+idx
    // +", order= "+order+", ascending= "+ascendingOrder);
    if (!ascendingOrder) {
      order = 0 - order;
    }
    return order;
  }

}
