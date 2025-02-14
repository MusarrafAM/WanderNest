const Footer = () => {
  return (
    <footer className="w-full text-center pt-10 text-sm text-gray-500">
      © {new Date().getFullYear()}{" "}
      <a
        href="https://musarraf.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 duration-200"
      >
        Musarraf
      </a>
      . All rights reserved.
    </footer>
  );
};

export default Footer;
