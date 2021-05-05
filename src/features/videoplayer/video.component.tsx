import React from 'react'
import { Video } from "../../types"
import youtubeUtils from "../../utils/youtube"

interface Props {
    video: Video
}

const Videoplayer = ({ video }: Props) => {
    return (
        <div>
            <iframe 
            width="1280" 
            height="720" 
            src={youtubeUtils.getEmbedLink(video)} 
            title="asd"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            >
            </iframe>
        </div>
    )
}

export default Videoplayer
