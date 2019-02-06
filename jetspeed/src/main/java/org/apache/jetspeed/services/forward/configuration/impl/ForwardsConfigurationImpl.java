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

package org.apache.jetspeed.services.forward.configuration.impl;

import java.util.ArrayList;
import java.util.Collection;

import org.apache.jetspeed.services.forward.configuration.ForwardsConfiguration;

/**
 * Forwards Configuration Implementation
 * 
 * @author <a href="mailto:taylor@apache.org">David Sean Taylor</a>
 * @version $Id: ForwardsConfigurationImpl.java,v 1.2 2004/02/23 03:50:10 jford
 *          Exp $
 */
public class ForwardsConfigurationImpl implements ForwardsConfiguration,
    java.io.Serializable {
  protected Collection<Object> forwards = new ArrayList<Object>();

  protected Collection<Object> portletForwards = new ArrayList<Object>();

  public int getForwardsCount() {
    return this.forwards.size();
  }

  public void setForwards(Collection<Object> forwards) {
    this.forwards = forwards;
  }

  @Override
  public Collection<Object> getForwards() {
    return this.forwards;
  }

  public int getPortletForwardsCount() {
    return this.forwards.size();
  }

  public void setPortletForwards(Collection<Object> portletForwards) {
    this.portletForwards = portletForwards;
  }

  @Override
  public Collection<Object> getPortletForwards() {
    return this.portletForwards;
  }

}
