import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

let unsubscribe=()=>{}

export default function Lineup({user}) {
  const [text, setText] = useState("");
  const [mylineups, setLineups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const docRef = db.collection("lineups").doc(user.uid);
      unsubscribe = docRef.onSnapshot(docSnap => {
        if (docSnap.exists) {
          console.log(docSnap.data().lineups);
          setLineups(docSnap.data().lineups);
        } else {
          console.log("no docs");
        }
      });
    } else {
      navigate("/login");
    }
    return () => {
      unsubscribe();
    };
  },[user,navigate]);
//   adding lineup in lineups collection
  const addLineup = () => {
    db.collection("lineups")
      .doc(user.uid)
      .set({
        lineups: [text,...mylineups],
      });
  };

  const deleteLineup = (deleteLineup) => {
    const docRef = db.collection("lineups").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap
        .data()
        .lineups.filter(lineup => lineup !== deleteLineup);
      docRef.update({
        lineups: result
      });
    });
  };

  return (
    <div className='container'>
      <h1 style={{color:'cyan'}}>LineUps</h1>
      <div className="input-field">
        <input
          type="text"
          placeholder="Add lineups here"
          value={text}
          style={{fontSize:'20px',color:'white'}}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        onClick={() => addLineup()}
        className="btn cyan"
      >
        AddLineUp
      </button>
      <div className="row">
          {mylineups.map((lineup) => {
          return (
            <div className="col s4">
            <div className="card-panel amber lighten-3"><div>
            <li className="collection-item" style={{fontSize:'20px'}} key={lineup}>{lineup}
          <i className="material-icons right" onClick={() => deleteLineup(lineup)}>delete</i>
            </li>
        </div>
        </div>
        </div>
          );
        })}
      </div>
    </div>
  );
}
