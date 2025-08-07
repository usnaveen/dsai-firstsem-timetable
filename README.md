# Timetable Generator

This is a simple web application that allows you to generate a customizable timetable image, suitable for sharing on platforms like WhatsApp.

## Features

-   **Interactive Timetable:** View your weekly class schedule.
-   **Remove Classes:** Click on a class block to mark it as 'removed' (it will appear transparent with a cross mark).
-   **Dual Download Options:**
    -   **Download Clean:** Generates a PNG image where removed classes appear as empty white slots with faint grey text.
    -   **Download UI View:** Generates a PNG image that looks exactly like the current UI, including transparent, crossed-out classes.
-   **Reset to Default:** Revert the timetable to its original, default schedule.
-   **Responsive Design:** The timetable adapts to different screen sizes, from mobile phones to desktops.
-   **Abbreviated View:** Class names are displayed in an abbreviated format (e.g., `DA5300 DSDS`).

## Setup and Running Locally

To set up and run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/usnaveen/dsai-firstsem-timetable.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd dsai-firstsem-timetable
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

    The application will typically open in your browser at `http://localhost:5173` (or another available port).

## Usage

-   **View Schedule:** The default weekly schedule will be displayed.
-   **Remove/Restore Class:** Click on any class block to toggle its 'removed' state. A removed class will appear transparent with a cross mark.
-   **Download Image:**
    -   Click `Download Clean` to get an image with removed classes appearing as empty slots.
    -   Click `Download UI View` to get an image that matches the current on-screen view.
-   **Reset:** Click `Reset to Default` to restore the original timetable.