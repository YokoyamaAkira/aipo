<!--

    Aipo is a groupware program developed by Aimluck,Inc.
    Copyright (C) 2004-2011 Aimluck,Inc.
    http://www.aipo.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

-->

<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"
                xmlns:rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:ocs = "http://alchemy.openjava.org/ocs/ocs-syntax#"
                xmlns:dc  = "http://purl.org/dc/elements/1.0/"
                exclude-result-prefixes="rdf ocs aocs dc"
                version   = "1.0">

    <xsl:output indent="yes"/>
                
    <xsl:template match="/rdf:RDF">

        <registry>
          <xsl:comment>DO NOT EDIT THIS FILE. IT IS AUTOGENERATED BY THE FEED DAEMON</xsl:comment>
          <xsl:comment>THE DAEMON WILL OVERRIDE YOUR CHANGES IF IT RUNS</xsl:comment>
          <xsl:apply-templates select="./rdf:description/rdf:description"/>
        </registry>

    </xsl:template>
    
    <xsl:template match="rdf:RDF/rdf:description/rdf:description">

        <!--
        Only known formats are RSS 0.90 and RSS 0.91
        -->

        <xsl:variable name="url" select="./rdf:description/@about"/>        
        <xsl:variable name="tit" select="./*[local-name()='title']"/>        
        <xsl:variable name="desc" select="./*[local-name()='description' and name() != 'rdf:description']"/>

        <xsl:variable name="format" select="./rdf:description/*[local-name()='format']"/>


        
    <!-- Uncomment to get the vars for debug
        <xsl:comment>
        Format: <xsl:value-of select="$format"/>:
        url: <xsl:value-of select="$url"/>:
        Title: <xsl:value-of select="$tit"/>:
        Desc: <xsl:value-of select="$desc"/>:
        </xsl:comment>
    -->

        <xsl:if test="$format = 'http://my.netscape.com/rdf/simple/0.9/' or
                      $format = 'http://my.netscape.com/publish/formats/rss-0.9.dtd' ">
            <portlet-entry type="ref" parent="RSS" name="{$url}">
                <url><xsl:value-of select="$url"/></url>
            <meta-info>
                <xsl:if test="$tit != ''">
                  <title><xsl:value-of select="$tit"/></title>
                </xsl:if>
                <xsl:if test="$desc != ''">
                  <description><xsl:value-of select="$desc"/></description>
                </xsl:if>
<!-- we don't support this yet
                <xsl:if test="updatePeriod != ''">
                  <updatePeriod><xsl:value-of select="updatePeriod"/></updatePeriod>
                </xsl:if>
-->
            </meta-info>
            </portlet-entry>
        </xsl:if>

        
        <xsl:if test="$format = 'http://my.netscape.com/publish/formats/rss-0.91.dtd'
           ">
            <portlet-entry type="ref" parent="RSS" name="{$url}">
                <url><xsl:value-of select="$url"/></url>
            <meta-info>
                <xsl:if test="$tit != ''">
                  <title><xsl:value-of select="$tit"/></title>
                </xsl:if>
                <xsl:if test="$desc != ''">
                  <description><xsl:value-of select="$desc"/></description>
                </xsl:if>
<!-- we don't support this yet
                <xsl:if test="updatePeriod != ''">
                  <updatePeriod><xsl:value-of select="updatePeriod"/></updatePeriod>
                </xsl:if>
-->
            </meta-info>
            </portlet-entry>
        </xsl:if>


            
    </xsl:template>


</xsl:stylesheet>

