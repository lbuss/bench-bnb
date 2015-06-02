ApiUtil = {
  fetchBenches: function(bounds){

    $.ajax({
      url: 'api/benches',
      type: "GET",
      data: {'bounds': bounds},
      success: function(resp){
          ApiActions.receiveAll(resp);
      }
    })
  },

  newBench: function(bench, success){
    $.ajax({
      url: '/api/benches',
      type: 'POST',
      data: {'bench': bench},
      success: success
    })
  },

  filterBySeats: function(seats, success){
    $.ajax({
      url: '/api/seatFilter',
      type: 'GET',
      data: seats,
      success: success
    })
  },

  findBenchById: function(id, success){
    $.ajax({
      url: '/api/benches/' + id,
      type: 'GET',
      success: success
    })
  },
}
