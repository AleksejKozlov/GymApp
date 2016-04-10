/* Libraries */
var _ = require('underscore');
var React = require('react');
var hashHistory = require('react-router').hashHistory;

/* Modules */
var InputHeader = require("../shared/InputHeader.jsx"),
    Footer = require('../shared/Footer.jsx'),
    SetList = require("./modules/SetList.jsx");

/* Store */
var ExercisePageStore = require('../../stores/ExercisePageStore');

/* Actions */
var ExercisePageActions = require("../../actions/ExercisePageActions"),
    WorkoutPageActions = require("../../actions/WorkoutPageActions");

/* Private methods */
function getPageState(params) {
    return {
        exercise: ExercisePageStore.getExercise(params)
    };
};

/* Module */
var ExercisePage = React.createClass({
    /* ReactJS methods */
    getInitialState: function () {
        return getPageState(this.props.params);
    },
    componentDidMount: function () {
        ExercisePageStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        ExercisePageStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var params = this.props.params,
            isNewExerice = params.exerciseId === "new";

        var exercise = this.state.exercise,
            isSaveBtnVisible = exercise.name && _.find(exercise.sets, function (set) { return set.reps; });

        return (
            <div className="page exercise-page">
                <InputHeader placeholder="Exercise Name"
                             name={exercise.name}
                             backAction={this._goBack}
                             saveAction={this._saveExercise}
                             setName={this._setName}
                             isSaveBtnVisible={isSaveBtnVisible} />

                <div className="page-scroll">
                    <SetList sets={exercise.sets} />
                    <div id="exercise-set-list-bottom"></div>
                </div>

                <Footer text="Add Set"
                        callback={this._addSet} />
            </div>
        );
    },

    /* Event handlers */
    _onChange: function () {
        this.setState(getPageState(this.props.params));
    },
    _goBack: function () {
        hashHistory.goBack();
        ExercisePageActions.reset();
    },
    _saveExercise: function () {
        WorkoutPageActions.saveExercise(this.state.exercise);
        this._goBack();
    },
    _setName: function (name) {
        ExercisePageActions.setExerciseName(name);
    },
    _addSet: function () {
        ExercisePageActions.addSet();
        setTimeout(function () {
            helpers.smoothScroll(document.getElementById("exercise-set-list-bottom"));
        }, 100);
    }
});

module.exports = ExercisePage;