import React, { Component } from "react";

export class Chat extends Component {
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "6332666736062dbcf759a693f24fc450",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return (
      <div style={chatContainerStyle}>
        <h1 style={chatTitleStyle}>This is our chatbot</h1>
        <h1>Ask your questions</h1>

        <div style={{ backgroundColor: "white" }}>
          <a href="\">Back to Home</a>
        </div>
      </div>
    );
  }
}

const chatContainerStyle = {
  backgroundColor: "#8ba1c4", // Remove background color
  padding: "30px",
  borderRadius: "100px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  animation: "fadeIn 1s",
  textAlign: "center",
};

const chatTitleStyle = {
  fontSize: "55px",
  color: "#0074E4",
  padding: "20px",
};

const styles = `
  body {
    background-image: url('src/assets/images/chatbot/chatbot.jpg');
    background-size: cover;
    background-attachment: fixed;
    margin: 0;
    padding: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Chat;
