package org.apache.jetspeed.om.security.turbine.map;

//import java.util.Date;
//import java.math.BigDecimal;

import org.apache.torque.Torque;
import org.apache.torque.TorqueException;
import org.apache.torque.map.DatabaseMap;
import org.apache.torque.map.MapBuilder;
import org.apache.torque.map.TableMap;

/**
 * This class was autogenerated by Torque on:
 * 
 * [Thu Jun 10 23:17:32 JST 2004]
 * 
 */
public class TurbinePermissionMapBuilder implements MapBuilder {
  /**
   * The name of this class
   */
  public static final String CLASS_NAME =
    "org.apache.jetspeed.om.security.turbine.map.TurbinePermissionMapBuilder";

  /**
   * The database map.
   */
  private DatabaseMap dbMap = null;

  /**
   * Tells us if this DatabaseMapBuilder is built so that we don't have to
   * re-build it every time.
   * 
   * @return true if this DatabaseMapBuilder is built
   */
  @Override
  public boolean isBuilt() {
    return (dbMap != null);
  }

  /**
   * Gets the databasemap this map builder built.
   * 
   * @return the databasemap
   */
  @Override
  public DatabaseMap getDatabaseMap() {
    return this.dbMap;
  }

  /**
   * The doBuild() method builds the DatabaseMap
   * 
   * @throws TorqueException
   */
  @Override
  public void doBuild() throws TorqueException {
    dbMap = Torque.getDatabaseMap("default");

    dbMap.addTable("TURBINE_PERMISSION");
    TableMap tMap = dbMap.getTable("TURBINE_PERMISSION");

    tMap.setPrimaryKeyMethod(TableMap.NATIVE);

    tMap.setPrimaryKeyMethodInfo("TURBINE_PERMISSION");

    tMap.addPrimaryKey("TURBINE_PERMISSION.PERMISSION_ID", new Integer(0));
    tMap.addColumn("TURBINE_PERMISSION.PERMISSION_NAME", new String());
    tMap.addColumn("TURBINE_PERMISSION.OBJECTDATA", new Object());
  }
}
