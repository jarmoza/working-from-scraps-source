<template>

	<div class="wfs_pagelevel_limits">

		<!-- Navbar features source name and project title -->
		<wfs-nav id="place_navbar" :title="cp.currentSource.name" color="rgb(35, 43, 43)">
			<span class="navbar-brand">Working from Scraps</span>
		</wfs-nav>	


		<div class="wfs_pagelevel_limits">

			<b-container class="wfs_main_content_area" fluid>			

				<!-- Highest level row -->
				<b-row style="height: 100%; bottom: 0;">

					<!-- Main content area -->
					<b-col cols="9" :style="{ height: viewportHeight, overflowY: 'scroll' }">

						<b-row style="margin-bottom: 0.5em; margin-top: 1em; margin-left: 0em;">
	
					    	<b-col cols="3">

					    		<!-- Sources search box here -->
					    		<div style="margin-left: 1em; margin-top: 2em;">
					    			<b-button class="wfs_search_box" variant="outline-secondary" size="lg">
					    				<span style="float: left;">Search</span>
					    				<span style="float: right;">
					    					<icon name="search" scale="1.25"></icon>
					    				</span>
					    			</b-button>
					    		</div>

						    </b-col>

							<!-- Places, Sources icons -->
							<b-col cols="5">

				    			<b-row>
				    				<b-col cols="12">
				    					<span class="wfs_pagelevel_nav_labels" id="wfs_cooccurrences_label">Co-occurrences</span>
				    				</b-col>
				    			</b-row>								
								
								<b-row>

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

							<!-- Back to previous page button -->
							<b-col cols="3" style="margin-left: 3em; margin-top: 2em;">
								<b-button @click="switchToPreviousPage" size="lg" style="float: right;" disabled>
									<span>&nbsp;Back to previous page</span>
								</b-button>
							</b-col>

						</b-row>

						<!-- Place information -->
						<b-row style="margin-left: 1em !important;">

							<b-col cols="12">

		                        <div class="wfs_page_component" style="margin: 2em 2em 0em 0em;">

		                            <!-- Header -->
		                            <b-row class="wfs_page_header" style="margin-left: 0.5em;">
		                                <h5 class="wfs_user_direction">About this source</h5>
		                            </b-row>

		                            <b-row class="wfs_page_content" style="margin-bottom: 1em; margin-top: 0em;">
		                            	<b-col cols="12">
											<div style="padding: 1em;">

												<wfs-metadata label="Place" :value="cp.currentSource.place"></wfs-metadata>
												<wfs-metadata label="Date" :value="cp.currentSource.date"></wfs-metadata>
												<wfs-metadata label="Rights holder" :value="cp.currentSource.rights_holder"></wfs-metadata>
												<wfs-metadata label="Type" :value="cp.currentSource.source_type"></wfs-metadata>
												<wfs-metadata label="More information" :value="cp.currentSource.link" is-link></wfs-metadata>
												<wfs-metadata v-if="cp.currentSource.notes.length > 0" label="Notes" :value="' '">
					            					<wfs-read-more more-str="read more" :text="cp.currentSource.notes" link="#" less-str="read less" :max-chars="maxCharsReadMore"></wfs-read-more>
					            				</wfs-metadata>

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

														v-for="bookID in Object.keys(cp.sourcesJSON[cp.currentSource.id].stats.book_and_page_ids)" :bookNumber="cp.bookIDsToNumbers[bookID]" :pages="cp.sourcesJSON[cp.currentSource.id].stats.book_and_page_ids[bookID]" 
														:key="'ppskFeatured' + bookID" :cp="cp"></wfs-ppsk-featured>
												</b-col>
											</b-row>											                            	
										</b-col>
		                            </b-row>

		                        </div>  								

							</b-col>

						</b-row>
					</b-col>

					<!-- Sidebar -->
					<b-col class="wfs_sidebar_column" cols="3">
						
						<div :style="{ height: viewportHeight, overflowY: 'scroll' }" class="wfs_shadowed_cards">
							<component v-for="entry in myCardList" :is="childCardType" :key="entry.id" :json="entry" :occurrences="coOccurrences" :cp="cp" :switchmethod="switchMethod" occurrenceText="Co-occurrence on pages" :previous-page="myComponentName">
								
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
import bButton from "bootstrap-vue/es/components/button/button";

