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

package org.apache.jetspeed.om.profile;

import java.util.Iterator;

/**
 * This class represents a loaded PSML document in memory, providing all
 * facilities for finding and updating specific parts of the document.
 * 
 * @author <a href="mailto:raphael@apache.org">Rapha�l Luta</a>
 * @version $Id: BasePSMLDocument.java,v 1.9 2004/02/23 03:05:01 jford Exp $
 */
public class BasePSMLDocument implements PSMLDocument {
  /**
   * The name of this PSML document, will be typically the URL of the file for
   * file-based implementations
   */
  private String name = null;

  /**
   * The PortletSet descriptions that make up this document
   */
  private Portlets portlets = null;

  /**
   * Construct a new empty PSMLDocument
   */
  public BasePSMLDocument() {
    // empty constructor
  }

  /**
   * Construct a new named PSMLDocument associated with the specified PSML
   * portlet set description
   * 
   * @param name
   *          the name of this document
   * @param portlets
   *          the PSML memory structure
   */
  public BasePSMLDocument(String name, Portlets portlets) {
    this.name = name;
    this.portlets = portlets;
  }

  /**
   * Return the name of this document
   */
  @Override
  public final String getName() {
    return this.name;
  }

  /**
   * Sets a new name for this document
   * 
   * @param name
   *          the new document name
   */
  @Override
  public final void setName(String name) {
    this.name = name;
  }

  /**
   * Return ths portlet set PSML description of this document
   * 
   * @return a PSML object model hierarchy, or null if none is defined for this
   *         document
   */
  @Override
  public final Portlets getPortlets() {
    return this.portlets;
  }

  /**
   * Sets a new PSML object model for this document
   * 
   * @param portlets
   *          the PSML object model
   */
  @Override
  public final void setPortlets(Portlets portlets) {
    this.portlets = portlets;
  }

  /**
   * Returns the first entry in the current PSML resource corresponding to the
   * given portlet name
   * 
   * @param name
   *          the portlet name to seek
   * @return the found entry description or null
   */
  @Override
  public Entry getEntry(String name) {
    return getEntry(this.portlets, name);
  }

  /**
   * Returns the first entry in the current PSML resource corresponding to the
   * given entry id
   * 
   * @param entryId
   *          the portlet's entry id to seek
   * @return the found entry description or null
   */
  @Override
  public Entry getEntryById(String entryId) {
    return getEntryById(this.portlets, entryId);
  }

  /**
   * Returns the first portlets element in the current PSML resource
   * corresponding to the given name
   * 
   * @param name
   *          the portlets name to seek
   * @return the found portlets description or null
   */
  @Override
  public Portlets getPortlets(String name) {
    Portlets p = getPortlets(this.portlets, name);

    if (p == null) {
      // maybe name is a position...
      try {
        p = getPortlets(Integer.parseInt(name));
      } catch (NumberFormatException e) {
        // this will happen if name is not parseable, ignore
      }
    }

    return p;
  }

  /**
   * Returns the first portlets element in the current PSML resource
   * corresponding to the given id
   * 
   * @param name
   *          the portlets id to seek
   * @return the found portlets description or null
   */
  @Override
  public Portlets getPortletsById(String portletId) {
    Portlets p = getPortletsById(this.portlets, portletId);
    return p;
  }

  /**
   * Returns the first portlets element in the current PSML resource found at
   * the specified position. The position is computed using a left-most tree
   * traversal algorithm of the existing portlets (thus not counting other entry
   * objects)
   * 
   * @param position
   *          the sought position
   * @return the found portlets object or null if we did not find such an object
   */
  @Override
  public Portlets getPortlets(int position) {
    return getPortlets(this.portlets, position, 0);
  }

  /**
   * Returns the first entry in the specified PSML resource corresponding to the
   * given portlet name
   * 
   * @param portlets
   *          the PSML description to look into
   * @param name
   *          the portlet name to seek
   * @return the found entry description or null
   */
  public static Entry getEntry(Portlets portlets, String name) {
    Entry entry = null;

    for (Iterator<?> it1 = portlets.getEntriesIterator(); it1.hasNext();) {
      entry = (Entry) it1.next();
      if (entry.getParent().equals(name)) {
        return (entry);
      }
    }

    entry = null;

    for (Iterator<?> it2 = portlets.getPortletsIterator(); it2.hasNext();) {
      Portlets p = (Portlets) it2.next();

      entry = getEntry(p, name);

      if (entry != null) {
        break;
      }
    }

    return (entry);
  }

