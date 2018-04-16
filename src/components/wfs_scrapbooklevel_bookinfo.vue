<template>

    <div>

        <!-- Scrapbook Information Header -->
        <b-row class="wfs_page_header">
            <b-col cols="6">
                <h5 class="wfs_user_direction" style="float: left;">About this book</h5>
            </b-col>
            <b-col cols="6">
                <!-- Go to the page level view of this book -->
                <b-button @click="switchToPageLevel" size="md" style="float: right;">View Pages</b-button>
            </b-col>
        </b-row>

        <!-- Scrapbook Information -->
        <b-row class="wfs_page_content" style="margin-top: 0em; margin-bottom: 0em;">

            <b-col cols="12">

                <b-row style="overflow-y: scroll;">

                    <b-col cols="12">

                        <wfs-metadata label="Date" :value="cp.currentEntry.begin_date + '-' + cp.currentEntry.end_date"><slot></slot></wfs-metadata>
                        
                        <wfs-metadata label="Pages" :value="cp.currentEntry.pages"></wfs-metadata>

                        <wfs-metadata label="Dimensions (cm)" :value="cp.currentEntry.width + 'w x ' +  cp.currentEntry.height + 'h x ' + cp.currentEntry.depth + 'd'"></wfs-metadata>

                        <wfs-metadata label="Clippings" :value="cp.currentEntry.stats.clippings"></wfs-metadata>

                        <wfs-metadata label="Clippings w/ metadata" :value="cp.currentEntry.stats.clippings_w_metadata"></wfs-metadata>

                        <wfs-metadata label="Percent clippings described" :value="Number(100 * cp.currentEntry.stats.clippings_w_metadata / cp.currentEntry.stats.clippings).toFixed(2).toString() + '%'"></wfs-metadata>                        

                        <wfs-metadata label="Materiality" :value="' '">
                            <wfs-read-more more-str="read more" :text="cp.currentEntry.materiality_desc" link="#" less-str="read less" :max-chars="maxCharsReadMore"></wfs-read-more>
                        </wfs-metadata>

                        <!-- <wfs-metadata label="Materiality" :value="cp.currentEntry.materiality_desc"></wfs-metadata> -->
                        
                        <wfs-metadata label="Notes" :value="cp.currentEntry.notes"></wfs-metadata>                        

                        <wfs-metadata label="Keywords" :value="' '">
                            <wfs-read-more more-str="read more" :text="keywordRouteStr" link="#" less-str="read less" :max-chars="maxCharsReadMore"></wfs-read-more>
                        </wfs-metadata>

                    </b-col>

                </b-row>
                    <br />
                <b-row>

                    <b-col cols="12">

                        

                    </b-col>

                </b-row>

            </b-col>

        </b-row>

    </div>

</template>

<script>

// Bootstrap components
import bButton from "bootstrap-vue/es/components/button/button";

// Bootstrap grid layout
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";

// Third party components
import wfsReadMore from "./wfs_read_more.vue";

export default {

	name: "wfs-scrapbooklevel-bookinfo",
	
	props: ["cp", "switchMethod"],
	
	components: {

		"b-button": bButton,

		"b-row": bRow,
		"b-col": bCol,

		"wfs-metadata": wfsMetadata,
        "wfs-read-more": wfsReadMore,
	},

    data() {
        
        return {
            maxCharsReadMore: 200,
            keywordRouteStr: "",
        };
    },

	methods: {

        createKeywordRouteStr: function() {

            let keywordRouteList = [];
            let kwRouteStr = null;
            for ( var keyword in this.cp.currentEntry.stats.keyword_count_dict ) {

                kwRouteStr = "<a href='" + "/collection/keyword/" + this.cp.collection.keywords_to_ids[keyword] + "'>" + keyword + "</a>"
                keywordRouteList.push(kwRouteStr);
            }

            this.keywordRouteStr = keywordRouteList.join(", ");

        },

		switchToPageLevel: function() {

            // Indicate a new page list is needed for the pagelevel page
            this.cp.newPageListNeeded = true;

            // Push route
            this.$router.push({ name: "Page", // path: "/collection/", 
                                params: { 
                                    bookNumber: this.cp.currentEntry.number, 
                                    pageNumber: 0 } 
                                } );
            this.switchMethod("wfs-pagelevel");
        },
	},

    mounted() {

        this.createKeywordRouteStr();        
    },

    updated() {

        this.createKeywordRouteStr();
    } 
}
</script>

<style>
</style>