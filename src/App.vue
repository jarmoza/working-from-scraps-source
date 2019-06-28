<template>
    <div id="app">
        <keep-alive>
            <!-- <router-view :is="cp.childPageType" :cp="cp" :switchMethod="switchPageType"></router-view> -->
            <router-view :cp="cp" :switchMethod="switchPageType"></router-view>
        </keep-alive>
    </div>
</template>

<script>

// 'Working from Scraps' Vue components
import WfsKeyword from "./components/wfs_keyword.vue";
import WfsPagelevel from "./components/wfs_pagelevel.vue";
import WfsPerson from "./components/wfs_person.vue";
import WfsPlace from "./components/wfs_place.vue";
import WfsSource from "./components/wfs_source.vue";
import WfsScrapbooklevel from "./components/wfs_scrapbooklevel.vue";

// 'Working from Scraps' data
import scrapbook1JSON from "./assets/json/wfs_scrapbook_01.json";
import scrapbook6JSON from "./assets/json/wfs_scrapbook_06.json";
import scrapbook9JSON from "./assets/json/wfs_scrapbook_09.json";
import scrapbook12JSON from "./assets/json/wfs_scrapbook_12.json";
import collectionJSON from "./assets/json/wfs_collection_overview.json";
import peopleJSON from "./assets/json/wfs_people.json";
import placesJSON from "./assets/json/wfs_places.json";
import sourcesJSON from "./assets/json/wfs_sources.json";
import keywordsJSON from "./assets/json/wfs_keywords.json";    


export default {

    name: "app",

    components: {

        "wfs-keyword": WfsKeyword,
        "wfs-scrapbooklevel": WfsScrapbooklevel,
        "wfs-pagelevel": WfsPagelevel,
        "wfs-person": WfsPerson,
        "wfs-place": WfsPlace,
        "wfs-source": WfsSource,
    },  

    data(){

        return {
            
            // Current properties
            cp: {

                // Current page
                bookNumber: scrapbook1JSON.book.number,
                childPageType: "wfs-scrapbooklevel",
                currentEntry: scrapbook1JSON.book,
                currentPerson: null,
                currentPlace: null,
                currentSource: null,
                currentKeyword: null,               
                newPageListNeeded: false,
                pageIndex: 0,
                title: "Working from Scraps",           
                
                // JSON fields
                myJSON: {

                    "1": scrapbook1JSON,
                    "6": scrapbook6JSON,
                    "9": scrapbook9JSON,
                    "12": scrapbook12JSON,
                },
                myJSONList: [scrapbook1JSON, scrapbook6JSON, scrapbook9JSON, scrapbook12JSON],
                collection: collectionJSON,
                peopleJSON: peopleJSON,
                placesJSON: placesJSON,
                sourcesJSON: sourcesJSON,
                keywordsJSON: keywordsJSON,

                // Book fields
                bookIDsToNumbers: {
                    "1": "1",
                    "4": "6",
                    "3": "9",
                    "2": "12"
                },

                // Cover/spine colors used across pages
                bookCoverColors: {

                    "1": { spine: "#461E25", cover: "#1E202D" },
                    "6": { spine: "#5E342A", cover: "#9B8778" },
                    "9": { spine: "#2A0105", cover: "#1D3734" },
                    "12": { spine: "#742F30", cover: "#14273A" }
                },

                // Icons
                icons: {

                    "people": "/src/assets/images/people_icon.png",
                    "places": "/src/assets/images/places_icon.png",
                    "sources": "/src/assets/images/sources_icon.png",
                },

                graphColors: [

                    "#461E25", "#1E202D",
                    "#5E342A", "#9B8778",
                    "#2A0105", "#1D3734",
                    "#742F30", "#14273A",
                    "#232B2B", "#D9CCBB"
                ],

                // 'Colores' palette from colrd.com
                colrdPalette: [
                    "#1a1334", "#26294a",
                    "#01545a", "#017351",
                    "#03c383", "#aad962",
                    "#fbbf45", "#ef6a32", 
                    "#ed0345", "#a12a5e",    
                    "#710162", "#110141",
                ],
            },
        };
    },

    // Hooks
    created() {

        console.log("App creation");
    },

    // Methods
    methods: {

        switchPageType: function(p_pageType) {

            console.log("switchPageType");

            // General pattern for page switches:
            // (1) Handle any necessary code pertaining to the current component/view
            // (2) Call the general switchMethod prop (all map back to switchPageType in wfs_page.vue)

            // Save the page type to swap child page components
            this.cp.childPageType = p_pageType;

            // Change shared current properties field for new active child page component
            switch ( p_pageType ) {

                case "wfs-pagelevel":
                    
                    this.cp.title = "Scrapbook " + this.cp.currentEntry.number; 
                    this.setBackgroundColorToPageColor();

                    break;

                case "wfs-scrapbooklevel":
    
                    this.cp.title = "Working from Scraps";

                    console.log("Scrapbook level change")

                    if ( this.$route.params.bookNumber ) {

                        console.log("Found book number")
                        
                        this.setNavbarToSpineColor();
                        this.setBackgroundColorToCoverColor();

                        this.$router.push({ 
                            name: "book",
                            params: { bookNumber: this.cp.currentEntry.number },
                        });
                    } else { 

                        console.log("Setting to collection"); 

                        this.setNavbarToCollectionColor();
                        this.setBackgroundColorToPageColor();

                        this.$router.push({ name: "home" });
                    }

                    break;

                case "wfs-person":

                    console.log("In person case");

                    this.cp.title = this.cp.currentPerson.name;

                    break;

                case "wfs-place":

                    this.cp.title = this.cp.currentPlace.name;

                    break;

                case "wfs-source":

                    this.cp.title = this.cp.currentSource.name;

                    break;

                case "wfs-keyword":
                
                    this.cp.currentKeyword = 
                        this.cp.collection.ids_to_keywords[this.$route.params.keywordID];
                    this.cp.title = this.cp.currentKeyword;

                    break;
            }
        },

        setBackgroundColorToCoverColor: function() {

            $("body").css("background-color", this.cp.bookCoverColors[this.cp.bookNumber].cover);
        },

        setBackgroundColorToPageColor: function() {

            $("body").css("background-color", "rgb(217, 204, 187)");
        },

        setNavbarToCollectionColor: function() {

            // Workaround to override color via jQuery
            let cp = this.cp;
            $("#scrapbooklevel_navbar").each(function(){

                this.style.setProperty("background-color", 
                    "rgb(35, 43, 43)", "important");
            });
        },        

        setNavbarToSpineColor: function() {

            // Workaround to override color via jQuery
            let cp = this.cp;
            $(".scrapbooklevel_navbar").each(function(){

                this.style.setProperty("background-color", 
                    cp.bookCoverColors[cp.bookNumber].spine, "important");
            });
        },

        // setPageLevelNavbarSpineColor(){

        //     // Workaround to override color via jQuery
        //     let cp = this.cp;
        //     $(".pagelevel_navbar").each(function(){

        //         this.style.setProperty("background-color", 
        //             cp.bookCoverColors[cp.bookNumber].spine, "important");
        //     });
        // },
    }
}
</script>

