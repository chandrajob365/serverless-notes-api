import { success, failure } from "./libs/repsonse-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };
  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
