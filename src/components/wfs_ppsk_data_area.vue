<template>

	<div style="margin-bottom: 2em;">



		<!-- Bar type data area represents a collection overview visualization + table combo -->
		<div v-if="'bar' == chartType">
			
			<!-- Label -->
			<b-row style="margin-bottom: 1em; margin-left: 2em;">

				<b-col cols="7"></b-col>

				<b-col cols="4">
					<span style="float: right; color: black; font-size: 1.35em; font-weight: bold;" class="wfs_page_header">{{ plainTextLabel }}</span>
				</b-col>			
				
				<b-col cols="1"></b-col>

			</b-row>

			<!-- Bar graph and pie chart -->
			<b-row>

				<!-- Bar -->
				<b-col cols="6" >
					<wfs-bar-chart :myData="barData" myLabel="" :myColors="barColors" style="padding: 0; width: 100%; display: inline;" xAxisLabel="Scrapbook"></wfs-bar-chart>
				</b-col>

				<!-- Pie -->
				<b-col cols="6">
					<wfs-pie-chart :myData="pieData" :myLabel="pieLabel"
								   :myColors="cp.colrdPalette" legend="labeled" 
								   ></wfs-pie-chart>
				</b-col>

			</b-row>

			<!-- Search box -->
			<b-row style="margin-bottom: 1em; margin-top: 1em;">

				<b-col cols="8"></b-col>
					
				<b-col cols="4">
					<span style="">
						<b-form-group horizontal label="" class="mb-0" style="min-width: 100%;">
					    	<b-input-group>
					            <b-form-input v-model="filter" :placeholder="plainTextSearchLabel" class="wfs_pps_search_box" />
					            <!-- <b-input-group-append>
					              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
					            </b-input-group-append> -->
					        </b-input-group>
					    </b-form-group>
					</span>
				</b-col>

			</b-row>

			<!-- Data table -->
			<b-row>

				<b-col cols="12" style="border: 1px solid black; padding: 0;">
					
					<b-table striped hover responsive fixed
						:fields="fields"
						:items="ppskItems" 
						:sort-by.sync="sortBy"
						:sort-desc.sync="sortDesc"
						:sort-compare="sortName"
						:filter="filter"
						style="max-height: 37vh; min-height: 37vh;">
						<span slot="name" slot-scope="data" v-html="data.value">
	      				</span>
						<span slot="scrapbooks" slot-scope="data" v-html="data.value">
	      				</span>
	      				<!-- <span slot="emptyfiltered"><p>{{ noRecordsFilterText }}</p></span> -->
					</b-table>

				</b-col>

			</b-row>

		</div>

		<!-- Pie type data area represents a book overview visualization + table combo -->
		<div v-else-if="'pie' == chartType">

			<b-row>

				<!-- Pie chart -->
				<b-col cols="5">
					<wfs-pie-chart :myData="pieData" :myLabel="pieLabel"
								   :myColors="cp.colrdPalette" legend="labeled" 
								   :pieScale="pieScale">
					</wfs-pie-chart>
				</b-col>

				<!-- Search box and Data table -->
				<b-col cols="7">

					<!-- Label and Search box -->
					<b-row style="margin-bottom: 1em;">

						<b-col cols="6">
							<span style="float: right; color: black; font-size: 1.35em; font-weight: bold;" class="wfs_page_header">{{ plainTextLabel }}</span>
						</b-col>

						<b-col cols="6">
							<span style="">
								<b-form-group horizontal label="" class="mb-0">
							    	<b-input-group>
							            <b-form-input v-model="filter" :placeholder="plainTextSearchLabel" class="wfs_pps_search_box" />
							            <!-- <b-input-group-append>
							              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
							            </b-input-group-append> -->
							        </b-input-group>
							    </b-form-group>
							</span>
						</b-col>

					</b-row>				

				
					<b-row style="border: 1px solid black; padding: 0;">
						<b-col cols="12" style="padding: 0;">
							<b-table striped hover responsive fixed
								:fields="fields"
								:items="ppskItems" 
								:sort-by.sync="sortBy"
								:sort-desc.sync="sortDesc"
								:sort-compare="sortName"
								:filter="filter"
								style="max-height: 37vh; min-height: 37vh;">
								<span slot="name" slot-scope="data" v-html="data.value">
			      				</span>
								<span slot="page_appearances" slot-scope="data" v-html="data.value">
			      				</span>
			      				<!-- <span slot="emptyfiltered"><p>{{ noRecordsFilterText }}</p></span> -->
							</b-table>
						</b-col>
					</b-row>

				</b-col>

			</b-row>
		</div>
	</div>

