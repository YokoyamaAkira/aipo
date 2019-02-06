package org.apache.jetspeed.om.dbregistry;

//import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
//import java.util.Date;
//import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

// Local classes
import org.apache.jetspeed.om.dbregistry.map.PortletDbEntryMapBuilder;
import org.apache.torque.NoRowsException;
import org.apache.torque.TooManyRowsException;
import org.apache.torque.Torque;
import org.apache.torque.TorqueException;
import org.apache.torque.map.MapBuilder;
import org.apache.torque.map.TableMap;
//import org.apache.torque.om.DateKey;
//import org.apache.torque.om.NumberKey;
//import org.apache.torque.om.StringKey;
import org.apache.torque.om.ObjectKey;
import org.apache.torque.om.SimpleKey;
import org.apache.torque.util.BasePeer;
import org.apache.torque.util.Criteria;

import com.workingdogs.village.DataSetException;
import com.workingdogs.village.QueryDataSet;
import com.workingdogs.village.Record;

/**
 * This class was autogenerated by Torque on:
 * 
 * [Thu Jun 10 23:17:32 JST 2004]
 * 
 */
public abstract class BasePortletDbEntryPeer extends BasePeer {

  /** the default database name for this class */
  public static final String DATABASE_NAME = "default";

  /** the table name for this class */
  public static final String TABLE_NAME = "PORTLET";

  /**
   * @return the map builder for this peer
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static MapBuilder getMapBuilder() throws TorqueException {
    return getMapBuilder(PortletDbEntryMapBuilder.CLASS_NAME);
  }

  /** the column name for the ID field */
  public static final String ID;

  /** the column name for the NAME field */
  public static final String NAME;

  /** the column name for the HIDDEN field */
  public static final String HIDDEN;

  /** the column name for the CLASSNAME field */
  public static final String CLASSNAME;

  /** the column name for the TYPE field */
  public static final String TYPE;

  /** the column name for the APPLICATION field */
  public static final String APPLICATION;

  /** the column name for the PARENT field */
  public static final String PARENT;

  /** the column name for the URL field */
  public static final String URL;

  /** the column name for the CACHEDONURL field */
  public static final String CACHEDONURL;

  /** the column name for the ROLE field */
  public static final String ROLE;

  /** the column name for the TITLE field */
  public static final String TITLE;

  /** the column name for the DESCRIPTION field */
  public static final String DESCRIPTION;

  /** the column name for the IMAGE field */
  public static final String IMAGE;

  /** the column name for the SECURITY field */
  public static final String SECURITY;

  static {
    ID = "PORTLET.ID";
    NAME = "PORTLET.NAME";
    HIDDEN = "PORTLET.HIDDEN";
    CLASSNAME = "PORTLET.CLASSNAME";
    TYPE = "PORTLET.TYPE";
    APPLICATION = "PORTLET.APPLICATION";
    PARENT = "PORTLET.PARENT";
    URL = "PORTLET.URL";
    CACHEDONURL = "PORTLET.CACHEDONURL";
    ROLE = "PORTLET.ROLE";
    TITLE = "PORTLET.TITLE";
    DESCRIPTION = "PORTLET.DESCRIPTION";
    IMAGE = "PORTLET.IMAGE";
    SECURITY = "PORTLET.SECURITY";
    if (Torque.isInit()) {
      try {
        getMapBuilder();
      } catch (Exception e) {
        log.error("Could not initialize Peer", e);
      }
    } else {
      Torque.registerMapBuilder(PortletDbEntryMapBuilder.CLASS_NAME);
    }
  }

  /** number of columns for this peer */
  public static final int numColumns = 14;

  /** A class that can be returned by this peer. */
  protected static final String CLASSNAME_DEFAULT =
    "org.apache.jetspeed.om.dbregistry.PortletDbEntry";

  /** A class that can be returned by this peer. */
  protected static final Class<?> CLASS_DEFAULT = initClass(CLASSNAME_DEFAULT);

