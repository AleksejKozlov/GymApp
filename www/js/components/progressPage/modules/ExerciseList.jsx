/* Libraries */
var _ = require("underscore");
var React = require("react");
var ReactDOM = require("react-dom");
var hashHistory = require("react-router").hashHistory;

/* Actions */
var ProgressPageActions = require("../../../actions/ProgressPageActions");

/* Module */
var ExerciseList = React.createClass({
    render: function () {
        var exercises = this.props.exercises,
            self = this;

        var exerciseItems = exercises.map(function (exercise, exerciseIndex) {
            var isFinishedExerciseClass = exercise.isFinished ? " is-finished" : "";

            var setsItems = exercise.sets.map(function (set, setIndex) {
                var isFinishedSetClass = set.isFinished ? " is-finished" : "";

                var weight = set.weight ? set.weight : 0;
                weight = set.isEdit ? (weight ? weight : "") : weight + " kg";

                return (
                    <li key={setIndex}>
                        <div className={"set-item" + isFinishedSetClass}>
                            <div className="animation-container">
                                <span className="step" onClick={self._toggleSet.bind(null, exercise.id, set.id)}>
                                    {setIndex + 1}
                                </span>

                                <input className="weight" value={weight} type="tel" maxLength="4"
                                       onClick={self._editSet.bind(null, exercise.id, set.id, true)}
                                       onBlur={self._editSet.bind(null, exercise.id, set.id, false)}
                                       onChange={self._updateSet.bind(null, exercise.id, set.id, "weight")} />
                            </div>

                            <input className="reps" value={set.reps} type="tel" maxLength="2"
                                   onChange={self._updateSet.bind(null, exercise.id, set.id, "reps")} />
                        </div>
                    </li>
                );
            });

            return (
                <li key={exerciseIndex}>
                    <span className="exercise-name">{exercise.name.toLowerCase()}</span>
                    <ul className="set-list">
                        {setsItems}
                    </ul>
                </li>
            );
        });

        return (
            <ul className="progress-exercise-list">
                {exerciseItems}
            </ul>
        );
    },

    /* Event handlers */
    _editSet: function (exerciseId, setId, isEdit) {
        ProgressPageActions.editSet(exerciseId, setId, isEdit)
    },
    _updateSet: function (exerciseId, setId, property, event) {
        ProgressPageActions.updateSet(exerciseId, setId, property, event.target.value);
    },
    _toggleSet: function (exerciseId, setId) {
        ProgressPageActions.toggleSet(exerciseId, setId);
    }
});

module.exports = ExerciseList;