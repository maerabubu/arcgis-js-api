// COPYRIGHT © 2015 Esri
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
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/Deferred","../../../kernel"],function(e,n,t,i,o,r){var s=e(null,{constructor:function(e){n.mixin(this,e)},fetchOptionWidgets:function(){var e=new o,n=null,i=[];return t.forEach(this.getChildren(),function(e){e._isGxeOptions?n=e:e._isGxeOption&&i.push(e)}),null===n?(e.resolve(i),e):n.fetchOptionWidgets()}});return i("extend-esri")&&n.setObject("dijit.metadata.base.OptionsMixin",s,r),s});