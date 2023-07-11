// import React from "react";
// import Card from "../Card/Card";

// const CardList = ({ data }) => {
//   return (
//     <div>
//       {data.map((item, index) => (
//         <div className="hover:scale-105 duration-500">
//           <Card key={index} {...item} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CardList;
import React from "react";
import Card from "../Card/Card";

const CardList = ({ data, uID }) => {
  const filteredData = data.filter((item) => item.uploadedBy === uID);

  return (
    <div>
      {filteredData.map((item, index) => (
        <div className="hover:scale-105 duration-500" key={index}>
          <Card {...item} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
