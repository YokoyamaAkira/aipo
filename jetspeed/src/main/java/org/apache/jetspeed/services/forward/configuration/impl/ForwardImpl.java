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

import java.util.HashMap;
import java.util.Map;

import org.apache.jetspeed.services.forward.configuration.Forward;
import org.apache.jetspeed.services.forward.configuration.Page;
import org.apache.jetspeed.services.forward.configuration.Pane;
import org.apache.jetspeed.services.forward.configuration.Portlet;

/**
 * Basic Forward implementation
 * 
 * @author <a href="mailto:taylor@apache.org">David Sean Taylor</a>
 * @version $Id: ForwardImpl.java,v 1.4 2004/02/23 03:50:10 jford Exp $
 */
public class ForwardImpl implements Forward, java.io.Serializable {
  private Page page;

  private Pane pane;

  private Portlet portlet;

  private String name;

  private Map<Object, Object> queryParams = new HashMap<Object, Object>();

  @Override
  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public Page getPage() {
    return this.page;
  }

  public void setPage(Page page) {
    this.page = page;
  }

  @Override
  public Pane getPane() {
    return this.pane;
  }

  public void setPane(Pane pane) {
    this.pane = pane;
  }

  @Override
  public Portlet getPortlet() {
    return this.portlet;
  }

  public void setPortlet(Portlet portlet) {
    this.portlet = portlet;
  }

  @Override
  public Map<Object, Object> getQueryParams() {
    return this.queryParams;
  }

  public void setQueryParams(Map<Object, Object> queryParams) {
    this.queryParams = queryParams;
  }

}
