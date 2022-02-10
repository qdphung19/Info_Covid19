import { Grid } from "@material-ui/core";
import React from "react";
import HighlightCard from "./HighlightCard";

export default function Highlight({ report }) {
    const data = report && report.length ? report[report.length - 1] : [];
    // console.log("Highlight data: ", data);
    // console.log("Highlight data: ", report);
    const summary = [
        {
            title: "Nombre total de cas",
            count: data.Confirmed,
            type: "confirmed",
        },
        {
            title: "Rétablissement (Info n'est plus mise à jour)",
            count: 0,

            type: "recovered",
        },
        {
            title: "Nombre total de décès",
            count: data.Deaths,
            type: "dead",
        },
    ];
    return (
        <Grid container spacing={3}>
            {summary.map((item) => (
                <Grid item sm={4} xs={12} key={item.type}>
                    <HighlightCard title={item.title} count={item.count} type={item.type} />
                </Grid>
            ))}
        </Grid>
    );
}
