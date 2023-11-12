import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import axios from 'axios';

const URL="http://localhost:5000/";

export default function Section() {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
 
  const handleClick = (e) => {
    e.preventDefault();
    if(image) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', image);
      axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(({data}) => {
        const d = data.prediction.split('_').join(' ').toUpperCase();
        setValue(d);
        setImage("");
        setUploading(false);
      }).catch((err) => {
        setValue("Oops! Some Error Occured");
        setImage("");
        setUploading(false);
      })       
    }
  } 
  return (
    <div className='Section'>
      <Box className='ActionBox'>

        <Typography variant="h5" component="h4" sx={{ marginBottom: 3, marginTop: 3 }} color="primary">
          Upload The Image For Classification
        </Typography>

        {
          !uploading ? (<>
            <CloudUploadIcon sx={{ fontSize: '100px', color: 'rgba(0,0,0,0.3)', marginBottom: 3, marginTop: 3 }}/>
            <input type="file" name="file" onChange={(e) => setImage(e.target.files[0])} />
          </>
          ) : (
            <CircularProgress />
          )
        }
        
        <Button variant="contained" className="UploadButton" sx={{ marginBottom: 3, marginTop: 3 }} disabled={uploading}
          onClick={(e) => handleClick(e)}
        >
          Upload
        </Button>
        {
          value ?
            (<Box className='ResultBox' sx={{ marginBottom: 3, marginTop: 3 }}>
              <Typography sx={{ border: "primary" }} variant="h5" color="primary" m={0.5}>{value}</Typography >
              <CancelIcon className='Cancel' onClick={() => {setValue("")}}/>
            </Box>) : (<></>)
        }
      </Box>
    </div>
  )
}