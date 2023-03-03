import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Home.module.css";

import { useAuth } from "../../../context/AuthUserContext";
import firebase from "../../../context/Firebase";

import { useRouter } from "next/router";

export default function login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // console.log(signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value))

      signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((authUser) => {
          const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));

          fetchStuff(emailRef.current.value).then((currentID) => {
            console.log(currentID)
            router.push("../patient/" + currentID);
          })
          // wait(1000).then(() => console.log(currentID));                    
          // router.push("../patient/" + fetchStuff(emailRef.current.value));
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  //
  //loads patients
  //
  const db = firebase.firestore();

  // const [info, setInfo] = useState([]);
  // const [ids, setID] = useState([]);

  // const [idSelect, setIDSelect] = useState([]);
  // const [items, setItems] = useState({})

  async function fetchStuff(email) {
    let data = 0;
    let id = 0;
    console.log(email)
    const cityRef = await db
      .collection("test")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          console.log(element.data())
          if (element.data().email == email) {
            // data = element.data();
            console.log(element.id)
            id = element.id;
          }
        });
      });

    return id;
  }

  // function toDateTime(secs) {
  //   var t = new Date(1970, 0, 1); // Epoch
  //   t.setSeconds(secs);
  //   return t;
  // }

  // async function fetchData() {
  //   selectedID = window.location.pathname.substring(
  //     window.location.pathname.lastIndexOf("/") + 1
  //   );

  //   let datas = await fetchStuff();

  //   let data = datas[0];

  //   let itemValue = [];
  //   let dateStorage = [];
  //   let mSpace = "-";
  //   if (toDateTime(data.date.seconds).getMonth() + 1 < 10) mSpace = "-0";

  //   data.date =
  //     toDateTime(data.date.seconds).getFullYear() +
  //     mSpace +
  //     (toDateTime(data.date.seconds).getMonth() + 1) +
  //     "-" +
  //     toDateTime(data.date.seconds).getDate();

  //   console.log(data.date);

  //   // setIDSelect(selectedID);
  //   // setItems(data);
  // }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button className="w-100 mt-3" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div style={{ color: "black" }} className="w-100 text-center mt-2">
          Don't have an account?{" "}
          <Button variant="link" href="http://localhost:3000/auth/signup">
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
}