// Bootstrap grid layout
import bContainer from "bootstrap-vue/es/components/layout/container";
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";
import wfsNav from "./wfs_nav.vue";
import wfsPersonCard from "./wfs_person_card.vue";
import wfsPPSKFeatured from "./wfs_ppsk_featured.vue";
import wfsPlaceCard from "./wfs_place_card.vue";
import wfsSourceCard from "./wfs_source_card.vue";

// Third party components
import wfsReadMore from "./wfs_read_more.vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/Search";


export default {

	name: "wfs-person",

	props: ["cp", "previousPage", "switchMethod"],

	computed: {

		viewportHeight: function() {

			return "90vh";
		}
	},

	components: {

		"b-button": bButton,
		"b-img": bImg,

		"b-container": bContainer,
		"b-row": bRow,
		"b-col": bCol,

		"wfs-metadata": wfsMetadata,
		"wfs-nav": wfsNav,

		"wfs-person-card": wfsPersonCard,
		"wfs-place-card": wfsPlaceCard,
		"wfs-source-card": wfsSourceCard,

		"wfs-ppsk-featured": wfsPPSKFeatured,

		"icon": Icon,
	},

	data() {
		
		return {

			childCardType: "",
			coOccurrences: {},
			myCardList: [],

			// Used for children name reference to parent
			myComponentName: "wfs-place",			
		};
	},

	methods: {

		// Sidebar methods
		addCardToSideBar: function(p_json) {

			this.myCardList.push(p_json);
		},

		clearSideBar: function() {

			// Clear the array, will automatically depopulate the list of card components
			this.myCardList = [];
			this.coOccurrences = {};
		},

		populateSideBar: function(p_type){

			let myPPSIDs = null;
			let myCoOccurrences = {};
			let myPerson = this.cp.currentPerson;

			// Change active card type
			this.childCardType = p_type;

			// Clear the side bar of cards
			this.clearSideBar();

			// Get a ref. to the corresponding place/source collection of co-occurring IDs for this person
			switch ( p_type ){

				case "wfs-person-card":
					myPPSIDs = myPerson.stats.people_ids;
					myCoOccurrences = myPerson.stats.people_on_pages_dict;
					break;
				case "wfs-place-card":
					myPPSIDs = myPerson.stats.places_ids;
					myCoOccurrences = myPerson.stats.places_on_pages_dict;
					break;
				case "wfs-source-card":
					myPPSIDs = myPerson.stats.sources_ids;
					myCoOccurrences = myPerson.stats.sources_on_pages_dict;
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

				if ( this.cp.myJSONList[index].book.stats.sources_ids.includes(this.cp.currentSource.id) ) {
					bookCount += 1;
				}
			}

			return bookCount;
		},

		getCollectionOccurrences: function() {

			return this.cp.collection.sources_ids_dict[this.cp.currentSource.id];
		},

		getPageCount: function() {

			let pageCount = 0;

			for ( let index = 0; index < this.cp.myJSONList.length; index++ ) {
				for ( let index2 = 0; index2 < this.cp.myJSONList[index].pages.length; index2++ ) {
					if ( this.cp.myJSONList[index].pages[index2].sources_ids.includes(this.cp.currentSource.id) ) {
						pageCount += 1;
					}
				}	
			}

			return pageCount;
		},

		switchToPreviousPage: function() {

			// Clear the sidebar of cards
			this.clearSideBar();

			// Switch back to the page that brough the user to this place page
			this.switchMethod(this.previousPage);
		},
	},

}
</script>

<style>

</style>