  /**
   * Class object initialization method.
   * 
   * @param className
   *          name of the class to initialize
   * @return the initialized class
   */
  private static Class<?> initClass(String className) {
    Class<?> c = null;
    try {
      c = Class.forName(className);
    } catch (Throwable t) {
      log.error("A FATAL ERROR has occurred which should not "
        + "have happened under any circumstance.  Please notify "
        + "the Torque developers <turbine-torque-dev@jakarta.apache.org> "
        + "and give as many details as possible (including the error "
        + "stack trace).", t);

      // Error objects should always be propogated.
      if (t instanceof Error) {
        throw (Error) t.fillInStackTrace();
      }
    }
    return c;
  }

  /**
   * Get the list of objects for a ResultSet. Please not that your resultset
   * MUST return columns in the right order. You can use getFieldNames() in
   * BaseObject to get the correct sequence.
   * 
   * @param results
   *          the ResultSet
   * @return the list of objects
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<PortletDbEntry> resultSet2Objects(
      java.sql.ResultSet results) throws TorqueException {
    try {
      QueryDataSet qds = null;
      List<?> rows = null;
      try {
        qds = new QueryDataSet(results);
        rows = getSelectResults(qds);
      } finally {
        if (qds != null) {
          qds.close();
        }
      }

      return populateObjects(rows);
    } catch (SQLException e) {
      throw new TorqueException(e);
    } catch (DataSetException e) {
      throw new TorqueException(e);
    }
  }

  /**
   * Method to do inserts.
   * 
   * @param criteria
   *          object used to create the INSERT statement.
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static ObjectKey doInsert(Criteria criteria) throws TorqueException {
    return BasePortletDbEntryPeer.doInsert(criteria, (Connection) null);
  }

  /**
   * Method to do inserts. This method is to be used during a transaction,
   * otherwise use the doInsert(Criteria) method. It will take care of the
   * connection details internally.
   * 
   * @param criteria
   *          object used to create the INSERT statement.
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static ObjectKey doInsert(Criteria criteria, Connection con)
      throws TorqueException {
    // check for conversion from boolean to int
    if (criteria.containsKey(HIDDEN)) {
      Object possibleBoolean = criteria.get(HIDDEN);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(HIDDEN, 1);
        } else {
          criteria.add(HIDDEN, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(APPLICATION)) {
      Object possibleBoolean = criteria.get(APPLICATION);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(APPLICATION, 1);
        } else {
          criteria.add(APPLICATION, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(CACHEDONURL)) {
      Object possibleBoolean = criteria.get(CACHEDONURL);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(CACHEDONURL, 1);
        } else {
          criteria.add(CACHEDONURL, 0);
        }
      }
    }

    // Set the correct dbName if it has not been overridden
    // criteria.getDbName will return the same object if not set to
    // another value so == check is okay and faster
    if (criteria.getDbName() == Torque.getDefaultDB()) {
      criteria.setDbName(DATABASE_NAME);
    }
    if (con == null) {
      return BasePeer.doInsert(criteria);
    } else {
      return BasePeer.doInsert(criteria, con);
    }
  }

  /**
   * Add all the columns needed to create a new object.
   * 
   * @param criteria
   *          object containing the columns to add.
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void addSelectColumns(Criteria criteria) throws TorqueException {
    criteria.addSelectColumn(ID);
    criteria.addSelectColumn(NAME);
    criteria.addSelectColumn(HIDDEN);
    criteria.addSelectColumn(CLASSNAME);
    criteria.addSelectColumn(TYPE);
    criteria.addSelectColumn(APPLICATION);
    criteria.addSelectColumn(PARENT);
    criteria.addSelectColumn(URL);
    criteria.addSelectColumn(CACHEDONURL);
    criteria.addSelectColumn(ROLE);
    criteria.addSelectColumn(TITLE);
    criteria.addSelectColumn(DESCRIPTION);
    criteria.addSelectColumn(IMAGE);
    criteria.addSelectColumn(SECURITY);
  }

  /**
   * Create a new object of type cls from a resultset row starting from a
   * specified offset. This is done so that you can select other rows than just
   * those needed for this object. You may for example want to create two
   * objects from the same row.
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static PortletDbEntry row2Object(Record row, int offset, Class<?> cls)
      throws TorqueException {
    try {
      PortletDbEntry obj = (PortletDbEntry) cls.newInstance();
      PortletDbEntryPeer.populateObject(row, offset, obj);
      obj.setModified(false);
      obj.setNew(false);

      return obj;
    } catch (InstantiationException e) {
      throw new TorqueException(e);
    } catch (IllegalAccessException e) {
      throw new TorqueException(e);
    }
  }

  /**
   * Populates an object from a resultset row starting from a specified offset.
   * This is done so that you can select other rows than just those needed for
   * this object. You may for example want to create two objects from the same
   * row.
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void populateObject(Record row, int offset, PortletDbEntry obj)
      throws TorqueException {
    try {
      obj.setId(row.getValue(offset + 0).asLong());
      obj.setName(row.getValue(offset + 1).asString());
      obj.setHidden(row.getValue(offset + 2).asBoolean());
      obj.setClassname(row.getValue(offset + 3).asString());
      obj.setType(row.getValue(offset + 4).asString());
      obj.setApplication(row.getValue(offset + 5).asBoolean());
      obj.setParentRef(row.getValue(offset + 6).asLong());
      obj.setURL(row.getValue(offset + 7).asString());
      obj.setCachedonurl(row.getValue(offset + 8).asBoolean());
      obj.setRole(row.getValue(offset + 9).asString());
      obj.setTitle(row.getValue(offset + 10).asString());
      obj.setDescription(row.getValue(offset + 11).asString());
      obj.setImage(row.getValue(offset + 12).asString());
      obj.setSecurityRef(row.getValue(offset + 13).asString());
    } catch (DataSetException e) {
      throw new TorqueException(e);
    }
  }

  /**
   * Method to do selects.
   * 
   * @param criteria
   *          object used to create the SELECT statement.
   * @return List of selected Objects
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<PortletDbEntry> doSelect(Criteria criteria)
      throws TorqueException {
    return populateObjects(doSelectVillageRecords(criteria));
  }

  /**
   * Method to do selects within a transaction.
   * 
   * @param criteria
   *          object used to create the SELECT statement.
   * @param con
   *          the connection to use
   * @return List of selected Objects
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<PortletDbEntry> doSelect(Criteria criteria, Connection con)
      throws TorqueException {
    return populateObjects(doSelectVillageRecords(criteria, con));
  }

  /**
   * Grabs the raw Village records to be formed into objects. This method
   * handles connections internally. The Record objects returned by this method
   * should be considered readonly. Do not alter the data and call save(), your
   * results may vary, but are certainly likely to result in hard to track MT
   * bugs.
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<?> doSelectVillageRecords(Criteria criteria)
      throws TorqueException {
    return BasePortletDbEntryPeer.doSelectVillageRecords(
      criteria,
      (Connection) null);
  }

  /**
   * Grabs the raw Village records to be formed into objects. This method should
   * be used for transactions
   * 
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<?> doSelectVillageRecords(Criteria criteria, Connection con)
      throws TorqueException {
    if (criteria.getSelectColumns().size() == 0) {
      addSelectColumns(criteria);
    }

    // check for conversion from boolean to int
    if (criteria.containsKey(HIDDEN)) {
      Object possibleBoolean = criteria.get(HIDDEN);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(HIDDEN, 1);
        } else {
          criteria.add(HIDDEN, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(APPLICATION)) {
      Object possibleBoolean = criteria.get(APPLICATION);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(APPLICATION, 1);
        } else {
          criteria.add(APPLICATION, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(CACHEDONURL)) {
      Object possibleBoolean = criteria.get(CACHEDONURL);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(CACHEDONURL, 1);
        } else {
          criteria.add(CACHEDONURL, 0);
        }
      }
    }

    // Set the correct dbName if it has not been overridden
    // criteria.getDbName will return the same object if not set to
    // another value so == check is okay and faster
    if (criteria.getDbName() == Torque.getDefaultDB()) {
      criteria.setDbName(DATABASE_NAME);
    }
    // BasePeer returns a List of Value (Village) arrays. The array
    // order follows the order columns were placed in the Select clause.
    if (con == null) {
      return BasePeer.doSelect(criteria);
    } else {
      return BasePeer.doSelect(criteria, con);
    }
  }

  /**
   * The returned List will contain objects of the default type or objects that
   * inherit from the default.
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<PortletDbEntry> populateObjects(List<?> records)
      throws TorqueException {
    List<PortletDbEntry> results =
      new ArrayList<PortletDbEntry>(records.size());

    // populate the object(s)
    for (int i = 0; i < records.size(); i++) {
      Record row = (Record) records.get(i);
      results.add(PortletDbEntryPeer.row2Object(row, 1, PortletDbEntryPeer
        .getOMClass()));
    }
    return results;
  }

  /**
   * The class that the Peer will make instances of. If the BO is abstract then
   * you must implement this method in the BO.
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static Class<?> getOMClass() throws TorqueException {
    return CLASS_DEFAULT;
  }

  /**
   * Method to do updates.
   * 
   * @param criteria
   *          object containing data that is used to create the UPDATE
   *          statement.
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doUpdate(Criteria criteria) throws TorqueException {
    BasePortletDbEntryPeer.doUpdate(criteria, (Connection) null);
  }

  /**
   * Method to do updates. This method is to be used during a transaction,
   * otherwise use the doUpdate(Criteria) method. It will take care of the
   * connection details internally.
   * 
   * @param criteria
   *          object containing data that is used to create the UPDATE
   *          statement.
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doUpdate(Criteria criteria, Connection con)
      throws TorqueException {
    Criteria selectCriteria = new Criteria(DATABASE_NAME, 2);
    selectCriteria.put(ID, criteria.remove(ID));
    // check for conversion from boolean to int
    if (criteria.containsKey(HIDDEN)) {
      Object possibleBoolean = criteria.get(HIDDEN);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(HIDDEN, 1);
        } else {
          criteria.add(HIDDEN, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(APPLICATION)) {
      Object possibleBoolean = criteria.get(APPLICATION);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(APPLICATION, 1);
        } else {
          criteria.add(APPLICATION, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(CACHEDONURL)) {
      Object possibleBoolean = criteria.get(CACHEDONURL);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(CACHEDONURL, 1);
        } else {
          criteria.add(CACHEDONURL, 0);
        }
      }
    }

    // Set the correct dbName if it has not been overridden
    // criteria.getDbName will return the same object if not set to
    // another value so == check is okay and faster
    if (criteria.getDbName() == Torque.getDefaultDB()) {
      criteria.setDbName(DATABASE_NAME);
    }
    if (con == null) {
      BasePeer.doUpdate(selectCriteria, criteria);
    } else {
      BasePeer.doUpdate(selectCriteria, criteria, con);
    }
  }

  /**
   * Method to do deletes.
   * 
   * @param criteria
   *          object containing data that is used DELETE from database.
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doDelete(Criteria criteria) throws TorqueException {
    BasePortletDbEntryPeer.doDelete(criteria, (Connection) null);
  }

  /**
   * Method to do deletes. This method is to be used during a transaction,
   * otherwise use the doDelete(Criteria) method. It will take care of the
   * connection details internally.
   * 
   * @param criteria
   *          object containing data that is used DELETE from database.
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doDelete(Criteria criteria, Connection con)
      throws TorqueException {
    // check for conversion from boolean to int
    if (criteria.containsKey(HIDDEN)) {
      Object possibleBoolean = criteria.get(HIDDEN);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(HIDDEN, 1);
        } else {
          criteria.add(HIDDEN, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(APPLICATION)) {
      Object possibleBoolean = criteria.get(APPLICATION);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(APPLICATION, 1);
        } else {
          criteria.add(APPLICATION, 0);
        }
      }
    }
    // check for conversion from boolean to int
    if (criteria.containsKey(CACHEDONURL)) {
      Object possibleBoolean = criteria.get(CACHEDONURL);
      if (possibleBoolean instanceof Boolean) {
        if (((Boolean) possibleBoolean).booleanValue()) {
          criteria.add(CACHEDONURL, 1);
        } else {
          criteria.add(CACHEDONURL, 0);
        }
      }
    }

    // Set the correct dbName if it has not been overridden
    // criteria.getDbName will return the same object if not set to
    // another value so == check is okay and faster
    if (criteria.getDbName() == Torque.getDefaultDB()) {
      criteria.setDbName(DATABASE_NAME);
    }
    if (con == null) {
      BasePeer.doDelete(criteria);
    } else {
      BasePeer.doDelete(criteria, con);
    }
  }

  /**
   * Method to do selects
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<PortletDbEntry> doSelect(PortletDbEntry obj)
      throws TorqueException {
    return doSelect(buildCriteria(obj));
  }

  /**
   * Method to do inserts
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doInsert(PortletDbEntry obj) throws TorqueException {
    obj.setPrimaryKey(doInsert(buildCriteria(obj)));
    obj.setNew(false);
    obj.setModified(false);
  }

  /**
   * @param obj
   *          the data object to update in the database.
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doUpdate(PortletDbEntry obj) throws TorqueException {
    doUpdate(buildCriteria(obj));
    obj.setModified(false);
  }

  /**
   * @param obj
   *          the data object to delete in the database.
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doDelete(PortletDbEntry obj) throws TorqueException {
    doDelete(buildCriteria(obj));
  }

  /**
   * Method to do inserts. This method is to be used during a transaction,
   * otherwise use the doInsert(PortletDbEntry) method. It will take care of the
   * connection details internally.
   * 
   * @param obj
   *          the data object to insert into the database.
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doInsert(PortletDbEntry obj, Connection con)
      throws TorqueException {
    obj.setPrimaryKey(doInsert(buildCriteria(obj), con));
    obj.setNew(false);
    obj.setModified(false);
  }

  /**
   * Method to do update. This method is to be used during a transaction,
   * otherwise use the doUpdate(PortletDbEntry) method. It will take care of the
   * connection details internally.
   * 
   * @param obj
   *          the data object to update in the database.
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doUpdate(PortletDbEntry obj, Connection con)
      throws TorqueException {
    doUpdate(buildCriteria(obj), con);
    obj.setModified(false);
  }

  /**
   * Method to delete. This method is to be used during a transaction, otherwise
   * use the doDelete(PortletDbEntry) method. It will take care of the
   * connection details internally.
   * 
   * @param obj
   *          the data object to delete in the database.
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doDelete(PortletDbEntry obj, Connection con)
      throws TorqueException {
    doDelete(buildCriteria(obj), con);
  }

  /**
   * Method to do deletes.
   * 
   * @param pk
   *          ObjectKey that is used DELETE from database.
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doDelete(ObjectKey pk) throws TorqueException {
    BasePortletDbEntryPeer.doDelete(pk, (Connection) null);
  }

  /**
   * Method to delete. This method is to be used during a transaction, otherwise
   * use the doDelete(ObjectKey) method. It will take care of the connection
   * details internally.
   * 
   * @param pk
   *          the primary key for the object to delete in the database.
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static void doDelete(ObjectKey pk, Connection con)
      throws TorqueException {
    doDelete(buildCriteria(pk), con);
  }

  /** Build a Criteria object from an ObjectKey */
  public static Criteria buildCriteria(ObjectKey pk) {
    Criteria criteria = new Criteria();
    criteria.add(ID, pk);
    return criteria;
  }

