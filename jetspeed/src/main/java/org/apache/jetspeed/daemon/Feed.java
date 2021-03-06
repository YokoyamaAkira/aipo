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

public class Feed {
    
    private String name = "";
    private String description = "";
    private String url = "";

    public Feed( String name,
                 String description, 
                 String url ) {

        this.name = name;
        this.description = description;
        this.url = url;

    }
    
    public String getName() {return this.name;}
    public String getDescription() {return this.description;}
    public String getURL() {return this.url;}
}
