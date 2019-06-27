<template>

	<div>

	    <!-- Collection Overview Header -->
	    <b-row class="wfs_page_header">
	        <h5 class="wfs_user_direction">About the Collection</h5>
	    </b-row>

	    <b-row class="wfs_page_content">

	        <!-- Collection statistics -->
	        <b-col cols="12">
	            
	            <wfs-metadata label="Pages" :value="cp.collection.pages"></wfs-metadata>

	            <wfs-metadata label="Pages w/ foldouts" :value="cp.collection.pages_foldouts"></wfs-metadata>

	            <wfs-metadata label="Total Clippings" :value="cp.collection.clippings"></wfs-metadata>

	            <wfs-metadata label="Average # of clippings per scrapbook" :value="cp.collection.avg_clippings_per_book"></wfs-metadata>

	            <wfs-metadata label="Clippings with date/source" :value="cp.collection.clippings_w_metadata"></wfs-metadata>

	            <wfs-metadata label="Percent clippings dated/sourced" :value="Number(100 * cp.collection.clippings_w_metadata / cp.collection.clippings).toFixed(2).toString() + '%'"></wfs-metadata>


	        </b-col>

	    </b-row>

    </div>

</template>

<script>

// Bootstrap grid layout
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";

export default {

	name: "wfs-scrapbooklevel-collectioninfo",
	
	props: ["cp"],

	components: {

		"b-row": bRow,
		"b-col": bCol,

		"wfs-metadata": wfsMetadata,

	},
}
</script>

<style>
</style>