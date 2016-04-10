/* Dispatcher */
var AppDispatcher = require("../dispatcher/AppDispatcher");

/* Constants */
var WorkoutPageConstants = require("../constants/WorkoutPageConstants");

/* Action */
var WorkoutPageActions = {
    setWorkoutName: function(name) {
        AppDispatcher.handleAction({
            actionType: WorkoutPageConstants.SET_WORKOUT_NAME,
            name: name
        })
    },
    setWorkoutWeekday: function (weekday) {
        AppDispatcher.handleAction({
            actionType: WorkoutPageConstants.SET_WORKOUT_WEEKDAY,
            weekday: weekday
        })
    },
    saveExercise: function (exercise) {
        AppDispatcher.handleAction({
            actionType: WorkoutPageConstants.SAVE_EXERCISE,
            exercise: exercise
        })
    },
    deleteExercise: function (id) {
        AppDispatcher.handleAction({
            actionType: WorkoutPageConstants.DELETE_EXERCISE,
            id: id
        })
    },
    saveWorkout: function (workout) {
        AppDispatcher.handleAction({
            actionType: WorkoutPageConstants.SAVE_WORKOUT,
            workout: workout
        })
    },
    reset: function () {
        AppDispatcher.handleAction({
            actionType: WorkoutPageConstants.RESET_WORKOUT
        })
    }
};

module.exports = WorkoutPageActions;