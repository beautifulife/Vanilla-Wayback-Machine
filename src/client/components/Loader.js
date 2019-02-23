import React from 'react';
import { BarLoader } from 'react-spinners';
import './Loader.scss';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="Loader">
        <BarLoader
          width={200}
          widthUnit="px"
          height={15}
          heightUnit="px"
          color="#248AEC"
          loading={loading}
        />
      </div>
    );
  }
}

export default Loader;
