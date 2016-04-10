/* Librarries */
var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;

/* Utils */
var WorkoutModel = require("../utils/WorkoutModel");

/* Dispatcher */
var AppDispatcher = require("../dispatcher/AppDispatcher");

/* Constants */
var HomePageConstants = require("../constants/HomePageConstants");

/* Private variables */
var _workouts = null,
    _selectedWorkout = null,
    _isSuggested = false;

/* Private methods */
function getExistingWorkout(id) {
    return _.findWhere(_workouts, { id: id });
}
function deleteWorkout(id) {
    WorkoutModel.deleteWorkout(id);
}
function setSelectedWorkout(workoutElem) {
    _selectedWorkout = workoutElem && workoutElem.isActive ? workoutElem.workout : null;
    return _selectedWorkout;
}
function addSuggestedWorkouts(workouts) {
    _.each(workouts, function (workout) {
        WorkoutModel.saveWorkout(workout);
    });
}
function toggleSuggestedWorkouts(toggle) {
    _isSuggested = toggle;
}

/* Store */
var HomePageStore = _.extend({}, EventEmitter.prototype, {
    getWorkouts: function () {
        _workouts = WorkoutModel.getWorkouts();
        return _workouts;
    },
    getSelectedWorkout: function() {
        return _selectedWorkout;
    },
    getSuggestedWorkouts: function() {
        return WorkoutModel.getSuggestedWorkouts();
    },
    isSuggestedVisible: function () {
        return _isSuggested;
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
        case HomePageConstants.DELETE_WORKOUT:
            deleteWorkout(action.id);
            HomePageStore.emitChange();
            break;
        case HomePageConstants.WORKOUT_SELECTED:
            setSelectedWorkout(action.workoutElem);
            HomePageStore.emitChange();
            break;
        case HomePageConstants.ADD_SUGGESTED_WORKOUTS:
            addSuggestedWorkouts(action.workouts);
            HomePageStore.emitChange();
        case HomePageConstants.TOGGLE_SUGGESTED_WORKOUTS:
            toggleSuggestedWorkouts(action.toggle);
            HomePageStore.emitChange();
        default:
            return true;
    }

    return true;
});

module.exports = HomePageStore;