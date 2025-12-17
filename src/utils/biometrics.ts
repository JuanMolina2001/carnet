import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,

});
export async function imageComparison(image1Base64: Base64URLString, image2Base64: Base64URLString) {
    let r
    const responseSchema = z.object({
        samePerson: z.boolean().describe("responde true o false si es la misma persona la que esta en las 2 imagenes"),
    });
    try {
        console.log('foto enviada a gemini')
        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: responseSchema,
            },
            contents: createUserContent([
                {
                    text: `Devuelve SOLO un JSON válido que cumpla exactamente con este formato:
{
  "samePerson": boolean
}

Responde si la misma persona aparece en ambas imágenes. No añadas ningún campo extra ni texto.`
                },
                {
                    inlineData: {
                        mimeType: "image/png",
                        data: image1Base64,
                    },
                }, {
                    inlineData: {
                        mimeType: "image/png",
                        data: image2Base64,
                    },
                }
            ]),
        });
        r = JSON.parse(`${response.text}`)
    } catch (error) {
        r = { samePerson: false }
    }
    console.log('respuesta de gemini', r)
    return responseSchema.parse(r)
}
