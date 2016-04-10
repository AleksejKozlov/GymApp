var HomePageActions = require('../actions/HomePageActions');

module.exports = {
    // default objects
    
    getDefaultWorkout: function () {
        return {
            id: 0,
            name: "",
            exercises: []
        }
    },
    // get/set to localStorage
    getWorkouts: function () {
        var data = JSON.parse(localStorage.getItem('workouts'));
        HomePageActions.getWorkouts(data);
    }
};