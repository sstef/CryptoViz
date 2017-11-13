import react from 'react';
import d3 from 'd3';

class PieChart extends React.Component {
  constructor(props){
    super(props);
    this.renderSlice = this.renderSlice.bind(this);
  }

  render(){
    let pie = d3.layout.pie();
    let data = this.props.date;
    let value = this.props.value;
    return (
      <section>
        {pie(data, value).map(this.renderSlice)}
      </section>
    )
  }
}
