/* Libraries */
var React = require("react");

/* Actions */
var WorkoutPageActions = require("../../../actions/WorkoutPageActions");

/* Module */
var WeekdayList = React.createClass({
    /* ReactJS methods */
    render: function () {
        var weekNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        var self = this,
            selectedWeekday = this.props.selectedWeekday;

        var items = weekNames.map(function (weekday, i) {
            var weekdayClass = selectedWeekday === weekday ? "is-selected" : "";
            
            return (
                <li key={i}>
                    <span className={"weekday-item " + weekdayClass} onClick={self._setWorkoutWeekday.bind(null, weekday)}>
                        {weekday}
                    </span>
                </li>
            );
        });

        return (
            <ul className="weekday-list">
                {items}
            </ul>
        );
    },

    /* Event handlers */
    _setWorkoutWeekday: function (weekday) {
        WorkoutPageActions.setWorkoutWeekday(weekday);
    }
});

module.exports = WeekdayList;