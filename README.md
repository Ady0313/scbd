## SCBD

## Project Overview

Welcome to the **AI Python Tutor**, an interactive platform designed to help users master Python programming. The platform provides personalized lessons, comprehensive tutorials on various Python topics, and AI-generated code examples powered by the Gemini API. It aims to enhance the learning experience with an intuitive interface, real-time examples, and a well-organized structure to guide users through their learning journey.

### Key Features:
- **Interactive Lessons**: Engage with step-by-step lessons tailored for various Python topics.
- **Expandable Topic Cards**: Discover and expand upon Python topics with brief descriptions for each.
- **Personalized Code Samples**: AI-generated Python code examples to help users understand key concepts.
- **API Integration**: Real-time content fetched from the Gemini API with cooldown limits to ensure fair use.
- **Track Progress**: Monitor your learning journey as you navigate through different Python topics.

## Tech Stack

- **Frontend**: React, Vite
- **API Integration**: Gemini API
- **Styling**: CSS, Inline Styles

## Installation & Setup

### 1. Clone the Repository
Start by cloning the repository to your local machine:

```bash
git clone <your-repository-url>
```

### 2. Install Dependencies
Navigate to the project directory and install the necessary dependencies:

```bash
cd your-project-folder
npm install
```

### 3. Environment Variables
Make sure to set up the following environment variable:
- `VITE_GEMINI_API_KEY`: Your Gemini API key (you can get this from the Gemini API service).

### 4. Start the Development Server
Once everything is set up, run the following command to start the development server:

```bash
npm run dev
```

This will start the application, and you can access it in your browser .

## Project Structure

Here’s an overview of the project structure:

```
/src
  /components          # React components for different UI elements
  /assets              # Static assets (images, gifs, etc.)
  /App.jsx             # Main application entry point
  /App.css             # Global styles
```

## Usage

After starting the application, explore a variety of Python topics using the interactive features:

- The **home page** provides a general overview of the platform.
- Navigate through **expandable topic cards**, each containing brief descriptions of Python topics.
- Each lesson and card will dynamically load content from the Gemini API, showing real-time Python code examples.

### Limitations

- **API Request Limitations**: The Gemini API has a cooldown period between requests. Make sure to account for these cooldowns when fetching new content.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute, report issues, or suggest improvements by opening an issue or submitting a pull request. Happy learning!
```
