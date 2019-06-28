<template>

<div>

    <!-- Navbar -->
    <wfs-nav :title="cp.title" :color="spineColor" id="scrapbooklevel_navbar">
        <span class="navbar-brand-righttext">{{ currentlyExamined }}</span>
    </wfs-nav>                  

    <div>

        <b-container class="wfs_main_content_area" fluid>

            <b-row style="margin: 2em 1em 2em 2em;">

                <!-- Scrapbook List -->
                <b-col cols="6">

                    <b-row>
                        <b-col cols="12">

                            <div class="wfs_page_component">

                                <!-- Header -->
                                <b-row class="wfs_page_header">
                                    <b-col cols="6">
                                        <h5 class="wfs_user_direction" style="float: left;">Select a book</h5>
                                    </b-col>
                                    <!-- <b-col cols="6">
                                        <b-button  @click="backToCollection" style="float: right; margin: 0;" v-if="'Collection' != currentlyExaminedEntry">Back to Collection</b-button>

                                    </b-col> -->
                                </b-row>

                                <!-- List -->
                                <b-row class="wfs_page_content" style="margin-bottom: 1em;">

                                    <b-col cols="12">
                                        
                                        <b-row style="margin-top: 0em;">

                                            
                                            <b-col cols="3" v-for="entry in cp.myJSONList" :key="entry['book']['id']" @click="selectScrapbook(entry['book']['number'])">
                                                
                                                <div class="wfs_scrapbook_icon_container">

                                                    <b-img 
                                                        :src="bookImages[entry['book']['number']]" blank-color="#abc" 
                                                        :style="{width: selectedScale(entry['book']['number'], bookImgScales[entry['book']['number']]), height: selectedScale(entry['book']['number'], bookImgScales[entry['book']['number']]), borderStyle: 'solid', borderRadius: bookIconBorderRadius(entry['book']['number']), borderColor: 'rgb(159,45,94)', borderWidth: bookIconBorderWidth(entry['book']['number']), backgroundColor: bookIconBackground(entry['book']['number'])}" 
                                                        alt="placeholder" 
                                                        class="wfs_scrapbook_icon_img"
                                                        fluid/>

                                                    <div class="wfs_scrapbook_icon_number">{{ entry['book']['number'] }}</div>
                                                </div>

                                                <br/>
                                            </b-col>
                                        </b-row>

                                        <b-row><b-col cols="12"><br/></b-col></b-row>

                                        <!-- View scrapbook pages button -->
                                        
                                        <b-row v-if="'Collection' != currentlyExaminedEntry">

                                            <b-col cols="4">
                                                <wfs-metadata-button value="Back to Collection" :click="backToCollection">
                                                    <img :src="backArrow" title="Return to collection view" height="30" style="padding-top: 0.35em; vertical-align: sub;"/>
                                                </wfs-metadata-button>
                                                <!-- <b-button  @click="backToCollection" style="float: right; margin: 0;" v-if="'Collection' != currentlyExaminedEntry">Back to Collection</b-button> -->
                                            </b-col>
                                            <b-col cols="2"></b-col>
                                            <b-col cols="6">
                                                <wfs-metadata-button value="Inside this Book" :click="switchToPageLevel" style="float: right;">
                                                    <img :src="openBookIcon" title="Look inside this scrapbook" height="30" style="padding-top: 0.35em; vertical-align: sub;"/>
                                                </wfs-metadata-button>
                                            </b-col>
                                            <!-- <b-col cols="2">
                                                <img :src="openBookIcon" title="Look inside this scrapbook" height="30" style="padding-top: 0.35em; vertical-align: sub;"/>
                                            </b-col>
                                            <b-col cols="10" style="padding-left: 0;">
                                                <b-button  @click="switchToPageLevel" style="float: left;">Inside this Scrapbook</b-button>
                                            </b-col> -->
                                        </b-row>

                                    </b-col>

                                </b-row>
                            </div>
                        </b-col>
                    </b-row>

                </b-col>

                <!-- Collection or Book info -->
                <b-col class="wfs_page_component" cols="5" style="margin-left: 4.25em;">

                    <!-- Collection Overview or Scrapbook information -->
                    <!-- Click contextual info - either Collection Overview or Scrapbook -->
                    <keep-alive>
                        <router-view :is="childInfoType" :cp="cp" :switchMethod="switchMethod"></router-view>
                    </keep-alive>

                </b-col>

            </b-row>

            <!-- Visualization area -->
            <b-row style="margin: 2em 2em 2em 2em;" id="wfs_collection_book_visualization_area">

                <b-col cols="12">
                    <keep-alive>
                        <router-view :is="childVisType" :cp="cp"></router-view>
                    </keep-alive>
                </b-col>
             
            </b-row>

        </b-container>
    </div>

    <!-- <div id="wfs_booklevel_footer">

        <b-container style="padding: 0;" fluid>

            <b-row>
                <b-col cols="2" style="padding: 0;" id="wfs_triangle_left">
                </b-col>
                <b-col cols="8"></b-col>
                <b-col cols="2" style="padding: 0;" id="wfs_triangle_right">
                </b-col>
            </b-row>

            <b-row class="wfs_footer">
                <b-col cols="11" style="background-color: black;"></b-col>
                <b-col cols="1">
                    <a class="wfs_footer_text" href="about.html">About</a>
                </b-col>
            </b-row>

        </b-container>
    </div> -->

