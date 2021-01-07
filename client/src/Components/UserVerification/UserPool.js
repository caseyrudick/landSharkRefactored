import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "us-east-2_75YqLvMCl",
  ClientId: "2j6ne1d5384a382eh4755719be"
}

export default new CognitoUserPool(poolData);


// const POOL_DATA = {
//   UserPoolId: "us-east-2_yvwiM5ORU",
//   ClientId: "4958acsp36ccmg13tfg44b0jkc"
// };
// const userPool = new CognitoUserPool(POOL_DATA);