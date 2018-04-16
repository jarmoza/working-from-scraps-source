<template>

	<div class="wfs_page_component">

		<!-- Overview Header -->
        <b-row class="wfs_page_header">
            <h5 class="wfs_user_direction" style="font-size: 1.75rem; margin-left: 1em; margin-top: 0.5em;">Book Overview</h5>
        </b-row>

        <!-- Book Statistics -->
        <b-row class="wfs_page_content" style="margin-top: 0em; margin-bottom: 0em;">

            <b-col cols="12">

                <!-- PPSK data areas (includes dataviz + table) -->
				<b-row>
					<b-col cols="12">

						<wfs-ppsk-data-area :cp="cp" ppskType="people" level="book" chartType="pie" :barColor="cp.bookCoverColors['12'].spine" style="margin-top: 1em;" pieScale="100%">
							
						</wfs-ppsk-data-area>

						<hr style="height: 5px; color: grey;">

						<wfs-ppsk-data-area :cp="cp" ppskType="places" level="book" chartType="pie" :barColor="cp.bookCoverColors['9'].cover" pieScale="100%">
							
						</wfs-ppsk-data-area>

						<hr style="height: 5px; color: grey;">

						<wfs-ppsk-data-area :cp="cp" ppskType="sources" level="book" chartType="pie" :barColor="cp.bookCoverColors['12'].cover" pieScale="100%" hasPieData>
							
						</wfs-ppsk-data-area>

						<!-- <wfs-ppsk-data-area :cp="cp" ppskType="keywords" level="collection" chartType="bar" :barColor="cp.bookCoverColors['1'].cover">
							
						</wfs-ppsk-data-area> -->
					</b-col>
				</b-row>

			</b-col>

		</b-row>

	</div>

</template>

<script>

// Bootstrap grid layout
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS Components
import wfsBarChart from "./wfs_bar_chart.vue";
import wfsPieChart from "./wfs_pie_chart.vue";
import wfsPPSKDataArea from "./wfs_ppsk_data_area.vue";


export default {

	name: "wfs-scrapbooklevel-bookvis",
	
	props: ["cp"],
	
	components: {

		"b-row": bRow,
		"b-col": bCol,

		"wfs-bar-chart": wfsBarChart,
		"wfs-pie-chart": wfsPieChart,
		"wfs-ppsk-data-area": wfsPPSKDataArea,
	},

	data() {

		return {

			graphColors: [

				"#461E25", "#1E202D",
	            "#5E342A", "#9B8778",
	            "#2A0105", "#1D3734",
	            "#742F30", "#14273A",
	            "#232B2B", "#D9CCBB"
			],

		};
	},

	computed: {

	}

}

</script>

<style>
</style>