</div>

</template>

<script>

// Bootstrap components
import bImg from "bootstrap-vue/es/components/image/img";
import bButton from "bootstrap-vue/es/components/button/button";

// Bootstrap grid layout
import bContainer from "bootstrap-vue/es/components/layout/container";
import bRow from "bootstrap-vue/es/components/layout/row";
import bCol from "bootstrap-vue/es/components/layout/col";

// WFS components
import wfsMetadata from "./wfs_metadata.vue";
import wfsMetadataButton from "./wfs_metadata_button.vue";
import wfsNav from "./wfs_nav.vue";
import wfsScrapbookLevelBookInfo from "./wfs_scrapbooklevel_bookinfo.vue";
import wfsScrapbookLevelCollectionInfo from "./wfs_scrapbooklevel_collectioninfo.vue";
import wfsScrapbookLevelBookVis from "./wfs_scrapbooklevel_bookvis.vue";
import wfsScrapbookLevelCollVis from "./wfs_scrapbooklevel_collvis.vue";

// Chartkick
// import pieChart from VueChartkick;

// Chartist
// import * as Chartist from "chartist";
// import * as MyTooltip from "chartist-plugin-tooltip";
// new MyTooltip();


export default {

    name: "wfs-scrapbooklevel",

    props: ["cp", "switchMethod"],

    components: { 

        "b-img": bImg,
        "b-button": bButton,

        "b-container": bContainer,
        "b-row": bRow,
        "b-col": bCol,

        "wfs-metadata": wfsMetadata,
        "wfs-metadata-button": wfsMetadataButton,
        "wfs-nav": wfsNav,
        "wfs-scrapbooklevel-bookinfo": wfsScrapbookLevelBookInfo,
        "wfs-scrapbooklevel-collectioninfo": wfsScrapbookLevelCollectionInfo,
        "wfs-scrapbooklevel-bookvis": wfsScrapbookLevelBookVis,
        "wfs-scrapbooklevel-collvis": wfsScrapbookLevelCollVis,
    },

    // beforeRouteUpdate(to, from, next){ 
        
    //     console.log("beforeRouteEnter");

    //     // this.pickCollectionOrBook(to.path, to.params);

    //     next(); 

    // },
    // beforeRouteLeave(to, from, next){ console.log("beforeRouteLeave"); next(); },

    beforeRouteEnter(to, from, next){

        console.log("beforeRouteUpdate");

        next(vm => {

            if ( vm.$route.path.params &&
                 vm.$route.path.params.includes("/collection/book/")) { 
                vm.currentlyExaminedEntry = "Scrapbook " + vm.$route.params.bookNumber;
                vm.setNavbarToSpineColor();
                vm.setBackgroundColorToCoverColor();

            } else {
                vm.currentlyExaminedEntry = "Collection";
                vm.setNavbarToCollectionColor();
                if ( vm.setBackgroundColorToPageColor ){
                    vm.setBackgroundColorToPageColor();
                }
            }
            // vm.pickCollectionOrBook(vm.$route.path, vm.$route.params);
        });
    },    

    data () {

        return {

            childInfoType: "wfs-scrapbooklevel-collectioninfo",
            childVisType: "wfs-scrapbooklevel-collvis",

            currentlyExaminedEntry: "Collection",

            bookImages: {

                "1": "/src/assets/images/scrapbook1_cover_icon.png",
                "6": "/src/assets/images/scrapbook6_cover_icon.png",
                "9": "/src/assets/images/scrapbook9_cover_icon.png",
                "12": "/src/assets/images/scrapbook12_cover_icon.png",
            },

            bookImgScales: {

                "1": "90%",
                "6": "90%",
                "9": "100%",
                "12": "100%",
            },

            backArrow: "/src/assets/images/back_arrow_flip_white.png",
            openBookIcon: "/src/assets/images/open_book_icon_white.png",
        }; 
    },

    computed: {

        currentlyExamined: function() {

            return ( "Collection" == this.currentlyExaminedEntry ) ? "Edwin Morgan's Scrapbooks" : this.currentlyExaminedEntry;
        },

        spineColor: function() {

            return ( "Collection" == this.currentlyExaminedEntry ) ? "rgb(35, 43, 43)" :  this.cp.bookCoverColors[this.cp.bookNumber].spine
        },

        viewPagesOfText: function() {

            return ( "Collection" == this.currentlyExaminedEntry ) ? "" : "View pages of " + this.currentlyExaminedEntry;
        }
    },

    methods: { 

        pickCollectionOrBook: function(p_path, p_params) {

            // Collection route
            if ( "/" === p_path || 
                 "/collection" === p_path ) {
                console.log("beforeRouteLeave");
                this.backToCollection();
            // Else, this is a book route
            } else {

                this.currentlyExaminedEntry = "Scrapbook " + p_params.bookNumber;

                this.selectScrapbook(p_params.bookNumber);

                // Start navbar color with the spine color from scrapbook 1
                this.setNavbarToSpineColor();

                // Set background color with the cover color from scrapbook 1
                console.log("setBackgroundColorToCoverColor in pickCollectionOrBook");
                this.setBackgroundColorToCoverColor();
            }
        },

        backToCollection: function() {

            console.log("backToCollection call");

            // Change info component to collection level
            this.childInfoType = "wfs-scrapbooklevel-collectioninfo";

            // Change back to collection overview visualization
            this.childVisType = "wfs-scrapbooklevel-collvis";

            // Set the currently examined selection for the navbar text
            this.currentlyExaminedEntry = "Collection";

            // Reset to default values in wfs_page.vue
            this.cp.currentEntry = this.cp.myJSON["1"].book;
            this.cp.pageIndex = 0;
            this.cp.bookNumber = this.cp.myJSON["1"].book.number;

            // Alter the spine color for navbar
            this.setNavbarToCollectionColor();

            // Alter the background color back to paper
            this.setBackgroundColorToPaperColor();

            // Push collection route
            this.$router.push({ name: "home" });
        },

        bookIconBackground: function(p_bookNumber) {

            return ( "Collection" != this.currentlyExaminedEntry && 
                     p_bookNumber.toString() == this.cp.bookNumber ) ? "rgb(159,45,94)" : "none";
        },

        bookIconBorderRadius: function(p_bookNumber) {

            return ( "Collection" != this.currentlyExaminedEntry &&
                     p_bookNumber.toString() == this.cp.bookNumber ) ? "5px" : "0px";
        },

        bookIconBorderWidth: function(p_bookNumber) {

            return ( "Collection" != this.currentlyExaminedEntry &&
                     p_bookNumber.toString() == this.cp.bookNumber ) ? "thick" : "0px";
        },             

        createWordCloud: function(p_contentAreaID, p_cloudDivID) {

            // D3 word cloud library from https://github.com/wvengen/d3-wordcloud 
    
            // Get dimensions of area for cloud
            let vizContentAreaRect = document.querySelector(p_contentAreaID)
                                             .getBoundingClientRect();
            let wordCloudDims = { 
                
                width: (vizContentAreaRect.right - 
                       vizContentAreaRect.left) * 0.9, 
                height: 300
            };

            // Build text, size pairs for collection or selected scrapbook
            let keywordDict = null;
            if ( "Collection" == this.currentlyExaminedEntry ) {
                keywordDict = this.cp.collection.keyword_count_dict;
            } else {
                keywordDict = this.cp.myJSON[this.cp.bookNumber].stats.keyword_count_dict;
            }

            // Determine average word count
            // let wordCountSum = 0;
            // for ( var word in keywordDict ) {
            //     wordCountSum += parseInt(keywordDict[word]);
            // }
            // let wordCountAvg = wordCountSum / Object.keys(keywordDict).length;
            // let minimumWordCount = wordCountAvg;

            // Get top N words in the keyword dictionary
            let wordSizePairs = [];
            for ( var word in keywordDict ) {
                wordSizePairs.push({text: word, size: parseInt(keywordDict[word])});
            }

            let nRandomValues = 100;
            var indexValues = []
            while ( indexValues.length < nRandomValues ) {
    
                var randomNumber = Math.floor(Math.random() * 100) + 1;
                if ( indexValues.indexOf(randomNumber) > -1 )
                    continue;
                indexValues[indexValues.length] = randomNumber;
            }
            let randomWordSizePairs = [];
            for ( let i = 0; i < indexValues.length; i++ ) {
                randomWordSizePairs.push(wordSizePairs[indexValues[i]]);
            }

            // let topNValue = 100;
            // let topNWordList = wordSizePairs.sort(
            //     function(a, b) { 
            //         return a.size - b.size; }
            // ).slice(0, topNValue);

            d3.wordcloud()
              .size([wordCloudDims.width, wordCloudDims.height])
              .scale("linear")
              .fontWeight("bold")
              .selector(p_cloudDivID)
              .words(randomWordSizePairs)
              // .onwordclick(function(d, i) {
              //     //window.location = "https://www.google.co.uk/search?q=" + d.text;
              // })
              .start();  
        },      

        selectedScale(p_bookNumber, p_dimension) {

            let scale = p_dimension;

            if ( "Collection" != this.currentlyExaminedEntry && 
                 p_bookNumber.toString() == this.cp.bookNumber ) {
             
                scale = (parseInt(p_dimension) * 1.25).toString() + "%";
            }

            return scale;
        },

        selectScrapbook: function(p_clickedBookNumber) {

            console.log("selectScrapbook");

            for ( var bookNumber in this.cp.myJSON ){

                if ( p_clickedBookNumber == bookNumber ) {

                    // Change info component to scrapbook level
                    this.childInfoType = "wfs-scrapbooklevel-bookinfo";

                    // Change visualization overview type
                    this.childVisType = "wfs-scrapbooklevel-bookvis";

                    // Set the currently examined selection for the navbar text
                    this.currentlyExaminedEntry = "Scrapbook " + bookNumber;

                    this.cp.currentEntry = this.cp.myJSON[bookNumber].book;
                    this.cp.pageIndex = 0;
                    this.cp.bookNumber = bookNumber;

                    // Alter the spine color for navbar
                    this.setNavbarToSpineColor();

                    // Alter the cover color
                    console.log("setBackgroundColorToCoverColor in selectScrapbook");
                    this.setBackgroundColorToCoverColor();

                    // Push the scrapbook route
                    this.$router.push({
                        name: "book",
                        params: { bookNumber: this.cp.currentEntry.number },
                    });     

                    break;
                }
            }            
        },

        getBackgroundColor: function() {

            return $("body").css("background-color");
        },

        setBackgroundColorToPaperColor: function() {

            $("body").css("background-color", "rgb(217, 204, 187)");            
        },

        setBackgroundColorToCoverColor: function() {

            // console.log("setBackgroundColorToCoverColor with " + this.cp.bookCoverColors[this.cp.bookNumber].cover);
            $("body").css("background-color", this.cp.bookCoverColors[this.cp.bookNumber].cover);
        },

        setNavbarToCollectionColor: function() {

            // Workaround to override color via jQuery
            let cp = this.cp;
            $("#scrapbooklevel_navbar").each(function(){

                this.style.setProperty("background-color", 
                    "rgb(35, 43, 43)", "important");
            });

            this.currentlyExaminedEntry = "Collection";
        },

        setNavbarToSpineColor: function() {

            // Workaround to override color via jQuery
            let cp = this.cp;
            $("#scrapbooklevel_navbar").each(function(){

                this.style.setProperty("background-color", 
                    cp.bookCoverColors[cp.bookNumber].spine, "important");
            });
        },

        // switchToPageLevel: function() {

        //     this.switchMethod("wfs-pagelevel");
        // },

        switchToPageLevel: function() {

            // Indicate a new page list is needed for the pagelevel page
            this.cp.newPageListNeeded = true;

            // Push route
            this.$router.push({ name: "page",
                                params: { 
                                    bookNumber: this.cp.currentEntry.number, 
                                    pageNumber: 0
                                }});

            this.switchMethod("wfs-pagelevel");
        },        

        // createChart: function() {

        //     var data = { labels: [], series: [[]] };
        //     var options = { plugins: [Chartist.plugins.tooltip()] };

        //     for ( var bookID in this.myJSON ) {

        //         // Add the scrapbook number
        //         data.labels.push(bookID);

        //         // Add the page count for this scrapbook
        //         data.series[0].push(this.myJSON[bookID].book.stats.pages);
        //     }

        //     new Chartist.Bar('.ct-chart', data, options);
        // }
    },

    // Hooks
    created() {

        console.log("Scrapbooklevel creation");

        // Create book ID to book number dictionary
        for ( let index = 0; index < this.cp.myJSONList.length; index++ ) {

            this.cp.bookIDsToNumbers[this.cp.myJSONList[index].book.id] = this.cp.myJSONList[index].book.number;
        }

        // Routing goes through Scrapbooklevel create (NOTE: probably because it's at the top level of the App - should look into why)
        if ( this.$route ) {

            // Person routing
            if ( this.$route.params.personID ) {

                this.cp.currentPerson = 
                    this.cp.peopleJSON[this.$route.params.personID];
                this.switchMethod("wfs-person");
            } 
            // Place routing
            else if ( this.$route.params.placeID ) {

                this.cp.currentPlace = 
                    this.cp.placesJSON[this.$route.params.placeID];
                this.switchMethod("wfs-place");
            } 
            // Source routing
            else if ( this.$route.params.sourceID ) {

                this.cp.currentSource = 
                    this.cp.sourcesJSON[this.$route.params.sourceID];
                this.switchMethod("wfs-source");
            } 
            // Keyword routing
            else if ( this.$route.params.keywordID ) {

                this.cp.currentKeyword = this.cp.collection.ids_to_keywords[this.$route.params.keywordID];
                this.switchMethod("wfs-keyword");
            }
            // Page routing
            else if ( this.$route.params.pageNumber ) {

                this.cp.bookNumber = this.$route.params.bookNumber;
                this.currentlyExaminedEntry = "Scrapbook " + this.cp.bookNumber;
                this.cp.currentEntry = this.cp.myJSON[this.cp.bookNumber].book;
                this.cp.pageIndex = parseInt(this.$route.params.pageNumber);                
                this.switchMethod("wfs-pagelevel");
            } 
            // Collection or book routing
            else {

                if ( this.$route.params.bookNumber ) {

                    this.currentlyExaminedEntry = "Scrapbook " + this.$route.params.bookNumber;
                    this.selectScrapbook(this.$route.params.bookNumber);

                    // Start navbar color with the spine color from scrapbook 1
                    this.setNavbarToSpineColor();

                    // Set background color with the cover color from scrapbook 1
                    console.log("setBackgroundColorToCoverColor in created");
                    this.setBackgroundColorToCoverColor(); 
                } else { 

                    // Switch currently examined field to collection
                    this.currentlyExaminedEntry = "Collection";

                    // Set the navbar to the default black for the collection
                    this.setNavbarToCollectionColor();

                    // Set the background to paper color if in collection view
                    this.setBackgroundColorToPaperColor()
                }

                this.switchMethod("wfs-scrapbooklevel");
            }
        }    
    },

    mounted() {

        // this.createChart();

        // Create word cloud within visualization content area on the given div
        // this.createWordCloud("#wfs_collection_book_visualization_area",
        //                      "#wfs_collection_book_cloud");

        // Listen to browser back/forward button
        window.onpopstate = function(p_event) {
            this.selectScrapbook(this.$route.params.bookNumber);
        }.bind(this);
    },

    updated() {

        // if ( this.$route.params ){
        //     console.log(this.$route.params);
        //     console.log(this.cp.bookNumber);
        // }

        // if ( this.$route.path.includes("/collection/book") ) {
        //      if ( this.cp.bookNumber != this.$route.params.bookNumber ) {
        //         selectScrapbook(this.$route.params.bookNumber);
        //     }
        // } else if ( this.currentlyExaminedEntry.includes("Scrapbook") ){
        //     this.backToCollection();
        // }

    //     if ( "Collection" == this.currentlyExaminedEntry &&
    //          this.$route.path.includes("/collection/book") ) {
    //         this.pickCollectionOrBook(this.$route.path, this.$route.params);
    //     } else if ( this.currentlyExaminedEntry.includes("Scrapbook") &&
    //                 this.$route.path == "/collection" ) {
    //         this.pickCollectionOrBook(this.$route.path, this.$route.params);
    //     } 
    }
}

