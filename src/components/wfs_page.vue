<template>

	<keep-alive>		
        <component :is="cp.childPageType" :switchMethod="switchPageType" :previousMethod="switchToPreviousPage" :cp="cp" :previous-page="cp.previousPage">
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
			
			// Current properties
			cp: {

				// Current page
				bookNumber: scrapbook1JSON.book.number,
				childPageType: "wfs-scrapbooklevel",
				currentEntry: scrapbook1JSON.book,
	            currentPerson: null,
	            currentPlace: null,
	            currentSource: null,				
				newPageListNeeded: false,
				pageIndex: 0,
				previousPage: "wfs-scrapbooklevel",
				title: "Working from Scraps",

				// Page history
				// Contents have 'name' and 'options'
				history: {},			
				
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
	            	"2": "6",
	            	"3": "9",
	            	"4": "12"
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


			// Page history

		};
	},

	methods: {

		switchPageType: function(p_pageType) {

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

					if ( this.$route.params.bookNumber ) {
						
						this.setNavbarToSpineColor();
						this.setBackgroundColorToCoverColor();

						this.$router.push({ 
							name: "book",
							params: { bookNumber: this.cp.currentEntry.number },
						});
					} else { 

						this.setNavbarToCollectionColor();
						this.setBackgroundColorToPageColor();

						this.$router.push({ name: "home" });
					}
					break;

				case "wfs-person":

					this.cp.title = this.cp.currentPerson.name;
					break;

				case "wfs-place":

					this.cp.title = this.cp.currentPlace.name;
					break;

				case "wfs-source":

					this.cp.title = this.cp.currentSource.name;
					break;

				case "wfs-keyword":
				
					this.cp.currentKeyword = this.cp.collection.ids_to_keywords[this.$route.params.keywordID];

					this.cp.title = this.cp.currentKeyword;
					break;
			}
		},

		switchToPreviousPage: function() {

			// Pop previous page from stack
			if ( this.previousPageParams.length > 0 ) {

				// Get the previous page parameters
				let previousParams = this.previousPageParams.pop();

				// Save the page type to swap child page components
				this.cp.childPageType = p_pageType;

				switch ( previousParams.name ) {

					case "Person":

						break;

					case "Place":

						break;

					case "Source":

						break;

					case "Keyword":

						break;

					case "Page":
						
						break;

					case "Book":

						break;

					case "Collection":

						break;
				}
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