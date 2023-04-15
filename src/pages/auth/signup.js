import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

import { useAuth } from "../../../context/AuthUserContext";
import firebase from "../../../context/Firebase";

import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Home.module.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { createUserWithEmailAndPassword } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    let dataHold = await fetchStuff(emailRef.current.value);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    let idSelect = dataHold[1];
    let items = dataHold[0];

    items["isRegister"] = true;

    console.log(items);

    await db
      .collection("test")
      .doc(idSelect)
      .update(items)
      .then(() => {
        console.log("Items added!");
      });

    try {
      setError("");
      setLoading(true);

      createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((authUser) => {
          // let dataHold = await fetchStuff(emailRef.current.value);
          // console.log(dataHold);
          router.push("../patient/" + idSelect);
          // fetchStuff(emailRef.current.value).then((currentID) => {
          //   console.log(currentID);
          //   router.push("../patient/" + currentID);
          // });
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  //
  //-------------loads patients
  //
  const db = firebase.firestore();

  // const [info, setInfo] = useState([]);
  // const [ids, setID] = useState([]);

  // const [idSelect, setIDSelect] = useState([]);
  // const [items, setItems] = useState({})

  async function fetchStuff(email) {
    let data = {};
    let id = 0;
    console.log(email);
    const cityRef = await db
      .collection("test")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          // console.log(element.data());

          if (element.data().email == email) {
            // data = element.data();
            console.log(element.id);
            data = element.data();
            id = element.id;
          }
        });
      });

    return [data, id];
  }

  //------------sets email from previous page

  if (typeof window !== "undefined") {
    useEffect(() => {
      // Client-side-only code

      if (router.query.email == undefined) {
        router.push("/");
      }
      setEmail(router.query.email);
    }, []);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled={true}
                  type="email"
                  value={email}
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button className="w-100 mt-3" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
