function SearchBarVM() {
	var self = this;
	self.storeArray = ko.observableArray(sb_data['businesses']);
	self.filterText = ko.observable("");
	self.formattedFilter = ko.computed(function() {
        return self.filterText() ? "Filter = " + self.filterText() : "No Filter Applied! try Campbell, dallas, etc.";
    });
    self.filteredArray = ko.computed(function() {
    	self.fArray=new ko.observableArray();
		self.storeArray().forEach(function(item){
			// console.log(item);	
			if (item.store_address.toLowerCase().search(self.filterText().toLowerCase())!=-1){
				self.fArray.push(item);
			}			
		})      
        return self.filterText() ? self.fArray(): self.storeArray(); 
	  }
	);
	// console.log(self.storeArray);
}
ko.applyBindings(new SearchBarVM());