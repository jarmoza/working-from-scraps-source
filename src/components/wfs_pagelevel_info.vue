<template>

	<div>

		<b-row>

			<b-col cols="12">
				<div class="wfs_page_component" style="margin: 2em 2em 0em 0em;">

				    <!-- Page Information Header -->
				    <b-row class="wfs_page_header" style="padding-left: 0em; margin-bottom: 0em;">

				    	<b-col cols="6">
				        	<h5 class="wfs_user_direction" style="float: left;">About this page</h5>
				        </b-col>
				    	<b-col cols="6">

							<b-dropdown :text="currentPageNumber" 
								class="m-md-2" id="wfs_pagelevel_dropdown"
								style="float: right;" >

							    <b-dropdown-item v-for="pageNumber in pageList" :key="pageNumber" @click="changePage(pageNumber)">
							    	{{ pageNumber }}
							    </b-dropdown-item>

							</b-dropdown>
					
				        	<!-- <h5 style="font-weight: bold; float: right;">
				        		{{ currentPage.number + currentPage.suffix }}
				        	</h5> -->
				        </b-col>				        
				    </b-row>

			        <!-- Page Information -->
			        <b-row class="wfs_page_content" style="margin-bottom: 1em; margin-top: 0em;">

						<!-- 	

							"id": p_json_entry["Page_Id"],
							"number": p_json_entry["Page_number"],
							"suffix": p_json_entry["Page_Number_suffix"],
							"book_id": p_json_entry["Scrapbook_Id"],
							"desc": p_json_entry["Page_desc"],
							"foldout": p_json_entry["Page_foldout"],
							"clippings": int(p_json_entry["Page_clipping_count"]),
							"keywords": p_json_entry["Page_keywords"].split(", "),
							"orientations": p_json_entry["Page_clipping_orientations"].split(", "),
							"orig_material": p_json_entry["Page_original_material"],
							"notes": p_json_entry["Page_notes"],
							"people_ids": [],
							"places_ids": [],
							"sources_ids": [],

							# Stats section
							"stats": {
							
								"people_dates_lived": {},
								"people_nationalities": {},
								"people_genders": {},
								"people_titles": {},

								"place_counts_dict": {},

								"sources_publ_places": {},
								"source_orig_publ_dates": {},
								"sources_publishers": {},
							}
						-->	                		                
			        	<b-col cols="12">

			            	<wfs-metadata label="Clippings" :value="currentPage.clippings"></wfs-metadata>
			            	<wfs-metadata label="Keywords" value=" ">
			            		<span v-html="keywordRouteStr"></span>
			            		<!-- <p v-for="keyword in currentPage.keywords" class="wfs_keyword_span" @click="switchMethod('wfs-keyword', { keywordID: cp.collection.keywords_to_ids[currentPage.keywords[keyword]] })" :key="cp.collection.keywords_to_ids[currentPage.keywords[keyword]]">
			            		{{ keyword }}{{ hasCommaForKeyword(keyword) }}
			            		</p> -->
			            	</wfs-metadata>
			            	
			            	<wfs-metadata label="Foldout" :value="currentPage.foldout"></wfs-metadata>
			            	<wfs-metadata label="Clipping orientations" 
			            		:value="currentPage.orientations.join(', ')"></wfs-metadata>
			            	<wfs-metadata label="Contains original material" :value="currentPage.orig_material"></wfs-metadata>
			            	<wfs-metadata label="Description" :value="' '">
			            		<wfs-read-more more-str="read more" :text="currentPage.desc" link="#" less-str="read less" :max-chars="maxCharsReadMore"></wfs-read-more>
			            	</wfs-metadata>

			        	</b-col>

				    </b-row>			    
				
				</div>
			</b-col>
		
		</b-row>

        <!-- Visualization area -->
        <!-- <b-row>

            <b-col cols="12">
                
                <div class="wfs_page_component" style="margin: 2em 2em 0em 0em;">

                    <b-row class="wfs_page_header">
                        <h5 class="wfs_user_direction">Page overview</h5>
                    </b-row>

                </div>                     

            </b-col>
            
        </b-row> -->		

	</div>

</template>

<script>

