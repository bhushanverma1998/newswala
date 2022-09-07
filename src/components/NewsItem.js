import React from 'react'
import './css/NewsItem.css'

export default function NewsItem(props)  {

        let { title, description, imgUrl, newsUrl, author, date, source } = props;

        return (
            <div className='my-3'>
                <div className="card">
                    <span className="badge-info position-absolute top-0 translate-middle p-2 bg-info badge rounded-pill">
                        <span>Source - {source}</span>
                    </span>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text my-2"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toUTCString()}  </small></p>
                        <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
}
