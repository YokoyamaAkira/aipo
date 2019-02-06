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

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;

import org.apache.jetspeed.capability.CapabilityMap;
import org.apache.jetspeed.om.registry.InvalidEntryException;
import org.apache.jetspeed.om.registry.MediaTypeEntry;
import org.apache.jetspeed.om.registry.MediaTypeRegistry;
import org.apache.jetspeed.om.registry.RegistryEntry;
import org.apache.jetspeed.om.registry.RegistryException;
import org.apache.jetspeed.services.Registry;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;

/**
 * Extends BaseRegistry implementation to override object creation method
 * 
 * @author <a href="mailto:raphael@apache.org">Rapha�l Luta</a>
 * @version $Id: BaseMediaTypeRegistry.java,v 1.7 2004/02/23 03:08:26 jford Exp
 *          $
 */
public class BaseMediaTypeRegistry extends BaseOrderedRegistry implements
    MediaTypeRegistry {

  /**
   * Static initialization of the logger for this class
   */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(BaseMediaTypeRegistry.class.getName());

  /*
   * Find media-types in this registry that match the CapabilityMap requirements
   * 
   * @param category The category and optional subcategories.
   * 
   * @return Iterator The result as an iterator.
   */
  @Override
  public Iterator<MediaTypeEntry> findForCapability(CapabilityMap cm) {
    if (cm == null) {
      return null;
    }

    String type = cm.getPreferredType().getContentType();
    List<MediaTypeEntry> result = new ArrayList<MediaTypeEntry>();

    if (logger.isDebugEnabled()) {
      logger.debug("MediaTypeRegistry: looking for type " + type);
    }

    if (type == null) {
      return result.iterator();
    }

    try {
      Enumeration<?> en = getEntries();
      while (en.hasMoreElements()) {
        MediaTypeEntry mte = (MediaTypeEntry) en.nextElement();

        if (logger.isDebugEnabled()) {
          logger.debug("MediaTypeRegistry: found MediaTypeEntry for type "
            + mte.getMimeType());
        }
        if (type.equals(mte.getMimeType())) {
          result.add(mte);
        }
      }
    } catch (Exception e) {
      logger.error("Exception", e);
    }

    if (logger.isDebugEnabled()) {
      logger.debug("MediaTypeRegistry: found " + result.size() + " entries.");
    }

    return result.iterator();

  }

  /**
   * @see Registry#setEntry
   */
  @Override
  public void setEntry(RegistryEntry entry) throws InvalidEntryException {
    // Delegate to the RegistryService to ensure correct handling of
    // persistence if using file fragments

    try {
      Registry.addEntry(Registry.MEDIA_TYPE, entry);
    } catch (RegistryException e) {
      logger.error("Exception", e);
    }
  }

  /**
   * @see Registry#addEntry
   */
  @Override
  public void addEntry(RegistryEntry entry) throws InvalidEntryException {
    // Delegate to the RegistryService to ensure correct handling of
    // persistence if using file fragments

    try {
      Registry.addEntry(Registry.MEDIA_TYPE, entry);
    } catch (RegistryException e) {
      logger.error("Exception", e);
    }
  }

  /**
   * @see Registry#removeEntry
   */
  @Override
  public void removeEntry(String name) {
    // Delegate to the RegistryService to ensure correct handling of
    // persistence if using file fragments

    Registry.removeEntry(Registry.MEDIA_TYPE, name);
  }

  /**
   * @see Registry#removeEntry
   */
  @Override
  public void removeEntry(RegistryEntry entry) {
    // Delegate to the RegistryService to ensure correct handling of
    // persistence if using file fragments

    if (entry != null) {
      Registry.removeEntry(Registry.MEDIA_TYPE, entry.getName());
    }
  }

  /**
   * Creates a new RegistryEntry instance compatible with the current Registry
   * instance implementation
   * 
   * @return the newly created RegistryEntry
   */
  @Override
  public RegistryEntry createEntry() {
    return new BaseMediaTypeEntry();
  }
}
