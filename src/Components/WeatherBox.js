import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CloudIcon from '@mui/icons-material/Cloud'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import { WeatherContext } from '../Contexts/WeatherContext';
import { useContext, useEffect, useMemo, useState } from 'react';

import moment from 'moment';
import "moment/locale/ar";

export default function WeatherBox() {
    const { t, i18n } = useTranslation();
    const [dirState, setDirState] = useState(i18n.language === "ar" ? "rtl" : "ltr");
    const { weatherData, dataState } = useContext(WeatherContext)
    const [timeDate, setTimeDate] = useState(moment().format('MMMM Do YYYY'))
    useEffect(() => {
        moment.locale(i18n.language)
        setTimeDate(moment().format('MMMM Do YYYY'));
    }, [i18n.language])

    return (
        <Container dir={dirState} maxWidth="sm" sx={{ backgroundColor: "rgb(28 52 91 / 20%)", borderRadius: "22px" }}>
            <header dir={dirState} style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "10px", margin: "10px " }}>
                <h1 style={{}}>{t('Egypt')}</h1>
                <p style={{ fontSize: " 22px" }}>{timeDate}</p>
            </header>
            <hr></hr>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {dataState ?
                        <Grid size={{ sm: 6, xs: 12 }}>
                            <div className='temp-info'>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "30px" }}>
                                    <h2 style={{ fontSize: " 80px", fontWeight: "normal" }}>{weatherData.temp}</h2>
                                    <img style={{ width: "60px", height: "60px" }} src={weatherData.icon} alt="weather" />
                                </div>

                                <p style={{ textAlign: "start" }}>{t(weatherData.description)}</p>
                                <Stack
                                    direction="row"
                                    divider={<Divider  sx={{ borderColor: "white" }} orientation="vertical" flexItem />}
                                    spacing={2}
                                    sx={{ fontSize: "15px", padding: "10px" }}
                                >
                                    <p>{t('Minimum')} : <span>{weatherData.minTemp}</span></p>
                                    <p>{t('Maximum')} : <span>{weatherData.maxTemp}</span></p>
                                </Stack>

                            </div>
                        </Grid> : <Grid size={{ sm: 6, xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress color="inherit" /></Grid>

                    }
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CloudIcon sx={{ fontSize: "200px" }} />
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "end" }}>
                <Button
                    onClick={() => {
                        const newLan = i18n.language === "ar" ? "en" : "ar";
                        i18n.changeLanguage(newLan)
                        setDirState(newLan === "ar" ? "rtl" : "ltr")
                    }}
                    sx={{ color: "white", fontSize: "18px", backgroundColor: "#0072ff8a", borderRadius: "12px" }} variant="text">{i18n.language === "ar" ? "أنجليزى" : "Arabic"}</Button>
            </div>
        </Container>
    )
}