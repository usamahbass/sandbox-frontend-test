import { Box } from "@chakra-ui/react";
import DomPurify from "isomorphic-dompurify";

const RenderHtml = ({ html }) => {
  const cleanHTML = DomPurify.sanitize(html);

  return (
    <Box
      className="ck-content"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default RenderHtml;
