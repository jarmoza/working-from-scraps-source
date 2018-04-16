<template>

	<div class="wfs_pagelevel_limits">

		<wfs-nav id="pagelevel_navbar" :title="cp.title" :color="spineColor">

			<span class="navbar-brand">
				p.&nbsp;{{ currentPage.number + currentPage.suffix }}
			</span>

		</wfs-nav>

		<div class="wfs_pagelevel_limits">

			<b-container class="wfs_main_content_area" fluid>

				<!-- Highest level row -->
				<b-row style="height: 100%; bottom: 0;">

					<!-- Main content area -->
					<b-col cols="9" :style="{ height: viewportHeight, overflowY: 'scroll' }">

						<!-- Page controls -->
					    <b-row style="margin-top: 1em;">

					    	<b-col cols="3">
				    			
				    			<b-row>
				    				<b-col cols="12">
				    					<span class="wfs_pagelevel_nav_labels" id="wfs_navigation_label">Navigation</span>
				    				</b-col>
				    			</b-row>

				    			<b-row>
				    				<b-col cols="12">
								       	<b-button-group style="margin-left: 2em;">
								    		<b-button @click="firstPage" title="First Page"><icon name="angle-double-left" scale="1.75"></icon></b-button>
								    		<b-button @click="previousPage" title="Previous Page"><icon name="angle-left" scale="1.75"></icon></b-button>
								    		<b-button @click="nextPage" title="Next Page"><icon name="angle-right" scale="1.75"></icon></b-button>
								    		<b-button @click="lastPage" title="Last Page"><icon name="angle-double-right" scale="1.75"></icon></b-button>
								    	</b-button-group>
						    		</b-col>
						    	</b-row>
						    </b-col>

							<!-- People, Places, Sources icons -->
							<b-col cols="5">
								
				    			<b-row>
				    				<b-col cols="12">
				    					<span class="wfs_pagelevel_nav_labels" id="wfs_cooccurrences_label">Occurrences</span>
				    				</b-col>
				    			</b-row>

								<b-row>

									<!-- People icon -->
									<b-col cols="2" class="wfs_pps_icon_box">
										<div>
											<div class="wfs_img_div_for_translation">
												<div class="wfs_pps_icon_img">
													<!-- <h6 class="wfs_pps_icon_text">People</h6> -->
						                    		<b-img :src="cp.icons.people" blank-color="#abc" height="50%" alt="placeholder" title="People" @click="populateSideBar('wfs-person-card')"/>
						                    	</div>
						                	</div>	
										</div>
									</b-col>

									<!-- Places icon -->
									<b-col cols="2" class="wfs_pps_icon_box">
										<div>
											<div class="wfs_img_div_for_translation">
												<div class="wfs_pps_icon_img">
													<!-- <h6 class="wfs_pps_icon_text">Places</h6> -->
								                    <b-img :src="cp.icons.places" blank-color="#abc" height="50%" alt="placeholder" title="Places" @click="populateSideBar('wfs-place-card')"/>
								                </div>
						                	</div>
										</div>
									</b-col>

									<!-- Sources icon -->
									<b-col cols="2" class="wfs_pps_icon_box" >
										<div>
											<div class="wfs_img_div_for_translation">
												<div class="wfs_pps_icon_img">
													<!-- <h6 class="wfs_pps_icon_text">Sources</h6> -->
								                    <b-img :src="cp.icons.sources" blank-color="#abc" height="50%" alt="placeholder" title="Sources" @click="populateSideBar('wfs-source-card')"/>
								                </div>
							                </div>
										</div>
									</b-col>

								</b-row>

							</b-col>

							<b-col cols="3" style="margin-left: 3em; margin-top: 2em;">

								<!-- Back to collection button -->
								<b-button @click="switchToScrapbookLevel" size="lg" style="float: right;">
									<span>&nbsp;Back to Book</span>
								</b-button>

							</b-col>

						</b-row>						

						<!-- Main content area includes contextual content (page info, people/place/source info) -->
						<b-row style="margin-left: 1em !important;">
							<b-col cols="12">
								<keep-alive>
									<component :is="childContentType" :cp="cp" 
									:pageList="pageList" :createPageList="createPageList" :switchMethod="switchMethod"></component>
								</keep-alive>
							</b-col>
						</b-row>
					</b-col>

					<!-- Sidebar -->
					<b-col cols="3" class="wfs_sidebar_column">

						<b-row>
							<b-col cols="12">
								<div class="wfs_cardlist_label">
									{{ plainTextCardType }}
								</div>
							</b-col>
						</b-row>

						<b-row>
							<b-col cols="12" >
							<div :style="{ height: viewportHeight, overflowY: 'scroll' }" class="wfs_shadowed_cards">
								<component v-for="entry in myCardList" :is="childCardType" :key="entry.id" :json="entry" :occurrences="currentOccurrences" occurrenceText="Occurrences on page" :cp="cp" :switchmethod="switchMethod" :previous-page="myComponentName" :roleList="myRoleList">
								</component>
								<span v-if="0 == myCardList.length && cardAddAttempt" style="font-size: 1em; top: 50%; left: 5%; position: relative;">No associated {{ plainTextCardType.toLowerCase() }}</span>
							</div>
							</b-col>
						</b-row>

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
import bButtonGroup from "bootstrap-vue/es/components/button-group/button-group";

