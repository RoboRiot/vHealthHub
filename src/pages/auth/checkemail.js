import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../../context/AuthUserContext";
import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Home.module.css";

import firebase from "../../../context/Firebase";

export default function checkEmail() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { createUserWithEmailAndPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();

    let checkEmail = await fetchStuff(emailRef.current.value);

    if (checkEmail[0]) {
      if (checkEmail[1]) {
        router.push({
          pathname: "login",
          query: { email: emailRef.current.value },
        });
      } else {
        console.log(emailRef.current.value);
        // router.push("signup");
        router.push({
          pathname: "signup",
          query: { email: emailRef.current.value },
        });
      }
    } else {
      handleShow();
    }

    // data.forEach((d) => console.log(d));

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match");
    // }

    // try {
    //   setError("");
    //   setLoading(true);
    //   createUserWithEmailAndPassword(
    //     emailRef.current.value,
    //     passwordRef.current.value
    //   )
    //     .then((authUser) => {
    //       // console.log("Success. The user is created in Firebase")
    //       // router.push("/patient/dashboard");
    //       router.push({
    //         path: "/patient/register",
    //         query: { email: emailRef.current.value },
    //       });
    //     })
    //     .catch((error) => {
    //       // An error occurred. Set error message to be displayed to user
    //       setError(error.message);
    //     });
    // } catch {
    //   setError("Failed to create an account");
    // }

    setLoading(false);
  }

  //get patient data

  const db = firebase.firestore();

  async function fetchStuff(email) {
    let check = [false, false];

    const cityRef = await db
      .collection("test")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          console.log(element.data().email);
          if (element.data().email == email) {
            check[0] = true;
            if (element.data().isRegister) {
              check[1] = true;
            }
          }
        });
      });

    return check;
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Error</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>Email does not exist</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Welcome</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button className="w-100 mt-3" type="submit">
                Continue
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
