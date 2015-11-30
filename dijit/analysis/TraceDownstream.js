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
define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/NumberSpinner","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","../../symbols/SimpleFillSymbol","../../symbols/SimpleLineSymbol","../../toolbars/draw","../PopupTemplate","../../layers/FeatureLayer","../../graphic","./utils","./CreditEstimator","../../symbols/PictureMarkerSymbol","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","dojo/i18n!../../nls/jsapi","dojo/text!./templates/TraceDownstream.html"],function(t,e,i,s,n,a,o,r,h,l,u,c,d,y,p,_,m,g,L,f,b,v,w,S,D,P,x,A,C,I,j,N,U,T,B,F,O,k,E,M,q,R,J,G,H,z,W,Y,K,V){var Q=e([m,g,L,f,b,F,B],{declaredClass:"esri.dijit.analysis.TraceDownstream",templateString:V,widgetsInTemplate:!0,inputLayer:null,boundingPolygonLayer:null,outputLayerName:null,splitDistance:null,splitUnits:"Kilometers",maxDistance:null,maxDistanceUnits:"Kilometers",getResultLyrInfos:!1,i18n:null,map:null,toolName:"TraceDownstream",helpFileName:"TraceDownstream",resultParameter:"traceLayer",constructor:function(t){this._pbConnects=[],t.containerNode&&(this.container=t.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,K.findHotSpotsTool),i.mixin(this.i18n,K.traceDownstreamTool),this.set("drawLayerName",this.i18n.blayerName),this.set("drawPointLayerName",this.i18n.pointlayerName)},postCreate:function(){this.inherited(arguments),p.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(t){t&&(this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,function(t,e){return t===this._featureLayer?(this._boundingAreaSelect.removeOption({value:e+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(e,1)):void 0},this)),this._pointfeatureLayer&&(this.map.removeLayer(this._pointfeatureLayer),s.forEach(this.predictAtPointLayers,function(t,e){return t===this._pointfeatureLayer?(this._analysisSelect.removeOption({value:e+1,label:this._pointfeatureLayer.name}),void this.inputLayers.splice(e,1)):void 0},this))),this._handleBoundingBtnChange(!1),this._handleInputDrawPointChange(!1),this.emit("close",{save:!t})},clear:function(){this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,function(t,e){return t===this._featureLayer?(this._boundingAreaSelect.removeOption({value:e+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(e,1)):void 0},this)),this._pointfeatureLayer&&(this.map.removeLayer(this._pointfeatureLayer),s.forEach(this.predictAtPointLayers,function(t,e){return t===this._pointfeatureLayer?(this._predictPointSelect.removeOption({value:e+1,label:this._pointfeatureLayer.name}),void this.predictAtPointLayers.splice(e,1)):void 0},this)),this._handleBoundingBtnChange(!1),this._handleInputDrawPointChange(!1)},_handleShowCreditsClick:function(t){t.preventDefault();var e={};this._form.validate()&&(e.inputLayer=o.toJson(J.constructAnalysisInputLyrObj(this.get("inputLayer"))),this.get("boundingPolygonLayer")&&(e.boundingPolygonLayer=o.toJson(J.constructAnalysisInputLyrObj(this.boundingPolygonLayer))),this.get("maxDistance")&&(e.maximumDistance=this.get("maxDistance"),e.maxDistanceUnits=this.get("maxDistanceUnits")),this.get("splitDistance")&&(e.splitDistance=this.get("splitDistance"),e.splitUnits=this.get("splitUnits")),this.returnFeatureCollection||(e.OutputName=o.toJson({serviceProperties:{name:this.get("outputLayerName")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,e).then(i.hitch(this,function(t){this._usageForm.set("content",t),this._usageDialog.show()})))},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var t,e={},i={};e.inputLayer=o.toJson(J.constructAnalysisInputLyrObj(this.get("inputLayer"))),this.get("boundingPolygonLayer")&&(e.boundingPolygonLayer=o.toJson(J.constructAnalysisInputLyrObj(this.boundingPolygonLayer))),this.get("maxDistance")&&(e.maxDistance=this.get("maxDistance"),e.maxDistanceUnits=this.get("maxDistanceUnits")),this.get("splitDistance")&&(e.splitDistance=this.get("splitDistance"),e.splitUnits=this.get("splitUnits"),this.getResultLyrInfos=!0),this.returnFeatureCollection||(e.OutputName=o.toJson({serviceProperties:{name:this.get("outputLayerName")}})),this.showChooseExtent&&!this.get("DisableExtent")&&this._useExtentCheck.get("checked")&&(e.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),e.context=o.toJson(t)),e.returnFeatureCollection=this.returnFeatureCollection,i.jobParams=e,i.itemParams={description:this.i18n.itemDescription,tags:l.substitute(this.i18n.itemTags,{layername:this.inputLayer.name,fieldname:e.field?e.field:""}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(i.itemParams.folder=this.get("folderId")),console.log(i),this.execute(i)}},_save:function(){},_buildUI:function(){this._loadConnections(),this.signInPromise.then(i.hitch(this,J.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(!this.get("inputLayer")&&this.get("inputLayers")&&this.set("inputLayer",this.inputLayers[0]),J.populateAnalysisLayers(this,"inputLayer","inputLayers",{posIncrement:1}));var t=[{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}],e=!0;if(this._splitTraceUnitsSelect.addOption(t),this._maxTraceUnitsSelect.addOption(t),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this.inputLayer&&this._updateAnalysisLayerUI(e),this.maxDistanceUnits&&this._maxTraceUnitsSelect.set("value",this.maxDistanceUnits),this.maxDistance&&this._maxTraceInput.set("value",this.maxDistance),this.splitUnits&&this._splitTraceUnitsSelect.set("value",this.splitUnits),this.splitDistance&&this._splitTraceInput.set("value",this.splitDistance),this.boundingPolygonLayers){this._boundingAreaSelect.addOption({value:"-1",label:this.i18n.defaultBoundingOption,selected:!0});var n=!1;s.forEach(this.boundingPolygonLayers,function(t,e){"esriGeometryPolygon"===t.geometryType&&(n=this.get("boundingPolygonLayer")&&this.get("boundingPolygonLayer").name===t.name,this._boundingAreaSelect.addOption({value:e+1,label:t.name,selected:n}))},this)}J.addReadyToUseLayerOption(this,[this._analysisSelect,this._boundingAreaSelect]),u.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(t){this.folderStore=t,J.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),u.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),u.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none")},_handleAnalysisLayerChange:function(t){"browse"===t?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._analysisPointDrawBtn.reset(),this._isAnalysisSelect=!0,this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"point"'),this._browsedlg.show()):(this.inputLayer=this.inputLayers[t-1],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(t){this.inputLayer&&(c.set(this._interpolateToolDescription,"innerHTML",l.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),t&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name})),this._pointfeatureLayer&&this._pointfeatureLayer.name!==this.inputLayer.name&&this._analysisPointDrawBtn.reset(),this._outputLayerInput.set("value",this.outputLayerName))},_handleBrowseItemsSelect:function(t){t&&t.selection&&J.addAnalysisReadyLayer({item:t.selection,layers:this._isAnalysisSelect?this.inputLayers:this.boundingPolygonLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._boundingAreaSelect,posIncrement:this._isAnalysisSelect?0:1,browseDialog:this._browsedlg,widget:this}).always(i.hitch(this,this._updateAnalysisLayerUI,!0))},_handleBoundingSelectChange:function(t){"browse"===t?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._isAnalysisSelect=!1,this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"polygon"'),this._browsedlg.show()):"-1"===t||this._featureLayer&&this.get("boundingPolygonLayer").id===this._featureLayer.id?this._bndgPolyDrawBtn.set("disabled",!1):(this._bndgPolyDrawBtn.set("disabled",!0),this._bndgPolyDrawBtn.set("checked",!1))},_handleBoundingBtnChange:function(t){t?(this.emit("drawtool-activate",{}),this._featureLayer||this._createBoundingPolyFeatColl(),this._analysisPointDrawBtn.set("checked",!1),this._toolbar.activate(E.POLYGON)):(this._toolbar.deactivate(),this._analysisPointDrawBtn.get("checked")||this.emit("drawtool-deactivate",{}))},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!1)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!0))},_createBoundingPolyFeatColl:function(){var t=J.createPolygonFeatureCollection(this.drawLayerName);this._featureLayer=new q(t,{id:this.drawLayerName}),this.map.addLayer(this._featureLayer),n.connect(this._featureLayer,"onClick",i.hitch(this,function(t){this.map.infoWindow.setFeatures([t.graphic])}))},_addFeatures:function(t){var e=[],i={},n=new O(O.STYLE_NULL,new k(k.STYLE_SOLID,new a([0,0,0]),4)),o=new R(t,n);if(this.map.graphics.add(o),i.description="blayer desc",i.title="blayer",o.setAttributes(i),e.push(o),this._featureLayer.applyEdits(e,null,null),0===this.boundingPolygonLayers.length||this.boundingPolygonLayers[this.boundingPolygonLayers.length-1]!==this._featureLayer){var r=this.boundingPolygonLayers.push(this._featureLayer),h=this._boundingAreaSelect.getOptions();this._boundingAreaSelect.removeOption(h),h=s.map(h,function(t){return t.selected=!1,t}),h.push({value:r,label:this._featureLayer.name,selected:!0}),this._boundingAreaSelect.addOption(h)}},_handleInputDrawPointChange:function(t){t?(this.emit("drawtool-activate",{}),this._pointfeatureLayer||this._createPointFeatColl(),this._pointtoolbar.activate(E.POINT),this._bndgPolyDrawBtn.set("checked",!1)):(this._pointtoolbar.deactivate(),this._bndgPolyDrawBtn.get("checked")||this.emit("drawtool-deactivate",{}))},_createPointFeatColl:function(){var t=J.createPointFeatureCollection(this.drawPointLayerName);this._pointfeatureLayer=new q(t,{id:this.drawPointLayerName}),this.map.addLayer(this._pointfeatureLayer),n.connect(this._pointfeatureLayer,"onClick",i.hitch(this,function(t){this.map.infoWindow.setFeatures([t.graphic])}))},_addPointFeatures:function(t){var e=[],i={},n=new H({height:24,width:24,contentType:"image/png",type:"esriPMS",url:"http://static.arcgis.com/images/Symbols/Basic/GreenStickpin.png"}).setOffset(0,12),a=new R(t,n);if(this.map.graphics.add(a),i.description="blayer desc",i.title="blayer",a.setAttributes(i),e.push(a),this._pointfeatureLayer.applyEdits(e,null,null),0===this.inputLayers.length||this.inputLayers[this.inputLayers.length-1]!==this._pointfeatureLayer){this.inputLayers.push(this._pointfeatureLayer);var o=this.inputLayers.length-1,r=this._analysisSelect.getOptions();this._analysisSelect.removeOption(r),r=s.map(r,function(t){return t.selected=!1,t}),this._analysisSelect.addOption({value:o+1,label:this._pointfeatureLayer.name,selected:!0}),this._analysisSelect.addOption(r),this._handleAnalysisLayerChange(o+1)}},validateServiceName:function(t){return J.validateServiceName(t,{textInput:this._outputLayerInput})},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(t){this.inputLayer=t},_getInputLayerAttr:function(){return this.inputLayer},_setInputLayersAttr:function(t){this.inputLayers=t},_getBoundingPolygonLayerAttr:function(){return this._boundingAreaSelect&&(this.boundingPolygonLayer=null,"-1"!==this._boundingAreaSelect.get("value")&&(this.boundingPolygonLayer=this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1])),this.boundingPolygonLayer},_setBoundingPolygonLayerAttr:function(t){this.boundingPolygonLayer=t},_setBoundingPolygonLayersAttr:function(t){this.boundingPolygonLayers=t},_setSplitUnitsAttr:function(t){this.splitUnits=t},_getSplitUnitsAttr:function(){return this._splitTraceUnitsSelect&&this._splitTraceUnitsSelect.get("value")&&(this.splitUnits=this._splitTraceUnitsSelect.get("value")),this.splitUnits},_setSplitDistanceAttr:function(t){this.splitDistance=t},_getSplitDistanceAttr:function(){return this._splitTraceInput&&this._splitTraceInput.get("value")&&(this.splitDistance=this._splitTraceInput.get("value")),this.splitDistance},_setMaxDistanceUnitsAttr:function(t){this.maxDistanceUnits=t},_getMaxDistanceUnitsAttr:function(){return this._maxTraceUnitsSelect&&this._maxTraceUnitsSelect.get("value")&&(this.maxDistanceUnits=this._maxTraceUnitsSelect.get("value")),this.maxDistanceUnits},_setMaxDistanceAttr:function(t){this.maxDistance=t},_getMaxDistanceAttr:function(){return this._maxTraceInput&&this._maxTraceInput.get("value")&&(this.maxDistance=this._maxTraceInput.get("value")),this.maxDistance},_getOutputLayerNameAttr:function(){return this._outputLayerInput&&(this.outputLayerName=this._outputLayerInput.get("value")),this.outputLayerName},_setOutputLayerNameAttr:function(t){this.outputLayerName=t},_setMapAttr:function(t){this.map=t,this._toolbar=new E(this.map),n.connect(this._toolbar,"onDrawEnd",i.hitch(this,this._addFeatures)),this._pointtoolbar=new E(this.map),n.connect(this._pointtoolbar,"onDrawEnd",i.hitch(this,this._addPointFeatures))},_getMapAttr:function(){return this.map},_setDrawLayerNameAttr:function(t){this.drawLayerName=t},_getDrawLayerNameAttr:function(){return this._featureLayer.name},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},_getDrawLayerAttr:function(){var t=[];return this._featureLayer&&t.push(this._featureLayer),this._pointfeatureLayer&&t.push(this._pointfeatureLayer),t},_setDisableExtentAttr:function(t){this._useExtentCheck.set("checked",!t),this._useExtentCheck.set("disabled",t)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_setDrawPointLayerNameAttr:function(t){this.drawPointLayerName=t},_getDrawPointLayerNameAttr:function(){return this._pointfeatureLayer.name},_connect:function(t,e,i){this._pbConnects.push(n.connect(t,e,i))}});return r("extend-esri")&&i.setObject("dijit.analysis.TraceDownstream",Q,U),Q});