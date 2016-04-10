/* Librarries */
var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;

/* Dispatcher */
var AppDispatcher = require("../dispatcher/AppDispatcher");

/* Constants */
var ProgressPageConstants = require("../constants/ProgressPageConstants");

/* Utils */
var WorkoutModel = require("../utils/WorkoutModel");

/* Store */
var HomePageStore = require("../stores/HomePageStore");

/* Private variables */
var _workout = null,
    _startDate = null;

/* Private methods */
function reset() {
    _workout = null;
    _startDate = null;
}
function getSet(exerciseId, setId) {
    var exercise = _.findWhere(_workout.exercises, { id: exerciseId });
    return _.findWhere(exercise.sets, { id: setId });
}
function updateSet(exerciseId, setId, property, value) {
    var set = getSet(exerciseId, setId);
    set[property] = value;
}
function editSet(exerciseId, setId, isEdit) {
    var set = getSet(exerciseId, setId);
    set.isEdit = isEdit;
}
function toggleSet(exerciseId, setId) {
    var set = getSet(exerciseId, setId);
    set.isFinished = !set.isFinished;
}
function finishWorkout(workout, endDate) {
    // remove UI properties
    _.each(workout.exercises, function (exercise) {
        _.each(exercise.sets, function (set) {
            delete set.isEdit;
            delete set.isFinished;
        });
    });

    // get workout progress time
    workout.time = Math.round((endDate.getTime() - _startDate.getTime()) / 60000);
    WorkoutModel.saveWorkout(workout);
}
function setTimer(date) {
    _startDate = date;
}

/* Store */
var ProgressPageStore = _.extend({}, EventEmitter.prototype, {
    getWorkout: function (params) {
        // get current data
        if (_workout) {
            return _workout;
        }

        // otherwise
        var id = parseInt(params.id);
        workoutCopy = WorkoutModel.getExistingWorkout(id);

        // work with new object, adding extra properties
        _workout = _.extend({}, workoutCopy); //JSON.parse(JSON.stringify(workoutCopy));
        _.each(_workout.exercises, function (exercise) {
            _.each(exercise.sets, function (set) {
                set.isEdit = false;
                set.isFinished = false;
            });
        });
        return _workout;
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
        case ProgressPageConstants.RESET_PROGRESS_WORKOUT:
            reset();
            break;
        case ProgressPageConstants.UPDATE_PROGRESS_SET:
            updateSet(action.exerciseId, action.setId, action.property, action.value);
            ProgressPageStore.emitChange();
            break;
        case ProgressPageConstants.EDIT_PROGRESS_SET:
            editSet(action.exerciseId, action.setId, action.isEdit);
            ProgressPageStore.emitChange();
            break;
        case ProgressPageConstants.TOGGLE_PROGRESS_SET:
            toggleSet(action.exerciseId, action.setId);
            ProgressPageStore.emitChange();
            break;
        case ProgressPageConstants.FINISH_PROGRESS_WORKOUT:
            finishWorkout(action.workout, action.date);
            break;
        case ProgressPageConstants.START_PROGRESS_TIMER:
            setTimer(action.date);
            break;
        default:
            return true;
    }

    return true;
});

module.exports = ProgressPageStore;