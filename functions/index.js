const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
    .document('purchases/{id}')
      .onCreate(event => {

    const purchaseId = event.params.id;

    const db = admin.firestore()

return db.collection('purchases').doc(purchaseId)
    .get()
    .then(doc => {

    const user = doc.data()

    const msg = {
      to: 'sebastian.gonzalez@sante',
      from: 'hello@angularfirebase.com',
      subject:  'New Follower',
      // text: `Hey ${toName}. You have a new follower!!! `,
      // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

      // custom templates
      templateId: 'd3582063-1e66-4fee-a5e9-ec62ff4ad4e9',
      substitutionWrappers: ['{{', '}}'],
      substitutions: {
        name: user.displayName
        // and other custom properties here
      }
    };

return sgMail.send(msg)
})
.then(() => console.log('email sent!') )
.catch(err => console.log(err) )


});