  /** Build a Criteria object from the data object for this peer */
  public static Criteria buildCriteria(PortletDbEntry obj) {
    Criteria criteria = new Criteria(DATABASE_NAME);
    if (!obj.isNew()) {
      criteria.add(ID, obj.getId());
    }
    criteria.add(NAME, obj.getName());
    criteria.add(HIDDEN, obj.getHidden());
    criteria.add(CLASSNAME, obj.getClassname());
    criteria.add(TYPE, obj.getType());
    criteria.add(APPLICATION, obj.getApplication());
    criteria.add(PARENT, obj.getParentRef());
    criteria.add(URL, obj.getURL());
    criteria.add(CACHEDONURL, obj.getCachedonurl());
    criteria.add(ROLE, obj.getRole());
    criteria.add(TITLE, obj.getTitle());
    criteria.add(DESCRIPTION, obj.getDescription());
    criteria.add(IMAGE, obj.getImage());
    criteria.add(SECURITY, obj.getSecurityRef());
    return criteria;
  }

  /**
   * Retrieve a single object by pk
   * 
   * @param pk
   *          the primary key
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   * @throws NoRowsException
   *           Primary key was not found in database.
   * @throws TooManyRowsException
   *           Primary key was not found in database.
   */
  public static PortletDbEntry retrieveByPK(long pk) throws TorqueException,
      NoRowsException, TooManyRowsException {
    return retrieveByPK(SimpleKey.keyFor(pk));
  }

