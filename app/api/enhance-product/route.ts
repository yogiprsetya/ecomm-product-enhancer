import { NextRequest } from "next/server";
import { generateResponse } from "~/config/gen-ai";
import { z } from "zod";
import { bodyParse } from "../body-parse";
import { handleInvalidRequest } from "../handle-error-res";
import { handleSuccessResponse } from "../handle-success-res";

const bodySchema = z.object({
  text: z.string().min(1),
  enhancer: z.enum(["product_name", "product_desc"]),
});

const direction = {
  product_name:
    "optimlakan nama produk ini untuk visibilitas dan hasil pencarian yang lebih baik.",
  product_desc:
    "optimlakan deskripsi produk ini untuk visibilitas dan hasil pencarian yang lebih baik.",
};

export async function POST(request: NextRequest) {
  const body = await bodyParse(request);
  const { data, success, error } = bodySchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  const prompt = direction[data.enhancer];
  const smart =
    "Pastikan tidak ada return apapun selain hasil dari optimasi Anda (char), hindari pengulangan kata dan keyword spamming";
  const format = `hanya 1 baris dengan panjang maksimal ${
    data.enhancer === "product_name" ? 90 : 550
  } karakter.`;

  const response = await generateResponse(
    `${prompt} "${data.text}". ${smart}. Return ${format}.`,
  );

  return handleSuccessResponse(response);
}