</script>

<style>

.wfs_scrapbook_icon_container {

    color: white;
    position: relative;
    text-align: center;
}

/* Create a simple white box, and add the shadow for the initial state */
.wfs_scrapbook_icon_img {

    position: relative;
    display: inline-block;
    background-color: #E8E8E8;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    transition: all 0.3s ease-in-out;
    /*height: 100%;
    width: 100%;*/
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.wfs_scrapbook_icon_img::after {

    content: '';
    position: absolute;
    z-index: -1;
    /*width: 100%;
    height: 100%;*/
    opacity: 0;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: opacity 0.3s ease-in-out;
}

.wfs_scrapbook_icon_img:hover {

    -webkit-transform: scale(1.25, 1.25);
    transform: scale(1.25, 1.25);
}

.wfs_scrapbook_icon_img:hover::after {

    opacity: 1;
}

.wfs_scrapbook_icon_number {

    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-25%, -50%);
    font-family: ScotchRomanMT;
    font-size: 1.5em;
    pointer-events: none;
}

.navbar-brand-righttext {

    color: white !important;
    margin-right: 0.5em;
    letter-spacing: 1px !important;
    font-size: 1.6em !important;
    font-family: ScotchRomanMT, serif;
}

.wfs_button {

    margin-left: 0.5em;
    margin-top: 1em;
}

#wfs_triangle_left {

    width         : 0;
    height        : 0;
    border-left   : 100px solid #888;
    border-right  : 100px solid transparent;  
    border-bottom : 100px solid transparent;
    transform: rotateZ(270deg) translateX(70px) translateY(-45px);
}

#wfs_triangle_right {

    width         : 0;
    height        : 0;
    border-left   : 100px solid transparent;
    border-right  : 100px solid #ccc;  
    border-bottom : 100px solid transparent;
    transform: rotateZ(90deg) translateX(-70px) translateY(-45px);
}

.wfs_footer {

    background-color: black !important;
    display: block;
}

.wfs_footer_text {

    background-color: black;
    float: right;
    font-family: ScotchRomanMT, serif;
    color: white;
    margin-left: 0.5em;
    letter-spacing: 1px;
    font-size: 1.6em;
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
