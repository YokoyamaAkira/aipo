/*
 * Copyright 2000-2004 The Apache Software Foundation.
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

package org.apache.jetspeed.om.registry.base;

import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Vector;

import org.apache.jetspeed.om.registry.InvalidEntryException;
import org.apache.jetspeed.om.registry.RegistryEntry;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;

/**
 * Provides a basic registry implementation that keep the elements ordered.
 *
 * @author <a href="mailto:raphael@apache.org">Rapha Luta</a>
 * @version $Id: BaseOrderedRegistry.java,v 1.4 2004/02/23 03:08:26 jford Exp $
 */
public class BaseOrderedRegistry implements LocalRegistry {
  protected List<RegistryEntry> entries = new Vector<RegistryEntry>();

  protected Map<String, Integer> idx = null;

  /**
   * Static initialization of the logger for this class
   */
  private static final JetspeedLogger logger =
    JetspeedLogFactoryService.getLogger(BaseOrderedRegistry.class.getName());

  /** @see Registry#getEntryCount */
  @Override
  public int getEntryCount() {
    return this.entries.size();
  }

  /** @see Registry#getEntry */
  @Override
  public RegistryEntry getEntry(String name) throws InvalidEntryException {

    RegistryEntry entry = null;

    try {
      if (idx == null) {
        synchronized (entries) {
          buildIdx();
        }
      }

      if (name != null) {
        synchronized (entries) {
          Integer pos = (idx.get(name));

          if (pos == null) {
            throw new InvalidEntryException(
              InvalidEntryException.ENTRY_DOES_NOT_EXIST + " " + name);
          }

          entry = entries.get(pos.intValue());
        }
      }
    } catch (Exception e) {
      // this will happen if for some reasons the index and vector are
      // desynchronized.
      // before throwing an exception, rebuild the idx to prevent further errors
      synchronized (entries) {
        buildIdx();
      }

      logger.error("getEntry: index and vector are not in synch.", e);
      throw new InvalidEntryException(
        InvalidEntryException.ENTRY_DOES_NOT_EXIST + " " + name);
    }

    return entry;
  }

  /**
   * @see Registry#setEntry
   */
  @Override
  public void setEntry(RegistryEntry entry) throws InvalidEntryException {
    setLocalEntry(entry);
  }

  /**
   * @see Registry#addEntry
   */
  @Override
  public void addEntry(RegistryEntry entry) throws InvalidEntryException {
    addLocalEntry(entry);
  }

  /**
   * @see Registry#removeEntry
   */
  @Override
  public void removeEntry(String name) {
    removeLocalEntry(name);
  }

  /**
   * @see Registry#removeEntry
   */

  @Override
  public void removeEntry(RegistryEntry entry) {
    removeLocalEntry(entry);
  }

  /**
   * @see Registry#hasEntry
   */
  @Override
  public boolean hasEntry(String name) {
    synchronized (entries) {
      if (idx == null) {
        buildIdx();
      }
    }

    return this.idx.containsKey(name);
  }

  /**
   * @see Registry#getEntries
   */
  @Override
  public Enumeration<RegistryEntry> getEntries() {
    Vector<RegistryEntry> v = new Vector<RegistryEntry>(entries);

    return v.elements();
  }

  /**
   * @see Registry#listEntryNames
   */
  @Override
  public Iterator<String> listEntryNames() {
    synchronized (entries) {
      if (idx == null) {
        buildIdx();
      }
    }

    return this.idx.keySet().iterator();
  }

  /**
   * @see Registry#toArray
   */
  @Override
  public RegistryEntry[] toArray() {
    RegistryEntry[] array = new RegistryEntry[entries.size()];

    return entries.toArray(array);

  }

  /**
   * Creates a new RegistryEntry instance compatible with the current Registry
   * instance implementation
   *
   * @return the newly created RegistryEntry
   */
  @Override
  public RegistryEntry createEntry() {
    return new BaseRegistryEntry();
  }

  // RegistryService specific methods

  /**
   * This method is used to only set the entry in the local memory cache of the
   * registry without any coherency check with persistent storage
   *
   * @param entry
   *          the RegistryEntry to store
   */
  @Override
  public void setLocalEntry(RegistryEntry entry) throws InvalidEntryException {
    synchronized (entries) {
      if (idx == null) {
        buildIdx();
      }

      if (this.idx.containsKey(entry.getName()) == false) {
        throw new InvalidEntryException(
          InvalidEntryException.ENTRY_DOES_NOT_EXIST + " " + entry.getName());
      }

      int pos = idx.get(entry.getName()).intValue();

      this.entries.set(pos, entry);
    }
  }

  /**
   * This method is used to only add the entry in the local memory cache of the
   * registry without any coherency check with persistent storage
   *
   * @param entry
   *          the RegistryEntry to store
   */
  @Override
  public void addLocalEntry(RegistryEntry entry) throws InvalidEntryException {
    synchronized (entries) {
      if (idx == null) {
        buildIdx();
      }

      if (this.idx.containsKey(entry.getName())) {
        throw new InvalidEntryException(
          InvalidEntryException.ENTRY_ALREADY_PRESENT);
      }

      int pos = this.entries.size();
      this.entries.add(entry);
      this.idx.put(entry.getName(), new Integer(pos));
    }
  }

  /**
   * This method is used to only remove the entry from the local memory cache of
   * the registry without any coherency check with persistent storage
   *
   * @param name
   *          the name of the RegistryEntry to remove
   */
  @Override
  public void removeLocalEntry(String name) {
    synchronized (entries) {
      if (idx == null) {
        buildIdx();
      }

      if (this.idx.containsKey(name)) {
        int pos = idx.get(name).intValue();
        this.entries.remove(pos);
        buildIdx();
      }
    }
  }

  /**
   * This method is used to only remove the entry from the local memory cache of
   * the registry without any coherency check with persistent storage
   *
   * @param entry
   *          the RegistryEntry to remove
   */
  @Override
  public void removeLocalEntry(RegistryEntry entry) {
    synchronized (entries) {
      if (entries.remove(entry)) {
        buildIdx();
      }
    }
  }

  /**
   * Build a lookup index of entries
   */
  private void buildIdx() {
    Map<String, Integer> map = new TreeMap<String, Integer>();

    for (int i = 0; i < entries.size(); i++) {
      RegistryEntry entry = entries.get(i);
      map.put(entry.getName(), new Integer(i));
    }

    this.idx = map;
  }
}
