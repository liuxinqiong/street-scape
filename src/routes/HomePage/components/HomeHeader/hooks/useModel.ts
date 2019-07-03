import { useState, useEffect } from 'react';
import { getModels, uploadModel } from 'api/road';
import { getFileFormat, validateUploadModelFiles } from '../HomeHeader.logic';
import { message } from 'antd';

export default function useModel(setVisible: any) {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    getModels().then(({ data }) => {
      setModels(data);
    });
  }, []);

  function handleUpload() {
    const formData = new FormData();
    const fileNames: string[] = [];
    fileList.forEach(file => {
      fileNames.push(file.name);
      const format = getFileFormat(file.name);
      if (format === '.json') {
        formData.append('json', file);
      } else if (format === '.npy') {
        formData.append('model', file);
      }
    });
    if (!validateUploadModelFiles(fileNames)) {
      message.error('只能选择一个同名的 json 文件和 npy 文件');
      return;
    }
    setUploading(true);
    uploadModel(formData)
      .then(({ data }) => {
        setUploading(false);
        if (data.code === 200) {
          message.success('上传成功');
          setVisible(false);
          setFileList([]);
          getModels().then(({ data }) => {
            setModels(data);
          });
        } else if (data.code === 400) {
          message.error('该文件已存在');
        }
      })
      .catch(e => {
        setUploading(false);
        message.error('上传失败');
      });
  }

  const uploadProps = {
    onRemove: (file: any) => {
      setFileList((fileList: any[]) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file: any) => {
      setFileList((fileList: any[]) => [...fileList, file]);
      return false;
    },
    fileList
  };

  return { uploadProps, handleUpload, fileList, uploading, models };
}
