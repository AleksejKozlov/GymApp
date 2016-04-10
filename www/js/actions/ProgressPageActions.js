/* Dispatcher */
var AppDispatcher = require("../dispatcher/AppDispatcher");

/* Constants */
var ProgressPageConstants = require("../constants/ProgressPageConstants");

/* Action */
var ProgressPageActions = {
    reset: function () {
        AppDispatcher.handleAction({
            actionType: ProgressPageConstants.RESET_PROGRESS_WORKOUT
        })
    },
    updateSet: function (exerciseId, setId, property, value) {
        AppDispatcher.handleAction({
            actionType: ProgressPageConstants.UPDATE_PROGRESS_SET,
            exerciseId: exerciseId,
            setId: setId,
            property: property,
            value: value
        })
    },
    editSet: function (exerciseId, setId, isEdit) {
        AppDispatcher.handleAction({
            actionType: ProgressPageConstants.EDIT_PROGRESS_SET,
            exerciseId: exerciseId,
            setId: setId,
            isEdit: isEdit
        })
    },
    toggleSet: function (exerciseId, setId) {
        AppDispatcher.handleAction({
            actionType: ProgressPageConstants.TOGGLE_PROGRESS_SET,
            exerciseId: exerciseId,
            setId: setId
        })
    },
    finishWorkout: function (workout, date) {
        AppDispatcher.handleAction({
            actionType: ProgressPageConstants.FINISH_PROGRESS_WORKOUT,
            workout: workout,
            date: date
        })
    },
    setTimer: function (date) {
        AppDispatcher.handleAction({
            actionType: ProgressPageConstants.START_PROGRESS_TIMER,
            date: date
        })
    }
};

module.exports = ProgressPageActions;