<style>

/* Tag styles */
html {

   margin: 0px;
   height: 100%;
   width: 100%;
}

body {

    font-family: 'Raleway', sans-serif !important;
    font-weight: lighter !important;
    background-color: rgb(217, 204, 187);

    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    bottom: 0;
    right: 0;
}

a {
    color: grey;
}

h5, h6 {

    font-weight: 900; 
}

button {

    outline: none !important;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
}

/* App styles */
#app {

    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    bottom: 0;
    right: 0;
}

/* Navbar styles */
.navbar-brand {

    color: white !important;
    margin-left: 0.5em;
    letter-spacing: 1px !important;
    font-size: 1.6em !important;
    /*background-color: rgb(217,204,187);*/
    font-family: ScotchRomanMT, serif;
}

/* WFS component styles */
.wfs_user_direction {
    
    color: grey;
    font-weight: normal;
    font-size: 1.1em;
}

.wfs_page_component {

    background-color: #E8E8E8;
    padding: 15px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
}

.wfs_page_header {

    margin: 0em;
    padding-left: 0.25em;
    /*font-size: 1.5em;*/
    font-size: 1.25rem;
    font-weight: 900;
}

.wfs_page_content {

    margin: 2em 1em 2em 1em;
}

.wfs_main_content_area {
    
    height: 100%;
    bottom: 0;
}

.wfs_shadowed_cards {
    
    /*box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);*/
}

.wfs_pps_title_text {
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.wfs_pagelevel_limits {
    
    width: 100%;
    height: 100%;
    bottom: 0;
}

/* Create a simple white box, and add the shadow for the initial state */
.wfs_pps_icon_img {

    position: relative;
    display: inline-block;
    /*background-color: #E8E8E8;*/
    /*box-shadow: 0 1px 2px rgba(0,0,0,0.15);*/
    transition: all 0.3s ease-in-out;
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.wfs_pps_icon_img::after {

    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    /*box-shadow: 0 5px 15px rgba(0,0,0,0.3);*/
    transition: opacity 0.3s ease-in-out;
}

.wfs_pps_icon_img:hover {

    -webkit-transform: scale(1.25, 1.25);
    transform: scale(1.25, 1.25);
}

.wfs_pps_icon_img:hover::after {

    opacity: 1;
}

.wfs_pps_icon_text {

    position: relative;
    left: 72%; 
    transform: translateX(-50%);
    margin-bottom: 1em;
}

.wfs_pps_icon_box {
    padding-top: 0;
    padding-bottom: 0;
    max-height: 80% !important;
}

.wfs_img_div_for_translation {

    position: relative;
    left: 65%; 
    transform: translateX(-50%);    
}

.wfs_sidebar_column {

    /*border-left: thick solid #000000;*/   
    border-left: 3px solid rgba(0,0,0,0.5);
}

.wfs_pagelevel_nav_labels {

    font-size: 1.1em;
    color: black;
}

.wfs_search_box {
    
    background-color: #E8E8E8 !important;
    /*color: 6C757D;*/
    color: grey;
    border-color: black !important;
    border-width: 2px;
    width: 100%;
}

.wfs_search_box:hover {

    color: grey;
}

textarea:focus, input:focus, input[type]:focus, .uneditable-input:focus {   

    border-color: black;
    /*box-shadow: 0 1px 1px grey inset, 0 0 8px grey;*/
    box-shadow: 0 0 0 grey inset, 0 0 0 grey;
    outline: 0 none;
}
</style>