</template>

<script>

// Bootstrap grid layout
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// Bootstrap components
import bInputGroup from "bootstrap-vue/es/components/input-group/input-group";
import bFormGroup from "bootstrap-vue/es/components/form-group/form-group";
import bFormInput from "bootstrap-vue/es/components/form-input/form-input";
import bLink from "bootstrap-vue/es/components/link/link";
import bTable from "bootstrap-vue/es/components/table/table";

// WFS Components
import wfsBarChart from "./wfs_bar_chart.vue";
import wfsPieChart from "./wfs_pie_chart.vue";

export default {

	name: "wfs-ppsk-data-area",
	
	props: ["cp", "chartType", "ppskType", "level", "barColor", "hasPieData",
	"pieScale"],
	
	components: {

		"b-row": bRow,
		"b-col": bCol,

		"b-input-group": bInputGroup,
		"b-form-group": bFormGroup,
		"b-form-input": bFormInput,
		"b-link": bLink,
		"b-table": bTable,

		"wfs-bar-chart": wfsBarChart,
		"wfs-pie-chart": wfsPieChart, 
	},

	data() {

		return {

			filter: null,
			pieLabel: "",
			sortDesc: false,
			
		};
	},

	computed: {

		barData: function() {

			let myData = null;
			switch ( this.level ){

				case "collection":

					myData = this.barData_Collection();

					break;

				case "book":

					myData = this.barData_Book();

					break;
			}

			return myData;
		},

		barColors: function() {

			let myColors = null;

			switch ( this.level ) {

				case "collection":

					myColors = this.barColors_Collection();

					break;

				case "book":

					// myColors = this.barColors_Book();
					myColors = this.barColors_Collection();

					break;					
			}


			return myColors;
		},

		fields: function() {

			let myFields = [];
			switch ( this.level ) {

				case "collection":

					myFields = this.fields_Collection();

					break;

				case "book":

					myFields = this.fields_Book();

					break;
			}

			return myFields;
		},

		noRecordsFilterText: function() {

			return "No " + this.plainTextLabel.toLowerCase() + " match this search";
		},

		pieData: function() {

			let myPieData = [];
			switch ( this.level ) {

				case "collection":

					myPieData = this.pieData_Collection();
					break;

				case "book":

					myPieData = this.pieData_Book();
					break;
			}

			return myPieData;
		},

		plainTextLabel: function() {

			let myLabel = "" 

			switch ( this.level ) {

				case "collection":

					myLabel = this.plainTextLabel_Collection();

					break;

				case "book":

					myLabel = this.plainTextLabel_Book();

					break;
			}

			return myLabel;
		},

		plainTextSearchLabel: function() {

			let myLabel = "";

			switch ( this.ppskType ) {

				case "people":
					myLabel = "Type to Search People...";
					break;
				case "places":
					myLabel = "Type to Search Places...";
					break;
				case "sources":
					myLabel = "Type to Search Sources...";
					break;
			}

			return myLabel;
		},

		ppskItems: function() {

			let myTableItems = null;
			switch ( this.level ) {

				case "collection":

					myTableItems = this.ppskItems_Collection();
					
					break;

				case "book":

					myTableItems = this.ppskItems_Book();

					break;
			}

			return myTableItems;
		},

		sortBy: {

			get: function() {

				let mySortBy = ""

				switch ( this.ppskType ) {

					case "people":
					case "places":
					case "sources":

						mySortBy = "name";
						break;
				}

				return mySortBy;
			},

			set: function(p_newValue) {

			},
		},

	},

	methods: {

		barColors_Collection: function() {

			let myColors = [];
			switch ( this.ppskType ) {

				case "people":
				case "places":
				case "sources":

					myColors = [

						this.barColor,
						this.barColor,
						this.barColor,
						this.barColor,

						// this.cp.bookCoverColors["1"].spine,
						// this.cp.bookCoverColors["6"].spine,
						// this.cp.bookCoverColors["9"].spine,
						// this.cp.bookCoverColors["12"].spine,
					];

					break;

			}

			return myColors;
		},

		barColors_Book: function() {

		},		

		barData_Collection: function() {

			// [['Documented', 44], ['Undocumented', 23]]
			let myData = null;
			switch ( this.ppskType ) {

				case "people":

					myData = [

						{ name: "",  data: [["1", this.cp.myJSON["1"].book.stats.people_ids.length], ["6", this.cp.myJSON["6"].book.stats.people_ids.length], ["9", this.cp.myJSON["9"].book.stats.people_ids.length], ["12", this.cp.myJSON["12"].book.stats.people_ids.length]] }

					];

					break;

				case "places":

					myData = [

						{ name: "", 
						  data: [
							["1",  this.cp.myJSON["1"].book.stats.places_ids.length],
							["6",  this.cp.myJSON["6"].book.stats.places_ids.length],
							["9",  this.cp.myJSON["9"].book.stats.places_ids.length],
							["12", this.cp.myJSON["12"].book.stats.places_ids.length]
						  ], 
						},
					];

					break;

				case "sources":	

					myData = [

						{ name: "", 
						  data: [
							["1",  this.cp.myJSON["1"].book.stats.sources_ids.length],
							["6",  this.cp.myJSON["6"].book.stats.sources_ids.length],
							["9",  this.cp.myJSON["9"].book.stats.sources_ids.length],
							["12", this.cp.myJSON["12"].book.stats.sources_ids.length]
						  ],
						},
					];

					break;

			}

			return myData;
		},

		barData_Book: function() {

		},

		countChars: function(p_string, p_char) {

    		return (p_string.length - p_string.replace(new RegExp(p_char,"g"), '').length) / p_char.length;
		},

		fields_Collection: function() {

			let myFields = [];
			switch ( this.ppskType ) {

				case "people":

					myFields = [

						{ key: "name", sortable: true },
						{ key: "roles", sortable: true },
        				{ key: "collection_appearances", sortable: true },
        				{ key: "scrapbooks", sortable: true },
					];

					break;

				case "places":

					myFields = [

						{ key: "name", sortable: true },
						{ key: "continent", sortable: true },
        				{ key: "collection_appearances", sortable: true },
        				{ key: "scrapbooks", sortable: true },
					];

					break;
				case "sources":

					myFields = [

						{ key: "name", sortable: true },
						{ key: "type", sortable: true },
        				{ key: "collection_appearances", sortable: true },
        				{ key: "scrapbooks", sortable: true },
					];

					break;				
			}

			return myFields;
		},

		fields_Book: function() {

			let myFields = [];
			switch ( this.ppskType ) {

				case "people":

					myFields = [

						{ key: "name", sortable: true },
						{ key: "roles", sortable: true },
        				{ key: "page_appearances", sortable: true },
					];

					break;

				case "places":

					myFields = [

						{ key: "name", sortable: true },
						{ key: "continent", sortable: true },
        				{ key: "page_appearances", sortable: true },
					];

					break;
				case "sources":

					myFields = [

						{ key: "name", sortable: true },
						{ key: "type", sortable: true },
        				{ key: "page_appearances", sortable: true },
					];

					break;				
			}

			return myFields;

		},

		pieData_Collection: function() {

			let myPieData = [];
			switch ( this.ppskType ) {

				case "people":

					// Make the data set from role types
					for ( var key in this.cp.collection.role_type_counts ) {

						myPieData.push([key, parseInt(this.cp.collection.role_type_counts[key])]);
					}

					// Set the pie graph label
					this.pieLabel = "Roles";				

					break;

				case "places":

					// Make the data set from continents
					for ( var key in this.cp.collection.continent_counts ) {

						myPieData.push([key, parseInt(this.cp.collection.continent_counts[key])]);
					}

					// Set the pie graph label
					this.pieLabel = "Continents";				

					break;

				case "sources":

					// Make the data set from source types
					let unknownCounts = 0;
					for ( var key in this.cp.collection.source_type_counts ) {
						
						// "" and Unknown are considered the same
						if ( "" == key ) {
							
							unknownCounts += parseInt(this.cp.collection.source_type_counts[key]);
							continue;
						} else if ( "Uncertain/Unknown" == key ){
							
							unknownCounts += parseInt(this.cp.collection.source_type_counts[key]);
							myPieData.push([key, unknownCounts]);
							continue;
						}

						myPieData.push([key, parseInt(this.cp.collection.source_type_counts[key])]);
					}

					// Set the pie graph label
					this.pieLabel = "Types";
				
					break;
			}

			return myPieData;
		},

		pieData_Book: function() {

			let myPieData = [];
			switch ( this.ppskType ) {

				case "people":

					// Make the data set from role types
					for ( var key in this.cp.collection.role_type_counts ) {

						myPieData.push([key, parseInt(this.cp.currentEntry.stats.role_type_counts[key])]);
					}

					// Set the pie graph label
					this.pieLabel = "Roles";				

					break;

				case "places":

					// Make the data set from continents
					for ( var key in this.cp.collection.continent_counts ) {

						myPieData.push([key, parseInt(this.cp.currentEntry.stats.continent_counts[key])]);
					}

					// Set the pie graph label
					this.pieLabel = "Continents";				

					break;

				case "sources":

					// Make the data set from source types
					let unknownCounts = 0;
					for ( var key in this.cp.currentEntry.stats.source_type_counts ) {
						
						// "" and Unknown are considered the same
						if ( "" == key ) {
							
							unknownCounts += parseInt(this.cp.currentEntry.stats.source_type_counts[key]);
							continue;
						} else if ( "Uncertain/Unknown" == key ){
							
							unknownCounts += parseInt(this.cp.currentEntry.stats.source_type_counts[key]);
							myPieData.push([key, unknownCounts]);
							continue;
						}

						myPieData.push([key, parseInt(this.cp.currentEntry.stats.source_type_counts[key])]);
					}

					// Set the pie graph label
					this.pieLabel = "Types";
				
					break;
			}

			return myPieData;
		},

		plainTextLabel_Collection: function() {

			let myLabel = "";

			switch ( this.ppskType ) {

				case "people":

					myLabel = "People (" + 
						Object.keys(this.cp.peopleJSON).length + ")";
					break;

				case "places":

					myLabel = "Places (" +
						Object.keys(this.cp.placesJSON).length + ")";
					break;

				case "sources":

					myLabel = "Identified Sources (" +
						Object.keys(this.cp.sourcesJSON).length + ")";
					break;
			}

			return myLabel;
		},	

		plainTextLabel_Book: function() {

			let myLabel = "";
			switch ( this.ppskType ) {

				case "people":

					myLabel = "People (" + 
						this.cp.currentEntry.stats.people_ids.length.toString() + ")";
					break;

				case "places":

					myLabel = "Places (" +
						this.cp.currentEntry.stats.places_ids.length.toString() + ")";
					break;

				case "sources":

					myLabel = "Identified Sources (" +
						this.cp.currentEntry.stats.sources_ids.length.toString() + ")";
					break;
			}

			return myLabel;
		},

		ppskItems_Collection: function() {

			let myTableItems = [];

			switch ( this.ppskType ) {

				case "people":

					// Chart: Appearances by Scrapbook
					// Sorted by CollectionAppearances
					// { PersonName, CollectionAppearances, Scrapbooks (#appearances)}
					for ( var ppskID in this.cp.collection.people_ids_dict ) {
					
						let scrapAppears = [];

						// Build a string of links to scrapbooks this person appears
						for ( let index = 0; index < this.cp.myJSONList.length; 
							  index++ ) {

							if ( ppskID in this.cp.myJSONList[index].book.stats.people_ids_dict ) {

								scrapAppears.push("<a href='/collection/book/" + 
									this.cp.myJSONList[index].book.number + "/'>" + 
									this.cp.myJSONList[index].book.number + "(" + 
									this.cp.myJSONList[index].book.stats.people_ids_dict[ppskID] + ")</a>");
							}
						}

						// Create table items
						myTableItems.push({

							name:  "<a href='/collection/person/" + ppskID + "'>" + this.cp.peopleJSON[ppskID].name + "</a>",
							roles: this.cp.collection.roles_by_people_ids[ppskID].join(", "),
							collection_appearances: this.cp.collection.people_ids_dict[ppskID],
							scrapbooks: scrapAppears.join(", "),
						});
					}

					break;

					case "places":

						// Chart: Appearances by Scrapbook
						// Sorted by CollectionAppearances
						// { PlaceName, CollectionAppearances, Scrapbooks (#appearances)}
						for ( var ppskID in this.cp.collection.places_ids_dict ) {
						
							let scrapAppears = [];

							// Build a string of links to scrapbooks this place appears
							for ( let index = 0; index < this.cp.myJSONList.length; 
								  index++ ) {

								if ( ppskID in this.cp.myJSONList[index].book.stats.places_ids_dict ) {

									scrapAppears.push("<a href='/collection/book/" + 
										this.cp.myJSONList[index].book.number + "/'>" + 
										this.cp.myJSONList[index].book.number + "(" + 
										this.cp.myJSONList[index].book.stats.places_ids_dict[ppskID] + ")</a>");
								}
							}

							// Create table items
							myTableItems.push({

								name:  "<a href='/collection/place/" + ppskID + "'>" + this.cp.placesJSON[ppskID].name + "</a>",
								continent: this.cp.placesJSON[ppskID].continent,
								collection_appearances: this.cp.collection.places_ids_dict[ppskID],
								scrapbooks: scrapAppears.join(", "),
							});
						}					

						break;

					case "sources":

						// Chart: Appearances by Scrapbook
						// Sorted by CollectionAppearances
						// { SourceName, CollectionAppearances, Scrapbooks (#appearances)}
						for ( var ppskID in this.cp.collection.sources_ids_dict ) {
						
							let scrapAppears = [];

							// Build a string of links to scrapbooks this source appears
							for ( let index = 0; index < this.cp.myJSONList.length; 
								  index++ ) {

								if ( ppskID in this.cp.myJSONList[index].book.stats.sources_ids_dict ) {

									scrapAppears.push("<a href='/collection/book/" + 
										this.cp.myJSONList[index].book.number + "/'>" + 
										this.cp.myJSONList[index].book.number + "(" + 
										this.cp.myJSONList[index].book.stats.sources_ids_dict[ppskID] + ")</a>");
								}
							}

							// Create table items
							myTableItems.push({

								name:  "<a href='/collection/source/" + ppskID + "'>" + this.cp.sourcesJSON[ppskID].name + "</a>",
								type: this.cp.sourcesJSON[ppskID].source_type,
								collection_appearances: this.cp.collection.sources_ids_dict[ppskID],
								scrapbooks: scrapAppears.join(", "),
							});
						}

						break;
			}			

			return myTableItems;
		},			

		ppskItems_Book: function() {

			let myTableItems = [];

			switch ( this.ppskType ) {

				case "people":

					// Chart: Appearances by Scrapbook
					// Sorted by CollectionAppearances
					// { PersonName, CollectionAppearances, Scrapbooks (#appearances)}
					for ( var ppskID in this.cp.currentEntry.stats.people_ids_dict ) {
					
						let pageAppears = [];

						// Build a string of links to pages this person appears
						for ( let index = 0; index < this.cp.myJSON[this.cp.currentEntry.number].pages.length; 
							  index++ ) {

							if ( this.cp.myJSON[this.cp.currentEntry.number].pages[index].people_ids.indexOf(ppskID) > -1 ) {

								pageAppears.push("<a href='/collection/book/" + 
									this.cp.currentEntry.number + "/page/" + index.toString() + "'>" + 
									this.cp.myJSON[this.cp.currentEntry.number].pages[index].number + this.cp.myJSON[this.cp.currentEntry.number].pages[index].suffix + "</a>");
							}
						}

						// Create table items
						myTableItems.push({

							name:  "<a href='/collection/person/" + ppskID + "'>" + this.cp.peopleJSON[ppskID].name + "</a>",
							roles: this.cp.collection.roles_by_people_ids[ppskID].join(", "),
							page_appearances: pageAppears.join(", "),
						});
					}

					break;

				case "places":

					// Chart: Appearances by Scrapbook
					// Sorted by CollectionAppearances
					// { PlaceName, CollectionAppearances, Scrapbooks (#appearances)}
					for ( var ppskID in this.cp.currentEntry.stats.places_ids_dict ) {
					
						let pageAppears = [];

						// Build a string of links to pages this place appears
						for ( let index = 0; 
							  index < this.cp.myJSON[this.cp.currentEntry.number].pages.length; 
							  index++ ) {

							if ( this.cp.myJSON[this.cp.currentEntry.number].pages[index].places_ids.indexOf(ppskID) > -1 ) {

								pageAppears.push("<a href='/collection/book/" + 
									this.cp.currentEntry.number + "/page/" + index.toString() + "'>" + 
									this.cp.myJSON[this.cp.currentEntry.number].pages[index].number + this.cp.myJSON[this.cp.currentEntry.number].pages[index].suffix + "</a>");								
							}
						}

						// Create table items
						myTableItems.push({

							name:  "<a href='/collection/place/" + ppskID + "'>" + this.cp.placesJSON[ppskID].name + "</a>",
							continent: this.cp.placesJSON[ppskID].continent,
							page_appearances: pageAppears.join(", "),
						});
					}					

					break;

				case "sources":

					// Chart: Appearances by Scrapbook
					// Sorted by CollectionAppearances
					// { SourceName, CollectionAppearances, Scrapbooks (#appearances)}
					for ( var ppskID in this.cp.currentEntry.stats.sources_ids_dict ) {
					
						let pageAppears = [];

						// Build a string of links to pages this source appears
						for ( let index = 0; index < this.cp.myJSON[this.cp.currentEntry.number].pages.length; 
							  index++ ) {

							if ( this.cp.myJSON[this.cp.currentEntry.number].pages[index].sources_ids.indexOf(ppskID) > -1 ) {

								pageAppears.push("<a href='/collection/book/" + 
									this.cp.currentEntry.number + "/page/" + index.toString() + "'>" + 
									this.cp.myJSON[this.cp.currentEntry.number].pages[index].number + this.cp.myJSON[this.cp.currentEntry.number].pages[index].suffix + "</a>");
							}
						}

						// Create table items
						myTableItems.push({

							name:  "<a href='/collection/source/" + ppskID + "'>" + this.cp.sourcesJSON[ppskID].name + "</a>",
							type: this.cp.sourcesJSON[ppskID].source_type,
							page_appearances: pageAppears.join(", "),
						});
					}

					break;
			}			

			return myTableItems;
		},

		sortName: function(a, b, key){

			if ( "name" == key ){

				let retval = 0;
				let innerHTMLA = "", innerHTMLB = "";
				switch ( this.ppskType ){
					
					case "people":

						innerHTMLA = this.stripHTML(a[key]);
						innerHTMLB = this.stripHTML(b[key]);

						// Split name into parts and compare
						let namePartsA = innerHTMLA.split(" ");
						let namePartsB = innerHTMLB.split(" ");
						let lastNameA = namePartsA[namePartsA.length - 1].toLowerCase();
						let lastNameB = namePartsB[namePartsB.length - 1].toLowerCase();				
						
						if ( lastNameA < lastNameB ) {
							retval = -1;
						} else if ( lastNameA > lastNameB ) {
							retval = 1;
						} else {
							retval = 0;
						}	

						break;

					case "places":
					case "sources":

						innerHTMLA = this.stripHTML(a[key]).toLowerCase();
						innerHTMLB = this.stripHTML(b[key]).toLowerCase();

						if ( innerHTMLA < innerHTMLB ) {
							retval = -1;
						} else if ( innerHTMLA > innerHTMLB ) {
							retval = 1;
						} else {
							retval = 0;
						}					

						break;

				}

				return retval;

			} else if ( "page_appearances" == key || "scrapbooks" == key ) {

				let aCount = this.countChars(a[key], ","),
					bCount = this.countChars(b[key], ",");

				if ( aCount < bCount ) return -1;
				else if ( aCount > bCount ) return 1;
				return 0;

			}
			else {

				if (typeof a[key] === 'number' && typeof b[key] === 'number') {
					
					// If both compared fields are native numbers
				  	return a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0);
				} else {

				  	// Stringify the field data and use String.localeCompare

					if ( a[key] < b[key]) return -1;
					else if  ( a[key] > b[key] ) return 1;
					return 0;				  	
				  	// return toString(a[key]).localeCompare(toString(b[key]), undefined, { numeric: true });
				}				
			}
		},

		stripHTML: function(p_tag) {

			let endCarat = p_tag.search(">");
			if ( -1 == endCarat ){
				return p_tag;
			}
			let innerHTML = p_tag.substring(endCarat, p_tag.length);
			let startCarat = innerHTML.search("<");
			if ( -1 == startCarat ){
				return p_tag;
			}
			
			return innerHTML.substring(0, startCarat);
		},
	}	
}

</script>

<style>

.header-fixed {

    width: 100% 
}

.header-fixed > thead,
.header-fixed > tbody,
.header-fixed > thead > tr,
.header-fixed > tbody > tr,
.header-fixed > thead > tr > th,
.header-fixed > tbody > tr > td {

    display: block;
}

.header-fixed > tbody > tr:after,
.header-fixed > thead > tr:after {

    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
}

.header-fixed > tbody {

    overflow-y: auto;
    height: 150px;
}

.header-fixed > tbody > tr > td,
.header-fixed > thead > tr > th {

    width: 20%;
    float: left;
}

.wfs_pps_search_box {

	background-color: #E8E8E8;
	border-width: 1px; 
	border-color: black;
	min-width: 100%;
}

.wfs_pps_search_box:focus {

	background-color: #E8E8E8;
}

/*#wfs_pagelevel_dropdown__BV_toggle_:hover .dropdown-item {

	outline: grey;
	border-color: grey;
}
*/

.input-group { 

	outline: none;
}


</style>