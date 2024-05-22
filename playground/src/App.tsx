import React, { useState } from 'react';
import axios from 'axios';

import Editor from "../../dist";

function App() {
  const [editorValue, setEditorValue] = useState("// some comment");
  const [endpoint, setEndpoint] = useState("http://localhost:8081/upload");
  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value || "");
  };

  const handleSubmit = async () => {
    const blob = new Blob([editorValue], { type: 'text/x-python' });
    const file = new File([blob], "script.py", { type: "text/x-python" });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="50vh"
          defaultLanguage="python"
          language="python"
          defaultValue="// some comment"
          theme="vs-dark"
          onChange={handleEditorChange}
        />
      </div>
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          placeholder="Enter API endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          style={{ width: "80%", marginRight: "10px" }}
        />
        <button onClick={handleSubmit} style={{ padding: "5px 10px" }}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
