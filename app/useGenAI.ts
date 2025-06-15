import { useCallback, useState } from "react";
import axios from "axios";

type Input = {
  text: string;
  callback: (t: string) => void;
};

export const useGenAI = () => {
  const [titleEnhanced, setTitleEnhanced] = useState("");
  const [descEnhanced, setDescEnhanced] = useState("");

  const enhanceTitle = useCallback(
    (p: Input) => {
      axios
        .post("/api/enhance-product", {
          text: p.text,
          enhancer: "product_name",
        })
        .then(({ data }) => {
          if (!titleEnhanced) setTitleEnhanced(p.text);
          p.callback(data.data);
        });
    },
    [titleEnhanced],
  );

  const enhanceDesc = useCallback(
    (p: Input) => {
      axios
        .post("/api/enhance-product", {
          text: p.text,
          enhancer: "product_desc",
        })
        .then(({ data }) => {
          if (!descEnhanced) setDescEnhanced(p.text);
          p.callback(data.data);
        });
    },
    [descEnhanced],
  );

  return {
    enhanceTitle,
    enhanceDesc,
    titleEnhanced,
    setTitleEnhanced,
    descEnhanced,
    setDescEnhanced,
  };
};
