import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import './config'
import { Button, FormGroup, FormControl, Form} from "react-bootstrap";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import {Tab,Nav, Dropdown, DropdownButton} from 'react-bootstrap'



import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Scheduler extends Component {

  constructor(props) {
    super(props);
    this.initialBookedTime=null;
    this.finalBookedArray=[];
    var ref=this;
    this.state = {
      currentPCSelected :undefined,
      cellWidthSpec: "Fixed",
      cellWidth: 120,
      crosshairType: "Disabled",
      timeHeaders: [{"groupBy":"Day"},{"groupBy":"Hour"}],
      scale: "Hour",
      businessEndsHour: 21,
      businessWeekends: true,
      days: 1,
      showNonBusiness: false,
      startDate: DayPilot.Date.today(),
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: function (args) {
        var dp = this;
        DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
          dp.clearSelection();
          if (!modal.result) { return; }

          console.log(args.start.toString());
          console.log(args.end.toString());

          var stringArray=[];

          var startI=(args.start.toString()).split("T")[1].split(":")[0];
          var endI=parseInt((args.end.toString()).split("T")[1].split(":")[0])-1

         

          for(var i=startI;i<=endI;i++){
            stringArray.push(i.toString());
          }
          console.log(stringArray);
          ref.finalBookedArray=ref.finalBookedArray.concat(stringArray);
          console.log(ref.finalBookedArray);

          dp.events.add(new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result
          }));
        });
      },
      eventMoveHandling: "Update",
      onEventMoved: function (args) {
        this.message("Event moved: " + args.e.text());
      },
      eventResizeHandling: "Update",
      onEventResized: function (args) {
        this.message("Event resized: " + args.e.text());
      },
      eventDeleteHandling: "Update",
      onEventDeleted: function (args) {
        this.message("Event deleted: " + args.e.text());
      },
      eventClickHandling: "enabled",
      eventHoverHandling: "Bubble",
      bubble: new DayPilot.Bubble({
        onLoad: function(args) {
          // if event object doesn't specify "bubbleHtml" property 
          // this onLoad handler will be called to provide the bubble HTML
          args.html = "Event details";
        }
      }),
      rowHeaderHideIconEnabled: true,
    };
  }

  componentDidMount() {
    // load resource and event data
    let eventArray=[]
    var splitArr;
    var that=this;
    axios.get('http://localhost:3000/getTimeBooked')
    .then((response) => {
        console.log(response.data);
        splitArr = response.data.a.split(',');
        this.initialBookedTime=splitArr;
        console.log(splitArr);
        for(var i=0;i< splitArr.length;i++){
            console.log(splitArr[i]);
            console.log("2019-10-05T"+ splitArr[i] +":00:00")
            console.log("2019-10-05T"+ (parseInt(splitArr[i])+1).toString() +":00:00")
            var eventObj={
                id: Math.floor(Math.random() * 1000000000000),
                text: "I am Booked",
                start: "2019-10-05T"+ splitArr[i] +":00:00",
                end: "2019-10-05T"+ (parseInt(splitArr[i])+1).toString() +":00:00",
                resource: "A"
            }
            eventArray.push(eventObj);
        }  
        that.setState({
            resources: [
            {name: "Resource A", id: "A"}
            ],
            events: eventArray
        });
    });

    // this.setState({
    //   resources: [
    //     {name: "Resource A", id: "A"}
    //   ],
    //   events: [
    //     {
    //       id: 1,
    //       text: "I am Booked",
    //       start: "2018-05-02T00:00:00",
    //       end: "2018-05-02T00:00:00",
    //       resource: "A"
    //     }
    //   ]
    // });
  }

  componentDidUpdate(){
    document.getElementsByClassName("scheduler_default_corner")[0].children[1].innerText="SAMSUNG"
  }

  bookTimeSlot = ()=>{
    axios.get("http://localhost:3000/bookTimeSlot?bookids="+this.finalBookedArray.concat(this.initialBookedTime))
    .then((response) => {
        console.log(response.data);
        alert("Time Slot Succesfull Booked");
    });
  }

  convertDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  render() {
    var {...config} = this.state;
    var style = {
      background: 'blue',
      fontSize: 200
    };
    // Render the Calendar
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    return (
      <div className="schedule-time">
        <DayPilotScheduler
          {...config}
          ref={component => {
            this.scheduler = component && component.control;
          }}
        />
        <Container className="myContainer">
          <Row>
            <Col xs="2"></Col>
            <Col xs="5">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Row>
                    <Col sm={3}>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Strem 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Strem 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">Strem 3</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <DropdownButton id="dropdown-basic-button" variant="success" onSelect={(evt)=>{
                            this.currentPCSelected=evt;
                            console.log(this.currentPCSelected);
                            this.setState({
                              currentPCSelected : evt
                            })
                          }} title="Select Computer Category">
                            <Dropdown.Item href="#PC-1">PC-1</Dropdown.Item>
                            <Dropdown.Item href="#PC-2">PC-2</Dropdown.Item>
                            <Dropdown.Item href="#PC-3">PC-3</Dropdown.Item>
                          </DropdownButton>
                          <Form.Label className="book-time-selection">PC Selected: {this.state.currentPCSelected ? this.state.currentPCSelected: "None"}</Form.Label>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <DropdownButton id="dropdown-basic-button2" variant="success" title="Select Computer Category">
                            <Dropdown.Item href="#/PC-4">PC 1</Dropdown.Item>
                            <Dropdown.Item href="#/PC-5">PC 2</Dropdown.Item>
                          </DropdownButton>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <DropdownButton id="dropdown-basic-button3" variant="success" title="Select Computer Category">
                            <Dropdown.Item href="#/PC-6">PC 1</Dropdown.Item>
                            <Dropdown.Item href="#/PC-7">PC 2</Dropdown.Item>
                            <Dropdown.Item href="#/PC-8">PC 3</Dropdown.Item>
                          </DropdownButton>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
            </Col>
            <Col xs="3">
            <InfiniteCalendar
              displayOptions={{
                showOverlay: false,
                shouldHeaderAnimate: false
              }}
              width={600}
              height={200}
              selected={today}
              // disabledDays={[0,6]}
              minDate={lastWeek}
              onSelect={(evt)=>{
                
                var x = x.split(" ");
                this.currentSelectedDate=this.convertDate(evt)
                console.log(evt);
              }}
            />
            </Col>
            <Col xs="2"></Col>
          </Row>
        </Container>

        <Button className="book-time-slot" onClick={()=>{
            this.bookTimeSlot();
        }}>Book My TimeSlot</Button>

      </div>
    );
  }
}

export default Scheduler;


