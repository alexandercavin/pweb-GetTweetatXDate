import "./App.css";
import { useState } from "react";

function App() {
  function setApalah(data) {
    if (data["token"] == "" || typeof data["token"] == "undefined") {
      setJwtToken("You are not Authorized!");
    } else {
      setJwtToken(data["token"]);
    }

    console.log(jwtToken);
  }
 
  const [jwtToken, setJwtToken] = useState("");
  const [allTweet, setAllTweet] = useState([]);

  const [dateChoosen, setDateChoosen] = useState("");

  const handleChangeDate = (event) => {
    setDateChoosen(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setDataBody({
      ...dataBody, // copy the current properties of "json"
      username: event.target.value, // update the "name" property
    });
  };

  const handleChangePassword = (event) => {
    setDataBody({
      ...dataBody,
      password: event.target.value,
    });
  };

  const [dataBody, setDataBody] = useState({
    username: "",
    password: "",
  });

  const retrieveToken = () => {
    //console.log(dataBody)
    var getToken = fetch("http://localhost:8080/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    })
      .then((response) => response.json())
      .then((data) => setApalah(data));
  };

  const retrieveTweets = () => {
    const getTweet = fetch(
      `http://localhost:8080/getTweetJWT?inputDate=${dateChoosen}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setAllTweet(data));

    console.log(allTweet);
  };

  return (
    <div className="App">
      <div class="container text-center ">
        <div class="row">
          <div class="col border border-primary">
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input
                id="usernameinput"
                type="text"
                name="username"
                onChange={handleChangeUsername}
                class="form-control border border-dark"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                id="passwordinput"
                type="password"
                name="password"
                onChange={handleChangePassword}
                class="form-control border border-dark"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <br />
            </div>
            <button
              type="button"
              class="btn btn-primary"
              onClick={retrieveToken}
            >
              Retrieve Token
            </button>
            <br />
          </div>
          <div class="col"></div>
        </div>

        <div class="row">
          <div class="col border border-primary">
            <br />
            <h3>
              <span class="badge bg-success">JWT Token: </span>
            </h3>
            {jwtToken == "You are not Authorized!" && (
              <h4>
                <span class="badge bg-danger">{jwtToken}</span>
              </h4>
            )}

            {jwtToken != "You are not Authorized!" && (
              <span class="badge bg-success">{jwtToken}</span>
            )}
            <br />
          </div>
          <div class="col"></div>
        </div>

        <div class="row">
          <div class="col border border-primary">
            <br />
            <input
              type="date"
              name="tweetDate"
              onChange={handleChangeDate}
              class="form-control border border-dark"
            />
            <br />
            <button
              type="button"
              class="btn btn-primary"
              onClick={retrieveTweets}
            >
              Retrieve tweets
            </button>
            <br />
            <br />
            <div>
              <ul class="align-items-start">
                {allTweet.map((item) => {
                  return (
                    <ul class="align-items-start">
                      <li class="align-items-start">
                        Username: {item.username} <br />
                        Content: {item.content} <br />
                        Timestamp: {item.timestamp} <br />
                      </li>
                      <br />
                    </ul>
                  );
                })}
              </ul>
            </div>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
