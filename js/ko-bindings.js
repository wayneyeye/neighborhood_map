function SearchBarVM() {
	var self = this;
	self.storeArray = ko.observableArray(sb_data['businesses']);
	self.filterText = ko.observable("");
	self.formattedFilter = ko.computed(function() {
        return self.filterText() ? "Filter = " + self.filterText() : "No Filter Applied"; //if price = 0 then return "None"       
    });
	// console.log(self.storeArray);
}
ko.applyBindings(new SearchBarVM());