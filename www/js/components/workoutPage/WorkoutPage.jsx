/* Libraries */
var _ = require("underscore");
var React = require("react");
var hashHistory = require("react-router").hashHistory;

/* Modules */
var InputHeader = require("../shared/InputHeader.jsx"),
    Footer = require("../shared/Footer.jsx"),
    WeekdayList = require("./modules/WeekdayList.jsx"),
    ExerciseList = require("./modules/ExerciseList.jsx");

/* Actions */
var HomePageActions = require("../../actions/HomePageActions");
var WorkoutPageStore = require("../../stores/WorkoutPageStore");
var WorkoutPageActions = require("../../actions/WorkoutPageActions");

/* Private methods */
function getPageState(params) {
    return {
        workout: WorkoutPageStore.getWorkout(params)
    };
};

/* Module */
var WorkoutPage = React.createClass({
    /* ReactJS methods */
    getInitialState: function () {
        return getPageState(this.props.params);
    },
    componentDidMount: function () {
        WorkoutPageStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        WorkoutPageStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var workout = this.state.workout,
            isSaveBtnVisible = workout.name && workout.weekday && workout.exercises.length;

        var exercisePlaceholder = workout.exercises.length ?
                <ExerciseList workoutId={workout.id} exercises={workout.exercises} /> :
                <div className="no-data">There is nothing for now, create a new one.</div>;

        return (
            <div className="page workout-page">
                <InputHeader placeholder="Workout Name"
                             name={workout.name}
                             backAction={this._goBack}
                             saveAction={this._saveWorkout}
                             setName={this._setName}
                             isSaveBtnVisible={isSaveBtnVisible} />

                <div className="page-scroll">
                    <div>
                        <h2>Select workout day</h2>
                        <WeekdayList selectedWeekday={workout.weekday} />
                    </div>

                    <div>
                        <h2>Exercises</h2>
                        {exercisePlaceholder}
                    </div>
                </div>

                <Footer text="Add Exercise" callback={this._addExercise} />
            </div>
        );
    },

    /* Event handlers */
    _onChange: function () {
        this.setState(getPageState(this.props.params));
    },
    _goBack: function () {
        hashHistory.goBack();
        WorkoutPageActions.reset();
    },
    _saveWorkout: function () {
        WorkoutPageActions.saveWorkout(this.state.workout);
        this._goBack();
    },
    _setName: function (name) {
        WorkoutPageActions.setWorkoutName(name);
    },
    _addExercise: function () {
        hashHistory.push("exercise/new");
    },
});

module.exports = WorkoutPage;