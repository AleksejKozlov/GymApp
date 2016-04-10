/* Librarries */
var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;

/* Dispatcher */
var AppDispatcher = require("../dispatcher/AppDispatcher");

/* Constants */
var WorkoutPageConstants = require("../constants/WorkoutPageConstants");

/* Utils */
var WorkoutModel = require("../utils/WorkoutModel");

/* Private variables */
var _workout = null;

/* Private methods */
function setWorkoutName(name) {
    _workout.name = name;
}
function setWorkoutWeekday(weekday) {
    _workout.weekday = weekday;
}
function saveExercise(exercise) {
    // new
    if (exercise.id === 0) {
        var lastExercise = _.last(_workout.exercises);
        exercise.id = lastExercise ? lastExercise.id + 1 : 1;
        _workout.exercises.push(exercise);
        return;
    }
    
    // existing
    var existingExercise = getExistingExercise(exercise.id);
    _.extend(existingExercise, exercise);
}
function deleteExercise(id) {
    var exercise = getExistingExercise(id);
    _workout.exercises = _.without(_workout.exercises, exercise);
}
function saveWorkout(workout) {
    // remove UI properties
    _.each(workout.exercises, function (exercise) {
        _.each(exercise.sets, function (set) {
            delete set.isCollapsed;
        });
    });

    WorkoutModel.saveWorkout(workout);
}
function reset() {
    _workout = null;
}
function getExistingExercise(id) {
    return _.findWhere(_workout.exercises, { id: id });
}
function getDefaultWorkout () {
    return {
        id: 0,
        name: "",
        weekday: "",
        exercises: [],
        time: 0
    };
}

/* Store */
var WorkoutPageStore = _.extend({}, EventEmitter.prototype, {
    getWorkout: function (params) {
        // get current data
        if (_workout) {
            return _workout;
        }
        
        // otherwise
        var id = params.id === "new" ? null : parseInt(params.id);
        var workoutCopy = id ? WorkoutModel.getExistingWorkout(id) : getDefaultWorkout();

        // work with new object
        _workout = _.extend({}, workoutCopy); //JSON.parse(JSON.stringify(workoutCopy));
        return _workout;
    },
    getExercise: function (id) {
        return getExistingExercise(id);
    },
    emitChange: function() {
        this.emit("change");
    },
    addChangeListener: function(callback) {
        this.on("change", callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener("change", callback);
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch(action.actionType) {
        case WorkoutPageConstants.SET_WORKOUT_NAME:
            setWorkoutName(action.name);
            WorkoutPageStore.emitChange();
            break;
        case WorkoutPageConstants.SET_WORKOUT_WEEKDAY:
            setWorkoutWeekday(action.weekday);
            WorkoutPageStore.emitChange();
            break;
        case WorkoutPageConstants.SAVE_EXERCISE:
            saveExercise(action.exercise);
            WorkoutPageStore.emitChange();
            break;
        case WorkoutPageConstants.DELETE_EXERCISE:
            deleteExercise(action.id);
            WorkoutPageStore.emitChange();
            break;
        case WorkoutPageConstants.SAVE_WORKOUT:
            saveWorkout(action.workout);
            break;
        case WorkoutPageConstants.RESET_WORKOUT:
            reset();
        default:
            return true;
    }

    return true;
});

module.exports = WorkoutPageStore;