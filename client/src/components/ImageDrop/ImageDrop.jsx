import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './index.module.scss';

const ImageDrop = ({ recipe, setRecipe }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  useEffect(() => {
    if (files.length > 0) {
      setRecipe({ ...recipe, image: files[0].preview });
    }
  }, [files]);

  const image = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: '200px' }} alt='preview' />
      </div>
    </div>
  ));

  return (
    <div className={styles.centered}>
      <div className={styles.dropContainer} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Click or drag and drop image here</p>
      </div>
    </div>
  );
};

export default ImageDrop;
