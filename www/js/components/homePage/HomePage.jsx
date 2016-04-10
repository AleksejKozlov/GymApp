/* Libraries */
var React = require("react");
var hashHistory = require("react-router").hashHistory;

/* Modules */
var Intro = require("./modules/Intro.jsx"),
    SuggestionList = require("./modules/SuggestionList.jsx"),
    WorkoutList = require("./modules/WorkoutList.jsx"),
    Footer = require("../shared/Footer.jsx");

/* Actions */
var HomePageActions = require("../../actions/HomePageActions");

/* Store */
var HomePageStore = require("../../stores/HomePageStore");

/* Private methods */
function getPageState(params) {
    return {
        workouts: HomePageStore.getWorkouts(),
        selectedWorkout: HomePageStore.getSelectedWorkout(),
        suggestedWorkouts: HomePageStore.getSuggestedWorkouts(),
        isSuggestedVisible: HomePageStore.isSuggestedVisible()
    };
};

/* Module */
var HomePage = React.createClass({
    /* ReactJS methods */
    getInitialState: function () {
        return getPageState();
    },
    componentDidMount: function () {
        HomePageStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        HomePageStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var self = this;

        var workouts = this.state.workouts,
            selectedWorkout = this.state.selectedWorkout,
            suggestedWorkouts = this.state.suggestedWorkouts,
            isSuggestedVisible = this.state.isSuggestedVisible;

        var pageStateClass = isSuggestedVisible || workouts.length === 0 ? " is-suggested" : "";

        var workoutsPlaceholder = workouts.length > 0 ?
            <WorkoutList workouts={workouts} /> : "";

        var footerBtnText = selectedWorkout ? "Start Workout" : "Create Workout",
            footerBtnCallback = selectedWorkout ? this._startWorkout.bind(null, selectedWorkout.id) : this._addWorkout;

        var suggestionCloseBtn = workouts.length > 0 ?
                <span className="suggestion-btn-container" onClick={self._toggleSuggestedWorkouts.bind(null, false) }>
                    <i className="flaticon-cross suggestion-btn"></i>
                </span> :
                "";

        return (
            <div className={"page home-page" + pageStateClass}>
                <div className="page-scroll">
                    <div className="suggestion-wrapper">
                        <div className="suggestion-container">
                            {suggestionCloseBtn}
                            <SuggestionList suggestedWorkouts={suggestedWorkouts} />
                        </div>
                    </div>

                    <div className="workout-wrapper">
                        <div className="workout-container">
                            <h2>Workouts</h2>
                            <span className="suggestion-btn-container" onClick={self._toggleSuggestedWorkouts.bind(null, true)}>
                                <i className="flaticon-favorite suggestion-btn"></i>
                            </span>

                            <div className="workout-scroll-container">
                                {workoutsPlaceholder}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer text={footerBtnText} callback={footerBtnCallback} />
            </div>
        );
    },

    /* Event handlers */
    _onChange: function () {
        this.setState(getPageState());
    },
    _startWorkout: function (id) {
        HomePageActions.workoutSelected(null);
        hashHistory.push("start/" + id);
    },
    _addWorkout: function () {
        hashHistory.push("workout/new");
    },
    _toggleSuggestedWorkouts: function (toggle) {
        HomePageActions.toggleSuggestedWorkouts(toggle);
    }
});

module.exports = HomePage;