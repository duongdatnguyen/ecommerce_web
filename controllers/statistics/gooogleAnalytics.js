module.exports.getDataFromGoogle= async function  getDataFromGoogle()
{
    const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY
// .replace(new RegExp('\\\\n'), '\n');
//
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

const { google } = require('googleapis');
const analytics = google.analytics('v3');
const viewId = process.env.VIEW_ID;



const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, scopes);


// const jwt = new google.auth.JWT({
//   email: clientEmail,
//   key: privateKey,
//   scopes,
// });

// const result = await analytics.data.ga.get({
//     auth: jwt,
//     ids: `ga:${viewId}`,
//     'start-date': startDate,
//     'end-date': endDate,
//     metrics: metric,
//   });

//   const res = {};
//   res[metric] = {
//     value: parseInt(result.data.totalsForAllResults[metric], 10),
//     start: startDate,
//     end: endDate,
//   };

console.log(jwt);
  const response = await jwt.authorize();
  console.log("Go to get result");
  const result = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': `ga:${viewId}`,
    'start-date': '30daysAgo',
    'end-date': 'today',
    'metrics': 'ga:pageviews'
  })

  console.log(result);
  return result;


}