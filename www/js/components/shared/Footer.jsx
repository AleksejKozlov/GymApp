var React = require("react");

var Footer = React.createClass({
    render: function () {
        return (
            <footer>
                <button className="btn footer-btn" onClick={this.props.callback}>
                    {this.props.text}
                </button>
            </footer>
        );
    }
});

module.exports = Footer;