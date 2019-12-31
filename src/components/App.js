import React from 'react';
import Select from './SelectComponent';

class App extends React.Component {
    state = { counties: [] };

    componentDidMount() {
        let queryUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/3/query?";
        const whereClause = "state_name='Nevada'";
        let initialCounties = [];
        
        const data = {
            "f": "json",
            "returnGeometry": false,
            "outFields": "*",
            "where": whereClause
        }

        const query = Object.keys(data)
                        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                        .join('&');

        queryUrl += query;
        
        //this code queryies a local json file instead of querying the service above
        fetch(process.env.PUBLIC_URL + './counties.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                initialCounties = data.features.map((county) => {
                    return county.attributes;
                });
                console.log(initialCounties);
                this.setState({
                    counties: initialCounties
                });
            })
            .catch((err)=> {
                console.log("failed with: ", err);
            });
    }

    render() {
        return (
            <div style={{backgroundColor: '#B5CC18'}}>
                <h2 style={{padding: '20px'}} className="ui center aligned icon header">
                    <div className="ui massive image">
                        <img alt="science of where" src={process.env.PUBLIC_URL + './science_of_where.png'}/>
                    </div>
                    <br />
                    Dynamic Select
                </h2>
                <br />
                <Select options={this.state.counties}/>
            </div>
        );
    }
};


export default App;