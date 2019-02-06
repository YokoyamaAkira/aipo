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

package org.apache.jetspeed.services.search;

import java.util.HashSet;
import java.util.Set;

/**
 * Abstract handler that new handlers can dervie from
 * 
 * @author <a href="mailto:jford@apache.org">Jeremy Ford</a>
 * @version $Id: AbstractObjectHandler.java,v 1.3 2004/02/23 03:48:47 jford Exp
 *          $
 */
public abstract class AbstractObjectHandler implements ObjectHandler {
  protected final HashSet<Object> fields = new HashSet<Object>();

  protected final HashSet<Object> keywords = new HashSet<Object>();

  /**
   * @see org.apache.jetspeed.services.search.ObjectHandler#getFields()
   */
  @Override
  public Set<Object> getFields() {
    return fields;
  }

  /**
   * @see org.apache.jetspeed.services.search.ObjectHandler#getKeywords()
   */
  @Override
  public Set<Object> getKeywords() {
    return keywords;
  }

}