  /**
   * Retrieve a single object by pk
   * 
   * @param pk
   *          the primary key
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   * @throws NoRowsException
   *           Primary key was not found in database.
   * @throws TooManyRowsException
   *           Primary key was not found in database.
   */
  public static PortletDbEntry retrieveByPK(ObjectKey pk)
      throws TorqueException, NoRowsException, TooManyRowsException {
    Connection db = null;
    PortletDbEntry retVal = null;
    try {
      db = Torque.getConnection(DATABASE_NAME);
      retVal = retrieveByPK(pk, db);
    } finally {
      Torque.closeConnection(db);
    }
    return (retVal);
  }

  /**
   * Retrieve a single object by pk
   * 
   * @param pk
   *          the primary key
   * @param con
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   * @throws NoRowsException
   *           Primary key was not found in database.
   * @throws TooManyRowsException
   *           Primary key was not found in database.
   */
  public static PortletDbEntry retrieveByPK(ObjectKey pk, Connection con)
      throws TorqueException, NoRowsException, TooManyRowsException {
    Criteria criteria = buildCriteria(pk);
    List<PortletDbEntry> v = doSelect(criteria, con);
    if (v.size() == 0) {
      throw new NoRowsException("Failed to select a row.");
    } else if (v.size() > 1) {
      throw new TooManyRowsException("Failed to select only one row.");
    } else {
      return v.get(0);
    }
  }

