import React from 'react';
import SpecificMovie from './specificmovie.js';

var MyList = (props) => (
<div>
  {
    props.data.map(
    (item, key) => <SpecificMovie info={item} toggleFn={props.watchedFn} key={key}/>
      )
  }
</div>
)




export default MyList;