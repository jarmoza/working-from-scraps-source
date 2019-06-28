<template>

	<!-- 		
		// "id": p_json_entry["Associated_Person_Id"],
		// "name": p_json_entry["Associated_Person_first_name"] + " " +
		// 		p_json_entry["Associated_Person_last_name"],
		// "birth": p_json_entry["Associated_Person_dob"],
		// "birth_sep": get_obj_from_dd_month_year(p_json_entry["Associated_Person_dob"]),
		// "death": p_json_entry["Associated_Person_dod"],
		// "death_sep": get_obj_from_dd_month_year(p_json_entry["Associated_Person_dod"]),
		// "nationality": p_json_entry["Associated_Person_nationality"],
		// "gender": p_json_entry["Associated_Person_gender"],
		// "title": p_json_entry["Associated_Person_title_profession"],
		// "addl_names": p_json_entry["Associated_Person_additional_names"],
		// "link": p_json_entry["Associated_Person_link"], 
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
								<wfs-metadata :label="occurrenceText" :value="occurrences[json.id]"></wfs-metadata>
								<wfs-metadata v-if="'' != roleListJoin" label="Roles on page" :value="roleListJoin"></wfs-metadata>
								<wfs-metadata label="b." :value="json.birth"></wfs-metadata>
								<wfs-metadata label="d." :value="json.death"></wfs-metadata>
								<wfs-metadata label="Gender" :value="json.gender"></wfs-metadata>
								<wfs-metadata label="Nationality" :value="json.nationality"></wfs-metadata>
								<wfs-metadata label="Epithet(s)" :value="json.epithets"></wfs-metadata>
								<wfs-metadata label="Alternative Name(s)" :value="json.addl_names"></wfs-metadata>

								<!-- Implementation 1 -->
								<!-- <wfs-metadata label="More information" :value="json.link" is-link></wfs-metadata>
								<wfs-metadata label="In the Scrapbooks" value=" " style="float: left;"></wfs-metadata>
								<span>&nbsp;&nbsp;</span>
								
								<span class="wfs_inthescrapbooks_icon">				<img :src="openBookIcon" @click="switchToPersonPage" title="Find this person in the scrapbooks" height="20"/>
								</span> -->

								<!-- Implementation 2 -->
								<!-- <a :href="json.link" target="_blank">
									<b-button class="wfs_button wfs_card_button">
										More information &nbsp;
										<span class="wfs_inthescrapbooks_icon">
											<img :src="linkIcon" height="22"/>
										</span>
									</b-button>
								</a>

								<b-button class="wfs_button wfs_card_button">
									In the Scrapbooks &nbsp;
									<span class="wfs_inthescrapbooks_icon">
										<img :src="openBookIcon" @click="switchToPersonPage" title="Find this person in the scrapbooks" height="20"/>
									</span>
								</b-button> -->	

								<!-- Implementation 3 -->
								<!-- <b-row>
									<b-col cols="2" style="padding: 0.5em 0 0 0.75em;">
										<img :src="openBookIcon" title="Find this person in the scrapbooks" height="20" />
									</b-col>
									<b-col cols="10">
										<b-button class="wfs_button wfs_card_button" @click="switchToPersonPage">In the Scrapbooks</b-button>
									</b-col>
								</b-row>								
								<b-row>
									<b-col cols="2" style="padding: 0.5em 0 0 1.75em;">
										<img :src="linkIcon" title="More information on this person" height="28" />
									</b-col>
									<b-col cols="10">
										<a :href="json.link" target="_blank">
											<b-button class="wfs_button wfs_card_button">More Information</b-button>
										</a>
									</b-col>
								</b-row> -->


								<!-- Implementation 4 -->
								<b-row style="margin-top: 1em;">
									<b-col cols="12">
										<wfs-metadata-button value="In the Scrapbooks" 
										:click="switchToPersonPage">
											<img :src="openBookIcon" title="Find this place in the scrapbooks" height="30"
												 style="padding-top: 0.35em; vertical-align: sub;"/>
										</wfs-metadata-button>
									</b-col>
								</b-row>
								<b-row>
									<div style="padding: 0 1em 0 1em">
										<wfs-metadata-button value="VIAF" :href="json.viaf" is-link>
											<img :src="globeIcon" title="Virtual International Authority File" height="30" style="padding-top: 0.35em; vertical-align: sub;"/>
										</wfs-metadata-button>
									</div>
									<div style="padding: 0 1em 0 1em">
										<wfs-metadata-button value="On the Internet" :href="json.link" isLink>
											<img :src="linkIcon" title="More information on this person" height="30" style="padding-top: 0.35em; vertical-align: sub;"/>
										</wfs-metadata-button>
									</div>
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
import "vue-awesome/icons/angle-left";
import "vue-awesome/icons/angle-down";


export default {

	name: "wfs-person-card",

	props: ["cp", "json", "occurrences", "switchMethod", "occurrenceText", "roleList"],

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
		},

		roleListJoin: function() {

			let joinStr = "";
			if ( this.json.id in this.roleList ) {
				joinStr = this.roleList[this.json.id].join(", ");
			}

			return joinStr;
		},		
	},

	// "id": p_json_entry["Associated_Person_Id"],
	// "name": p_json_entry["Associated_Person_first_name"] + " " +
	// 		p_json_entry["Associated_Person_last_name"],
	// "birth": p_json_entry["Associated_Person_dob"],
	// "birth_sep": get_obj_from_dd_month_year(p_json_entry["Associated_Person_dob"]),
	// "death": p_json_entry["Associated_Person_dod"],
	// "death_sep": get_obj_from_dd_month_year(p_json_entry["Associated_Person_dod"]),
	// "nationality": p_json_entry["Associated_Person_nationality"],
	// "gender": p_json_entry["Associated_Person_gender"],
	// "title": p_json_entry["Associated_Person_title_profession"],
	// "addl_names": p_json_entry["Associated_Person_additional_names"],
	// "link": p_json_entry["Associated_Person_link"], 

	data() {

		return {

			showCollapse: true,
			globeIcon: "/src/assets/images/globe_icon_white.png",
			linkIcon: "/src/assets/images/link_icon_white.png",
			openBookIcon: "/src/assets/images/open_book_icon_white.png",
		};
	},

	methods: {		

		hideMyModal: function() {

			this.$refs.myModalRef.hide();
		},

		showMyModal: function() {

			this.$refs.myModalRef.show();
		},

		switchToPersonPage: function() {

			console.log("switchToPersonPage");

			console.log("this.json: ");
			console.log(this.json);

			// Save person JSON for reference
			this.cp.currentPerson = this.json;

            // Push route
            this.$router.push({ name: "person", 
                                params: { personID: this.cp.currentPerson.id } });
                                			
			// Switch to the person page
			this.switchMethod("wfs-person");
		},
	}
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

/* Modal styling */
.modal-header {

	background-color: #232b2b;
	color: white;
}

.modal-content {

	border-radius: 6px
}

/* OK button color override */
.btn {

	background-color: #6C757D;
	border-color: #6C757D;
}

</style>