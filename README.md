# test-web-gui-auto-creating

Experimenting with automated generation of application components based on a JSON configuration file.

```
npm create vite@latest . -- --template react-ts
```

# ESP32 Universal Web-GUI

A configurable React and TypeScript web interface for monitoring and controlling ESP32 hardware through a standardized HTTP/JSON API.

## Overview

The application provides a responsive dashboard for controlling and monitoring supported ESP32 components.

## Features

- Device connection and system status
- LED control
- Display and sound control
- Button state monitoring
- Automatic status updates
- Activity log and error reporting

Features depend on the capabilities implemented by the connected ESP32 firmware.

## Technology Stack

- React
- TypeScript
- Vite
- HTTP and JSON
- ESP32 HTTP server and LittleFS

## Prerequisites

- Node.js (LTS)
- npm
- Git

## Getting Started

```bash
git clone https://github.com/DEIN-USERNAME/esp32-universal-web-gui.git
cd esp32-universal-web-gui
npm install
npm run dev
```

## Available Scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start the development server |
| `npm run build`        | Create the production build  |
| `npm run lint`         | Check code quality           |
| `npm run format:check` | Check code formatting        |
| `npm run preview`      | Preview the production build |

## Architecture

See [docs/architecture.md](docs/architecture.md) and [docs/api-contract.md](docs/api-contract.md).

## ESP32 Integration

The production frontend is built with Vite and served as static files by the ESP32 through LittleFS. During development, the frontend communicates with the device through the configured HTTP API.

## Project Management

GitHub Issues track requirements and implementation tasks. GitHub Projects is used to organize work and track progress.

## License

License to be determined.
