import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Form } from 'react-bootstrap';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from 'react-toastify';

function ImageUploader({ setUrl }) {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)

    const storage = getStorage();

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (!file)
            return;
        const storageRef = ref(storage, `images/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setUploading(true)
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("upload is" + progress + "% done");
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload paused");
                        break;
                    case "running":
                        console.log("Upload running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
                setUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
                    setUrl(downloadedURL);
                });
                setUploading(false)
                toast.success('Image Uploaded!')
            }
        );
    }, [file])


    return (
        <>
            <Form.Label>Movie Image</Form.Label>
            <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control mb-3"
            />
            {uploading && (
                <ProgressBar
                    animated
                    now={progress}
                    label={`${progress}%`}
                    className="mb-3"
                />
            )}
        </>
    );
}

export default ImageUploader;