// Bootstrap components
import bButton from "bootstrap-vue/es/components/button/button";
import bDropdown from "bootstrap-vue/es/components/dropdown/dropdown";
import bDropdownItem from "bootstrap-vue/es/components/dropdown/dropdown-item";


// Bootstrap grid layout
import bContainer from "bootstrap-vue/es/components/layout/container";
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";

// Third party VueJS components
import wfsReadMore from "./wfs_read_more.vue";
import Icon from "vue-awesome/components/Icon";


export default {

	name: "wfs-pagelevel-info",

	props: ["cp", "pageList", "createPageList", "switchMethod"],

	data() {

		return {

			maxCharsReadMore: 200,
			pageIndex: 0,
			keywordRouteStr: "",
		};
	},

	components: {

		"b-button": bButton,
        "b-dropdown": bDropdown,
        "b-dropdown-item": bDropdownItem,

		"b-container": bContainer,
		"b-row": bRow,
		"b-col": bCol,

		"wfs-metadata": wfsMetadata,

		"wfs-read-more": wfsReadMore,
		"icon": Icon,
	},

	computed: {

		pages: function() {

			return this.cp.myJSON[this.cp.currentEntry.number].pages;
		},

		currentPage: function() {

			return this.cp.myJSON[this.cp.currentEntry.number].pages[this.cp.pageIndex];
		},

		currentPageNumber: function() {
			
			return this.pageList[this.cp.pageIndex];
		}
	},

	methods: {

		changePage: function(p_pageNumber) {

			for ( let index = 0; index < this.cp.myJSON[this.cp.currentEntry.number].pages.length; index++ ) {

				if ( p_pageNumber == (this.cp.myJSON[this.cp.currentEntry.number].pages[index].number + this.cp.myJSON[this.cp.currentEntry.number].pages[index].suffix) ) {

					this.pageIndex = index;
					this.cp.pageIndex = index;
					this.$router.push({ 
    					name: "Page",
    					params: { bookNumber: this.cp.currentEntry.number,
    							  pageNumber: index }
					});
				}
			}
		},

		createKeywordRouteStr: function() {
			
	        let keywordRouteList = [];
	        let kwRouteStr = null;
	        for ( var keyword_id in this.currentPage.keywords ) {

	            kwRouteStr = "<a href='" + "/collection/keyword/" + this.cp.collection.keywords_to_ids[this.currentPage.keywords[keyword_id]] + "'>" + this.currentPage.keywords[keyword_id] + "</a>"
	            keywordRouteList.push(kwRouteStr);
	        }

	        this.keywordRouteStr = keywordRouteList.join(", ");
		},

		hasCommaForKeyword: function(p_keyword) {

			return ( p_keyword == this.currentPage.keywords[this.currentPage.keywords.length - 1] ) ? "" : ", "
		},
	},

	mounted() {

		// Create the keyword links for this page
		this.createKeywordRouteStr();
	},

	updated() {

		// Update the keyword links for this page
		this.createKeywordRouteStr();
	},

}
</script>

<style>

#wfs_pagelevel_dropdown {

	margin: 0em !important;
	border-radius: 5px !important;
}

#wfs_pagelevel_dropdown:hover {

	background-color: #E8E8E8 !important;
}

#wfs_pagelevel_dropdown button:focus {
	
	outline: none;
}

#wfs_pagelevel_dropdown button {

	background-color: #E8E8E8 !important;
	color: black;
	font-size: 1em;
	/*font-weight: bold;*/
	border-width: 2px;
	border-color: black;
}

.dropdown-item:hover {

	background-color: #E8E8E8 !important;
	outline-color: grey !important;
	outline-style: solid;
	outline-width: 2px;
}

.dropdown-item {

	background-color: #E8E8E8 !important;
}

.dropdown-menu {

	overflow-y: scroll;
	max-height: 200px;
	background-color: #E8E8E8;
}

.dropdown-menu:focus {

	outline: none !important;
}

.dropdown-toggle:focus {

	outline: none !important;
}

.dropdown-toggle:hover > .dropdown-item {

	outline: grey;
}

.wfs_keyword_span {
	color: grey;
	display: inline;
}
</style>