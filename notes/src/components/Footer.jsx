import React from "react";

let dt = new Date();
let y = dt.getFullYear();
function Footer(){
  return(
    <footer>
      <p>copyright ⓒ {y}</p>
    </footer>
  );
}

export default Footer;
