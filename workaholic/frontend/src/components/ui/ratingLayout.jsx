import React from "react";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

// export default function RatingLayout(props) {
//     const color='#EA6A12'
//     const star=()=>{
//         if(!props.rating)
//         {
//             props.rating=0;
//         }
//         const list=[];
//         for(let i=0;i<Math.floor(props.rating);i++)
//         {
//           list.push(<FaStar className={`${props.style}`} fill={color}/>);
//         }
//         if((props.rating)-Math.floor(props.rating)>=0.5)
//         {
//           list.push(<FaStarHalfStroke className={`${props.style}`} fill={color} />);
//         }
//         for(let i=0;i<(5-list.length);i++)
//         {
//             list.push(<FaRegStar className={`${props.style}`} fill={color}/>)
//         }
//         return list;

//       }
export default function RatingLayout(props) {
  const color = "#EA6A12";
  const star = () => {
    const rating = props.rating || 0; // Create a new variable for the rating
    const list = [];

    // Full stars
    for (let i = 0; i < Math.floor(rating); i++) {
      list.push(<FaStar key={`full-${i}`} className={`${props.style}`} fill={color} />);
    }

    // Half star if needed
    if (rating - Math.floor(rating) >= 0.5) {
      list.push(<FaStarHalfStroke key="half" className={`${props.style}`} fill={color} />);
    }

    // Empty stars
    while (list.length < 5) {
      list.push(<FaRegStar key={`empty-${list.length}`} className={props.style} fill={color} />);
    }
    return list;
  };
  return (
    <div className={`h-full flex items-center `}>
      <div className="flex h-full  mr-1 items-center">{star()}</div>
      {props.no ? <p></p> : <div className="text-[#EA6A12] ">({props.rating})</div>}
    </div>
  );
}
