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

define(["../../../../core/declare","../../../../core/watchUtils","../../support/PreallocArray","../../lib/glMatrix","../../webgl-engine/lib/Util","../../webgl-engine/materials/HUDMaterial"],function(e,i,t,a,s,c){function r(e,i){return i.posView-e.posView}var n,l=!1,o=!1,h=a.mat4d,u=a.vec3d,d=a.vec2d,f=a.vec4d,_=s.lerp,m=s.VertexAttrConstants,p="VISIBILITY_LABELMANAGER",y=[[-1,-1],[1,-1],[1,1],[-1,1]],g=f.create(),b=f.create(),v=f.create(),M=f.create(),x=d.create(),B=d.create(),w=f.create(),V=f.create(),S=f.create(),T=u.create(),G=d.create(),I=f.create(),z=u.create(),N=u.create(),A=h.create(),X=u.create(),L=f.create(),Y=new t(100),E=function(e,i){this.constructor=e,this.releaser=i,this.list=[],this.currentIndex=0};E.prototype.alloc=function(){return this.currentIndex>=this.list.length&&this.list.push(this.constructor.apply(this,arguments)),this.list[this.currentIndex++]},E.prototype.freeAll=function(e){for(var i=this.currentIndex,t=this.releaser,a=this.list;--i>=0;)t(a[i]);this.currentIndex=0};var D=new E(function(){return{labelGraphics:null,c3dGraphic:null,positions:[d.create(),d.create(),d.create(),d.create()],xMin:0,xMax:0,yMin:0,yMax:0,posView:0,layerView:null,labelId:0}},function(e){e.layerGraphics=null,e.c3dGraphic=null,e.layerView=null}),P=e(null,{constructor:function(e){this.layerViews=[],this.view=e,this.stage=e._stage,this._deconflictTimeoutId=0,this._cameraListener=i.on(e,"navigation","targetViewChanged",this._targetViewChanged.bind(this)),this._viewReadyWatcher=e.watch("ready",function(e){!e&&this._deconflictTimeoutId&&(clearTimeout(this._deconflictTimeoutId),this._deconflictTimeoutId=0)}.bind(this))},destroy:function(){this._cameraListener.remove(),0!==this._deconflictTimeoutId&&(clearTimeout(this._deconflictTimeoutId),this._deconflictTimeoutId=0),this._viewReadyWatcher.remove()},addSceneServiceLayerView:function(e){this.layerViews.push(e)},setDirty:function(){this._deconflictLabelsTimeout(10)},setInitialLabelGraphicState:function(e){e.setVisibilityFlag(p,!1)},removeSceneServiceLayerView:function(e){var i=this.layerViews.indexOf(e);i>=0&&this.layerViews.splice(i,1)},_drawPoly:function(e,i,t){var a;for(e.beginPath(),e.lineWidth="1",e.strokeStyle=t,e.moveTo(i[0][0],i[0][1]),a=1;4>a;a++)e.lineTo(i[a][0],i[a][1]),e.stroke();e.lineTo(i[0][0],i[0][1]),e.stroke(),e.closePath()},_tmp_vec:d.create(),_doesIntersectExistingPoly:function(e){var i,t,a,s,c,r,n,l,o,h,u,f,_,m,p,y,g,b,v,M=this._tmp_vec,x=e.positions,B={};for(i=Math.floor(e.xMin/this._accBinsSizeX);i<=Math.floor(e.xMax/this._accBinsSizeX);i++)if(!(0>i||i>=this._accBinsNumX))for(t=Math.floor(e.yMin/this._accBinsSizeY);t<=Math.floor(e.yMax/this._accBinsSizeY);t++)if(!(0>t||t>=this._accBinsNumY)){a=this._accBins[i][t];e:for(s=0;s<a.length;s++)if(c=a.data[s],null==B[c.labelId]){for(B[c.labelId]=!0,r=c.positions,this._accNumTests++,o=0;2>o;o++){n=0===o?x:r,l=0===o?r:x;i:for(y=0;4>y;y++){for(h=n[y],u=n[(y+1)%4],f=n[(y+2)%4],M[0]=u[0]-h[0],M[1]=u[1]-h[1],_=d.normalize(M),m=_[1],_[1]=_[0],_[0]=-m,b=_[0]*h[0]+_[1]*h[1],v=_[0]*f[0]+_[1]*f[1]<b,g=0;4>g;g++)if(f=l[g],p=_[0]*f[0]+_[1]*f[1],v&&b>p||!v&&p>b)continue i;continue e}}return!0}}return!1},_accBinsNumX:15,_accBinsNumY:20,_accBinsSizeX:0,_accBinsSizeY:0,_accBins:null,_accNumTests:0,_initBins:function(e,i){var a,s,c;if(null==this._accBins)for(this._accBins=[],a=0;a<this._accBinsNumX;a++)for(this._accBins.push([]),c=this._accBins[this._accBins.length-1],s=0;s<this._accBinsNumY;s++)c.push(new t(10));for(a=0;a<this._accBinsNumX;a++)for(s=0;s<this._accBinsNumY;s++)this._accBins[a][s].clear();this._accBinsSizeX=e/this._accBinsNumX,this._accBinsSizeY=i/this._accBinsNumY,this._accNumTests=0},_addToBins:function(e){var i,t;for(i=Math.floor(e.xMin/this._accBinsSizeX);i<=Math.floor(e.xMax/this._accBinsSizeX);i++)if(!(0>i||i>=this._accBinsNumX))for(t=Math.floor(e.yMin/this._accBinsSizeY);t<=Math.floor(e.yMax/this._accBinsSizeY);t++)0>t||t>=this._accBinsNumY||this._accBins[i][t].push(e)},_accDrawDebug:function(e){var i,t,a,s,c,r,n,l=[d.create(),d.create(),d.create(),d.create()],o=0;for(i=0;i<this._accBinsNumX;i++)for(t=0;t<this._accBinsNumY;t++)a=this._accBins[i][t],o+=a.length,s=i*this._accBinsSizeX,c=(i+1)*this._accBinsSizeX,r=t*this._accBinsSizeY,n=(t+1)*this._accBinsSizeY,l[0][0]=s,l[0][1]=r,l[1][0]=c,l[1][1]=r,l[2][0]=c,l[2][1]=n,l[3][0]=s,l[3][1]=n,e.fillText(a.length.toFixed(),s+5,r+15),this._drawPoly(e,l,"blue");e.fillText("total totalShownLabels: "+o,70,40)},_targetViewChanged:function(){this._deconflictLabelsTimeout()},_deconflictLabelsTimeout:function(e){e=e||200,0===this._deconflictTimeoutId&&(this._deconflictTimeoutId=setTimeout(this._deconflictLabels.bind(this),e))},_deconflictLabels:function(){var e=this.view;this._deconflictTimeoutId=0,D.freeAll();var i=e.navigation.targetCamera,t=i.viewMatrix,a=1/Math.tan(i.fovX/2),s=i.projectionMatrix,E=i.fullWidth,P=i.fullHeight;if(l||o){null==n&&(n=document.createElement("canvas"),n.setAttribute("id","canvas2d"),this.view.surface.parentNode.appendChild(n)),n.setAttribute("width",i.width),n.setAttribute("height",i.height),n.setAttribute("style","position:absolute;left:0px;top:0px;display:block;pointer-events:none;");var C=document.getElementById("canvas2d"),U=C.getContext("2d");U.clearRect(0,0,i.width,i.height),U.font="8px Arial"}Y.clear();for(var F={},k=!1,O=0;O<this.layerViews.length;O++){var R=this.layerViews[O];if(null!=R.layerLabelsEnabled&&R.layerLabelsEnabled()&&null!=R.getGraphics3DGraphics&&null!=R.getGraphics3DGraphicsKeys){k||(this._initBins(E,P),k=!0);for(var W=R.getGraphics3DGraphics(),j=R.getGraphics3DGraphicsKeys(),H=0;H<j.length;H++){var K=W[j[H]];if(!(null==K._labelGraphics||K._labelGraphics.length<1)&&K.areVisibilityFlagsSet(void 0,p)){var Z=K._labelGraphics[0],q=Z.stageObject,J=q.getGeometryRecord(0);if(null!=J){var Q=J.materials[0];if(null!=Q&&Q instanceof c&&null!=J.origin){e=t;var $=q.getCenter(),ee=J.origin.vec3;f.set4($[0]-ee[0],$[1]-ee[1],$[2]-ee[2],1,g),h.translate(e,ee,A),e=A,h.multiplyVec4(e,g,b);for(var ie=J.geometry.getData().getVertexAttr()[m.AUXPOS1],te=0;3>te;te++)b[te]+=ie.data[te];h.multiplyVec4(s,b,v),f.scale(v,1/Math.abs(v[3]),M),d.set2(_(0,E,.5+.5*M[0]),_(0,P,.5+.5*M[1]),G);var ae=M[0]<-1||M[1]<-1||M[2]<-1||M[0]>=1||M[1]>=1;if(ae){for(var se=!1,ce=0;ce<K._labelGraphics.length;ce++)se=se||K._labelGraphics[ce].setVisibilityFlag(p,!1);se&&(F[R]=!0)}else{var re=Q.getParams(),ne=J.geometry.getData().getVertexAttr()[m.SIZE].data;d.subtract(re.anchorPos,[.5,.5],x),d.scale(re.screenOffset,.5,B);var le=D.alloc();if(re.direction){var oe,he,ue=u.set3(Z.geometry.normal[0],Z.geometry.normal[1],Z.geometry.normal[2],z),de=u.normalize(u.subtract(i.eye,i.center,w),w),fe=u.normalize(u.set(re.direction,N)),_e=0;u.scale(fe,u.dot(fe,de),T),u.subtract(de,T,T),u.normalize(T);var me=Math.abs(u.dot(T,ue)),pe=Math.abs(u.dot(de,fe));.985>pe&&.5>me?.422>me?(oe=fe,he=ue,_e=.5):(oe=fe,he=X,u.cross(fe,T,he),_e=u.dot(he,ue)/2):(oe=fe,he=u.normalize(u.cross(ue,fe)));var ye,ge=u.dist(i.eye,$)/a/i.width*2,be=ge*re.screenMinMaxSize[0],ve=ge*re.screenMinMaxSize[1];for(re.worldScale?(ye=1,be>0&&be>ne[1]&&(ye=be/ne[1]),ve>0&&ne[1]>ve&&(ye=ve/ne[1])):ye=.5*v[3]/E,te=0;4>te;te++){f.set(g,L),u.add(L,u.scale(oe,y[te][0]*ne[0]*ye,V)),u.add(L,u.scale(he,(y[te][1]+_e)*ne[1]*ye,S)),h.multiplyVec4(e,L,w);var Me=h.multiplyVec4(s,w,V);f.scale(Me,1/Math.abs(Me[3]),Me),le.positions[te][0]=_(0,E,.5+.5*Me[0]),le.positions[te][1]=P-_(0,P,.5+.5*Me[1])}}else if(re.worldScale)for(ge=u.dist(i.eye,$)/a/i.width*2,be=ge*re.screenMinMaxSize[0],ve=ge*re.screenMinMaxSize[1],ye=1,be>0&&be>ne[1]&&(ye=be/ne[1]),ve>0&&ne[1]>ve&&(ye=ve/ne[1]),te=0;4>te;te++)I[0]=b[0]+(.5*y[te][0]-x[0])*ne[0]*ye,I[1]=b[1]+(.5*y[te][1]-x[1])*ne[1]*ye,Me=h.multiplyVec4(s,I,w),f.scale(Me,1/Math.abs(Me[3]),Me),le.positions[te][0]=_(0,E,.5+.5*Me[0])+B[0],le.positions[te][1]=P-_(0,P,.5+.5*Me[1])-B[1];else{var xe=u.dist(i.eye,g);for(te=0;4>te;te++)le.positions[te][0]=G[0]+(.5*y[te][0]-x[0])*ne[0]+B[0],le.positions[te][1]=P-G[1]+(.5*y[te][1]+x[1])*ne[1]-B[1]}xe=b[2],K.areVisibilityFlagsSet(p,void 0)&&(xe*=.7),le.labelId=Y.length,le.xMin=Number.MAX_VALUE,le.yMin=Number.MAX_VALUE,le.xMax=-Number.MAX_VALUE,le.yMax=-Number.MAX_VALUE;for(var Be=0;4>Be;Be++)le.xMin=Math.min(le.positions[Be][0],le.xMin),le.yMin=Math.min(le.positions[Be][1],le.yMin),le.xMax=Math.max(le.positions[Be][0],le.xMax),le.yMax=Math.max(le.positions[Be][1],le.yMax);le.labelGraphics=K._labelGraphics,le.c3dGraphic=K,le.posView=xe,le.layerView=R,Y.push(le)}}}}}}}for(Y.sort(r),O=0;O<Y.length;O++){var we=Y.data[O];if(se=!1,R=we.layerView,this._doesIntersectExistingPoly(we))for(l&&this._drawPoly(U,we.positions,"red"),te=0;te<we.labelGraphics.length;te++)se=se||we.labelGraphics[te].setVisibilityFlag(p,!1);else for(this._addToBins(we),l&&this._drawPoly(U,we.positions,"green"),te=0;te<we.labelGraphics.length;te++)se=se||we.labelGraphics[te].setVisibilityFlag(p,!0);se&&we.c3dGraphic.isDraped()&&(F[R]=!0),Object.keys(F).forEach(function(e){e.emit&&e.emit("draped-data-change")})}o&&(this._accDrawDebug(U),U.fillText("total visible labels: "+Y.length,70,50),U.fillText("total numTests: "+this._accNumTests,70,30))}});return P});