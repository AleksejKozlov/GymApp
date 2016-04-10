/* Libraries */
var _ = require("underscore");
var Swiper = require("swiper");
var React = require("react");
var ReactDOM = require("react-dom");
var hashHistory = require("react-router").hashHistory;

/* Actions */
var HomePageActions = require("../../../actions/HomePageActions");

/* Store */
var HomePageStore = require("../../../stores/HomePageStore");

/* Module */
var WorkoutList = React.createClass({
    /* ReactJS methods */
    getInitialState: function () {
        return {
            workoutElems: this._createWorkoutElems(this.props.workouts)
        };
    },
    componentDidUpdate: function () {
        // init swiper
        var swiper = new Swiper(".js-exercise-swiper", {
            pagination: ".js-exercise-swiper-pagination",
            paginationType: "progress",
            spaceBetween: 2,
            slidesPerView: "auto",
            speed: 250
        });
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.workouts.length === this.props.workouts.length) {
            return;
        }

        // new props received
        var workoutElems = this._createWorkoutElems(nextProps.workouts);

        // update state
        this.setState({ workoutElems: workoutElems });
    },
    render: function () {
        var workoutElems = this.state.workoutElems,
            self = this;

        var workoutItems = workoutElems.map(function (workoutElem, workoutIndex) {
            var workout = workoutElem.workout,
                weekdayTitle = self._getWeekdayTitle(workout.weekday);

            var isActiveClass = workoutElem.isActive ? "is-active" : "",
                totalWeight = 0,
                width = 175 + 302 * workout.exercises.length;

            var exerciseItems = workout.exercises.map(function (exercise, exerciseIndex) {
                var setsItems = exercise.sets.map(function (set, setIndex) {
                    totalWeight += set.weight ? parseInt(set.weight) : 0;

                    return (
                        <li key={setIndex}>
                            <div className="set-item">
                                <span className="step">{setIndex + 1}</span>
                                <input className="weight" value={set.weight ? set.weight + " kg" : 0 + " kg"} readOnly />
                                <input className="reps" value={set.reps} readOnly />
                            </div>
                        </li>
                    );
                });

                return (
                    <div key={exerciseIndex} className="swiper-slide">
                        <div className="box-container is-large">
                            <div className="box-container-animation">
                                <span className="exercise-name">{exercise.name.toLowerCase()}</span>
                                <ul className="set-list">{setsItems}</ul>
                            </div>
                        </div>
                    </div>
                );
            });

            var workoutInfo = workoutElem.isActive ?
                <div className="workout-list-item-container">
                    <div className="swiper-container js-exercise-swiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="box-container is-small">
                                    <div className="box-container-animation">
                                        <i className="flaticon-weight"></i>
                                        <span className="value">{totalWeight}</span>
                                        <span className="title">kg lifted</span>
                                    </div>
                                </div>

                                <div className="box-container is-small">
                                    <div className="box-container-animation">
                                        <i className="flaticon-time"></i>
                                        <span className="value">{workout.time}</span>
                                        <span className="title">min spent</span>
                                    </div>
                                </div>
                            </div>

                            {exerciseItems}
                        </div>

                        <div className="swiper-pagination js-exercise-swiper-pagination"></div>
                    </div>
                </div>
                : "";

            return (
                <li key={"workout-" + workout.id} className={isActiveClass}>
                    <div className="workout-list-header-item" onClick={self._toggle.bind(null, workout.id) }>
                        <span className="date">{weekdayTitle}</span>
                        <span className="title">{workout.name}</span>
                    </div>

                        {workoutInfo}

                    <div className="workout-list-btn-container">
                        <div className="btn-container" onClick={self._edit.bind(null, workout.id) }>
                            <i className="btn edit-btn flaticon-pen"></i>
                        </div>
                        <div className="btn-container" onClick={self._delete.bind(null, workout.id) }>
                            <i className="btn edit-btn flaticon-delete"></i>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <ul className="workout-list">
                {workoutItems}
            </ul>
        );
    },

    /* Private methods */
    _createWorkoutElems: function (workouts) {
        return _.map(workouts, function (workout) {
            return {
                workout: workout,
                isActive: false
            }
        });
    },
    _getWeekdayTitle: function (abreviation) {
        var abr = abreviation.toLowerCase(),
            title = "";

        switch (abr) {
            case "mo":
                title = "Monday";
                break;
            case "tu":
                title = "Tuesday";
                break;
            case "we":
                title = "Wednesday";
                break;
            case "th":
                title = "Thursday";
                break;
            case "fr":
                title = "Friday";
                break;
            case "sa":
                title = "Saturday";
                break;
            case "su":
                title = "Sunday";
                break;
        }

        return title;
    },

    /* Event handlers */
    _toggle: function (id) {
        var workoutElems = this.state.workoutElems;

        // toggle
        _.each(workoutElems, function (workoutElem) {
            if (workoutElem.workout.id === id) {
                workoutElem.isActive = !workoutElem.isActive;
            } else {
                workoutElem.isActive = false;
            }
        });

        // update state
        this.setState({ workoutElems: workoutElems });

        // notify parent
        var toggledWorkoutElem = _.find(workoutElems, function (workoutElem) {
            return workoutElem.workout.id === id;
        });
        HomePageActions.workoutSelected(toggledWorkoutElem);
    },
    _edit: function (id) {
        HomePageActions.workoutSelected(null);
        hashHistory.push("workout/" + id);
    },
    _delete: function (id) {
        HomePageActions.deleteWorkout(id);
    }
});

module.exports = WorkoutList;