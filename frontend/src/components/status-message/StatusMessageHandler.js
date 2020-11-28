import React from "react";
import StatusMessage from "./StatusMessage";

class StatusMessageHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowStatusMessage: false,
      statusMessageType: "",
      statusMessage: "",
    };
    this.handleStatusMessage = this.handleStatusMessage.bind(this);
  }

  componentDidUpdate() {
    if (this.state.shouldShowStatusMessage === false) {
      if (
        this.props.shouldShowStatusMessage !==
        this.state.shouldShowStatusMessage
      ) {
        this.handleStatusMessage(this.props);
      }
    }
  }

  handleStatusMessage(props) {
    this.setState(
      {
        shouldShowStatusMessage: true,
        statusMessageType: props.statusMessageType,
        statusMessage: props.statusMessage,
      },
      () => {
        setTimeout(
          function () {
            this.setState({ shouldShowStatusMessage: false });
          }.bind(this),
          2000
        );
      }
    );
    props.updateStateOnClose();
  }

  render() {
    return (
      <>
        <StatusMessage
          shouldShow={this.state.shouldShowStatusMessage}
          type={this.state.statusMessageType}
          message={this.state.statusMessage}
        />
      </>
    );
  }
}

export default StatusMessageHandler;
