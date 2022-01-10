const config = {
    // If App is in Debug Mode
    DEBUG: true,
    // Time in minutes to reset interaction
    RESET_TIME: 15,
    // Minimum message length to search for lyrics
    MINIMUM_SEARCH_LENGTH: 5,
    // Maximum lyrics characters a user can send
    MAXIMUM_SEARCH_LENGTH: 900,
    // Minimum audio size to search in bytes
    MINIMUM_AUDIO_FILE_SIZE: 12200,
    // Maximum results to return from Genius
    MAX_GENIUS_RESULTS: 6,
    // Audio Sample Rate for Google Cloud
    AUDIO_SAMPLE_RATE: 16000
}

export default config;