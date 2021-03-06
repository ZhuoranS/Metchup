import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Button, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import ClassModal from './Modal'


function loadNotes() {
  return API.get("notes", "/notes");
}

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        //const notes = await loadNotes();
        //setNotes(notes);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function renderNotesList(notes) {
  return(
  <div>
    <LinkContainer key="new" to="/notes/search">
      <ListGroupItem>
        <h4>
          <b>{"\uFF0B"}</b> Add a new class
        </h4>
      </ListGroupItem>
    </LinkContainer>
   
    <ListGroup>
        <ClassModal name="COMP_SCI 214"/>
        <ClassModal name="MATH 290-3"/>
        <ClassModal name="ECON 310-1"/>
    </ListGroup>
  </div>
  );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Metchup</h1>
        <p>A simple way to find study partner</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>My Classes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}