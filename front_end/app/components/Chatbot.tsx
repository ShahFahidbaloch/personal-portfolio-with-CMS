import { v4 as uuidv4 } from "uuid";

// Server-side helper for Dialogflow integration
// Lazily loads dialogflow only if credentials are provided in the environment
export const sendMessageToDialogflow = async (message: string): Promise<string> => {
  const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
  const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const projectId = process.env.DIALOGFLOW_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) {
    return "Dialogflow credentials are not configured on the server.";
  }

  try {
    const dialogflow = (await import("dialogflow")).default;
    const sessionClient = new dialogflow.SessionsClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    const sessionId = uuidv4();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en-US",
        },
      },
    };

    const [response] = await sessionClient.detectIntent(request);
    const result = response.queryResult;
    return result?.fulfillmentText || "No response received from Dialogflow.";
  } catch (error) {
    console.error("Error communicating with Dialogflow:", error);
    return "Sorry, I could not process your request at the moment.";
  }
};
