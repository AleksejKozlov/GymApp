/* Libraries */
var React = require("react");
var hashHistory = require("react-router").hashHistory;

/* Actions */
var WorkoutPageActions = require("../../../actions/WorkoutPageActions");

/* Module */
var ExerciseList = React.createClass({
    /* ReactJS methods */
    render: function () {
        var exercises = this.props.exercises,
            self = this;

        var items = exercises.map(function (exercise, i) {
            var exerciseId = exercise.id;

            return (
                <li key={i}>
                    <span className="title" onClick={self._edit.bind(null, exerciseId)}>
                        {exercise.name.toLowerCase()}
                    </span>

                    <span className="delete-btn-container" onClick={self._delete.bind(null, exerciseId)}>
                        <i className="flaticon-delete"></i>
                    </span>
                </li>
            );
        });

        return (
            <ul className="workout-exercise-list">
                {items}
            </ul>
        );
    },

    /* Event handlers */
    _edit: function (exerciseId) {
        hashHistory.push("exercise/" + exerciseId);
    },
    _delete: function (id) {
        WorkoutPageActions.deleteExercise(id);
    }
});

module.exports = ExerciseList;