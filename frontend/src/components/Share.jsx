import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import CancelIcon from '@mui/icons-material/Cancel';

const Share = ({ url,setShowShare }) => {
  return (
    <div className="flex justify-center items-center absolute top-0 z-[100] left-0 bg-black/[0.6] h-full w-full">
      <div className="flex flex-col justify-between gap-4 items-center bg-white shadow-btn_shadow rounded-lg px-6 py-4">
        <div className="flex justify-end w-full"><span onClick={()=>setShowShare(false)}><CancelIcon/></span></div>
        <div className="flex gap-4 items-center">
          <FacebookShareButton url={url}>
            <FacebookIcon />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon />
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default Share;
