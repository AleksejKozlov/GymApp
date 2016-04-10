/* Libraries */
var _ = require("underscore");
var React = require("react");

/* Actions */
var ExercisePageActions = require("../../../actions/ExercisePageActions");

/* Module */
var SetList = React.createClass({
    /* ReactJS methods */
    render: function () {
        var self = this,
            sets = this.props.sets,
            setsLength = sets.length;

        var setItems = sets.map(function (set, i) {
            var index = i + 1,
                id = set.id,
                deleteButtonIconClass = setsLength !== 1 ? " flaticon-delete" : "",
                toggleIconClass = set.isCollapsed ? " flaticon-plus" : " flaticon-minus",
                animationWrapperClass = set.isCollapsed ? " is-collapsed" : "";

            var collapsedInfoClass = set.isCollapsed && set.reps ? "" : " is-hidden";

            return (
                <li key={index} className={animationWrapperClass}>
                    <div className="set-item-header">
                        <span className="btn-container left" onClick={self._toggle.bind(null, id)}>
                            <i className={"btn" + toggleIconClass}></i>
                        </span>

                        <span className="set-item-number">Set #{index}</span>

                        <span className={"set-item-collapsed-info" + collapsedInfoClass}>
                            <span className="value">{set.reps}</span>
                            <span className="label">reps</span>

                            {set.weight ? 
                            <span>
                                <i className="separator flaticon-cross"></i>
                                <span className="value">{set.weight}</span>
                                <span className="label">kg</span>
                            </span>
                            : ""
                            }
                            
                        </span>

                        <span className="btn-container right" onClick={self._delete.bind(null, id)}>
                            <i className={"btn" + deleteButtonIconClass}></i>
                        </span>
                    </div>
                    <div className={"set-item-wrapper" + animationWrapperClass}>
                        <div className="set-item-container">
                            <div className="set-item-row">
                                <input className="set-item-input input-focus" type="tel" 
                                       placeholder="..." 
                                       value={set.reps} 
                                       onChange={self._update.bind(null, id, "reps")}
                                       maxLength="2" />
                                <label className="set-item-label">reps</label>
                            </div>

                            <span className="set-item-input-separator"><i className="flaticon-cross"></i></span>

                            <div className="set-item-row">
                                <input className="set-item-input input-focus" type="tel" 
                                       placeholder="..." 
                                       value={set.weight} 
                                       onChange={self._update.bind(null, id, "weight")} 
                                       maxLength="4" />
                                <label className="set-item-label">kg</label>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div>
                <ul className="exercise-set-list">{setItems}</ul>
            </div>
        );
    },

    /* Event handlers */
    _toggle: function (id) {
        ExercisePageActions.toggleSet(id);
    },
    _delete: function (id) {
        ExercisePageActions.deleteSet(id);
    },
    _update: function (id, property, event) {
        ExercisePageActions.updateSet(id, property, event.target.value);
    }
});

module.exports = SetList;