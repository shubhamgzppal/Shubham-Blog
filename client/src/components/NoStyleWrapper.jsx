import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const NoStyleWrapper = ({ children }) => {
  const contentStyle = {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    lineHeight: 1.6,
    fontSize: 16,
  }

  return (
    <div style={{ margin: 'auto',  borderRadius: 12, background: '#fff', boxShadow: '0 10px 30px rgba(2,6,23,0.06)'}}>
        {/* Navbar and footer are rendered outside the reset so they keep site styles */}
        <Navbar />
            <div style={{...contentStyle}}>
            {children}
            </div>
        <Footer />
    </div>
  )
}

export default NoStyleWrapper
