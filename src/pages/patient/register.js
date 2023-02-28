import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "../../../../styles/Home.module.css";

import { useAuth } from "../../../../context/AuthUserContext";
import firebase from "../../../../context/Firebase";

// import { useCollection } from "react-firebase-hooks/firebase";

import LoggedIn from "../../../LoggedIn";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton(type, name, route) {
  const [isLoading, setLoading] = useState({ name: false });

  useEffect(() => {
    if (isLoading.name) {
      simulateNetworkRequest().then(() => {
        setLoading({ name: false });
      });
    }
  }, [isLoading.name]);

  const handleClick = () => setLoading({ name: true });

  return (
    <a
      class={"btn btn-" + type}
      variant={type}
      href={"/" + route}
      disabled={isLoading.name}
      onClick={!isLoading.name ? handleClick : null}
    >
      {isLoading.name ? "Loading…" : name}
    </a>
  );
}

const article = ({ list }) => {
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { signOut } = useAuth();

  const [items, setItems] = useState({
    jasper: {
      name: "",
      wo: "",
      pn: "",
      sn: "",
      date: "",
      desc: "",
    },
  });

  const db = firebase.firestore();

  const [info, setInfo] = useState([]);
  const [ids, setID] = useState([]);
  const [idSelect, setIDSelect] = useState([]);
  const selectedID = 0;

  //
  //
  //functions for sending item
  //
  //
  async function toSend() {
    let tempDate = items.date;
    tempDate = new Date(tempDate.replace("-", ","));

    let returnData = Object.assign({}, items, { date: tempDate });

    console.log("this is the id: " + selectedID);

    // event.preventDefault;

    await db
      .collection("Test")
      .add(returnData)
      .then(() => {
        console.log("Items added!");
        // router.reload("WarehouseList")
        window.location = "WarehouseList";
        // router.push("WarehouseList")
      });
  }

  async function handleSubmit(event) {
    // const router = useRouter()

    console.log("enter handle submit");
    console.log(items);
    var check = false;

    if (items["name"] == "") {
      console.log("error!!!!! name");
      check = true;
    }
    if (items["wo"] == "") {
      console.log("error!!!!! work order");
      check = true;
    }
    if (items["pn"] == "") {
      console.log("error!!!!! product number");
      check = true;
    }
    if (items["sn"] == "") {
      console.log("error!!!!! serial number");
      check = true;
    }
    if (items["date"] == "") {
      console.log("error!!!!! date");
      check = true;
    }
    if (items["desc"] == "") {
      console.log("error!!!!! description");
      check = true;
    }

    if (check) {
      console.log("entered");
      handleShow();
    } else {
      console.log("try submit");
      console.log(items);
      toSend();
    }

    event.preventDefault();
  }
  const nameChangeHandler = (event) => {
    setItems(Object.assign({}, items, { name: event.target.value }));
  };
  const woChangeHandler = (event) => {
    setItems(Object.assign({}, items, { wo: event.target.value }));
  };
  const pnChangeHandler = (event) => {
    setItems(Object.assign({}, items, { pn: event.target.value }));
  };
  const snChangeHandler = (event) => {
    setItems(Object.assign({}, items, { sn: event.target.value }));
  };
  const dateChangeHandler = (event) => {
    setItems(Object.assign({}, items, { date: event.target.value }));
    console.log(items.date);
  };
  const descChangeHandler = (event) => {
    setItems(Object.assign({}, items, { desc: event.target.value }));
  };

  return (
    <LoggedIn>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Missing field</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Item</h2>

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["name"]}
                      onChange={nameChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="wo">
                    <Form.Label>Work Order</Form.Label>
                    <Form.Control
                      type="number"
                      value={items["wo"]}
                      onChange={woChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="pn">
                    <Form.Label>Product Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={items["pn"]}
                      onChange={pnChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="sn">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={items["sn"]}
                      onChange={snChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Form.Group as={Col} controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={items["date"]}
                    onChange={dateChangeHandler}
                  />
                </Form.Group>
                <Form.Label></Form.Label>
                <Form.Group className="mb-3" controlId="desc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={items["desc"]}
                    onChange={descChangeHandler}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Changes
                </Button>
                <Button
                  className="m-3"
                  variant="secondary"
                  href={"../WarehouseList"}
                >
                  Go Back
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
};

export default article;
