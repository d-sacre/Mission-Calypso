let system = new ResourcesSystem(150);
//let systemView = new ResourcesSystemView;

let timeUnit = setInterval(function() {
		let data = system.setTime();
		//systemView.refreshResourcesView();
	
}, 1000);