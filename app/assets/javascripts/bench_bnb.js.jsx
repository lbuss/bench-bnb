

var callback = function(){
  var Link = ReactRouter.Link;
  var root = document.getElementById('content');
  var RouteHandler = ReactRouter.RouteHandler;
  var Route = ReactRouter.Route;
  var App = React.createClass({
    render: function(){
      return (
        <div>
          <header>
            <h1>Bench BnB</h1>
          </header>
          <Link to="create">Create</Link>
          <Link to="app">Home</Link>
          <RouteHandler/>
        </div>
      )
    }
  });

  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="create" handler={BenchForm}/>
      <Route name="benches" path="benches/:id" handler={BenchDetail}/>
      <ReactRouter.DefaultRoute handler={Search}/>
    </Route>
  )

  ReactRouter.run(routes, function(Handler){
    React.render(<Handler/>, root)
  })
}

$(callback);
