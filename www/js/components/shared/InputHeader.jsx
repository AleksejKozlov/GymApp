var React = require("react");

var hashHistory = require("react-router").hashHistory;

var InputHeader = React.createClass({
    // reactjs methods
    getInitialState: function() {
        return {
            name: this.props.name
        };
    },
    render: function () {
        return (
            <header>
                <button className="btn-link left" onClick={this.props.backAction}>
                    <i className="flaticon-left"></i>
                </button>

                <div className="input-container">
                    { this.props.readonly ?
                    <input type="text" className="name"
                           value={this.state.name}
                           readOnly />
                    :
                    <input type="text" className="name"
                           placeholder={this.props.placeholder}
                           value={this.state.name}
                           onChange={this._onNameChanged} />
                        }
                </div>
                
                { this.props.isSaveBtnVisible ?
                <button className="btn-link right" onClick={this.props.saveAction}>
                    <i className="flaticon-check"></i>
                </button>
                :
                <button className="btn-link right" disabled>
                    <i className="flaticon-check"></i>
                </button>
                }
            </header>
        );
    },
    // Private methods
    _onNameChanged: function (event) {
        var name = event.target.value;
        this.setState({ name: name });
        this.props.setName(name);
    }
});

module.exports = InputHeader;