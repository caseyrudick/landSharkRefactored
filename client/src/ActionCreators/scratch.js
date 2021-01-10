// import React from "react"
// import 
// const AWS = require("aws-sdk")
// const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })

// exports.handler = (event, context, callback) => {
//     const params = {
//         Item: {
//             "Well_Name": {
//                 S: event.well
//             },
//             "RIG": {
//                 N: event.rig
//             }

//         },
//         TableName: "test"
//     }
//     dynamodb.putItem(params, function(err, data) {
//         if (err) {
//             console.log(err)
//             callback(err)
//         } else {
//             console.log("hello")
//             callback(null, "hey I'm lambda")
//         }
//     })
// };


// const AWS = require("aws-sdk")
// const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })

// exports.handler = (event, context, callback) => {
//     const params = {
        // Item: {
        //     "Well_ID": {
        //         S: event.operator
        //     }
        //     "Well_Name": {
        //         S: event.well
        //     },
        //     "Operator": {
        //         S: event.operator
        //     },
        //     "County": {
        //         S: event.county
        //     }, 
        //     "Easting": {
        //         S: event.easting
        //     },
        //     "Northing": {
        //         S: event.northing
        //     },
        //     "Rig": {
        //         S: event.rig
        //     },
        //     "State": {
        //         S: event.usState
        //     }
        // },
//         TableName: "records"
//     }
//     dynamodb.putItem(params, function(err, data) {
//         if (err) {
//             console.log(err)
//             callback(err)
//         } else {
//             console.log("hello")
//             callback(null, data)
//         }
//     })
// };
