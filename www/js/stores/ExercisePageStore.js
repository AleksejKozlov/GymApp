/* Librarries */
var _ = require("underscore");
var EventEmitter = require("events").EventEmitter;

/* Dispatcher */
var AppDispatcher = require("../dispatcher/AppDispatcher");

/* Constants */
var ExercisePageConstants = require("../constants/ExercisePageConstants");

/* Utils */
var WorkoutModel = require("../utils/WorkoutModel");

/* Store */
var WorkoutPageStore = require("../stores/WorkoutPageStore.js");

/* Private variables */
var _exercise = null,
    _activeSetId = null;

/* Private methods */
function setExerciseName(name) {
    _exercise.name = name;
}
function toggleSet(id) {
    // close all and toggle selected
    _.each(_exercise.sets, function (set) {
        if (set.id === id) {
            set.isCollapsed = !set.isCollapsed;       
        } else {
            set.isCollapsed = true;
        }
    });
}
function deleteSet(id) {
    var set = getSet(id);
    _exercise.sets = _.without(_exercise.sets, set);
}
function updateSet(id, property, value) {
    var set = getSet(id);
    set[property] = value;
}
function addSet() {
    // collapse all sets
    var sets = _exercise.sets;
    _.each(sets, function(set) {
        set.isCollapsed = true;
    });

    // create new expanded set
    var lastSet = _.last(sets),
        newSet = _.extend({}, lastSet);
    newSet.id = lastSet.id + 1;
    newSet.isCollapsed = false;
    sets.push(newSet);
}
function reset() {
    _exercise = null;
}
function getSet(id) {
    return _.find(_exercise.sets, function (set) {
        return set.id === id;
    });
}
function getDefaultExercise () {
    return {
        id: 0,
        name: "",
        sets: [{ id: 1, weight: "", reps: "" }]
    };
}

/* Store */
var ExercisePageStore = _.extend({}, EventEmitter.prototype, {
    getExercise: function (params) {
        // get current data
        if (_exercise) {
            return _exercise;
        }

        // otherwise
        var exerciseId = params.id === "new" ? null : parseInt(params.id);
        var exerciseCopy = exerciseId ? WorkoutPageStore.getExercise(exerciseId) : getDefaultExercise();
        
        // work with new object, adding extra properties
        _exercise = JSON.parse(JSON.stringify(exerciseCopy));
        _.each(_exercise.sets, function (set) {
            set.isCollapsed = exerciseId ? true : false;
        });

        return _exercise;
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
        case ExercisePageConstants.SET_EXERCISE_NAME:
            setExerciseName(action.name);
            ExercisePageStore.emitChange();
            break;
        case ExercisePageConstants.TOGGLE_SET:
            toggleSet(action.id);
            ExercisePageStore.emitChange();
            break;
        case ExercisePageConstants.DELETE_SET:
            deleteSet(action.id);
            ExercisePageStore.emitChange();
            break;
        case ExercisePageConstants.UPDATE_SET:
            updateSet(action.id, action.property, action.value);
            ExercisePageStore.emitChange();
            break;
        case ExercisePageConstants.ADD_SET:
            addSet();
            ExercisePageStore.emitChange();
            break;
        case ExercisePageConstants.RESET_EXERCISE:
            reset();
            break;
        default:
            return true;
    }

    return true;
});

module.exports = ExercisePageStore;