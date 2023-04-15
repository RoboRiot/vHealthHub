import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

import { useAuth } from "../../../context/AuthUserContext";
import firebase from "../../../context/Firebase";

// import { useCollection } from "react-firebase-hooks/firebase";

import LoggedIn from "../../../context/loggedin";

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

const register = ({ list }) => {
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { signOut } = useAuth();
  const [items, setItems] = useState({});
  // const [items, setItems] = useState({
  //   jasper: {
  //     name: "",
  //     wo: "",
  //     pn: "",
  //     sn: "",
  //     date: "",
  //     desc: "",
  //   },
  // });

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
    // let tempDate = items.date;
    // tempDate = new Date(tempDate.replace("-", ","));

    // let returnData = Object.assign({}, items, { date: tempDate });

    console.log("this is the id: " + selectedID);

    // event.preventDefault;

    await db
      .collection("test")
      .add(items)
      .then(() => {
        console.log("Items added!");
        // router.reload("WarehouseList")
        // window.location = "WarehouseList";
        router.push("dashboard");
      });
  }

  async function handleSubmit(event) {
    // const router = useRouter()

    console.log("enter handle submit");
    console.log(items);
    var check = false;

    Object.values(items).map((element) => {
      console.log(element);
      if (element == "") {
        console.log(element + " error!");
        check = true;
      }
    });

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

  const firstChangeHandler = (event) => {
    setItems(Object.assign({}, items, { first: event.target.value }));
  };
  const lastChangeHandler = (event) => {
    setItems(Object.assign({}, items, { last: event.target.value }));
  };
  const streetChangeHandler = (event) => {
    setItems(Object.assign({}, items, { street: event.target.value }));
  };
  const cityChangeHandler = (event) => {
    setItems(Object.assign({}, items, { city: event.target.value }));
  };
  const stateChangeHandler = (event) => {
    setItems(Object.assign({}, items, { state: event.target.value }));
    console.log(items.date);
  };
  const zipcodeChangeHandler = (event) => {
    setItems(Object.assign({}, items, { zipcode: event.target.value }));
  };
  const emailChangeHandler = (event) => {
    setItems(Object.assign({}, items, { email: event.target.value }));
  };
  const notesChangeHandler = (event) => {
    setItems(Object.assign({}, items, { notes: event.target.value }));
  };

  const [addItem, setAddItem] = useState();

  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);

  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState();

  const [preSelect, setPreSelect] = useState();

  const addItemHandler = (event) => {
    setNewItem(event.target.value);
  };

  const handleAdd = () => {
    // setItems(Object.assign({}, items, { addItem : newItem }));
    // console.log(addItem)
    // console.log(items[addItem])
    // console.log(items["prescription"])
    if (items[addItem] == undefined) {
      setItems(Object.assign({}, items, { [addItem]: [newItem] }));
    } else {
      var tempList = items[addItem];
      tempList.push(newItem);
      setItems(Object.assign({}, items, { [addItem]: tempList }));
    }
    // items[addItem].push(newItem)
    setNewItem();
    handleAddClose();
  };

  const addItemPopUp = (item) => {
    setAddItem(item);
    handleAddShow();
  };

  const removeItem = (name) => {
    // console.log(preSelect)
    if (items[name].length > 0) {
      var tempList = items[name];
      tempList.splice(preSelect, 1);
      // console.log(tempList)
      setItems(Object.assign({}, items, { [name]: tempList }));
    }
  };

  const preSelectHandler = (event) => {
    console.log(event.target.value);
    setPreSelect(event.target.value);
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
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding {addItem}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>{addItem}</Form.Label>
          <Form.Control type="text" value={newItem} onChange={addItemHandler} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>
            Ok
          </Button>
          <Button variant="primary" onClick={handleAddClose}>
            Cancel
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
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["first"]}
                      onChange={firstChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["last"]}
                      onChange={lastChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["street"]}
                      onChange={streetChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="name">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["city"]}
                      onChange={cityChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["state"]}
                      onChange={stateChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control
                      type="number"
                      value={items["zipcode"]}
                      onChange={zipcodeChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-1">
                  <Form.Group as={Col} controlId="prescription">
                    <Form.Label>Prescriptions</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={preSelectHandler}
                    >
                      {items["prescription"] != undefined &&
                        items["prescription"].map((element, index) => (
                          <option value={index}>{element}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group
                    className="mb-1"
                    as={Col}
                    controlId="prescriptionsAdd"
                  >
                    <Button
                      style={{ marginTop: "2.15vw" }}
                      variant="success"
                      onClick={() => addItemPopUp("prescription")}
                    >
                      +
                    </Button>
                    <Button
                      style={{ marginLeft: "1vw", marginTop: "2.15vw" }}
                      variant="danger"
                      onClick={() => removeItem("prescription")}
                    >
                      --
                    </Button>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} className="w-10" controlId="allergies">
                    <Form.Label>Allergies</Form.Label>
                    <Form.Select aria-label="Default select example">
                      {items["allergies"] != undefined &&
                        items["allergies"].map((element, index) => (
                          <option value={index}>{element}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="allergiesAdd">
                    <Button
                      style={{ marginTop: "2.15vw" }}
                      variant="success"
                      onClick={() => addItemPopUp("allergies")}
                    >
                      +
                    </Button>
                    <Button
                      style={{ marginLeft: "1vw", marginTop: "2.15vw" }}
                      variant="danger"
                      onClick={() => removeItem("allergies")}
                    >
                      --
                    </Button>
                  </Form.Group>
                </Row>

                <Row className="mb-1">
                  <Form.Group as={Col} className="w-10" controlId="symptoms">
                    <Form.Label>Symptoms</Form.Label>
                    <Form.Select aria-label="Default select example">
                      {items["symptoms"] != undefined &&
                        items["symptoms"].map((element, index) => (
                          <option value={index}>{element}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-1" as={Col} controlId="symptomsAdd">
                    <Button
                      style={{ marginTop: "2.15vw" }}
                      variant="success"
                      onClick={() => addItemPopUp("symptoms")}
                    >
                      +
                    </Button>
                    <Button
                      style={{ marginLeft: "1vw", marginTop: "2.15vw" }}
                      variant="danger"
                      onClick={() => removeItem("symptoms")}
                    >
                      --
                    </Button>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["email"]}
                      onChange={emailChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Form.Label></Form.Label>
                <Form.Group className="mb-3" controlId="desc">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={items["notes"]}
                    onChange={notesChangeHandler}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Register
                </Button>
                <Button className="m-3" variant="secondary" href={"dashboard"}>
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

export default register;
