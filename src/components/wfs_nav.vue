<template>
	 
	<b-navbar class="wfs_navbar" toggleable="md" type="dark" variant="info">

		<b-navbar-brand href="#" >{{ title }}</b-navbar-brand>
		<b-navbar-nav class="ml-auto" style="display: inline;"><slot></slot></b-navbar-nav>

	</b-navbar>
	
</template>

<script>

import bNavbar from "bootstrap-vue/es/components/navbar/navbar";
import bNavbarNav from "bootstrap-vue/es/components/navbar/navbar-nav";
import bNavbarBrand from "bootstrap-vue/es/components/navbar/navbar-brand";
import bNavbarToggle from "bootstrap-vue/es/components/navbar/navbar-toggle";
import bCollapse from "bootstrap-vue/es/components/collapse/collapse";

export default {

	name: "wfs-nav",

	props: {

		title: { type: String, required: true },
		color: { type: String, required: true },
	},

	data(){

		return {

		};
	},

	components: {

		"b-collapse": bCollapse,
		"b-navbar": bNavbar,
		"b-navbar-nav": bNavbarNav,
		"b-navbar-brand": bNavbarBrand,
		"b-navbar-toggle": bNavbarToggle
	},

	methods: {

		setSpineColor: function(){

            // Workaround to override color via jQuery
            let cp = this.cp;
            let myColor = this.color;
            $(".wfs_navbar").each(function(){

                this.style.setProperty("background-color", 
                   	myColor, "important");
            });
        },
	},

	mounted(){
		this.setSpineColor();
	}

}	
</script>

<style>

nav {

	font-weight: normal;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
}

navbar {
	background-color: rgb(35, 43, 43) !important;

}

	
</style>