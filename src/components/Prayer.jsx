import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function Prayer({prayerName, prayerTime, prayerImage}) {
    return (
        <Card sx={{
            width: '100%',
            minWidth: 0,
            height: '100%',
            boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.24)',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
            <CardActionArea sx={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    image={prayerImage}
                    alt={prayerName}
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
                        aspectRatio: '16 / 9',
                    }}
                />
                <CardContent sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 1.5, sm: 2 },
                    '&:last-child': { pb: { xs: 1.5, sm: 2 } },
                }}>
                    <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{
                            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                            lineHeight: 1.2,
                            textAlign: 'center',
                            overflowWrap: 'anywhere',
                        }}
                    >
                        {prayerName}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'black',
                            fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: 1.2,
                            overflowWrap: 'anywhere',
                            fontVariantNumeric: 'tabular-nums',
                        }}
                    >
                        {prayerTime}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
