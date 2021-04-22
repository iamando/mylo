const request = require("request");

const dotenv = require("dotenv");
dotenv.config();

export const getHome = (req, res) => {
  return res.render("home.ejs");
};

export const getFacebookUserProfile = (req, res) => {
  return res.render("profile.ejs");
};

export const setUpFacebookUserProfile = (req, res) => {
  // Send the HTTP request to the Messenger Platform
  let data = {
    get_started: {
      payload: "GET_STARTED",
    },
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "web_url",
            title: "Linkedin",
            url: "https://www.linkedin.com/in/iamando/",
            webview_height_ratio: "full",
          },
          {
            type: "web_url",
            title: "Website",
            url: "https://mynameismylo.herokuapp.com/",
            webview_height_ratio: "full",
          },
        ],
      },
    ],
    whitelisted_domains: ["https://mynameismylo.herokuapp.com/"],
  };

  request(
    {
      uri: "https://graph.facebook.com/v6.0/me/messenger_profile",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: data,
    },
    (err, res, body) => {
      if (!err) {
        return res.status(200).json({
          message: "Setup done",
        });
      } else {
        return res.status(500).json({
          message: "Error from server",
        });
      }
    }
  );

  return res.status(200).json({
    message: "OK",
  });
};
