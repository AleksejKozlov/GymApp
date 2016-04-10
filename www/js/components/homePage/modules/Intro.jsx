/* Libraries */
var React = require("react");

/* Module */
var Intro = React.createClass({
    /* ReactJS methods */
    render: function () {
        return (
            <div className={"intro-container " + this.props.cssClass}>
                <h1>
                   <span>Hello Buddy! Things look <em>alright.</em></span>
                </h1>

                <h2>
                    Are you ready to rock?
                </h2>
            </div>
        );
    }
});

module.exports = Intro;