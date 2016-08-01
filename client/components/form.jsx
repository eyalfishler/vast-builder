import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import VASTBuilder from '../vast-builder.js';
import { Col, Row } from 'react-bootstrap';

const defaultURL = 'vast.andyroid.net';
const params = {
  mainURL: {
    defaultValue: '//trackvideo.andyroid.net/events'
  },
  adTitle: {},
  adDescription: {},
  duration: {
    defaultValue: '00:00:30'
  },
  clientId: {
    defaultValue: '{{clientId}}'
  },
  clickThroughURL: {
    defaultValue: 'http://thesearch.net/yahoo/?UserID={{clientId}}&qid='
  },
  mediaURL: {
     defaultValue: 'http://downloads.andyroid.net/videos/'
  },
  mediaFileName: {
    defaultValue:'_640_360_30s.mp4'
  },
  mediaHeight: {
    defaultValue: 360
  },
  mediaWidth: {
    defaultValue: 640
  },
   fullscreenData: {
    defaultValue: 'false'
  },
  qid_value: {
    defaultValue: '111'
  },
};

const Form = React.createClass({
  getInitialState: ()=> {
    let state = {};
    _.each(params, (val, key)=> {
      if (!!val.defaultValue) {
        state[key] = val.defaultValue;
      }
    });
    state.viewable = 'xml';
    return state;
  },
  onClick: function(e) {
    if (typeof this.state['adDescription'] == "undefined")
      this.state['adDescription']=this.state['adTitle'];

    if (typeof this.state['adDescription'] !== "undefined" && this.state['adDescription']=="")
      this.state['adDescription']=this.state['adTitle'];
      
    e.preventDefault();
    this.setState({
      res: VASTBuilder.create(this.state)
    });
  },
  onDownload: function(param, e) {
    const filename = `${this.state.adTitle}.${param}`;
    let pom = document.createElement('a');

    let res = param == 'xml' ? this.state.res.xmlTemplate : this.state.res.phpTemplate;

    let blob = new Blob([res], {type: 'text/plain'});

    pom.setAttribute('href', window.URL.createObjectURL(blob));
    pom.setAttribute('download', filename);

    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true;
    pom.click();
  },

  onChange: function(param, e) {
    let change = {};
    change[param] = e.target.value;
    this.setState(change);
  },

  onToggleView: function(param, e) {
    this.setState({
      viewable: param
    });
  },

  render: function() {
    const formElements = Object.keys(params).map((param)=> {
      return (
        <div key={param}>
          <TextField
            defaultValue={params[param].defaultValue}
            hintText={param}
            floatingLabelText={param}
            onChange={this.onChange.bind(this, param)}
          />
        </div>
      );
    });

    return (
      <Row>
        <Col xs={3}>
          <form>
            {formElements}
            <RaisedButton label='Submit' primary={true} onClick={this.onClick}/>
          </form>
        </Col>
        <Col xs={9}>
          {this.state.res ? (
            <Card>
              <CardHeader
                title={(`${this.state.adTitle}.${
                  this.state.viewable == 'xml' ? 'xml' : 'txt'}`)}
              >
                <RaisedButton label='View as XML' onClick={this.onToggleView.bind(this, 'xml')}
                  primary={true} style={{marginRight: '10px'}}/>
                <RaisedButton label='View as PHP template' onClick={this.onToggleView.bind(this, 'php')}
                  primary={true}/>
              </CardHeader>
              <CardText>
                <pre>{this.state.res[`${this.state.viewable}Template`]}</pre>
              </CardText>
              <CardActions>
                <RaisedButton label='Download as XML' onClick={this.onDownload.bind(this, 'xml')}
                  primary={true}/>
                <RaisedButton label='Download as PHP template' onClick={this.onDownload.bind(this, 'txt')}
                  primary={true}/>
              </CardActions>
            </Card>) : ''}
        </Col>
      </Row>
    );
  }
});

export default Form;
