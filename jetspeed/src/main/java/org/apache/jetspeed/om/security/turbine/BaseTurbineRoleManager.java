package org.apache.jetspeed.om.security.turbine;

//import java.math.BigDecimal;
//import java.util.Date;
import java.util.List;

import org.apache.torque.Torque;
import org.apache.torque.TorqueException;
import org.apache.torque.manager.AbstractBaseManager;
import org.apache.torque.manager.CacheListener;
import org.apache.torque.manager.MethodResultCache;
import org.apache.torque.om.ObjectKey;
import org.apache.torque.om.Persistent;
import org.apache.torque.om.SimpleKey;
import org.apache.torque.util.Criteria;

/**
 * This class manages TurbineRole objects. This class was autogenerated by
 * Torque on:
 *
 * [Thu Jun 10 23:17:32 JST 2004]
 *
 *
 * You should not use this class directly. It should not even be extended all
 * references should be to TurbineRoleManager
 */
public abstract class BaseTurbineRoleManager extends AbstractBaseManager {
  /** The name of the manager */
  protected static String MANAGED_CLASS =
    "org.apache.jetspeed.om.security.turbine.TurbineRole";

  /** The name of our class to pass to Torque as the default manager. */
  protected static String DEFAULT_MANAGER_CLASS =
    "org.apache.jetspeed.om.security.turbine.TurbineRoleManager";

  /**
   * Retrieves an implementation of the manager, based on the settings in the
   * configuration.
   *
   * @return an implementation of TurbineRoleManager.
   */
  public static TurbineRoleManager getManager() {
    return (TurbineRoleManager) Torque
      .getManager(
        TurbineRoleManager.MANAGED_CLASS,
        TurbineRoleManager.DEFAULT_MANAGER_CLASS);
  }

  /**
   * Static accessor for the @see #getInstanceImpl().
   *
   * @return a <code>TurbineRole</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static TurbineRole getInstance() throws TorqueException {
    return getManager().getInstanceImpl();
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>TurbineRole</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static TurbineRole getInstance(ObjectKey id) throws TorqueException {
    return getManager().getInstanceImpl(id);
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey, boolean).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>TurbineRole</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static TurbineRole getInstance(ObjectKey id, boolean fromCache)
      throws TorqueException {
    return getManager().getInstanceImpl(id, fromCache);
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>TurbineRole</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static TurbineRole getInstance(int id) throws TorqueException {
    return getManager().getInstanceImpl(SimpleKey.keyFor(id));
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>TurbineRole</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static TurbineRole getInstance(int id, boolean fromCache)
      throws TorqueException {
    return getManager().getInstanceImpl(SimpleKey.keyFor(id), fromCache);
  }

  /**
   * Static accessor for the @see #getInstancesImpl(List).
   *
   * @param ids
   *          a <code>List</code> value
   * @return a <code>List</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static List<?> getInstances(List<?> ids) throws TorqueException {
    return getManager().getInstancesImpl(ids);
  }

  /**
   * Static accessor for the @see #getInstancesImpl(List, boolean).
   *
   * @param ids
   *          a <code>List</code> value
   * @return a <code>List</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static List<?> getInstances(List<?> ids, boolean fromCache)
      throws TorqueException {
    return getManager().getInstancesImpl(ids, fromCache);
  }

  public static void putInstance(Persistent om) throws TorqueException {
    getManager().putInstanceImpl(om);
  }

  public static void clear() throws TorqueException {
    getManager().clearImpl();
  }

  public static boolean exists(TurbineRole obj) throws TorqueException {
    return getManager().existsImpl(obj);
  }

  public static MethodResultCache getMethodResult() {
    return getManager().getMethodResultCache();
  }

  public static void addCacheListener(CacheListener listener) {
    getManager().addCacheListenerImpl(listener);
  }

  /**
   * Creates a new <code>BaseTurbineRoleManager</code> instance.
   *
   * @exception TorqueException
   *              if an error occurs
   */
  public BaseTurbineRoleManager() throws TorqueException {
    setClassName("org.apache.jetspeed.om.security.turbine.TurbineRole");
  }

  /**
   * Get a fresh instance of a TurbineRoleManager
   */
  protected TurbineRole getInstanceImpl() throws TorqueException {
    TurbineRole obj = null;
    try {
      obj = (TurbineRole) getOMInstance();
    } catch (Exception e) {
      throw new TorqueException(e);
    }
    return obj;
  }

  /**
   * Get a TurbineRole with the given id.
   *
   * @param id
   *          <code>ObjectKey</code> value
   */
  protected TurbineRole getInstanceImpl(ObjectKey id) throws TorqueException {
    return (TurbineRole) getOMInstance(id);
  }

  /**
   * Get a TurbineRole with the given id.
   *
   * @param id
   *          <code>ObjectKey</code> value
   * @param fromCache
   *          if true, look for cached TurbineRoles before loading from storage.
   */
  protected TurbineRole getInstanceImpl(ObjectKey id, boolean fromCache)
      throws TorqueException {
    return (TurbineRole) getOMInstance(id, fromCache);
  }

  /**
   * Gets a list of TurbineRoles based on id's.
   *
   * @param ids
   *          a List of <code>ObjectKeys</code> value
   * @return a <code>List</code> of TurbineRoles
   * @exception TorqueException
   *              if an error occurs
   */
  protected List<?> getInstancesImpl(List<?> ids) throws TorqueException {
    return getOMs(ids);
  }

  /**
   * Gets a list of TurbineRoles based on id's.
   *
   * @param ids
   *          a List of <code>ObjectKeys</code> value
   * @param fromCache
   *          if true, look for cached TurbineRoles before loading from storage.
   * @return a <code>List</code> of TurbineRoles
   * @exception TorqueException
   *              if an error occurs
   */
  protected List<?> getInstancesImpl(List<?> ids, boolean fromCache)
      throws TorqueException {
    return getOMs(ids, fromCache);
  }

  /**
   * check for a duplicate project name
   */
  protected boolean existsImpl(TurbineRole om) throws TorqueException {
    Criteria crit = TurbineRolePeer.buildCriteria(om);
    return TurbineRolePeer.doSelect(crit).size() > 0;
  }

  @Override
  protected Persistent retrieveStoredOM(ObjectKey id) throws TorqueException {
    return TurbineRolePeer.retrieveByPK(id);
  }

  /**
   * Gets a list of ModuleEntities based on id's.
   *
   * @param moduleIds
   *          a <code>NumberKey[]</code> value
   * @return a <code>List</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  @SuppressWarnings("rawtypes")
  @Override
  protected List<TurbineRole> retrieveStoredOMs(List ids)
      throws TorqueException {
    return TurbineRolePeer.retrieveByPKs(ids);
  }
}
