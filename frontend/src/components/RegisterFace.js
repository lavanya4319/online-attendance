import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function RegisterFace() {
  const videoRef = useRef();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

      startVideo();
    };

    loadModels();
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

  const handleRegister = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) return alert("No face detected!");

    const descriptor = Array.from(detection.descriptor);

    await axios.post("http://localhost:5000/api/students/register", {
      studentId,
      name,
      descriptor,
    });

    alert("Student registered successfully!");
  };

  return (
    <div className="container">
      <h2>Register Student</h2>
      <input
        className="input"
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Student ID"
      />
      <input
        className="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
      />
      <video ref={videoRef} autoPlay muted width="400" height="300" />
      <button className="button" onClick={handleRegister}>
        Register Face
      </button>
    </div>
  );
}
