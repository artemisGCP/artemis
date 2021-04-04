import React from 'react';
import csv from '../../assets/csv.png';
import { Button } from 'antd';
import './results.css';
import { useHistory } from 'react-router';

const Results = () => {
  const history = useHistory();
  const download = () => {
    window.open('/assets/test.csv');
  };
  const annotate = () => {
    history.push('/annotate');
  };
  return (
    <div className="results">
      <div className="title">Evaluation of the fully trained model on your testing video has been performed successfully and a CSV file is generated. Pleas click on the Download Data button to view the result.</div>
      <div className="csv">
        <img src={csv} alt="csv" />
        <div className="description">{new Date().toJSON().split('T')[0].replaceAll('-', '') + '01'}</div>
      </div>
      <div className="btn">
        <Button onClick={download}>Download Data</Button>
        <Button onClick={annotate}>Annotate Another File</Button>
      </div>
    </div>
  );
};

export default Results;
