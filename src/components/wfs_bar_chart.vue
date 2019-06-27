<template>

	<div class="wfs_visualization_bar_chart">

		<b-row>
			<b-col cols="12">
				<span class="wfs_visualization_label">{{ myLabel }}</span>
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="12">
				<column-chart :data="myData" :colors="myColors" :library="buildOptions" :legend="false"></column-chart>
			</b-col>
		</b-row>

	</div>

</template>

<script>

// Bootstrap grid
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

export default {

	name: "wfs-bar-chart",
	
	props: ["myData", "myLabel", "myColors", "xAxisLabel"],
	
	components: { 

		"b-row": bRow,
		"b-col": bCol,
	},

	computed: {

		buildOptions: function() {

			// X-axis
			this.myOptions.hAxis.title = this.xAxisLabel;

			// Colors
			this.myOptions.colors = this.myColors;

			return this.myOptions;
		},
	},	

	data(){

		return {

			chart: null,

			myOptions: {

				backgroundColor: "#E8E8E8",
				bar: { groupWidth: "25" },
				chartArea: { width: "80%" },
				color: "grey",
				fontName: "Raleway",
				hAxis: { 
					title: "",
					titleTextStyle: {

						color: "black",
						fontSize: "16",
						italic: false,
					}
				},				
				opacity: "1",
				titlePosition: "none",
				titleTextStyle: {

					bold: true,
					color: "black",
  					fontName: "Raleway",
  					fontSize: 18,
  					italic: false
				},
			},
		};
	}
};

</script>

<style>

.wfs_visualization_bar_chart {

	padding: 0em 1em 0em 1em;
}

.wfs_visualization_label {

	color: black !important;
	font-family: "Raleway";
	font-size: 18px !important;
	font-weight: 900;
	
	top: 100% !important;
	bottom: 5% !important;
	left: 0 !important;

	z-index: 1000;
}

</style>