  /**
   * Retrieve a multiple objects by pk
   * 
   * @param pks
   *          List of primary keys
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<PortletDbEntry> retrieveByPKs(List<?> pks)
      throws TorqueException {
    Connection db = null;
    List<PortletDbEntry> retVal = null;
    try {
      db = Torque.getConnection(DATABASE_NAME);
      retVal = retrieveByPKs(pks, db);
    } finally {
      Torque.closeConnection(db);
    }
    return (retVal);
  }

  /**
   * Retrieve a multiple objects by pk
   * 
   * @param pks
   *          List of primary keys
   * @param dbcon
   *          the connection to use
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  public static List<PortletDbEntry> retrieveByPKs(List<?> pks, Connection dbcon)
      throws TorqueException {
    List<PortletDbEntry> objs = null;
    if (pks == null || pks.size() == 0) {
      objs = new LinkedList<PortletDbEntry>();
    } else {
      Criteria criteria = new Criteria();
      criteria.addIn(ID, pks);
      objs = doSelect(criteria, dbcon);
    }
    return objs;
  }

  /**
   * Returns the TableMap related to this peer. This method is not needed for
   * general use but a specific application could have a need.
   * 
   * @throws TorqueException
   *           Any exceptions caught during processing will be rethrown wrapped
   *           into a TorqueException.
   */
  protected static TableMap getTableMap() throws TorqueException {
    return Torque.getDatabaseMap(DATABASE_NAME).getTable(TABLE_NAME);
  }
}
