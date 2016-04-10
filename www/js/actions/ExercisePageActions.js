/* Dispatcher */
var AppDispatcher = require('../dispatcher/AppDispatcher');

/* Constants */
var ExercisePageConstants = require('../constants/ExercisePageConstants');

/* Action */
var ExercisePageActions = {
    setExerciseName: function(name) {
        AppDispatcher.handleAction({
            actionType: ExercisePageConstants.SET_EXERCISE_NAME,
            name: name
        })
    },
    toggleSet: function (id) {
        AppDispatcher.handleAction({
            actionType: ExercisePageConstants.TOGGLE_SET,
            id: id
        })
    },
    deleteSet: function (id) {
        AppDispatcher.handleAction({
            actionType: ExercisePageConstants.DELETE_SET,
            id: id
        })
    },
    updateSet: function (id, property, value) {
        AppDispatcher.handleAction({
            actionType: ExercisePageConstants.UPDATE_SET,
            id: id,
            property: property,
            value: value
        })
    },
    addSet: function () {
        AppDispatcher.handleAction({
            actionType: ExercisePageConstants.ADD_SET
        })
    },
    reset: function () {
        AppDispatcher.handleAction({
            actionType: ExercisePageConstants.RESET_EXERCISE
        })
    }
};

module.exports = ExercisePageActions;