<template>

	<div>
	
		<!-- Latter test for length will short circuit before test
		 if it is a scalar variable -->
	    <span class="wfs_metadata" v-if="'' != value">

			<span class="wfs_metadata_label">{{ label }}:&nbsp;</span>
			
			<span class="wfs_metadata_value" v-if="!isLink">{{ value }}</span>
			
			<!-- <span class="wfs_metadata_value" v-if="isLink"><a :href="value" target="_blank">external link</a></span> -->

			<span class="wfs_metadata_value" v-if="isLink">
				<a :href="value" target="_blank">
					<b-button class="wfs_button">
						<span class="wfs_inthescrapbooks_icon">
							<img :src="linkIcon" height="22"/>
						</span>
					</b-button>
				</a>
			</span>

			<slot></slot>

			<br v-if="' ' != value"/>  	
	    </span>

	    <!-- If no data allows for N/A to show -->
	    <span class="wfs_metadata" v-if="'' == value && allowsNA">

	    	<span class="wfs_metadata_label">{{ label }}:&nbsp;</span>

	    	<span class="wfs_metadata_value">N/A</span>

	    </span>

	</div>
	
</template>

<script>

// Bootstrap components
import bButton from "bootstrap-vue/es/components/button/button";

export default {

	name: "wfs_metadata",

	props: {

		label: { type: String, required: true },
		value: { required: true },
		isLink: { type: Boolean },
		allowsNA: { type: Boolean },
	},

	components: {

        "b-button": bButton,
	},

	data() {

		return {

			linkIcon: "/src/assets/images/link_icon_white.png",
		}
	}
}

</script>

<style>

.wfs_metadata {
	display: block !important;
}

.wfs_metadata_label {

    font-weight: 900;
    font-size: 1.05em;
}

.wfs_metadata_value {
	
	font-weight: 100;
	font-size: 1em;
}

/* WFS button override for link icon */
.wfs_button {

	margin: 0;
	padding: 0.125em 0.25em 0.125em 0.25em;
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