/* Libraries */
var _ = require("underscore");
var React = require("react");

/* Actions */
var HomePageActions = require("../../../actions/HomePageActions");

/* Store */
var HomePageStore = require("../../../stores/HomePageStore");

/* Module */
var SuggestionList = React.createClass({
    /* ReactJS methods */
    render: function () {
        var suggestedWorkoutElems = this.props.suggestedWorkouts;
        var self = this;

        var suggestedWorkouts = suggestedWorkoutElems.map(function (suggestedWorkoutElem, workoutIndex) {
            return (
                <li key={workoutIndex}>
                    <div className="suggestion-item">
                        <span className="btn-container" onClick={self._addWorkout.bind(null, suggestedWorkoutElem.workouts)}>
                            <i className="btn flaticon-plus"></i>
                        </span>

                        <div className="title-container">
                            <h2>{suggestedWorkoutElem.title}</h2>
                            <h3>{suggestedWorkoutElem.subtitle}</h3>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <ul className="suggestion-list">
                {suggestedWorkouts}
            </ul>
        );
    },

    /* Private methods */

    /* Event handlers */
    _addWorkout: function (workouts) {
        HomePageActions.addSuggestedWorkouts(workouts);
    }
});

module.exports = SuggestionList;