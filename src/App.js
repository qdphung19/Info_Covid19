import { Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import "moment/locale/fr";
import "@fontsource/roboto";

moment.locale("fr");

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState("");
    const [report, setReport] = useState([]);
    useEffect(() => {
        getCountries().then((res) => {
            const { data } = res;
            const countries = sortBy(data, "Country");
            setCountries(countries);
            setSelectedCountryId("fr");
        });
    }, []);

    const handleOnChange = (e) => {
        setSelectedCountryId(e.target.value);
    };

    useEffect(() => {
        if (selectedCountryId) {
            const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);
            // call api
            getReportByCountry(Slug).then((res) => {
                res.data.pop();
                setReport(res.data);
            });
        }
    }, [countries, selectedCountryId]);

    return (
        <Container style={{ marginTop: 20 }}>
            <Typography variant="h2" component="h2">
                Info Coronavirus Covid-19
            </Typography>
            <Typography>{moment().format("LLL")}</Typography>
            <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId} />
            <Highlight report={report} />
            <Summary report={report} countryId={selectedCountryId} />
        </Container>
    );
}

export default App;
