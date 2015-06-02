var BenchForm = React.createClass({

  mixins:[React.addons.LinkedStateMixin, ReactRouter.Navigation],

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function(){
    BenchStore.addChangeListener(this.transitionHome);
  },

  componentWillUnmount: function(){
    BenchStore.removeChangeListener(this.transitionHome);
  },

  transitionHome: function(){
    this.transitionTo("/");
  },

  getInitialState: function(){
    var randomObject = this.context;
    var router = randomObject.router;
    var queryStringObject = router.getCurrentQuery();
    if (queryStringObject.lat && queryStringObject.lng){
      return {
        lat:queryStringObject.lat,
        lng:queryStringObject.lng,
        description: "Enter Bench Description",
        seats: 2,
        url: null
      }
    } else {
      return{
        lat: 0,
        lng: 0,
        description: "Enter Bench Description",
        seats: 2,
        url: null
      }
    }
  },

  submitBench: function(e){
    e.preventDefault;
    ApiActions.createBench(this.state);
  },

  openFilePicker: function(e){
    e.preventDefault();
    filepicker.pick(
      function(Blob){
        this.setState({url: Blob.url})
      }.bind(this)
    )
  },

  render: function() {
    return (
    <form onSubmit={this.submitBench}>
      <input type="text" valueLink={this.linkState('lat')} name="lat"/>
      <input type="text" valueLink={this.linkState('lng')} name="lng"/>
      <input type="text" valueLink={this.linkState('description')} name="description"/>
      <input type="text" valueLink={this.linkState('seats')} name="seats"/>
      <button onClick={this.openFilePicker}>Upload Image</button>
      <input type="submit" value="new bench"/>

    </form>
    )
  }
});
