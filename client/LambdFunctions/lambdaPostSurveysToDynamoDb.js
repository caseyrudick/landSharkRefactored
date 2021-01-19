// const AWS = require("aws-sdk")
// // const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
// AWS.config.update({region: "us-east-2"})
// const docClient = new AWS.DynamoDB.DocumentClient()

// exports.handler = (event, context, callback) => {
    const {operator, rig, well, usState, county, date} = event
    const wellId = operator + "_" + rig + "_" + well
//     const records = [...event.surveys]
//     const writeCycles = Math.ceil(records.length/25)
//     let putItemsArray = []
//     for (let idx = 1; idx <= writeCycles; idx++) {
//          let startSlice = (idx * 25) - 25;
//          let endSlice = idx * 25
//          let currentIntervalOfRecords = records.slice(startSlice, endSlice)
//          currentIntervalOfRecords.forEach((surveyItem, surveyIdx) => {
//              if (surveyIdx === 0) {
//                  return null
//              }
             let item = {
                 "SurveyId": wellId + "_" + String(surveyItem[0].value),
                 "SurveyNumber": surveyItem[0].value,
                 "Operator": operator,
                 "Rig": rig,
                 "Well": well,
                 "County": county,  
                 "State": usState,
                 "Date": date,
                 "MD": surveyItem[1].value, 
                 "INC": surveyItem[2].value,
                 "AZM": surveyItem[3].value,
                 "TVD": surveyItem[4].value,
                 "Northing": surveyItem[5].value,
                 "Easting": surveyItem[6].value,
                 "VS": surveyItem[7].value,
                 "DLS": surveyItem[8].value
             }
//              putItemsArray.push({
//                  "PutRequest": {"Item": item}
//              })
//          })
//     }
    
//     return docClient.batchWrite({RequestItems: {"Surveys": putItemsArray}}, function(err, data) {
//         if (err) {
//             console.log(err)
//             callback(err)
//         } else {
//             console.log("successfully pushed surveys")
//             callback(null, data)
//         }
//     })
// };
const AWS = require("aws-sdk")
// const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
AWS.config.update({region: "us-east-2"})
const docClient = new AWS.DynamoDB.DocumentClient()


  // be sure to rename this file index.js when copying it over to the lambda deployment package folder

  const main = async () => {
    const forLoops = Math.ceil(event.records.length/25)

    // for loop will run however many times we need to run batchWriteItem to persist all records in batches of 25
    // e.g., if we have 300 records, for loop should run 12 times
    // e.g., if we have 311 records, for loop should run 13 times, with the final array having 11 `PutRequest` objects
    for (let i = 1; i <= forLoops; i++) {
      // `batchedRecords` array should only have 25 records
      // these arrays should be unique and be dictated by the index of the for loop - [record # 1..record # 25], [record # 26..record # 50], [record # 51..record # 75], etc.

      const createBatchedRecords = () => {
        let batchedRecords = []
        const copyOfEventRecords = [...event.records]
        // extract 25 records from the `copyOfEventRecords` array

        // i is going to be from 1 to 12 if we have 300 records
        // i is going to be from 1 to 13 if we have 311 records
        const sliceStart = (i * 25) - 25 // 0, 25, 50
        const sliceEnd = (i * 25) // 25, 50, 75
        batchedRecords = copyOfEventRecords.slice(sliceStart, sliceEnd);
        return batchedRecords
      }

      const batchedRecords = createBatchedRecords()

      const formattedRecords = []

      batchedRecords.map((record, mapIndex) => {
        if (i === 1 && mapIndex === 0) {
          // we do not want to persist the header row array
        } else {
          const putRequestObject = {
            PutRequest: {
              let item = {
                "SurveyId": wellId + "_" + String(surveyItem[0].value),
                "SurveyNumber": surveyItem[0].value,
                "Operator": operator,
                "Rig": rig,
                "Well": well,
                "County": county,  
                "State": usState,
                "Date": date,
                "MD": surveyItem[1].value, 
                "INC": surveyItem[2].value,
                "AZM": surveyItem[3].value,
                "TVD": surveyItem[4].value,
                "Northing": surveyItem[5].value,
                "Easting": surveyItem[6].value,
                "VS": surveyItem[7].value,
                "DLS": surveyItem[8].value
              }
            }
          } // `const putRequestObject = {`
          formattedRecords.push(putRequestObject)
        } // `else`
      }) // `event.records.map((record, mapIndex) => {`

      await docClient.batchWriteItem({ RequestItems: { "records": formattedRecords } }, function(err, data) {
        if (err) {
          // console.log(event, err);
        } else {
          // console.log(event, data);
        }
      }).promise(); // https://stackoverflow.com/questions/51033523/how-to-test-await-async-with-dynamodb-on-nodejs
    } // `for (let i = 0; i < forLoops; i++)`
  } // `const main = () => {`

  main()

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ message: "Hello World!" }),
  };
  // ^ must have for POST methods in API Gateway, in addition to enabling CORS to resource in management console
  // https://stackoverflow.com/a/43029002/8379751
  // https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
  return response;
};
