import "./Greeting.scss";

import greeting from "../../assets/images/girl-and-pet.png";

function Greeting() {
  return (
    <div className="greeting">
      <img src={greeting} alt="girl-and-pet" />
    </div>
  );
}

export default Greeting;
