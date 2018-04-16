<template>

	<div class="wfs_visualization_line_chart">
		<b-row>
			<b-col cols="4"></b-col>
			<b-col cols="4">
				<line-chart :data="myData" :colors="myColors" :legend="legend" :title="myLabel" :library="cssOptions"></line-chart>
			</b-col>
			<b-col cols="4"></b-col>
		</b-row>
	</div>
</template>

<script>

// Bootstrap grid
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";


export default {

	name: "wfs-pie-chart",
	
	props: ["myData", "myLabel", "myColors", "legend"],
	
	components: { 

		"b-row": bRow,
		"b-col": bCol,
	},

	data(){

		return {

			cssOptions: {
				
				fontStyle: 'Raleway, sans-serif', 
				fontColor: 'grey', 
				fontSize: '1em',
			},
		};
	}

}
</script>

<style>

.wfs_visualization {

}

.wfs_visualization_label {

	font-size: 1em;
	font-weight: 900;
	color: grey;
}
</style>