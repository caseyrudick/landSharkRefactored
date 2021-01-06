import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "us-east-2_75YqLvMCl",
  ClientId: "2j6ne1d5384a382eh4755719be"
}

export default new CognitoUserPool(poolData);