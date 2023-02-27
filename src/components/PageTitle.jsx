import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const PageTitle = ({ title }) => {
  return <Helmet title={`${title} - Sandbox Wisata`} />;
};

export default PageTitle;

PageTitle.propTypes = {
  title: PropTypes.string,
};
