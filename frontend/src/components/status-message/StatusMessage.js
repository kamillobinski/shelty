import React from "react";
import {
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
} from "../../utils/icons/Icons";
import "./statusmessage.css";

class StatusMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldShow: false, type: "", message: "" };
  }

  componentDidMount() {
    this.setState({ shouldShow: false });
  }

  async componentDidUpdate() {
    // Show message when:
    // - current state is false
    // - parent prop is true
    if (this.state.shouldShow === false) {
      if (this.props.shouldShow !== this.state.shouldShow) {
        this.showMessageComponent(this.props);
      }
    }
    // Hide message when:
    // - current state is true
    // - parent prop is false
    else if (this.state.shouldShow === true) {
      if (this.props.shouldShow !== this.state.shouldShow) {
        this.hideMessageComponent(this.props.shouldShow);
      }
    }
  }

  showMessageComponent(props) {
    // Success message
    if (props.type === "success") {
      this.setState({
        shouldShow: props.shouldShow,
        type: "success",
        message: props.message,
      });
    }
    // Error message
    else if (props.type === "error") {
      this.setState({
        shouldShow: props.shouldShow,
        type: "error",
        message: props.message,
      });
    }
    // Warning message
    else if (props.type === "warning") {
      this.setState({
        shouldShow: props.shouldShow,
        type: "warning",
        message: props.message,
      });
    }
    // Info message
    else if (props.type === "info") {
      this.setState({
        shouldShow: props.shouldShow,
        type: "info",
        message: props.message,
      });
    }
    // Default message
    else {
      this.setState({
        shouldShow: props.shouldShow,
        type: "error",
        message: props.message,
      });
    }
  }

  hideMessageComponent(shouldShow) {
    this.setState({ shouldShow: shouldShow });
  }

  renderMessage() {
    if (this.state.shouldShow) {
      if (this.state.type === "success") {
        return (
          <div className="sm-success">
            <div className="sm-success-inn">
              <div className="sm-success-inn-ico">
                <SuccessIcon height="25" />
              </div>
              <div className="sm-success-inn-title">Success</div>
              <div className="sm-success-inn-desc">{this.state.message}</div>
            </div>
          </div>
        );
      } else if (this.state.type === "error") {
        return (
          <div className="sm-error">
            <div className="sm-error-inn">
              <div className="sm-error-inn-ico">
                <ErrorIcon height="25" />
              </div>
              <div className="sm-error-inn-title">Error</div>
              <div className="sm-error-inn-desc">{this.state.message}</div>
            </div>
          </div>
        );
      } else if (this.state.type === "warning") {
        return (
          <div className="sm-warning">
            <div className="sm-warning-inn">
              <div className="sm-warning-inn-ico">
                <WarningIcon height="25" />
              </div>
              <div className="sm-warning-inn-title">Warning</div>
              <div className="sm-warning-inn-desc">{this.state.message}</div>
            </div>
          </div>
        );
      } else if (this.state.type === "info") {
        return (
          <div className="sm-info">
            <div className="sm-info-inn">
              <div className="sm-info-inn-ico">
                <InfoIcon height="25" />
              </div>
              <div className="sm-info-inn-title">Info</div>
              <div className="sm-info-inn-desc">{this.state.message}</div>
            </div>
          </div>
        );
      }
      return <div></div>;
    } else {
      return <div></div>;
    }
  }

  render() {
    return this.renderMessage();
  }
}

export default StatusMessage;
