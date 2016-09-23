// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["require","exports","dojo/i18n!../nls/basemaps"],function(e,r,s){var a={streets:{id:"streets",title:s.streets,thumbnailUrl:e.toUrl("../images/basemap/streets.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",showLegend:!1}]},satellite:{id:"satellite",title:s.satellite,thumbnailUrl:e.toUrl("../images/basemap/satellite.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",showLegend:!1}]},hybrid:{id:"hybrid",title:s.hybrid,thumbnailUrl:e.toUrl("../images/basemap/hybrid.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",showLegend:!1},{url:"//services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer",isReference:!0,showLegend:!1}]},terrain:{id:"terrain",title:s.terrain,thumbnailUrl:e.toUrl("../images/basemap/terrain.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer",showLegend:!1},{url:"//services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer",isReference:!0,showLegend:!1}]},topo:{id:"topo",title:s.topo,thumbnailUrl:e.toUrl("../images/basemap/topo.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer",showLegend:!1}]},gray:{id:"gray",title:s.gray,thumbnailUrl:e.toUrl("../images/basemap/gray.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer",showLegend:!1},{url:"//services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer",isReference:!0,showLegend:!1}]},"dark-gray":{id:"dark-gray",title:s["dark-gray"],thumbnailUrl:e.toUrl("../images/basemap/dark-gray.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer",showLegend:!1},{url:"//services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer",isReference:!0,showLegend:!1}]},oceans:{id:"oceans",title:s.oceans,thumbnailUrl:e.toUrl("../images/basemap/oceans.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer",showLegend:!1},{url:"//services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer",isReference:!0,showLegend:!1}]},"national-geographic":{id:"national-geographic",title:s["national-geographic"],thumbnailUrl:e.toUrl("../images/basemap/national-geographic.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer",showLegend:!1}]},osm:{id:"osm",title:s.osm,thumbnailUrl:e.toUrl("../images/basemap/osm.jpg"),baseMapLayers:[{layerType:"OpenStreetMap",showLegend:!1}]},"dark-gray-vector":{id:"dark-gray-vector",title:s["dark-gray"],thumbnailUrl:e.toUrl("../images/basemap/dark-gray.jpg"),baseMapLayers:[{url:"//www.arcgis.com/sharing/rest/content/items/850db44b9eb845d3bd42b19e8aa7a024/resources/styles/root.json",layerType:"VectorTileLayer"}]},"gray-vector":{id:"gray-vector",title:s.gray,thumbnailUrl:e.toUrl("../images/basemap/gray.jpg"),baseMapLayers:[{url:"//www.arcgis.com/sharing/rest/content/items/0e02e6f86d02455091796eaae811d9b5/resources/styles/root.json",layerType:"VectorTileLayer"}]},"streets-vector":{id:"streets-vector",title:s.streets,thumbnailUrl:e.toUrl("../images/basemap/streets.jpg"),baseMapLayers:[{url:"//www.arcgis.com/sharing/rest/content/items/4e1133c28ac04cca97693cf336cd49ad/resources/styles/root.json",layerType:"VectorTileLayer"}]},"topo-vector":{id:"topo-vector",title:s.topo,thumbnailUrl:e.toUrl("../images/basemap/topo.jpg"),baseMapLayers:[{url:"//www.arcgis.com/sharing/rest/content/items/6f65bc1351b7411588a8cb43fe23dad7/resources/styles/root.json",layerType:"VectorTileLayer"}]},"streets-night-vector":{id:"streets-night-vector",title:s["streets-night-vector"],thumbnailUrl:e.toUrl("../images/basemap/streets-night.jpg"),baseMapLayers:[{url:"//www.arcgis.com/sharing/rest/content/items/bf79e422e9454565ae0cbe9553cf6471/resources/styles/root.json",layerType:"VectorTileLayer"}]},"streets-relief-vector":{id:"streets-relief-vector",title:s["streets-relief-vector"],thumbnailUrl:e.toUrl("../images/basemap/streets-relief.jpg"),baseMapLayers:[{url:"//services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",showLegend:!1},{url:"//www.arcgis.com/sharing/rest/content/items/2e063e709e3446459f8538ed6743f879/resources/styles/root.json",layerType:"VectorTileLayer",showLegend:!1}]},"streets-navigation-vector":{id:"streets-navigation-vector",title:s["streets-navigation-vector"],thumbnailUrl:e.toUrl("../images/basemap/streets-navigation.jpg"),baseMapLayers:[{url:"//www.arcgis.com/sharing/rest/content/items/dcbbba0edf094eaa81af19298b9c6247/resources/styles/root.json",layerType:"VectorTileLayer"}]}};return a});