/* Libraries */
var _ = require("underscore");
var React = require("react");
var hashHistory = require("react-router").hashHistory;

/* Modules */
var InputHeader = require("../shared/InputHeader.jsx"),
    ExerciseList = require("./modules/ExerciseList.jsx");

/* Store */
var ProgressPageStore = require("../../stores/ProgressPageStore");

/* Actions */
var ProgressPageActions = require("../../actions/ProgressPageActions");

/* Private methods */
function getPageState(params) {
    return {
        workout: ProgressPageStore.getWorkout(params)
    };
};

/* Module */
var ProgressPage = React.createClass({
    /* ReactJS methods */
    getInitialState: function () {
        return getPageState(this.props.params);
    },
    componentDidMount: function () {
        ProgressPageStore.addChangeListener(this._onChange);
        ProgressPageActions.setTimer(new Date());
    },
    componentWillUnmount: function () {
        ProgressPageStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var workout = this.state.workout;
        
        return (
            <div className="page progress-page">
                <InputHeader name={workout.name}
                                backAction={this._goBack}
                                saveAction={this._finishWorkout}
                                isSaveBtnVisible={true}
                                readonly={true} />

                <div className="page-scroll">
                    <ExerciseList exercises={workout.exercises} />
                </div>
            </div>
        );
    },

    /* Event handlers */
    _onChange: function () {
        this.setState(getPageState(this.props.params));
    },
    _goBack: function () {
        hashHistory.goBack();
        ProgressPageActions.reset();
    },
    _finishWorkout: function () {
        ProgressPageActions.finishWorkout(this.state.workout, new Date());
        this._goBack();
    }
});

module.exports = ProgressPage;