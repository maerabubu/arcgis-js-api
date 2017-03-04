// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/accessorSupport/decorators","../../../symbols/support/symbolUtils","../../../core/Accessor","../../../core/promiseUtils","../../../symbols/support/jsonUtils","../../../symbols/support/gfxUtils","dojo/promise/all","dojo/i18n!../nls/SymbolStyler"],function(e,t,r,o,i,s,p,l,n,y,c,a){function u(e,t){var r=e.items.map(function(r){var o={data:e,base:t.itemUrl,filename:"data",styleName:s.styleNameFromItem(t)};return s.fetchSymbolFromStyle(o,r.name,{portal:t.portal})});return c(r)}function m(e){return e.map(function(e){return n.fromJSON(e)})}var S=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype._fetchData=function(){var e=this;return this.portalItem.fetchData().then(function(t){return e._set("data",t),t})},t}(i.declared(p));o([i.property({readOnly:!0})],S.prototype,"data",void 0),o([i.property({aliasOf:"portalItem.id"})],S.prototype,"id",void 0),o([i.property({aliasOf:"portalItem.title"})],S.prototype,"name",void 0),o([i.property()],S.prototype,"portalItem",void 0),S=o([i.subclass("esri.widgets.SymbolStyler.PortalItemSymbolSource")],S);var d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="symbol-set",t}return r(t,e),t.prototype.getSymbols=function(){return this._fetchData().then(function(e){return m(e)})},t}(i.declared(S));o([i.property({readOnly:!0})],d.prototype,"type",void 0),d=o([i.subclass("esri.widgets.SymbolStyler.SymbolSetSymbolSource")],d),t.SymbolSetSymbolSource=d;var b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="web-style",t}return r(t,e),t.prototype.getSymbols=function(){var e=this;return this._fetchData().then(function(t){return u(t,e.portalItem)})},t}(i.declared(S));o([i.property({readOnly:!0})],b.prototype,"type",void 0),b=o([i.subclass("esri.widgets.SymbolStyler.WebStyleSymbolSource")],b),t.WebStyleSymbolSource=b;var v=[{name:"Circle",type:"esriSMS",style:"esriSMSCircle",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"Square",type:"esriSMS",style:"esriSMSSquare",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"Diamond",type:"esriSMS",style:"esriSMSDiamond",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"Cross",type:"esriSMS",style:"esriSMSCross",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"X",type:"esriSMS",style:"esriSMSX",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}}],h=10,f=5,g=["circle","square","cross","x","kite"],O=[{type:"Object",resource:{primitive:"sphere"}},{type:"Object",resource:{primitive:"cylinder"},width:f,height:h,depth:f},{type:"Object",resource:{primitive:"cylinder"}},{type:"Object",resource:{primitive:"cube"},width:f,height:h,depth:f,anchor:"bottom"},{type:"Object",resource:{primitive:"cube"}},{type:"Object",resource:{primitive:"cone"},width:f,height:h,depth:f},{type:"Object",resource:{primitive:"cone"}},{type:"Object",resource:{primitive:"inverted-cone"}},{type:"Object",resource:{primitive:"diamond"}},{type:"Object",resource:{primitive:"tetrahedron"}}],w=g.map(function(e){return{type:"PointSymbol3D",symbolLayers:[{type:"Icon",resource:{primitive:e},material:{color:y.defaultThematicColor},outline:{color:[0,0,0]}}]}}),j=O.map(function(e){return{type:"PointSymbol3D",symbolLayers:[e]}}),I=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.id="basic-symbol-set",t.name=a.basic,t.type="symbol-set",t}return r(t,e),t.prototype.getSymbols=function(){return l.resolve(m(v))},t}(i.declared(p));o([i.property()],I.prototype,"id",void 0),o([i.property()],I.prototype,"name",void 0),o([i.property({readOnly:!0})],I.prototype,"type",void 0),I=o([i.subclass("esri.widgets.SymbolStyler.BasicSymbolSetSource")],I),t.BasicSymbolSetSource=I;var M=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.id="basic-web-style:flat",t.name=a.basic,t.type="web-style",t}return r(t,e),t.prototype.getSymbols=function(){return l.resolve(m(w))},t}(i.declared(p));o([i.property()],M.prototype,"id",void 0),o([i.property()],M.prototype,"name",void 0),o([i.property({readOnly:!0})],M.prototype,"type",void 0),M=o([i.subclass("esri.widgets.SymbolStyler.IconPrimitiveWebStyleSource")],M),t.IconPrimitiveWebStyleSource=M;var D=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.id="basic-web-style:volumetric",t.name=a.basic,t.type="web-style",t}return r(t,e),t.prototype.getSymbols=function(){return l.resolve(m(j))},t}(i.declared(p));o([i.property()],D.prototype,"id",void 0),o([i.property()],D.prototype,"name",void 0),o([i.property({readOnly:!0})],D.prototype,"type",void 0),D=o([i.subclass("esri.widgets.SymbolStyler.ObjectPrimitiveWebStyleSource")],D),t.ObjectPrimitiveWebStyleSource=D});