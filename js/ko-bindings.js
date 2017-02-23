function SearchBarVM() {
	var self = this;
	//ob array stores store list
	self.storeArray = ko.observableArray(sb_data['businesses']);
	//str input from filter box
	self.filterText = ko.observable("");
	//formatted filter echo
	self.formattedFilter = ko.computed(function() {
        return self.filterText() ? "Filter = " + self.filterText() : "No Filter Applied! Try: 75080, Campbell, dallas, etc.";
    });
    //filtered store list
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
}
ko.applyBindings(new SearchBarVM());