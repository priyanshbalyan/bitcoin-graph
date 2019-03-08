import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import currencies from './currencies.json';
import moment from 'moment';
import { Line, Chart } from 'react-chartjs-2';

class App extends Component {

    constructor(props) {
        super(props);

        Chart.defaults.global.defaultFontColor = '#FFF';
        Chart.defaults.global.defaultFontSize = 16;

        this.state = {
            historyData: null,
            currency: "PHP",
        }

        this.onCurrencySelect = this.onCurrencySelect.bind(this);
    }

    componentDidMount() {
        this.getBitcoinData();
    }

    getBitcoinData() {
        fetch(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currency}`)
            .then(res => res.json())
            .then(historyData => this.setState({ historyData: historyData }))
            .catch(e => e)
    }

    onCurrencySelect(e) {
        this.setCurrency = e.target.value;
    }

    formatChartData() {
        const { bpi } = this.state.historyData

        return {
            labels: Object.keys(bpi).map(d => moment(d).format("ll")),
            datasets: [{
                label: "Bitcoin",
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: Object.values(bpi)
            }]
        }
    }



    render() {
        if (this.state.historyData)
            return ( <
                div className = "App" >
                <
                header className = "App-header" >
                <
                select value = { this.state.currency }
                onChange = { this.onCurrencySelect } > {
                    currencies.map((obj, index) =>
                        <
                        option key = { `${index}-${obj.country}` }
                        value = { obj.currency } > { obj.country } < /option>
                    )
                } <
                /select> <
                Line className = "App-chart"
                data = { this.formatChartData() }
                height = { 100 }

                />< /
                header > <
                /div>
            );

        return null;

    }

}

export default App;