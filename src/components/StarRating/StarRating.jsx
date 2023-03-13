import React, { useState } from "react"
import { FaStar } from "react-icons/fa"

const StarRating = ({ rating, fireFinalActions, readOnly }) => {

    const [hover, setHover] = useState(null)

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <FaStar
                            className={readOnly ? 'star' : 'star pointerCursor'}
                            color={ratingValue <= (hover || rating) ? "#FFD700" : "#ccc"}
                            size={readOnly ? 20 : 30}
                            onMouseEnter={() => !readOnly && setHover(ratingValue)}
                            onMouseLeave={() => !readOnly && setHover(null)}
                            onClick={() => !readOnly && fireFinalActions(ratingValue)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;