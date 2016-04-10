/* Dispatcher */
var AppDispatcher = require("../dispatcher/AppDispatcher");

/* Constants */
var HomePageConstants = require("../constants/HomePageConstants");

/* Action */
var HomePageActions = {
    getWorkouts: function (data) {
        AppDispatcher.handleAction({
            actionType: HomePageConstants.GET_WORKOUTS,
            data: data
        })
    },
    deleteWorkout: function (id) {
        AppDispatcher.handleAction({
            actionType: HomePageConstants.DELETE_WORKOUT,
            id: id
        })
    },
    workoutSelected: function (workoutElem) {
        AppDispatcher.handleAction({
            actionType: HomePageConstants.WORKOUT_SELECTED,
            workoutElem: workoutElem
        })
    },
    addSuggestedWorkouts: function (workouts) {
        AppDispatcher.handleAction({
            actionType: HomePageConstants.ADD_SUGGESTED_WORKOUTS,
            workouts: workouts
        })
    },
    toggleSuggestedWorkouts: function (toggle) {
        AppDispatcher.handleAction({
            actionType: HomePageConstants.TOGGLE_SUGGESTED_WORKOUTS,
            toggle: toggle
        })
    }
};

module.exports = HomePageActions;