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
const{ BetaAnalyticsDataClient } =require("@google-analytics/data");


//const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, scopes);


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

// console.log(jwt);
//   const response = await jwt.authorize();
//   console.log("Go to get result");
//   const result = await google.analytics('v3').data.ga.get({
//     'auth': jwt,
//     'ids': `ga:${viewId}`,
//     'start-date': '30daysAgo',
//     'end-date': 'today',
//     'metrics': 'ga:pageviews'
//   })



  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const analyticsDataClient = new BetaAnalyticsDataClient({
    auth,
  });

  const [response] = await analyticsDataClient.runReport({
    property: `properties/318114428`,
    dateRanges: [
      {
        startDate: '30daysAgo',
        endDate: 'today',
      },
    ],
    // // dimensions: [
    // //   {
    // //     name: 'city',
    // //   },
    // // ],
    metrics: [
      {
        name: 'screenPageViewsPerSession',
      },
    ]
  });

  console.log('Report result:',response);
  response.rows.forEach(row => {
    console.log(row.dimensionValues[0], row.metricValues[0]);
  });

//   console.log(result);
//   return result;


}