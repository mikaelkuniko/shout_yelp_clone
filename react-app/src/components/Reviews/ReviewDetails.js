import React from 'react'

function ReviewDetails(review) {

    if(!review) return null
    return (
        <div>
            <h4>User id: {review.user} --------- {review.stars}</h4>
            <p>Review: {review.review}</p>
            <div>
                {review.useful}
                {review.cool}
                {review.funny}
            </div>
            {review.images.length ? (
                <div style={{"display":"flex", "alignItems":"center"}}>
                    <img style={{"height":"100px", "width":"100px"}} src={review.images[0].url} alt={'pic'}/>
                </div>
            ) : (null)}
        </div>
    )
}

export default ReviewDetails
