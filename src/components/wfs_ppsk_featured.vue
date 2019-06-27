<template>

	<div>

		<span class="wfs_ppsk_featured_label">Scrapbook:&nbsp;</span>
		<span>
			<a :href="'/collection/book/' + bookNumber">{{ bookNumber }}</a>
		</span>
		<br />&nbsp;&nbsp;&nbsp;&nbsp;
		<span class="wfs_ppsk_featured_label">Pages:&nbsp;</span>
		<a v-for="pageID in pages" :href="'/collection/book/' + bookNumber + '/page/' + getPageIndexFromID(bookNumber, pageID)">{{ pageNumberPlusComma(bookNumber, getPageNumberFromID(bookNumber, pageID)) }}</a>
	</div>

</template>

<script>

export default {

	name: "wfs-ppsk-featured",
	props: ["bookNumber", "pages", "cp"],
	
	methods: {

		pageNumberPlusComma: function(p_bookNumber, p_pageNumber) {

			if ( p_pageNumber != 
				this.getPageNumberFromID(p_bookNumber, 
										 this.pages[this.pages.length - 1]) ) {
			
				return p_pageNumber + ", ";
			}

			return p_pageNumber;
		},

		getPageNumberFromID: function(p_bookNumber, p_pageID) {
			
			let pageNumber = -1;
			
			for ( let index = 0; index < this.cp.myJSON[p_bookNumber].pages.length; index++ ) {

				if ( p_pageID == this.cp.myJSON[p_bookNumber].pages[index].id ) {
					pageNumber = this.cp.myJSON[p_bookNumber].pages[index].number + this.cp.myJSON[p_bookNumber].pages[index].suffix;
				}
			}

			return pageNumber;
		},

		getPageIndexFromID: function(p_bookNumber, p_pageID) {

			let pageIndex = -1;
			
			for ( let index = 0; index < this.cp.myJSON[p_bookNumber].pages.length; index++ ) {

				if ( p_pageID == this.cp.myJSON[p_bookNumber].pages[index].id ) {
					pageIndex = index;
				}
			}

			return pageIndex;
		}
	},
}
</script>

<style>

.wfs_ppsk_featured_label {

	color: black;
	font-weight: 900;
}
</style>