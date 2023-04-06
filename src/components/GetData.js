import React, { useEffect, useState } from "react";
import axios from "axios";

function GetData() {
  const [data, setData] = useState([]);

  //    `glink`, `llink`, `pimage`,
  const [pdesc, setPdesc] = useState("");
  const [title, setTitle] = useState("");
  const [glink, setGlink] = useState("");
  const [llink, setLlink] = useState("");
  const [pimage, setPimage] = useState();


  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("/api/getproject").then((data) => {
        setData(data.data);
      });
    }, 1000);
    // loaddata();
    // loadtotal();
    return () => clearInterval(interval);
  }, []);

  const update = (id) => {
    axios.post(`/api/updateproject/${id}`).then((result) => {
      alert(result.data.message);
      console.log(result)
    });
  };
  const createproject = () => {
    axios
      .post("/api/createproject", {
        pdesc: pdesc,
        title: title,
        glink: glink,
        llink: llink,
        pimage: pimage,
      })
      .then((result) => {
        alert(result.data.message);
      });
  };
  const DeleteProject = (sno) => {
    axios.post(`/api/deleteproject/${sno}`).then((result) => {
      alert(result.data.message);
    });
  };

  const handleImage = (input) => {
    // setPimage(URL.createObjectURL(input))
console.log(URL.createObjectURL(input));
      // let file = input.target.files[0];
    
      // let reader = new FileReader();
    
      // reader.readAsText(file);
      // reader.onload = function() {
      //   setPimage(reader.result);
      //   console.log(pimage);
      // };
    
      // reader.onerror = function() {
      //   console.log(reader.error);
      // };


  };
  return (
    <>
      {data.map((val, key) => {
        return (
          <>
            <button onClick={() => update(val.sno)}>{val.title}</button>
            <button>{val.age}</button>
          </>
        );
      })}
      <div className="CreatePost">
        <div className="uploadPost">
          <label>Title: </label><br />
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          /> <br />
          <label>Project Description: </label> <br />
          <textarea
            onChange={(e) => {
              setPdesc(e.target.value);
            }}
          ></textarea><br />
          <label>Github Link</label><br />
          <input type="text" onChange={(e) => setGlink(e.target.value)} /> <br />
          <label>Live Link</label><br />
          <input type="text" onChange={(e) => setLlink(e.target.value)} /> <br />
          <label>Project Image</label><br />
          {/* <input type="text" onChange={(e) => setPimage(e.target.value)} /> <br /> */}
          <input type="file" onChange={(e) => handleImage(e.target.files[0] || null)} required/> <br />

          <button onClick={createproject}>Submit Post</button>
        </div>
      </div>
      {data.map((val, key) => {
        return (
          <>
            <button onClick={() => DeleteProject(val.sno)}>{val.title}</button>
          </>
        );
      })}
       <form action="/uploadProfilePicture" 
      enctype="multipart/form-data" method="POST">
      
        <span>Upload Profile Picture:</span>  
        <input type="file" name="mypic" required/> <br/>
        <input type="submit" value="submit" /> 
    </form>
    </>
  );
}

export default GetData;
