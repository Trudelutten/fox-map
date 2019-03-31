import React, { Component } from "react";
import { render } from "react-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Col, Row, Button, Card, CardTitle } from "reactstrap";

const stamenTonerTiles = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const stamenTonerAttr =
  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 12,
      lat: 59.8,
      lng: 10.64,
      movement: 1,
      sign: true,
      markers: [
        {
          key: "0",
          position: [59.8, 10.67],
          lat: 59.8,
          lng: 10.67,
          content: "Red tail is considered extremly cute"
        },
        {
          key: "1",
          position: [59.76, 10.63],
          lat: 59.76,
          lng: 10.63,
          content: "White tail will eat from your hand"
        },
        {
          key: "2",
          position: [59.81, 10.65],
          lat: 59.81,
          lng: 10.65,
          content: "Miss Foxy is quite shy"
        },
        {
          key: "3",
          position: [59.83, 10.67],
          lat: 59.83,
          lng: 10.67,
          content: "Mr Tail may steel your food"
        },
        {
          key: "4",
          position: [59.77, 10.62],
          lat: 59.77,
          lng: 10.62,
          content: "Fort Fox will allow you to pet her"
        },
        {
          key: "5",
          position: [59.78, 10.66],
          lat: 59.78,
          lng: 10.66,
          content: "Foxy is best to observe at a distance"
        },
        {
          key: "6",
          position: [59.76, 10.68],
          lat: 59.76,
          lng: 10.68,
          content: "North wind enjoys the company of children"
        }
      ]
    };
  }
  componentDidMount() {}

  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  onUpdateMarkers = () => {
    let randomNumberLatList = [];
    let randomNumberLngList = [];
    let i;
    for (i = 0; i < 7; i++) {
      randomNumberLatList.push(1 + this.getRandomArbitrary(-0.00004, 0.00004));
      randomNumberLngList.push(1 + this.getRandomArbitrary(-0.00004, 0.00004));
    }
    //console.log(randomNumberLatList + " " + randomNumberLngList);
    this.setState(state => {
      //movement: randomNumber;

      const markers = state.markers.map(marker => ({
        key: marker.key,
        position: [
          marker.lat * randomNumberLatList[marker.key],
          marker.lng * randomNumberLngList[marker.key]
        ], //marker.position,
        lat: marker.lat * randomNumberLatList[marker.key],
        lng: marker.lng * randomNumberLngList[marker.key],
        content: marker.content
      }));
      //console.log(markers);
      return {
        markers
      }; //end return
    }); //end set state
    this.forceUpdate();
  };

  render() {
    let position = [this.state.lat, this.state.lng];

    return (
      <Container>
        <Card>
          <CardTitle>
            <h1>Track all foxes at Nesodden live</h1>
          </CardTitle>
        </Card>

        <Col size="sm">
          <Row>
            <Map
              id="mapid"
              center={position}
              zoom={this.state.zoomLevel}
              onClick={this.addPopup}
            >
              <TileLayer attribution={stamenTonerAttr} url={stamenTonerTiles} />

              {this.state.markers.map(marker => (
                <Marker position={marker.position} id={marker.key}>
                  <Popup>
                    <div>
                      <img
                        src="./fox-icon.png"
                        style={{ width: 66, height: 58 }}
                      />
                      <p>{marker.content}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </Map>
          </Row>
        </Col>
        <Col>
          <Row>
            <Button
              color="success"
              size="sm"
              onClick={this.onUpdateMarkers.bind(this)}
            >
              Refresh positions
            </Button>
          </Row>
        </Col>
      </Container>
    );
  }
}

render(<App />, document.getElementById("mount"));
