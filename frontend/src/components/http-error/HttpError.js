import React from "react";
import errorSvg from "../../utils/svg/error.svg";
import "./httperror.css";

const MESSAGE403 =
  "Due to limitations and security, we can not let you in here.";
const MESSAGE404 =
  "The page you are looking for might have been removed or you assembled the link incorrectly.";

class HttpError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  componentDidMount() {
    switch (this.props.location.pathname) {
      case "/403": {
        this.setState({
          message: MESSAGE403,
        });
        break;
      }
      case "/404": {
        this.setState({
          message: MESSAGE404,
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return (
      <div className="he noselect">
        <div className="he-con">
          <img src={errorSvg} className="he-con-img noselect" alt="error" />
          <p className="he-con-mes">
            <span className="he-con-mes-head">Oops...</span>
            <span className="he-con-mes-text">{this.state.message}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default HttpError;
