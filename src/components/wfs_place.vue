<template>

	<div class="wfs_pagelevel_limits">

		<!-- Navbar features place name and project title -->
		<wfs-nav id="place_navbar" :title="cp.currentPlace.name" color="rgb(35, 43, 43)">
			<span class="navbar-brand">Working from Scraps</span>
		</wfs-nav>	


		<div class="wfs_pagelevel_limits">

			<b-container class="wfs_main_content_area" fluid>			

				<!-- Highest level row -->
				<b-row style="height: 100%; bottom: 0;">

					<!-- Main content area -->
					<b-col cols="9" :style="{ height: viewportHeight, overflowY: 'scroll' }">

						<b-row style="margin-bottom: 0.5em; margin-top: 1em; margin-left: 0em;">
	
					    	<!-- <b-col cols="3"> -->

					    		<!-- Places search box here -->
					    		<!-- <div style="margin-left: 1em; margin-top: 2em;">
					    			<b-form-input class="wfs_search_box" size="lg" placeholder="Search Places...">		
					    			</b-form-input>
					    		</div> -->

					    		<!-- <div style="margin-left: 1em; margin-top: 2em;">
					    			<b-button class="wfs_search_box" variant="outline-secondary" size="lg">
					    				<span style="float: left;">Search Places</span>
					    				<span style="float: right;">
					    					<icon name="search" scale="1.25"></icon>
					    				</span>
					    			</b-button>
					    			</b-form-input>
					    		</div> -->

						    <!-- </b-col> -->

							<!-- Places, Sources icons -->
							<b-col cols="6">

				    			<b-row>
				    				<b-col cols="12">
				    					<span class="wfs_pagelevel_nav_labels" id="wfs_cooccurrences_label">Co-occurrences</span>
				    				</b-col>
				    			</b-row>								
								
								<b-row style="margin-top: 0.5em;">

									<!-- People icon -->
									<b-col cols="2" class="wfs_pps_icon_box">
										<div class="wfs_img_div_for_translation">
											<div class="wfs_pps_icon_img">
							                    <b-img :src="cp.icons.people" blank-color="#abc" height="50%" alt="placeholder" title="People" @click="populateSideBar('wfs-person-card')"/>
							                </div>
					                	</div>
									</b-col>									

									<!-- Places icon -->
									<b-col cols="2" class="wfs_pps_icon_box">
										<div class="wfs_img_div_for_translation">
											<div class="wfs_pps_icon_img">
												<!-- <h6 class="wfs_pps_icon_text">Places</h6> -->
							                    <b-img :src="cp.icons.places" blank-color="#abc" height="50%" alt="placeholder" title="Places" @click="populateSideBar('wfs-place-card')"/>
							                </div>
					                	</div>
									</b-col>

									<!-- Sources icon -->
									<b-col cols="2" class="wfs_pps_icon_box" >
										<div class="wfs_img_div_for_translation">
											<div class="wfs_pps_icon_img">
												<!-- <h6 class="wfs_pps_icon_text">Sources</h6> -->
							                    <b-img :src="cp.icons.sources" blank-color="#abc" height="50%" alt="placeholder" title="Sources" @click="populateSideBar('wfs-source-card')"/>
							                </div>
						                </div>
									</b-col>

								</b-row>

							</b-col>

							<b-col cols="2"></b-col>

							<!-- Back to collection button -->
							<b-col cols="3" style="margin-left: 3em; margin-top: 2em;">
								<b-button @click="backToCollection" size="lg" style="float: right;">
									<span>&nbsp;Back to Collection</span>
								</b-button>
							</b-col>

						</b-row>

						<!-- Place information -->
						<b-row style="margin-left: 1em !important;">

							<b-col cols="12">

		                        <div class="wfs_page_component" style="margin: 2em 2em 0em 0em;">

		                            <!-- Header -->
		                            <b-row class="wfs_page_header" style="margin-left: 0.5em;">
		                                <h5 class="wfs_user_direction">About this place</h5>
		                            </b-row>

		                            <b-row class="wfs_page_content" 
		                            	   style="margin-bottom: 1em; margin-top: 0em;">

		                            	<b-col cols="12">
		                            		<div style="padding: 1em;">
		                            			
		                            			<b-row>
		                            				<b-col cols="12">									
														<wfs-metadata label="Country" :value="cp.currentPlace.countries"></wfs-metadata>
														<wfs-metadata label="Continent" :value="cp.currentPlace.continent"></wfs-metadata>
														<wfs-metadata label="Additional names" :value="cp.currentPlace.addl_names"></wfs-metadata>
														<wfs-metadata label="WOEID" :value="cp.currentPlace.woeid"></wfs-metadata>
														<wfs-metadata label="Coordinates" :value="cp.currentPlace.lat">, {{ cp.currentPlace.long }}</wfs-metadata>
													</b-col>
												</b-row>

												<b-row style="margin-top: 1em;">
													<b-col cols="12">
														<wfs-metadata-button value="Geonames Entry" :href="cp.currentPlace.geolink" isLink>
															<img :src="linkIcon" title="Geo coordinate" height="30" style="padding-top: 0.35em; vertical-align: sub;"/>
														</wfs-metadata-button>														
													</b-col>
												</b-row>								


												<!-- <b-row>
													<b-col cols="2" style="padding: 0.5em 0 0 1.75em;">
														<img :src="linkIcon" title="Geoname" height="28" />
													</b-col>
													<b-col cols="10">
														<a :href="cp.currentPlace.geolink" target="_blank">
															<b-button class="wfs_button wfs_card_button">Geoname link</b-button>
														</a>
													</b-col>
												</b-row> -->

											</div>	                            	
										</b-col>
		                        	</b-row>
		                        </div>

							</b-col>

						</b-row>

						<!-- Featured in...description, visuals, and table -->
						<b-row style="margin-left: 1em !important;">

							<b-col cols="12">

		                        <div class="wfs_page_component" style="margin: 2em 2em 0em 0em;">

		                            <!-- Header -->
		                            <b-row class="wfs_page_header" style="margin-left: 0.5em;">
		                                <h5 class="wfs_user_direction">In the collection</h5>
		                            </b-row>

		                            <b-row class="wfs_page_content" style="margin-bottom: 1em; margin-top: 1em;">
		                            	<b-col cols="12">
											
											<b-row>
												<b-col cols="12">
												<p style="font-weight: 900;">Featured {{ getCollectionOccurrences() }} times in {{ getBookCount() }} scrapbooks across {{ getPageCount()}} pages</p>
												</b-col>
											</b-row>

											<b-row>
												<b-col cols="12">
													<wfs-ppsk-featured 

														v-for="bookID in Object.keys(cp.placesJSON[cp.currentPlace.id].stats.book_and_page_ids)" :bookNumber="cp.bookIDsToNumbers[bookID]" :pages="cp.placesJSON[cp.currentPlace.id].stats.book_and_page_ids[bookID]" 
														:key="'ppskFeatured' + bookID" :cp="cp"></wfs-ppsk-featured>
												</b-col>
											</b-row>

										</b-col>
		                            </b-row>

		                        </div>  								

							</b-col>

						</b-row>

						<!-- Places search -->
						<b-row class="wfs_page_content" style="margin-left: 1em !important;">
							<b-col cols="12">
								<div class="wfs_page_component" style="padding: 2em 2em 1em 2em;">
									<wfs-ppsk-data-area :cp="cp" ppskType="places" level="collection" chartType="none" :barColor="cp.bookCoverColors['12'].spine" pieScale="100%"></wfs-ppsk-data-area>
								</div>
							</b-col>
						</b-row>

					</b-col>

					<!-- Sidebar -->
					<b-col class="wfs_sidebar_column" cols="3">
						
						<div :style="{ height: viewportHeight, overflowY: 'scroll' }" class="wfs_shadowed_cards">
							<component v-for="entry in myCardList" :is="childCardType" :key="entry.id" :json="entry" :occurrences="coOccurrences" :cp="cp" :switchMethod="switchMethod" occurrenceText="Co-occurrence on pages" :previous-page="myComponentName"
							:roleList="myRoleList">
								
							</component>
						</div>

					</b-col>

				</b-row>

			</b-container>
		</div>		
	
	</div>

