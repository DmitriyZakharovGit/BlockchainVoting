import React from 'react';
import {getPercent} from "../procent";
import {
    ResponsiveContainer,
    Bar,
    BarChart,
    Brush,
    CartesianGrid,
    Legend,
    ReferenceLine,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.getData = this.getData.bind(this);
    }

    getData() {
        let total = 0;
        this.props.candidates.forEach(candidateInfo => total += candidateInfo.balance);

        return this.props.candidates.map(candidateInfo => {
                return {
                    name: candidateInfo.candidate,
                    balance: getPercent(candidateInfo.balance, total),
                    total: 100 - getPercent(candidateInfo.balance, total)
                }
            }
        );
    };

    static renderLegend(props) {
        const {payload} = props;

        return (
            <div>
                {payload.map((entry, index) => {
                    if (entry.value !== "total") {
                        let icon = {color: `${entry.color}`};
                        return (
                            <p className="center" key={index}>
                                <i className="fas fa-square" style={icon}></i> Проголосовало
                            </p>
                        )
                    }
                })}
            </div>
        );
    };

    static renderTooltip(props) {
        const {payload} = props;

        return (
            <div className="c-tooltip custom-shadow">
                {payload.length > 0 ? (
                    <div className="p-3">
                        <p>Вариант: {payload[0].payload["name"]}</p>
                        <p>Голосов: {payload[0].payload["balance"]}%</p>
                    </div>
                ) : null}
            </div>
        );
    };

    static renderYAxis(props) {
        console.log(props);
    };

    render() {
        let data = this.getData();

        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="horizontal" offset={0}>
                    <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name" tick={{strokeWidth: 1}}/>
                    <YAxis type="number" domain={[0, 100]}/>
                    <Tooltip content={Chart.renderTooltip}/>
                    <Legend content={Chart.renderLegend} verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                    <ReferenceLine y={0} stroke='#000'/>
                    <Brush dataKey="name" height={30} stroke="#007bff"/>
                    <Bar dataKey="balance" stackId="a" fill="#007bff"/>
                    <Bar dataKey="total" stackId="a" className="invisible"/>
                </BarChart>
            </ResponsiveContainer>
        );
    }
};