import React, { useState, useEffect } from 'react';
import './privacy.css';

const Privacy = () => {
  return (
    <div className="privacy" tabIndex="0">
      <div className="page-title1">Privacy Policy</div>
      <div className="text-div">When you use our services, you consent to the privacy policy outlined below:</div>

      <div className="page-title">Information Collection</div>
      <div className="text-div">When you login using your Google account, some personal information is collected and stored. This information is limited to what is provided by Google and associated with the account used to sign in. This information includes but is not limited to the Tokens or IDs associated with your specific session or account.</div>
      <div className="text-div">On Annotate page, you need to provide additional information such as behavior tags and their corresponding time intervals after uploading a video. This information will also be collected and stored into the database.</div>
      
      <div className="page-title">Information Usage</div>
      <div className="text-div">Information collected by AutoPlanet is used to train our machine learning model and ensure that users have the proper access controls when using the website. AutoPlanet also reserves the right to perform machine learning analytics on videos uploaded by users on Predict page.</div>
      
      <div className="page-title">Information Sharing</div>
      <div className="text-div">AutoPlanet does not share any collected information with any third parties outside of those used to host the website and database.</div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Privacy;
