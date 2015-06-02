var Map = React.createClass({

  mixins:[ReactRouter.Navigation],

  getInitialState: function(){
    return{
      selected_node: null
    }
  },

  initializeMap: function(){
    var lat = 37.7758;
    var lng = -122.435;

    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: lat, lng: lng},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.markers = {};
  },

  componentWillUnmount: function(){
    google.maps.event.clearListeners(this.map, 'idle');
    BenchStore.removeChangeListener(this.updateMarkers);
    UiState.removeChangeNodeListener(this.updateNode);
  },

  componentDidMount: function(){
    this.initializeMap();
    if(this.props.lat && this.props.lng){
      var newCenter = new google.maps.LatLng(this.props.lat, this.props.lng);
      this.map.setCenter(newCenter);
      this.updateMarkers();
    }else{
      google.maps.event.addListener(this.map, 'idle', this.apiFetchBenches);
      google.maps.event.addListener(this.map, 'click', this.getNewCoords);
      BenchStore.addChangeListener(this.updateMarkers);
      UiState.addChangeNodeListener(this.updateNode);
    }

  },

  render: function() {
    if(this.state.node){
      this.markers[this.state.node].setAnimation(google.maps.Animation.BOUNCE);
    }
    return <div className="map" ref="map"/>;
  },

  addMarker: function(bench){
    var myLatlng = new google.maps.LatLng(bench.lat, bench.lng);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      title: bench.description
    });
    return marker;
  },

  updateNode: function(){
    this.setState({ node: UiState.getSelectedNode()});
  },

  getNewCoords: function(event){
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    this.transitionTo('/create?lat=' + lat + '&lng=' + lng)
  },

  apiFetchBenches: function(){
    var mapBounds = this.map.getBounds();
    var bounds = {'northEast': {'lat': mapBounds.getNorthEast().lat(), 'lng': mapBounds.getNorthEast().lng()},
                  'southWest': {'lat': mapBounds.getSouthWest().lat(), 'lng': mapBounds.getSouthWest().lng()}
                }
    ApiUtil.fetchBenches(bounds);
  },

  updateMarkers: function(){
    var newMarkers = {}
    BenchStore.all().forEach(function(bench){
      if(!this.markers[bench.id]){
        newMarkers[bench.id] = this.addMarker(bench);
      }else if (this.markers[bench.id]){
        newMarkers[bench.id] = this.markers[bench.id];
        this.markers[bench.id] = null;
      }
    }.bind(this))

    Object.keys(this.markers).forEach(function(benchId){
      if(this.markers[benchId]){
        this.markers[benchId].setMap(null);
        this.markers[benchId] = null;
      }
    }.bind(this))

    this.markers = newMarkers;
  }
});
