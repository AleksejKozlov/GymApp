/* Librarries */
var _ = require("underscore");

/* Private variables */

/* Private methods */
function updateWorkouts(workouts) {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

/* Module */
var WorkoutModel = {
    getWorkouts: function () {
        var workouts = localStorage.getItem("workouts");
        return workouts ? JSON.parse(workouts) : [];
    },
    deleteWorkout: function (id) {
        var existingWorkouts = this.getWorkouts(),
            workouts = _.without(existingWorkouts, _.findWhere(existingWorkouts, { id: id }));
        
        updateWorkouts(workouts);
    },
    getExistingWorkout: function (id) {
        var workouts = this.getWorkouts();
        return _.findWhere(workouts, { id: id });
    },
    saveWorkout: function (workout) {
        var workouts = this.getWorkouts();

        // new
        if (!workout.id || workout.id === 0) {
            var lastWorkout = _.last(workouts);
            workout.id = lastWorkout ? lastWorkout.id + 1 : 1;

            workouts.push(workout);
        } else {
            // existing
            workouts = _.map(workouts, function (existingWorkout) {
                if (existingWorkout.id === workout.id) {
                    existingWorkout = workout;
                }

                return existingWorkout;
            });
        }

        updateWorkouts(workouts);
    },
    getSuggestedWorkouts: function () {
        return [
            {
                title: "Beginner plan",
                subtitle: "3 day workout",
                workouts: [
                    {
                        name: "Day 1",
                        weekday: "Mo",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL SQUAT",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 2,
                                name: "BARBELL BENCH PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 3,
                                name: "PULL-UP",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 4,
                                name: "BARBELL MILITARY PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 5,
                                name: "BARBELL CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 6,
                                name: "AB ROLLER",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 2",
                        weekday: "We",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL DEADLIFT",
                                sets: [
                                    { id: 1, weight: 0, reps: 5 },
                                    { id: 2, weight: 0, reps: 5 },
                                    { id: 3, weight: 0, reps: 5 },
                                    { id: 4, weight: 0, reps: 5 },
                                    { id: 5, weight: 0, reps: 5 }
                                ]
                            },
                            {
                                id: 2,
                                name: "BARBELL BENT-OVER ROW",
                                sets: [
                                    { id: 1, weight: 0, reps: 5 },
                                    { id: 2, weight: 0, reps: 5 },
                                    { id: 3, weight: 0, reps: 5 },
                                    { id: 4, weight: 0, reps: 5 },
                                    { id: 5, weight: 0, reps: 5 }
                                ]
                            },
                            {
                                id: 3,
                                name: "DUMBBELL INCLINE BENCH PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 5 },
                                    { id: 2, weight: 0, reps: 5 },
                                    { id: 3, weight: 0, reps: 5 },
                                    { id: 4, weight: 0, reps: 5 },
                                    { id: 5, weight: 0, reps: 5 }
                                ]
                            },
                            {
                                id: 4,
                                name: "DUMBBELL SIDE LATERAL RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 5 },
                                    { id: 2, weight: 0, reps: 5 },
                                    { id: 3, weight: 0, reps: 5 },
                                    { id: 4, weight: 0, reps: 5 },
                                    { id: 5, weight: 0, reps: 5 }
                                ]
                            },
                            {
                                id: 5,
                                name: "DUMBBELL TRICEPS EXTENSION",
                                sets: [
                                    { id: 1, weight: 0, reps: 5 },
                                    { id: 2, weight: 0, reps: 5 },
                                    { id: 3, weight: 0, reps: 5 },
                                    { id: 4, weight: 0, reps: 5 },
                                    { id: 5, weight: 0, reps: 5 }
                                ]
                            },
                            {
                                id: 6,
                                name: "DUMBBELL HAMMER CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 5 },
                                    { id: 2, weight: 0, reps: 5 },
                                    { id: 3, weight: 0, reps: 5 },
                                    { id: 4, weight: 0, reps: 5 },
                                    { id: 5, weight: 0, reps: 5 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 3",
                        weekday: "Fr",
                        exercises: [
                            {
                                id: 1,
                                name: "DUMBBELL LUNGE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 2,
                                name: "DIPS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 3,
                                name: "CHIN-UP",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "KETTLEBELL PUSH PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "SEATED CALF RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 6,
                                name: "PLATE TWIST",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    }
                ]
            },
            {
                title: "Intermediate plan",
                subtitle: "4 day workout",
                workouts: [
                    {
                        name: "Day 1: UPPER BODY",
                        weekday: "Mo",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL BENCH PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 2,
                                name: "BARBELL BENT-OVER ROW",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 3,
                                name: "DUMBBELL SHOULDER PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "DUMBBELL CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "ROPE TRICEPS PUSH-DOWN",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 2: LOWER BODY",
                        weekday: "Tu",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL FRONT SQUAT",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 2,
                                name: "BARBELL DEADLIFT",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 3,
                                name: "DUMBBELL LUNGE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "SEATED LEG CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "STANDING CALF RAISES",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 3: UPPER BODY",
                        weekday: "Th",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL INCLINE BENCH PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 2,
                                name: "LAT PULL-DOWN",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 3,
                                name: "BARBELL MILITARY PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "FRONT DUMBBELL RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "BENCH DIPS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 4: LOWER BODY",
                        weekday: "Fr",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL SQUAT",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 2,
                                name: "STIFF-LEGGED BARBELL DEADLIFT",
                                sets: [
                                    { id: 1, weight: 0, reps: 8 },
                                    { id: 2, weight: 0, reps: 8 },
                                    { id: 3, weight: 0, reps: 8 },
                                    { id: 4, weight: 0, reps: 8 }
                                ]
                            },
                            {
                                id: 3,
                                name: "SINGLE-LEG LEG PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "SEATED LEG CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "SEATED CALF RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    }
                ]
            },
            {
                title: "Advanced plan",
                subtitle: "5 day workout",
                workouts: [
                    {
                        name: "Day 1: CHEST",
                        weekday: "Mo",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL BENCH PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 2,
                                name: "INCLINE DUMBBELL PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 3,
                                name: "DECLINE DUMBBELL PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "DUMBBELL FLYES",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "CABLE CROSSOVER",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 6,
                                name: "BARBELL PULLOVER",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 7,
                                name: "WEIGHTED CRUNCH",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 8,
                                name: "FLAT-BENCH LYING LEG RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 9,
                                name: "RUSSIAN TWIST",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 2: BACK",
                        weekday: "Tu",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL DEADLIFT",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 2,
                                name: "WEIGHTED PULL-UP",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 3,
                                name: "REVERSE-GRIP BENT-OVER BARBELL ROW",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "ONE-ARM DUMBBELL ROW",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "LAT PULL-DOWN",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 6,
                                name: "DUMBBELL SHRUG",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 3: SHOULDERS",
                        weekday: "Th",
                        exercises: [
                            {
                                id: 1,
                                name: "DUMBBELL SHOULDER PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 2,
                                name: "ARNOLD DUMBBELL PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 3,
                                name: "DUMBBELL SIDE LATERAL RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "FRONT DUMBBELL RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "UPRIGHT BARBELL ROW",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 6,
                                name: "WEIGHTED CRUNCH",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 7,
                                name: "FLAT-BENCH LYING LEG RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 8,
                                name: "RUSSIAN TWIST",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 4: LEGS",
                        weekday: "Fr",
                        exercises: [
                            {
                                id: 1,
                                name: "BARBELL SQUAT",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 2,
                                name: "LEG PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 3,
                                name: "BARBELL LUNGE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "LEG EXTENSION",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "SEATED LEG CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 6,
                                name: "DONKEY CALF RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    },
                    {
                        name: "Day 5: ARMS",
                        weekday: "Sa",
                        exercises: [
                            {
                                id: 1,
                                name: "CLOSE-GRIP BARBELL BENCH PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 2,
                                name: "TRICEPS PUSHDOWN - V-BAR ATTACHMENT",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 3,
                                name: "LYING TRICEPS PRESS",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 4,
                                name: "LAT PULL-DOWN - V-BAR ATTACHMENT",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 5,
                                name: "BARBELL CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 6,
                                name: "DUMBBELL ALTERNATING BICEPS CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 7,
                                name: "PREACHER CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 8,
                                name: "REVERSE BARBELL CURL",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 9,
                                name: "WEIGHTED CRUNCH",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 10,
                                name: "FLAT-BENCH LYING LEG RAISE",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            },
                            {
                                id: 11,
                                name: "RUSSIAN TWIST",
                                sets: [
                                    { id: 1, weight: 0, reps: 12 },
                                    { id: 2, weight: 0, reps: 12 },
                                    { id: 3, weight: 0, reps: 12 }
                                ]
                            }
                        ],
                        time: 0
                    }
                ]
            }
        ];
    }
};

module.exports = WorkoutModel;