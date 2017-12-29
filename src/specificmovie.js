// import React from 'react';



// var SpecificMovie = (props) => {
//   var theStyle;
//   props.info.watched ? theStyle = {fontWeight: 'bold'} : theStyle = {fontWeight: 'normal'};

  
//   return (
//     <div>
//       <li style = {theStyle}>Title: {props.info.title}</li>
//       <ol>
//         <li>Year: {props.info.year}</li>
//         <li>IMDB: {props.info.imdb}</li>
//         <li>Watched: {props.info.watched ? 'Watched' : 'Not Watched'}</li>
//       </ol>
//       <button id={props.info.title} onClick={props.toggleFn}>Toggle Watched</button>
//     </div>
//   )

// }




// export default SpecificMovie;


////////////////////CHANGE TO CLASS COMPONENT//////////////////////////

import React from 'react';

class SpecificMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {panelOpen: false};
  }

  expandFn () {
    this.setState({panelOpen: !this.state.panelOpen});
  }

  render () {
    var theStyle;
    this.props.info.watched ? theStyle = {fontWeight: 'bold'} : theStyle = {fontWeight: 'normal'};


    return (
      <div>
        <li style = {theStyle}>Title: {this.props.info.title}</li>
        <button onClick={this.expandFn.bind(this)}>Expand</button>
        <div>
          {this.state.panelOpen ? (
          <div>
            <ol>
              <li>Year: {this.props.info.year}</li>
              <li>IMDB: {this.props.info.imdb}</li>
              <li>Watched: {this.props.info.watched ? 'Watched' : 'Not Watched'}</li>
            </ol>
            <button id={this.props.info.title} onClick={this.props.toggleFn.bind(this)}>Toggle Watched</button>
          </div>
          ) : (
          <div>
          </div>
          )}
        </div>
      </div>
    )
  }
}




export default SpecificMovie;