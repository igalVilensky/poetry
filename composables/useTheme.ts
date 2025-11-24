export const useTheme = () => {
    const theme = useState('theme', () => 'light');

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        updateTheme();
    };

    const updateTheme = () => {
        if (process.client) {
            localStorage.setItem('theme', theme.value);
            if (theme.value === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    const initTheme = () => {
        if (process.client) {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                theme.value = savedTheme;
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme.value = 'dark';
            }
            updateTheme();
        }
    };

    return {
        theme,
        toggleTheme,
        initTheme,
    };
};
