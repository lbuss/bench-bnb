var Index = React.createClass({
  mixins:[ReactRouter.Navigation],

  getInitialState: function(){
    return {
      selected_node: null,
      benches: BenchStore.all()
    }
  },

  componentDidMount: function(){
      BenchStore.addChangeListener(this.changeBenchState);
  },

  componentWillUnmount: function(){
    BenchStore.removeChangeListener(this.changeBenchState);
  },

  changeBenchState: function(){
    this.setState({ benches: BenchStore.all()})
  },

  handleHover: function(event) {
    ApiActions.updateNode(event.target.dataset.id);
  },

  showBench: function(event) {
    this.transitionTo('/benches/' + event.target.dataset.id)
  },

  render: function() {
    var benches = this.state.benches.map(function(bench){
      return (
          <li onMouseEnter={this.handleHover} onClick={this.showBench} data-id={bench.id} key={bench.id}>{bench.description}</li>
      )
    }.bind(this))
    return (<ul>{benches}</ul>)
  }
});
