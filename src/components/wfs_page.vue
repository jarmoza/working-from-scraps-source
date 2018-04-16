<template>

	<keep-alive>		

		<component :is="childPageType" :switchMethod="switchPageType" :cp="cp" :previous-page="cp.previousPage">
			
		</component>

	</keep-alive>

</template>

<script>

// WFS Components
import WfsKeyword from "./wfs_keyword.vue";
import WfsPagelevel from "./wfs_pagelevel.vue";
import WfsPerson from "./wfs_person.vue";
import WfsPlace from "./wfs_place.vue";
import WfsSource from "./wfs_source.vue";
import WfsScrapbooklevel from "./wfs_scrapbooklevel.vue";

// JSON
import scrapbook1JSON from "../assets/json/wfs_scrapbook_01.json";
import scrapbook6JSON from "../assets/json/wfs_scrapbook_06.json";
import scrapbook9JSON from "../assets/json/wfs_scrapbook_09.json";
import scrapbook12JSON from "../assets/json/wfs_scrapbook_12.json";
import collectionJSON from "../assets/json/wfs_collection_overview.json";
import peopleJSON from "../assets/json/wfs_people.json";
import placesJSON from "../assets/json/wfs_places.json";
import sourcesJSON from "../assets/json/wfs_sources.json";
import keywordsJSON from "../assets/json/wfs_keywords.json";


export default {

	name: "wfs-page",

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

			childPageType: "wfs-scrapbooklevel",

			// Current properties
			cp: {

				// Page history
				// Contents have 'name' and 'options'
				history: {}, 

				// Current page
				title: "Working from Scraps",
				previousPage: "wfs-scrapbooklevel",
				previousPages: ["wfs-scrapbooklevel"],
				bookNumber: scrapbook1JSON.book.number,
	            currentEntry: scrapbook1JSON.book,
	            pageIndex: 0,
	            newPageListNeeded: false,
	            currentPerson: null,
	            currentPlace: null,
	            currentSource: null,

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

	            bookIDsToNumbers: {},

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

				// Routing fields
				pageHistoryRoutes: [],


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
			}

		};
	},

	methods: {

		switchPageType: function(p_pageType){

			// Save the page type to swap child page components
			this.childPageType = p_pageType;

			// Add the new page type to the previous pages list
			// this.cp.previousPages.push(p_pageType);

			// Change shared current properties field for new active child page component
			switch ( p_pageType ) {

				case "wfs-pagelevel":
					
					this.cp.title = "Scrapbook " + this.cp.currentEntry.number;
					// this.setPageLevelNavbarSpineColor();
					this.setBackgroundColorToPageColor();
					break;

				case "wfs-scrapbooklevel":
	
					this.cp.title = "Working from Scraps";

					this.setNavbarToSpineColor();
					this.setBackgroundColorToCoverColor();

					if ( "Collection" == this.currentlyExaminedEntry ) {
						
						this.$router.push({ name: "Collection" });
					} else { 

						this.$router.push({ 
							name: "Book",
							params: { bookNumber: this.cp.currentEntry.number },
						});
					}
					break;

				case "wfs-person":

					this.cp.title = this.cp.currentPerson.name;
					break;

				case "wfs-person":

					this.cp.title = this.cp.currentPlace.name;
					break;

				case "wfs-person":

					this.cp.title = this.cp.currentSource.name;
					break;

				case "wfs-keyword":
				
					this.cp.currentKeyword = this.cp.collection.ids_to_keywords[this.$route.params.keywordID];

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

</style>