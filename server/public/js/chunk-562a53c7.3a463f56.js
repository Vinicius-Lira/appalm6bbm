(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-562a53c7"],{1239:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-data-table",{staticClass:"elevation-1 ma-2",attrs:{headers:t.headers,items:t.desserts,search:t.search,"footer-props":{"items-per-page-options":[8,10,12,14]}},scopedSlots:t._u([{key:"top",fn:function(){return[s("v-toolbar",{attrs:{flat:"",color:"white"}},[s("v-container",[s("v-row",[s("v-col",{attrs:{cols:"12",sm:"12",md:"5"}},[s("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Buscar","single-line":"","hide-details":"",outlined:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1),s("v-snackbar",{staticClass:"snackbar",attrs:{bottom:"bottom"===t.y,color:t.color,left:"left"===t.x,"multi-line":"multi-line"===t.mode,right:"right"===t.x,timeout:t.timeout,top:"top"===t.y,vertical:"vertical"===t.mode},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n                    "+t._s(t.textoSnackbar)+"\n                    "),s("v-btn",{attrs:{dark:"",text:"",icon:""},on:{click:function(e){t.snackbar=!1}}},[s("v-icon",{staticClass:"mr-2",on:{click:function(e){t.snackbar=!1}}},[t._v("mdi-close")])],1)],1),s("div",{staticClass:"flex-grow-1"}),s("v-dialog",{attrs:{"max-width":"1000px"},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[s("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary"}},i),[t._v("Nova")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),s("v-card-text",[s("v-container",[s("v-row",[s("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[s("v-text-field",{attrs:{rules:[function(t){return!!t||"Obrigatório prencher a hierarquia!"}],label:"Hierarquia",outlined:""},model:{value:t.editedItem.hierarquia,callback:function(e){t.$set(t.editedItem,"hierarquia",e)},expression:"editedItem.hierarquia"}})],1),s("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[s("v-text-field",{attrs:{rules:[function(t){return!!t||"Obrigatório prencher a descrição!"}],label:"Descrição",outlined:""},model:{value:t.editedItem.descricao,callback:function(e){t.$set(t.editedItem,"descricao",e)},expression:"editedItem.descricao"}})],1)],1)],1)],1),s("v-card-actions",[s("div",{staticClass:"flex-grow-1"}),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancelar")]),s("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("Salvar")])],1)],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(e){var i=e.item;return[s("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(i)}}},[t._v("\n            mdi-pencil\n        ")]),s("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(i)}}},[t._v("\n            mdi-delete\n        ")])]}},{key:"no-data",fn:function(){return[s("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("Reset")])]},proxy:!0}])})},a=[],r={data:()=>({dialog:!1,search:"",textoSnackbar:"",color:"success",mode:"",snackbar:!1,timeout:6e3,x:null,y:"top",rowsPerPageItems:[8,12,15],pagination:{rowsPerPage:20},headers:[{text:"Hierarquia",align:"left",sortable:!0,value:"hierarquia"},{text:"Descrição",value:"descricao"},{text:"Ações",value:"action",sortable:!1}],desserts:[],editedIndex:-1,editedItem:{hierarquia:"",descricao:"",createdAt:"",updatedAt:""},defaultItem:{hierarquia:"",descricao:"",createdAt:"",updatedAt:""}}),computed:{formTitle(){return-1===this.editedIndex?"Nova Hierarquia":"Editar Hierarquia"}},watch:{dialog(t){t||this.close()}},created(){this.initialize()},methods:{initialize(){this.axios.get("http://localhost:3000/api/hierarquia").then(t=>{this.desserts=t.data})},editItem(t){this.editedIndex=this.desserts.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem(t){this.axios.delete("http://localhost:3000/api/hierarquia/"+t.id+"/delete").then(t=>{t.data?(this.snackbar=!0,this.color="success",this.textoSnackbar="Hierarquia apagada com sucesso!",this.initialize()):(this.snackbar=!0,this.color="error",this.textoSnackbar="Ocorreu um erro ao tentar apagar o registro!")})},close(){this.dialog=!1,setTimeout(()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1},300)},validaCampos(){return""!=this.editedItem.abreviacao&&""!=this.editedItem.descricao},save(){this.editedIndex>-1?this.axios.put("http://localhost:3000/api/hierarquia",this.editedItem).then(t=>{t.data?(this.textoSnackbar="Registro atualizado com sucesso!",this.snackbar=!0,this.color="success",this.initialize(),this.close()):(this.snackbar=!0,this.color="error",this.textoSnackbar="Ocorreu um erro ao atualizar!",this.close())}):this.validaCampos()?this.axios.post("http://localhost:3000/api/hierarquia",this.editedItem).then(t=>{t.data.id?(this.textoSnackbar="Hierarquia inserido com sucesso!",this.snackbar=!0,this.color="success",this.initialize(),this.close()):(this.snackbar=!0,this.color="error",this.textoSnackbar="Ocorreu um erro ao cadastrar!",this.close())}):(this.snackbar=!0,this.color="error",this.textoSnackbar="Existe campos vazios ou incorretos!",this.close())}}},o=r,n=(s("4653"),s("2877")),c=s("6544"),l=s.n(c),d=s("8336"),h=s("b0af"),u=s("99d9"),m=s("62ad"),p=s("a523"),g=s("8fea"),v=s("169a"),b=s("132d"),f=s("0fd9"),S=s("2db4"),x=s("8654"),k=s("71d9"),y=Object(n["a"])(o,i,a,!1,null,null,null);e["default"]=y.exports;l()(y,{VBtn:d["a"],VCard:h["a"],VCardActions:u["a"],VCardText:u["b"],VCardTitle:u["c"],VCol:m["a"],VContainer:p["a"],VDataTable:g["a"],VDialog:v["a"],VIcon:b["a"],VRow:f["a"],VSnackbar:S["a"],VTextField:x["a"],VToolbar:k["a"]})},3096:function(t,e,s){},"36a7":function(t,e,s){},4653:function(t,e,s){"use strict";var i=s("3096"),a=s.n(i);a.a},"5e23":function(t,e,s){},"71d9":function(t,e,s){"use strict";s("5e23");var i=s("8dd9"),a=s("adda"),r=s("80d2"),o=s("d9bd");e["a"]=i["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"},tile:{type:Boolean,default:!0}},data:()=>({isExtended:!1}),computed:{computedHeight(){const t=this.computedContentHeight;if(!this.isExtended)return t;const e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...i["a"].options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return{...this.measurableStyles,height:Object(r["f"])(this.computedHeight)}}},created(){const t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach(([t,e])=>{this.$attrs.hasOwnProperty(t)&&Object(o["a"])(t,e,this)})},methods:{genBackground(){const t={height:Object(r["f"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(a["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(r["f"])(this.computedContentHeight)}},Object(r["q"])(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(r["f"])(this.extensionHeight)}},Object(r["q"])(this,"extension"))}},render(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;const e=[this.genContent()],s=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,s,e)}})},"8efc":function(t,e,s){},adda:function(t,e,s){"use strict";s("8efc"),s("36a7");var i=s("24b2"),a=s("58df"),r=Object(a["a"])(i["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio(){return Number(this.aspectRatio)},aspectStyle(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),o=r,n=s("d9bd");e["a"]=o.extend({name:"v-img",props:{alt:String,contain:Boolean,gradient:String,lazySrc:String,position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return"string"===typeof this.src?{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio)}:{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}},__cachedImage(){if(!this.normalisedSrc.src&&!this.normalisedSrc.lazySrc)return[];const t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push(`linear-gradient(${this.gradient})`),e&&t.push(`url("${e}")`);const s=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[s]):s}},watch:{src(){this.isLoading?this.loadImage():this.init()},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(){if(this.normalisedSrc.lazySrc){const t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError(){Object(n["b"])("Image load failed\n\n"+`src: ${this.normalisedSrc.src}`,this),this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const t=new Image;this.image=t,t.onload=()=>{t.decode?t.decode().catch(t=>{Object(n["c"])("Failed to decode image, trying to render anyway\n\n"+`src: ${this.normalisedSrc.src}`+(t.message?`\nOriginal error: ${t.message}`:""),this)}).then(this.onLoad):this.onLoad()},t.onerror=this.onError,t.src=this.normalisedSrc.src,this.sizes&&(t.sizes=this.sizes),this.normalisedSrc.srcset&&(t.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(t),this.getSrc()},pollForSize(t,e=100){const s=()=>{const{naturalHeight:i,naturalWidth:a}=t;i||a?(this.naturalWidth=a,this.calculatedAspectRatio=a/i):null!=e&&setTimeout(s,e)};s()},genContent(){const t=o.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:`${this.naturalWidth}px`}}),t},__genPlaceholder(){if(this.$slots.placeholder){const t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{attrs:{name:this.transition}},t):t[0]}}},render(t){const e=o.options.render.call(this,t);return e.data.staticClass+=" v-image",e.data.attrs={role:this.alt?"img":void 0,"aria-label":this.alt},e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,e.data,e.children)}})}}]);
//# sourceMappingURL=chunk-562a53c7.3a463f56.js.map