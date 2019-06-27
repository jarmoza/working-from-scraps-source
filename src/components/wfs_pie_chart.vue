<template>

	<div class="wfs_visualization_pie_chart">

		<b-row>
			<b-col cols="12">
				<span class="wfs_visualization_label">{{ myLabel }}</span>
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="12">
				<pie-chart :data="myData" :legend="legend" :colors="myColors" :library="myOptions" ></pie-chart>
			</b-col>
		</b-row>

	</div>

</template>

<script>

// Bootstrap grid
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

export default {

	name: "wfs-pie-chart",
	
	props: ["myData", "myLabel", "myColors", "legend", "pieScale"],
	
	components: { 

		"b-row": bRow,
		"b-col": bCol,
	},

	data(){

		return {

			chart: null,

			myOptions: {

				backgroundColor: "#E8E8E8",
				chartArea: { width: "150%", height: "150%" },
				color: "grey",
				fontName: "Raleway", 
				fontSize: "1em",
				legend: { position: "labeled" },
				opacity: "1", 
				titleTextStyle: { 

					bold: true,
					color: "black",
  					fontName: "Raleway",
  					fontSize: 18,
  					italic: false 
  				},		
			},
		};
	},

	created() {

		this.myOptions.chartArea.width = ( this.pieScale ) ? this.pieScale : "150%";
		this.myOptions.legend.position = this.legend;
	}
};

</script>

<style>

/* Deals with Google Charts tooltip flicker bug */
svg > g > g:last-child { 

	pointer-events: none;
}

.wfs_visualization_label {

	color: black !important;
	font-family: "Raleway";
	font-size: 1.25em !important;
	font-weight: 900;
	
	top: 100% !important;
	bottom: 5% !important;
	left: 0 !important;

	z-index: 1000;
}

.wfs_visualization_pie_chart {

	padding: 0em 1em 0em 1em;
}

</style>