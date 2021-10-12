const admin = require("firebase-admin")

const serviceAccount = require("./colors-1-269a2-firebase-adminsdk-tvqvw-b44fa3118a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://colors-1-269a2.firebaseio.com"
});

// function getAccessToken() {
//   return new Promise(function (resolve, reject) {
//     const key = require("./colors-1-269a2-firebase-adminsdk-tvqvw-b44fa3118a.json");
//     const jwtClient = new google.auth.JWT(
//       key.client_email,
//       null,
//       key.private_key,
//       SCOPES,
//       null
//     );
//     jwtClient.authorize(function (err, tokens) {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(tokens.access_token);
//     });
//   });
// }

async function sendMessage(registrationToken) {
  const message = {
    data: {
      test: `${Date.now()}`
    },
    token: registrationToken
  };

  // return fetch("https://fcm.googleapis.com/v1/projects/colors-1-269a2/messages:send", {
  //   method: "POST",
  //   headers: {
  //     Authorization: "Bearer " + accessToken,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(message)
  // })

  return admin.messaging().send(message)
}

function main() {
  const deviceToken = process.argv[2]
  sendMessage(deviceToken).then((response) => {
    // Response is a message ID string.
    console.log("Successfully sent message:", response);
  })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}


main()