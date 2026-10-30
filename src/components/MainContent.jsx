import Prayer from './Prayer.jsx'
import SelectCity from './SelectCity.jsx'
import { useState, useEffect } from 'react'

//IMPORT MATERIAL UI COMPONENTS
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// IMPORT EXTERNAL LIBRARIES
import axios from 'axios'
import moment from 'moment'

//IMPORT IMAGES FROM ASSETS
import fajrImage from '../assets/fajr.png';
import dhuhrImage from '../assets/dhuhr.png';
import asrImage from '../assets/asr.png';
import maghribImage from '../assets/maghrib.png';
import ishaImage from '../assets/isha.png';

const arabicWeekdays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const arabicMonths = ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'];

function formatArabicDateTime() {
    const now = moment();
    const timePeriod = now.hour() < 12 ? 'ص' : 'م';
    return `${arabicWeekdays[now.day()]} ، ${now.date()} ${arabicMonths[now.month()]} ${now.year()} | ${now.format('h:mm')} ${timePeriod}`;
}

function getNextPrayer(prayerNow, timings) {
    const prayerKeys = ['Fajr', 'Dhuhr', 'Asr', 'Sunset', 'Isha'];
    let nextPrayer = prayerKeys
        .map((key) => {
            const prayerTime = String(timings[key]).split(' ')[0];
            const [hours, minutes] = prayerTime.split(':').map(Number);
            return {
                key,
                time: prayerNow.clone().hour(hours).minute(minutes).second(0).millisecond(0),
            };
        })
        .find((prayer) => prayer.time.isAfter(prayerNow));

    if (!nextPrayer) {
        const [hours, minutes] = String(timings.Fajr).split(' ')[0].split(':').map(Number);
        nextPrayer = {
            key: 'Fajr',
            time: prayerNow.clone().add(1, 'day').hour(hours).minute(minutes).second(0).millisecond(0),
        };
    }

    const duration = moment.duration(nextPrayer.time.diff(prayerNow));
    const remainingTime = `${String(duration.seconds()).padStart(2, '0')} : ${String(duration.minutes()).padStart(2, '0')} : ${String(Math.floor(duration.asHours())).padStart(2, '0')}`;
    return { key: nextPrayer.key, remainingTime };
}

export default function MainContent() {
    const [nextPrayerKey, setNextPrayerKey] = useState('Fajr');
    const [remainingTime, setRemainingTime] = useState("");
    const [city, setCity] = useState('Latakia');
    const [currentTime, setCurrentTime] = useState(formatArabicDateTime);
    const [timings,setTimings] = useState({
        "Fajr": "05:58",
        "Dhuhr": "12:58",
        "Asr": "16:03",
        "Sunset": "18:29",
        "Isha": "19:53"
    });

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            const data = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Syria&method=3`);
            setTimings(data.data.data.timings);
        };

        fetchPrayerTimes();
    }, [city]);

    useEffect(() => {
        const updateTime = () => {
            const now = moment();
            setCurrentTime(formatArabicDateTime());
            const nextPrayer = getNextPrayer(now, timings);
            setNextPrayerKey(nextPrayer.key);
            setRemainingTime(nextPrayer.remainingTime);
        };

        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timings]);

    const cityNames = {
        Latakia: 'اللاذقية',
        Damascus: 'دمشق',
        Aleppo: 'حلب',
        Homs: 'حمص',
        Hama: 'حماة',
        Tartus: 'طرطوس',
    };

    const prayerNames = {
        Fajr: 'الفجر',
        Dhuhr: 'الظهر',
        Asr: 'العصر',
        Sunset: 'المغرب',
        Isha: 'العشاء',
    };

    return (
        <Box className="main-content">
            {/* START BUILD TIME AND DATE AND CITY */}
            <Box className="prayer-summary">
                <Box className="summary-item">
                    <p className="summary-date">{currentTime}</p>
                    <h1 className="summary-city">{cityNames[city]}</h1>
                </Box>
                <Box className="summary-item">
                    <p className="summary-label">الوقت المتبقي لصلاة {prayerNames[nextPrayerKey]}</p>
                    <h2>{remainingTime}</h2>
                </Box>
            </Box>
            {/* END BUILD TIME AND DATE AND CITY */}

            <Divider
                orientation="horizontal"
                sx={{
                    width: '100%',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.85)',
                    mt: 1,
                    mb: 3,
                }}
            />

            {/* START BUILD PRAYER TIMES */}
            <Box className="prayer-grid">
                <Prayer prayerName="الفجر" prayerTime={timings.Fajr} prayerImage={fajrImage} />
                <Prayer prayerName="الظهر" prayerTime={timings.Dhuhr} prayerImage={dhuhrImage} />
                <Prayer prayerName="العصر" prayerTime={timings.Asr} prayerImage={asrImage} />
                <Prayer prayerName="المغرب" prayerTime={timings.Sunset} prayerImage={maghribImage} />
                <Prayer prayerName="العشاء" prayerTime={timings.Isha} prayerImage={ishaImage} />
            </Box>
            {/* END BUILD PRAYER TIMES */}

            {/* START BUILD SELECT CITY */}
            <Box className="city-select-row">
                <SelectCity city={city} onCityChange={setCity} />
            </Box>
            {/* END BUILD SELECT CITY */}
        </Box>
    )
}