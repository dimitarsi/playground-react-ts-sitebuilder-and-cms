import React from "react";

export const TextBlock = ({ data }: { data: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};
