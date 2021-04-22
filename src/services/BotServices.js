const request = require("request");

// Get facebook username
export const getFacebookUsername = (sender_psid) => {
  return new Promise((resolve, reject) => {
    // Send the HTTP request to the Messenger Platform
    let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`;
    request(
      {
        uri: uri,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          // Convert string to json object
          body = JSON.parse(body);
          const username = `${body.last_name} ${body.first_name}`;
          resolve(username);
        } else {
          reject("Unable to send message:" + err);
        }
      }
    );
  });
};
