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

package org.apache.jetspeed.om.registry.base;

import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import org.apache.jetspeed.om.registry.Parameter;
import org.apache.jetspeed.om.registry.SkinEntry;

/**
 * The BaseSkinEntry is a bean like implementation of the SkinEntry interface
 * suitable for Castor XML serialization
 *
 * @see org.apache.jetspeed.om.registry.SkinEntry
 * @author <a href="mailto:raphael@apache.org">Rapha Luta</a>
 * @version $Id: BaseSkinEntry.java,v 1.4 2004/02/23 03:08:26 jford Exp $
 */
public class BaseSkinEntry extends BaseRegistryEntry implements SkinEntry {

  private Vector<Parameter> parameter = new Vector<Parameter>();

  private transient Map<String, Integer> nameIdx = null;

  /**
   * Implements the equals operation so that 2 elements are equal if all their
   * member values are equal.
   */
  @Override
  public boolean equals(Object object) {
    if (object == null) {
      return false;
    }

    BaseSkinEntry obj = (BaseSkinEntry) object;

    Iterator<Parameter> i = parameter.iterator();
    Iterator<?> i2 = obj.parameter.iterator();
    while (i.hasNext()) {
      BaseParameter c1 = (BaseParameter) i.next();
      BaseParameter c2 = null;

      if (i2.hasNext()) {
        c2 = (BaseParameter) i2.next();
      } else {
        return false;
      }

      if (!c1.equals(c2)) {
        return false;
      }
    }

    if (i2.hasNext()) {
      return false;
    }

    return super.equals(object);
  }

  /** @return an enumeration of this entry parameter names */
  @Override
  public Iterator<String> getParameterNames() {
    synchronized (parameter) {
      if (nameIdx == null) {
        buildNameIndex();
      }
    }

    return nameIdx.keySet().iterator();
  }

  /**
   * Search for a named parameter and return the associated parameter object.
   * The search is case sensitive.
   *
   * @return the parameter object for a given parameter name
   * @param name
   *          the parameter name to look for
   */
  @Override
  public Parameter getParameter(String name) {
    synchronized (parameter) {
      if (nameIdx == null) {
        buildNameIndex();
      }
    }

    if (name != null) {
      Integer pos = nameIdx.get(name);

      if (pos != null) {
        return parameter.elementAt(pos.intValue());
      }
    }

    return null;
  }

  /**
   * Returns a map of parameter values keyed on the parameter names
   * 
   * @return the parameter values map
   */
  @Override
  public Map<String, String> getParameterMap() {
    Hashtable<String, String> params = new Hashtable<String, String>();
    Enumeration<Parameter> en = parameter.elements();
    while (en.hasMoreElements()) {
      Parameter param = en.nextElement();
      params.put(param.getName(), param.getValue());
    }

    return params;

  }

  /**
   * Adds a new parameter for this entry
   * 
   * @param name
   *          the new parameter name
   * @param value
   *          the new parameter value
   */
  @Override
  public void addParameter(String name, String value) {
    if (name != null) {
      Parameter p = getParameter(name);
      if (p == null) {
        p = new BaseParameter();
        p.setName(name);
      }

      p.setValue(value);

      addParameter(p);

    }
  }

  /**
   * Adds a new parameter for this entry
   * 
   * @param parameter
   *          the new parameter to add
   */
  @Override
  public void addParameter(Parameter param) {
    synchronized (parameter) {
      parameter.addElement(param);
      nameIdx.put(param.getName(), new Integer(parameter.size() - 1));
    }
  }

  /**
   * Removes all parameter values associated with the name
   *
   * @param name
   *          the parameter name to remove
   */
  @Override
  public void removeParameter(String name) {
    if (name == null) {
      return;
    }

    synchronized (parameter) {
      Iterator<Parameter> i = parameter.iterator();
      while (i.hasNext()) {
        Parameter param = i.next();
        if (param.getName().equals(name)) {
          i.remove();
        }
      }

      buildNameIndex();
    }
  }

  /**
   * This method recreates the paramter name index for quick retrieval of
   * parameters by name. Shoule be called whenever a complete index of parameter
   * should be rebuilt (eg removing a parameter or setting a parameters vector)
   */
  private void buildNameIndex() {
    Hashtable<String, Integer> idx = new Hashtable<String, Integer>();

    Iterator<Parameter> i = parameter.iterator();
    int count = 0;
    while (i.hasNext()) {
      Parameter p = i.next();
      idx.put(p.getName(), new Integer(count));
      count++;
    }

    this.nameIdx = idx;
  }

  // Castor serialization accessor methods

  /**
   * Needed for Castor 0.8.11 XML serialization for retrieving the parameters
   * objects associated to this object
   */
  public Vector<Parameter> getParameters() {
    return this.parameter;
  }

  public void setParameters(Vector<Parameter> parameters) {
    this.parameter = parameters;
  }

}