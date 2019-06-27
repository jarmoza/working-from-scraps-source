import Vue from "vue";
import VueRouter from "vue-router";

// Third-party libraries and components
import BootstrapVue from "bootstrap-vue";
import VueChartkick from "vue-chartkick";

// Main VueJS app
import App from "./App.vue";

// 'Working from Scraps' components
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

// Browser routing to components
const routes = [

    // Home redirects to /collection
    { 
  		path: "/", 
  		name: "home",
        redirect: "/collection" 
    },

    // Default routing url
    {
        path: "/collection",
        name: "collection",
        component: WfsScrapbooklevel,
        props: true
    },

  	{ 
        path: "/collection/book/:bookNumber",
        name: "book",	   
        component: WfsScrapbooklevel,
        props: true

        // path: "/wfsscrapbooklevel/:bookNumber", 
        // alias: "/collection/book/:bookNumber",	  
  	},

  	{ 
        path: "/collection/book/:bookNumber/page/:pageNumber",
        name: "page", 
        component: WfsPagelevel,
        props: true

    	// path: "/wfspagelevel/:bookNumber/:pageNumber", 
    	// alias: "/collection/book/:bookNumber/page/:pageNumber",        
  	},

  	{ 
        path: "/collection/person/:personID",
        name: "person",         
  		  component: WfsPerson,
        props: true

        // path: "/wfsperson/:personID", 
        // alias: "/collection/person/:personID",         
  	},

  	{ 
        path: "/collection/place/:placeID",
        name: "place", 
  		component: WfsPlace,
        props: true,

        // path: "/wfsplace/:placeID", 
        // alias: "/collection/place/:placeID",        
  	},

  	{ 
        path: "/collection/source/:sourceID",
        name: "source",
        component: WfsSource,
        props: true

        // path: "/wfssource/:sourceID", 
        // alias: "/collection/source/:sourceID",      
  	},

	{
		path: "/collection/keyword/:keywordID",
		name: "keyword",        
		component: WfsKeyword,
        props: true,
        
        // path: "wfskeyword/:keywordID",
        // alias: "/collection/keyword/:keywordID",        
	},
];

const router = new VueRouter({
 	
	routes: routes,
	mode: "history",
});

var myVue = new Vue({

	el: "#app",
	render: h => h(App),
	router: router
});



