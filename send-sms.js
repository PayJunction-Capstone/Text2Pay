// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
function createRequest(){
  const accountSid = 'AC0be21a36ad616556b63e4fb2de58b74f';
  const authToken = '7aed3e119c852ce96f3276611ea3bcbf';
  const client = require('twilio')(accountSid, authToken);

  console.log('yeet');

  client.messages
    .create({
      body: 'Payment request',
      from: '+13213237705',
      to: '+19498702089'
    })
    .then(message => console.log(message.sid));
}
