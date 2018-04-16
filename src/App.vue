<template>
    <div id="app">    
        <wfs-page></wfs-page>
    </div>
</template>

<script>

    import WfsPage from "./components/wfs_page.vue";

    export default {

        name: "app",

        components: {

            "wfs-page": WfsPage,
        },
    }
    </script>

<style>

/* Tag styles */
html {

   margin: 0px;
   height: 100%;
   width: 100%;
}

body {

    font-family: 'Raleway', sans-serif !important;
    font-weight: lighter !important;
    background-color: rgb(217, 204, 187);

    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    bottom: 0;
    right: 0;
}

a {
    color: grey;
}

h5, h6 {

    font-weight: 900; 
}

button {

    outline: none !important;
}

/* App styles */
#app {

    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    bottom: 0;
    right: 0;
}

/* Navbar styles */
.navbar-brand {

    color: white !important;
    margin-left: 0.5em;
    letter-spacing: 1px !important;
    font-size: 1.6em !important;
    /*background-color: rgb(217,204,187);*/
    font-family: ScotchRomanMT, serif;
}

/* WFS component styles */
.wfs_user_direction {
    
    color: grey;
    font-weight: normal;
    font-size: 1.1em;
}

.wfs_page_component {

    background-color: #E8E8E8;
    padding: 15px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
}

.wfs_page_header {

    margin: 0em;
    padding-left: 0.25em;
    /*font-size: 1.5em;*/
    font-size: 1.25rem;
    font-weight: 900;
}

.wfs_page_content {

    margin: 2em 1em 2em 1em;
}

.wfs_main_content_area {
    
    height: 100%;
    bottom: 0;
}

.wfs_shadowed_cards {
    
    /*box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);*/
}

.wfs_pps_title_text {
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.wfs_pagelevel_limits {
    
    width: 100%;
    height: 100%;
    bottom: 0;
}

/* Create a simple white box, and add the shadow for the initial state */
.wfs_pps_icon_img {

    position: relative;
    display: inline-block;
    /*background-color: #E8E8E8;*/
    /*box-shadow: 0 1px 2px rgba(0,0,0,0.15);*/
    transition: all 0.3s ease-in-out;
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.wfs_pps_icon_img::after {

    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    /*box-shadow: 0 5px 15px rgba(0,0,0,0.3);*/
    transition: opacity 0.3s ease-in-out;
}

.wfs_pps_icon_img:hover {

    -webkit-transform: scale(1.25, 1.25);
    transform: scale(1.25, 1.25);
}

.wfs_pps_icon_img:hover::after {

    opacity: 1;
}

.wfs_pps_icon_text {

    position: relative;
    left: 72%; 
    transform: translateX(-50%);
    margin-bottom: 1em;
}

.wfs_pps_icon_box {
    padding-top: 0;
    padding-bottom: 0;
    max-height: 80% !important;
}

.wfs_img_div_for_translation {

    position: relative;
    left: 65%; 
    transform: translateX(-50%);    
}

.wfs_sidebar_column {

    /*border-left: thick solid #000000;*/   
    border-left: 3px solid #000000;
}

.wfs_pagelevel_nav_labels {

    font-size: 1.1em;
    color: black;
}

.wfs_search_box {
    
    background-color: rgba(0,0,0,0) !important;
    /*color: 6C757D;*/
    color: black;
    border-color: black !important;
    border-width: 2px;
    width: 100%;
}

textarea:focus, input:focus, input[type]:focus, .uneditable-input:focus {   

    border-color: black;
    /*box-shadow: 0 1px 1px grey inset, 0 0 8px grey;*/
    box-shadow: 0 0 0 grey inset, 0 0 0 grey;
    outline: 0 none;
}
</style>
