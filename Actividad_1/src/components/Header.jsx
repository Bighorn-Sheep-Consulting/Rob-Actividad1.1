import PropTypes from "prop-types";

const styles = {
  header: {
    textAlign: "center",
    color: "#2A4D69",
    fontSize: "26px",
    fontFamily: "Helvetica, Arial, sans-serif",
    margin: "20px 0",
    fontWeight: "bold",
  },
};

export default function Header({ text }) {
  return <h1 style={styles.header}>{text}</h1>;
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
