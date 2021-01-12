{
  "wellInfo": {
    "planRecords": [
      [
        {
          "value": "",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "Measured Depth",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "Inclination",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "Azimuth",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "TVD",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "Northing",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "Easting",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "VS",
          "readOnly": true,
          "width": "7rem"
        },
        {
          "value": "DLS",
          "readOnly": true,
          "width": "7rem"
        }
      ],
      [
        {
          "value": "1",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        },
        {
          "value": "0",
          "readOnly": true
        }
      ],
      [
        {
          "readOnly": "true",
          "value": "2"
        },
        {
          "value": "3250.00"
        },
        {
          "value": "0.00"
        },
        {
          "value": "0.00"
        },
        {
          "value": "3250.00"
        },
        {
          "value": "0.00"
        },
        {
          "value": "0.00"
        },
        {
          "value": "0.00"
        },
        {
          "value": "0.00"
        }
      ],
      [
        {
          "readOnly": "true",
          "value": "3"
        },
        {
          "value": "3300.00"
        },
        {
          "value": "1.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3300.00"
        },
        {
          "value": "-0.33"
        },
        {
          "value": "0.28"
        },
        {
          "value": "-0.32"
        },
        {
          "value": "2.00"
        }
      ],
      [
        {
          "readOnly": "true",
          "value": "4"
        },
        {
          "value": "3400.00"
        },
        {
          "value": "3.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3399.93"
        },
        {
          "value": "-2.99"
        },
        {
          "value": "2.55"
        },
        {
          "value": "-2.89"
        },
        {
          "value": "2.00"
        }
      ],
      [
        {
          "readOnly": true,
          "value": "5"
        },
        {
          "value": "3500.00"
        },
        {
          "value": "5.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3499.68"
        },
        {
          "value": "-8.29"
        },
        {
          "value": "7.08"
        },
        {
          "value": "-8.02"
        },
        {
          "value": "2.00"
        }
      ],
      [
        {
          "readOnly": true,
          "value": "6"
        },
        {
          "value": "3549.81"
        },
        {
          "value": "6.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3549.26"
        },
        {
          "value": "-11.92"
        },
        {
          "value": "10.18"
        },
        {
          "value": "-11.53"
        },
        {
          "value": "2.00"
        }
      ],
      [
        {
          "readOnly": true,
          "value": "7"
        },
        {
          "value": "3600.00"
        },
        {
          "value": "6.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3599.18"
        },
        {
          "value": "-15.91"
        },
        {
          "value": "13.58"
        },
        {
          "value": "-15.38"
        },
        {
          "value": "0.00"
        }
      ],
      [
        {
          "readOnly": true,
          "value": "8"
        },
        {
          "value": "3700.00"
        },
        {
          "value": "6.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3698.63"
        },
        {
          "value": "-23.85"
        },
        {
          "value": "20.37"
        },
        {
          "value": "-23.06"
        },
        {
          "value": "0.00"
        }
      ],
      [
        {
          "readOnly": true,
          "value": "9"
        },
        {
          "value": "3800.00"
        },
        {
          "value": "6.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3798.08"
        },
        {
          "value": "-31.80"
        },
        {
          "value": "27.15"
        },
        {
          "value": "-30.75"
        },
        {
          "value": "0.00"
        }
      ],
      [
        {
          "readOnly": true,
          "value": "10"
        },
        {
          "value": "3900.00"
        },
        {
          "value": "6.00"
        },
        {
          "value": "139.51"
        },
        {
          "value": "3897.54"
        },
        {
          "value": "-39.74"
        },
        {
          "value": "33.93"
        },
        {
          "value": "-38.43"
        },
        {
          "value": "0.00"
        }
      ]
    ],
    "operator": "EOG",
    "rig": "H&P 642",
    "well": "Pepper 55",
    "county": "Eddy",
    "uSstate": "NM",
    "vsDirection": "359.58",
  }
}


const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
  

exports.handler = (event, context, callback) => {
  const records = [...event.wellInfo.planRecords]
  console.log("why not")
  console.log(event.wellInfo.planRecords)
  let writeCycles = Math.ceil(records.length/25)
  let putItemsArray = []
  for (let idx = 0; idx <= writeCycles; idx++) {
    let startSlice = (idx * 25) - 25;
    let endSlice = (idx + 1) * 25;
    let currentIntervalofRecords = records.slice(startSlice, endSlice)
    let item = {"Well_Id": {"S": wellId}, 
    "Operator": {"S": operator}, 
    "Rig": {"S": rig}, 
    "Well": {"S": well},
    "County": {"S": county}, 
    "State": {"S": usState}, 
    "MD": {"S": planItem[1].value}, 
    "INC": {"S": planItem[2].value},
    "AZM": {"S": planItem[3].value},
    "TVD": {"S": planItem[4].value},
    "Northing": {"S": planItem[5].value},
    "Easting": {"S": planItem[6].value},
    "VS": {"S": planItem[7].value},
    "DLS": {"S": planItem[8].value}

  }
    currentIntervalofRecords.forEach((planItem, currentIntervalIdx) => {
        //console.log(currentIntervalofRecords)
        console.log(`made it to line: ${idx}, currentIntervalIdx: ${currentIntervalIdx}, currentValMD: ${planItem[1].value}`)
      if (idx === 0) {
        null
      }
      putItemsArray.push({
        "PutRequest": {
          "Item": {
            "Well_Id": {
                S: event.wellInfo.operator + "_" + event.wellInfo.rig + "_" + event.wellInfo.well
            },
            "Operator": {
              "S": event.wellInfo.operator
            },
            "County": {
              "S": event.wellInfo.county
            }, 
            "Rig": {
              "S": event.wellInfo.rig
            },
            "State": {
              "S": event.wellInfo.usState
            }, 
            "MD": {
              "S": planItem[1].value
            }, 
            "INC": {
              "S": planItem[2].value
            }, 
            "AZM": {
              "S": planItem[3].value 
            },
            "TVD": {
              "S": planItem[4].value
            },
            "Northing": {
              "S": planItem[5].value
            },
            "Easting": {
              "S": planItem[6].value
            },
            "VS": {
              "S": planItem[7].value
            },
            "DLS": {
              "S": planItem[8].value
            }
          }
        }
      })
    })
    dynamodb.batchWriteItem({RequestItems: {"Plans": putItemsArray}}, function(err, data){
      if (err) console.log(err);
      else {
          console.log("successful")
          callback(null, data)
      }
    })
  }
}
  
