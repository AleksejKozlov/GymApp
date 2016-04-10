// remove click delay
var attachFastClick = require("fastclick");
attachFastClick(document.body);

// start app
var React = require("react");
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var hashHistory = require("react-router").hashHistory;

var HomePage = require("./homePage/HomePage.jsx"),
    WorkoutPage = require("./workoutPage/WorkoutPage.jsx"),
    ExercisePage = require("./exercisePage/ExercisePage.jsx"),
    ProgressPage = require("./progressPage/ProgressPage.jsx");

// Init the app
var GymApp = React.createClass({
    render: function () {
        var routes = []
        return (
            <Router history={hashHistory}>
                <Route path="/" component={HomePage} />
                <Route path="workout/:id" component={WorkoutPage} />
                <Route path="exercise/:id" component={ExercisePage} />
                <Route path="start/:id" component={ProgressPage} />
            </Router>
        );
    }
});

module.exports = GymApp;

//<ReactCSSTransitionGroup 
//    component="div"
//    transitionName="example"
//    transitionEnterTimeout={5000}
//    transitionLeaveTimeout={5000}>
//    {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
//</ReactCSSTransitionGroup>

//<ReactCSSTransitionGroup transitionName="workout-transition"
//                         component="ul"
//                         className="workout-list"
//                         transitionEnterTimeout={3000}
//                         transitionLeaveTimeout={300}>
//	{workoutItems}
//</ReactCSSTransitionGroup>