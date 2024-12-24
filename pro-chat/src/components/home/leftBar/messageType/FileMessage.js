/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { ImageList, ImageListItem } from '@mui/material'
import LightGallery from 'lightgallery/react';
// scss File
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';
import 'lightgallery/scss/lg-thumbnail.scss';
import 'lightgallery/scss/lg-autoplay.scss';
import 'lightgallery/scss/lg-fullscreen.scss';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';

export const FileMessage = ({ messages }) => {
    var messageArray = messages.split('-')
    return (
        <LightGallery plugins={[lgZoom, lgVideo, lgThumbnail, lgAutoplay, lgFullscreen ]} mode="lg-fade">
            {messageArray.map((message, index) => (
                <a
                data-lg-size="1406-1390"
                className="gallery-item"
                data-src={message}
                data-sub-html="<h4>Photo by - Mohamed</h4>"
                >
                    <img
                        src={message.includes("mp4") ? "img.jpg" : message}
                        alt="image_new"
                        loading="lazy"
                    />
                </a>
            ))}
        </LightGallery>

    )
}
