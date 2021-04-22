const request = require("request");

const dotenv = require("dotenv");
dotenv.config();

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
          const username = `${body.first_name} ${body.last_name}`;
          resolve(username);
        } else {
          reject("Unable to send message:" + err);
        }
      }
    );
  });
};

export const sendResponseWelcomeNewUser = (username, sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response_first = {
        text: `Hello ${username}, my name is Mylo`,
      };
      let response_second = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Mylo",
                subtitle: "A smart messenger assistant 🤖",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619112275/mylo/mylo_ldco7w.png",
                buttons: [
                  {
                    type: "postback",
                    title: "Menu",
                    payload: "MENU",
                  },
                ],
              },
            ],
          },
        },
      };
      // Send message
      await sendMessage(sender_psid, response_first);
      await sendMessage(sender_psid, response_second);

      resolve("Done");
    } catch (error) {
      reject(error);
    }
  });
};

const sendMessage = (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v6.0/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};
