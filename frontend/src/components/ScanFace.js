import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function ScanFace() {
  const videoRef = useRef();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadModelsAndStart = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Failed to load students", err);
      }

      startVideo();
    };

    loadModelsAndStart();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        console.warn("videoRef is null");
      }
    }).catch((err) => {
      console.error("Error accessing webcam", err);
    });
  };

  const handleScan = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
  
    if (!detection) return alert("No face detected!");
  
    const queryDescriptor = detection.descriptor;
  
    try {
      const res = await axios.post("http://localhost:5000/api/attendance/mark", {
        descriptor: Array.from(queryDescriptor),
      });
  
      const { message, alreadyMarked } = res.data;
  
      if (alreadyMarked) {
        alert(`⚠️ ${message}`);
      } else {
        alert(`✅ ${message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Face not recognized or server error");
    }
  };
  
  

  return (
    <div className="container">
      <h2>Scan to Mark Attendance</h2>
      <video ref={videoRef} autoPlay muted width="400" height="300" />
      <button className="button" onClick={handleScan}>
        Mark Attendance
      </button>
    </div>
  );
}
