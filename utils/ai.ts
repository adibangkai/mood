import { OpenAI } from "langchain/llms/openai"
import { StructuredOutputParser } from "langchain/output_parsers"
import z from "zod"
import { PromptTemplate } from "langchain/prompts"

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote journal entry."),
    summary: z.string().describe("quick summary of the entire entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
)

const getPrompt = (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  })
}

export const analyze = async (prompt) => {
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" })
  const res = await model.call(prompt)
  console.log(res)
}