  /**
   * Returns the first entry in the specified PSML resource corresponding to the
   * given portlet Id
   * 
   * @param portlets
   *          the PSML description to look into
   * @param entryId
   *          the portlet's entry id to seek
   * @return the found entry description or null
   */
  public static Entry getEntryById(Portlets portlets, String entryId) {
    Entry entry = null;

    for (Iterator<?> it1 = portlets.getEntriesIterator(); it1.hasNext();) {
      entry = (Entry) it1.next();
      if ((entry.getId() != null) && entry.getId().equals(entryId)) {
        return (entry);
      }
    }

    entry = null;

    for (Iterator<?> it2 = portlets.getPortletsIterator(); it2.hasNext();) {
      Portlets p = (Portlets) it2.next();

      entry = getEntryById(p, entryId);

      if (entry != null) {
        break;
      }
    }

    return (entry);
  }

  /**
   * Returns the first portlets element in the specified PSML resource
   * corresponding to the given Id
   * 
   * @param portlets
   *          the PSML description to look into
   * @param portletId
   *          the portlet's id to seek
   * @return the found portlets description or null
   */
  public static Portlets getPortletsById(Portlets portlets, String portletId) {
    Portlets entry = portlets;

    if ((entry.getId() != null) && entry.getId().equals(portletId)) {
      return entry;
    }

    entry = null;

    for (Iterator<?> it2 = portlets.getPortletsIterator(); it2.hasNext();) {
      Portlets p = (Portlets) it2.next();

      entry = getPortletsById(p, portletId);

      if (entry != null) {
        break;
      }
    }

    return (entry);
  }

  /**
   * Returns the first portlets element in the specified PSML resource
   * corresponding to the given name
   * 
   * @param portlets
   *          the PSML description to look into
   * @param name
   *          the portlets name to seek
   * @return the found portlets description or null
   */
  public static Portlets getPortlets(Portlets portlets, String name) {
    Portlets entry = portlets;

    if ((entry.getName() != null) && entry.getName().equals(name)) {
      return entry;
    }

    entry = null;

    for (Iterator<?> it2 = portlets.getPortletsIterator(); it2.hasNext();) {
      Portlets p = (Portlets) it2.next();

      entry = getPortlets(p, name);

      if (entry != null) {
        break;
      }
    }

    return (entry);
  }

  /**
   * Returns the first portlets element in the specified PSML resource in the
   * given position
   * 
   * @param portlets
   *          the PSML description to look into
   * @param position
   *          the position to look for
   * @param count
   *          the numbering for the portlets passed as parameter
   * @return the found portlets description or null
   */
  public static Portlets getPortlets(Portlets portlets, int position, int count) {
    // sanity check, we never look after the sought position
    if (position < count) {
      return null;
    }

    // the base portlets is the one we're looking for...
    if (position == count) {
      return portlets;
    }

    // we need to recurse in the children
    Portlets result = null;

    for (Iterator<?> it2 = portlets.getPortletsIterator(); it2.hasNext();) {
      Portlets p = (Portlets) it2.next();
      count++;
      result = getPortlets(p, position, count);

      if (result != null) {
        break;
      }
    }

    return result;
  }

  /**
   * Remove the Entry in the specified PSML resource corresponding to the given
   * portlet Id
   * 
   * @param entryId
   *          the portlet's entry id to seek
   */
  @Override
  public boolean removeEntryById(String entryId) {
    return removeEntryById(this.portlets, entryId);
  }

  /**
   * Remove the Entry in the specified PSML resource corresponding to the given
   * portlet Id
   * 
   * @param portlets
   *          the PSML description to look into
   * @param entryId
   *          the portlet's entry id to seek
   */
  public static boolean removeEntryById(Portlets portlets, String entryId) {
    for (int i = 0; i < portlets.getEntryCount(); i++) {
      if (entryId.equals(portlets.getEntry(i).getId())) {
        portlets.removeEntry(i);
        return true;
      }
    }

    for (Iterator<?> it2 = portlets.getPortletsIterator(); it2.hasNext();) {
      Portlets p = (Portlets) it2.next();

      if (removeEntryById(p, entryId) == true) {
        return true;
      }
    }

    return false;
  }

  /**
   * Create a clone of this object
   */
  @Override
  public Object clone() throws java.lang.CloneNotSupportedException {
    Object cloned = super.clone();

    // clone the portlets
    ((BasePSMLDocument) cloned).portlets =
      ((this.portlets == null) ? null : (Portlets) this.portlets.clone());

    return cloned;
  }
}
