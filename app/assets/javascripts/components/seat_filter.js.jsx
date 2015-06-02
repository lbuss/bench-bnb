var SeatFilter = React.createClass({
  getInitialState: function(){
    return{
      seats: 0,
    }
  },

  mixins: [React.addons.LinkedStateMixin],

  filterBySeats: function(event){
      ApiActions.filterBySeats(this.state);
  },

  render: function() {
    return(
      <form onSubmit={this.filterBySeats}>
        <input type="text" valueLink={this.linkState('seats')} name="seats"/>
        <input type="submit" value="filter by seats"/>
      </form>
    )
  },



});
