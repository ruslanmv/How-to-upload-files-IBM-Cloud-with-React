import React from 'react';
import AWS from 'ibm-cos-sdk';
import './App.css';

const App = () => {
  const uploadFile = async (file) => {
    const config = {
      endpoint: process.env.REACT_APP_COS_ENDPOINT,
      apiKeyId: process.env.REACT_APP_COS_API_KEY,
      ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
      serviceInstanceId: process.env.REACT_APP_COS_INSTANCE_ID,
    };

    const cos = new AWS.S3(config);

    const params = {
      Bucket: process.env.REACT_APP_COS_BUCKET_NAME,
      Key: file.name,
      Body: file,
    };

    try {
      await cos.upload(params).promise();
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };

  return (
    <div className="App">
      <h1>File Uploader</h1>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default App;