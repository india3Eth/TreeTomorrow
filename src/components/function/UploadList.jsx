import { useState, useEffect } from 'react';
import { useClient } from '../../contexts/ClientContext';


const UploadList = () => {
  const [uploads, setUploads] = useState([]);
  const { client, initialized } = useClient();
  const [loading, setLoading] = useState(true);


  const fetchUploads = async () => {
    if (!client || !initialized) return;
    console.log(client)
    try {
      const result = await client.capability.upload.list({ cursor: '', size: 25 });
      console.log(result.results)
      setUploads(result.results);
    } catch (error) {
      console.error('Error listing uploads:', error.message);
      alert(`Failed to list uploads: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUploads();
  }, [client, initialized]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {uploads.map((upload, index) => (
          <li key={upload.root.toString()}>
            {index + 1}. <a href={`https://${upload.root.toString()}.ipfs.w3s.link`} target="_blank" rel="noopener noreferrer">{upload.root.toString()}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadList;
