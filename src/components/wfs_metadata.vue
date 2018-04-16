<template>
	<!-- Latter test for length will short circuit before test
	 if it is a scalar variable -->
    <span class="wfs_metadata" v-if="'' != value">

		<span class="wfs_metadata_label">{{ label }}:&nbsp;</span>
		
		<span class="wfs_metadata_value" v-if="!isLink">{{ value }}</span>
		
		<span class="wfs_metadata_value" v-if="isLink"><a :href="value" target="_blank">external link</a></span>

		<slot></slot>

		<br v-if="' ' != value"/>  	
    </span>
</template>

<script>
export default {
	name: "wfs_metadata",
	props: {
		label: { type: String, required: true },
		value: { required: true },
		isLink: { type: Boolean },
	},
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
</style>