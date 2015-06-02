ApiActions = {
  receiveAll: function(benches){
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  updateNode: function(node){
    AppDispatcher.dispatch({
      actionType: BenchConstants.NODE_RECEIVED,
      node: node
    })
  },

  createBench: function(bench){
    var  success = function(payload){
      AppDispatcher.dispatch({
        actionType: BenchConstants.CREATE_BENCH,
        bench: payload
      })
    };

    ApiUtil.newBench(bench, success)
  },

  filterBySeats: function(seats){
    var success = function(payload){
      AppDispatcher.dispatch({
        actionType: BenchConstants.BENCHES_RECEIVED,
        benches: payload
      })
    };

    ApiUtil.filterBySeats(seats, success);
  },

  findById: function(id){
    var success = function(payload){
      AppDispatcher.dispatch({
        actionType: BenchConstants.BENCHES_RECEIVED,
        benches: payload
      })
    };

    ApiUtil.findBenchById(id, success);
  }
}
