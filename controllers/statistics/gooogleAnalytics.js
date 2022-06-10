module.exports.getDataFromGoogle= async function  getDataFromGoogle(req,res)
{
    const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY
// .replace(new RegExp('\\\\n'), '\n');
//
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

const { google } = require('googleapis');
const analytics = google.analytics('v3');
// const viewId = process.env.VIEW_ID;
const{ BetaAnalyticsDataClient } =require("@google-analytics/data");


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
const viewId="268322270";

  const response = await jwt.authorize();
  //console.log("Go to get result");
  const result = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': `ga:${viewId}`,
    'start-date': '30daysAgo',
    'end-date': 'today',
    'dimensions': 'ga:searchKeyword',
    //'metrics': 'ga:searchSessions'
    'metrics': 'ga:searchResultViews'
  })



   //console.log(result.data.rows);
  // console.log('Report result:',result.data.rows[0]);

const listTrending=result.data.rows.sort((a,b)=>(a[1]*1>=b[1]*1) ?-1 :1).map(row =>row[0]);
  // result.data.rows.forEach(row => {
  //   console.log(row[0], row[1]);
  // });

   return res.status(200).json({"listTrending":listTrending});


}