import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCity({ city, onCityChange }) {
    const handleSelectedCity = (event) => {
        onCityChange(event.target.value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '26rem', minWidth: 0 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                        color: '#fff',
                        '&.Mui-focused': { color: '#fff' },
                    }}
                >
                    اسم المدينة
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="اسم المدينة"
                    onChange={handleSelectedCity}
                    sx={{
                        color: '#fff',
                        width: '100%',
                        minHeight: 48,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#fff',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#fff',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#fff',
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#fff',
                        },
                    }}
                >
                    <MenuItem value={'Latakia'}>اللاذقية</MenuItem>
                    <MenuItem value={'Damascus'}>دمشق</MenuItem>
                    <MenuItem value={'Aleppo'}>حلب</MenuItem>
                    <MenuItem value={'Homs'}>حمص</MenuItem>
                    <MenuItem value={'Hama'}>حماة</MenuItem>
                    <MenuItem value={'Tartus'}>طرطوس</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}