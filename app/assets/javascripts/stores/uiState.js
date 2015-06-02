(function(root){
  var _selectedNode = null;
  var CHANGE_EVENT = "change";

  var changeNode = function(node){
    _selectedNode = node;
    BenchStore.emit(CHANGE_EVENT);
  };

  root.UiState = $.extend({}, EventEmitter.prototype, {
    getSelectedNode:function(){
      return _selectedNode;
    },

    addChangeNodeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeNodeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function(payload){
      if(payload.actionType === BenchConstants.NODE_RECEIVED){
        changeNode(payload.node);
        UiState.emitChange();
      }
    })
  })
})(this)
