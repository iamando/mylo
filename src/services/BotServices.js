const request = require("request");

const dotenv = require("dotenv");
dotenv.config();

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
                subtitle: "A smart messenger assistant 💬",
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

export const sendMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "DEEZER",
                subtitle:
                  "Check new or latest popular music chart now on Deezer",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619167224/mylo/deezer_yxwvdr.png",
                buttons: [
                  {
                    type: "postback",
                    title: "DEEZER",
                    payload: "DEEZER",
                  },
                ],
              },
              {
                title: "YOUTUBE",
                subtitle: "Check new or latest popular video on Youtube",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619165363/mylo/youtube_obpdlc.png",
                buttons: [
                  {
                    type: "postback",
                    title: "YOUTUBE",
                    payload: "YOUTUBE",
                  },
                ],
              },
              {
                title: "GAMES",
                subtitle:
                  "Check new or latest popular games on all games platform",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619165363/mylo/games_vbtu0y.jpg",
                buttons: [
                  {
                    type: "postback",
                    title: "GAMES",
                    payload: "GAMES",
                  },
                ],
              },
              {
                title: "WEATHER",
                subtitle: "Check your local city weather with all forecast",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619165456/mylo/weather_oteplo.jpg",
                buttons: [
                  {
                    type: "postback",
                    title: "WEATHER",
                    payload: "WEATHER",
                  },
                ],
              },
            ],
          },
        },
      };
      // Send message
      await sendMessage(sender_psid, response);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendMusicMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "TRACKS",
                subtitle: "TRACKS: Check all latest tracks on Deezer now",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619167224/mylo/deezer_yxwvdr.png",
                buttons: [
                  {
                    type: "postback",
                    title: "TRACKS",
                    payload: "DEEZER_TRACKS",
                  },
                ],
              },
              {
                title: "ALBUMS",
                subtitle: "ALBUMS: Check all latest albums on Deezer now",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619167224/mylo/deezer_yxwvdr.png",
                buttons: [
                  {
                    type: "postback",
                    title: "ALBUMS",
                    payload: "DEEZER_ALBUMS",
                  },
                ],
              },
              {
                title: "ARTISTS",
                subtitle: "ARTISTS: Check all latest artists on Deezer now",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619167224/mylo/deezer_yxwvdr.png",
                buttons: [
                  {
                    type: "postback",
                    title: "ARTISTS",
                    payload: "DEEZER_ARTISTS",
                  },
                ],
              },
              {
                title: "PLAYLISTS",
                subtitle: "PLAYLISTS: Check all latest playlists on Deezer now",
                image_url:
                  "https://res.cloudinary.com/host8000/image/upload/v1619167224/mylo/deezer_yxwvdr.png",
                buttons: [
                  {
                    type: "postback",
                    title: "PLAYLISTS",
                    payload: "DEEZER_PLAYLISTS",
                  },
                ],
              },
            ],
          },
        },
      };
      // Send message
      await sendMessage(sender_psid, response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDeezerTracks = (sender_psid) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url: "http://api.deezer.com/chart",
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }

      body = JSON.parse(body);
      const tracks = body.tracks.data;
      resolve(tracks);
    });
  });
};

export const getDeezerAlbums = (sender_psid) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url: "http://api.deezer.com/chart",
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }

      body = JSON.parse(body);
      const albums = body.albums.data;
      resolve(albums);
    });
  });
};

export const getDeezerArtists = (sender_psid) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url: "http://api.deezer.com/chart",
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }

      body = JSON.parse(body);
      const artists = body.artists.data;
      resolve(artists);
    });
  });
};

export const getDeezerPlaylists = (sender_psid) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url: "http://api.deezer.com/chart",
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }

      body = JSON.parse(body);
      const playlists = body.playlists.data;
      resolve(playlists);
    });
  });
};

export const sendDeezerTracks = (tracks, sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: tracks.map((track) => ({
              title: track.title,
              subtitle: track.artist.name,
              image_url: track.album.cover_big,
              buttons: [
                {
                  type: "postback",
                  title: "LISTEN PREVIEW",
                  payload: "LISTEN_PREVIEW",
                },
              ],
            })),
          },
        },
      };
      // Send message
      await sendMessage(sender_psid, response);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendDeezerAlbums = (albums, sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: albums.map((album) => ({
              title: album.title,
              subtitle: album.artist.name,
              image_url: album.cover_big,
              buttons: [
                {
                  type: "postback",
                  title: "DOWNLOAD ALBUM",
                  payload: "DOWNLOAD_ALBUM",
                },
              ],
            })),
          },
        },
      };
      // Send message
      await sendMessage(sender_psid, response);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendDeezerArtists = (artists, sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: artists.map((artist) => ({
              title: artist.name,
              subtitle: artist.type,
              image_url: artist.picture_big,
              buttons: [
                {
                  type: "postback",
                  title: "VIEW ARTIST",
                  payload: "VIEW_ARTIST",
                },
              ],
            })),
          },
        },
      };
      // Send message
      await sendMessage(sender_psid, response);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendDeezerPlaylists = (playlists, sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: playlists.map((playlist) => ({
              title: playlist.title,
              subtitle: playlist.user.name,
              image_url: playlist.picture_big,
              buttons: [
                {
                  type: "postback",
                  title: "LISTEN PLAYLIST",
                  payload: "LISTEN_PLAYLIST",
                },
              ],
            })),
          },
        },
      };
      // Send message
      await sendMessage(sender_psid, response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getVideo = (sender_psid) => {};

export const getGames = (sender_psid) => {
  const options = {
    method: "GET",
    url: "https://rawg-video-games-database.p.rapidapi.com/games",
    headers: {
      "x-rapidapi-key": "b4e16946a8msh61d5b4576cc6037p1627b8jsn60c13f8e3678",
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      useQueryString: true,
    },
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};

export const getWeather = (sender_psid) => {};
