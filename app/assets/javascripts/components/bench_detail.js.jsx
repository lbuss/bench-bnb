var BenchDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      bench: null
    }
  },

  componentDidMount: function(){
    var param = this.context.router.getCurrentParams().id;
    BenchStore.addChangeListener(this.setBench);
    ApiActions.findById(param)
  },

  componentWillUnmount: function(){
    BenchStore.removeChangeListener(this.setBench);
  },


  setBench: function(){
    this.setState({
      bench: BenchStore.all()[0]
    })
  },

  render: function() {
    if(this.state.bench && this.state.bench.url){
      var img = <img src={this.state.bench.url}/>
    }

    if(this.state.bench){
      var view = <div>
        {this.state.bench.description}
        <Map lat={this.state.bench.lat} lng={this.state.bench.lng}/>
        {img}
      </div>
    }
    return (<div>
      {view}
      </div>
    )
  }
});
