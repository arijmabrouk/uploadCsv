import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { jsonToCSV } from "react-papaparse";
import classes from "./UploadCsv.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Container } from "reactstrap";

const UploadCsvFile = ({ open }) => {
  const [file, setFile] = useState({});
  let formData = new FormData();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "text/csv": [],
      },
    });

  const files = acceptedFiles.map((file) => (
    <li style={{ listStyle: "none", marginTop: "1rem" }} key={file.path}>
      {file.path}
    </li>
  ));
  useEffect(() => {
    setFile(files);
    console.log(files);
    formData.append("form", jsonToCSV(file));
    for (const pair of formData.entries()) {
      console.log(pair[1]);
    }
    axios.post("http://localhost:5000/api/v1/backlogs/", file);
  }, [acceptedFiles]);

  return (
    <Container
      style={{
        textAlign: "center",
        padding: "20px",
        border: "3px black dashed",
        width: "80%",
        cursor: "pointer",

        marginBlock: "10rem",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div>
        <div>
          <FontAwesomeIcon style={{ height: "2.5rem" }} icon={faUpload} />
          <p className={classes.selectFile}>
            Glisser-déposer votre fichier ici, ou bien cliquez pour sélectionner
            des fichiers
          </p>
        </div>

        {/* <button className={classes.btn} onClick={open}>
          Click to select files
        </button> */}
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </Container>
  );
};

export default UploadCsvFile;
