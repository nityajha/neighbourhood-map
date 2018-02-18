var appViewModel;

//array of locations

var locations=[{title: 'Red Fort', location: {lat: 28.6561592, lng: 77.2410203}},
			   {title: 'Lotus Temple', location: {lat: 28.553492, lng: 77.2588264}},
			   {title: 'Rashtrapati Bhawan', location: {lat: 28.6141527, lng: 77.19596219999994}},
			   {title: 'Qutub Minar', location: {lat: 28.5244281, lng: 77.18545589999997}},
			   {title: 'India Gate', location: {lat: 28.612912, lng: 77.2295097}},
			   {title: 'Worlds of Wonder', location: {lat: 28.5638068, lng: 77.32605979999994}},
			   {title: 'National Rail Museum', location: {lat: 28.5854992, lng: 77.1800892}},
			   {title: 'University of Delhi', location: {lat: 28.5842523, lng: 77.16382820000001}},
			   {title: 'Tughlakabad Fort', location: {lat: 28.5163996, lng: 77.26134879999995}},
			   {title: 'The Garden of Five Senses', location: {lat: 28.513307, lng: 77.19850309999993}},
			   {title: 'Tomb of Humayun', location: {lat: 28.5932818, lng: 77.2507488}},
			   {title: 'Hazrat Nizamuddin Aulia Dargah', location: {lat: 28.5913871, lng: 77.24186429999997}},
			   {title: 'National Zoological Park', location: {lat: 28.603018, lng: 77.24654799999996}},
			   {title: 'Jantar Mantar', location: {lat: 28.6270547, lng: 77.2166267}}
			   ];

//map variable used in initmap()
var map;

// Create a new blank array for all the listing markers.
var markers = [];

//initializing map
function initMap() {
	//initial location
	var initloc={
		lat: 28.6139391,
		lng: 77.20902120000005
	};
	//creating map object 
	map = new google.maps.Map(document.getElementById('map'), {
		center: initloc,
		zoom:13
		});
		
	//creating infowindow for locations
	var infoWindow=new google.maps.InfoWindow();
	
	//iterating through all locations in array
	for(i=0; i<locations.length; i++){
		(function(){
			var title=locations[i].title;
			var location=locations[i].location;
			//dropping markers
			var marker=new google.maps.Marker({
				position: location,
				map: map,
				title: title,
				animation: google.maps.Animation.DROP,
				address:address
			});
			//pushing locations in marker array
			markers.push(marker)
			
			appViewModel.mylocations()[i].marker=marker;
			
			//onclick event to open an infowindow
			marker.addListener('click', function(){
				populateInfoWindow(this, infoWindow);
				infoWindow.setContent(contentstring);
			});
			
			//function to populate the infowindow when a marker is clicked
			function populateInfoWindow(marker, infoWindow){
				if(infoWindow.marker != marker){
					infoWindow.marker = marker;
					infoWindow.setContent('<div class="title">'+ marker.title+ '</div>' + marker.contentstring);
					//animation when marker is clicked
					marker.setAnimation(google.maps.Animation.BOUNCE);
					setTimeout(function(){
						marker.setAnimation(null);
					}, 1500);
					infoWindow.open(map, marker);
					//clear marker property when infowindow is closed
					infoWindow.addListener('closeclick',function(){
						infoWindow.setMarker = null;
					});
				}
			}
		}	
			
	}
}

//view model
var AppViewModel=function(){
	var self = this;
	this.mylocations = ko.observableArray();
	this.filteredInput = ko.observable('');
	for(i=0; i<locations.length; i++){
		var place = new Location(locations[i]);
		self.mylocations.push(place);
	}
	this.searchFilter = ko.computed(function(){
		//filters locations as user types
		if(self.mylocations()[i].title.toLowerCase().indexOf(filter)> -1){
			//location shown as matched by typing
			self.mylocations()[i].show(true);
			if(self.mylocations()[i].marker){
				self.mylocations()[j].marker.setVisible(true);
			}
		}else{
			//hides locations as per user choice key words
			self.mylocations()[i].marker.setVisible(false);
			if(self.mylocations()[i].marker){
				self.mylocations()[i].marker.setVisible(false);
			}
		}
	});
	//marker bounces when marker is clicked
	this.showlocation=function(locations){
		google.maps.event.trigger(locations.marker, 'click');
	};
};
appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);
