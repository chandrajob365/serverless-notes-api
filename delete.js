import { success, failure } from "./libs/repsonse-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };
  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
