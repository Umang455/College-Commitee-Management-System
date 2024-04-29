import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
    return {
        ...color,
        alpha4: alpha(color.main, 0.04),
        alpha8: alpha(color.main, 0.08),
        alpha12: alpha(color.main, 0.12),
        alpha30: alpha(color.main, 0.30),
        alpha50: alpha(color.main, 0.50)
    };
};

export const neutral = {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1'
};

export const indigo = withAlphas({
    lightest: '#E0F2F1',
    light: '#B2DFDB',
    main: '#4DB6AC',
    dark: '#00897B',
    darkest: '#004D40',
    contrastText: '#FFFFFF'
});

export const success = withAlphas({
    lightest: '#E8F5E9',
    light: '#81C784',
    main: '#4CAF50',
    dark: '#388E3C',
    darkest: '#1B5E20',
    contrastText: '#FFFFFF'
});

export const info = withAlphas({
    lightest: '#E1F5FE',
    light: '#80D8FF',
    main: '#4FC3F7',
    dark: '#0288D1',
    darkest: '#01579B',
    contrastText: '#FFFFFF'
});

export const warning = withAlphas({
    lightest: '#FFF8E1',
    light: '#FFE082',
    main: '#FFD54F',
    dark: '#FFB300',
    darkest: '#FF8F00',
    contrastText: '#FFFFFF'
});

export const error = withAlphas({
    lightest: '#FFEBEE',
    light: '#EF9A9A',
    main: '#E57373',
    dark: '#C62828',
    darkest: '#8B0000',
    contrastText: '#FFFFFF'
});


export const colors = {
    primary: "#2196F3"
}
