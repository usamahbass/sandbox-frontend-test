import { Stack, Text } from "@chakra-ui/react";
import { useFullPath } from "@app/hooks/useFullPath";
import FacebookShareIcon from "@app/icons/Facebook";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TwitterShareButton,
  TwitterIcon,
  TelegramIcon,
} from "react-share";
import PropTypes from "prop-types";

const Share = ({ shareTitle, title }) => {
  const shareURL = useFullPath();

  const facebookShare = {
    url: shareURL,
    quote: shareTitle,
    blankTarget: true,
  };

  const whatsappShare = {
    url: shareURL,
    title: shareTitle,
    separator: ":: ",
    blankTarget: true,
  };

  const telegramShare = {
    url: shareURL,
    title: shareTitle,
    blankTarget: true,
  };

  const twitterShare = {
    url: shareURL,
    title: shareTitle,
    blankTarget: true,
  };

  return (
    <Stack
      spacing={3}
      justify={["center", "center", "center", "inherit"]}
      align={["center", "center", "center", "inherit"]}
    >
      <Text fontSize="18px" fontWeight={600} color="grey.500">
        Share {title} ini
      </Text>
      <Stack direction="row" spacing={[5, 5, 5, 3]}>
        <FacebookShareButton {...facebookShare}>
          <FacebookShareIcon />
        </FacebookShareButton>

        <WhatsappShareButton {...whatsappShare}>
          <WhatsappIcon round size={40} />
        </WhatsappShareButton>

        <TelegramShareButton {...telegramShare}>
          <TelegramIcon round size={40} />
        </TelegramShareButton>

        <TwitterShareButton {...twitterShare}>
          <TwitterIcon round size={40} />
        </TwitterShareButton>
      </Stack>
    </Stack>
  );
};

export default Share;

Share.propTypes = {
  title: PropTypes.string,
  shareTitle: PropTypes.string,
};