</template>

<script>

// Bootstrap components
import bImg from "bootstrap-vue/es/components/image/img";
import bFormInput from "bootstrap-vue/es/components/form-input/form-input";
import bButton from "bootstrap-vue/es/components/button/button";

// Bootstrap grid layout
import bContainer from "bootstrap-vue/es/components/layout/container";
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";
import wfsMetadataButton from "./wfs_metadata_button.vue";
import wfsNav from "./wfs_nav.vue";
import wfsPersonCard from "./wfs_person_card.vue";
import wfsPPSKFeatured from "./wfs_ppsk_featured.vue";
import wfsPlaceCard from "./wfs_place_card.vue";
import wfsSourceCard from "./wfs_source_card.vue";
import wfsPPSKDataArea from "./wfs_ppsk_data_area.vue";

// Third party components
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/search"


export default {

	name: "wfs-place",

	props: ["cp", "switchMethod"],

	computed: {

		viewportHeight: function() {

			return "100%";
		}
	},

	components: {

		"b-button": bButton,
		"b-form-input": bFormInput,
		"b-img": bImg,

		"b-container": bContainer,
		"b-row": bRow,
		"b-col": bCol,

		"wfs-metadata": wfsMetadata,
		"wfs-metadata-button": wfsMetadataButton,
		"wfs-nav": wfsNav,

		"wfs-person-card": wfsPersonCard,
		"wfs-place-card": wfsPlaceCard,
		"wfs-source-card": wfsSourceCard,

		"wfs-ppsk-data-area": wfsPPSKDataArea,
		"wfs-ppsk-featured": wfsPPSKFeatured,

		"icon": Icon,
	},

	created() {

		if ( !this.cp.currentPlace ) {
			this.cp.currentPlace = this.cp.placesJSON[this.$route.params.placeID];
		}
	},	

	data() {
		
		return {

			childCardType: "",
			coOccurrences: {},
			// linkIcon: "/src/assets/images/link_icon.png",
			linkIcon: "/src/assets/images/link_icon_white.png",
			myCardList: [],
			myRoleList: [],

			// Used for children name reference to parent
			myComponentName: "wfs-place"		
		};
	},

	methods: {

		// Sidebar methods
		addCardToSideBar: function(p_json) {

			this.myCardList.push(p_json);
		},

        backToCollection: function() {

            this.switchMethod("wfs-scrapbooklevel");
        },			

		clearSideBar: function() {

			// Clear the array, will automatically depopulate the list of card components
			this.myCardList = [];
			this.coOccurrences = {};
		},

		populateSideBar: function(p_type){

			let myPPSIDs = null;
			let myCoOccurrences = {};
			let myPlace = this.cp.currentPlace;

			// Change active card type
			this.childCardType = p_type;

			// Clear the side bar of cards
			this.clearSideBar();

			// Get a ref. to the corresponding place/source collection of co-occurring IDs for this place
			switch ( p_type ){

				case "wfs-person-card":
					myPPSIDs = myPlace.stats.people_ids;
					myCoOccurrences = myPlace.stats.people_on_pages_dict;
					break;
				case "wfs-place-card":
					myPPSIDs = myPlace.stats.places_ids;
					myCoOccurrences = myPlace.stats.places_on_pages_dict;
					break;
				case "wfs-source-card":
					myPPSIDs = myPlace.stats.sources_ids;
					myCoOccurrences = myPlace.stats.sources_on_pages_dict;
					break;
			}

			// Tally occurrences of IDs for the page
			for ( let index = 0; index < myPPSIDs.length; index++ ) {

				this.coOccurrences[myPPSIDs[index]] = myCoOccurrences[myPPSIDs[index]].length;
			}

			// Sort IDs by number of co-occurrences for the page
			let tempCoOccurrences = this.coOccurrences;
			let keysSorted = Object.keys(this.coOccurrences).sort(
				function(a, b) {
					return tempCoOccurrences[a] - tempCoOccurrences[b];
				});

			// Populate the side bar with cards for all of the IDs in that collection
			// Add cards by descending order of number of co-occurrences
			for ( let index = keysSorted.length - 1; index >= 0; index-- ){

				switch ( p_type ) {
					case "wfs-person-card":
						this.addCardToSideBar(this.cp.peopleJSON[keysSorted[index]]);
						break;					
					case "wfs-place-card":
						this.addCardToSideBar(this.cp.placesJSON[keysSorted[index]]);
						break;
					case "wfs-source-card":
						this.addCardToSideBar(this.cp.sourcesJSON[keysSorted[index]]);
						break;
				}
			}
		},		

		getBookCount: function() {

			let bookCount = 0;

			for ( let index = 0; index < this.cp.myJSONList.length; index++ ) {

				if ( this.cp.myJSONList[index].book.stats.places_ids.includes(this.cp.currentPlace.id) ) {
					bookCount += 1;
				}
			}

			return bookCount;
		},

		getCollectionOccurrences: function() {

			return this.cp.collection.places_ids_dict[this.cp.currentPlace.id];
		},

		getPageCount: function() {

			let pageCount = 0;

			for ( let index = 0; index < this.cp.myJSONList.length; index++ ) {
				for ( let index2 = 0; index2 < this.cp.myJSONList[index].pages.length; index2++ ) {
					if ( this.cp.myJSONList[index].pages[index2].places_ids.includes(this.cp.currentPlace.id) ) {
						pageCount += 1;
					}
				}	
			}

			return pageCount;
		},

		// switchToPreviousPage: function() {

			// console.log("switchToPreviousPage place");

		// 	// Clear the sidebar of cards
		// 	this.clearSideBar();

		// 	// Switch back to the page that brough the user to this place page
		// 	this.$router.go(-1);

	 //        // Routing goes through Scrapbooklevel create (NOTE: probably because it's at the top level of the App - should look into why)
	 //        if ( this.$route ) {

	 //            // Person routing
	 //            if ( this.$route.params.personID ) {

	 //                this.cp.currentPerson = 
	 //                    this.cp.peopleJSON[this.$route.params.personID];
	 //                this.switchMethod("wfs-person");
	 //            } 
	 //            // Place routing
	 //            else if ( this.$route.params.placeID ) {

	 //                this.cp.currentPlace = 
	 //                    this.cp.placesJSON[this.$route.params.placeID];
	 //                this.switchMethod("wfs-place");
	 //            } 
	 //            // Source routing
	 //            else if ( this.$route.params.sourceID) {

	 //                this.cp.currentSource = 
	 //                    this.cp.sourcesJSON[this.$route.params.sourceID];
	 //                this.switchMethod("wfs-source");
	 //            } 
	 //            // Keyword routing
	 //            else if ( this.$route.params.keywordID ) {

	 //                this.cp.currentKeyword = this.cp.collection.ids_to_keywords[this.$route.params.keywordID];
	 //                this.switchMethod("wfs-keyword");
	 //            }
	 //            // Page routing
	 //            else if ( this.$route.params.pageNumber ) {

	 //                this.cp.bookNumber = this.$route.params.bookNumber;
	 //                //this.currentlyExaminedEntry = "Scrapbook " + this.cp.bookNumber;
	 //                this.cp.currentEntry = this.cp.myJSON[this.cp.bookNumber].book;
	 //                this.cp.pageIndex = parseInt(this.$route.params.pageNumber);                
	 //                this.switchMethod("wfs-pagelevel");
	 //            } 
	 //            // Collection or book routing
	 //            else {

	 //                // if ( this.$route.params.bookNumber ) {

	 //                //     this.currentlyExaminedEntry = "Scrapbook " + this.$route.params.bookNumber;
	 //                //     this.selectScrapbook(this.$route.params.bookNumber);

	 //                //     // Start navbar color with the spine color from scrapbook 1
	 //                //     this.setNavbarToSpineColor();

	 //                //     // Set background color with the cover color from scrapbook 1
	 //                //     this.setBackgroundColorToCoverColor();  
	 //                // } else { 

	 //                //     // Switch currently examined field to collection
	 //                //     this.currentlyExaminedEntry = "Collection";

	 //                //     // Set the navbar to the default black for the collection
	 //                //     this.setNavbarToCollectionColor();

	 //                //     // Set the background to paper color if in collection view
	 //                //     this.setBackgroundColorToPaperColor()
	 //                // }

	 //                this.switchMethod("wfs-scrapbooklevel");
	 //            }
	 //        }

		// 	// this.$router.go(window.location.href);;
		// },
	},

}
</script>

<style>

.wfs_card_button {

	margin: 0.25em 0.25em 0.125em 0.125em;
	padding: 0.25em 0.45em 0.25em 0.45em;
}

</style>