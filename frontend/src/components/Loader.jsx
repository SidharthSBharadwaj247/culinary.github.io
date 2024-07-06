import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loader = ({primaryColor,secondaryColor,height,width}) => {
  return (
    <Oval
        height={height}
        width={width}
        color={primaryColor}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={secondaryColor}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
  )
}

export default Loader
