(function(root){
  var _benches = [];
  var CHANGE_EVENT = "change";

  var resetBenches = function(benches){
    _benches = benches;
    BenchStore.emit(CHANGE_EVENT);
  };

  var addBench = function(bench){
    _benches.push(bench);
    BenchStore.emit(CHANGE_EVENT);
  }

  root.BenchStore = $.extend({}, EventEmitter.prototype, {
    all:function(){
      return _benches.slice(0);
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function(payload){
      if(payload.actionType === BenchConstants.BENCHES_RECEIVED){
        resetBenches(payload.benches);
      }

      if(payload.actionType === BenchConstants.CREATE_BENCH){
        addBench(payload.bench);
      }
    })
  })
})(this)
