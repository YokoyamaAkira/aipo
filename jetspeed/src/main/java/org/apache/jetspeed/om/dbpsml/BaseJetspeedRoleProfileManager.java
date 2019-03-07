package org.apache.jetspeed.om.dbpsml;

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
 * This class manages JetspeedRoleProfile objects. This class was autogenerated
 * by Torque on:
 *
 * [Thu Jun 10 23:17:32 JST 2004]
 *
 *
 * You should not use this class directly. It should not even be extended all
 * references should be to JetspeedRoleProfileManager
 */
public abstract class BaseJetspeedRoleProfileManager extends
    AbstractBaseManager {
  /** The name of the manager */
  protected static String MANAGED_CLASS =
    "org.apache.jetspeed.om.dbpsml.JetspeedRoleProfile";

  /** The name of our class to pass to Torque as the default manager. */
  protected static String DEFAULT_MANAGER_CLASS =
    "org.apache.jetspeed.om.dbpsml.JetspeedRoleProfileManager";

  /**
   * Retrieves an implementation of the manager, based on the settings in the
   * configuration.
   *
   * @return an implementation of JetspeedRoleProfileManager.
   */
  public static JetspeedRoleProfileManager getManager() {
    return (JetspeedRoleProfileManager) Torque
      .getManager(
        JetspeedRoleProfileManager.MANAGED_CLASS,
        JetspeedRoleProfileManager.DEFAULT_MANAGER_CLASS);
  }

  /**
   * Static accessor for the @see #getInstanceImpl().
   *
   * @return a <code>JetspeedRoleProfile</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static JetspeedRoleProfile getInstance() throws TorqueException {
    return getManager().getInstanceImpl();
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>JetspeedRoleProfile</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static JetspeedRoleProfile getInstance(ObjectKey id)
      throws TorqueException {
    return getManager().getInstanceImpl(id);
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey, boolean).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>JetspeedRoleProfile</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static JetspeedRoleProfile getInstance(ObjectKey id, boolean fromCache)
      throws TorqueException {
    return getManager().getInstanceImpl(id, fromCache);
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>JetspeedRoleProfile</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static JetspeedRoleProfile getInstance(int id) throws TorqueException {
    return getManager().getInstanceImpl(SimpleKey.keyFor(id));
  }

  /**
   * Static accessor for the @see #getInstanceImpl(ObjectKey).
   *
   * @param id
   *          an <code>ObjectKey</code> value
   * @return a <code>JetspeedRoleProfile</code> value
   * @exception TorqueException
   *              if an error occurs
   */
  public static JetspeedRoleProfile getInstance(int id, boolean fromCache)
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

  public static boolean exists(JetspeedRoleProfile obj) throws TorqueException {
    return getManager().existsImpl(obj);
  }

  public static MethodResultCache getMethodResult() {
    return getManager().getMethodResultCache();
  }

  public static void addCacheListener(CacheListener listener) {
    getManager().addCacheListenerImpl(listener);
  }

  /**
   * Creates a new <code>BaseJetspeedRoleProfileManager</code> instance.
   *
   * @exception TorqueException
   *              if an error occurs
   */
  public BaseJetspeedRoleProfileManager() throws TorqueException {
    setClassName("org.apache.jetspeed.om.dbpsml.JetspeedRoleProfile");
  }

  /**
   * Get a fresh instance of a JetspeedRoleProfileManager
   */
  protected JetspeedRoleProfile getInstanceImpl() throws TorqueException {
    JetspeedRoleProfile obj = null;
    try {
      obj = (JetspeedRoleProfile) getOMInstance();
    } catch (Exception e) {
      throw new TorqueException(e);
    }
    return obj;
  }

  /**
   * Get a JetspeedRoleProfile with the given id.
   *
   * @param id
   *          <code>ObjectKey</code> value
   */
  protected JetspeedRoleProfile getInstanceImpl(ObjectKey id)
      throws TorqueException {
    return (JetspeedRoleProfile) getOMInstance(id);
  }

  /**
   * Get a JetspeedRoleProfile with the given id.
   *
   * @param id
   *          <code>ObjectKey</code> value
   * @param fromCache
   *          if true, look for cached JetspeedRoleProfiles before loading from
   *          storage.
   */
  protected JetspeedRoleProfile getInstanceImpl(ObjectKey id, boolean fromCache)
      throws TorqueException {
    return (JetspeedRoleProfile) getOMInstance(id, fromCache);
  }

  /**
   * Gets a list of JetspeedRoleProfiles based on id's.
   *
   * @param ids
   *          a List of <code>ObjectKeys</code> value
   * @return a <code>List</code> of JetspeedRoleProfiles
   * @exception TorqueException
   *              if an error occurs
   */
  protected List<?> getInstancesImpl(List<?> ids) throws TorqueException {
    return getOMs(ids);
  }

  /**
   * Gets a list of JetspeedRoleProfiles based on id's.
   *
   * @param ids
   *          a List of <code>ObjectKeys</code> value
   * @param fromCache
   *          if true, look for cached JetspeedRoleProfiles before loading from
   *          storage.
   * @return a <code>List</code> of JetspeedRoleProfiles
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
  protected boolean existsImpl(JetspeedRoleProfile om) throws TorqueException {
    Criteria crit = JetspeedRoleProfilePeer.buildCriteria(om);
    return JetspeedRoleProfilePeer.doSelect(crit).size() > 0;
  }

  @Override
  protected Persistent retrieveStoredOM(ObjectKey id) throws TorqueException {
    return JetspeedRoleProfilePeer.retrieveByPK(id);
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
  protected List<JetspeedRoleProfile> retrieveStoredOMs(List ids)
      throws TorqueException {
    return JetspeedRoleProfilePeer.retrieveByPKs(ids);
  }
}
