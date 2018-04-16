import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import VueChartkick from "vue-chartkick";
// import Chart from "chart.js";
import App from "./App.vue";

import WfsKeyword from "./components/wfs_keyword.vue";
import WfsPagelevel from "./components/wfs_pagelevel.vue";
import WfsPerson from "./components/wfs_person.vue";
import WfsPlace from "./components/wfs_place.vue";
import WfsScrapbooklevel from "./components/wfs_scrapbooklevel.vue";
import WfsSource from "./components/wfs_source.vue";

// Tell Vue to use vue-router instance
Vue.use(VueRouter);

// Tell Vue to use Chartkick - Google Charts
Vue.use(VueChartkick, {adapter: ""});

// ChartJS globals
// Chart.defaults.global.defaultFontFamily = "Raleway";
// Chart.defaults.global.defaultFontSize = "1em";
// Chart.defaults.global.defaultFontColor = "grey";

// Tell Vue to use Chartist
// Vue.use(require("vue-chartist"));

// Browser rsouting to components
const routes = [

    { 
        name: "Home", 
        path: "/", 
        component: WfsScrapbooklevel 
    },
 	   
    { 
    	name: "Collection", 
    	path: "/wfsscrapbooklevel", 
    	alias: "/collection", 
    	component: WfsScrapbooklevel 
    },

  	{ 
  		name: "Book", 
  		path: "/wfsscrapbooklevel/:bookNumber", 
  		alias: "/collection/book/:bookNumber", 
  		component: WfsScrapbooklevel 
  	},

  	{ 
  		name: "Page", 
  		path: "/wfspagelevel/:bookNumber/:pageNumber", 
  		alias: "/collection/book/:bookNumber/page/:pageNumber", 
  		component: WfsPagelevel 
  	},

  	{ 
  		name: "Person", 
  		path: "/wfsperson/:personID", 
  		alias: "/collection/person/:personID", 
  		component: WfsPerson 
  	},

  	{ 
  		name: "Place", 
  		path: "/wfsplace/:placeID", 
  		alias: "/collection/place/:placeID", 
  		component: WfsPlace 
  	},

  	{ 
  		name: "Source", 
  		path: "/wfssource/:sourceID", 
  		alias: "/collection/source/:sourceID", 
  		component: WfsSource 
  	},

    {
        name: "Keyword",
        path: "wfskeyword/:keywordID",
        alias: "/collection/keyword/:keywordID",
        component: WfsKeyword
    },
];

const router = new VueRouter({
 	
    routes: routes,
    mode: "history",
});

var myVue = new Vue({

	el: "#app",
	render: h => h(App),
	router
});



