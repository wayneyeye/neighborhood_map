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
	//count of results
	self.resultCt = ko.computed(function() {return "Number of Results: "+self.filteredArray().length;});
	//apply filter
	self.applyFilter=function(){
		// make filtered ID array and reduce complexity
		var filteredID=[];
		for (var j=0;j<self.filteredArray().length;j++){
				filteredID.push(self.filteredArray()[j].id);
			}
		console.log(filteredID);
		for (var i=0;i<markers.length;i++){
				if (filteredID.indexOf(markers[i].id)!=-1){
					markers[i].setMap(map);
				}
				else{
					markers[i].setMap(null);				
				}
		}
	}

}
ko.applyBindings(new SearchBarVM());