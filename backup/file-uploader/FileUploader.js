import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import AWS from 'ibm-cos-sdk';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    const config = {
      endpoint: process.env.REACT_APP_COS_ENDPOINT,
      apiKeyId: process.env.REACT_APP_COS_API_KEY_ID,
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

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {file ? (
              <p>Selected file: {file.name}</p>
            ) : (
              <p>Drag and drop a file here, or click to select a file</p>
            )}
          </div>
        )}
      </Dropzone>
      {file && <button onClick={handleUpload}>Upload</button>}
    </div>
  );
};

export default FileUploader;