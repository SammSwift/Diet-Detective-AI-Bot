import agentWithChatHistory from "../../utils/agent.js";

const getAIResponse = async (req, res) => {
  const { input, restrictions, image } = req.body;

  const result = await agentWithChatHistory.invoke(
    {
      input,
      image_path: image,
      dietary_restrictions: restrictions,
    },
    {
      configurable: {
        sessionId: "foo",
      },
    }
  );
  if (result) {
    res.status(200).json({ response: result["output"] });
  } else {
    res.status(400).json({ msg: "bad request" });
  }
};

export default getAIResponse;
