import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { ButtonGroup, Button } from "@material-ui/core";

const generateOptions = (data) => {
    const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));

    return {
        chart: {
            height: 500,
        },
        title: {
            text: "Nombre de nouveaux cas confirmés",
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ["#F3585B"],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: "right",
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: "Nombre de nouveaux cas",
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
};

const LineChart = ({ data }) => {
    console.log("Linechart: ", { data });
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState("all");

    useEffect(() => {
        let customData = [];
        switch (reportType) {
            case "all":
                customData = data;
                break;

            case "30":
                for (let i = 1; i <= 31; i++) {
                    let a = data[data.length - (i * 12 + 1)];
                    let b = data[data.length - ((i - 1) * 12 + 1)];

                    a.Confirmed >= 1000000 ? customData.unshift(b) : customData.unshift(a);
                }
                break;
            case "7":
                for (let i = 1; i <= 7; i++) {
                    customData.unshift(data[data.length - (i * 12 + 1)]);
                }
                break;

            default:
                customData = data;
                break;
        }
        setOptions(generateOptions(customData));
    }, [data, reportType]);

    return (
        <>
            <>
                <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button color={reportType === "all" ? "secondary" : ""} onClick={() => setReportType("all")}>
                        Tous
                    </Button>
                    <Button color={reportType === "30" ? "secondary" : ""} onClick={() => setReportType("30")}>
                        30 jours
                    </Button>
                    <Button color={reportType === "7" ? "secondary" : ""} onClick={() => setReportType("7")}>
                        7 jour
                    </Button>
                </ButtonGroup>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </>
        </>
    );
};
export default React.memo(LineChart);
