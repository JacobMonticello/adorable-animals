import { Detail, List, environment } from "@raycast/api";;
import { useState } from "react";
import axios from "axios";

export default function Command() {
  const [imageUrl, setImageUrl] = useState("null");
  const hasImage = imageUrl !== "null";

  if (!hasImage) {
    getImageUrl(setImageUrl)
  }

  return (
    hasImage 
      ? <Detail markdown={`![Adorable Animal](${imageUrl})`} />
      : <Detail markdown={`## Loading Cuteness.....`} />
  )
}

const getImageUrl = async (setImageUrl: (imageUrl: string) => void) => {
  try {
    const response = await axios.get('https://api.adorableanimals.dev/randdom');

    const imageLink = response.data.imageUrl;

    setImageUrl(imageLink);
  } catch (error) {
    const errorMsg = 'There was a problem acquiring cuteness:' + error;

    console.error(errorMsg);
    setImageUrl(errorMsg);
  }
};