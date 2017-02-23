function SearchBarVM() {
	var self = this;
	self.storeArray = ko.observableArray(sb_data['businesses']);
	// console.log(self.storeArray);
}
ko.applyBindings(new SearchBarVM());