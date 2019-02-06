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

package org.apache.jetspeed.daemon;

import java.util.Hashtable;

/**
 * @author <a href="mailto:burton@apache.org">Kevin A. Burton</a>
 * @version $Id: DaemonContext.java,v 1.4 2004/02/23 02:48:57 jford Exp $
 */
public class DaemonContext {

  Hashtable<String, String> params = new Hashtable<String, String>();

  public String getParameter(String name) {
    return params.get(name);
  }
}
