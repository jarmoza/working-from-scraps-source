<template>

	<div>
	
	<span class="wfs_metadata_button">

		<!-- Button with slot -->
		<span class="wfs_metadata_value" v-if="!isLink">

			<b-button style="float: left; padding: 1px 8px 3px 8px;" @click="click">
				<slot></slot>&nbsp;<span style="vertical-align: text-bottom;">{{ value }}</span>
			</b-button>

		</span>

		<!-- Button with slot using anchor tag -->
		<span class="wfs_metadata_value" v-if="isLink">

			<a :href="href" target="_blank">
				<!-- <b-button style="float: left; padding: 1px 8px 3px 8px;" @click="click"> -->
				<b-button style="float: left; padding: 1px 8px 3px 8px;">
					<slot></slot>&nbsp;<span style="vertical-align: text-bottom;">{{ value }}</span>
				</b-button>
			</a>

		</span>		

	</span>
	
	</div>

</template>

<script>

// Bootstrap components
import bButton from "bootstrap-vue/es/components/button/button";

export default {
	
	name: "wfs_metadata_button",

	// props: ["value", "isLink", "href", "click"],
	props: {

		value: { required: true },
		isLink: { type: Boolean },
		href: { type: String },
		click: { type: Function }
	},

	components: {

        "b-button": bButton,
	},
}

</script>

<style>

.wfs_metadata_button .btn {

	display: block !important;
	margin-bottom: 0.5em;
}

.wfs_metadata_label {

    font-weight: 900;
    font-size: 1.05em;
}

.wfs_metadata_value {
	
	font-weight: 100;
	font-size: 1em;
}

</style>