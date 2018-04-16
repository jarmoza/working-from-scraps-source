<template>

	<div class="wfs_visualization_pie_chart">

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

// Third party
// import Chartist from "chartist";

// Vue.use(Chartist);


export default {

	name: "wfs-bar-chart",
	
	props: ["myData", "myLabel", "myColors", "xAxisLabel"],
	
	components: { 

		"b-row": bRow,
		"b-col": bCol,
	},

	data(){

		return {

			myOptions: {

				fontName: 'Raleway',
				color: 'grey', 
				// fontSize: '1em',
				opacity: '1', 
				backgroundColor: '#E8E8E8', 
				chartArea: { width: '80%' },
				hAxis: { 
					title: "",
					titleTextStyle: {
						color: "black",
						italic: false,
						fontSize: "16"
					}
				},
				bar: { groupWidth: "25" },
			},

			chart: null,
		};
	},

	computed: {

		buildOptions: function() {

			// X-Axis
			this.myOptions.hAxis.title = this.xAxisLabel;

			// Colors
			this.myOptions.colors = this.myColors;

			return this.myOptions;
		},

	},

	created() {

		//document.addEventListener('DOMContentLoaded',function(){
  			
  			/*Your chartist initialization code here*/

			// Create a new Chartist pie chart
			// new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
			//if ( null == this.chart ){
				//this.chart = new Chartist.Pie("#" + this.chartID, this.myData);
			//}
		//});
	}

}
</script>

<style>

.chartjs-render-monitor {

	width: 75% !important;
	height: 75% !important;
}

.wfs_visualization_pie_chart {

	padding: 0em 1em 0em 1em;

}

.wfs_visualization_label {

	font-size: 1em;
	font-weight: 900;
	color: grey;
	left: 15%;
	bottom: -250%;
	position: relative;
}
</style>