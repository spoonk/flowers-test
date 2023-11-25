import axios from "axios";
import { Garden } from "../types";

const getGarden = async ({ userId }: { userId: string }) => {
  try {
    const garden = await axios.get<{ garden: Garden }>(
      "http://localhost:8080/garden",
      {
        params: { userId },
      },
    );
    return garden.data.garden;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export { getGarden };