// Bootstrap grid layout
import bContainer from "bootstrap-vue/es/components/layout/container";
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";
import wfsNav from "./wfs_nav.vue";
import wfsPageLevelInfo from "./wfs_pagelevel_info.vue";

import wfsPersonCard from "./wfs_person_card.vue";
import wfsPlaceCard from "./wfs_place_card.vue";
import wfsSourceCard from "./wfs_source_card.vue";

// Third party VueJS components
import wfsReadMore from "./wfs_read_more.vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/arrow-circle-left";
import "vue-awesome/icons/Angle-Left";
import "vue-awesome/icons/Angle-Right";
import "vue-awesome/icons/Angle-Double-Left";
import "vue-awesome/icons/Angle-Double-Right";


export default {

	name: "wfs-pagelevel",

	props: ["cp", "switchMethod"],

	components: {

        "b-img": bImg,
        "b-button": bButton,
        "b-button-group": bButtonGroup,     
        
        "b-container": bContainer,
        "b-row": bRow,
        "b-col": bCol,

        "wfs-metadata": wfsMetadata,
        "wfs-nav": wfsNav,
        "wfs-pagelevel-info": wfsPageLevelInfo,

        "wfs-person-card": wfsPersonCard,
        "wfs-place-card": wfsPlaceCard,
        "wfs-source-card": wfsSourceCard,

        "wfs-read-more": wfsReadMore,

        "icon": Icon,
	},

	data() {

		return { 

			// Used for children name reference to parent
			myComponentName: "wfs-pagelevel",

			myCardList: [],
			myRoleList: [],
			pageList: [],

			childCardType: "wfs-person-card",

			childContentType: "wfs-pagelevel-info",	

			personOccurrences: {},
			placeOccurrences: {},
			sourceOccurrences: {},
			currentOccurrences: null,

			cardAddAttempt: false,
		};
	},

	computed: {

		pages: function() {

			return this.cp.myJSON[this.cp.currentEntry.number].pages;
		},

		currentPage: function(){

			return this.cp.myJSON[this.cp.currentEntry.number].pages[this.cp.pageIndex];
		},

		spineColor: function(){
			
			return this.cp.bookCoverColors[this.cp.bookNumber].spine;
		},

		viewportHeight: function() {

			return "90vh";
		},

		plainTextCardType: function() {

			// No label for a blank card list
			if ( 0 == this.myCardList.length && !this.cardAddAttempt ) {
				return "";
			}

			// Determine interface label for card list based on card type
			let plainText = "";
			switch ( this.childCardType ){
				
				case "wfs-person-card":
					plainText = "People on this page";
					break;

        		case "wfs-place-card":
        			plainText = "Places on this page";
        			break;
        
        		case "wfs-source-card":
        			plainText = "Sources on this page";
        			break;
			}

			return plainText;
		},
	},

	methods: {

		// Sidebar methods
		addCardToSideBar: function(p_json) {

			this.myCardList.push(p_json);
		},

		clearSideBar: function() {

			// Clear the array, will automatically depopulate the list of card components
			this.myCardList = [];
			this.myRoleList = [];
			this.personOccurrences = {};
			this.placeOccurrences = {};
			this.sourceOccurrences = {};

			// Reset flag to indicate no cards have been attempted to be added
			this.cardAddAttempt = false;
		},

		clearPageList: function() {

			this.pageList = [];
		},

		createPageList: function() {

			this.pageList = [];

			for ( let index = 0; 
				  index < this.cp.myJSON[this.cp.currentEntry.number].pages.length;  
				  index++ ) {
				this.pageList.push(
					this.cp.myJSON[this.cp.currentEntry.number].pages[index].number + 
					this.cp.myJSON[this.cp.currentEntry.number].pages[index].suffix);
			}
		},

		populateSideBar: function(p_type){

			let myPPSIDs = null;
			let myOccurrences = null;
			let myPage = this.cp.myJSON[this.cp.bookNumber].pages[this.cp.pageIndex];			
			// Change active card type
			this.childCardType = p_type;

			// Clear the side bar of cards
			this.clearSideBar();

			// Set flag to indicate cards have been added
			this.cardAddAttempt = true;			

			// Get a reference to the corresponding PPS collection of IDs for this page
			switch ( p_type ){

				case "wfs-person-card":
					myPPSIDs = myPage.people_ids;
					this.myRoleList = myPage.people_roles;
					this.currentOccurrences = this.personOccurrences;
					break;
				case "wfs-place-card":
					myPPSIDs = myPage.places_ids;
					this.currentOccurrences = this.placeOccurrences;
					break;
				case "wfs-source-card":
					myPPSIDs = myPage.sources_ids;
					this.currentOccurrences = this.sourceOccurrences;
					break;
			}
			myOccurrences = this.currentOccurrences;

			// Tally occurrences of IDs for the page
			for ( let index = 0; index < myPPSIDs.length; index++ ) {

				if ( myPPSIDs[index] in myOccurrences ) {
					myOccurrences[myPPSIDs[index]] += 1;
				} else {
					myOccurrences[myPPSIDs[index]] = 1;
				}
			}

			// Sort IDs by number of occurrences for the page
			let keysSorted = Object.keys(myOccurrences).sort(
				function(a, b) {
					return myOccurrences[a] - myOccurrences[b];
				});

			// Populate the side bar with cards for all of the IDs in that collection
			// Add cards by descending order of number of occurrences
			for ( let index = keysSorted.length - 1; index >= 0; index-- ){

				switch ( p_type ){
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

		// Page navigation methods
		firstPage: function() {

			this.clearSideBar();
			this.cp.pageIndex = 0;
		},

		// Page methods
		nextPage: function(){

			this.clearSideBar();
			if ( this.cp.pageIndex < this.cp.myJSON[this.cp.currentEntry.number].pages.length - 1 ){
				this.cp.pageIndex += 1;
			}
		},

		previousPage: function(){

			this.clearSideBar();
			if ( this.cp.pageIndex > 0 ) {
				this.cp.pageIndex -= 1;
			}
		},

		lastPage: function() {

			this.clearSideBar();
			this.cp.pageIndex = this.cp.myJSON[this.cp.currentEntry.number].pages.length - 1;
		},		

		setNavbarToSpineColor: function() {

            // Workaround to override color via jQuery
            let cp = this.cp;
            $("#pagelevel_navbar").each(function(){

                this.style.setProperty("background-color", 
                    cp.bookCoverColors[cp.bookNumber].spine, "important");
            });
        },		

		switchToScrapbookLevel: function() {

			// Clear the sidebar of components
			this.clearSideBar();

			// Clear the page list dropdown
			this.clearPageList();

            // Push route
            this.$router.push({ name: "Book", 
                                params: { bookNumber: this.cp.currentEntry.number } });				

			// Switch parent prop to scrapbooklevel component
            this.switchMethod("wfs-scrapbooklevel");			
		},
	},

	// Hooks
	created() {

        // In case a routing link has been used to get directly to a page
        if ( this.$route && 
        	 this.$route.params.bookNumber && 
        	 this.$route.params.pageNumber ) {

        	this.cp.currentEntry = this.cp.myJSON[this.$route.params.bookNumber].book;
        	this.cp.pageIndex = parseInt(this.$route.params.pageNumber);
        }  

        // Create initial page list
        this.createPageList();
	},

	mounted(){
		
		// this.setNavbarToSpineColor();
	},

	updated() {

		this.setNavbarToSpineColor();
		
		// Create a new list of pages for the navigation dropdown if needed
		if ( this.cp.newPageListNeeded ) {
			
			this.createPageList();

			// Reset the flag
			this.cp.newPageListNeeded = false;
		}
	},
}
</script>

<style>

.wfs_cardlist_label {

	font-size: 1.25em;
	font-weight: 900;
	padding-top: 0.5em;
	padding-bottom: 0.5em;
}

#wfs_navigation_label {

	margin-left: 1.75em;
}

#wfs_cooccurrences_label {

	margin-left: 1em;
}
/*.wfs_pagelevel_fieldset {

	margin: 5px;
	padding: 5px;
	border: 2px solid black;
}

.wfs_pagelevel_fieldset_legend {

	font-size: 1em;
}*/
</style>