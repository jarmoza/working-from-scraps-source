<template>

	<!-- 		
		"id": p_json_entry["Place_Id"],
		"name": p_json_entry["Place_name"],
		"addl_names": p_json_entry["Place_name_variations"]
 	-->

	<div class="wfs_page_component" style="padding: 0em;">
	
		<b-container style="padding: 0em;" fluid>

			<b-row>

				<b-col cols="12">

					<!-- <b-card 
						:header="name"
						header-text-variant="white"	
						header-tag="header"
						header-bg-variant="dark"
						class="wfs_card_custom"> -->
					<b-card class="wfs_card_custom">

						<b-button @click="showCollapse = !showCollapse"
           					      :class="showCollapse ? 'collapsed wfs_pps_title_text' : 'wfs_pps_title_text'"
           						  :aria-controls="'collapse' + json.id"
           						  :aria-expanded="showCollapse ? 'true' : 'false'"
           						  style="margin: 0em; width: 100%; background-color: #232b2b; border-radius: 0; outline: none;">
							<span style="float: left;" :title="name">{{ name }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<icon :name="determineAngleFromToggle" style="float: right;"></icon>
						</b-button>

						<b-collapse :id="'collapse' + json.id" v-model="showCollapse" visible>
							<div style="padding: 1em;">

								<wfs-metadata label="Country" :value="json.countries"></wfs-metadata>
								<wfs-metadata label="Continent" :value="json.continent"></wfs-metadata>
								<wfs-metadata label="Additional names" :value="json.addl_names"></wfs-metadata>
								<!-- NOTE: As of 2019 WOEID is discontinued. Field remains in the places json for history J. Armoza 06/18/2019 -->
								<!-- <wfs-metadata label="Where-on-Earth ID" :value="json.woeid"></wfs-metadata> -->
								<wfs-metadata label="Latitude" :value="json.lat"></wfs-metadata>
								<wfs-metadata label="Longitude" :value="json.long"></wfs-metadata>
								<wfs-metadata label="Geoname" :value="json.geolink" isLink></wfs-metadata>
								<wfs-metadata :label="occurrenceText" :value="occurrences[json.id]"></wfs-metadata>
								

								<!-- Implementation 1 -->
								<!-- <wfs-metadata label="In the Scrapbooks" value=" " style="float: left;"></wfs-metadata>
								<span>&nbsp;&nbsp;</span>
								<span class="wfs_inthescrapbooks_icon">									
									<img :src="openBookIcon" @click="switchToPlacePage" title="Find this place in the scrapbooks" height="20"/>

								</span> -->

								<!-- Implementation 2 -->
								<!-- <b-row>
									<b-col cols="2" style="padding: 0.5em 0 0 0.75em;">
										<img :src="openBookIcon" title="Find this person in the scrapbooks" height="20" />
									</b-col>
									<b-col cols="10">
										<b-button class="wfs_button wfs_card_button" @click="switchToPlacePage">In the Scrapbooks</b-button>
									</b-col>
								</b-row> -->

								<!-- Implementation 3 -->
								<b-row style="margin-top: 1em;">
									<b-col cols="12">
										<wfs-metadata-button value="In the Scrapbooks" 
										:click="switchToPlacePage">
											<img :src="openBookIcon" title="Find this place in the scrapbooks" height="30" style="padding-top: 0.35em; vertical-align: sub;"/>
										</wfs-metadata-button>
									</b-col>
								</b-row>								
							</div>
						</b-collapse>

					</b-card>

				</b-col>

			</b-row>

		</b-container>

	</div>

</template>

<script>

// Bootstrap grid layout
import bContainer from "bootstrap-vue/es/components/layout/container";
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// Bootstrap components
import bButton from "bootstrap-vue/es/components/button/button";
import bCard from "bootstrap-vue/es/components/card/card";
import bCollapse from "bootstrap-vue/es/components/collapse/collapse";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";
import wfsMetadataButton from "./wfs_metadata_button.vue";

// Third party VueJS components
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/Angle-Left";
import "vue-awesome/icons/Angle-Down";


export default {

	name: "wfs-place-card",

	props: ["cp", 
			"json", 
			"occurrences", 
			"occurrenceText", 
			"switchMethod"],

	components: {

		"b-button": bButton,
		"b-card": bCard,
		"b-collapse": bCollapse,

        "b-container": bContainer,
        "b-row": bRow,
        "b-col": bCol,		

		"wfs-metadata": wfsMetadata,
		"wfs-metadata-button": wfsMetadataButton,

		"icon": Icon,
	},

	data() {

		return {

			showCollapse: true,
			openBookIcon: "/src/assets/images/open_book_icon_white.png",
		}
	},

	computed: {

		name: function(){

			// If there is an additional name but no primary name, use the former
			if ( this.json.addl_names.length && 
				 0 == this.json.name.trim().length){
				return this.json.addl_names;
			}

			return this.json.name;
		},

		determineAngleFromToggle: function() {

			let iconName = "angle-left";
			let collapseTag = document.getElementById("collapse" + this.json.id);
			if ( this.showCollapse ){
					
				iconName = "angle-down";
			}

			return iconName;
		}
	},

	methods: {

		hideMyModal: function() {

			this.$refs.myModalRef.hide();
		},

		showMyModal: function() {

			this.$refs.myModalRef.show();
		},

		switchToPlacePage: function() {

			console.log("switchToPlacePage");

			// Save place JSON for reference
			this.cp.currentPlace = this.json;

            // Push route
            this.$router.push({ name: "place", 
                                params: { placeID: this.cp.currentPlace.id } });

			// Switch to the place page
			this.switchMethod("wfs-place");
		},
	},
}

</script>

<style>

.wfs_card_button {

	margin: 0.25em 0.25em 0.125em 0.125em;
	padding: 0.25em 0.45em 0.25em 0.45em;
}

.wfs_card_custom {

	background-color: rgba(0,0,0,0);
	border: 0;
	border-radius: 0;
}

.card-body {

	padding: 0em !important;
}

/* Create a simple white box, and add the shadow for the initial state */
.wfs_inthescrapbooks_icon {

    position: relative;
    display: inline-block;
    /*background-color: #E8E8E8;*/
    /*box-shadow: 0 1px 2px rgba(0,0,0,0.15);*/
    transition: all 0.3s ease-in-out;
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.wfs_inthescrapbooks_icon::after {

    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    /*box-shadow: 0 5px 15px rgba(0,0,0,0.3);*/
    transition: opacity 0.3s ease-in-out;
}

.wfs_inthescrapbooks_icon:hover {

    -webkit-transform: scale(1.25, 1.25);
    transform: scale(1.25, 1.25);
}

.wfs_inthescrapbooks_icon:hover::after {

    opacity: 1;
}

</style>